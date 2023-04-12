import React, { useState, useEffect, useCallback, useMemo } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import {
  createTheme,
  ThemeProvider,
  styled,
  alpha,
} from "@mui/material/styles";
import EventBox from "../components/EventBox";
import Map from "../components/Map";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import { db } from '../firebase'
import { collection, query, getDocs, where, orderBy } from 'firebase/firestore';
import {useRouter} from 'next/router'
import { Divider } from "@mui/material";

const theme = createTheme();

const Search: React.FC = () => {
  const router = useRouter();
  // const{ keyword, meetingDatetime } = router.query
  const [events, setEvents] = useState();
  const [keyword, setKeyword] = useState(router.query.keyword);
  const [meetingDatetime, setMeetingDatetime] = useState(router.query.meetingDatetime);
  // @ts-ignore
  const eventSearchTitle = useMemo(() => `${events ? events.length : 0} Events - ${keyword} - ${moment(meetingDatetime).format("YYYY-MM-DD")}`, [events, keyword, meetingDatetime])

  const handleGetEvents = useCallback(async () => {
      try {
        const arrList: any = [];
        let q;
        const startDate = new Date(meetingDatetime as unknown as Date);
        const endDate = new Date(startDate.getTime() + 24 * 60 * 60 * 1000); // add 24 hours to the date
        // q = query(
        //   collection(db, "events"),
        //   where("meetingDatetime", ">=", startDate),
        //   where("meetingDatetime", "<=", endDate),
        //   where("title", ">=", keyword),
        //   where("title", "<=", keyword + '\uf8ff')
        // );
        // setMeetingDatetime(meetingDatetime)
        // setKeyword(keyword)
        if (meetingDatetime) {
          const startDate = new Date(meetingDatetime as unknown as Date);
          const endDate = new Date(startDate.getTime() + 24 * 60 * 60 * 1000); // add 24 hours to the date
          q = query(
            collection(db, "events"),
            where("meetingDatetime", ">=", startDate),
            where("meetingDatetime", "<=", endDate)
          );
          setMeetingDatetime(meetingDatetime)
        } else {
          q = query(
            collection(db, "events"),
            where("title", ">=", keyword),
            where("title", "<=", keyword + '\uf8ff')
          );
          setKeyword(keyword)
        }
        const snapShot = await getDocs(q);
        snapShot.forEach((doc) => {
          const data = doc.data();
          arrList.push({
            id: doc.id,
            title: data.title,
            imageUrl: data.imageUrl,
            meetingDatetime: data.meetingDatetime,
            body: data.body,
            address: data.address,
            user: data.user,
            long: data.long,
            lat: data.lat,
          })
        });
        setEvents(arrList);
      } catch (err) {
        console.log(err);
      }
    },
    [keyword, meetingDatetime]);

  useEffect(() => {
    handleGetEvents();
  }, [handleGetEvents]);



// const handleSearchEvents = useCallback(
//   async (newDate: string | Date | null ) => {
//     try {
//       const arrList: any = [];
//       let q;
//       if (newDate) {
//         const startDate = new Date(newDate);
//         const endDate = new Date(startDate.getTime() + 24 * 60 * 60 * 1000); // add 24 hours to the date
//         q = query(
//           collection(db, "events"),
//           where("meetingDatetime", ">=", startDate),
//           where("meetingDatetime", "<=", endDate)
//         );
//       } else {
//         q = query(
//           collection(db, "events"),
//           where("title", ">=", keyword),
//           where("title", "<=", keyword + '\uf8ff')
//         );
//         setMeetingDatetime(null);
//       }
//       const snapShot = await getDocs(q);
//       snapShot.forEach((doc) => {
//         const data = doc.data();
//         arrList.push({
//           id: doc.id,
//           title: data.title,
//           imageUrl: data.imageUrl,
//           meetingDatetime: data.meetingDatetime,
//           body: data.body,
//           address: data.address,
//           user: data.user,
//         })
//       });
//       setEvents(arrList);
//     } catch (err) {
//       console.log(err);
//     }
//   },
//   [keyword]
// );

  // const onChange = useCallback(
  //   async (newDate: string | Date | null) => {
  //     setMeetingDatetime(newDate);
  //     handleSearchEvents(newDate);
  //   },
  //   [handleSearchEvents]
  // );

  const StyledButton = styled(Button)`
    ${({ theme }) => `
    cursor: pointer;
    transition: ${theme.transitions.create(['background-color', 'transform'], {
      duration: theme.transitions.duration.standard,
    })};
    &:hover {
      box-shadow: 1px 4px 8px #D6D6D6;
    }
    `}
  `;

  return (
    <>
      <main>
        <Box
          sx={{
            bgcolor: "inherit",
            pt: 7,
            pl: 2,
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={8} sx={{ mt: 5 }}>
              <Typography
                variant='body2'
                sx={{ fontSize: 14, fontWeight: "normal", color: 'black' }}
              >
                {eventSearchTitle}
              </Typography>
              <Typography
                variant='body2'
                sx={{ fontSize: 26, fontWeight: "bold", color: 'black' }}
              >
                Events in {keyword}
              </Typography>
              <Stack
                sx={{ pt: 2 }}
                direction='row'
                spacing={1.5}
              >
                <StyledButton
                  variant="outlined"
                  size='large'
                  aria-label='Near your Location'
                  aria-haspopup='true'
                  onClick={() => {}}
                  color='inherit'
                  sx={{ borderRadius: 32, borderWidth: 1.5, borderColor: 'lightgray' , p: 1 , py: 0.4, textTransform: 'none'}}
                >
                  Near your Location
                </StyledButton>
                <StyledButton
                  variant="outlined"
                  size='large'
                  aria-label='Popular Events'
                  aria-haspopup='true'
                  onClick={() => {}}
                  color='inherit'
                  sx={{ borderRadius: 32, borderWidth: 1.5, borderColor: 'lightgray' , p: 1 , py: 0.4, textTransform: 'none'}}
                >
                  Popular Events
                </StyledButton>
                <StyledButton
                  variant="outlined"
                  size='large'
                  aria-label='Awesome Events'
                  aria-haspopup='true'
                  onClick={() => {}}
                  color='inherit'
                  sx={{ borderRadius: 32, borderWidth: 1.5, borderColor: 'lightgray' , p: 1 , py: 0.4, textTransform: 'none'}}
                >
                  Awesome Events
                </StyledButton>
              </Stack>
              <Divider sx={{pt: 2.5, mb: 2.5}}/>
              <Grid container spacing={2}>
                {/* @ts-ignore */}
                {events?.map((event) => (
                  <EventBox
                    key={event?.id}
                    // @ts-ignore
                    event={event}
                  />
                ))}
              </Grid>
            </Grid>
            <Grid item xs={4}>
              {!!events && <Map events={events}/>}
            </Grid>
          </Grid>
        </Box>
      </main>
    </>
  );
};

export default Search;
