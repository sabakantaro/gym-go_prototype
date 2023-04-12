import React, { useContext } from "react";
import Link from "next/link";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import moment from "moment";
import LocationOnIcon from "@mui/icons-material/LocationOnOutlined";
import EventIcon from "@mui/icons-material/Event";
import CardHeader from "@mui/material/CardHeader";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import StarIcon from "@mui/icons-material/Star";
import { Box, Link as MUILink, Stack } from '@mui/material';
import { AuthContext } from "../pages/_app";
import {Event} from "../types/my-module"
import {
  createTheme,
  ThemeProvider,
  styled,
  alpha,
} from "@mui/material/styles";

type Props = {
  event: Event;
}

const EventBox: React.FC<Props> = ({ event }) => {

  const StyledBox = styled(Box)`
    ${({ theme }) => `
    cursor: pointer;
    transition: ${theme.transitions.create(['background-color', 'transform'], {
      duration: theme.transitions.duration.standard,
    })};
    &:hover {
      box-shadow: 1px 8px 12px #D6D6D6;
      filter: opacity(90%);
    }
    `}
  `;

  return (
    <Grid item xs={12}>
      <MUILink
        style={{ color: "black", textDecoration: "none" }}
        href={`/events/show/${event?.id}`}
      >
        <StyledBox
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "row",
            borderBottom: 0.1,
            borderColor: 'lightgray'
          }}
        >
          <Box sx={{ p: 1.1, pb: 3.6 }}>
            <CardMedia
              component='img'
              src={event?.imageUrl}
              alt='Event image'
              sx={{width: 320, height: 210, borderRadius: 4 }}
            />
          </Box>
          <CardContent sx={{ flexGrow: 1, p: 1.1, position: 'relative' }}>
            <Typography
              variant='h2'
              sx={{
                pt: 0.75,
                textOverflow: "ellipsis",
                fontSize: 18,
                fontWeight: 'bold',
                color: 'rgb(135 116 87)'
              }}
            >
              {event?.meetingDatetime && moment(new Date(event?.meetingDatetime?.seconds * 1000)).format("dddd, MMMM DD, YYYY・HH:mm")}
            </Typography>
            <FavoriteBorderIcon sx={{ color: '#black', position: 'absolute', right: 30, top: 20}} fontSize='large' />
            <Typography
              gutterBottom
              variant='h5'
              sx={{
                pt: 0.75,
                overflow: "hidden",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
                fontWeight: 'bold',
                fontSize: 18,
              }}
            >
              {event?.title}
            </Typography>
            <Typography
              variant='body2'
              sx={{
                overflow: "hidden",
                whiteSpace: "pre-wrap",
                textOverflow: "ellipsis",
                fontSize: 16,
              }}
            >
              {event?.user?.displayName}
            </Typography>
            <Typography
              variant='body2'
              sx={{
                overflow: "hidden",
                whiteSpace: "pre-wrap",
                textOverflow: "ellipsis",
                fontSize: 16,
              }}
            >
              {event?.address}
            </Typography>
            <Stack
              sx={{ position: 'absolute', bottom: 30 }}
              direction='row'
            >
              <StarIcon sx={{color: '#F24748'}} />
              <Typography
                variant='body2'
                sx={{
                  fontSize: 18,
                }}
              >
                {event?.user?.score || 4.5}
              </Typography>
            </Stack>
            <Typography
                variant='body2'
                sx={{
                  fontSize: 18,
                  position: 'absolute',
                  right: 30,
                  bottom: 30,
                }}
              >
              {event?.user?.price || 'Free'}
            </Typography>
          </CardContent>
        </StyledBox>
      </MUILink>
    </Grid>
  );
};

export default EventBox;
