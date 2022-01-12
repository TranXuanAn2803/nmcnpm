const service = require("../../models/Services/HangHoa");
const CT_PhieuXuat = require("../../models/Services/CT_PhieuXuat");

const list = async(req, res) => {
    const result = await service.listHangHoa();
    res.render("HangHoa/list", {
        title: "Loại Hàng Hóa",
        tag: "Danh Sách",
        hangHoa: result,
    });
};
const addHangHoa = (req, res) => {
    res.render("HangHoa/add", {
        title: "Loại Hàng Hóa",
        tag: "Thêm Hàng Hóa",
    });
};
const add = async(req, res) => {
    const hangHoa = req.body;
    service.addHangHoa(hangHoa).then(res.redirect("/HangHoa"))
};
const detailHangHoa = async(req, res) => {
    const id = req.params.ID;
    const result = await service.findById(id);

    res.render("HangHoa/detail", {
        title: "Hàng Hóa",
        tag: "Thông Tin Chi Tiết",
        ID: result[0].ID,
        Name: result[0].Name,
        Unit: result[0].Unit,
        Price: result[0].Price,

    });
}
const editHangHoa = async(req, res) => {
    const id = req.params.ID;
    const result = await service.findById(id);

    res.render("HangHoa/edit", {
        title: "Hàng Hóa",
        tag: "Chỉnh Sửa Hàng Hóa",
        ID: result[0].ID,
        Name: result[0].Name,
        Unit: result[0].Unit,
        Price: result[0].Price,

    });
};
const edit = async(req, res) => {
    const hangHoa = req.body;
    hangHoa.ID = req.params.ID;
    const ct_PhieuXuat = await CT_PhieuXuat.findByHangHoa(hangHoa.ID);

    if (ct_PhieuXuat == null || ct_PhieuXuat[0] == undefined) {
        service.updateHangHoa(hangHoa).then(res.redirect('/HangHoa/' + hangHoa.ID));

    } else {
        res.redirect('/HangHoa/' + hangHoa.ID)
    }
};
const deleteHangHoa = async(req, res) => {
    const id = req.params.ID;
    const ct_PhieuXuat = await CT_PhieuXuat.findByHangHoa(id);

    if (ct_PhieuXuat == null || ct_PhieuXuat[0] == undefined) {
        service.deleteHangHoa(id).then(res.redirect("/HangHoa"));

    } else {
        res.redirect('/HangHoa/' + id)
    }

}

/*const addAccount = (req, res) => {
    res.render("admin/addAccount", {
        tag: "Add Product",
    });
};

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
module.exports = { list, addHangHoa, add, detailHangHoa, editHangHoa, edit, deleteHangHoa };