import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.static(`${process.cwd()}/src/public`));
app.use(express.urlencoded({
  limit: "10mb",
  extended: false,
}));
app.use(express.json());

try {
  await mongoose.connect(process.env.MONGOURI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
  console.log("database connected");
} catch (error) {
  console.log(error);
}

import rootRouter from "./src/routes/rootRouter.js";
app.use("/", rootRouter);

app.get('/', (req, res) => {
  res.sendFile(`${process.cwd()}/src/views/index.html`)
});

app.listen(PORT, () => {
  console.log(`running: localhost:${PORT}`);
});
