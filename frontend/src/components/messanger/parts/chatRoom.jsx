/* eslint-disable */
import React, { useEffect, useState } from "react";
import { Box, IconButton, Avatar, InputAdornment } from "@mui/material";
import axios from "axios";
import io from "socket.io-client";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { BsFillSendFill } from "react-icons/bs";
import MuiTypography from "../../Typography";
import InputField from "../../Input";
import useScreenWidth from "../../../hooks/useScreen";

const StyledUserChatContainer = styled(Box)`
  /* Add your styles here */
`;

const SendButton = styled(IconButton)`
  /* Add your styles here */
`;

export default function ChatRoom({
  showMessanger,
  setShowMessanger,
  selectedInbox,
}) {
  const [inputStr, setInputStr] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const { userInfo } = useSelector((state) => state.auth);
  const socket = io("http://localhost:5000"); // Ensure this matches your server URL
  const INPUT_FIELD_STYLES_MESSAGE = {
    sx: {
      width: "100%",
      height: "55px",
      //   padding: 0,
      borderRadius: "50px",

      "& fieldset": { border: "1px solid #D2D2D2" },
    },
  };
  useEffect(() => {
    if (socket) {
      socket.on("chat message", (message) => {
        console.log("Received message:", message);
        setChatMessages((prevMessages) => [...prevMessages, message]);
      });
    }

    return () => {
      socket.disconnect();
    };
  }, [socket]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get("/api/messages/get-message");
        setChatMessages(response.data.data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    if (userInfo) fetchMessages();
  }, [userInfo]);

  const sendMessageHandler = async () => {
    if (!inputStr.trim()) return;
    try {
      await axios.post("/api/messages", { message: inputStr });
      setInputStr("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };
  const screenWidth = useScreenWidth();
  return (
    <>
      {/* {selectedInbox ? ( */}
      <StyledUserChatContainer
        screenWidth={screenWidth}
        showMessanger={showMessanger}
        sx={{
          borderLeft: `${
            screenWidth < 992 && !showMessanger ? "1px solid #C3C3C3" : "none"
          }`,
          overflow: "auto",
          maxHeight: "50%",
        }}
        display="flex"
        justifyContent="space-between"
        flexDirection="column"
      >
        <Box
          sx={{ borderBottom: "1px solid #C3C3C3" }}
          p={2}
          alignItems="center"
          display="flex"
        >
          {/* {screenWidth < 992 && (
            <SendIcon
              onClick={() => setShowMessanger(false)}
              sx={{ cursor: "pointer" }}
            />
          )} */}
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            sx={{ ml: 1 }}
          >
            <Box display="flex" alignItems="center">
              <Avatar
                sx={{
                  bgcolor: "rgb(224, 40, 40)",
                  width: 40,
                  height: 40,
                  mr: 1,
                }}
              >
                OP
              </Avatar>
              <MuiTypography variant="body1" component="h6" fontWeight="500">
                Augustina Midgett
              </MuiTypography>
            </Box>
          </Box>
        </Box>

        <Box
          sx={{ flex: 1 }}
          p={2}
          backgroundColor="#fff"
          id="chatmodule"
          style={{ height: `calc(100vh - 349px)`, overflow: "auto" }}
        >
          {/* {videoView ? (
      <VideoCalling />
    ) : ( */}
          <Box>
            <MuiTypography
              width="90px"
              margin="5px auto"
              display="flex"
              justifyContent="center"
              color="#999999"
              border="1px solid #FFFFFF"
              borderRadius="20px"
              sx={{ boxShadow: "0px 0px 19px 0px #0000001A" }}
            >
              Today
            </MuiTypography>

            {chatMessages?.map((item, index) => (
              <Box display="flex" my={2} key={index}>
                {item.type === "incoming" && (
                  <Avatar
                    sx={{
                      bgcolor: "rgb(224, 40, 40)",
                      width: 50,
                      height: 50,
                      mr: 1,
                    }}
                  >
                    OP
                  </Avatar>
                )}

                <Box>
                  <Box
                    width="fit-content"
                    bgcolor={`${item.type === "incoming" ? "none" : "#E02828"}`}
                    p={2}
                    m={`0px 0px 0px ${
                      item.type === "incoming" ? "0px" : "auto"
                    } `}
                    sx={{
                      textAlign: `${
                        item.type === "incoming" ? "left" : "right"
                      }`,
                      border: `1px solid ${
                        item.type === "incoming" ? "#E3E3E3" : "none"
                      }`,
                      borderRadius: ` ${
                        item.type === "incoming"
                          ? "20px 20px 20px 0px"
                          : "20px 20px 0px 20px"
                      }`,
                    }}
                  >
                    <MuiTypography
                      textAlign="start"
                      variant="subtitle1"
                      fontWeight="400"
                      color={`${item.type === "incoming" ? "#000" : "#fff"}`}
                    >
                      {item?.content}
                    </MuiTypography>
                  </Box>
                  <MuiTypography
                    variant="subtitle1"
                    fontWeight="400"
                    fontSize="12px"
                    color="#9C9C9C"
                    sx={{
                      pt: 1,
                      textAlign: `${
                        item.type === "incoming" ? "left" : "right"
                      }`,
                    }}
                  >
                    9:30 AM
                  </MuiTypography>
                </Box>
              </Box>
            ))}
          </Box>
          {/* )} */}
        </Box>

        <Box sx={{ borderTop: "1px solid #C3C3C3" }} p={2}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box display="flex" alignItems="center" sx={{ flex: 1 }}>
              {/* <SentimentSatisfiedOutlinedIcon
            onClick={() => setShowMessanger(false)}
            sx={{
              cursor: "pointer",
              color: "#9C9C9C",
              fontSize: "25px",
              mr: 1,
            }}
          /> */}
              {/* <AttachmentIcon
          onClick={() => setShowMessanger(false)}
          sx={{
            cursor: "pointer",
            color: "#9C9C9C",
            fontSize: "30px",
          }}
        /> */}
            </Box>
            <Box display="flex" width="100%" alignItems="center" ml={1}>
              <Box sx={{ width: "100%" }}>
                <InputField
                  id="outlined-adornment-password"
                  type={"text"}
                  value={inputStr}
                  onChange={(e) => setInputStr(e.target.value)}
                  placeholder="Type a message here…"
                  onClick={sendMessageHandler}
                  endAdornment={
                    <InputAdornment position="end">
                      <SendButton
                        aria-label="toggle password visibility"
                        edge="end"
                        sx={{
                          background: "rgb(224, 40, 40)",
                          marginRight: "2px",
                        }}
                      >
                        <BsFillSendFill color="#fff" size={20} />
                      </SendButton>
                    </InputAdornment>
                  }
                  sx={INPUT_FIELD_STYLES_MESSAGE.sx}
                  // {...INPUT_FIELD_PROPS_MESSAGE}
                />
              </Box>
              {/* <MicIcon
          sx={{
            cursor: "pointer",
            color: "rgb(224, 40, 40)",
            fontSize: "30px",
            ml: 1,
          }}
        /> */}
            </Box>
          </Box>
        </Box>
      </StyledUserChatContainer>
      {/* ) : (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
        textAlign: "center",
        padding: 2,
        backgroundColor: "#f9f9f9",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Box mb={2}>
        <img
          src="/images/nochat.png"
          alt="No chat"
          width={"80px"}
          height={"80px"}
        />
      </Box>
      <Box>
        <p style={{ fontSize: "18px", fontWeight: "500", color: "#555" }}>
          No Chat to show
        </p>
      </Box>
    </Box>
  )} */}
    </>
  );
}
