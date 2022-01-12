var DataTypes = require("sequelize").DataTypes;
var _LoaiDaiLy = require("./LoaiDaiLy.model");
var _DaiLy = require("./DaiLy.model");
var _HangHoa = require("./HangHoa.model");
var _PhieuXuat = require("./PhieuXuat.model");
var _PhieuThu = require("./PhieuThu.model");
var _CT_PhieuXuat = require("./CT_PhieuXuat.model");


function initModels(sequelize) {
    var LoaiDaiLy = _LoaiDaiLy(sequelize, DataTypes);
    var DaiLy = _DaiLy(sequelize, DataTypes);
    var HangHoa = _HangHoa(sequelize, DataTypes);
    var PhieuXuat = _PhieuXuat(sequelize, DataTypes);
    var PhieuThu = _PhieuThu(sequelize, DataTypes);
    var CT_PhieuXuat = _CT_PhieuXuat(sequelize, DataTypes);


    return {
        LoaiDaiLy,
        DaiLy,
        HangHoa,
        PhieuThu,
        PhieuXuat,
        CT_PhieuXuat
    };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;