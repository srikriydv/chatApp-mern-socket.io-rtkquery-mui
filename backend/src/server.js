import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import cookieParser from "cookie-parser";
import { Server } from "socket.io";
import http from "http";
import Message from "./models/message.model.js";


dotenv.config();
await connectDB();

const app = express();
const server = http.createServer(app);


export const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173", // Replace with your frontend URL
        methods: ["GET", "POST"], // Specify allowed HTTP methods
        credentials: true, // Allow cookies and credentials
    },
});

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));

const onlineUsers = new Map(); // Store userId and socketId mapping

io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    // Join a private room for messaging
    socket.on("joinRoom", ({ senderId, receiverId }) => {
        const roomId = [senderId, receiverId].sort().join("_"); // Unique room ID
        socket.join(roomId);
        console.log(`${senderId} joined room: ${roomId}`);
    });

    // Handle message sending
    socket.on("sendMessage", async ({ senderId, receiverId, message }) => {
        const roomId = [senderId, receiverId].sort().join("_");

        // Persist the message in the database
        const newMessage = await Message.create({
            sender: senderId,
            reciever: receiverId,
            message,
        });

        // Emit the message to the receiver in the room
        io.to(roomId).emit("receiveMessage", newMessage);
        console.log(`Message sent from ${senderId} to ${receiverId}`);
    });

    // Handle disconnection
    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
        for (let [userId, socketId] of onlineUsers) {
            if (socketId === socket.id) {
                onlineUsers.delete(userId);
                break;
            }
        }
    });
});

app.use(cookieParser());
app.use(express.json());
app.use("/api/users", authRoutes);
app.use("/api/messages", messageRoutes);


server.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});
