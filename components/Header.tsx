import React, { useCallback, useContext, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import SendIcon from "@mui/icons-material/Send";
import SearchIcon from "@mui/icons-material/Search";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Avatar from "@mui/material/Avatar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import { createTheme, styled, alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Menu from "@mui/material/Menu";
import InputBase from "@mui/material/InputBase";
import Stack from "@mui/material/Stack";
import moment from "moment";
import Container from "@mui/material/Container";

import { AuthContext } from "../pages/_app"
import { auth } from '../firebase';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';

const Header: React.FC = () => {
  const [openCalender, setOpenCalender] = useState(false);
  const { isSignedIn, setIsSignedIn, currentUser} = useContext(AuthContext)
  const [keyword, setKeyword] = useState("");
  const [meetingDatetime, setMeetingDatetime] = useState<string | Date | null>();
  const router = useRouter();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = useCallback(async () => {
    try {
      await auth.signOut();
      router.push("/SignIn");
      setAnchorEl(null);
      setIsSignedIn(false);
      console.log("Succeeded in sign out");
    } catch (err) {
      console.log(err);
    }
  }, [router, setIsSignedIn]);

  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: 32,
    border: '1.5px solid rgba(0, 0, 0, 0.5)',
    borderColor: 'lightgray',
    backgroundColor: alpha(theme.palette.common.white, 1),
    // "&:hover": {
    //   backgroundColor: alpha(theme.palette.common.black, 0.0025),
    // },
    minWidth: 300,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "auto",
    },
  }));

  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 1),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    right: 0,
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1.4, 1.4, 1.4, 0),
      paddingLeft: `calc(1em + ${theme.spacing(1)})`,
      // transition: theme.transitions.create("width"),
      width: "100%",
    },
  }));

  const handleSearchEvents = useCallback(
    async () => {
      try {
        router.push({
          pathname: '/search',
          query: {
            keyword: keyword || '',
            // @ts-ignore
            meetingDatetime: meetingDatetime || '',
          }
        })
      } catch (err) {
        console.log(err);
      }
    },
    [keyword, meetingDatetime, router]
  );

  const onChange = useCallback(
    async (newDate: string | Date | null) => {
      setMeetingDatetime(newDate);
      // handleSearchEvents();
    },
    []
  );

  const renderMenu = (
    <Menu
    anchorEl={anchorEl}
    id='account-menu'
    open={open}
    onClose={handleClose}
    onClick={handleClose}
    PaperProps={{
      elevation: 0,
      sx: {
        overflow: "visible",
        filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
        mt: 1.5,
        "& .MuiAvatar-root": {
          width: 32,
          height: 32,
          ml: -0.5,
          mr: 1,
        },
        "&:before": {
          content: '""',
          display: "block",
          position: "absolute",
          top: 0,
          right: 14,
          width: 10,
          height: 10,
          bgcolor: "background.paper",
          transform: "translateY(-50%) rotate(45deg)",
          zIndex: 0,
        },
      },
    }}
    transformOrigin={{ horizontal: "right", vertical: "top" }}
    anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
  >
    {open && isSignedIn ? (
      <>
        <ListItemButton
          color='inherit'
          href='/events/Create'
          onClick={() => setAnchorEl(null)}
          component="a"
          LinkComponent={Link}
        >
          <SendIcon />
          <ListItemText
            primary={"Create event"}
            primaryTypographyProps={{
              fontSize: 14,
              fontWeight: "medium",
              marginLeft: 2,
            }}
          />
        </ListItemButton>
        <ListItemButton
          color='inherit'
          href={"/notifications/NotificationsList"}
          onClick={() => setAnchorEl(null)}
          component="a"
          LinkComponent={Link}
        >
          <Badge
            color='primary'
          >
            <NotificationsIcon />
          </Badge>
          <ListItemText
            primary={"Notifications"}
            primaryTypographyProps={{
              fontSize: 14,
              fontWeight: "medium",
              marginLeft: 2,
            }}
          />
        </ListItemButton>
        <ListItemButton
          color='inherit'
          href={`/chat_rooms/ChatRooms`}
          onClick={() => setAnchorEl(null)}
          component="a"
          LinkComponent={Link}
        >
          <ChatBubbleIcon />
          <ListItemText
            primary={"Chat room"}
            primaryTypographyProps={{
              fontSize: 14,
              fontWeight: "medium",
              marginLeft: 2,
            }}
          />
        </ListItemButton>
        <ListItemButton
          color='inherit'
          href={`/users/show/${currentUser?.uid}`}
          onClick={() => setAnchorEl(null)}
          component="a"
          LinkComponent={Link}
        >
          <Avatar
            src={currentUser?.photoURL}
          />
          <ListItemText
            primary={"My page"}
            primaryTypographyProps={{
              fontSize: 14,
              fontWeight: "medium",
              marginLeft: 0.5,
            }}
          />
        </ListItemButton>
        <ListItemButton onClick={handleSignOut}>
          <ExitToAppIcon />
          <ListItemText
            primary={"Sign out"}
            primaryTypographyProps={{
              fontSize: 14,
              fontWeight: "medium",
              marginLeft: 2,
            }}
          />
        </ListItemButton>
      </>
    ) : (
      open &&
      !isSignedIn && (
        <>
          <Button
            href='/SignUp'
            onClick={() => setAnchorEl(null)}
            component="a"
            LinkComponent={Link}
          >
            Sign up
          </Button>
          <Button
            href='/SignIn'
            onClick={() => setAnchorEl(null)}
            component="a"
            LinkComponent={Link}
          >
            Sign in
          </Button>
        </>
      )
    )}
  </Menu>
  )

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position='fixed'
        color='inherit'
        elevation={0}
        sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
      >
        <Toolbar>
          <FitnessCenterIcon sx={{ mr: 0.5, display: {md: 'flex', xs: 'none'}, color: "#F33333" }} />
          <Typography variant='h6' color='inherit' noWrap sx={{ flexGrow: 1, display: {md: 'flex', xs: 'none'} }}>
            <Link
              href='/'
              style={{ color: "#F33333", textDecoration: "none", fontFamily: 'fantasy', fontWeight: 'bold', fontSize: 20, paddingTop: 3 }}
            >
              GymGo
            </Link>
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon sx={{borderRadius: 32, bgcolor: '#F77777', p: 0.4, color: 'white'}}/>
            </SearchIconWrapper>
            <StyledInputBase
              autoFocus
              fullWidth
              placeholder='Start your search'
              inputProps={{ "aria-label": "search" }}
              defaultValue={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearchEvents();
                }
              }}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "flex" } }}>
            <Button
              variant="outlined"
              size='large'
              aria-label='show more'
              aria-haspopup='true'
              onClick={(e) => (open ? handleClose() : handleClick(e))}
              color='inherit'
              sx={{ borderRadius: 32, borderWidth: 1.5, borderColor: 'lightgray' , p: 1 , pt: 0.4, pb: 0.4}}
            >
              <MenuIcon fontSize='large' htmlColor="gray" sx={{pr: 1}}/>
              <AccountCircle htmlColor="gray" />
            </Button>
          </Box>
        </Toolbar>
        {renderMenu}
      </AppBar>
      {keyword && (
        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 7,
            pb: 6,
          }}
        >
          <Container maxWidth='sm' fixed>
            <Stack sx={{ pt: 0 }} spacing={0} justifyContent='center'>
              <Stack
                sx={{ pt: 2 }}
                direction='row'
                spacing={0.5}
              >
                {/* <Stack
                  sx={{ pt: 2.7 }}
                  spacing={1}
                  justifyContent='start'
                  alignItems='flex-start'
                >
                  <Button
                    color='inherit'
                    onClick={() =>
                      onChange(moment(new Date()).format("YYYY/MM/DD"))
                    }
                    style={{ borderRadius: 32, fontSize: 13 }}
                  >
                    Today
                  </Button>
                  <Divider sx={{ width: '100%' }} />
                  <Button
                    color='inherit'
                    onClick={() => {
                      const now = new Date();
                      let yesterday = new Date(
                        now.getFullYear(),
                        now.getMonth(),
                        now.getDate() + 1
                      );
                      onChange(moment(yesterday).format("YYYY/MM/DD"));
                    }}
                    style={{ borderRadius: 32, fontSize: 13 }}
                  >
                    Tommorow
                  </Button>
                  <Divider sx={{ width: '100%' }}/>
                  <Button
                    color='inherit'
                    onClick={() => {
                      const now = new Date();
                      let yesterday = new Date(
                        now.getFullYear(),
                        now.getMonth(),
                        now.getDate() + 2
                      );
                      onChange(moment(yesterday).format("YYYY/MM/DD"));
                    }}
                    style={{ borderRadius: 32, fontSize: 13 }}
                  >
                    Day after tommorow
                  </Button>
                  <Divider sx={{ width: '100%' }}/>
                </Stack> */}
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                <StaticDatePicker
                  onAccept={(e) => {
                    onChange(e);
                    handleSearchEvents();
                  }}
                  onClose={() => setKeyword('')}
                  defaultValue={meetingDatetime && moment(new Date(meetingDatetime!)).format("YYYY/MM/DD")}
                  sx={{width: 600}} />
                </LocalizationProvider>
              </Stack>
            </Stack>
          </Container>
        </Box>
      )}
  </Box>
  );
};

export default Header;
