import express from "express";
import * as controller from "../../controller/customer.js";
import { check, body } from "express-validator";
import Customer from "../../model/customer.js";
import * as auth from "../../middleware/auth.js";
const routerCustomer = express.Router();

let fungsValidasi = async function (value) {
  try {
    let datas = await Customer.findOne({ noTelp: value });
    if (datas) return Promise.reject("No HP sudah terdaftar");
  } catch (error) {
    console.log(error);
  }
};

let validasiPhone = async function () {
  try {
    return await body("noHP", `No Hp Tidak Valid`)
      .isMobilePhone(["id-ID"])
      .isString()
      .isLength({ max: 13 })
      .custom(async (value, { req }) => await fungsValidasi(value));
  } catch (error) {
    console.log(error);
  }
};

routerCustomer.get("/data-pelanggan", auth.data, controller.dataPelanggan);
routerCustomer.get("/tambah-data", auth.data, controller.tambahData);
routerCustomer.get("/hapus-data/:id", auth.data, controller.hapusData);
routerCustomer.get("/edit-data/:id", auth.data, controller.editData);
routerCustomer.get("/ukuran/:id", auth.data, controller.ukuranData);
routerCustomer.get("/ukuran/:id/edit", auth.data, controller.ukuranAll);

routerCustomer.post("/ukuranBaju", auth.data, controller.postUkuranBaju);
routerCustomer.post("/ukuranCelana", auth.data, controller.postUkuranCelana);
routerCustomer.post("/ukuranJas", auth.data, controller.postUkuranjas);
routerCustomer.post(
  "/tambahdata",
  [await validasiPhone()],
  auth.data,
  controller.postTambahData
);

routerCustomer.post("/hapus-data-fix", controller.postHapusData);
routerCustomer.post(
  "/edit-data",
  [await validasiPhone()],
  auth.data,
  controller.postEditData
);
routerCustomer.post("/cari-data", auth.data, controller.postCariData);

export default routerCustomer;
