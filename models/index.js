const dbConfig = require("../config/db.config");
const initModels = require("./init.model");
const Sequelize = require("sequelize");
//connect postgres
const sequelize = new Sequelize(
    dbConfig.database,
    dbConfig.user,
    dbConfig.password, {
        host: dbConfig.host,
        dialect: dbConfig.dialect,
        pool: {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle,
        },
    }
);

module.exports = {
    sequelize,
    models: initModels(sequelize),
};