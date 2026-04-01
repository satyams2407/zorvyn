const User = require('../models/User');
const generateToken = require('../utils/generateToken');

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
            const user = new User({
                name: name,
                email: email,
                password: password,
            });
            await user.save();
            const token = generateToken(user);
            return response.status(201).json({
                status: success,
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
}