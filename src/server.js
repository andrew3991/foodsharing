const app = require("./app.js");

const PORT = process.env.PORT || 3001;
//app.set("port", process.env.PORT || PORT);

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
