const service = require("../../models/Services/CT_PhieuXuat");
const PhieuXuat = require("../../models/Services/PhieuXuat");
const DaiLy = require("../../models/Services/DaiLy");
const HangHoa = require("../../models/Services/HangHoa");
const LoaiDaiLy = require("../../models/Services/LoaiDaiLy");

const addCT_PhieuXuat = async(req, res) => {
    const hangHoa = await HangHoa.listHangHoa();
    const ID = req.params.ID;

    res.render("CT_PhieuXuat/add", {
        title: "Hàng Hóa",
        tag: "Thêm Hàng Hóa",
        ID: ID,
        hangHoa: hangHoa,
    });
};
const add = async(req, res) => {
    const ct_PhieuXuat = req.body;
    const phieuXuat_ID = req.params.ID;
    ct_PhieuXuat.PhieuXuat_ID = req.params.ID;
    var hangHoa = await HangHoa.findById(ct_PhieuXuat.HangHoa_ID);
    hangHoa = hangHoa[0]
    var money = ct_PhieuXuat.Number * hangHoa.Price;
    var phieuXuat = await PhieuXuat.findById(phieuXuat_ID);
    phieuXuat = phieuXuat[0]
    var daiLy = await DaiLy.findById(phieuXuat.DaiLy_ID);
    daiLy = daiLy[0]
    var loaiDaiLy = await LoaiDaiLy.findById(daiLy.Type);
    loaiDaiLy = loaiDaiLy[0]
        //service.addDaiLy(daiLy).then(res.redirect("/DaiLy"))
    if (money + daiLy.Debts <= loaiDaiLy.Max_debt) {
        const updateDebt = await DaiLy.updateDebt(daiLy, money)
        if (updateDebt) {
            const updateTotalMoney = await PhieuXuat.updateTotalMoney(phieuXuat, money)
            if (updateTotalMoney) {
                service.addCT_PhieuXuat(ct_PhieuXuat).then(res.redirect("/PhieuXuat/" + phieuXuat_ID))
            } else {
                res.redirect('/CT_PhieuXuat/add/' + phieuXuat_ID)
            }
        } else {
            res.redirect('/CT_PhieuXuat/add/' + phieuXuat_ID)
        }
    } else {
        res.redirect('/CT_PhieuXuat/add/' + phieuXuat_ID)

    }
};
const detailCT_PhieuXuat = async(req, res) => {
    const id = req.params.ID;
    const stt = req.params.STT;

    const result = await service.findBySTT(id, stt);
    res.render("CT_PhieuXuat/detail", {
        title: "Chi Tiết Phiếu Xuất",
        tag: "Thông Tin Chi Tiết",
        STT: result[0].STT,
        PhieuXuat_ID: result[0].PhieuXuat_ID,
        HangHoa_ID: result[0].HangHoa_ID,
        Number: result[0].Number,
    });
}
const editCT_PhieuXuat = async(req, res) => {
    const id = req.params.ID;
    const stt = req.params.STT;
    const result = await service.findBySTT(id, stt);
    const hangHoa = await HangHoa.listHangHoa();

    res.render("CT_PhieuXuat/edit", {
        title: "Chi Tiết Phiếu Xuất",
        tag: "Thông Tin Chi Tiết",
        STT: result[0].STT,

        PhieuXuat_ID: result[0].PhieuXuat_ID,
        HangHoa_ID: result[0].HangHoa_ID,
        Number: result[0].Number,
        hangHoa: hangHoa,

    });
};
const edit = async(req, res) => {
    const ct_PhieuXuat = req.body;
    const id = req.params.ID;
    const stt = req.params.STT;
    ct_PhieuXuat.PhieuXuat_ID = req.params.ID;
    ct_PhieuXuat.STT = req.params.STT;

    var hangHoa = await HangHoa.findById(ct_PhieuXuat.HangHoa_ID);
    hangHoa = hangHoa[0]
    var money = ct_PhieuXuat.Number * hangHoa.Price;
    var old = await service.findBySTT(id, stt);
    old = old[0];
    var oldHangHoa = await HangHoa.findById(old.HangHoa_ID);
    oldHangHoa = oldHangHoa[0]
    const oldMoney = old.Number * oldHangHoa.Price
    var phieuXuat = await PhieuXuat.findById(id);
    phieuXuat = phieuXuat[0]
    var daiLy = await DaiLy.findById(phieuXuat.DaiLy_ID);
    daiLy = daiLy[0]
    var loaiDaiLy = await LoaiDaiLy.findById(daiLy.Type);
    loaiDaiLy = loaiDaiLy[0]
    daiLy.Type = loaiDaiLy.ID;
    if (daiLy.Debts + money - oldMoney <= loaiDaiLy.Max_debt) {
        const updateDebt = await DaiLy.updateDebt(daiLy, money - oldMoney)
        if (updateDebt) {
            const updateTotalMoney = await PhieuXuat.updateTotalMoney(phieuXuat, money - oldMoney)
            if (updateTotalMoney) {
                service.updateCT_PhieuXuat(ct_PhieuXuat).then(res.redirect("/CT_PhieuXuat/" + id + '/' + stt))
            } else {
                res.redirect('/CT_PhieuXuat/edit/' + id + '/' + stt)
            }
        } else {
            res.redirect('/CT_PhieuXuat/edit/' + id + '/' + stt)
        }
    } else {
        res.redirect('/CT_PhieuXuat/edit/' + id + '/' + stt)

    }

    //service.updateDaiLy(daiLy).then(res.redirect('/DaiLy/' + daiLy.ID))
};
const deleteCT_PhieuXuat = async(req, res) => {
        const id = req.params.ID;
        const stt = req.params.STT;
        var old = await service.findBySTT(id, stt);
        old = old[0];
        var oldHangHoa = await HangHoa.findById(old.HangHoa_ID);
        oldHangHoa = oldHangHoa[0]
        const oldMoney = old.Number * oldHangHoa.Price
        var phieuXuat = await PhieuXuat.findById(id);
        phieuXuat = phieuXuat[0]
        var daiLy = await DaiLy.findById(phieuXuat.DaiLy_ID);
        daiLy = daiLy[0]

        const updateDebt = await DaiLy.updateDebt(daiLy, -oldMoney)
        if (updateDebt) {
            const updateTotalMoney = await PhieuXuat.updateTotalMoney(phieuXuat, -oldMoney)
            if (updateTotalMoney) {
                service.deleteCT_PhieuXuat(stt, id).then(res.redirect("/PhieuXuat/" + id));

            } else {
                res.redirect('/CT_PhieuXuat/' + id + '/' + stt)
            }
        } else {
            res.redirect('/CT_PhieuXuat/' + id + '/' + stt)
        }

    }
    /*
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
    };
    const edit = async(req, res) => {
        const daiLy = req.body;
        daiLy.ID = req.params.ID;
        var loaiDaiLy = await LoaiDaiLy.findByName(daiLy.Type);
        daiLy.Type = loaiDaiLy.ID;
        service.updateDaiLy(daiLy).then(res.redirect('/DaiLy/' + daiLy.ID))
            //res.send(daiLy);
    };
    const deleteDaiLy = (req, res) => {
        const id = req.params.ID;
        service.deleteDaiLy(id).then(res.redirect("/DaiLy"));
    }
    */

module.exports = { addCT_PhieuXuat, add, detailCT_PhieuXuat, editCT_PhieuXuat, edit, deleteCT_PhieuXuat };