import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });

  try {
    await newUser.save();
    res
      .status(200)
      .json(new ApiResponse(200, newUser, "user created successfully"));
  } catch (error) {
    next(new ApiError(500, "error from a function"));
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      throw new ApiError(400, "username or email is required");
    }
    //compare password

    const validPassword = bcryptjs.compareSync(password, validUser.password);
    //check if password recived
    if (!validPassword) {
      throw new ApiError(401, "Invalid User credentials");
    }
    const token = jwt.sign(
      {
        id: validUser._id,
      },
      process.env.JWT_SECRET
    );

    const options = {
      httpOnly: true,
      secure: true,
    };
    const loggedInUser = await User.findOne(validUser._id).select(
      "-password -token"
    );
    res
      .status(200)
      .cookie("access_token", token, options)
      .json(new ApiResponse(200, loggedInUser, "Logged In successfully"));
  } catch (error) {
    next(error);
  }
};

// export const google = async (req, res, next) => {
//   try {
//     const user = await User.findOne({ email: req.body.email });
//     if (user) {
//       const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
//       // const { password: pass, ...rest } = user._doc;
//       const loggedInUser = await User.findOne(user._id).select(
//         "-password -token"
//       );
//       res
//         .cookie("access_token", token, { httpOnly: true })
//         .status(200)
//         .json(new ApiResponse(200, loggedInUser, "access token created successfully"));
//     } else {
//       const generatePassword = Math.random().toString(36).slice(-8);
//       const hashedPassword = bcryptjs.hashSync(generatePassword, 10);
//       const newUser = new User({
//         username:
//           req.body.name.split(" ").join("").toLowerCase() +
//           Math.random().toString(36).slice(-4),
//         email: req.body.email,
//         password: hashedPassword,
//         avatar: req.body.photo,
//       });

//       await newUser.save();
//       const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
//       // const { password: pass, ...rest } = newUser._doc;
//       const loggedInUser = await User.findOne(newUser._id).select(
//         "-password -token"
//       );
//       res
//         .cookie("access_token",token,{ httpOnly: true})
//         .status(200)
//         .json(new ApiResponse(200, loggedInUser, "google user created successfully"));
//     }
//   } catch (error) {
//     next(error);
//   }
// };







export const google = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = user._doc;
      res
        .cookie('access_token', token, { httpOnly: true })
        .status(200)
        .json(rest);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = new User({
        username:
          req.body.name.split(' ').join('').toLowerCase() +
          Math.random().toString(36).slice(-4),
        email: req.body.email,
        password: hashedPassword,
        avatar: req.body.photo,
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = newUser._doc;
      res
        .cookie('access_token', token, { httpOnly: true })
        .status(200)
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};
