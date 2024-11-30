import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "el nombre es obligatorio"],
  },

  description: {
    type: String,
    required: [true, "la descripcion es obligatoria"],
  },

  images: {
    type: [mongoose.Schema.Types.Mixed],
    validate: {
      validator: function (arr) {
        return arr.length > 0;
      },
      message: "selecciona almenos una foto",
    },
  },

  deliveryMethod: {
    type: String,
    required: [true, "el deliveryMethod es obligatorio"],
  },

  price: {
    type: Number,
    required: [true, "el precio es obligatorio"],
  },

  quantityMax: {
    type: Number,
    required: [true, "quantity es obligatorio"],
  },

  category: {
    type: String,
    required: [true, "categoria es obligatorio"],
  },

  brand: {
    type: String,
    required: [true, "la marca es obligatoria"],
  },

  coin: {
    type: String,
    required: [true, "el coin es obligatorio"],
  },

  warranty: {
    type: String,
    required: [true, "la garantia es obligatoria"],
  },

  state: {
    type: String,
    enum: {
      values: ["nuevo", "usado", "reacondicionado"],
      message: `{VALUE} is not supported`,
    },
  },

  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "el vendedor es obligatorio"],
  },
});

export const ProductModel = mongoose.model("Product", productSchema);
