import { Alert, Box, Button, Container, IconButton, Snackbar, Typography } from "@mui/material";
import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";

import useSWR from "swr";
import PostCard from "../../components/PostCard";
import SubHeader from "../../components/SubHeader";
import SubSideBar from "../../components/SubSideBar";
import CloseIcon from "@mui/icons-material/Close";
import { Post, Sub } from "../../types";

import CreatePost from "@mui/icons-material/Create";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useState } from "react";
import CFab from "../../components/custom/CFab";

const Subleddit: NextPage = () => {
  const router = useRouter();

  const [openSnackbar, setOpenSnackbar] = useState(false);

  const { data: sub } = useSWR<Sub>(router.query.sub ? `/subs/${router.query.sub}` : null);
  const { data: user } = useSelector((state: RootState) => state.login);
  const actions = [
    {
      icon: <CreatePost />,
      name: "Create Post",
    },
  ];

  const fabAction = (operation: string) => {
    if (operation === "Create Post") {
      if (!user) {
        setOpenSnackbar(true);
        return;
      }
      router.push(`/r/${router.query.sub}/create`);
    }
  };

  const handleClose = () => {
    setOpenSnackbar(false);
  };

  return (
    <>
      <Head>
        <title>
          {sub?.title}: {sub?.description}
        </title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>

      {sub && (
        <>
          <SubHeader sub={sub} />
          <Container id="main-container" maxWidth="lg" sx={{ background: "transparent", pb: "1rem", display: "flex" }}>
            <Box id="main-content" sx={{ flex: 1, my: "1rem" }}>
              {sub.posts.length ? (
                sub.posts.map((post: Post) => <PostCard post={post} subImage={sub.imageURN} key={post.identifier} />)
              ) : (
                <Box>
                  <Typography variant="subtitle1" color="error">
                    There doesn{"'"}t seem to be anything here...
                  </Typography>
                </Box>
              )}
            </Box>

            <Box
              id="sidebar"
              sx={{ flex: 0.4, ml: { xs: 0, md: "1rem" }, my: "1rem", display: { xs: "none", md: "block" } }}
            >
              <SubSideBar sub={sub} />
            </Box>
          </Container>
          <Box sx={{ display: { xs: "block", md: "none" }, position: "relative", mt: 3, height: 320 }}>
            {/* <StyledSpeedDial ariaLabel="speed dial" icon={<SpeedDialIcon />} direction="up">
              {actions.map((action) => (
                <SpeedDialAction
                  key={action.name}
                  icon={action.icon}
                  tooltipTitle={action.name}
                  onClick={() => handleClick(action.name)}
                  tooltipOpen
                />
              ))}
            </StyledSpeedDial> */}

            <CFab actions={actions} fabAction={fabAction} />
            <Snackbar
              open={openSnackbar}
              onClose={handleClose}
              autoHideDuration={5000}
              anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
              <Alert
                severity="error"
                action={
                  <>
                    <Button variant="contained" color="primary" size="small" onClick={() => router.push("/login")}>
                      log in
                    </Button>
                    <IconButton size="small" color="inherit" onClick={handleClose}>
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  </>
                }
              >
                you must be logged in to create a post
              </Alert>
            </Snackbar>
          </Box>
        </>
      )}
    </>
  );
};

export default Subleddit;
