import mongoose from "mongoose";
import colors from "colors";

/* console.log("modo".magenta, process.env.NODE_ENV);
console.log("mongo atlas".cyan, process.env.MONGO_URI);
console.log("mongo local".red, process.env.URI_DEV); */

export async function db() {
  try {
    //throw new Error("error al conectarse a la db");
    await mongoose.connect(
      process.env.NODE_ENV === "production"
        ? process.env.MONGO_URI
        : process.env.URI_DEV
    );
    console.log(`connected successfully to db`.cyan);
  } catch (error) {
    console.log(`error unexpected to connected to DB ${err}`);
    process.exit(1);
  }
}
