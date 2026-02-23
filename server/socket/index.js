import { Server } from "socket.io";
import Message from '../models/messageModel.js';

export const initSocket = (httpServer) => {
    const io = new Server(httpServer, {
        cors: {
            origin: process.env.FRONTEND_URL,
            methods: ["GET", "POST"],
            allowedHeaders: ["Content-Type", "Authorization"],
            credentials: true,
        },
    });

    const activeUsers = new Map();

    io.on("connection", (socket) => {
        console.log(`New client connected: ${socket.id}`);

        socket.on("send_message", async (data) => {
            try {
                if (!data?.room || !data?.sender || !data?.text) return;

                // (optional but helpful) ensure sender is in the room
                socket.join(data.room);

                const saved = await Message.create({
                    room: data.room,
                    sender: data.sender,
                    text: data.text,
                });

                const message = {
                    _id: saved._id,
                    room: saved.room,
                    sender: saved.sender,
                    text: saved.text,
                    createdAt: saved.createdAt,
                };

                // send to that room
                io.to(data.room).emit("receive_message", message);

                // notify admins so inbox can update in real-time (preview)
                io.to("admins").emit("admin_receive_message", message);
            } catch (e) {
                console.error("send_message error:", e);
            }
        });

        socket.on("join_room", (data) => {
            // data expected: { email, name, isAdmin }
            const { email, name, isAdmin } = data;
            if (!email) return;
            const room = email;
            socket.join(room);

            // Track only normal users in inbox
            if (!isAdmin) {
                activeUsers.set(email, { name, email });
                // Send updated inbox list to all admins
                io.emit("admin_inbox", Array.from(activeUsers.values()));
            }
            console.log(`${isAdmin ? "Admin" : "User"} joined room: ${room} (${socket.id})`);
        });

        socket.on("disconnect", () => {
            console.log("Client disconnected");
        });
    });
};


