// transactionRoutes.js
import express from "express";
import { createTransaction, getAllTransactions, updateTransaction, deleteTransaction, deleteAll } from "../Controller/transactionController.js";
const router = express.Router();
import authMiddleware from '../Middleware/authMiddleware.js'

// Define the routes and their corresponding controller methods

router.post("/createtransactions/:userId",authMiddleware, createTransaction);
router.get("/getall/transactions",authMiddleware, getAllTransactions);
router.put("/update/transactions/:id",authMiddleware, updateTransaction);
router.delete("/delete/transactions/:id",authMiddleware, deleteTransaction);
router.delete("/deleteAll/transactions",authMiddleware, deleteAll);




export default router;
