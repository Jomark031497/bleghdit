import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";

import {
  AppBar,
  Box,
  InputAdornment,
  Toolbar,
  Link as MuiLink,
  Typography,
  TextField,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import CButton from "./custom/CButton";

import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../redux/store";
import { logoutUser, setCurrentUser } from "../redux/features/auth/loginSlice";
import AuthMenu from "./AuthMenu";
import { Sub } from "../types";

const Header: React.FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { data } = useSelector((state: RootState) => state.login);

  const [name, setName] = useState("");
  const [subs, setSubs] = useState<Sub[]>([]);
  const [timer, setTimer] = useState<any>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  // event functions
  const handleClick = (ev: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(ev.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const handleLogout = async () => {
    try {
      await axios.get("/auth/logout", { withCredentials: true });
      dispatch(logoutUser());
      setAnchorEl(null);
      window.location.reload();
    } catch (err: any) {
      console.log(err);
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data } = await axios.get("/auth/me", { withCredentials: true });
        dispatch(setCurrentUser(data));
      } catch (err: any) {
        console.error(err.response.data.msg);
      }
    };
    checkAuth();
  }, []);

  useEffect(() => {
    if (name.trim() === "") {
      clearTimeout(timer);
      setSubs([]);
      return;
    }
    searchSubs();

    return () => {
      clearTimeout(timer);
      setSubs([]);
    };
  }, [name]);

  const searchSubs = async () => {
    clearTimeout(timer);
    setTimer(
      setTimeout(async () => {
        try {
          const { data } = await axios.get(`/subs/search/${name}`);
          setSubs(data);
        } catch (error) {
          console.error(error);
        }
      }, 500)
    );
  };

  const goToSub = (subName: string) => {
    setName("");
    router.push(`/r/${subName}`);
  };

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{ justifyContent: "center", backgroundColor: "white", height: { xs: "6vh", md: "5vh" } }}
      >
        <Toolbar sx={{ justifyContent: "space-between", alignItems: "center", px: "0.1rem" }}>
          <Box sx={{ ml: { xs: "0.5rem", md: " 2rem" } }}>
            <Link href="/" passHref>
              <MuiLink underline="none" color="textPrimary" sx={{ display: "flex", alignItems: "start" }}>
                <Image
                  src="https://res.cloudinary.com/dljwfddln/image/upload/v1641559699/leddit/bleghdit_logo.svg"
                  height={40}
                  width={40}
                />
                <Typography
                  variant="h5"
                  sx={{ fontWeight: "bolder", margin: "auto 0.3rem", display: { xs: "none", md: "block" } }}
                >
                  bleghdit.
                </Typography>
              </MuiLink>
            </Link>
          </Box>

          <Box sx={{ flex: 1, display: "flex", maxWidth: { xs: "50%", md: "40%" }, position: "relative" }}>
            <TextField
              placeholder="Search a subbleghdit"
              value={name}
              fullWidth
              variant="outlined"
              size="small"
              onChange={(e) => setName(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              sx={{
                "& input::placeholder": {
                  fontSize: {
                    xs: "0.7rem",
                    md: "1rem",
                  },
                },
              }}
            />
            <Box
              sx={{
                position: "absolute",
                background: "white",
                color: "black",
                top: "100%",
                left: 0,
                right: 0,
              }}
            >
              {subs?.map((sub) => (
                <Box
                  key={sub.name}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    p: "0.5rem",
                    m: "0.5rem",
                    borderBottom: "1px solid #000",
                    "&:hover": {
                      background: "lightgrey",
                    },
                  }}
                  onClick={() => goToSub(sub.name)}
                >
                  <Avatar src={sub.imageURN} sx={{ mr: "0.5rem" }} />
                  <Box>
                    <Typography variant="subtitle1">r/{sub.name}</Typography>
                    <Typography variant="body2">{sub.title}</Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton sx={{ display: { xs: "block", lg: "none" } }} onClick={handleClick}>
              <MenuIcon />
            </IconButton>
            <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
              {data?.username ? (
                <Box>
                  <MenuItem onClick={() => router.push(`/u/${data.username}`)} sx={{ color: "primary.main" }}>
                    {data.username}
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Box>
              ) : (
                <Box>
                  <MenuItem onClick={() => router.push("/login")}>Login</MenuItem>
                  <MenuItem onClick={() => router.push("/register")}>Sign Up</MenuItem>
                </Box>
              )}
            </Menu>
            <Box sx={{ display: { xs: "none", lg: "block" } }}>
              {data ? (
                <AuthMenu username={data.username} />
              ) : (
                <Box sx={{ display: "flex" }}>
                  <CButton variant="outlined" mx="0.3rem" onClick={() => router.push("/login")}>
                    Log In
                  </CButton>
                  <CButton variant="contained" mx="0.3rem" color="primary" onClick={() => router.push("/register")}>
                    Sign Up
                  </CButton>
                </Box>
              )}
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <Box sx={{ minHeight: { sx: "6vh", md: "5vh" } }} />
    </>
  );
};

export default Header;
