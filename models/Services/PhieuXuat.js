const { models } = require("..");
const { QueryTypes } = require("sequelize");
const sq = require("../../models/index");
const async = require("hbs/lib/async");
async function test() {
    const t = await models.PhieuThu.findAll({ raw: true });
    console.log(t);
    return t;
}
const listPhieuXuat = () => {
    return models.PhieuXuat.findAll({ raw: true });
};
const addPhieuXuat = async(phieuXuat) => {
    try {
        await models.PhieuXuat.create({
            DaiLy_ID: phieuXuat.DaiLy_ID,
            Date: phieuXuat.Date,
            Total_Money: phieuXuat.Total_Money,

        });
    } catch (err) {
        console.log(err);
    }
};
const findById = async(id) => {
    try {
        return await models.PhieuXuat.findAll({
            where: {
                ID: id
            }
        })
    } catch (err) {
        console.log(err);
    }
}
const findByDaiLy = async(id) => {
    try {
        return await models.PhieuXuat.findAll({
            where: {
                DaiLy_ID: id
            }
        })
    } catch (err) {
        console.log(err);
    }
}

const updatePhieuXuat = async(phieuXuat) => {
    try {
        await models.PhieuXuat.update({
            DaiLy_ID: phieuXuat.DaiLy_ID,
            Date: phieuXuat.Date,
            Total_Money: phieuXuat.Total_Money,
        }, {
            where: {
                ID: phieuXuat.ID
            }
        })
    } catch (err) {
        console.log(err);
    }
}
const updateTotalMoney = async(phieuXuat, money) => {
    try {
        await models.PhieuXuat.update({
            Total_Money: money + phieuXuat.Total_Money,
        }, {
            where: {
                ID: phieuXuat.ID
            }
        })
        return true;
    } catch (err) {
        console.log(err);
        return false;
    }
    return false;
}
const deletePhieuXuat = async(id) => {
    try {
        await models.PhieuXuat.destroy({
            where: {
                ID: id
            }
        })
    } catch (err) {
        console.log(err);
    }
}
const deleteByDaiLy = async(id) => {
    try {
        await models.PhieuXuat.destroy({
            where: {
                DaiLy_ID: id
            }
        })
        return true;
    } catch (err) {
        console.log(err);
        return false;
    }
}

/*// get all account
const listPhieuXuat = () => {
    return models.PhieuXuat.findAll({ raw: true });
};
const addPhieuThu = async(phieuThu) => {
    try {
        await models.PhieuThu.create({
            DaiLy_ID: phieuThu.DaiLy_ID,
            Phone: phieuThu.Phone,
            Date: phieuThu.Date,
            Address: phieuThu.Address,
            Email: phieuThu.Email,
            Total_Money: phieuThu.Total_Money,

        });
    } catch (err) {
        console.log(err);
    }
};
const findById = async(id) => {
    try {
        return await models.PhieuThu.findAll({
            where: {
                ID: id
            }
        })
    } catch (err) {
        console.log(err);
    }
}
const updatePhieuThu = async(phieuThu) => {
    try {
        await models.PhieuThu.update({
            DaiLy_ID: phieuThu.DaiLy_ID,
            Phone: phieuThu.Phone,
            Date: phieuThu.Date,
            Address: phieuThu.Address,
            Email: phieuThu.Email,
            Total_Money: phieuThu.Total_Money,
        }, {
            where: {
                ID: phieuThu.ID
            }
        })
    } catch (err) {
        console.log(err);
    }
}

*/
module.exports = { listPhieuXuat, addPhieuXuat, findById, updatePhieuXuat, deletePhieuXuat, updateTotalMoney, findByDaiLy, deleteByDaiLy };