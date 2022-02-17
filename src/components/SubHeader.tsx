import { ChangeEvent, useEffect, useRef, useState } from "react";
import axios from "axios";
import { mutate } from "swr";
import { useSelector } from "react-redux";

import { Avatar, Box, Container, Typography } from "@mui/material";

import { RootState } from "../redux/store";
import { Sub } from "../types";
import Image from "next/image";
import { getFirstLetter } from "../lib/getFirstLetter";

interface SubProps {
  sub: Sub;
}

const SubHeader: React.FC<SubProps> = ({ sub }) => {
  const [ownsSub, setOwnsSub] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { data } = useSelector((state: RootState) => state.login);

  useEffect(() => {
    if (!sub) return;
    const isOwn = data?.username === sub.username;
    setOwnsSub(isOwn);
  }, [sub]);

  const openFileInput = (type: string) => {
    if (!ownsSub) return;
    fileInputRef.current!.name = type;
    fileInputRef.current!.click();
  };

  const uploadImage = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    const file = files![0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("type", fileInputRef.current!.name);

    try {
      await axios.post(`/subs/${sub?.name}/image`, formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });
      mutate(`/subs/${sub?.name}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {sub && (
        <>
          <input type="file" hidden={true} ref={fileInputRef} onChange={uploadImage} />
          <Box sx={{ background: "white", mb: "1rem" }}>
            {sub.bannerURN ? (
              <Box
                sx={{
                  height: "30vh",
                  width: "100vw",
                  position: "relative",
                  cursor: ownsSub ? "pointer" : "",
                  "&:hover": {
                    opacity: "0.6",
                  },
                }}
                onClick={() => openFileInput("banner")}
              >
                <Typography variant="h1">Hello</Typography>
                <Image src={sub.bannerURN} layout="fill" objectFit="cover" />
              </Box>
            ) : (
              <Box
                style={{ height: "24vh", background: "skyblue", cursor: ownsSub ? "pointer" : "" }}
                onClick={() => openFileInput("banner")}
              />
            )}

            <Container maxWidth="lg" sx={{ height: "90px", display: "flex" }}>
              <Box
                sx={{
                  position: "relative",
                  cursor: ownsSub ? "pointer" : "",
                }}
              >
                {sub.imageURN ? (
                  <>
                    <Avatar
                      src={sub.imageURN}
                      alt="subreddit image"
                      sx={{
                        height: "80px",
                        width: "80px",
                        position: "absolute",
                        top: -15,
                        "&:hover": {
                          opacity: 0.3,
                        },
                      }}
                      onClick={() => openFileInput("image")}
                    />
                  </>
                ) : (
                  <Avatar
                    sx={{ height: "80px", width: "80px", backgroundColor: "#111", position: "absolute", top: -15 }}
                    onClick={() => openFileInput("image")}
                  >
                    {getFirstLetter(sub.name)}
                  </Avatar>
                )}
              </Box>
              <Box sx={{ pl: "6rem", my: "0.5rem" }}>
                <Typography variant="h5">{sub.title}</Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  /r/{sub.name}
                </Typography>
              </Box>
            </Container>
          </Box>
        </>
      )}
    </>
  );
};

export default SubHeader;
