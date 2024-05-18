import asyncHandler from "express-async-handler";
import Message from "../models/messages.model.js";

const saveMessage = asyncHandler(async (req, res, io) => {
  const { message } = req.body;
  if (message) {
    try {
      const newMessage = new Message({ content: message });
      await newMessage.save();
      io.emit("chat message", newMessage); // Emit the message to all connected clients
      res.status(200).json({ success: true, message: "Message sent successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Server Error" });
    }
  } else {
    res.status(400).json({ success: false, message: "Message is required" });
  }
});

const getMessage = asyncHandler(async (req, res) => {
  try {
    const messages = await Message.find();
    res.status(200).json({ success: true, data: messages });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

export { saveMessage, getMessage };
