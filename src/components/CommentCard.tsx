import { Box, Typography } from "@mui/material";
import Image from "next/image";

import { CommentType, Post } from "../types";
import CLink from "./custom/CLink";
import UpvoteDownVote from "./UpvoteDownVote";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

interface Props {
  post: Post;
  comment: CommentType;
}

const CommentCard: React.FC<Props> = ({ post, comment }) => {
  return (
    <Box key={comment.identifier} sx={{ m: "1rem auto", display: "flex" }}>
      <Box>
        <UpvoteDownVote post={post} comment={comment} />
      </Box>
      <Box sx={{ p: "0.5rem" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box
            sx={{
              borderRadius: "50px",
              overflow: "hidden",
              position: "relative",
              width: "2.5rem",
              height: "2.5rem",
            }}
          >
            <Image
              src="https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
              layout="fill"
              objectFit="cover"
            />
          </Box>
          <CLink
            label={comment.username}
            href={`/u/${comment.username}`}
            variant="subtitle1"
            color="textPrimary"
            sx={{ mx: "0.3rem" }}
          />
          <Typography>•</Typography>
          <CLink
            label={`${dayjs(comment.createdAt).fromNow()}`}
            href={`/u/${comment.username}`}
            variant="subtitle2"
            color="textSecondary"
            sx={{ mx: "0.3rem" }}
          />
        </Box>
        <Box sx={{ m: "0.5rem 1rem" }}>
          <Typography variant="body1" sx={{ whiteSpace: "pre-wrap" }}>
            {comment.body}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default CommentCard;
