const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userRepository = require('../repositories/auth.repositories');
const { successResponse, errorResponse } = require('../utils/baseResponse');

async function getAllUsers(req, res) {
    try {
        const user = await userRepository.getAllUsers();
        successResponse(res, 200, "User successfully retrieved", user);
    } catch (error) {
        errorResponse(res, 500, "Failed to retrieve users", error);
    }
}

async function getUserByUsername(req, res) {
    const { username } = req.params;
    try {
        const user = await userRepository.getUserByUsername(username);
        if (user) {
            successResponse(res, 200, "User successfully retrieved", user);
        } else {
            errorResponse(res, 404, "User not found");
        }
    } catch (error) {
        errorResponse(res, 500, "Failed to retrieve user", error);
    }
}

async function getProfile(req, res) {
    try {
        const id = req.user.id;
        const user = await userRepository.getUserById(id);
        if (user) {
            res.status(200).json({ message: "Profile successfully retrieved", data: user });
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve profile", error });
    }
}

async function registerUser(req, res) {
    const { name, email, username, password } = req.body;
    try {
        if (!name || !email || !username || !password) {
            return errorResponse(res, 400, "All fields are required");
        }
        const existingUser = await userRepository.getUserByUsername(username);
        if (existingUser) {
            return errorResponse(res, 409, "Username already exists");
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await userRepository.addUser({ name, email, username, password: hashedPassword });
        successResponse(res, 201, "User successfully registered", newUser);
    } catch (error) {
        errorResponse(res, 500, "Failed to register user", error);
    }
}

async function loginUser(req, res) {
    const { username, password } = req.body;
    try {
        const user = await userRepository.getUserByUsername(username);
        const passwordMatch = user ? await bcrypt.compare(password, user.password) : false;
        if (user && passwordMatch) {
            const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES });
            successResponse(res, 200, "Login successful", { token });
        } else {
            errorResponse(res, 401, "Invalid username or password");
        }
    } catch (error) {
        errorResponse(res, 500, "Failed to login", error);
    }
}

async function updateUser(req, res) {
    const id = req.user.id;
    const { name, email, username } = req.body;

    try {
        const updatedUser = await userRepository.updateUser(id, { name, email, username });
        if (updatedUser) {
            successResponse(res, 200, 'User successfully updated', updatedUser);
        } else {
            errorResponse(res, 400, 'No fields to update');
        }
    } catch (error) {
        errorResponse(res, 500, 'Failed to update user', error);
    }
}

async function changePassword(req, res) {
    const id = req.user.id;
    const { oldPassword, newPassword } = req.body;

    try {
        const user = await userRepository.getUserById(id);

        const passwordMatch = await bcrypt.compare(oldPassword, user.password);
        if (!passwordMatch) {
            errorResponse(res, 401, 'Old password is incorrect');
        }

        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        await userRepository.updatePassword(id, hashedNewPassword);

        successResponse(res, 200, 'Password successfully changed');
    } catch (error) {
        errorResponse(res, 500, 'Failed to change password', error);
    }
}

async function updateUserRole(req, res) {
    const { id } = req.params;
    const { role } = req.body;
    const admin = req.user.role;

    try {
        if (admin !== 'admin') {
            return errorResponse(res, 403, 'Only admin can update user roles');
        }
        const updatedUser = await userRepository.updateUserRole(id, role);
        if (updatedUser) {
            successResponse(res, 200, 'User role successfully updated', updatedUser);
        } else {
            errorResponse(res, 400, 'No fields to update');
        }
    } catch (error) {
        errorResponse(res, 500, 'Failed to update user role', error);
    }
}

async function deleteUser(req, res) {
    const { id } = req.params;
    const admin = req.user.role;
    try {
        if (admin !== 'admin') {
            return errorResponse(res, 403, 'Only admin can delete users');
        }
        await userRepository.deleteUser(id);
        successResponse(res, 200, 'User successfully deleted');
    } catch (error) {
        errorResponse(res, 500, 'Failed to delete user', error);
    }
}

module.exports = {
    getAllUsers,
    getUserByUsername,
    registerUser,
    loginUser,
    getProfile,
    updateUser,
    changePassword,
    updateUserRole,
    deleteUser
};
