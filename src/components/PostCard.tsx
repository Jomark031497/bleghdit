import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import { Box, Card, Typography } from "@mui/material";

import { Post } from "../types";
import UpvoteDownVote from "./UpvoteDownVote";
import PostData from "./PostData";
import PostActionButtons from "./PostActionButtons";
import ReadMore from "./custom/ReadMore";
import { useRouter } from "next/router";

dayjs.extend(relativeTime);

interface PostProps {
  post: Post;
  mutate?: Function;
  subImage?: string;
}

const PostCard: React.FC<PostProps> = ({ post, mutate, subImage }) => {
  const router = useRouter();

  return (
    <>
      {post && (
        <Card
          sx={{
            display: "flex",
            mb: "0.7rem",
            background: "white",

            border: "0.1px solid transparent",
            borderRadius: "0.5rem",
            "&:hover": {
              border: "0.1px solid black",
              transition: "0.1s ease-in",
              cursor: "pointer",
            },
          }}
          id={post.identifier}
        >
          <UpvoteDownVote post={post} mutate={mutate} />

          <Box sx={{ display: "flex", flexDirection: "column", flex: 8.5, m: "0.3rem 0.5rem" }} id="main-card-content">
            <Box id="link-children-parent">
              <PostData post={post} subImage={subImage} />

              <Box sx={{ m: "0.5rem" }}>
                <Typography
                  variant="h6"
                  sx={{ "&:hover": { textDecoration: "underline" } }}
                  onClick={() => router.push(`/r/${post.subName}/${post.identifier}/${post.slug}`)}
                >
                  {post.title}
                </Typography>

                {post.body && <ReadMore text={post.body} link={`/r/${post.subName}/${post.identifier}/${post.slug}`} />}
              </Box>

              <PostActionButtons post={post} />
            </Box>
          </Box>
        </Card>
      )}
    </>
  );
};

export default PostCard;
