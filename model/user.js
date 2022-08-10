import mongoose from "mongoose";
const Schema = mongoose.Schema;

const User = new Schema({
  nama: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  pass: { type: String, required: true },
});

export default mongoose.model("Users", User);
