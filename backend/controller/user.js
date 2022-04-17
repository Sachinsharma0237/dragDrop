const userModel = require("../model/user");
const salt = 10;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports.createUser = async(req, res, next) => {
    try{
      const { first_name, last_name, email, password } = req.body;
      if( !(first_name && last_name && email && password) ){
        res.status(400).json({
          message:"All fields are mandatory" 
        });
      }

      const userExist = await userModel.findOne({ email });

      if(userExist){
        res.status(200).json({
          message:"user already exist, please login!",
          data: {} 
        });
      }

      const encryptedPassword = await bcrypt.hash(password, salt);
      const user = await userModel.create({
        first_name,
        last_name,
        email: email.toLowerCase(),
        password: encryptedPassword,
      })
      await user.save();
      const token = jwt.sign(
        { user_id: user._id, 
          email,
          first_name,
          last_name
        },
        process.env.JWT_KEY
      );
      res.cookie("jwt", token, { httpOnly: true });
      user.token = token;
      res.status(201).json({
        status: 201,
        message:"user created successfully",
        data: user
      });

    }
    catch (error) {
      return {
        status: 500,
        message: 'error',
        data: error,
      };
    }
}

module.exports.userLogin = async(req, res, next) => {
    try{
      const { email, password } = req.body;

      if(!(email && password)) {
        res.status(400).json({
          message: 'all input is mandatory'
        });
      }
      const user = await userModel.find({ email: email });
      if(user.length === 0){
        res.status(200).json({
          message: 'email not exists, please signup first',
          data: {},
        });
      }
      console.log(user);
      const isPasswordValid = await bcrypt.compare(password, user[0].password);
      if(isPasswordValid){
        res.status(201).json({
          status: 201,
          message:"user logged in successfully",
          data: user 
        });
      }
      res.status(200).json({
        message:"password is not correct, click on forgot password?",
        data: {} 
      });
    }catch (error) {
      return {
        status: 500,
        message: 'error',
        data: error,
      };
    }
}

module.exports.logout = async(req, res, next) => {
    try{
      res.clearCookie("jwt");
      // res.redirect("/login");
      res.status(200).send("logout successfully");
    }
    catch (error) {
      return {
        status: 500,
        message: 'error',
        data: error,
      };
    }
}

module.exports.updateUser = async(req, res, next) => {
    try{
      const id = req.params.id;
      const updateObject = req.body;
      const user = await userModel.findById(id);
      for(let key in updateObject){
          user[key] = updateObject[key];
      }
      await user.save();
      res.status(200).send("user updated Sucessfully");
    }
    catch (error) {
      return {
        status: 500,
        message: 'error',
        data: error,
      };
    }
}

module.exports.isLoggedIn = async(req, res, next) => {
    try{
      const token = req.cookies.jwt;
      const payload = jwt.verify(token, process.env.JWT_KEY);
      if(payload){
        const user = await userModel.findOne({email: payload.email});
        req.name = user.fullName;
        req.user = user;
        // next();
        res.status(200).json({
          message:"logged in",
          data: req.user
        })
      }else{
          next();
      }
    }
    catch (error) {
      return {
        status: 500,
        message: 'error',
        data: error,
      };
    }
}

module.exports.changePassword = async(req, res, next) => {
    try{
      const { email, password } = req.body;

      if(!(email && password)) {
          res.status(400).send("all input is mandatory");
      }

      const newHashedPassword = await bcrypt.hash(password, salt);
      await userModel.findOneAndUpdate(
        { email: `${email}` },
        { $set: { password: `${newHashedPassword}` } },
        { returnOriginal: false },
      );
      res.status(200).send("password changed successfully");
    }
    catch (error) {
      return {
        status: 500,
        message: 'error',
        data: error,
      };
    }
}

module.exports.findUserByEmail = async(req, res, next) => {
    try{

    }
    catch (error) {
      return {
        status: 500,
        message: 'error',
        data: error,
      };
    }
}

module.exports.findAll = async(req, res, next) => {
    try{
      const allUsers = await userModel.find({});
      res.status(200).json({
          message:"got all users",
          allUsers
      })
    }
    catch (error) {
      return {
        status: 500,
        message: 'error',
        data: error,
      };
    }
}

module.exports.removeUser = async(req, res, next) => {
    try{
      const id = req.params.id;
      await userModel.findByIdAndDelete(id);
      res.status(200).send("user removed Sucessfully");
    }
    catch (error) {
      return {
        status: 500,
        message: 'error',
        data: error,
      };
    }
}

module.exports.getCount = async(req, res, next) => {
    try{
      const allUsersCount = await userModel.count();
      res.status(200).json({
          message:"got all users",
          users: allUsersCount
      })
    }
    catch (error) {
      return {
        status: 500,
        message: 'error',
        data: error,
      };
    }
}
