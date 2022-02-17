import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import { Avatar, Box, Typography } from "@mui/material";
import { Post } from "../types";
import CLink from "./custom/CLink";
import Image from "next/image";
import { getFirstLetter } from "../lib/getFirstLetter";

dayjs.extend(relativeTime);

interface Props {
  post: Post;
  subImage?: string;
}

const PostData: React.FC<Props> = ({ post, subImage }) => {
  return (
    <>
      {post && (
        <Box
          id="post-data-container"
          sx={{
            display: "flex",
            alignItems: { xs: "flex-start", sm: "center" },
            flexDirection: { xs: "column", sm: "row" },
          }}
        >
          {post.sub?.imageURN ? (
            <Box id="sub-image-container" sx={{ display: "flex", alignItems: "center" }}>
              <Box
                sx={{
                  borderRadius: "50px",
                  overflow: "hidden",
                  position: "relative",
                  width: "2.5rem",
                  height: "2.5rem",
                }}
              >
                <Image src={post.sub.imageURN} layout="fill" objectFit="cover" />
              </Box>

              <CLink
                href={`/r/${post.subName}`}
                variant="subtitle2"
                label={`r/${post.subName}`}
                color="textPrimary"
                sx={{ ml: "0.3rem" }}
              />
            </Box>
          ) : (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              {subImage ? (
                <Avatar
                  src={subImage}
                  alt="subreddit image"
                  sx={{ width: "2.5rem", height: "2.5rem", backgroundColor: "#111", mx: "0.5rem" }}
                />
              ) : (
                <Avatar sx={{ width: "2.5rem", height: "2.5rem", backgroundColor: "#111", mx: "0.5rem" }}>
                  {getFirstLetter(post.subName)}
                </Avatar>
              )}
              <CLink
                href={`/r/${post.subName}`}
                variant="subtitle2"
                label={`r/${post.subName}`}
                color="textPrimary"
                sx={{ ml: "0.3rem" }}
              />
            </Box>
          )}

          <Box id="sub-name-container" sx={{ display: "flex", alignItems: "center" }}></Box>
          <Box id="post-metadata-container" sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="subtitle2" color="textSecondary" sx={{ mx: "0.2rem" }}>
              •
            </Typography>
            <Typography variant="subtitle2" color="textSecondary">
              Posted by
            </Typography>
            <CLink
              href={`/u/${post.username}`}
              variant="subtitle2"
              color="textSecondary"
              label={`u/${post.username}`}
              sx={{ mx: "0.3rem" }}
            />

            <CLink
              href={`/u/${post.username}`}
              variant="subtitle2"
              color="textSecondary"
              label={dayjs(post.createdAt).fromNow()}
            />
          </Box>
        </Box>
      )}
    </>
  );
};

export default PostData;
