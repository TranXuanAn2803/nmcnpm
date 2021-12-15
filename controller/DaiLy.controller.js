const DaiLy = require("../model/init.model").DaiLy;
const LoaiDaiLy = require("../model/init.model").LoaiDaiLy;
//Bat nhap loai dai ly, phai nam trong ds load dai ly co roi thi moi cho them
const createDaiLy = async (req, res) => {
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
            return res.status(200).json({ loaiDaiLy });
        }
      const DL = {
            Name: req.body.Name,
            Phone: req.body.Phone,
            District: req.body.District,
            Address: req.body.Address,
            Day: null,
            Debts: 0,
            Email: req.body.Email,
        };
      const result = await DaiLy.create(DL);
      return res.status(200).json({
        result
    });

    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

//get bth
const getAllDaiLy = async (req, res) => {
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
const getDaiLyById = async (req, res) => {
  try {
    const  id = req.params.id;
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
const updateDaiLy = async (req, res) => {
  try {
    const name = req.body.Name;
    const DL = {
      Name: req.body.Name,
      Phone: req.body.Phone,
      District: req.body.District,
      Address: req.body.Address,
      Day: null,
      Email: req.body.Email,
  };
    const [updated] = await DaiLy.update(DL, {
      where: { Name: name }
    });
    if (updated) {
      const updatedDaiLy = await DaiLy.findOne({ where: { Name:name } });
      return res.status(200).json(updatedDaiLy);
    }
    throw new Error("Dai Ly not found");
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
//Kiem tra cac phieu thu phieu xuat--> neu con no thi yeu cau thanh toan moi cho xoa
const deleteDaiLy = async (req, res) => {
  try {
    const name = req.body.Name;
    const deleted = await DaiLy.destroy({
      where: { ID: id }
    });
    if (deleted) {
      return res.status(204).send("Deleted");
    }
    throw new Error("Dai Ly not found");
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = {
  createDaiLy,
  getAllDaiLy,
  getDaiLyById,
  updateDaiLy,
  deleteDaiLy
};