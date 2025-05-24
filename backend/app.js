require("dotenv").config();
const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const socketIo = require("./socket");
const mongoose = require("mongoose");
const URL = process.env.MONGO_URL;
const app = express();
const buzzRoutes = require("./routes/BuzzRouter");
const adminRoutes = require("./routes/AdminRoute");
const server = http.createServer(app);
const cors = require('cors');

mongoose
  .connect(URL)
  .then(() => console.log("DB Connected"))
  .catch((e) => console.log(e));

const io = socketio(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true
  },
  transports: ["websocket", "polling"]
});

app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());
app.use("/",buzzRoutes);
app.use("/",adminRoutes);

socketIo(io);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log("Server is up and running on port", PORT));