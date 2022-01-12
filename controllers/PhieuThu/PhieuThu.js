const service = require("../../models/Services/PhieuThu");
const DaiLy = require("../../models/Services/DaiLy");
const LoaiDaiLy = require("../../models/Services/LoaiDaiLy");

const list = async(req, res) => {
    var result = await service.listPhieuThu();
    res.render("PhieuThu/list", {
        title: "Phiếu Thu",
        tag: "Danh Sách",
        phieuThu: result,
    });

};
const addPhieuThu = async(req, res) => {
    const daiLy = await DaiLy.listDaiLy();
    res.render("PhieuThu/add", {
        title: "Phiếu Thu",
        tag: "Thêm Phiếu Thu",
        daiLy: daiLy,
    });
};
const add = async(req, res) => {
    const phieuThu = req.body;
    var daiLy = await DaiLy.findById(phieuThu.DaiLy_ID)
    var date = phieuThu.Date;
    var mm = date.split("/")[0];
    var dd = date.split("/")[1];
    var yyyy = date.split("/")[2];
    phieuThu.Date = yyyy + '-' + mm + '-' + dd

    var debts = -parseFloat(phieuThu.Total_Money);
    daiLy = daiLy[0];
    const updateDebt = await DaiLy.updateDebt(daiLy, debts)
    if (updateDebt) {
        service.addPhieuThu(phieuThu).then(res.redirect("/PhieuThu"))
    } else {
        res.redirect("/PhieuThu/add")
    }
};
const detailPhieuThu = async(req, res) => {
    const id = req.params.ID;
    const result = await service.findById(id);

    res.render("PhieuThu/detail", {
        title: "Phiếu Thu",
        tag: "Thông Tin Chi Tiết",
        ID: result[0].ID,
        DaiLy_ID: result[0].DaiLy_ID,
        Phone: result[0].Phone,
        Date: result[0].Date,
        Address: result[0].Address,
        Email: result[0].Email,
        Total_Money: result[0].Total_Money,

    });
}
const editPhieuThu = async(req, res) => {
    const id = req.params.ID;
    const result = await service.findById(id);

    res.render("PhieuThu/edit", {
        title: "Phiếu Thu",
        tag: "Chỉnh Sửa Thông Tin",
        ID: result[0].ID,
        DaiLy_ID: result[0].DaiLy_ID,
        Date: result[0].Date,
        Phone: result[0].Phone,
        Address: result[0].Address,
        Total_Money: result[0].Total_Money,
    });
};
const edit = async(req, res) => {
    const phieuThu = req.body;
    phieuThu.ID = req.params.ID;
    var date = phieuThu.Date;
    var mm = date.split("/")[0];
    var dd = date.split("/")[1];
    var yyyy = date.split("/")[2];
    phieuThu.Date = yyyy + '-' + mm + '-' + dd
    var old = await service.findById(phieuThu.ID);
    old = old[0];
    var daiLy = await DaiLy.findById(phieuThu.DaiLy_ID);
    daiLy = daiLy[0]
    var loaiDaiLy = await LoaiDaiLy.findById(daiLy.Type);
    loaiDaiLy = loaiDaiLy[0]
    var debts = -parseFloat(old.Total_Money) + parseFloat(phieuThu.Total_Money)
    var newDebt = parseFloat(daiLy.Debts) - parseFloat(old.Total_Money) + parseFloat(phieuThu.Total_Money)
    var maxDebt = parseFloat(loaiDaiLy.Max_debt)
        //service.updateDaiLy(daiLy).then(res.redirect('/DaiLy/' + daiLy.ID))
    if (newDebt <= maxDebt) {
        const updateDebt = await DaiLy.updateDebt(daiLy, debts)
        if (updateDebt) {
            service.updatePhieuThu(phieuThu).then(res.redirect("/PhieuThu/" + phieuThu.ID))

        } else {
            res.redirect("/PhieuThu/edit/" + phieuThu.ID)
        }
    } else {
        res.redirect("/PhieuThu/edit/" + phieuThu.ID)
    }
};

/*const addDaiLy = async(req, res) => {
    const loaiDaiLy = await LoaiDaiLy.listLoaiDaiLy();
    res.render("DaiLy/add", {
        title: "Đại Lý",
        tag: "Thêm Đại Lý",
        loaiDaiLy: loaiDaiLy,
    });
};
const add = async(req, res) => {
    const daiLy = req.body;
    var loaiDaiLy = await LoaiDaiLy.findByName(daiLy.Type);
    daiLy.Type = loaiDaiLy.ID;
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = yyyy + '-' + mm + '/' + dd;

    daiLy.Day = today;
    daiLy.Debts = 0
    service.addDaiLy(daiLy).then(res.redirect("/DaiLy"))
        //res.send(daiLy);
};
const detailDaiLy = async(req, res) => {
    const id = req.params.ID;
    const result = await service.findById(id);


    var loaiDaiLy = await LoaiDaiLy.findById(result[0].Type);
    res.render("DaiLy/detail", {
        title: "Đại Lý",
        tag: "Thông Tin Chi Tiết",
        ID: result[0].ID,
        Name: result[0].Name,
        Type: loaiDaiLy[0].Name,
        Phone: result[0].Phone,
        District: result[0].District,
        Address: result[0].Address,
        Day: result[0].Day,
        Debts: result[0].Debts,
        Email: result[0].Email,
    });
}
const editDaiLy = async(req, res) => {
    const id = req.params.ID;
    const result = await service.findById(id);
    var loaiDaiLy = await LoaiDaiLy.findById(result[0].Type);
    var listLoaiDaiLy = await LoaiDaiLy.listLoaiDaiLy();

    res.render("DaiLy/edit", {
        title: "Đại Lý",
        tag: "Thêm Đại Lý",
        loaiDaiLy: listLoaiDaiLy,
        ID: result[0].ID,
        Name: result[0].Name,
        Type: loaiDaiLy[0].Name,
        Phone: result[0].Phone,
        District: result[0].District,
        Address: result[0].Address,
        Day: result[0].Day,
        Debts: result[0].Debts,
        Email: result[0].Email,

    });
};*/



module.exports = { list, addPhieuThu, add, detailPhieuThu, editPhieuThu, edit };