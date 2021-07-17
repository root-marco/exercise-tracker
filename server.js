import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.static(`${process.cwd()}/src/public`));

app.get('/', (req, res) => {
  res.sendFile(`${process.cwd()}/src/views/index.html`)
});

app.listen(PORT, () => {
  console.log(`running: localhost:${PORT}`);
});
