const CT_PhieuXuat = require("../model/init.model").CT_PhieuXuat;
const PhieuXuat = require("../model/init.model").PhieuXuat;
const DaiLy = require("../model/init.model").DaiLy;
const HangHoa = require("../model/init.model").HangHoa;
const LoaiDaiLy = require("../model/init.model").LoaiDaiLy;

//Them thi ktra xem co dai ly chua, update lai no
//Neu vuot qua no ko cho them
//Update tong tien
const createCT_PhieuXuat = async(req, res) => {
    try {
        const px = req.body.PhieuXuat;
        console.log(px)
        const phieuXuat = await PhieuXuat.findOne({
            where: { ID: px },
        });
        if (req.body.Number < 0) {
            res.render('CT_PhieuXuat/CT_PhieuXuat', { err: 'So Luong Mua Am' });
        }
        if (phieuXuat) {
            const hangHoa = await HangHoa.findOne({
                where: { Name: req.body.HangHoa },
            });
            if (hangHoa) {
                const daiLy = await DaiLy.findOne({
                    where: { ID: phieuXuat.dataValues.DaiLy_ID },
                });
                const loaiDaiLy = await LoaiDaiLy.findOne({
                    where: { ID: daiLy.dataValues.Type },
                });
                if (hangHoa.dataValues.Price * req.body.Number + daiLy.dataValues.Debts <= loaiDaiLy.dataValues.Max_debt) {
                    const newDebt = {
                        Debts: daiLy.dataValues.Debts + hangHoa.dataValues.Price * req.body.Number,
                    };
                    const [updateDebt] = await DaiLy.update(newDebt, {
                        where: { ID: daiLy.dataValues.ID }
                    });
                    const newTotal = {
                        Total_Money: hangHoa.dataValues.Price * req.body.Number,
                    };
                    const [updateTotal] = await PhieuXuat.update(newTotal, {
                        where: { ID: phieuXuat.dataValues.ID }
                    });

                    if (updateDebt && updateTotal) {
                        const CT_PX = {
                            PhieuXuat_ID: phieuXuat.dataValues.ID,
                            HangHoa_ID: hangHoa.dataValues.ID,
                            Number: req.body.Number
                        };
                        const result = await CT_PhieuXuat.create(CT_PX);
                        return res.status(200).json({
                            result
                        });
                    }
                } else {
                    res.render('CT_PhieuXuat/CT_PhieuXuat', { err: 'So Tien No Vuot Qua Quy Dinh' });

                }
            } else {
                res.render('CT_PhieuXuat/CT_PhieuXuat', { err: 'Hang Hoa Chua Co' });
            }
        } else {
            res.render('CT_PhieuXuat/CT_PhieuXuat', { err: 'Phieu Xuat Chua Co' });
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
        const id = req.params.id;
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
        const px = req.body.PhieuXuat;
        console.log(px)
        const phieuXuat = await PhieuXuat.findOne({
            where: { ID: px },
        });
        if (req.body.Number < 0) {
            res.render('CT_PhieuXuat/CT_PhieuXuat', { err: 'So Luong Mua Am' });
        }
        if (phieuXuat) {
            const hangHoa = await HangHoa.findOne({
                where: { Name: req.body.HangHoa },
            });
            if (hangHoa) {
                const daiLy = await DaiLy.findOne({
                    where: { ID: phieuXuat.dataValues.DaiLy_ID },
                });
                const loaiDaiLy = await LoaiDaiLy.findOne({
                    where: { ID: daiLy.dataValues.Type },
                });
                if (hangHoa.dataValues.Price * req.body.Number + daiLy.dataValues.Debts <= loaiDaiLy.dataValues.Max_debt) {
                    const newDebt = {
                        Debts: daiLy.dataValues.Debts + hangHoa.dataValues.Price * req.body.Number,
                    };
                    const [updateDebt] = await LoaiDaiLy.update(newDebt, {
                        where: { ID: daiLy.dataValues.ID }
                    });
                    const newTotal = {
                        Total_Money: phieuXuat.dataValues.ID + hangHoa.dataValues.Price * req.body.Number,
                    };
                    const [updateTotal] = await PhieuXuat.update(newTotal, {
                        where: { ID: phieuXuat.dataValues.ID }
                    });

                    if (updateDebt && updateTotal) {
                        const id = phieuXuat.dataValues.ID;
                        const stt = req.body.stt;
                        const CT_PX = {
                            HangHoa_ID: req.body.HangHoa,
                            Number: req.body.Number
                        };
                        const [updated] = await CT_PhieuXuat.update(CT_PX, {
                            where: {
                                PhieuXuat_ID: id,
                                STT: stt,
                            }
                        });
                        if (updated) {
                            const updatedCT_PhieuXuat = await CT_PhieuXuat.findOne({ where: { PhieuXuat_ID: id, STT: stt, } });
                            return res.status(200).json(updatedCT_PhieuXuat);
                        }
                    }
                } else {
                    res.render('CT_PhieuXuat/CT_PhieuXuat', { err: 'So Tien No Vuot Qua Quy Dinh' });

                }
            } else {
                res.render('CT_PhieuXuat/CT_PhieuXuat', { err: 'Hang Hoa Chua Co' });
            }
        } else {
            res.render('CT_PhieuXuat/CT_PhieuXuat', { err: 'Phieu Xuat Chua Co' });
        }


    } catch (error) {
        return res.status(500).send(error.message);
    }
};
//Xoa thi update tong tien va check no
const deleteCT_PhieuXuat = async(req, res) => {
    try {
        const ctpx = await CT_PhieuXuat.findOne({
            where: { ID: id },
        });

        if (ctpx) {
            const phieuXuat = await PhieuXuat.findOne({
                where: { ID: ctpx.dataValues.PhieuXuat_ID },
            });
            if (phieuXuat) {
                const hangHoa = await HangHoa.findOne({
                    where: { ID: ctpx.dataValues.HangHoa_ID },
                });
                const daiLy = await DaiLy.findOne({
                    where: { ID: phieuXuat.dataValues.DaiLy_ID },
                });
                if (phieuXuat.dataValues.ID - hangHoa.dataValues.Price * ctpx.dataValues.Number >= 0) {
                    const newDebt = {
                        Debts: daiLy.dataValues.Debts - hangHoa.dataValues.Price * ctpx.dataValues.Number,
                    };
                    const [updateDebt] = await DaiLy.update(newDebt, {
                        where: { ID: daiLy.dataValues.ID }
                    });
                    const newTotal = {
                        Total_Money: phieuXuat.dataValues.ID - hangHoa.dataValues.Price * ctpx.dataValues.Number,
                    };
                    const [updateTotal] = await PhieuXuat.update(newTotal, {
                        where: { ID: phieuXuat.dataValues.ID }
                    });

                    if (updateDebt && updateTotal) {
                        const deleted = await CT_PhieuXuat.destroy({
                            where: { PhieuXuat_ID: id }
                        });
                        if (deleted) {
                            return res.status(204).send("Deleted");
                        } else {
                            res.render('CT_PhieuXuat/CT_PhieuXuat', { err: 'Khong Ton Tai' });

                        }
                    }
                }
            } else {
                res.render('CT_PhieuXuat/CT_PhieuXuat', { err: 'Khong Ton Tai' });

            }
        } else {
            res.render('CT_PhieuXuat/CT_PhieuXuat', { err: 'Khong Ton Tai' });
        }
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