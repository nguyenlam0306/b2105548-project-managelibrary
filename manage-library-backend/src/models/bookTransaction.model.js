import mongoose from "mongoose";

const BookTransactionSchema = new mongoose.Schema(
  {
    bookId: {
      type: String,
      require: true,
    },
    userId: {     
      type: String,
      require: true,
    },    
    readerId: {
      type: String,
      require: true,
    },    
    fromDate: {
      type: String,
      require: true,
    },
    toDate: {
      type: String,
      require: true,
    },
    returnDate: {
      type: String,
    },
    transactionStatus: {
      type: String,
      default: "Active",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("BookTransaction", BookTransactionSchema);
