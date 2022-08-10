import mongoose from "mongoose";
const Schema = mongoose.Schema;

const Karyawan = new Schema({
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
  alamat: {
    type: String,
  },
  jabatan: {
    type: String,
    required: true,
  },
});

Karyawan.methods.noUrut = function (data) {
  this.no = data;
  return this.save();
};

export default mongoose.model("Karyawans", Karyawan);
