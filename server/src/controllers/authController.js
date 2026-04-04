const User = require('../models/User');
const generateToken = require('../utils/generateToken');
const bcrypt = require('bcrypt');
const {USER_STATUS} = require('../constants/authConstants');

const authController = {
    register : async (request, response) => {
        const {name, email, password} = request.body;

        try{
            if(!name || !email || !password){
                return response.status(400).json({message : 'All fields are required'});
            }
            const existingUser = await User.findOne({email});
            if(existingUser){
                return response.status(409).json({message: "User already exists"});
            }
            const encryptedPassword = await bcrypt.hash(password, 10);
            const user = new User({
                name: name,
                email: email,
                password: encryptedPassword,
            });
            await user.save();
            const token = generateToken(user);
            return response.status(201).json({
                success: true,
                message: 'User registered successfully',
                token,
                data : {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    status: user.status,
                }
            });
        }
        catch(error){
            return response.status(500).json({message : 'Server error', error: error.message});
        }
    },
    login : async (request, response) => {
        const {email, password} = request.body;
        try{
            const user = await User.findOne({email});
            if(!user){
                return response.status(404).json({message: 'User not found'});
            }
            const isMatch = await bcrypt.compare(password, user.password);

            if(user.status !== USER_STATUS.ACTIVE){
                return response.status(403).json({success : false, message: 'Account is not active'});
            }

            if(!isMatch){
                return response.status(401).json({success : false, message: 'Invalid password'});
            }
            const token = generateToken(user);

            return response.status(200).json({
                success: true,
                message: 'Login successful',
                token,
                data : {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    status: user.status,
                }
            })
        }   
        catch(error){
            return response.status(500).json({message : 'Server error', error: error.message});
        }
    }
};

module.exports = authController;