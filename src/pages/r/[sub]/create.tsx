import { Box, Button, Container, Typography } from "@mui/material";
import axios from "axios";
import { Field, Form, Formik } from "formik";
import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CTextField from "../../../components/custom/CTextField";
import { RootState } from "../../../redux/store";

interface INewPost {
  title: string;
  body: string;
}

const PostPage: NextPage = () => {
  const router = useRouter();

  const { data: user } = useSelector((state: RootState) => state.login);
  const [errors, setErrors] = useState<any>({});

  useEffect(() => {
    // redirect to sub's homepage if not authenticated
    if (!user) router.push(`/r/${router.query.sub}`);
  }, []);

  const createPost = async (values: INewPost) => {
    if (!values.title) {
      setErrors({
        ...errors,
        title: "title must not be empty",
      });
      return;
    }
    try {
      const { data: post } = await axios.post("/posts/create", {
        title: values.title,
        body: values.body,
        sub: router.query.sub,
      });

      // redirect to the created post if successful
      router.push(`/r/${post.subName}/${post.identifier}/${post.slug}`);
    } catch (error: any) {
      setErrors(error.response.data);
    }
  };
  return (
    <>
      <Head>
        <title>{router.query?.sub}: submit a post!</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>

      <Container maxWidth="md" sx={{ my: "3rem" }}>
        <Formik initialValues={{ title: "", body: "" }} onSubmit={(values) => createPost(values)}>
          {() => (
            <Box id="form-container" component={Form} sx={{ background: "#fff", p: "1rem", borderRadius: "0.5rem" }}>
              <Typography variant="h5">Submit to /r/{router.query.sub}</Typography>
              <Field as={CTextField} placeholder="title" name="title" error={errors.title ? true : false} />
              <Typography color="error" variant="subtitle2">
                {errors.title}
              </Typography>
              <Field as={CTextField} multiline minRows={4} name="body" placeholder="text (optional)" fullWidth />

              <Button type="submit" variant="contained" sx={{ my: "0.3rem" }}>
                POST
              </Button>
            </Box>
          )}
        </Formik>
      </Container>
    </>
  );
};

export default PostPage;
