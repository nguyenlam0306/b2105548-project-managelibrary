import mongoose from "mongoose";
import app from "./app.js";

/* MongoDB connection */
const port = process.env.PORT || 8080;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Ket noi Database voi MongoDB thanh cong");

    /* Port Listening */
    app.listen(port, () => {
      console.log(`Server is running on PORT ${port}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
  });
