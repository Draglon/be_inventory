import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';

import { currentTime } from "./lib/dateTime.js";
import { checkAuth, handleValidationErrors } from "./utils/index.js";
import { registerValidation, loginValidation } from "./validations/userValidations.js";
import { UserController, ProductController, OrderController } from "./controllers/index.js";

// Connecting to a database
const dbUrl = process.env.MONGO_URI || 'mongodb+srv://admin:draglon750@cluster0.znj5tnf.mongodb.net/Inventory?retryWrites=true&w=majority&appName=Cluster0';
mongoose
  .connect(dbUrl, {
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
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
      credentials: true
  }
});

io.on('connection', (socket) => {
  console.log('Новый клиент подключился');

  // Отправляем текущее время клиенту при подключении
  socket.emit('currentTime', currentTime());

  // Периодическая отправка времени (например, каждую 1 секунду)
  const timeInterval = setInterval(() => {
    socket.emit('currentTime', currentTime());
  }, 1000); // 1000 мс = 1 секунда

  // Очистка интервала при отключении клиента
  socket.on('disconnect', () => {
    console.log('Клиент отключился');
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
const PORT = process.env.PORT || 4004;
server.listen(PORT, (error) => {
  if (error) {
    return console.log(error);
  }

  console.log('Server OK')
});
