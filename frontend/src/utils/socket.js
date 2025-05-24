import { io } from "socket.io-client";
const socket = io("https://buzz-in.onrender.com", {
  autoConnect: false,
});
export default socket;
