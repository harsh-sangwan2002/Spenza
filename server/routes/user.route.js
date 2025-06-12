const userRouter = require('express').Router();
const { registerUser, loginUser } = require('../controllers/user.controller');

userRouter.post('/register', registerUser)
    .post('/login', loginUser);

module.exports = userRouter;