import { Avatar, Box, Container, Divider, Typography } from "@mui/material";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import useSWR from "swr";
import dayjs from "dayjs";
import PostCard from "../../components/PostCard";
import { CommentType, Post } from "../../types";
import CButton from "../../components/custom/CButton";
import CLink from "../../components/custom/CLink";
import Head from "next/head";

const UserPage: NextPage = () => {
  const router = useRouter();

  const [tab, setTab] = useState("overview");

  const { data: userSubmissions } = useSWR<any>(router.query.username ? `/posts/user/${router.query.username}` : null);

  return (
    <>
      <Head>
        <title>{router.query?.username}</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>

      <Container maxWidth="lg" sx={{ background: "transparent", display: "flex", flexDirection: "column" }}>
        <Box sx={{ width: "100%", backgroundColor: "#fff", display: "flex", py: "0.3rem", mt: "5rem" }}>
          <CButton onClick={() => setTab("overview")} color={tab === "overview" ? "primary" : "inherit"}>
            Overview
          </CButton>
          <CButton onClick={() => setTab("posts")} color={tab === "posts" ? "primary" : "inherit"}>
            Posts
          </CButton>
          <CButton onClick={() => setTab("comments")} color={tab === "comments" ? "primary" : "inherit"}>
            Comments
          </CButton>
        </Box>
        <Box sx={{ display: "flex", marginTop: "1rem" }}>
          <Box sx={{ backgroundColor: "#eee", flex: 1, mr: "0.5rem", px: "1rem" }}>
            {tab === "overview" && (
              <Box>
                {userSubmissions &&
                  userSubmissions.submissions.map((submission: any) => {
                    if (submission.type === "POST") {
                      const post: Post = submission;
                      return (
                        <Box sx={{ pt: "0.5rem" }} key={post.identifier}>
                          <PostCard post={post} />
                        </Box>
                      );
                    } else {
                      const comment: CommentType = submission;
                      return (
                        <Box sx={{ backgroundColor: "#fff", mb: "0.5rem" }} key={comment.identifier}>
                          <Box sx={{ display: "flex", alignItems: "center", pt: "0.5rem", pl: "0.5rem" }}>
                            <Box>
                              <Avatar src="https://www.redditstatic.com/avatars/defaults/v2/avatar_default_3.png" />
                            </Box>
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                              <CLink
                                href={`/u/${comment.username}`}
                                label={comment.username}
                                variant="subtitle2"
                                sx={{ px: "0.3rem" }}
                              />
                              <Typography variant="body2" color="textSecondary">
                                commented on
                              </Typography>
                              <CLink
                                href={`/r/${comment.post.subName}/${comment.post.identifier}/${comment.post.slug}`}
                                variant="subtitle2"
                                label={comment.post.title}
                                color="textPrimary"
                                sx={{ px: "0.3rem" }}
                              />
                              <Typography variant="subtitle2" color="textSecondary">
                                •
                              </Typography>
                              <CLink
                                href={`/r/${comment.post.subName}`}
                                variant="subtitle2"
                                label={`r/${comment.post.subName}`}
                                color="textPrimary"
                                sx={{ px: "0.3rem" }}
                              />
                            </Box>
                          </Box>
                          <Divider sx={{ mt: "0.3rem" }} />
                          <Box>
                            <Typography sx={{ p: "1rem 2rem", whiteSpace: "pre-wrap" }}>{comment.body}</Typography>
                          </Box>
                        </Box>
                      );
                    }
                  })}
              </Box>
            )}
            {tab === "posts" && (
              <Box sx={{ backgroundColor: "#eee", mt: "1rem" }}>
                {userSubmissions &&
                  userSubmissions.submissions.map((submission: any) => {
                    if (submission.type === "POST") {
                      const post: Post = submission;
                      return <PostCard post={post} key={post.identifier} />;
                    } else return null;
                  })}
              </Box>
            )}
            {tab === "comments" && (
              <Box sx={{ backgroundColor: "#eee", mt: "1rem" }}>
                {userSubmissions &&
                  userSubmissions.submissions.map((submission: any) => {
                    if (submission.type === "COMMENT") {
                      const comment: CommentType = submission;
                      return (
                        <Box sx={{ backgroundColor: "#fff", mb: "0.5rem" }} key={comment.identifier}>
                          <Box sx={{ display: "flex", alignItems: "center", pt: "0.5rem", pl: "0.5rem" }}>
                            <Box>
                              <Avatar src="https://www.redditstatic.com/avatars/defaults/v2/avatar_default_3.png" />
                            </Box>
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                              <CLink
                                href={`/u/${comment.username}`}
                                label={comment.username}
                                variant="subtitle2"
                                sx={{ px: "0.3rem" }}
                              />
                              <Typography variant="body2" color="textSecondary">
                                commented on
                              </Typography>
                              <CLink
                                href={`/r/${comment.post.subName}/${comment.post.identifier}/${comment.post.slug}`}
                                variant="subtitle2"
                                label={comment.post.title}
                                color="textPrimary"
                                sx={{ px: "0.3rem" }}
                              />
                              <Typography variant="subtitle2" color="textSecondary">
                                •
                              </Typography>
                              <CLink
                                href={`/r/${comment.post.subName}`}
                                variant="subtitle2"
                                label={`r/${comment.post.subName}`}
                                color="textPrimary"
                                sx={{ px: "0.3rem" }}
                              />
                            </Box>
                          </Box>
                          <Divider sx={{ mt: "0.3rem" }} />
                          <Box>
                            <Typography sx={{ p: "1rem 2rem", whiteSpace: "pre-wrap" }}>{comment.body}</Typography>
                          </Box>
                        </Box>
                      );
                    } else return null;
                  })}
              </Box>
            )}
          </Box>

          <Box
            id="sidebar"
            sx={{ backgroundColor: "#fff", flex: 0.3, height: "40vh", display: { xs: "none", md: "block" } }}
          >
            <Box sx={{ background: "#4386bd", height: "8vh" }} />
            <Box sx={{ display: "flex", alignItems: "center", padding: "1rem 0.5rem" }}>
              <Avatar src="https://www.redditstatic.com/avatars/defaults/v2/avatar_default_3.png" />

              <Typography>u/{userSubmissions?.user.username}</Typography>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column", p: "1rem" }}>
              <Typography>Cake Day</Typography>
              <Typography>{dayjs(userSubmissions?.user.createdAt).format("MMM DD, YYYY")}</Typography>
            </Box>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default UserPage;
