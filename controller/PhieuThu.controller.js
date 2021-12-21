const PhieuThu = require("../model/init.model").PhieuThu;
const DaiLy = require("../model/init.model").DaiLy;

//Neu them thi update so tien no cua dai ly--> ko cho thu qua so no
//Chi cho them neu co dai ly roi
const createPhieuThu = async(req, res) => {
    try {
        const dl = req.body.DaiLy;
        const daiLy = await DaiLy.findOne({
            where: { Name: dl },
        });
        if (daiLy) {
            if (req.body.TotalMoney > 0) {
                const PT = {
                    DaiLy_ID: daiLy.dataValues.ID,
                    Phone: req.body.Phone,
                    Date: null,
                    Address: req.body.Address,
                    Email: req.body.Email,
                    Total_Money: req.body.TotalMoney,
                }
                const newDebt = {
                    Debts: daiLy.dataValues.Debts - req.body.TotalMoney,
                };
                const [updated] = await DaiLy.update(newDebt, {
                    where: { ID: daiLy.dataValues.ID }
                });
                if (updated) {
                    const result = await PhieuThu.create(PT);
                    return res.status(200).json({
                        result
                    });
                }
            } else {
                res.render('PhieuThu/PhieuThu', { err: 'Tong Tien Nhap Vao Khong Hop Le' });
            }
        } else {
            res.render('PhieuThu/PhieuThu', { err: 'Dai Ly Chua Co' });

        }


    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
//Lam bth
const getAllPhieuThu = async(req, res) => {
    try {
        const result = await PhieuThu.findAndCountAll();
        return res.status(200).json({ result });
    } catch (error) {
        return res.status(500).send(error.message);
    }
};
//Lay bth
const getPhieuThuById = async(req, res) => {
    try {
        const id = req.params.id;
        const result = await PhieuThu.findOne({
            where: { ID: id },
        });
        if (result) {
            return res.status(200).json({ result });
        }
        return res.status(404).send("Phieu Thu with the specified ID does not exists");
    } catch (error) {
        return res.status(500).send(error.message);
    }
};
//--> update tien--> check lai đk tien update lai tien no
//--> update daily-->ko cho
const updatePhieuThu = async(req, res) => {
    try {
        const dl = req.body.DaiLy;
        const daiLy = await DaiLy.findOne({
            where: { Name: dl },
        });
        if (daiLy) {
            if (req.body.TotalMoney > 0) {
                const newDebt = {
                    Debts: daiLy.dataValues.Debts - req.body.TotalMoney,
                };
                const [updatedDebt] = await DaiLy.update(newDebt, {
                    where: { ID: daiLy.dataValues.ID }
                });
                if (updatedDebt) {
                    const result = await PhieuThu.create(PT);
                    return res.status(200).json({
                        result
                    });
                }
                const pt = req.body.PhieuThu
                const PT = {
                    Phone: req.body.Phone,
                    Date: req.body.Date,
                    Address: req.body.Address,
                    Email: req.body.Email,
                    Total_Money: req.body.TotalMoney,
                }
                const [updated] = await PhieuThu.update(PT, {
                    where: { ID: pt }
                });
                if (updated) {
                    const updatedPhieuThu = await PhieuThu.findOne({ where: { ID: pt } });
                    return res.status(200).json(updatedPhieuThu);
                } else {
                    res.render('PhieuThu/PhieuThu', { err: 'Phieu Thu Khong Hop Le' });
                }

            } else {
                res.render('PhieuThu/PhieuThu', { err: 'Tong Tien Nhap Vao Khong Hop Le' });
            }
        } else {
            res.render('PhieuThu/PhieuThu', { err: 'Dai Ly Chua Co' });

        }
    } catch (error) {
        return res.status(500).send(error.message);
    }
};
//-->Ko cho
const deletePhieuThu = async(req, res) => {
    try {
        const id = req.body.id;
        const deleted = await PhieuThu.destroy({
            where: { ID: id }
        });
        if (deleted) {
            return res.status(204).send("Deleted");
        }
        throw new Error("Phieu Thu not found");
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

module.exports = {
    createPhieuThu,
    getAllPhieuThu,
    getPhieuThuById,
    updatePhieuThu,
    deletePhieuThu,
    find
};