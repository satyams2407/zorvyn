const User = require('../models/User');
const { ROLES, USER_STATUS } = require('../constants/authConstants');
const bcrypt = require('bcrypt');

const userController = {
    getAllUsers : async (request, response) => {
        try{
            const users = await User.find().sort({createdAt : -1});
            return response.status(200).json({success : true, data: users});
        }
        catch(error){
            return response.status(500).json({message: "An error occurred while fetching users."});
        }
    },
    createUserByAdmin : async (request, response) => {
        const {name, email, password, role, status} = request.body;
        try{
            if(!name || !email || !password || !role || !status){
                return response.status(400).json({message: "All fields are required."});
            }
            if(!Object.values(ROLES).includes(role)){
                return response.status(400).json({message: "Invalid role provided."});
            }
            if(!Object.values(USER_STATUS).includes(status)){
                return response.status(400).json({message: "Invalid status provided."});
            }
            const existingUser = await User.findOne({email});
            if(existingUser){
                return response.status(400).json({message: "User with this email already exists."});
            }
            const encryptedPassword = await bcrypt.hash(password, 10);
            const newUser = new User({
                name: name,
                email: email,
                password: encryptedPassword,
                role: role,
                status: status
            });
            await newUser.save();
            return response.status(201).json({success: true, data: newUser});
        }
        catch(error){
            return response.status(500).json({message: "An error occurred while creating user."});
        }
    }

    
};

module.exports = userController;