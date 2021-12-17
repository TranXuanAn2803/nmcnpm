const models = require("../model/init.model").LoaiDaiLy;
const DaiLy = require("../model/init.model").DaiLy;
// Tao bth 
const createLoaiDaiLy = async(req, res) => {
    try {
        const name = req.body.Name;
        const loaiDaiLy = await models.findOne({
            where: { Name: name },
        });
        if (loaiDaiLy) {
            res.render('LoaiDaiLy/LoaiDaiLy', { err: 'Loai Dai Ly Da Co Roi' });

        } else {
            const LDL = {
                Name: req.body.Name,
                Max_debt: req.body.MaxDebt,
            };
            const result = await models.create(LDL);
            return res.status(200).json({
                result
            });
        }
    } catch (error) {
        return res.status(500).send(error.message);

    }
};
//Lam Bth
const getAllLoaiDaiLy = async(req, res) => {
    try {
        const result = await models.findAndCountAll();
        return res.status(200).json({ result });
    } catch (error) {
        return res.status(500).send(error.message);
    }
};
//Lam bth
//Nen kiem theo so tien no nua nha
const getLoaiDaiLyById = async(req, res) => {
    try {
        const id = req.params.id;
        const result = await models.findOne({
            where: { ID: id },
        });
        if (result) {
            return res.status(200).json({ result });
        }
        return res.status(404).send("Loai Dai Ly with the specified ID does not exists");
    } catch (error) {
        return res.status(500).send(error.message);
    }
};
//Kiem tra xem so no update nay co lon hon no thuc cua he cac cua hang ko
//Neu co cua hang no nhieu hon--> yeu cau bat noi do thanh toan truoc khi thay doi
const updateLoaiDaiLy = async(req, res) => {
    try {
        const loaiDaiLy = await models.findOne({
            where: { Name: name },
        });

        const daiLy = await DaiLy.findOne({
            where: {
                Type: loaiDaiLy.dataValues.ID,
                Debts: {
                    gt: loaiDaiLy.dataValues.MaxDebt
                },
            },
        });
        if (daiLy) {

            const name = req.body.Name;
            const LDL = {
                Max_debt: req.body.MaxDebt,
            };

            console.log(LDL);
            const [updated] = await models.update(LDL, {
                where: { Name: name }
            });
            if (updated) {
                const updatedLoaiDaiLy = await models.findOne({ where: { Name: name } });
                return res.status(200).json(updatedLoaiDaiLy);
            } else {
                res.render('LoaiDaiLy/LoaiDaiLy', { err: 'Loai Dai Ly Chua Co' });
            }
        } else {
            res.render('LoaiDaiLy/LoaiDaiLy', { err: 'So No Lon Nhat Hien Dang Khong Phu Hop' });
        }
    } catch (error) {
        return res.status(500).send(error.message);
    }
};
//Neu co dai ly loai nay thi ko cho xoa 
const deleteLoaiDaiLy = async(req, res) => {
    try {
        const loaiDaiLy = await models.findOne({
            where: { Name: name },
        });
        const daiLy = await DaiLy.findOne({
            where: {
                Type: loaiDaiLy.dataValues.ID,
            },
        });
        if (daiLy) {
            const name = req.body.Name;
            const deleted = await models.destroy({
                where: { Name: name }
            });
            if (deleted) {
                return res.status(204).send("Deleted");
            }
        } else {
            res.render('LoaiDaiLy/LoaiDaiLy', { err: 'Co Dai Ly Loai Nay Nen Khong The Xoa' });
        }
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

module.exports = {
    createLoaiDaiLy,
    getAllLoaiDaiLy,
    getLoaiDaiLyById,
    updateLoaiDaiLy,
    deleteLoaiDaiLy
};