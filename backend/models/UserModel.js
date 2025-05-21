import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

// models/UserModel.js
const User = db.define('users', {
    title: DataTypes.STRING,
    category: DataTypes.STRING,
    text: DataTypes.STRING,
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    freezeTableName: true,
    createdAt: 'tanggal dibuat',
    updatedAt: 'tanggal diubah',
});


    export default User;

    (async()=>{
        await db.sync();

    })();