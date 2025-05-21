import express from "express";
import { getAuth , Register , Login , Logout } from "../controllers/AuthController.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";

const router = express.Router();

// Route untuk mendapatkan semua user
router.get("/auth", verifyToken , getAuth);
router.post("/auth", Register);
router.post("/login", Login);
router.get("/token", refreshToken);
router.delete("/logout", Logout);

export default router;