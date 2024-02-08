import User from "../../Models/userModel.js";
import nodemailer from 'nodemailer';
import jwt, { decode } from 'jsonwebtoken';
import UserModel from "../../Models/userModel.js";
import bcrypt from "bcrypt";

export const login = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isMatch = await user.Match_Password(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }
    const token = await user.generateAuthToken();
    res
      .status(200)
      .cookie("access_token", token)
      .json({ message: "Login successful" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate a reset token
    const token = jwt.sign({ _id: user._id }, process.env.SECREAT_KEY, { expiresIn: '30m' });

    // Send the reset token to the user's email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
      }
    });

    const mailOptions = {
      from: process.env.EMAIL_USERNAME,
      to: email,
      subject: 'Password Reset Link',
      html: `<p>Please click this <a href="ThisIsReset/reset-password/${user._id}/${token}">link</a> to reset your password.</p>`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ message: "Failed to send reset email" });
      } else {
        console.log('Email sent: ' + info.response);
        return res.status(200).json({ message: "Reset email sent successfully" });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { id, token } = req.params;
    const { password } = req.body;

    // Verify token
    jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
      if (err) {
        return res.status(400).json({ message: 'Error with token' });
      } else {
        // Hash new password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Update user's password in the database
        await UserModel.findByIdAndUpdate({ _id: id }, { password: hashedPassword });

        return res.status(200).json({ message: 'Password reset successfully' });
      }
    });
  } catch (error) {
    console.error('Error resetting password:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = await User.findOne({ email });

    if (user) {
      return res.status(409).json({ message: "User already exists" });
    }
    const newUser = new User({ username, email, password });
    await newUser.save();

    const token = await newUser.generateAuthToken();

    res
      .status(201)
      .cookie("access_token", token)
      .json({ message: "Signup successful" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
export const logout = (req, res) => {
  res.clearCookie("access_token");

  res.status(200).json({ message: "logout successful" });
};
