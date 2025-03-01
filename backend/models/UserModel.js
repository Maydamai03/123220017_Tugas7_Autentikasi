import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const User = db.define('users',{
    title: DataTypes.STRING,
    category: DataTypes.STRING,
    text: DataTypes.STRING,
    }, {
        freezeTableName:true,
        //timestamps:false
        createdAt: 'tanggal dibuat',
        updatedAt: 'tanggal diubah',
 
    });

    export default User;

    (async()=>{
        await db.sync();

    })();