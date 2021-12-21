const DaiLy = require("../model/init.model").DaiLy;
const LoaiDaiLy = require("../model/init.model").LoaiDaiLy;
const CT_PhieuXuat = require("../model/init.model").CT_PhieuXuat;
const PhieuXuat = require("../model/init.model").PhieuXuat;
const PhieuThu = require("../model/init.model").PhieuThu;

//Bat nhap loai dai ly, phai nam trong ds load dai ly co roi thi moi cho them
const createDaiLy = async(req, res) => {
    try {
        const ldl = req.body.LoaiDaiLy;
        const loaiDaiLy = await LoaiDaiLy.findOne({
            where: { Name: ldl },
        });
        if (loaiDaiLy) {
            const name = req.body.Name;
            const daiLy = await DaiLy.findOne({
                where: { Name: name },
            });
            if (daiLy) {
                res.render('DaiLy/DaiLy', { err: 'Dai Ly Da Co Roi' });
            } else {
                const DL = {
                    Type: loaiDaiLy.dataValues.ID,
                    Name: req.body.Name,
                    Phone: req.body.Phone,
                    District: req.body.District,
                    Address: req.body.Address,
                    Day: req.body.Day,
                    Debts: 0,
                    Email: req.body.Email,
                };
                const result = await DaiLy.create(DL);
                return res.status(200).json({
                    result
                });
            }
        } else {
            res.render('DaiLy/DaiLy', { err: 'Loai Dai Ly Chua Co' });
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

//get bth
const getAllDaiLy = async(req, res) => {
    try {
        const result = await DaiLy.findAndCountAll();
        return res.status(200).json({ result });
    } catch (error) {
        return res.status(500).send(error.message);
    }
};
//get bth thoi
// them get bang ten
// bang quan
const getDaiLyById = async(req, res) => {
    try {
        const id = req.params.id;
        const result = await DaiLy.findOne({
            where: { ID: id },
        });
        if (result) {
            return res.status(200).json({ result });
        }
        return res.status(404).send("Dai Ly with the specified ID does not exists");
    } catch (error) {
        return res.status(500).send(error.message);
    }
};
// neu update loai dai ly--> check xem loai do cho chua
// update quan--> Nen cho ds quan luon--> Neu vuot qua gioi han --> ko cho them 
// ko cho update no
const updateDaiLy = async(req, res) => {

    try {
        const ldl = req.body.LoaiDaiLy;
        const loaiDaiLy = await LoaiDaiLy.findOne({
            where: { Name: ldl },
        });
        if (loaiDaiLy) {
            const name = req.body.Name;
            const daiLy = await DaiLy.findOne({
                where: { Name: name },
            });
            if (!daiLy) {
                res.render('DaiLy/DaiLy', { err: 'Chua Co Dai Ly Nay' });
            } else {
                if (daiLy.dataValues.Debts < loaiDaiLy.dataValues.MaxDebts) {
                    const DL = {
                        Type: loaiDaiLy.dataValues.ID,
                        Phone: req.body.Phone,
                        District: req.body.District,
                        Address: req.body.Address,
                        Day: req.body.Day,
                        Email: req.body.Email,
                    };
                    const [updated] = await DaiLy.update(DL, {
                        where: { Name: name }
                    });
                    if (updated) {
                        const updatedDaiLy = await DaiLy.findOne({ where: { Name: name } });
                        return res.status(200).json(updatedDaiLy);
                    }
                } else {
                    res.render('DaiLy/DaiLy', { err: 'No Cua Dai Ly Hien Tai Dang Vuot Qua No Toi Da Cua Loai Dai Ly Moi' });
                }
            }
        } else {
            res.render('DaiLy/DaiLy', { err: 'Loai Dai Ly Chua Co' });
        }
        throw new Error("Dai Ly not found");
    } catch (error) {
        return res.status(500).send(error.message);
    }
};
//Kiem tra cac phieu thu phieu xuat--> neu con no thi yeu cau thanh toan moi cho xoa
const deleteDaiLy = async(req, res) => {
    try {

        const name = req.body.Name;
        const daiLy = await DaiLy.findOne({
            where: { Name: name },
        });
        if (daiLy && daiLy.dataValues.Debts == 0) {
            const phieuXuat = await PhieuXuat.findAll({
                where: { DaiLy_ID: daiLy.dataValues.DaiLy_ID },
                raw: true
            });
            for (i in phieuXuat)
                var deletedCT_PhieuXuat = await CT_PhieuXuat.destroy({ where: { PhieuXuat_ID: phieuXuat[i].dataValues.ID } });
            if (deletedCT_PhieuXuat) {
                const deletedPhieuXuat = await PhieuXuat.delete({ where: { DaiLy_ID: daiLy.dataValues.DaiLy_ID } })
                const deletedPhieuThu = await PhieuThu.delete({ where: { DaiLy_ID: daiLy.dataValues.DaiLy_ID } })
                if (deletedPhieuThu && deletedPhieuXuat) {
                    const deleted = await DaiLy.destroy({ where: { Name: name } });

                    if (deleted) {
                        return res.status(204).send("Deleted");
                    }
                }
            }

        } else {
            res.render('DaiLy/DaiLy', { err: 'Vui Long Xu Ly Tien No Truoc Khi Xoa' });
        }
        throw new Error("Dai Ly not found");
    } catch (error) {
        return res.status(500).send(error.message);
    }
};
const summarizePhieuXuat = async(req, res) => {

    try {
        const month = req.body.Month;

        const result = await PhieuXuat.findAll({
            attributes: [

                'DaiLy_ID', [sequelize.fn('sum', sequelize.col('Total_Money')), 'Total_Money'],
                [sequelize.fn('COUNT', 'ID'), 'count']
            ],
            where: {
                $: [
                    sequelize.where(sequelize.fn('month', sequelize.col("Date")), month)
                ],
            },
            group: ['DaiLy_ID'],
        });
        return res.status(200).json({ result });
    } catch (error) {
        return res.status(500).send(error.message);
    }


}
module.exports = {
    createDaiLy,
    getAllDaiLy,
    getDaiLyById,
    updateDaiLy,
    deleteDaiLy,
    summarizePhieuXuat,

};