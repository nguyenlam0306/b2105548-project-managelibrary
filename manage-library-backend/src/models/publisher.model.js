import mongoose from "mongoose";

const publisherSchema = new mongoose.Schema(
  {
    publisherID: { type: String, required: true, unique: true },
    publisherName: { type: String, required: true },
    address: { type: String, required: true },
    books: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Book",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Publisher", publisherSchema);
