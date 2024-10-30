const mongoose = require("mongoose");

const readerSchema = new mongoose.Schema({
  ReaderID: { type: String, required: true, unique: true },
  LastName: { type: String, required: true },
  FirstName: { type: String, required: true },
  DateOfBirth: { type: Date, required: true },
  Gender: { type: String, required: true },
  Address: { type: String, required: true },
  Phone: { type: String, required: true },
});

module.exports = mongoose.model("Reader", readerSchema);
