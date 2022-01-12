const { models } = require("..");
const { QueryTypes } = require("sequelize");
const sq = require("../../models/index");
const async = require("hbs/lib/async");
async function test() {
    const t = await models.Daily.findAll({ raw: true });
    console.log(t);
    return t;
}

// get all account
const listDaiLy = () => {
    return models.DaiLy.findAll({ raw: true });
};

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
const findByLoaiDaiLy = async(id) => {
    try {
        return await models.DaiLy.findAll({
            where: {
                Type: id
            }
        })
    } catch (err) {
        console.log(err);
    }
}

const findByName = async(Name) => {
    try {
        const daiLy = await models.DaiLy.findAll({
            where: {
                Name: Name
            }
        })
        return daiLy[0]
    } catch (err) {
        console.log(err);
    }
}

const updateDaiLy = async(daiLy) => {
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
                ID: daiLy.ID
            }
        })

    } catch (err) {
        console.log(err);
    }
}
const updateDebt = async(daiLy, money) => {
    try {

        await models.DaiLy.update({
            Debts: daiLy.Debts + money,
        }, {
            where: {
                ID: daiLy.ID
            }
        })
        return true;
    } catch (err) {
        console.log(err);
        return false;
    }
    return false;
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
module.exports = { listDaiLy, addDaiLy, findById, updateDaiLy, deleteDaiLy, updateDebt, findByName, findByLoaiDaiLy };