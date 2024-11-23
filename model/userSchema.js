import mongoose from "mongoose";

// Transaction schema define karta hai ke ek transaction kaise dikhna chahiye
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    number: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
       
    },
    password: {
        type: String,
        required: true,

    },
});

// Yeh model MongoDB mein "transactions" naam ka collection banayega
const UserModel  = mongoose.model("user", userSchema);

// Ensure karein ke yeh default export hai
export default UserModel;
