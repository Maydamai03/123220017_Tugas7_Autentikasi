import {
    Sequelize
} from "sequelize";
import db from "../config/Database.js";

const {
    DataTypes
} = Sequelize;

const Auth = db.define(
    "Authen", {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        refresh_token: {
            type: DataTypes.TEXT,
        },
    }, {
        freezeTableName: true,
    }
);

export default Auth;

(async () => {
    try {
        await db.sync();
        console.log("User table synced successfully!");
    } catch (error) {
        console.error("Failed to sync User table:", error);
    }
})();