import mongoose from "mongoose";

// Transaction schema define karta hai ke ek transaction kaise dikhna chahiye
const transactionSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    enum: ['income', 'expense'], // Sirf "income" ya "expense" values allowed hain
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
},
  remarks: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
}
});

// Yeh model MongoDB mein "transactions" naam ka collection banayega
const transactionModel = mongoose.model("Transaction", transactionSchema);

// Ensure karein ke yeh default export hai
export default transactionModel;
