import Auth from "../models/AuthModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Get all users
export const getAuth = async (req, res) => {
    try {
        const auth = await Auth.findAll({
            attributes: ["id", "username", "email"],
        });
        res.json(auth);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to fetch users"
        });
    }
};

// Register a new user
export const Register = async (req, res) => {
    const {
        username,
        email,
        password,
        confPassword
    } = req.body;

    // Validasi input
    if (!username || !email || !password || !confPassword) {
        return res.status(400).json({
            msg: "Semua field harus diisi"
        });
    }

    // Validasi password dan konfirmasi password
    if (password !== confPassword) {
        return res.status(400).json({
            msg: "Password dan Confirm Password tidak cocok"
        });
    }

    try {
        // Hash password
        const salt = await bcrypt.genSalt();
        const hashPassword = await bcrypt.hash(password, salt);

        // Buat user baru
        await Auth.create({
            username: username,
            email: email,
            password: hashPassword,
        });

        res.json({
            msg: "Register Berhasil"
        });
    } catch (error) {
        console.error("Error saat register:", error);
        res.status(500).json({
            msg: "Register Gagal"
        });
    }
};

// Login user
export const Login = async (req, res) => {
    try {
        const authe = await Auth.findAll({
            where: {
                email: req.body.email,
            },
        });

        if (authe.length === 0) {
            return res.status(404).json({
                msg: "Email tidak ditemukan"
            });
        }

        const match = await bcrypt.compare(req.body.password, authe[0].password);
        if (!match) return res.status(400).json({
            msg: "Password salah"
        });

        const userId = authe[0].id;
        const username = authe[0].username;
        const email = authe[0].email;

        const accessToken = jwt.sign({
            userId: userId,
            username: username,
            email: email
        }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '15m'
        });


        const refreshToken = jwt.sign({
                userId,
                username,
                email
            },
            process.env.REFRESH_TOKEN_SECRET, {
                expiresIn: "1d"
            }
        );

        await Auth.update({
            refresh_token: refreshToken
        }, {
            where: {
                id: userId,
            },
        });

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
        });

        res.json({
            accessToken
        });
    } catch (error) {
        console.error("Error saat login:", error);
        res.status(500).json({
            msg: "Login Gagal"
        });
    }
};

export const Logout = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.sendStatus(204);

    const authe = await Auth.findAll({
        where: {
            refresh_token: refreshToken
        }
    });

    if (!authe[0]) return res.sendStatus(204); // ← ini yang benar

    const userId = authe[0].id;
    await Auth.update({
        refresh_token: null
    }, {
        where: {
            id: userId
        }
    });

    res.clearCookie("refreshToken");
    return res.sendStatus(200);
};