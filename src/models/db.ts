import * as mongoose from "mongoose";
const DB_URL = "mongodb://localhost:27017/addressbook";
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