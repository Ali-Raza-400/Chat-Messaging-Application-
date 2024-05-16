import { Paper } from "@mui/material";
import { useEffect, useState } from "react";

import ChatList from "./chatList";
import ChatRoom from "./chatRoom";
// import { useLazyGetAllInboxesQuery } from "@/redux/slices/socketChat";
// import { useSession } from "next-auth/react";
// import io from "socket.io-client";
// import { socketInstance } from "@/config";

export default function MessangerView() {
  const [showMessanger, setShowMessanger] = useState(false);
  // const session = useSession();
  // const [getAllInboxes, { data, isLoading }] = useLazyGetAllInboxesQuery();
  const [selectedInbox, setSelectedInbox] = useState(null);
  // const [socket, setSocket] = useState(null);
  // Socket Connection
  // useEffect(() => {
  //   if (session) {

  //     socketInstance.on("connect", () => {
  //       console.log("Connected to Sockets Server");
  //       socketInstance.emit("connectToUserRoom", { userId: session.user.id }, () => {
  //         console.log(`Connected to user room: ${session.user.id}`);
  //       });

  //       socketInstance.on("userConStatus", (data) => {
  //         console.log(data);
  //       });
  //     });

  //     socketInstance.on("disconnect", () => {
  //       console.log("Disconnected");
  //     });

  //     // socketInstance.on("messageData", async (data) => {
  //     //   // Handle incoming message data
  //     // });

  //     return () => {
  //       socketInstance.disconnect();
  //     };
  //   }
  // }, [session]);

  // useEffect(() => {
  //   const connect = () => {
  //     console.log("Connected to Sockets Server");
  //     socket.emit("connectToUserRoom", { userId }, () => {
  //       console.log(`Connected to user room: ${userId}`);
  //     });

  //     socket.on("userConStatus", (data) => {
  //       console.log(data);
  //     });
  //   };

  //   socket.on("disconnect", () => {
  //     console.log("Disconnected");
  //   });

  //   socket.on("connect", connect);
  //   socket.on("connected", connect);

  //   // socket.on("messageData", async (data) => {
  //   //   // if (data.data.type !== "update_row") {
  //   //   const jsonData = data.data.data;
  //   //   const senderMessage = JSON.parse(jsonData);
  //   //   const res = await API.get(
  //   //     `/api/coach/getById?userId=${senderMessage.fromUserId}`
  //   //   );

  //   //   dispatch(
  //   //     getInboxList({
  //   //       Search: "",
  //   //       Timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  //   //     })
  //   //   );
  //   //   dispatch(getUnreadMessageCount());
  //   //   setSenderName(`${res.data.data.firstName} ${res.data.data.lastName}`);

  //   //   dispatch(
  //   //     getMessageList({
  //   //       inboxId: senderMessage.inboxId,
  //   //       pageNo: 1,
  //   //       Timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  //   //     })
  //   //   );

  //   //   setMessages([...messages, res.data.data]);
  //   //   dispatch(setActiveChat(senderMessage));
  //   //   // }
  //   // });

  //   // return () => {
  //   //   socket.off("connect", connect);
  //   //   socket.off("connected", connect);
  //   //   socket.off("disconnect");
  //   //   socket.off("messageData");
  //   // };
  // }, [session]);
  // }, [auth, userId, dispatch, messages]);

  // useEffect(() => {
  //   async function fetchInboxes() {
  //     const response = await getAllInboxes();
  //     setSelectedInbox(response?.data?.data?.[0]);
  //   }
  //   if (session) fetchInboxes();
  // }, [session]);

  const PAPER_PROPS = {
    display: "flex",
    // alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    borderRadius: "12px",
    boxShadow: "0px 4px 15px 0px #00000029",
    // eslint-disable-next-line no-dupe-keys
    display: "flex",
    height: "100vh",
    // height: `calc(100vh - 116px)`,
  };

  return (
    <Paper sx={{ ...PAPER_PROPS }}>
      <ChatList
        getAllInboxes={[]}
        showMessanger={showMessanger}
        setShowMessanger={setShowMessanger}
        setSelectedInbox={setSelectedInbox}
        selectedInbox={selectedInbox}
      />
      {/* <ChatRoom 
        showMessanger={showMessanger}
        setShowMessanger={setShowMessanger}
        selectedInbox={selectedInbox}
      /> */}
    </Paper>
  );
}
