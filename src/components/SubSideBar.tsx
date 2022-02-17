import { Box, Typography, Button, Avatar, Divider, Alert, Snackbar } from "@mui/material";
import { Sub } from "../types";
import CakeIcon from "@mui/icons-material/Cake";
import dayjs from "dayjs";
import CLink from "./custom/CLink";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useState } from "react";
import { useRouter } from "next/router";

interface SubProp {
  sub: Sub;
}

const SubSideBar: React.FC<SubProp> = ({ sub }) => {
  const { data: user } = useSelector((state: RootState) => state.login);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const router = useRouter();

  const handleCreatePost = () => {
    if (!user) {
      setOpenSnackbar(true);
      return;
    }

    router.push(`/r/${sub.name}/create`);
  };

  const handleClose = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box sx={{ background: "white", borderRadius: "0.5rem" }}>
      <Box sx={{ backgroundColor: "primary.main", borderTopLeftRadius: "0.5rem", borderTopRightRadius: "0.5rem" }}>
        <Typography variant="subtitle1" sx={{ p: "0.7rem 0.5rem", color: "white" }}>
          About Community
        </Typography>
      </Box>

      <Box sx={{ p: "0.5rem" }}>
        <Box sx={{ pb: "1rem" }}>
          <Box sx={{ display: "flex", alignItems: "center", my: "0.5rem" }}>
            <Avatar src={sub.imageURN} />
            <CLink
              href={`/r/${sub.name}`}
              variant="h6"
              color="textPrimary"
              label={`r/${sub.name}`}
              sx={{ mx: "0.3rem" }}
            />
          </Box>
          <Typography variant="subtitle2" sx={{ whiteSpace: "pre-wrap" }}>
            {sub.description}
          </Typography>
        </Box>
        <Divider />
        <Box sx={{ display: "flex", alignItems: "center", my: "1rem" }}>
          <CakeIcon />
          <Typography>Created {dayjs(sub.createdAt).format("D MMM YYYY")}</Typography>
        </Box>

        <Button variant="contained" fullWidth onClick={handleCreatePost}>
          CREATE POST
        </Button>
      </Box>
      <Snackbar
        open={openSnackbar}
        onClose={handleClose}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          severity="error"
          action={
            <>
              <Button color="secondary" size="small" onClick={() => router.push("/login")}>
                log in
              </Button>
            </>
          }
        >
          you must be logged in to submit a post
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default SubSideBar;
