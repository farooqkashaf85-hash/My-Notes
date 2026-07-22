require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Server Running");
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));


app.use(express.json());
const noteRoutes = require("./routes/noteroutes");
app.use("/notes", noteRoutes);


const loginRoutes = require("./routes/loginroutes");
app.use("/login" , loginRoutes);


const signupRoutes = require("./routes/signuproutes")
app.use("/signup" , signupRoutes);