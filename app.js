import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import cors from 'cors'; // Yeh import upar add karein
import transactionRoutes from './Router/transactionRoutes.js';  // ES Modules use karte hue
import userRoutes from './Router/userRoutes.js';  // ES Modules use karte hue
//project 0
dotenv.config();


const app = express();
const PORT = 5000;

//body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


// router//
app.use('/api', transactionRoutes);

app.use('/api', userRoutes);





const DB_URI = process.env.DB_URI;;
mongoose.connect(DB_URI);
mongoose.connection.on("connected", () => console.log("MongoDB Connected"));
mongoose.connection.on("error", (err) => console.log("MongoDB Error", err));




// app.get( endPoint , callback  )

app.get("/", (request, response) => {
    response.json({
      message: "SERVER UP",
    });
  });


app.listen(PORT, () => {
    console.log(`server running on http://localhost:${PORT}/`);
  });