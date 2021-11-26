const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const mongoosePaginate = require("mongoose-paginate-v2");

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.numLists = require("./numList.model")(mongoose, mongoosePaginate);
db.compareLists = require("./compareList.model")(mongoose);
module.exports = db;