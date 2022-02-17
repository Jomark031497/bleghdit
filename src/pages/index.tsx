import { NextPage } from "next";
import Head from "next/head";
import { Container, Typography, Box, Button, Snackbar, IconButton, Alert } from "@mui/material";
import { useEffect, useState } from "react";
import useSWRInfinite from "swr/infinite";
import { Post } from "../types";
import PostCard from "../components/PostCard";
import FrontPageSideBar from "../components/FrontPageSideBar";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useRouter } from "next/router";
import CloseIcon from "@mui/icons-material/Close";

const Home: NextPage = () => {
  const [observedPost, setObservedPost] = useState("");
  const { data, mutate, size: page, setSize: setPage, error } = useSWRInfinite((index) => `/posts?page=${index}`);
  const { data: user } = useSelector((state: RootState) => state.login);

  // for inifinite loading/scrolling; concatenate the data fetched from the useSWRInfinity
  const posts: Post[] = data ? [].concat(...data) : [];
  const isLoadingInitialData = !data && !error; // check if there's initial data

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!posts || posts.length === 0) return;
    const id = posts[posts.length - 1].identifier;
    if (id !== observedPost) {
      setObservedPost(id);
      observeElement(document.getElementById(id));
    }
  }, [posts]);

  const handleClose = () => {
    setOpenSnackbar(false);
  };

  const observeElement = (element: HTMLElement | null) => {
    if (!element) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPage(page + 1);
          observer.unobserve(element);
        }
      },
      { threshold: 1 }
    );
    observer.observe(element);
  };

  const handleCreate = () => {
    if (!user) {
      setOpenSnackbar(true);
      return;
    }
    router.push("/create-sub");
  };

  return (
    <>
      <Head>
        <title>bleghdit: the backpage of the internet.</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>

      <Container id="main-page-container" maxWidth="lg" sx={{ display: "flex", my: "3rem" }}>
        <Box id="main-content" sx={{ flex: 1 }}>
          <Box
            sx={{
              backgroundColor: "#fff",
              borderRadius: "0.5rem",
              my: "1rem",
              p: "1rem",

              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography>Recent Posts</Typography>
            <Button variant="contained" onClick={handleCreate}>
              CREATE A SUBBLEGHDIT
            </Button>
          </Box>
          {isLoadingInitialData ? (
            <Typography variant="subtitle1">loading...</Typography>
          ) : (
            <> {posts && posts.map((post: Post) => <PostCard post={post} mutate={mutate} key={post.identifier} />)}</>
          )}
        </Box>
        <Box id="sidebar" sx={{ flex: 0.4, display: { xs: "none", md: "block" } }}>
          <FrontPageSideBar />
        </Box>
      </Container>
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
          you must be logged in to create a subbleghdit
        </Alert>
      </Snackbar>
    </>
  );
};

export default Home;
