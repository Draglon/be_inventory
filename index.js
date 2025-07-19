import express from "express";
import mongoose from "mongoose";
// import multer from "multer";
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
// const storage = multer.diskStorage({
//   destination: (_, __, cb) => {
//     cb(null, 'uploads/avatars');
//   },
//   filename: (_, file, cb) => {
//     cb(null, file.originalname); 
//   }
// })

// const upload = multer({ storage: storage, limits: { fileSize: 100000000 }});

app.use(bodyParser.json({limit: "100mb", parameterLimit: 100000000}));
app.use(bodyParser.urlencoded({limit: '100mb', extended: true, parameterLimit: 100000000}));

app.use(express.json()); // reads JSON requests
app.use(cors());
// app.use('/uploads/avatars', express.static('uploads/avatars'));

// login
app.post('/auth/login', loginValidation, handleValidationErrors, UserController.login)
// registration
app.post('/auth/register', registerValidation, handleValidationErrors, UserController.register)
// general information by user
app.get('/auth/user', checkAuth, UserController.getMe)
// upload avatar
// app.post('/upload_avatar', checkAuth, upload.single('image'), (req, res) => {
//   res.json({
//     url: `/uploads/avatars/${req.file.originalname}`
//   })
// });

// Start server
app.listen(process.env.PORT || 4001, (error) => {
  if (error) {
    return console.log(error);
  }

  console.log('Server OK')
});
