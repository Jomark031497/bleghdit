import { Box, Button, Container, Typography } from "@mui/material";
import axios from "axios";
import { Formik, Form, Field } from "formik";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CTextField from "../components/custom/CTextField";
import { RootState } from "../redux/store";

const CreateSub: NextPage = () => {
  const router = useRouter();

  const { data: user } = useSelector((state: RootState) => state.login);

  const [errors, setErrors] = useState<any>({});

  useEffect(() => {
    // redirect to sub's homepage if not authenticated
    if (!user) router.push("/");
  }, []);

  const createSub = async (values: any) => {
    try {
      const { data: sub } = await axios.post("/subs/create", values);
      router.push(`/r/${sub.name}`);
    } catch (error: any) {
      setErrors(error.response.data);
    }
  };

  return (
    <>
      <Container maxWidth="md" sx={{ my: "3rem" }}>
        <Formik initialValues={{ title: "", name: "", description: "" }} onSubmit={(values) => createSub(values)}>
          {() => (
            <Box id="form-container" component={Form} sx={{ background: "#fff", p: "1rem", borderRadius: "0.5rem" }}>
              <Typography variant="h5">Create a Subbleghdit</Typography>
              <Field
                as={CTextField}
                placeholder="subbleghdit name (ex. funny, reactjs)"
                name="name"
                error={errors.name ? true : false}
              />
              <Typography color="error" variant="subtitle2">
                {errors.name}
              </Typography>
              <Field
                as={CTextField}
                placeholder="subbleghdit title (ex. Everything Funny, ReactJS)"
                name="title"
                error={errors.title ? true : false}
              />
              <Typography color="error" variant="subtitle2">
                {errors.title}
              </Typography>
              <Field as={CTextField} multiline minRows={4} name="description" placeholder="text (optional)" fullWidth />

              <Button type="submit" variant="contained" sx={{ my: "0.3rem" }}>
                SUBMIT
              </Button>
            </Box>
          )}
        </Formik>
      </Container>
    </>
  );
};

export default CreateSub;
