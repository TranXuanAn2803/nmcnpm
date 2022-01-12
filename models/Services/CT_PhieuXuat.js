const { models } = require("..");
const { QueryTypes } = require("sequelize");
const sq = require("../index");
const async = require("hbs/lib/async");
async function test() {
    const t = await models.CT_PhieuXuat.findAll({ raw: true });
    console.log(t);
    return t;
}
const listCT_PhieuXuat = () => {
    return models.CT_PhieuXuat.findAll({ raw: true });
};
const findByPhieuXuat_ID = async(phieuXuat_ID) => {
    try {
        const result = await models.CT_PhieuXuat.findAll({
            where: {
                PhieuXuat_ID: phieuXuat_ID
            }
        })
        return result
    } catch (err) {
        console.log(err);
    }
}
const addCT_PhieuXuat = async(ct_PhieuXuat) => {
    try {
        await models.CT_PhieuXuat.create({

            PhieuXuat_ID: ct_PhieuXuat.PhieuXuat_ID,
            HangHoa_ID: ct_PhieuXuat.HangHoa_ID,
            Number: ct_PhieuXuat.Number,

        });
    } catch (err) {
        console.log(err);
    }
};
const findBySTT = async(id, STT) => {
    try {
        const result = await models.CT_PhieuXuat.findAll({
            where: {
                STT: STT,
                PhieuXuat_ID: id,

            }
        })
        return result
    } catch (err) {
        console.log(err);
    }
}
const findByHangHoa = async(id) => {
    try {
        const result = await models.CT_PhieuXuat.findAll({
            where: {
                HangHoa_ID: id
            }
        })
        return result
    } catch (err) {
        console.log(err);
    }

}
const updateCT_PhieuXuat = async(ct_PhieuXuat) => {
    try {
        await models.CT_PhieuXuat.update({
            HangHoa_ID: ct_PhieuXuat.HangHoa_ID,
            Number: ct_PhieuXuat.Number,

        }, {
            where: {
                STT: ct_PhieuXuat.STT,
                PhieuXuat_ID: ct_PhieuXuat.PhieuXuat_ID,

            }
        })

    } catch (err) {
        console.log(err);
    }
}
const deleteByPhieuXuat = async(id) => {
    try {
        await models.CT_PhieuXuat.destroy({
            where: {
                PhieuXuat_ID: id
            }
        })
        return true;
    } catch (err) {
        console.log(err);
        return false;
    }
}

const deleteCT_PhieuXuat = async(STT, id) => {
    try {
        await models.CT_PhieuXuat.destroy({
            where: {
                STT: STT,
                PhieuXuat_ID: id,
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

module.exports = { listCT_PhieuXuat, findByPhieuXuat_ID, addCT_PhieuXuat, findBySTT, updateCT_PhieuXuat, deleteCT_PhieuXuat, deleteByPhieuXuat, findByHangHoa };