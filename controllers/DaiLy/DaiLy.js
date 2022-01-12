const service = require("../../models/Services/DaiLy");
const LoaiDaiLy = require("../../models/Services/LoaiDaiLy");
const PhieuXuat = require("../../models/Services/PhieuXuat");
const CT_PhieuXuat = require("../../models/Services/CT_PhieuXuat");
const PhieuThu = require("../../models/Services/PhieuThu");

const list = async(req, res) => {
    var result = await service.listDaiLy();
    for (i of result) {
        var id = i.Type;
        var loaiDaiLy = await LoaiDaiLy.findById(id);
        i.Type = loaiDaiLy[0].Name;
    }
    res.render("DaiLy/list", {
        title: "Đại Lý",
        tag: "Danh Sách",
        daiLy: result,
    });

};

const addDaiLy = async(req, res) => {
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
    var dd = String(today.getDate() + 1).padStart(2, '0');
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
};
const edit = async(req, res) => {
    const daiLy = req.body;
    daiLy.ID = req.params.ID;
    var loaiDaiLy = await LoaiDaiLy.findByName(daiLy.Type);
    daiLy.Type = loaiDaiLy.ID;
    service.updateDaiLy(daiLy).then(res.redirect('/DaiLy/' + daiLy.ID))
        //res.send(daiLy);
};
const deleteDaiLy = async(req, res) => {
    const id = req.params.ID;
    var result = await service.findById(id);
    result = result[0];
    if (result.Debts == 0) {
        const phieuXuat = await PhieuXuat.findByDaiLy(result.ID)
        var deleteCT_PhieuXuat = true
        for (i of phieuXuat) {
            var check = await CT_PhieuXuat.deleteByPhieuXuat(i.ID)
            if (!check) {
                deleteCT_PhieuXuat = false
            }
        }
        if (deleteCT_PhieuXuat) {
            const deletePhieuThu = await PhieuThu.deleteByDaiLy(result.ID)
            const deletePhieuXuat = await PhieuXuat.deleteByDaiLy(result.ID)
            if (deletePhieuXuat && deletePhieuThu) {
                service.deleteDaiLy(id).then(res.redirect("/DaiLy"));
            } else {
                res.redirect('/DaiLy/' + id)
            }
        } else {
            res.redirect('/DaiLy/' + id)
        }
    } else {
        res.redirect('/DaiLy/' + id)
    }
}

/*
const detailUser = async(req, res) => {
    const id = req.params;
    const result = await service.findById(id);
    res.render("admin/accountDetail", {
        title: "Covid Manager",
        tag: "Account",
        id: result[0].id,
        user_name: result[0].user_name,
        password: result[0].password,
        name: result[0].name,
        identity_card: result[0].identity_card,
        role: result[0].role,
        active: result[0].active,
        is_alert: result[0].is_alert,
    });
}
const editAccount = async(req, res) => {
    const id = req.params;
    const result = await service.findById(id);
    res.render("admin/accountEdit", {
        title: "Covid Manager",
        tag: "Account",
        id: result[0].id,
        user_name: result[0].user_name,
        password: result[0].password,
        name: result[0].name,
        identity_card: result[0].identity_card,

        role: result[0].role,
        active: result[0].active,
        is_alert: result[0].is_alert,
    });

}
const edit = async(req, res) => {
    const acc = req.body;
    if (acc.active == undefined) {
        acc.active = false;
    } else {
        acc.active = true
    }
    if (acc.is_alert == undefined) {
        acc.is_alert = false;
    } else {
        acc.is_alert = true;
    }
    acc.id = req.params.id;
    service.updateAccount(acc).then(res.redirect('/user/' + acc.id))


};

const add = (req, res) => {
    const acc = req.body;
    if (acc.active == undefined) {
        acc.active = false;
    } else {
        acc.active = true
    }
    if (acc.is_alert == undefined) {
        acc.is_alert = false;
    } else {
        acc.is_alert = true;
    }
    acc.role = "manager";
    service.addAccount(acc).then(res.redirect("/user"))
};
const deleteAccount = (req, res) => {
    const id = req.params;
    service.deleteAccount(id).then(res.redirect("/account"));
}

const accountDetail = (req, res) => {
    res.render("manager/productDetail", {
        tag: "Account Detail"
    })
}

const updateAccount = (req, res) => {
    const acc = req.body;
    console.log(acc);
    //service.updateAccount(pt).then(res.redirect("/user"));
}
*/
module.exports = { list, addDaiLy, add, detailDaiLy, editDaiLy, edit, deleteDaiLy };