import {
  Box,
  Container,
  Typography,
  Button,
  Divider,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  styled,
} from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
import useSWR, { mutate } from "swr";
import { Post, CommentType } from "../../../../types";
import UpvoteDownVote from "../../../../components/UpvoteDownVote";
import PostData from "../../../../components/PostData";
import SubSideBar from "../../../../components/SubSideBar";
import PostActionButtons from "../../../../components/PostActionButtons";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import axios from "axios";
import { NextPage } from "next";
import CommentCard from "../../../../components/CommentCard";
import { Field, Form, Formik } from "formik";
import CTextField from "../../../../components/custom/CTextField";
import CButton from "../../../../components/custom/CButton";
dayjs.extend(relativeTime);
import CreatePost from "@mui/icons-material/Create";
import CLink from "../../../../components/custom/CLink";

const PostPage: NextPage = () => {
  const router = useRouter();
  const { data } = useSelector((state: RootState) => state.login);
  const { identifier, slug } = router.query;

  const { data: post, error } = useSWR<Post>(identifier && slug ? `/posts/${identifier}/${slug}` : null);
  const { data: comments } = useSWR<CommentType[]>(identifier && slug ? `/posts/${identifier}/${slug}/comments` : null);
  if (error) {
    router.push("/");
  } // redirtect to homepage if no post is found

  const actions = [
    {
      icon: <CreatePost />,
      name: "Create Post",
      action: {},
    },
  ];

  const handleClick = (operation: string) => {
    if (operation === "Create Post") {
      router.push(`/r/${router.query.sub}/create`);
    }
  };

  const addComment = async (body: string) => {
    if (!body) return;

    try {
      await axios.post(`/posts/${post?.identifier}/${post?.slug}/comments`, { body });

      mutate(`/posts/${identifier}/${slug}/comments`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Head>
        <title>
          {post?.subName}: {post?.title}
        </title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      {post && (
        <Box sx={{ backgroundColor: "#2e2f2f", minHeight: "95vh", width: "100%" }}>
          <Container maxWidth="lg" disableGutters sx={{ backgroundColor: "#edeff1", minHeight: "95vh" }}>
            <Box
              sx={{
                display: "flex",
                backgroundColor: "skyblue",
                color: "#fff",
                p: "1rem 2rem",
                width: "100%",
                height: "10vh",
                alignItems: "center",
              }}
            >
              <CLink variant="h5" label={`/r/${post.subName}`} href={`/r/${post.subName}`} color="textPrimary" />
            </Box>

            <Box
              sx={{
                backgroundColor: "transparent",
                display: "flex",
                p: "1rem",
              }}
            >
              <Box sx={{ flex: 1, mt: "1rem" }}>
                <Box sx={{ background: "white", display: "flex" }}>
                  <Box>
                    <UpvoteDownVote post={post} />
                  </Box>

                  <Box sx={{ flex: 1, pt: "0.5rem" }}>
                    <PostData post={post} />
                    <Box sx={{ p: "0.5rem" }}>
                      <Typography variant="h5">{post.title}</Typography>
                      {post.body && (
                        <Typography variant="body1" sx={{ margin: "0.5rem auto", whiteSpace: "pre-wrap" }}>
                          {post.body}
                        </Typography>
                      )}
                    </Box>
                    <PostActionButtons post={post} />
                  </Box>
                </Box>

                <Box sx={{ background: "white", marginTop: "1rem", padding: "1rem" }}>
                  {data ? (
                    <Formik
                      initialValues={{ body: "" }}
                      onSubmit={(values) => {
                        addComment(values.body);
                        values.body = "";
                      }}
                    >
                      {() => (
                        <Box
                          component={Form}
                          sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}
                        >
                          <Field
                            as={CTextField}
                            name="body"
                            placeholder="What are your thoughts?"
                            multiline
                            minRows={5}
                          />

                          <CButton type="submit" variant="contained" sx={{ alignSelf: "stretch" }}>
                            Comment
                          </CButton>
                        </Box>
                      )}
                    </Formik>
                  ) : (
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        flexDirection: { xs: "column", md: "row" },
                        background: "rgba(0,0,0,0.3)",
                        p: "1rem",
                        borderRadius: "0.5rem",
                      }}
                    >
                      <Typography variant="h6" color="textSecondary">
                        Login or sign up to leave a comment
                      </Typography>

                      <Box>
                        <Button
                          variant="outlined"
                          onClick={() => router.push("/login")}
                          style={{ margin: "auto 0.5rem" }}
                        >
                          LOG IN
                        </Button>
                        <Button
                          variant="contained"
                          onClick={() => router.push("/register")}
                          style={{ margin: "auto 0.5rem" }}
                        >
                          SIGN UP
                        </Button>
                      </Box>
                    </Box>
                  )}
                  <hr />
                  <Box>
                    {comments &&
                      comments.map((comment) => (
                        <Box key={comment.identifier}>
                          <CommentCard post={post} comment={comment} />
                          <Divider />
                        </Box>
                      ))}
                  </Box>
                </Box>
              </Box>

              <Box sx={{ flex: 0.4, my: "1rem", ml: "1rem", display: { xs: "none", md: "block" } }}>
                <SubSideBar sub={post.sub} />
              </Box>
            </Box>
          </Container>
          <Box sx={{ display: { xs: "block", md: "none" }, position: "relative", mt: 3, height: 320 }}>
            <StyledSpeedDial ariaLabel="speed dial" icon={<SpeedDialIcon />} direction="up">
              {actions.map((action) => (
                <SpeedDialAction
                  key={action.name}
                  icon={action.icon}
                  tooltipTitle={action.name}
                  onClick={() => handleClick(action.name)}
                  tooltipOpen
                />
              ))}
            </StyledSpeedDial>
          </Box>
        </Box>
      )}
    </>
  );
};

const StyledSpeedDial = styled(SpeedDial)(({ theme }) => ({
  position: "fixed",
  "&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft": {
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  "&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight": {
    top: theme.spacing(2),
    left: theme.spacing(2),
  },
}));

export default PostPage;
