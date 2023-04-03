import React, { useCallback, useContext } from "react";
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
import MoreIcon from "@mui/icons-material/MoreVert";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import GlobalStyles from "@mui/material/GlobalStyles";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Menu from "@mui/material/Menu";
import { AuthContext } from "../pages/_app"
import { auth } from '../firebase';

const Header: React.FC = () => {
  const { isSignedIn, setIsSignedIn, currentUser} = useContext(AuthContext)
  const router = useRouter();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const theme = createTheme();

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

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles
        styles={{ ul: { margin: 0, padding: 0, listStyle: "none" } }}
      />
      <CssBaseline />
      <AppBar
        position='sticky'
        color='default'
        elevation={0}
        sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
      >
        <Toolbar sx={{ flexWrap: "wrap" }}>
          <FitnessCenterIcon sx={{ mr: 2 }} />
          <Typography variant='h6' color='inherit' noWrap sx={{ flexGrow: 1 }}>
            <Link
              href='/'
              style={{ color: "black", textDecoration: "none" }}
            >
              GymGo
            </Link>
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            {isSignedIn ? (
              <>
                <Button
                  color='inherit'
                  href='/events/Create'
                  component="a"
                  LinkComponent={Link}
                >
                  <SendIcon />
                </Button>
                <Button
                  color='inherit'
                  href={"/"}
                  component="a"
                  LinkComponent={Link}
                >
                  <SearchIcon />
                </Button>
                <Button
                  color='inherit'
                  href={"/notifications/NotificationsList"}
                  component="a"
                  LinkComponent={Link}
                >
                  <Badge
                    color='primary'
                  >
                    <NotificationsIcon />
                  </Badge>
                </Button>
                <Button
                  color='inherit'
                  href={`/chat_rooms/ChatRooms`}
                  component="a"
                  LinkComponent={Link}
                >
                  <ChatBubbleIcon />
                </Button>
                <Button
                  color='inherit'
                  href={`/users/show/${currentUser?.uid}`}
                  component="a"
                  LinkComponent={Link}
                >
                  <Avatar src={currentUser?.photoURL}>
                    {currentUser?.displayName?.charAt(0)}
                  </Avatar>
                </Button>
                <Button
                  color='inherit'
                  onClick={handleSignOut}
                >
                  <ExitToAppIcon />
                </Button>
              </>
            ) : (
              <>
                <Button
                  href='/SignUp'
                  component="a"
                  LinkComponent={Link}
                >
                  Sign up
                </Button>
                <Button
                  href='/SignIn'
                  component="a"
                  LinkComponent={Link}
                >
                  Sign in
                </Button>
              </>
            )}
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size='large'
              aria-label='show more'
              aria-haspopup='true'
              onClick={(e) => (open ? handleClose() : handleClick(e))}
              color='inherit'
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
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
                href={"/"}
                onClick={() => setAnchorEl(null)}
                component="a"
                LinkComponent={Link}
              >
                <SearchIcon />
                <ListItemText
                  primary={"Search"}
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
                  sx={{ width: 24, height: 24 }}
                />
                <ListItemText
                  primary={"My page"}
                  primaryTypographyProps={{
                    fontSize: 14,
                    fontWeight: "medium",
                    marginLeft: 2,
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
      </AppBar>
    </ThemeProvider>
  );
};

export default Header;
