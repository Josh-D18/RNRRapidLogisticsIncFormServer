import express, { Router } from "express";
import serverless from "serverless-http";

const api = express();

const router = Router();

router.post("/", (req, res) => {
  res.send("Hi");
});

router.get("/", (req, res) => {
  res.send("Route Works!");
});

api.use("/api/", router);

export const handler = serverless(api);
