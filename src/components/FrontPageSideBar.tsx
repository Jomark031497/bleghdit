import useSWR from "swr";

import { Avatar, Box, Typography } from "@mui/material";

import { Sub } from "../types";
import CLink from "./custom/CLink";
import { getFirstLetter } from "../lib/getFirstLetter";

const FrontPageSideBar: React.FC = () => {
  const { data: subs } = useSWR<Sub[]>("/subs");

  return (
    <Box sx={{ ml: "1rem", borderRadius: "0.5rem", mt: "1rem" }}>
      <Typography
        variant="subtitle1"
        align="center"
        sx={{
          paddingTop: "3rem",
          backgroundColor: "#000",
          color: "#fff",
          borderTopRightRadius: "0.5rem",
          borderTopLeftRadius: "0.5rem",
        }}
      >
        Today{"'"}s Top Growing Communities
      </Typography>
      {subs &&
        subs.map((sub, index) => (
          <Box
            key={sub.name}
            sx={{
              backgroundColor: "white",
              display: "flex",
              alignItems: "center",
              borderBottom: "1px solid lightgrey",
              p: "0.5rem",
            }}
          >
            <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
              {index + 1}.
            </Typography>
            {sub.imageURN ? (
              <Avatar
                src={`${sub.imageURN}`}
                alt="subreddit image"
                sx={{ width: "2.5rem", height: "2.5rem", backgroundColor: "#111", mx: "0.5rem" }}
              />
            ) : (
              <Avatar sx={{ width: "2.5rem", height: "2.5rem", backgroundColor: "#111", mx: "0.5rem" }}>
                {getFirstLetter(sub.name)}
              </Avatar>
            )}

            <CLink
              href={`/r/${sub.name}`}
              label={`r/${sub.name}`}
              variant="subtitle2"
              color="textPrimary"
              sx={{ fontWeight: "bold" }}
            />
          </Box>
        ))}
    </Box>
  );
};

export default FrontPageSideBar;
