import express from "express";
import {
    getUsers,
    getUsersById,
    createUser,
    updateUser,
    deleteUser
} from "../controllers/UserController.js";
import { verifyToken } from "../middleware/VerifyToken.js";

const router = express.Router();

// Lindungi semua route notes dengan token
router.get('/users', verifyToken, getUsers);
router.get('/users/:id', verifyToken, getUsersById);
router.post('/users', verifyToken, createUser); // ✅ userId akan masuk dari token
router.patch('/users/:id', verifyToken, updateUser);
router.delete('/users/:id', verifyToken, deleteUser);

export default router;
