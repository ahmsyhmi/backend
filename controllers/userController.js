const User = require("../models/User");

const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name ||!email ||!password) {
            return res.status(400).json({ message: 'Please provide all fields' });
        }
        
        const isUserExists = await User.findOne({ email });
        
        if (isUserExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const user = await User.create({
            name,
            email,
            password,
        });

        res.status(200).json({
            success: true,
            user,
        });

    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message });
    }
};

const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);

    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message });
    }
};

const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        res.status(200).json(user);
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message });
    }
}

const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, password, isAdmin } = req.body;
        const user = await User.findById(id);
        
        if (user) {
            if (name) {
                user.name = name;
            }
            if (email) {
                user.email = email;
            }
            if (password) {
                user.password = password;
            }
            if (isAdmin) {
                user.isAdmin = isAdmin;
            }
            const updatedUser = await user.save();
            res.status(200).json(updatedUser); 
        }
        else {
            res.status(404).json({ message: 'User not found' });
        }
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message });
    }
}

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);

        if (user) {
            await user.remove();
            res.status(200).json({ message: 'User deleted successfully' });
        }
        else {
            res.status(404).json({ message: 'User not found' });
        }
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message });
    }
}

module.exports = {
    createUser,
    getUsers,
    getUser,
    updateUser,
    deleteUser,
};