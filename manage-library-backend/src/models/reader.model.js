import mongoose from "mongoose";

const ReaderSchema = new mongoose.Schema({
  readerId: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  fullName: { type: String, required: true },
  birthday: { type: Date, required: true },
  gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  transactions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BookTransaction",
    },
  ],
});

export default mongoose.model("Reader", ReaderSchema);
