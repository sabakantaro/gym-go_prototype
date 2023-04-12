import React, { useState, useCallback, useContext, useEffect } from "react";
import { useRouter } from 'next/router'
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import CardMedia from "@mui/material/CardMedia";
import Cancel from "@mui/icons-material/Cancel";
import CameraAlt from "@mui/icons-material/CameraAlt";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import { AuthContext } from "../_app";
import { storageRef, db } from '../../firebase'
import { collection, query, getDocs, where, orderBy } from 'firebase/firestore';
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

const theme = createTheme();

const CreateEvent: React.FC = () => {
  const { currentUser } = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [address, setAddress] = useState("");
  const [meetingDatetime, setMeetingDatetime] = useState<Date | null>(new Date());
  const [image, setImage] = useState<string>("");
  const [preview, setPreview] = useState<string>("");
  const [places, setPlaces] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState([]);
  const router = useRouter();

  const handleGetPlaces = useCallback(async () => {
    try {
      const arrList: any = [];
      getDocs(query(collection(db, "places"))).then((snapShot) => {
        snapShot.forEach((docs) => {
          const doc = docs.data();
          arrList.push({id: docs.id ,name: doc.name , imageUrl: doc.imageUrl, long: doc.long, lat: doc.lat})
        })
        setPlaces(arrList);
      });
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    handleGetPlaces();
  }, [handleGetPlaces]);

  const uploadImage = useCallback((e: any) => {
    const file = e.target.files[0];
    setImage(file);
  }, []);

  const previewImage = useCallback((e: any) => {
    const file = e.target.files[0];
    setPreview(window.URL.createObjectURL(file));
  }, []);

  const handleSubmit = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      const collection = db.collection('events')
      const docId = collection.doc().id
      // upload image
      await storageRef.child(`images/events/${docId}`).put(image as unknown as Blob)
      // @ts-ignore
      const imageUrl = await storageRef.child(`images/events/${docId}`).getDownloadURL()
      const data = {
        id: docId,
        title: title,
        body: body,
        address: address,
        meetingDatetime: meetingDatetime as Date,
        imageUrl: imageUrl,
        user: {
          uid: currentUser?.uid,
          displayName: currentUser?.displayName,
          photoURL: currentUser?.photoURL,
      },
        created_at:new Date().getTime(),
      }
      collection.doc(docId).set({
        ...data,
      })
      router.push("/");
    },
    [image, title, body, address, meetingDatetime, currentUser, router]
  );

  const UploadButton = useCallback((props: { name: string | undefined; onChange: React.ChangeEventHandler<HTMLInputElement> | undefined; }) => {
    return (
      <label htmlFor={`upload-button-${props.name}`}>
        <input
          style={{ display: "none" }}
          id={`upload-button-${props.name}`}
          name={props.name}
          multiple
          type='file'
          onChange={props.onChange}
        />
        <IconButton aria-label='upload picture' component='center'>
          <CameraAlt />
        </IconButton>
      </label>
    );
  }, []);

  const menuItems =
    places.map((place: any, i) => (
      <MenuItem key={i} value={place}>{place.name}</MenuItem>)
    )

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container component='main' maxWidth='sm' sx={{ mb: 4 }}>
        <Paper
          variant='outlined'
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Typography component='h1' variant='h4' align='center'>
            Gather workout friends!
          </Typography>
          <Box component='form' sx={{ mt: 1, alignItems: 'center' }}>
            {preview ? (
              <Box sx={{ borderRadius: 1, borderColor: "grey.400" }}>
                <IconButton color='inherit' onClick={() => setPreview("")}>
                  <Cancel />
                </IconButton>
                <CardMedia
                  height='200'
                  component='img'
                  src={preview}
                  alt='preview img'
                />
              </Box>
            ) : (
              <UploadButton
                name='image'
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  uploadImage(e);
                  previewImage(e);
                }}
              />
            )}
            <TextField
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              margin='normal'
              required
              fullWidth
              id='title'
              label='Title'
              name='title'
              autoComplete='title'
              autoFocus
            />
            <TextField
              value={body}
              onChange={(e) => setBody(e.target.value)}
              margin='normal'
              required
              multiline
              rows={5}
              fullWidth
              id='Description'
              label='Description'
              name='description'
              autoComplete='description'
              autoFocus
            />
            {/* <TextField
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              margin='normal'
              required
              fullWidth
              id='address'
              label='Address'
              name='address'
            /> */}
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Gym*</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectedPlace}
                label="Gym"
                onChange={(e: any) => setSelectedPlace(e.target.value)}
              >
                {menuItems}
              </Select>
            </FormControl>
            <DatePicker
                  dateFormat="MMMM d, yyyy h:mm aa"
              showTimeSelect
              selected={moment(meetingDatetime).toDate()}
              onChange={(date) => setMeetingDatetime(date)}
              customInput={
                <TextField
                  margin='normal'
                  required
                  fullWidth
                  id='datetime'
                  label='Datetime'
                  name='datetime'
                  inputProps={{ readOnly: true }}
                >
                  {moment(String(meetingDatetime)).format("YYYY/MM/DD")}
                </TextField>
              }
            />
            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSubmit}
            >
              send
            </Button>
          </Box>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}

export default CreateEvent;
