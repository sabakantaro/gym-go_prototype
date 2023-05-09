import React, { useState, useCallback, useContext } from "react";
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
import "react-datepicker/dist/react-datepicker.css";
import { AuthContext } from "../../_app";
import { storageRef, db } from '../../../firebase';

const theme = createTheme();
// @ts-ignore
const EditUser: React.FC = () => {
  const{ currentUser } = useContext(AuthContext);
  const [name, setName] = useState(currentUser?.displayName);
  const [profile, setProfile] = useState<string | undefined>(currentUser?.profile);
  const [image, setImage] = useState(currentUser?.photoURL);
  const [preview, setPreview] = useState(currentUser?.photoURL);
  const router = useRouter();
  const {id} = router.query;

  const uploadImage = useCallback((e: any) => {
    const file = e.target.files[0]
    setImage(file)
  }, [])

  const previewImage = useCallback((e: any) => {
    const file = e.target.files[0]
    setPreview(window.URL.createObjectURL(file))
  }, [])

  const handleSubmit = useCallback(
    async (e: { preventDefault: () => void; }) => {
      e.preventDefault();
      // delete previous image
      await storageRef.child(`images/users/${currentUser?.uid}`).delete()
      // upload image
      await storageRef.child(`images/users/${currentUser?.uid}`)
      .put(image as unknown as Blob)
      .then(() => {
        storageRef
        // @ts-ignore
        .child(`images/users/${currentUser?.uid}`)
        .getDownloadURL()
        .then(async (imageUrl) => {
          // @ts-ignore
          await currentUser?.updateProfile({ displayName: name, photoURL: imageUrl });
          const userInitialData = {
            displayName: name,
            photoURL: imageUrl,
            profile: profile,
            // city_id: cityId,
          }
          await db.collection('users').doc(currentUser?.uid).set(userInitialData);
        })
        router.push(`/users/${currentUser?.uid}`);
      })
    },
    [currentUser, image, name, router, profile]
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
            Edit User Info
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
                // className='primary'
                name='image'
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  uploadImage(e)
                  previewImage(e)
                }}
              />
            )}
            <TextField
              value={name}
              onChange={(e) => setName(e.target.value)}
              margin='normal'
              required
              fullWidth
              id='name'
              label='Name'
              name='name'
              autoComplete='name'
            />
            <TextField
              value={profile}
              onChange={(e) => setProfile(e.target.value)}
              margin='normal'
              required
              fullWidth
              id='profile'
              label='Profile'
              name='profile'
              autoComplete='profile'
            />
            {/* <FormControl fullWidth required margin='normal'>
              <InputLabel id='demo-simple-select-label'>citie</InputLabel>
              <Select
                label='citie'
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                value={cityId}
                onChange={(e) => setCityId(e.target.value as number)}
              >
                {citiesList &&
                  citiesList.map((citie) => (
                    <MenuItem key={citie.id} value={citie.id}>
                      {citie.name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl> */}
            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2 }}
              onClick={(e) => handleSubmit(e)}
            >
              send
            </Button>
          </Box>
        </Paper>
      </Container>
    </ThemeProvider>
  )
}

export default EditUser