import { Sequelize } from "sequelize";

const db = new Sequelize('note_db', 'maysql','Jadagabu123',{
    host: '34.58.197.34',
    dialect:'mysql',
    port: 3306
});

export default db;