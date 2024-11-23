import user from "../model/userSchema.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config(); // Ensure environment variables are loaded

const SignupController = async (req, res) => {

  try {
    const body = req.body;
    const { username, age, email, password, number } = body;
    console.log(body);   // user body

    if (!username || !age || !number || !email || !password) {
      return res.json({
        status: false,
        message: "Required fields are missing",
        data: null,
      });
    }


    //  email address already exists check karna ka lia.
    const emailExist = await user.findOne({ email })
    // console.log(emailExist, "emailExist");
    if (emailExist) {
      res.json({
        status: false,
        message: "this email address has been already exists Please try again",
        data: null,
      })
      return
    }

    // hash password
    const hashpass = await bcrypt.hash(password, 10);
    console.log("hashpass", hashpass);

    // user object
    const userobj = {
      username,
      age,
      number,
      email,
      password: hashpass,
    };


    // new user creat
    const usersave = await user.create(userobj)

    // A successful response to the client
    res.json({
      status: true,
      message: "user successfully signup",
      data: usersave,
    })


  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({
      status: false,
      message: error.message,
      data: null,
    });
  }

};






const LoginController = async (req, res) => {
  try {
    const { email, password } = req.body;   //req.body se email aur password ko extract kar rahi hai,


    const emailExist = await user.findOne({ email }) // email exist check karna ka lia .

    // if email not exist (condition)
    if (!emailExist) {
      res.json({
        message: "Invalid Credential",
        status: false,
        data: null,
      });
      return;
    }
    
    //password check karna ka lia.
    const chackpassward = await bcrypt.compare(password, emailExist.password) // user ke enter kiye gaye password ko hashed ke sath compare karta hai.

    // agar passward sahi haito
    if (chackpassward) {
      // Generate JWT token
      const token = jwt.sign(
        { userId: emailExist._id, email: emailExist.email },
        process.env.JWT_SECRET_KEY,
        { expiresIn: '1h' }
      );
      console.log("Generated Token:", token);

      return res.json({
        message: "user login successfully",
        status: true,
        data: {
          name: emailExist.username, // Include user name in response  //        data: emailExist,
          email: emailExist.email,
          _id: emailExist._id,
        },
        token,

      })

    }

    else {
      return res.json({
        message: "Invalid Credential",
        status: false,
        data: null,
      });

    }
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({
      message: "Internal Server Error",
      status: false,
      data: null,
    });
  }
}



export {
  SignupController,
  LoginController
}