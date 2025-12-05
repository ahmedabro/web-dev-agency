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
  import http from 'http';  
  import { Server } from "socket.io";


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

  io.on("connection", (socket) => {
    console.log(`New client connected: ${socket.id}`);

    socket.on("send_message", (data) => {
      // data expected: { room, sender, text }
      if (!data || !data.room || !data.sender || !data.text) return;
      const message = {
        room: data.room,
        sender: data.sender,
        text: data.text,
        timestamp: new Date().toISOString()
      }
      io.to(data.room).emit("receive_message", message);
    });

    socket.on("join_room", (data) => {
      // data expected: { email, name, isAdmin }
      if (!data || !data.email) return;
      const room = data.email;
      socket.join(room);
      console.log(`${data.isAdmin ? "Admin" : "User"} joined room: ${room} (${socket.id})`);
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


  // Start server
  const PORT = process.env.PORT || 5000;
  server.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
  