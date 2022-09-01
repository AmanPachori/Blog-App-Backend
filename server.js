 require("dotenv").config();
 const express = require("express");
 const cors = require("cors");
const mongoose = require("mongoose");
const PORT = 8000|| process.env.port;
const URI = process.env.ATLAS_URL;
const app = express();
const user = require('./routes/user')
const notes = require('./routes/notes')

app.use(express.json());
app.use(cors());

app.listen(PORT,()=>{
    console.log(`Listening on port ${PORT}`);
})
app.use('/user',user);
app.use('/notes',notes);
mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  

const connection = mongoose.connection;
connection.once("open",()=>{
    console.log('Connected to database');
})