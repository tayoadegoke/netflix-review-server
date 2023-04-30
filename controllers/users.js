import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/user.js";

export const login = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const existingUser = await User.findOne({ email });
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser?.password
    );
    if (!existingUser) {
      return res.status(404).json({ message: "Wrong username or password" });
    }

    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid Credentials" });
    const token = jwt.sign(
      {
        email: existingUser.email,
        id: existingUser._id,
      },
      "test",
      { expiresIn: "1h" }
    );
    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    console.log({ error });
    res.status(500).json(error.message);
  }
};

export const register = async (req, res) => {
  const { email, password, username, confirmPassword } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(500).json({ message: "User Already exists" });
    }
    if (password !== confirmPassword)
      return res.status(500).json({ message: "Passwords don't match" });

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await User.create({
      email,
      password: hashedPassword,
      username,
    });
    const token = jwt.sign(
      {
        email: result.email,
        id: result._id,
      },
      "test",
      { expiresIn: "1h" }
    );
    res.status(200).json({ result, token });
  } catch (error) {
    res.status(500).json(error.message);
  }
};
