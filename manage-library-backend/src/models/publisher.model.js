const publisherSchema = new mongoose.Schema({
  PublisherID: { type: String, required: true, unique: true },
  PublisherName: { type: String, required: true },
  Address: { type: String, required: true },
});

const Publisher = mongoose.model("Publisher", publisherSchema);
