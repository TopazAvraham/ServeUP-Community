import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import userRoute from './routes/userRoute.js';

var server;
async function startServer() {
//create app
const app = express();
server = http.createServer(app);
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

// Connect to MongoDB
mongoose.connect(process.env.DB_HOST);
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'MongoDB connection error:'));
  db.once('open', () => {
    console.log('Connected to MongoDB');
  });
  
  app.use(express.json());
  app.use('/api/Users/', userRoute);
  
  server.listen(3000, () => {
    console.log('Server is running on port 3000 http://localhost:3000');
  });
  return app;
}
async function stopServer(){
  await mongoose.connection.close();
  await server.close();
  return;

}
export default {startServer,stopServer};