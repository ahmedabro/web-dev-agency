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
import userRouter from './routes/userRouter.js'
import http from 'http';
import { initSocket } from './socket/index.js';
import session from 'express-session';
import MongoStore from 'connect-mongo'



// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

const server = http.createServer(app);

initSocket(server);

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL,
  methods: ["GET", "PUT", "POST", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));
app.use(express.json()); // Parses JSON bodies

app.set("trust proxy", 1);

app.use(session({
  name: "sessionId",
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ 
    mongoUrl: process.env.MONGODB_URI, 
    collectionName: "sessions", 
    ttl: 24 * 60 * 60 
  }),
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    maxAge: 1000 * 60 * 60 * 24, // 1 day
  }
}));

// Test route
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
app.use('/api/auth', userRouter);


// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
