import UserModel from '../models/userModel.js';

const createUser = async (username, password,email,displayName, profilePic,age, location, realLevel) => {
    try {
      // check if the username is already taken
      const existingUser = await UserModel.findOne({ username });
      if (existingUser) {
        return { error: 'Username is already taken', status: 409 };
      }
      const newUser= new UserModel({
        username,
        password,
        email,
        displayName,
        profilePic,
        age,
        location: {"name":location.name,"adminCode":location.adminCode},
        realLevel
      });
      await newUser.save();
      const tokenReq = await tokenService.getToken(username,password);
      return { status: 201 ,body:{authorization:"Bearer "+tokenReq.token}};
    } catch (error) {
      return { error: error.message, status: 500 };
    }
    
};

export default {createUser};
