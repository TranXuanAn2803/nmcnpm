const service = require("../../models/Services/LoaiDaiLy");
const DaiLy = require("../../models/Services/DaiLy");

const list = async(req, res) => {
    const result = await service.listLoaiDaiLy();
    res.render("LoaiDaiLy/list", {
        title: "Loại Đại Lý",
        tag: "Danh Sách",
        loaiDaiLy: result,
    });
};
const addLoaiDaiLy = (req, res) => {
    res.render("LoaiDaiLy/add", {
        title: "Loại Đại Lý",
        tag: "Thêm Loại Đại Lý",
    });
};
const add = async(req, res) => {
    const loaiDaiLy = req.body;
    const ldl = await service.findByName(loaiDaiLy.Name);
    if (ldl == undefined || ldl[0] == undefined) {
        service.addLoaiDaiLy(loaiDaiLy).then(res.redirect('/LoaiDaiLy'))

    } else {
        res.redirect("/LoaiDaiLy")
    }
};
const detailLoaiDaiLy = async(req, res) => {
    const id = req.params.ID;
    const result = await service.findById(id);

    res.render("LoaiDaiLy/detail", {
        title: "Loại Đại Lý",
        tag: "Thông Tin Chi Tiết",
        ID: result[0].ID,
        Name: result[0].Name,
        Max_debt: result[0].Max_debt,

    });
}
const editLoaiDaiLy = async(req, res) => {
    const id = req.params.ID;
    const result = await service.findById(id);

    res.render("LoaiDaiLy/edit", {
        title: "Loại Dại Lý",
        tag: "Thêm Hàng Hóa",
        ID: result[0].ID,
        Name: result[0].Name,
        Max_debt: result[0].Max_debt,

    });
};
const edit = async(req, res) => {
    const loaiDaiLy = req.body;
    loaiDaiLy.ID = req.params.ID;
    var daiLy = await DaiLy.findByLoaiDaiLy(loaiDaiLy.ID);
    if (daiLy == null || daiLy[0] == undefined) {
        service.updateLoaiDaiLy(loaiDaiLy).then(res.redirect('/LoaiDaiLy/' + loaiDaiLy.ID));
    } else {
        res.redirect('/LoaiDaiLy/' + loaiDaiLy.ID)
    }

};
const deleteHangHoa = async(req, res) => {
        const id = req.params.ID;
        var daiLy = await DaiLy.findByLoaiDaiLy(id);
        if (daiLy == null || daiLy[0] == undefined) {
            service.deleteLoaiDaiLy(id).then(res.redirect("/LoaiDaiLy"));
        } else {
            res.redirect('/LoaiDaiLy/' + id)
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
module.exports = { list, addLoaiDaiLy, add, detailLoaiDaiLy, editLoaiDaiLy, edit, deleteHangHoa };