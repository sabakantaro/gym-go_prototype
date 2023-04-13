import React, { useState, useCallback, useContext, useEffect } from "react";
import { useRouter } from "next/router";
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
import { AuthContext } from "../../_app";
import { storageRef, db } from '../../../firebase'

const theme = createTheme();

const Edit: React.FC = () => {
  const { currentUser } = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [address, setAddress] = useState("");
  const [meetingDatetime, setMeetingDatetime] = useState<Date | null>(new Date());
  const [image, setImage] = useState<string>("");
  const [preview, setPreview] = useState<string>("");
  const router = useRouter()
  const { id } = router.query

  const handleGetEvent = useCallback(async () => {
    try {
      // @ts-ignore
      await db.collection('events').doc(id).get().then((doc) => {
        // @ts-ignore
        const data: any = doc.data()
        setTitle(data.title);
        setBody(data.body);
        setAddress(data.address);
        setImage(data.imageUrl);
        console.log(data.imageUrl)
        setPreview(data.imageUrl);
      })
    } catch (err) {
      console.log(err);
    }
  }, [id]);

  useEffect(() => {
    handleGetEvent()
  }, [handleGetEvent])

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
      // upload image
      await storageRef.child(`images/events/${id}`).put(image as unknown as Blob)
      // @ts-ignore
      const imageUrl = await storageRef.child(`images/events/${id}`).getDownloadURL()
      const data = {
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
        updated_at:new Date().getTime(),
      }
      collection.doc(String(id)).update({
        ...data,
      })
      router.push("/");
    },
    [id, image, title, body, address, meetingDatetime, currentUser, router]
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
              fullWidth
              id='body'
              label='Body'
              name='body'
              autoComplete='body'
              autoFocus
            />
            <TextField
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              margin='normal'
              required
              fullWidth
              id='address'
              label='Address'
              name='address'
            />
            <DatePicker
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

export default Edit;