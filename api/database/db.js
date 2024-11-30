import mongoose from "mongoose";

export async function db() {
  try {
    //throw new Error("error al conectarse a la db");
    await mongoose.connect(
      process.env.NODE_ENV === "production"
        ? process.env.MONGO_URI
        : process.env.URI_DEV
    );
    console.log(`connected successfully to db`);
  } catch (error) {
    console.log(`error unexpected to connected to DB ${err}`);
    process.exit(1);
  }
}
