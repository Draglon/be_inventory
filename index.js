import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';

import { MONGO_URI, PORT } from "./lib/constants/index.js";
import { currentTime } from "./lib/dateTime.js";
import { checkAuth, handleValidationErrors } from "./utils/index.js";
import { registerValidation, loginValidation } from "./validations/userValidations.js";
import { UserController, ProductController, OrderController } from "./controllers/index.js";

// Connecting to a database
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => { console.log('DB ok') })
  .catch((err) => { console.log('DB error', err) });

const app = express();
app.use(bodyParser.json({limit: "100mb", parameterLimit: 100000000}));
app.use(bodyParser.urlencoded({limit: '100mb', extended: true, parameterLimit: 100000000}));

app.use(express.json()); // reads JSON requests
app.use(cors()); // CORS

const server = createServer(app);
const io = new Server(server, {
  cors: {
      origin: "*", // CORS_URL,
      methods: ["GET", "POST"],
      allowedHeaders: ["strict-origin-when-cross-origin"],
      credentials: true
  }
});

io.on('connection', (socket) => {
  console.log('Socket is connected');

  socket.emit('currentTime', currentTime());
  const timeInterval = setInterval(() => {
    socket.emit('currentTime', currentTime());
  }, 1000);

  socket.on('disconnect', () => {
    console.log('Socket is disconnected');
    clearInterval(timeInterval);
  });
});

// login
app.post('/auth/login', loginValidation, handleValidationErrors, UserController.login)
// registration
app.post('/auth/register', registerValidation, handleValidationErrors, UserController.register)
// general information by user
app.get('/auth/user', checkAuth, UserController.getMe)

// fetch products
app.get('/products', checkAuth, ProductController.fetch)
// create product
app.post('/products', checkAuth, ProductController.create)
// delete product
app.delete('/products/:id', checkAuth, ProductController.deleteProduct)

// fetch orders
app.get('/orders', checkAuth, OrderController.fetch)
// create order
app.post('/orders', checkAuth, OrderController.create)
// delete order
app.delete('/orders/:id', checkAuth, OrderController.deleteOrder)

// Start server
server.listen(PORT, (error) => {
  if (error) {
    return console.log(error);
  }
  console.log('Server OK')
});
