const PhieuXuat = require("../model/init.model").PhieuXuat;
const DaiLy = require("../model/init.model").DaiLy;
//Kiem tra xem dai ly co chua--> co roi thi moi cho them
//Ngay cho bat dau la tu hom nay ko cho chon lau hon
const createPhieuXuat = async (req, res) => {
  try {
      const dl = req.body.DaiLy;
      const DaiLy = await DaiLy.findOne({
          where: { ID: dl },
      });
      if (DaiLy) {

        const PX = {
          DaiLy_ID: req.body.DaiLy,
          Date: null,
          Total_Money: 0,
        }
        const result = await PhieuXuat.create(PT);
        return res.status(200).json({
          result
        };

    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
//Lay thong tin bth nhung ko can hien chi tiet bam vo thi hien chi tiet sau
const getAllPhieuXuat = async (req, res) => {
  try {
    const result = await PhieuXuat.findAndCountAll();
    return res.status(200).json({ result });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
//--> lam bth nhung hien luon ct phieu xuat
const getPhieuXuatById = async (req, res) => {
  try {
    const  id  = req.params.id;
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
const updatePhieuXuat = async (req, res) => {
  try {
    const  id  = req.body.id;
    const PX = {
      Date: null,
    }

    const [updated] = await PhieuXuat.update(PX, {
      where: { ID: id }
    });
    if (updated) {
      const updatedPhieuXuat = await PhieuXuat.findOne({ where: { ID:id } });
      return res.status(200).json(updatedPhieuXuat);
    }
    throw new Error("Phieu Xuat not found");
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
//Xoa thi xoa luon ct phieu xuat va update lai no
const deletePhieuXuat = async (req, res) => {
  try {
    const  id  = req.body.id;
    const deleted = await PhieuXuat.destroy({
      where: { ID: id }
    });
    if (deleted) {
      return res.status(204).send("Deleted");
    }
    throw new Error("Phieu Xuat not found");
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