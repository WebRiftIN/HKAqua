import dotenv from 'dotenv';
import connectDB from '../src/DB/index.js';
import connectCloudinary from '../src/config/cloudinary.js';
import { app } from '../src/app.js';

// Load environment variables
dotenv.config({ path: './.env' });

// Initialize external services (DB, Cloudinary) if needed.
// For serverless, these should be idempotent and ideally cached by the DB util.
try {
  // connectDB and connectCloudinary are async functions; await them to ensure setup
  await connectDB();
  await connectCloudinary();
} catch (err) {
  console.error('Error initializing services in serverless entry:', err);
}

// Export the Express app as the default export so Vercel can use it as a single function.
export default app;
