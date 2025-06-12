const userModel = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jsonwebtoken = require('jsonwebtoken');

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                message: 'Name, email, and password are required'
            });
        }

        // Check if user already exists
        const existingUser = await userModel.findOne({ email: email });
        if (existingUser) {
            return res.status(400).json({
                message: 'User already exists with this email'
            });
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new userModel({
            name,
            email,
            password: hashedPassword
        });

        await newUser.save();

        res.status(201).json({
            message: 'User registered successfully',
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email
            }
        });

    } catch (err) {
        res.status(500).json({
            message: 'Internal server error',
            error: err.message
        });
    }
}

const loginUser = async (req, res) => {

    try {

        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                message: 'Email and password are required'
            });
        }

        const user = await userModel.findOne({ email: email });

        if (!user) {
            return res.status(404).json({
                message: 'User not found with this email'
            });
        }

        // If password is stored hashed, use bcrypt to compare
        const isMatch = await bcrypt.compare(password, user.password);
        console.log(isMatch);
        if (!isMatch) {
            return res.status(404).json({
                message: 'Invalid email or password'
            });
        }

        // Generate JWT token
        const token = jsonwebtoken.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        // Optionally, you can send the token back to the client
        res.cookie('token', token, {
            httpOnly: true,
            secure: false,          // ✅ Must be false in local (HTTP)
            sameSite: 'Lax',        // ✅ Recommended: 'Lax' for local or 'None' with HTTPS
            maxAge: 24 * 60 * 60 * 1000 // 1 day
        });
        res.status(200).json({
            message: 'Login successful',
            id: user._id,
            name: user.name,
            email: user.email,
            token,
        });

    } catch (err) {
        res.status(500).json({
            message: 'Internal server error',
            error: err.message
        });
    }
}

module.exports = {
    registerUser,
    loginUser
};