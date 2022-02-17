import { Box, Button } from "@mui/material";
import CommentIcon from "@mui/icons-material/ModeCommentOutlined";
import SaveIcon from "@mui/icons-material/BookmarkBorderOutlined";
import ShareIcon from "@mui/icons-material/ShareOutlined";
import { Post } from "../types";
import { useRouter } from "next/router";

interface Props {
  post: Post;
}

const PostActionButtons: React.FC<Props> = ({ post }) => {
  const router = useRouter();
  return (
    <Box sx={{ display: "flex" }}>
      <Button
        startIcon={<CommentIcon />}
        size="small"
        sx={{ mx: "0.3rem", color: "text.secondary" }}
        onClick={() => router.push(`/r/${post.subName}/${post.identifier}/${post.slug}`)}
      >
        {post.comments?.length} Comments
      </Button>
      <Button startIcon={<ShareIcon />} size="small" sx={{ mx: "0.3rem", color: "text.secondary" }}>
        Share
      </Button>
      <Button startIcon={<SaveIcon />} size="small" sx={{ mx: "0.3rem", color: "text.secondary" }}>
        Save
      </Button>
    </Box>
  );
};

export default PostActionButtons;
