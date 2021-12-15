const HangHoa = require("../model/init.model").HangHoa;
// them bth kiem tra don vi
const createHangHoa = async (req, res) => {
  try {
    const name = req.body.Name;
    const hangHoa = await HangHoa.findOne({
        where: { Name: name },
    });
    if (hangHoa) {
        return res.status(200).json({ hangHoa });
    }
    const HH = {
      Name: req.body.Name,
      Unit: req.body.Unit,
      Price: req.body.Price
  };
    const result = await HangHoa.create(HH);
    return res.status(200).json({
      result
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
//lam bth
const getAllHangHoa = async (req, res) => {
  try {
    const result = await HangHoa.findAndCountAll();
    return res.status(200).json({ result });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
//lam bth+ nen them tim bang ten bang ...

const getHangHoaById = async (req, res) => {
  try {
    const id  = req.params.id;
    const result = await HangHoa.findOne({
      where: { ID: id },
      });
    if (result) {
      return res.status(200).json({ result });
    }
    return res.status(404).send("Hang Hoa with the specified ID does not exists");
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
// update ten: ko cho 
// update gia: lam bth
// update don vi: lam bth

const updateHangHoa = async (req, res) => {
  try {
    const name = req.body.Name;
    const HH = {
      Name: req.body.Name,
      Unit: req.body.Unit,
      Price: req.body.Price
  };

    const [updated] = await HangHoa.update(HH, {
      where: { Name: name }
    });
    if (updated) {
      const updatedHangHoa = await HangHoa.findOne({ where: { Name:name } });
      return res.status(200).json(updatedHangHoa);
    }
    throw new Error("Hang Hoa not found");
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
//Ktra xem co ct don hang nao co hang nay ko
// Neu co thi ko cho xoa
const deleteHangHoa = async (req, res) => {
  try {
    const name = req.body.Name;
    console.log(name)
    const deleted = await HangHoa.destroy({
      where: { Name: name }
    });
    if (deleted) {
      return res.status(204).send("Deleted");
    }
    throw new Error("Hang Hoa not found");
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = {
  createHangHoa,
  getAllHangHoa,
  getHangHoaById,
  updateHangHoa,
  deleteHangHoa
};