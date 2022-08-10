import express from "express";
import * as controller from "../../controller/admin.js";
import * as auth from "../../middleware/auth.js";
const routerAdmin = express.Router();
routerAdmin.get("/dashboard", auth.data, controller.mainData);
routerAdmin.get("/karyawan", auth.data, controller.dataKaryawan);
routerAdmin.get(
  "/tambah-data-karyawan",
  auth.data,
  controller.tambahDataKaryawan
);
routerAdmin.get("/hapus-karyawan/:id", auth.data, controller.hapusDataKaryawan);
routerAdmin.get("/edit-karyawan/:id", auth.data, controller.editKaryawan);

routerAdmin.post(
  "/data-tambah-karyawan",
  auth.data,
  controller.postTambahKaryawan
);
routerAdmin.post(
  "/hapus-data-karyawan",
  auth.data,
  controller.postHapusKaryawan
);
routerAdmin.post("/data-edit-karyawan", auth.data, controller.postEditKaryawan);

export default routerAdmin;
