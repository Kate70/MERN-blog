const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const HttpError = require("../models/errorModel");
const { request } = require("express");
const fs = require("fs");
const path = require("path");
const { v4: uuid } = require("uuid");

// ================Register A New User=====================//
// POST : api/users/register
//UNPROTECTED

const registerUser = async (req, res, next) => {
  try {
    const { name, email, password, password2 } = req.body;
    if (!name || !email || !password) {
      return next(
        new HttpError("User registration failed. Fill all fields!", 422)
      );
    }
    const newEmail = email.toLowerCase();
    const emailExist = await User.findOne({ email: newEmail });
    if (emailExist) {
      return next(new HttpError("THis email already exist", 422));
    }
    if (password.trim().length < 6) {
      return next(new HttpError("Password should be least 6 characters", 422));
    }

    if (password != password2) {
      return next(new HttpError("Passwods do not match", 422));
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      name,
      email: newEmail,
      password: hashedPass,
    });
    res.status(201).json(newUser);
  } catch (error) {
    return next(new HttpError("Fill in all faileds", 422));
  }
  res.json("register user");
};

// ================Login A Registered User=====================//
// POST : api/users/login
//UNPROTECTED

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(new HttpError("Fill all fields!", 422));
    }
    const newEmail = email.toLowerCase();
    const user = await User.findOne({ email: newEmail });
    if (!user) {
      return next(new HttpError("Invalid credentials!", 422));
    }

    const comparePass = await bcrypt.compare(password, user.password);
    if (!comparePass) {
      return next(new HttpError("Invalid credentials!", 422));
    }

    const { _id: id, name } = user;
    const token = jwt.sign(
      {
        id,
        name,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    res.status(200).json({ token, id, name });
  } catch (error) {
    console.log(error);
    return next(new HttpError("Login failed. Check your credentials!", 422));
  }
};

// ================User Profile =====================//
// POST : api/users/:id
//PROTECTED

const getUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).select("-password");
    if (!user) {
      return next(new HttpError("User not found", 404));
    }
    res.status(200).json(user);
  } catch (error) {
    return next(new HttpError(error));
  }
};

// ================CHANGE User Avatar=====================//
// POST : api/users/change-avatar
//PROTECTED

const changeAvatar = async (req, res, next) => {
  try {
    if (!req.files.avatar) {
      return next(new HttpError("Please, choose an image", 422));
    }

    const user = await User.findById(req.user.id);
    if (user.avatar) {
      fs.unlink(path.join(__dirname, "...", "uploads", user.avatar), (err) => {
        if (err) {
          return next(new HttpError(err));
        }
      });
    }
    const { avatar } = req.files;

    if (avatar.size > 500000) {
      return next(new HttpError(" Too big picture", 422));
    }

    let fileName;
    fileName = avatar.name;
    let splittedFilename = fileName.split(".");
    let newFilename =
      splittedFilename[0] +
      uuid() +
      "." +
      splittedFilename[splittedFilename.length - 1];
    avatar.mv(
      path.join(__dirname, "..", "uploads", newFilename),
      async (err) => {
        if (err) {
          return next(new HttpError(err));
        }
        const updatedAvatar = await User.findByIdAndUpdate(
          req.user.id,
          { avatar: newFilename },
          { new: true }
        );
        if (!updatedAvatar) {
          return next(new HttpError("Avatar couldn't be changed!", 422));
        }
        res.status(200).json(updatedAvatar);
      }
    );
  } catch (error) {
    return next(new HttpError(error));
  }
};

// ================EDIT USER DETAILS (from profile)=====================//
// POST : api/users/edit-user
//PROTECTED

const editUser = async (req, res, next) => {
  try {
    const { name, email, currentPassword, newPasword, newConfirmNewPassword } =
      req.body;
    if ((!name, !email, !currentPassword, !newPasword)) {
      return next(new HttpError("Fill in all fields!", 422));
    }
    const user = await User.findById(req.user.id);
    if (!user) {
      return next(new HttpError("User not found", 422));
    }

    const emailExist = await User.findOne({ email });
    if (emailExist && emailExist._id != req.user.id) {
      return next(new HttpError("Email.already exist", 422));
    }
    const validateUserPassword = await bcrypt.compare(
      currentPassword,
      user.password
    );
    if (!validateUserPassword) {
      return next(new HttpError("Invalid current password", 422));
    }
    if (newPasword !== newConfirmNewPassword) {
      return next(new HttpError("new passwords do not match", 422));
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(newPasword, salt);

    const newInfo = await User.findByIdAndUpdate(
      req.user.id,
      { name, email, password: hash },
      { new: true }
    );
    res.status(200).json(newInfo);
  } catch (err) {
    return next(new HttpError(err));
  }
};

// ================GET AUTHORS=====================//
// POST : api/users/register
//UNPROTECTED

const getAuthors = async (req, res, next) => {
  try {
    const authors = await User.find().select("-password");
    res.json(authors);
  } catch (error) {
    return next(new HttpError(error));
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUser,
  changeAvatar,
  editUser,
  getAuthors,
};
