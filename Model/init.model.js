const dbConfig = require("../config/db");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.DaiLy = require("./DaiLy/DaiLy.model")(sequelize, Sequelize);
db.HangHoa = require("./HangHoa/HangHoa.model")(sequelize, Sequelize);
db.LoaiDaiLy = require("./LoaiDaiLy/LoaiDaiLy.model")(sequelize, Sequelize);
db.PhieuThu = require("./PhieuThu/PhieuThu.model")(sequelize, Sequelize);
db.PhieuXuat = require("./PhieuXuat/PhieuXuat.model")(sequelize, Sequelize);
db.CT_PhieuXuat = require("./CT_PhieuXuat/CT_PhieuXuat.model")(sequelize, Sequelize);

module.exports = db;