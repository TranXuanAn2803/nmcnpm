const service = require("../../models/Services/PhieuXuat");
const DaiLy = require("../../models/Services/DaiLy");
const LoaiDaiLy = require("../../models/Services/LoaiDaiLy");
const CT_PhieuXuat = require("../../models/Services/CT_PhieuXuat");

const list = async(req, res) => {
    var result = await service.listPhieuXuat();
    res.render("PhieuXuat/list", {
        title: "Phiếu Xuất",
        tag: "Danh Sách",
        phieuXuat: result,
    });

};
const addPhieuXuat = async(req, res) => {
    const daiLy = await DaiLy.listDaiLy();
    res.render("PhieuXuat/add", {
        title: "Phiếu Xuất",
        tag: "Thêm Phiếu Xuất",
        daiLy: daiLy,
    });
};
const add = async(req, res) => {
    const phieuXuat = req.body;
    var date = phieuXuat.Date;
    var mm = date.split("/")[0];
    var dd = date.split("/")[1];
    var yyyy = date.split("/")[2];
    phieuXuat.Date = yyyy + '-' + mm + '-' + dd
    phieuXuat.Total_Money = 0
    service.addPhieuXuat(phieuXuat).then(res.redirect("/PhieuXuat"))
};
const detailPhieuXuat = async(req, res) => {
    const id = req.params.ID;
    const result = await service.findById(id);
    const listCT_PhieuXuat = await CT_PhieuXuat.findByPhieuXuat_ID(id)
    res.render("PhieuXuat/detail", {
        title: "Phiếu Xuất",
        tag: "Thông Tin Chi Tiết",
        ID: result[0].ID,
        DaiLy_ID: result[0].DaiLy_ID,
        Date: result[0].Date,
        Total_Money: result[0].Total_Money,
        CT_PhieuXuat: listCT_PhieuXuat,
    });
}
const editPhieuXuat = async(req, res) => {
    const id = req.params.ID;
    const result = await service.findById(id);

    res.render("PhieuXuat/edit", {
        title: "Phiếu Xuất",
        tag: "Chỉnh Sửa Thông Tin",
        ID: result[0].ID,
        DaiLy_ID: result[0].DaiLy_ID,
        Date: result[0].Date,
        Total_Money: result[0].Total_Money,
    });
};
const edit = async(req, res) => {
    const phieuXuat = req.body;
    phieuXuat.ID = req.params.ID;
    var date = phieuXuat.Date;
    var mm = date.split("/")[0];
    var dd = date.split("/")[1];
    var yyyy = date.split("/")[2];
    phieuXuat.Date = yyyy + '-' + mm + '-' + dd

    service.updatePhieuXuat(phieuXuat).then(res.redirect("/PhieuXuat/" + phieuXuat.ID))
};
const deletePhieuXuat = async(req, res) => {
    const id = req.params.ID;
    var result = await service.findById(id);
    result = result[0];
    var daiLy = await DaiLy.findById(result.DaiLy_ID);
    daiLy = daiLy[0]

    const updateDebt = await DaiLy.updateDebt(daiLy, -result.Total_Money)

    if (updateDebt) {
        var deleteCT_PhieuXuat = await CT_PhieuXuat.deleteByPhieuXuat(result.ID)
        if (deleteCT_PhieuXuat) {
            service.deletePhieuXuat(id).then(res.redirect("/PhieuXuat"));
        } else {
            res.redirect('/PhieuXuat/' + id)
        }
    } else {
        res.redirect('/PhieuXuat/' + id)
    }
}


/*
const list = async(req, res) => {
    var result = await service.listPhieuThu();
    for (i of result) {
        var id = i.DaiLy_ID;
        var daiLy = await DaiLy.findById(id);
        i.Type = daiLy[0].Name;
    }
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

*/

module.exports = { list, addPhieuXuat, add, detailPhieuXuat, editPhieuXuat, edit, deletePhieuXuat };