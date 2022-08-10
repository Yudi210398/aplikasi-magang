import Customer from "../model/customer.js";
import Karyawan from "../model/karyawan.js";
import * as controller from "../controller/customer.js";

export const mainData = async (req, res, next) => {
  try {
    let data = await Customer.find();
    let data2 = await Karyawan.find();
    res.render("admin/dasboard", {
      docTitle: `Home Page`,
      data,
      data2,
      path: `/dashbord`,
      login: req.session.login,
    });
  } catch (err) {
    console.log(err, `Error`);
  }
};

export const dataKaryawan = async (req, res, next) => {
  let data = await Karyawan.find();
  res.render("admin/karyawan", {
    docTitle: "Data Karyawan",
    path: `/karyawan`,
    produk: data,
    login: req.session.login,
  });
};

export const tambahDataKaryawan = (req, res, next) => {
  res.render("customer/tambahData", {
    docTitle: "Tambah Data Karyawan",
    path: `null`,
    editing: false,
    staff: true,
    editStaff: false,
    errors: false,
    data: false,
    login: req.session.login,
  });
};

export const postTambahKaryawan = async (req, res, next) => {
  try {
    await new Karyawan(
      await controller.tambahdatas(Karyawan, req.body, true)
    ).save();
    setTimeout(() => res.redirect("/karyawan"), 100);
  } catch (err) {
    req.session.pesan = true;
    console.log(err, `no telp sudah terdaftar`);
    res.redirect("/tambah-data-karyawan");
  }
};

export const hapusDataKaryawan = async (req, res, next) => {
  try {
    const dataDelete = req.query.hapus;
    if (!dataDelete) return res.redirect("/karyawan");
    let idKaryawan = req.params.id;
    let produk = await Karyawan.findById(idKaryawan);
    produk = [produk];
    if (!produk) res.redirect("/karyawan");
    else
      res.render("customer/pelanggan", {
        docTitle: "Hapus Data",
        produk,
        hapus: true,
        staff: true,
        path: `null`,
        login: req.session.login,
      });
  } catch (err) {
    console.log(`error`, err);
  }
};

export const postHapusKaryawan = async (req, res, next) => {
  try {
    let id = req.body.id.trim();
    await Karyawan.findByIdAndRemove(id);
    let data = await Karyawan.find();

    for (let i = 0; i < data.length; i++) await data[i].noUrut(i + 1);

    res.redirect("/karyawan");
  } catch (err) {
    console.log(`error`, err);
  }
};

export const editKaryawan = async (req, res, next) => {
  try {
    const editDataKaryawan = req.query.editDataKaryawan;
    if (!editDataKaryawan) return res.redirect("/karyawan");
    let editData = req.params.id;
    let data = await Karyawan.findById(editData);
    if (!data) return res.redirect("/karyawan");
    else {
      res.render("customer/tambahData", {
        docTitle: `Edit Data`,
        editing: false,
        staff: true,
        editStaff: true,
        data,
        path: `null`,
        errors: false,
        login: req.session.login,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const postEditKaryawan = async (req, res, next) => {
  try {
    let id = req.body.idK.trim();
    let nama = req.body.namaCustomer;
    let noTelp = req.body.noHP.trim();
    let alamatCustomer = req.body.alamatCustomer;
    alamatCustomer === ""
      ? (alamatCustomer = "Masih tinggal di bumi")
      : alamatCustomer;
    let jabatan = req.body.jabatan;
    let dataK = await Karyawan.findById(id);
    let dataAll = await Karyawan.find();
    dataK.namaCustomer = nama;
    dataK.noTelp = noTelp;
    dataK.alamat = alamatCustomer;
    dataK.jabatan = jabatan;
    let hasil = dataAll.filter(
      (d) =>
        d._id.toString() !== dataK._id.toString() && d.noTelp === dataK.noTelp
    );

    if (hasil.length > 0) {
      req.session.pesan = true;
      res.redirect(`/edit-karyawan/${id}?editDataKaryawan=edit-data-karyawan`);
    } else {
      await dataK.save();
      res.redirect(`/karyawan`);
    }
  } catch (error) {
    console.log(error);
  }
};
