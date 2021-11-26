const express = require("express");
const cors = require("cors");

var path = require('path');
const app = express();

var corsOptions = {
  origin: "http://localhost:8082 "
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// static file

// view engine

app.set("view engine","ejs");
app.set("views", path.join(__dirname, '/views'))
app.use(express.static('public'))
const db = require("./app/models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

// require("./app/routes/tutorial.routes")(app);
// require("./app/routes/numberList.routes")(app);
// require("./app/routes/action.routes")(app);
// require("./app/routes/deliveryStatus.routes")(app);

// require("./app/routes/view.routes")(app);
// require("./app/routes/func.routes")(app);


require("./app/routes/compareList.routes")(app);
require("./app/routes/numList.routes")(app);
require("./app/routes/tool.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 9532;
app.listen(PORT, "192.168.0.127", () => {
  console.log(`Server is running on port ${PORT}.`);
});