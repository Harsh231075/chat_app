import User from '../model/userModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'

export const register = async (req, res) => {
  const { userName, fullName, password, gender } = req.body;

  try {
    if (!userName || !fullName || !password || !gender) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const userExists = await User.findOne({ userName });
    if (userExists) {
      return res.status(400).json({ message: "Please use a different username" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const boyPhoto = `https://avatar.iran.liara.run/public/boy`;
    const girlPhoto = `https://avatar.iran.liara.run/public/girl`;

    await User.create({
      userName,
      fullName,
      password: hashedPassword,
      gender,
      profilePhoto: gender === 'male' ? boyPhoto : girlPhoto
    });

    return res.status(201).json({ message: "User created successfully" });

  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const login = async (req, res) => {
  const { userName, password } = req.body;
  try {
    if (!userName || !password) {
      return res.status(400).json({ message: 'Please fill required fields' })
    }
    const user = await User.findOne({ userName });
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(404).json({ message: 'Wrong password' })
    }
    const tokenData = { _id: user._id }
    const token = jwt.sign(tokenData, process.env.SECRET_KEY);

    // Fixed cookie settings
    res.cookie("token", token, {
      httpOnly: true,
      secure: true, // for HTTPS
      sameSite: 'None', // for cross-origin
      maxAge: 24 * 60 * 60 * 1000, // 24 hours in milliseconds
      path: '/' // accessible across all routes
    }).status(200).json({
      message: "Login Successfully",
      user,
      token // sending token in response as well
    });

  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
}

export const logout = async (req, res) => {
  try {
    res
      .status(200)
      .cookie("token", "", {
        httpOnly: true,
        expires: new Date(0),
      })
      .json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Logout Error:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};


export const loggedIn = async (req, res) => {
  try {
    const userId = req.id;

    const users = await User.find({ _id: { $ne: userId } }).select("-password");

    res.status(200).json({
      message: "All users fetched except current user",
      users
    });
  } catch (error) {
    console.error("Error in fetching users:", error);
    res.status(500).json({ message: "Server error" });
  }
};
