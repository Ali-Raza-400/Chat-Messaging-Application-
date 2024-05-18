/* eslint-disable */
import { Paper, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import ChatList from "./chatList";
import ChatRoom from "./chatRoom";
import io from "socket.io-client";
import { useSelector } from "react-redux";

const PAPER_PROPS = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  backgroundColor: "#fff",
  borderRadius: "12px",
  boxShadow: "0px 4px 15px 0px #00000029",
  height: "100vh",
};
export default function MessangerView() {
  const [showMessanger, setShowMessanger] = useState(false);
  const [socket, setSocket] = useState(null);
  const [selectedInbox, setSelectedInbox] = useState(null);
  const [socketConnected, setSocketConnected] = useState(false);
  const { userInfo } = useSelector((state) => state.auth);
  console.log("socket", socket);
  // Set initial state to true to display the message
  useEffect(() => {
    function connectSocket() {
      const socketConnection = io("/api/connection");
      setSocket(socketConnection);
    }
    if (userInfo) connectSocket();
  }, [userInfo]);

  return (
    <Paper sx={{ ...PAPER_PROPS }}>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <ChatList
            getAllInboxes={[]}
            showMessanger={showMessanger}
            setShowMessanger={setShowMessanger}
            setSelectedInbox={setSelectedInbox}
            selectedInbox={selectedInbox}
          />
        </Grid>
        <Grid item xs={8}>
          <ChatRoom socket={socket}
            showMessanger={showMessanger}
            setShowMessanger={setShowMessanger}
            selectedInbox={selectedInbox}
          />
        </Grid>
      </Grid>
    </Paper>
  );
}
