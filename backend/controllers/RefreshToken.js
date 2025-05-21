import Auth from "../models/AuthModel.js";
import jwt from "jsonwebtoken";

export const refreshToken = async(req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if(!refreshToken) return res.sendStatus(401);
        const auth = await Auth.findAll({
            where:{
                refresh_token: refreshToken
            }
        });
        if(!auth[0]) return res.sendStatus(403);
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
            if(err) return res.sendStatus(403);
            const userId = auth[0].id;
            const name = auth[0].name;
            const email = auth[0].email;
            const accessToken = jwt.sign({userId, name, email}, process.env.ACCESS_TOKEN_SECRET,{
                expiresIn: '10s'
            });
            res.json({ accessToken });
        });
    } catch (error) {
        console.log(error);
    }
}