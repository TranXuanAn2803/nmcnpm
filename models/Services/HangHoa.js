const { models } = require("..");
const { QueryTypes } = require("sequelize");
const sq = require("../../models/index");
const async = require("hbs/lib/async");
async function test() {
    const t = await models.Daily.findAll({ raw: true });
    console.log(t);
    return t;
}
const listHangHoa = () => {
    return models.HangHoa.findAll({ raw: true });
};
const findById = async(id) => {
    try {
        return await models.HangHoa.findAll({
            where: {
                ID: id
            }
        })
    } catch (err) {
        console.log(err);
    }
}
const addHangHoa = async(hangHoa) => {
    try {
        await models.HangHoa.create({
            Name: hangHoa.Name,
            Unit: hangHoa.Unit,
            Price: hangHoa.Price

        });
    } catch (err) {
        console.log(err);
    }
};

const updateHangHoa = async(hangHoa) => {
    try {
        await models.HangHoa.update({
            Name: hangHoa.Name,
            Unit: hangHoa.Unit,
            Price: hangHoa.Price

        }, {
            where: {
                ID: hangHoa.ID,

            }
        })

    } catch (err) {
        console.log(err);
    }
}
const deleteHangHoa = async(id) => {
    try {
        await models.HangHoa.destroy({
            where: {
                ID: id
            }
        })
    } catch (err) {
        console.log(err);
    }
}


/*
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
const findByName = async(user_name) => {
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
                ID: DaiLy.ID
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

*/
module.exports = { listHangHoa, findById, addHangHoa, updateHangHoa, deleteHangHoa };