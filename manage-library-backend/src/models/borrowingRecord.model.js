const mongoose = require("mongoose");
const borrowingRecordSchema = new mongoose.Schema({
  ReaderID: { type: String, required: true },
  BookID: { type: String, required: true },
  BorrowDate: { type: Date, required: true },
  ReturnDate: { type: Date },
});

module.exports = mongoose.model("BorrowingRecord", borrowingRecordSchema);
