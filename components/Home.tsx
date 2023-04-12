import React, { useState, useEffect, useCallback } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import EventBox from "./EventBox";
import "react-datepicker/dist/react-datepicker.css";
import { db } from '../firebase'
import { collection, query, getDocs, where, orderBy } from 'firebase/firestore';

const Home: React.FC = () => {
  const [events, setEvents] = useState();

  const handleGetEvents = useCallback(async () => {
    try {
      const arrList: any = [];
      const now = new Date();
      const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      getDocs(query(collection(db, "events"),where("meetingDatetime", ">", startOfDay), orderBy('meetingDatetime'))).then((snapShot) => {
        snapShot.forEach((docs) => {
          const doc = docs.data();
          arrList.push({id: docs.id ,title: doc.title , imageUrl: doc.imageUrl, meetingDatetime: doc.meetingDatetime, body: doc.body, address: doc.address, user: doc.user})
        })
        setEvents(arrList);
      });
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    handleGetEvents();
  }, [handleGetEvents]);

  return (
    <>
      <main>
        <Container sx={{pt: 12}}>
          <Grid container sx={{ mb: 5 }} spacing={1}>
            {/* @ts-ignore */}
            {events?.map((event) => (
              <EventBox
                key={event?.id}
                // @ts-ignore
                event={event}
              />
            ))}
          </Grid>
        </Container>
      </main>
    </>
  );
};

export default Home;
