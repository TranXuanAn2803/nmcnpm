const { models } = require("..");
const { QueryTypes } = require("sequelize");
const sq = require("../../models/index");
const async = require("hbs/lib/async");
async function test() {
    const t = await models.PhieuThu.findAll({ raw: true });
    console.log(t);
    return t;
}

// get all account
const listPhieuThu = () => {
    return models.PhieuThu.findAll({ raw: true });
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
const deleteByDaiLy = async(id) => {
        try {
            await models.PhieuThu.destroy({
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
    /*
    const addDaiLy = async(daiLy) => {
        try {
            await models.DaiLy.create({
                Type: daiLy.Type,
                Name: daiLy.Name,
                Phone: daiLy.Phone,
                District: daiLy.District,
                Address: daiLy.Address,
                Day: daiLy.Day,
                Debts: daiLy.Debts,
                Email: daiLy.Email,

            });
        } catch (err) {
            console.log(err);
        }
    };
    const findById = async(id) => {
        try {
            return await models.DaiLy.findAll({
                where: {
                    ID: id
                }
            })
        } catch (err) {
            console.log(err);
        }
    }
    const updateDaiLy= async(daiLy) => {
        try {
            await models.DaiLy.update({
                Type: daiLy.Type,
                Name: daiLy.Name,
                Phone: daiLy.Phone,
                District: daiLy.District,
                Address: daiLy.Address,
                Day: daiLy.Day,
                Debts: daiLy.Debts,
                Email: daiLy.Email,
            }, {
                where: {
                    ID: DaiLy.ID
                }
            })
        } catch (err) {
            console.log(err);
        }
    }
    const deleteDaiLy = async(id) => {
        try {
            await models.DaiLy.destroy({
                where: {
                    ID: id
                }
            })
        } catch (err) {
            console.log(err);
        }
    }

    /*
    const deleteAccount = async(account) => {
        try {
            await models.UserAccount.destroy({
                where: {
                    id: account.id
                }
            })
        } catch (err) {
            console.log(err);
        }
    }

    const findById = async(account) => {
        try {
            return await models.UserAccount.findAll({
                where: {
                    id: account.id
                }
            })
        } catch (err) {
            console.log(err);
        }
    }
    const findByUserName = async(user_name) => {
        try {
            const user = await models.UserAccount.findAll({
                where: {
                    user_name: user_name
                }
            })
            return user[0]
        } catch (err) {
            console.log(err);
        }
    }

    const updateAccount = async(account) => {
        try {
            await models.UserAccount.update({
                user_name: account.user_name,
                password: account.password,
                name: account.name,
                identity_card: account.identity_card,
                active: account.active,
                is_alert: account.is_alert,
            }, {
                where: {
                    id: account.id
                }
            })
        } catch (err) {
            console.log(err);
        }
    }*/
module.exports = { listPhieuThu, addPhieuThu, findById, updatePhieuThu, deleteByDaiLy };