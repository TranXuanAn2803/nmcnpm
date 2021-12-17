const PhieuXuat = require("../model/init.model").PhieuXuat;
const DaiLy = require("../model/init.model").DaiLy;
//Kiem tra xem dai ly co chua--> co roi thi moi cho them
//Ngay cho bat dau la tu hom nay ko cho chon lau hon
const createPhieuXuat = async(req, res) => {
    try {
        const dl = req.body.DaiLy;
        const daiLy = await DaiLy.findOne({
            where: { Name: dl },
        });
        if (daiLy) {
            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = today.getFullYear();

            today = mm + '/' + dd + '/' + yyyy;

            const PT = {
                DaiLy_ID: daiLy.dataValues.ID,
                Date: today,
                Total_Money: 0,
            }
            const result = await PhieuXuat.create(PT);
            return res.status(200).json({
                result
            });
        } else {
            res.render('PhieuXuat/PhieuXuat', { err: 'Dai Ly Chua Co' });

        }

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
//Lay thong tin bth nhung ko can hien chi tiet bam vo thi hien chi tiet sau
const getAllPhieuXuat = async(req, res) => {
    try {
        const result = await PhieuXuat.findAndCountAll();
        return res.status(200).json({ result });
    } catch (error) {
        return res.status(500).send(error.message);
    }
};
//--> lam bth nhung hien luon ct phieu xuat
const getPhieuXuatById = async(req, res) => {
    try {
        const id = req.params.id;
        const result = await PhieuXuat.findOne({
            where: { ID: id },
        });
        if (result) {
            return res.status(200).json({ result });
        }
        return res.status(404).send("Phieu Xuat with the specified ID does not exists");
    } catch (error) {
        return res.status(500).send(error.message);
    }
};
//-->ko cho update tong tien, ko cho update dai ly
const updatePhieuXuat = async(req, res) => {
    try {
        const px = req.body.PhieuXuat;
        const PX = {
            Date: req.body.Date,
        }

        const [updated] = await PhieuXuat.update(PX, {
            where: { ID: px }
        });
        if (updated) {
            const updatedPhieuXuat = await PhieuXuat.findOne({ where: { ID: px } });
            return res.status(200).json(updatedPhieuXuat);
        }
        throw new Error("Phieu Xuat not found");
    } catch (error) {
        return res.status(500).send(error.message);
    }
};
//Xoa thi xoa luon ct phieu xuat va update lai no
const deletePhieuXuat = async(req, res) => {
    try {
        const id = req.body.id;
        const deleteCT_PhieuXuat = await CT_P.destroy({
            where: { PhieuXuat_ID: id }
        });
        if (deleteCT_PhieuXuat) {
            const deleted = await PhieuXuat.destroy({
                where: { ID: id }
            });
            if (deleted) {
                return res.status(204).send("Deleted");
            }
            return res.status(204).send("Deleted");
        } else {
            res.render('PhieuXuat/PhieuXuat', { err: 'Van Con Chi Tieu Phieu Xuat' });
        }

    } catch (error) {
        return res.status(500).send(error.message);
    }
};

module.exports = {
    createPhieuXuat,
    getAllPhieuXuat,
    getPhieuXuatById,
    updatePhieuXuat,
    deletePhieuXuat
};