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


  // Load environment variables
  dotenv.config();

  // Connect to MongoDB
  connectDB();

  const app = express();

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


  // Start server
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
  