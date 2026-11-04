require("dotenv").config();
const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to mongodb..."))
  .catch((err) => console.error("could not connect to mongodb...", err));

const schema = new mongoose.Schema({
  name: String,
});

async function createMessage() {
  const result = await message.save();
  console.log(result);
}

//this creates a Message class in our app
const Message = mongoose.model("Message", schema);
const message = new Message({
  name: "Hello World",
});

createMessage();

const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3001;

app.use(express.static("public"));
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

//listen for incoming requests
app.listen(port, () => {
  console.log("Server is up and running");
});