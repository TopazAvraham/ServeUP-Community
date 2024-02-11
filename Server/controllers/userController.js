import userService from '../services/userService.js';
import tokenService from '../services/tokenService.js';

export const createUser = async (req, res) => {
    const newUser = await userService.createUser(req.body.username,req.body.password,req.body.email,req.body.displayName,req.body.profilePic,req.body.age,req.body.location, req.body.realLevel);
    res.status(newUser.status).send(newUser.body);
    //TODO: maybe return a token here and log the user in automatically
}

export const updateUserInfo = async (req, res) => {
    let username=""
    try{
    username = await tokenService.isLoggedIn(req.headers.authorization);
    }catch(error){
      res.status(401).send();
      return;
    }
    const updatedUser = await userService.updateUserInfo(username,req.body);
    res.status(200).send(updatedUser);
  }