import { useState } from "react";
import { Checkbox, Typography, Link as MuiLink } from "@mui/material";
import { Box } from "@mui/system";
import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";

import CTextField from "../components/custom/CTextField";
import { registerUser } from "../redux/features/auth/registerSlice";
import { useAppDispatch } from "../redux/store";
import { Field, Form, Formik } from "formik";
import CButton from "../components/custom/CButton";
import CLink from "../components/custom/CLink";
import Image from "next/image";

interface AuthProps {
  email: string;
  username: string;
  password: string;
}

const Register: NextPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [errors, setErrors] = useState<any>({});

  const handleSubmit = async (values: AuthProps) => {
    try {
      await dispatch(registerUser(values)).unwrap();
      router.push("/login?success=true");
    } catch (err: any) {
      setErrors(err);
    }
  };

  return (
    <>
      <Head>
        <title>leddit.com: Join the worldwide conversation</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>

      <Box id="main-container" sx={{ display: "flex", background: "#fff", height: "100vh" }}>
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
          <Box sx={{ pb: "3rem" }}>
            <Typography variant="h6">Sign up</Typography>
            <Typography variant="subtitle2" color="textSecondary">
              By continuing, you are setting up a Reddit account and agree to our
              <MuiLink underline="none"> User Agreement </MuiLink>
              and
              <MuiLink underline="none"> Privacy Policy </MuiLink>.
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "flex-start" }}>
            <Checkbox size="small" disableRipple sx={{ mr: "0.3rem", mt: "0.3rem", p: 0 }} />
            <Typography variant="body2" color="textSecondary">
              I agree to get emails about cool stuff on Reddit
            </Typography>
          </Box>

          <Formik initialValues={{ email: "", username: "", password: "" }} onSubmit={(values) => handleSubmit(values)}>
            {() => (
              <Box component={Form}>
                <Field as={CTextField} type="email" name="email" label="email" error={errors.email ? true : false} />
                <Typography color="error" variant="subtitle2">
                  {errors.email}
                </Typography>
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
                <CButton type="submit" variant="contained" my="0.5rem" fullWidth>
                  REGISTER
                </CButton>
              </Box>
            )}
          </Formik>

          <Typography variant="subtitle2" sx={{ mt: "0.5rem" }}>
            Already a ledditor?
            <CLink href="/login" variant="subtitle2" label="Log in" sx={{ mx: "0.3rem" }} />
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default Register;
