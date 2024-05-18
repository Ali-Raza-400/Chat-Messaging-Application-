import express from "express";
import { saveMessage, getMessage } from "../controllers/messagesController.js";

const router = express.Router();

export default (io) => {
  router.post("/", (req, res) => saveMessage(req, res, io));
  router.get("/get-message", getMessage);
  return router;
};
