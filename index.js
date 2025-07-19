import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from 'cors';

import { checkAuth, handleValidationErrors } from "./utils/index.js";
import { registerValidation, loginValidation } from "./validations/userValidations.js";
import { UserController } from "./controllers/index.js";

// Connecting to a database
mongoose
  .connect("mongodb+srv://admin:draglon750@cluster0.znj5tnf.mongodb.net/Inventory?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => { console.log('DB ok') })
  .catch((err) => { console.log('DB error', err) });

const app = express();

app.use(bodyParser.json({limit: "100mb", parameterLimit: 100000000}));
app.use(bodyParser.urlencoded({limit: '100mb', extended: true, parameterLimit: 100000000}));

app.use(express.json()); // reads JSON requests
app.use(cors());

// login
app.post('/auth/login', loginValidation, handleValidationErrors, UserController.login)
// registration
app.post('/auth/register', registerValidation, handleValidationErrors, UserController.register)
// general information by user
app.get('/auth/user', checkAuth, UserController.getMe)

// Start server
app.listen(4004, (error) => {
  if (error) {
    return console.log(error);
  }

  console.log('Server OK')
});
