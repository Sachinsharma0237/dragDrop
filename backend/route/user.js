const express = require('express');
const { createUser, userLogin, getCount, updateUser, changePassword, removeUser, findUserByEmail, isLoggedIn, logout } = require('../controller/user');
const userRouter = express.Router();

userRouter.route('/signup').post(createUser);
userRouter.route('/login').post(userLogin);
userRouter.route('/logout').get(logout);
userRouter.route('/isLogged').get(isLoggedIn);
userRouter.route('/:id').patch(updateUser);
userRouter.route('/:id').get(findUserByEmail);
userRouter.route('/count').get(getCount);
userRouter.route('/:id').delete(removeUser);
userRouter.route('/forget-password').post(changePassword);

module.exports = userRouter;