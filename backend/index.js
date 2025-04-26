import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import http from 'http';
import connectedB from './config/db.js'
import userRoute from './routes/userRoute.js'
import messageRoute from "./routes/messageRoute.js"
import cookieParser from 'cookie-parser';
import { setupSocket } from './sokect/socket.js';

dotenv.config();

const app = express();
connectedB();

app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true
}));
app.use(express.json());
app.use(cookieParser())

app.use('/api/user', userRoute);
app.use('/api/message', messageRoute);

// Create HTTP server
const server = http.createServer(app);

// Setup Socket.IO
setupSocket(server);

server.listen(3000, () => {
  console.log("Backend running on http://localhost:3000");
});
