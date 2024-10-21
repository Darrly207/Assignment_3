const StudentRouter = require("./StudentRouter");
const routes = (app) => {
  app.use("/", StudentRouter);
};
module.exports = routes;
