import userService from '../services/userService.js';

export const createUser = async (req, res) => {
    const newUser = await userService.createUser(req.body.username,req.body.password,req.body.email,req.body.displayName,req.body.profilePic,req.body.age,req.body.location, req.body.realLevel);
    res.status(newUser.status).send(newUser.body);
    //TODO: maybe return a token here and log the user in automatically
}
