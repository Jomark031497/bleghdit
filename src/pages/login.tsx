import { useEffect, useState } from "react";
import { NextPage } from "next";
import Head from "next/head";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { Box, Typography, Link as MuiLink, Snackbar, Alert } from "@mui/material";
import { RootState, useAppDispatch } from "../redux/store";
import { loginUser } from "../redux/features/auth/loginSlice";
import CTextField from "../components/custom/CTextField";
import { Field, Form, Formik } from "formik";
import CButton from "../components/custom/CButton";

import CLink from "../components/custom/CLink";
import Image from "next/image";

interface AuthProps {
  username: string;
  password: string;
}

const Login: NextPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [errors, setErrors] = useState<any>({});
  const { data } = useSelector((state: RootState) => state.login);
  const registered = router.query.success;
  const [openSnackbar, setOpenSnackbar] = useState(false);

  if (data) router.push("/");

  const handleSubmit = async (values: AuthProps) => {
    try {
      await dispatch(loginUser(values)).unwrap();
      router.push("/");
    } catch (err: any) {
      setErrors(err);
    }
  };

  useEffect(() => {
    if (registered) {
      setOpenSnackbar(true);
    }
  }, [registered]);

  const handleClose = () => {
    setOpenSnackbar(false);
  };

  return (
    <>
      <Head>
        <title>leddit.com: Log in</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>

      <Box id="main-container" sx={{ display: "flex", backgroundColor: "#fff", height: "100vh" }}>
        <Box id="image-container" sx={{ position: "relative", width: { sm: 0, md: "10%" } }}>
          <Image
            src="https://res.cloudinary.com/dljwfddln/image/upload/v1641559701/leddit/bricks.jpg"
            layout="fill"
            objectFit="cover"
          />
        </Box>
        <Box
          id="main-content"
          sx={{
            maxWidth: "23rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            p: "0rem 1.5rem",
            pb: "5rem",
          }}
        >
          <Box id="fields-container" sx={{ paddingBottom: "3rem" }}>
            <Typography variant="h6">Login</Typography>
            <Typography variant="subtitle2" color="textSecondary">
              By continuing, you agree to our
              <MuiLink underline="none"> User Agreement </MuiLink>
              and
              <MuiLink underline="none"> Privacy Policy </MuiLink>.
            </Typography>
          </Box>
          <Formik initialValues={{ username: "", password: "" }} onSubmit={(values) => handleSubmit(values)}>
            {() => (
              <Box component={Form}>
                <Field as={CTextField} name="username" label="username" error={errors.username ? true : false} />
                <Typography color="error" variant="subtitle2">
                  {errors.username}
                </Typography>
                <Field
                  as={CTextField}
                  type="password"
                  name="password"
                  label="password"
                  error={errors.password ? true : false}
                />
                <Typography color="error" variant="subtitle2">
                  {errors.password}
                </Typography>

                <Typography color="error" variant="subtitle2">
                  {errors.error}
                </Typography>
                <CButton type="submit" variant="contained" my="0.5rem" fullWidth>
                  LOGIN
                </CButton>
              </Box>
            )}
          </Formik>

          <Typography variant="subtitle2" sx={{ mt: "0.5rem" }}>
            New to leddit?
            <CLink href="/register" label="Sign up" variant="subtitle2" sx={{ mx: "0.3rem" }} />
          </Typography>
        </Box>
      </Box>
      <Snackbar
        open={openSnackbar}
        onClose={handleClose}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="success" variant="filled">
          account registered
        </Alert>
      </Snackbar>
    </>
  );
};

export default Login;
