const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const routes = require("./routers/index.js");
const app = express();
app.use(express.json());
app.use(cors());

routes(app);

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB was connected"))
  .catch((error) => console.log("Connection error: ", error));

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
