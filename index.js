const app = require("./app");

app.listen(5000, function () {
  console.log(`app running on @${process.env.RUNNING_PORT}`);
});