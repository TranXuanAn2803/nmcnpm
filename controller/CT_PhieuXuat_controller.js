const CT_PhieuXuat = require("../model/init.model").CT_PhieuXuat;
const PhieuXuat = require("../model/init.model").PhieuXuat;

//Them thi ktra xem co dai ly chua, update lai no
//Neu vuot qua no ko cho them
//Update tong tien
const createCT_PhieuXuat = async(req, res) => {
    try {
        const px = req.body.PhieuXuat;
        const PhieuXuat = await PhieuXuat.findOne({
            where: { ID: px },
        });
        if (PhieuXuat) {
            const ctpx = await CT_PhieuXuat.findOne({
                where: { PhieuXuat_ID: px },
            });
            if (ctpx) {
                return res.status(200).json( ctpx );
            }    
            const CT_PX = {
                PhieuXuat_ID: req.body.PhieuXuat,
                HangHoa_ID: req.body.HangHoa,
                Number: req.body.Number
            };

            const result = await CT_PhieuXuat.create(CT_PX);
            return res.status(200).json({
                result
            });
        }
        else
        {
            throw new Error("Phieu Xuat not found");
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
//Lam bth
const getAllCT_PhieuXuat = async(req, res) => {
    try {
        const result = await CT_PhieuXuat.findAndCountAll();
        return res.status(200).json({ result });
    } catch (error) {
        return res.status(500).send(error.message);
    }
};
//Lam bth nhung bang stt a id
const getCT_PhieuXuatById = async(req, res) => {
    try {
        const  id  = req.params.id;
        const result = await CT_PhieuXuat.findOne({
            where: { PhieuXuat_ID: id },
        });
        if (result) {
            return res.status(200).json({ result });
        }
        return res.status(404).send("Chi Tiet Phieu Xuat with the specified ID does not exists");
    } catch (error) {
        return res.status(500).send(error.message);
    }
};
//Cho update so luong nhung phai chech lai no--> vuot qua no ko cho them--> update tong tien
const updateCT_PhieuXuat = async(req, res) => {
    try {
        const  id  = req.body.id;
        const  stt  = req.body.stt;
        const CT_PX = {
                HangHoa_ID: req.body.HangHoa,
                Number: req.body.Number
        };
        const [updated] = await CT_PhieuXuat.update(CT_PX, {
            where:  {   PhieuXuat_ID: id,
                        STT: stt,
                    }
        });
        if (updated) {
            const updatedCT_PhieuXuat = await CT_PhieuXuat.findOne({ where:  {   PhieuXuat_ID: id,STT: stt,} });
            return res.status(200).json(updatedCT_PhieuXuat);
        }
        throw new Error("Chi Tiet Phieu Xuat not found");
    } catch (error) {
        return res.status(500).send(error.message);
    }
};
//Xoa thi update tong tien va check no
const deleteCT_PhieuXuat = async(req, res) => {
    try {
        const  id  = req.body.id;
        const deleted = await CT_PhieuXuat.destroy({
            where: { PhieuXuat_ID: id }
        });
        if (deleted) {
            return res.status(204).send("Deleted");
        }
        throw new Error("Chi Tiet Phieu Xuat not found");
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

module.exports = {
    createCT_PhieuXuat,
    getAllCT_PhieuXuat,
    getCT_PhieuXuatById,
    updateCT_PhieuXuat,
    deleteCT_PhieuXuat
};