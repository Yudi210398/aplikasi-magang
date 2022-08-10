import mongoose from "mongoose";
const Schema = mongoose.Schema;
// this.ukuran.baju[0]?.dada.push({
//   dadaDepan: data.dadaDepan,
//   dadaBelakang: data.dadaBelakang,
// });

let fungsiSaveUkuran = function (data) {
  let datas = {
    baju: data.ukuran.baju,
    celana: data.ukuran.celana,
    jas: data.ukuran.jas,
  };
  data.ukuran = datas;

  return data.save();
};

const Customer = new Schema({
  no: {
    type: Number,
    required: true,
  },

  namaCustomer: {
    type: String,
    required: true,
  },

  noTelp: {
    type: String,
    required: true,
    unique: true,
  },

  ukuran: {
    baju: [
      {
        panjangBadans: String,
        lenganPanjang: String,
        lenganPendek: String,
        pundak: String,
        lingkarKetiak: String,
        lingkarUjungTangan: String,
        lenganAtas: String,
        lenganTengah: String,
        lenganTengah: String,
        marset: String,
        leher: String,
        dada: [{ dadaDepan: String, dadaBelakang: String }],
        atas: [{ atasDepan: String, atasBelakang: String }],
        perut: [{ perutDepan: String, perutBelakang: String }],
        pinggul: [{ pinggulDepan: String, pinggulBelakang: String }],
        lingkarDada: String,
        lingkarPerut: String,
        lingkarPinggul: String,
      },
    ],

    celana: [
      {
        pinggang: String,
        panjang: String,
        paha: String,
        lutut: String,
        kaki: String,
        kil: String,
        pinggulCelana: String,
      },
    ],
    jas: [
      {
        panjangbadan: [{ panjangDepan: String, panjangBelakang: String }],
        pundak: String,
        lebarBahu: String,
        panjangTangan: String,
        badan: [{ badanDepan: String, badanBelakang: String }],
        dada: String,
        pinggang: String,
        pinggul: String,
        leher: String,
      },
    ],
  },

  alamat: {
    type: String,
  },
});

Customer.methods.noUrut = function (data) {
  this.no = data;
  return this.save();
};

Customer.methods.tambahUkurans = function (data) {
  if (this.ukuran.baju.length > 0) this.ukuran.baju.shift();

  this.ukuran.baju.push({
    panjangBadans: data.panjangBadans.trim(),
    lenganPanjang: data.lenganPanjang,
    lenganPendek: data.lenganPendek,
    pundak: data.pundak,
    lingkarKetiak: data.lingkarKetiak,
    lingkarUjungTangan: data.lingkarUjungTangan,
    lenganAtas: data.lenganAtas,
    lenganTengah: data.lenganTengah,
    marset: data.marset,
    leher: data.leher,
    lingkarDada: data.lingkarDada,
    lingkarPerut: data.lingkarPerut,
    lingkarPinggul: data.lingkarPinggul,
  });

  this.ukuran.baju[0]?.dada.push({
    dadaDepan: data.dadaDepan,
    dadaBelakang: data.dadaBelakang,
  });

  this.ukuran.baju[0]?.atas.push({
    atasDepan: data.atasDepan,
    atasBelakang: data.atasBelakang,
  });

  this.ukuran.baju[0]?.perut.push({
    perutDepan: data.perutDepan,
    perutBelakang: data.perutBelakang,
  });

  this.ukuran.baju[0]?.pinggul.push({
    pinggulDepan: data.pinggulDepan,
    pinggulBelakang: data.pinggulBelakang,
  });

  fungsiSaveUkuran(this);
};

Customer.methods.ukuransjas = function (data) {
  if (this.ukuran.jas.length > 0) this.ukuran.jas.shift();

  this.ukuran.jas.push({
    pundak: data.pundak.trim(),
    lebarBahu: data.lebarBahu.trim(),
    panjangTangan: data.panjangTangan.trim(),
    dada: data.dada.trim(),
    pinggang: data.pinggang.trim(),
    pinggul: data.pinggul?.trim(),
    leher: data.leher?.trim(),
  });

  this.ukuran.jas[0]?.panjangbadan.push({
    panjangDepan: data.panjangDepan,
    panjangBelakang: data.panjangBelakang,
  });

  this.ukuran.jas[0]?.badan.push({
    badanDepan: data.badanDepan,
    badanBelakang: data.badanBelakang,
  });

  fungsiSaveUkuran(this);
};

Customer.methods.ukuransCelana = function (data) {
  if (this.ukuran.celana.length > 0) this.ukuran.celana.shift();

  this.ukuran.celana.push({
    pinggang: data.pinggang.trim(),
    panjang: data.panjang.trim(),
    paha: data.paha.trim(),
    lutut: data.lutut.trim(),
    kaki: data.kaki.trim(),
    kil: data.kil.trim(),
    pinggulCelana: data.pinggulCelana.trim(),
  });

  fungsiSaveUkuran(this);
};

export default mongoose.model("Customers", Customer);
