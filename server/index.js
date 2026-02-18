  import express from 'express';
  import cors from 'cors';
  import dotenv from 'dotenv';
  import connectDB from './config/mongodb.js';
  import emailRouter from './routes/emailRouter.js';
  import statsRouter from './routes/statsRoute.js';
  import serviceRouter from './routes/serviceRoute.js';
  import projectRouter from './routes/projectRouter.js';
  import technologiesRouter from './routes/technologiesRouter.js'
  import experienceRouter from './routes/experienceRouter.js'
  import testimonialRouter from './routes/testimonialsRouter.js'
  import blogRouter from './routes/blogRouter.js'
  import subscriberRouter from './routes/subscriberRouter.js'
  import chatRouter from './routes/chatRouter.js'
  import http from 'http';  
  import { Server } from "socket.io";
  import Message from './models/messageModel.js';


  // Load environment variables
  dotenv.config();

  // Connect to MongoDB
  connectDB();

  const app = express();

  const server = http.createServer(app);

  const io = new Server(server, {
    cors: {
      origin: process.env.FRONTEND_URL,
      methods: ["GET", "POST"],
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
      const {email, name, isAdmin} = data;
      if (!email) return;
      const room = email;
      socket.join(room);

      // Track only normal users in inbox
      if(!isAdmin) {
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

    // Middleware
    app.use(cors({
      origin: process.env.FRONTEND_URL,
      methods: ["GET", "PUT", "POST", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
    }));
    app.use(express.json()); // Parses JSON bodies

  // Example route
  app.get('/', (req, res) => {
    res.send('API is running...');
  });


  // Routes
  app.use('/api', emailRouter);
  app.use('/api', statsRouter);
  app.use('/api', serviceRouter);
  app.use('/api', projectRouter);
  app.use('/api', technologiesRouter);
  app.use('/api', experienceRouter);
  app.use('/api', testimonialRouter);
  app.use('/api', blogRouter);
  app.use('/api', subscriberRouter);
  app.use('/api', chatRouter);


  // Start server
  const PORT = process.env.PORT || 5000;
  server.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
  