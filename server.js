require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const PORT = 8000 || process.env.port;
const URI = process.env.ATLAS_URL;
const app = express();
const user = require("./routes/user");
const notes = require("./routes/notes");
const tiic = require("./routes/tiic");
const bodyParser = require("body-parser");
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json());
app.use(cors());

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
app.use("/user", user);
app.use("/notes", notes);
app.use("/tiic", tiic);
app.get("/", (req, res) => {
  res.send("Express on Vercel");
});
mongoose.connect(URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("Connected to database");
});
