import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  name: { type: String, required: [true, "name es obligatorio"] },
  lastName: { type: String, required: [true, "lastName es obligatorio"] },
  email: {
    type: String,
    required: [true, "email es obligatorio"],
    unique: true,
    match: [/^[^@]+@[^@]+\.[a-zA-Z]{2,}$/, "inserta un email valido"],
  },
  password: {
    type: String,
    required: [true, "password es obligatorio"],
    minLength: [6, "minimo 6 caracteres"],
  },
  bio: {
    type: String,
    default: "",
  },
  avatar: mongoose.Schema.Types.Mixed,
});

userSchema.pre("save", async function (next) {
  try {
    //console.log(this.isModified('password'))
    //console.log(this);
    if (this.isModified("password")) {
      console.log("modificando password");
      this.password = await bcrypt.hash(this.password, 10);
      next();
    }
  } catch (error) {
    next(error);
  }
});

export const UserModel = mongoose.model("User", userSchema);
