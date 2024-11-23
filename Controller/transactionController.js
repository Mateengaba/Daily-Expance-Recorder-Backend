// transactionController.js
import Transaction from '../model/transactionSchema.js';  // Importing the Transaction model using ES Modules
import mongoose from "mongoose";


//createTransaction jo do parameters leta hai: req aur res.
//req: Request object hai, jismein client se aane wali information hoti hai, jese ki body, headers,
// res: Response object hai, jo server se client ko response bhejne ke liye istemal hota hai.

// Create a new transaction
const createTransaction = async (req, res) => {

  
  try {


    //req.body se kuch specific properties nikaal rahe hain: amount, type, date, aur remarks. destructure 
  const { amount, type, date, remarks } = req.body;
 // const userId = req.params.userId;  // Use userId from the URL path
 const userId = req.userId; // Middleware se userId lein


  // Check if userId is valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid userId" });
  }

  //Transaction model ka ek naya instance bana.
  //Transaction ek Mongoose model hai jo humein MongoDB mein data store karne ke liye use hota hai
  const transaction = new Transaction({ 
    amount, 
    type, 
    date, 
    remarks, 
    userId });
  console.log(transaction, "transaction")

    //transaction.save() method call kar rahe hain jo database mein transaction ko save karta hai.
    const savedTransaction = await transaction.save();
    console.log("savedTransaction:", savedTransaction);

    //Agar transaction successfully save ho gaya,
    res.status(201).json(savedTransaction);
  } catch (err) {
    console.log("Transaction save error:", err);
      res.status(400).json({ message: "Error saving transaction", error: err });
  }
};


// Get all transactions
const getAllTransactions = async (req, res) => {
  try {
    const userId = req.userId; // Isko auth middleware se set kiya gaya hai
    const transactions = await Transaction.find({ userId });

    res.json({
      status: true,
      message: "Transactions retrieved successfully",
      data: transactions, // Ensure transactions are in 'data'
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
      data: null,
    });
  }
};


// Update a transaction by ID
const updateTransaction = async (req, res) => {
  const { id } = req.params; // Is line mein hum request parameters se unique  id ko extract kar rahe hai
  const userId = req.userId; // Authenticated user ka ID

  //is line mein hum request body se transaction ki details  ko extract kar rahe hain.
  const { amount, type, date, remarks } = req.body;

  try {
    console.log("Update Data:", { amount, type, remarks, date });

    //Yeh statement MongoDB se transaction ko update karne ke liye use hoti hai. id:transaction update karna hai. Yeh object hai jismein hum update hona hai
    const updatedTransaction = await Transaction.findOneAndUpdate(
      { _id: id, userId: userId }, // Ensure user owns the transaction
      { amount, type, date, remarks },
      { new: true }
    );
    //Agar updatedTransaction null ya undefined hai, iska matlab hai ke koi transaction nahi mila jisse update kiya ja sake.
    if (!updatedTransaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }
    res.status(200).json(updatedTransaction);
  } catch (err) {
    res.status(400).json({ message: "Error updating transaction", error: err });
  }
};



// Delete a transaction by ID
const deleteTransaction = async (req, res) => {
  const { id } = req.params;
  const userId = req.userId;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid transaction ID" });
  }

  try {
    const result = await Transaction.findOneAndDelete({ _id: id, userId: userId });

    if (!result) {
      return res.status(404).json({ message: "Transaction not found or unauthorized" });
    }

    res.status(200).json({ message: "Transaction deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting transaction", error: err.message });
  }
};

// delete all

const deleteAll = async (req, res) => {
  const userId = req.userId;  // Authenticated user ka ID

  try {
    // Delete all transactions from the database
    const result = await Transaction.deleteMany({ userId: userId });
    console.log("Deleted Transactions:", result);
        
    res.status(200).json({ message: "All transactions deleted" });
  } catch (error) {
    // Handle any errors that occur during the deletion process
    res.status(500).json({ message: "Error deleting all transactions", error: error.message });
  }
};







export {
  createTransaction,
  getAllTransactions,
  updateTransaction,
  deleteTransaction,
  deleteAll
}