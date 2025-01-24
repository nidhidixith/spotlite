import { useSelector } from "react-redux";

let socket = null;

export const connectWebSocket = () => {
  // const userId = useSelector((state) => state.users.ids[0]);
  // const userId = useSelector((state) => state.users.currentUserId);

  socket = new WebSocket(`ws://192.168.1.34:8000/ws/nc/`);
  // socket = new WebSocket(`ws://192.168.1.34:8000/ws/nc/?userId=${userId}`);
  // socket = new WebSocket(`ws://192.168.1.34:8000/ws/nc/`);

  socket.onopen = () => {
    console.log("WebSocket connection established...");
  };

  socket.onmessage = (event) => {
    // const notification = JSON.parse(event.data);
    console.log("New notification received:");
    // Handle notification (e.g., update Redux state or UI)
  };

  socket.onclose = () => {
    console.log("WebSocket connection closed.");
  };

  socket.onerror = (error) => {
    console.error("WebSocket error:", error);
  };

  return socket;
};

export const closeWebSocket = () => {
  // if (socket) {
  socket.close();
  // socket = null;
  // }
};
