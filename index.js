import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import postRoutes from "./routes/posts.js";
import userRoutes from "./routes/user.js";
const app = express();

dotenv.config();
app.use(express.json());
app.use(express.json({ limit: "60mb", extended: true }));
app.use(express.urlencoded({ limit: "60mb", extended: true }));
app.use(cors());

app.get("/", (req, res) => {
  res.send("Aplikacija je pokrenuta");
});

app.use("/posts", postRoutes);
app.use("/user", userRoutes);

const CONNECTION_URL = process.env.CONNECTION_URL;

const PORT = process.env.PORT;

mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => app.listen(PORT, () => console.log("Server running ")))
  .catch((error) => console.log(error.message));
mongoose.set("useFindAndModify", false);
