import mongoose from "mongoose";

const favoriteSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: [true, "product es obligatorio"],
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "user es obligatorio"],
  },
});

export const FavoriteModel = mongoose.model("Favorite", favoriteSchema);
