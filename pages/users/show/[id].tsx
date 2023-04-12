import React, { useEffect, useState, useCallback, useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Edit from "@mui/icons-material/Edit";
import Rating from "@mui/material/Rating";
import EventBox from "../../../components/EventBox";
import { AuthContext } from "../../_app";
import { Event, User } from "../../../types/my-module";
import { db } from '../../../firebase';
import { collection, query, getDocs, where, orderBy } from 'firebase/firestore';

const UserShow: React.FC = () => {
  const { currentUser } = useContext(AuthContext);
  const [createdEvents, setCreatedEvents] = useState<Event>();
  const [participateEvents, setParticipateEvents] = useState<Event>();
  const [user, setUser] = useState<User>();
  const router = useRouter();
  const {id} = router.query;

  const handleGetUser = useCallback(async () => {
    try {
      await db.collection('users').doc(String(id)).get().then((doc) => {
        // @ts-ignore
        setUser(doc.data());
      })
    } catch (err) {
      console.log(err);
    }
  }, [id]);

  const handleGetMyEvents = useCallback(async () => {
    try {
      const createdEvents: any = [];
      const now = new Date();
      const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      getDocs(query(collection(db, "events"), where("meetingDatetime", ">", startOfDay), where("user.uid", "==", id), orderBy('meetingDatetime'))).then((snapShot) => {
        snapShot.forEach((docs) => {
          const doc = docs.data();
          createdEvents.push({id: docs.id ,title: doc.title , imageUrl: doc.imageUrl, meetingDatetime: doc.meetingDatetime, body: doc.body, address: doc.address, user: doc.user})
        })
        setCreatedEvents(createdEvents);
      });
      const myPerticipationsEventIds: any = [];
      getDocs(query(collection(db, "participations"), where("user.uid", "==", id))).then((snapShot) => {
        snapShot.forEach((docs) => {
          const doc = docs.data();
          const eventId = doc.eventId;
          if (Array.isArray(eventId)) {
            myPerticipationsEventIds.push(...eventId);
          } else {
            myPerticipationsEventIds.push(eventId);
          }
        })
        if (myPerticipationsEventIds.length > 0) {
          const participateEvents: any = [];
          getDocs(query(collection(db, "events"), where("meetingDatetime", ">", startOfDay), where("id", "in", myPerticipationsEventIds), orderBy('meetingDatetime'))).then((snapShot) => {
            snapShot.forEach((docs) => {
              const doc = docs.data();
              participateEvents.push({id: docs.id ,title: doc.title , imageUrl: doc.imageUrl, meetingDatetime: doc.meetingDatetime, body: doc.body, address: doc.address, user: doc.user})
            })
            setParticipateEvents(participateEvents);
          });
        }
      });
    } catch (err) {
      console.log(err);
    }
  }, [id]);

  useEffect(() => {
    handleGetUser();
    handleGetMyEvents();
  }, [handleGetMyEvents, handleGetUser]);

  return (
    <>
      <Box
        component='main'
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
          pt: 4,
        }}
      >
        <Container component='main' maxWidth='sm' sx={{ mb: 4 }}>
          <Grid item xs={12} md={4} lg={4}>
            <CardMedia
              sx={{ borderRadius: "4px 4px 0 0", height: 120 }}
              component='img'
              src={user?.photoURL}
              alt='User image'
            />
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardHeader
                  avatar={
                    <Avatar
                      alt={user?.displayName?.charAt(0)}
                      src={user?.photoURL}
                      sx={{ width: 112, height: 112, mt: -8 }}
                    />
                  }
                  action={
                    currentUser?.uid === id && (
                      <IconButton
                        href={`/users/edit/${currentUser?.uid}`}
                        component="a"
                        LinkComponent={Link}
                      >
                        <Edit />
                      </IconButton>
                    )
                  }
                  sx={{ mt: -3 }}
                />
                <Typography
                  variant='body2'
                  sx={{ fontSize: 20, fontWeight: "bold" }}
                >
                  {user?.displayName}
                </Typography>
                {user?.evaluationScore && (
                  <Rating
                    name='half-rating-read'
                    defaultValue={user?.evaluationScore}
                    precision={0.5}
                    readOnly
                  />
                )}
                <Grid container sx={{ mt: 1 }}>
                  <Typography
                    variant='body2'
                    sx={{ fontSize: 16 }}
                  >
                    {user?.profile}
                  </Typography>
                </Grid>
              </Box>
            </Paper>
          </Grid>
        </Container>
        {participateEvents && (
          <Container maxWidth='md'>
            <Typography
              variant='body2'
              sx={{ fontSize: 20, fontWeight: "bold" }}
            >
              Participates events
            </Typography>
            <Grid container sx={{ mb: 5 }} spacing={4}>
              {participateEvents.map((event: Event) => (
                <EventBox
                  key={event?.id}
                  event={event}
                />
              ))}
            </Grid>
          </Container>
        )}
        {createdEvents && (
          <Container maxWidth='md'>
            <Typography
              variant='body2'
              sx={{ fontSize: 20, fontWeight: "bold" }}
            >
              My events
            </Typography>
            <Grid container sx={{ mb: 5 }} spacing={4}>
              {createdEvents.map((event: Event) => (
                <EventBox
                  key={event?.id}
                  event={event}
                />
              ))}
            </Grid>
          </Container>
        )}
      </Box>
    </>
  );
};

export default UserShow;
