const { models } = require("..");
const { QueryTypes } = require("sequelize");
const sq = require("../../models/index");
const async = require("hbs/lib/async");
async function test() {
    const t = await models.LoaiDaiLy.findAll({ raw: true });
    console.log(t);
    return t;
}

// get all account
const listLoaiDaiLy = () => {
    return models.LoaiDaiLy.findAll({ raw: true });
};
const addLoaiDaiLy = async(loaiDaiLy) => {
    try {
        await models.LoaiDaiLy.create({
            Name: loaiDaiLy.Name,
            Max_debt: loaiDaiLy.Max_debt,

        });
    } catch (err) {
        console.log(err);
    }
};
const updateLoaiDaiLy = async(loaiDaiLy) => {
        try {
            await models.LoaiDaiLy.update({
                Name: loaiDaiLy.Name,
                Max_debt: loaiDaiLy.Max_debt,
            }, {
                where: {
                    ID: loaiDaiLy.ID
                }
            })

        } catch (err) {
            console.log(err);
        }
    }
    /*
    const addAccount = async(account) => {
        try {
            await models.UserAccount.create({
                user_name: account.user_name,
                password: account.password,
                name: account.name,
                identity_card: account.identity_card,
                role: account.role,
                active: account.active,
                is_alert: account.is_alert,

            });
        } catch (err) {
            console.log(err);
        }
    };

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
    */
const findById = async(id) => {
    try {
        return await models.LoaiDaiLy.findAll({
            where: {
                id: id
            }
        })
    } catch (err) {
        console.log(err);
    }
}
const findByName = async(Name) => {
    try {
        const result = await models.LoaiDaiLy.findAll({
            where: {
                Name: Name
            }
        })
        return result[0]
    } catch (err) {
        console.log(err);
    }
}
const deleteLoaiDaiLy = async(id) => {
    try {
        await models.LoaiDaiLy.destroy({
            where: {
                ID: id
            }
        })
    } catch (err) {
        console.log(err);
    }
}


/*
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
module.exports = { listLoaiDaiLy, findById, findByName, addLoaiDaiLy, updateLoaiDaiLy, deleteLoaiDaiLy };