import { NextPage } from "next";
import { Box, Typography } from "@mui/material";
import Head from "next/head";
import CLink from "../../../../components/custom/CLink";

const NotFound: NextPage = () => {
  return (
    <>
      <Head>
        <title>leddit: page not found</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          height: "90vh",
          justifyContent: "center",
        }}
      >
        <Typography variant="h4">Page Not Found</Typography>
        <Box
          sx={{
            backgroundColor: "primary.main",
            p: "0.5rem",
            borderRadius: "1rem",
            m: "2rem auto",
          }}
        >
          <CLink href="/" label="Go back to homepage" variant="h4" />
        </Box>
      </Box>
    </>
  );
};

export default NotFound;
