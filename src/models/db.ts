import * as mongoose from "mongoose";
import { Config } from "../config/config";
const mongoConfig = Config.getInstance().mongoDB;
const DB_URL = `mongodb://${mongoConfig.host}:${mongoConfig.port}/${mongoConfig.dbname}`;
mongoose.connect(DB_URL);

mongoose.connection.on("connected ", () => {
  console.log("Mongoose connection open to  " + DB_URL);
});


mongoose.connection.on("error ", (err: any) => {
  console.log("Mongoose connection error:  " + err);
});

mongoose.connection.on("disconnected ", () => {
  console.log("Mongoose connection disconnected ");
});

export = mongoose;