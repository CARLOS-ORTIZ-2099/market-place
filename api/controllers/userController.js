import { MyError } from "../errors/MyError.js";
import { FavoriteModel } from "../models/Favorite.js";
import { ItemModel } from "../models/ItemToOrden.js";
import { ProductModel } from "../models/Product.js";

export const addToCart = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = req.user;
    const { quantity } = req.body;
    console.log(quantity);

    const [item, product] = await Promise.all([
      ItemModel.findOne({ product: id, user: user.id }),
      ProductModel.findById({ _id: id }),
    ]);

    if (!product) return next(new MyError("producto no existe", 404));

    if (product.seller.toString() == user.id)
      return next(new MyError("no puedes comprar tu propio producto", 400));

    if (!item) {
      if (Number(quantity) > Number(product.quantityMax)) {
        return next(new MyError("no hay stock suficiente", 400));
      }

      const newItem = new ItemModel({
        priceItem: product.price,
        quantityItem: quantity,
        total: quantity * product.price,
        product: id,
        user: user.id,
      });
      await newItem.save();

      return res
        .status(201)
        .send({ item: { ...newItem._doc, product: product } });
    }

    const sum = Number(item.quantityItem) + Number(quantity);

    if (sum > Number(product.quantityMax)) {
      return next(new MyError(`no puedes agregar mas unidades`, 400));
    }

    const itemUpdated = await ItemModel.findOneAndUpdate(
      { product: id, user: user.id },
      { $inc: { quantityItem: quantity, total: item.priceItem * quantity } },
      { new: true }
    );

    res.status(200).send({ item: { ...itemUpdated._doc, product: product } });
  } catch (error) {
    next(error);
  }
};

export const removeCartProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = req.user;
    console.log(user.id);

    const productDeleted = await ItemModel.findOneAndDelete({
      _id: id,
      user: user.id,
    });
    if (!productDeleted) {
      return next(
        new MyError("no existe el producto o no se pudo eliminar", 404)
      );
    }
    res.status(204).send({});
  } catch (error) {
    next(error);
  }
};

export const updateCart = async (req, res, next) => {
  try {
    const { idItem } = req.params;
    const user = req.user;
    const { quantity } = req.body;
    console.log(quantity);

    const pedido = await ItemModel.findById({ _id: idItem }).populate(
      "product"
    );

    if (!pedido) return next(new MyError("item no encontrado", 404));

    if (pedido.user.toString() !== user.id)
      return next(new MyError("no autorizado", 400));

    if (quantity > Number(pedido.product.quantityMax)) {
      return next(new MyError(`no puedes agregar mas unidades`, 400));
    }

    if (quantity <= 0) {
      const resp = await ItemModel.deleteOne({ _id: idItem });
      return res.send({ resp });
    }

    const productUpdated = await ItemModel.findOneAndUpdate(
      { _id: idItem },
      {
        quantityItem: quantity,
        total: quantity * pedido.priceItem,
      },
      { new: true }
    );

    return res.status(200).send({
      message: "OK",
      updatedItem: productUpdated,
    });
  } catch (error) {
    next(error);
  }
};

export const showCartItems = async (req, res, next) => {
  try {
    const user = req.user;
    //console.log(user);
    const response = await ItemModel.find({ user: user.id }).populate(
      "product"
    );

    const itemsToUpdate = [];

    for (let i = 0; i < response.length; i++) {
      // aqui corroboramos si el producto en el carrito del usuario ya no esta disponible
      // o si su propiedad quantitiMax cambio a 0
      // si es asi insertamos ese item en el arreglo itemsToUpdate
      if (!response[i].product || response[i].product.quantityMax === 0) {
        itemsToUpdate.push({
          deleteOne: { filter: { _id: response[i]._id } },
        });
      }
      // aqui comprobamos si hubo variabilidad en cuanto a precios o cantidad
      else if (
        response[i].product.price > response[i].priceItem ||
        response[i].product.price < response[i].priceItem ||
        response[i].product.quantityMax < response[i].quantityItem
      ) {
        // si se cumple insertar en el arreglo un objeto asi :
        itemsToUpdate.push({
          updateOne: {
            filter: { _id: response[i]._id },
            update: {
              // aqui nos quedamos con el precio actualizado del producto
              priceItem: response[i].product.price,
              // aqui si las unidades disponibles del producto es menor que la
              // cantidad seleccionada por el usuario entonces nos quedamos
              // con esa cantidad menor y lo multiplicamos por el precio de cicho producto
              total:
                response[i].product.price *
                (response[i].product.quantityMax < response[i].quantityItem
                  ? response[i].product.quantityMax
                  : response[i].quantityItem),
              // aqui si las unidades disponibles del producto es menor que la
              // cantidad seleccionada por el usuario entonces nos quedamos
              // con esa cantidad menor
              quantityItem:
                response[i].product.quantityMax < response[i].quantityItem
                  ? response[i].product.quantityMax
                  : response[i].quantityItem,
              image: response[i].product.images[0].secure_url,
            },
          },
        });
      }
    }
    const shouldUpdatedCart =
      itemsToUpdate.length > 0 && (await ItemModel.bulkWrite(itemsToUpdate));

    const cartUpdated =
      shouldUpdatedCart &&
      (await ItemModel.find({ user: user.id }).populate("product"));

    res.status(200).send({ cart: cartUpdated || response, shouldUpdatedCart });
  } catch (error) {
    next(error);
  }
};

export const buyTheOrder = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = req.user;
    const orderFound = await ItemModel.findOneAndDelete({
      _id: id,
      user: user.id,
    });
    if (!orderFound) {
      return next(new MyError("error al encontrar tu pedido", 404));
    }

    const productUpdated = await ProductModel.updateOne(
      { _id: orderFound.product },
      { $inc: { quantityMax: -orderFound.quantityItem } }
    );

    if (!orderFound)
      return next(new MyError("no existe el pedido o no es tuyo", 404));

    res.status(200).send({ message: "OK" });
  } catch (error) {
    next(error);
  }
};

export const addToFavorite = async (req, res, next) => {
  let { id } = req.params;
  let user = req.user;
  let body = req.body;
  console.log(id);
  console.log(body);

  try {
    const favourite = await FavoriteModel.findOne({
      product: id,
      user: user.id,
    });

    if (!favourite && body.action === "crear") {
      console.log("entro a crear");

      const createdFavourited = new FavoriteModel({
        product: id,
        user: user.id,
      });
      //console.log(createdFavourited);

      await createdFavourited.save();
      return res.status(201).send({ createdFavourited });
    }
    if (favourite && body.action === "eliminar") {
      //console.log("entro a eliminar");
      const deletedFavourite = await FavoriteModel.deleteOne({
        product: id,
        user: user.id,
      });
      return res.status(204).send({ deletedFavourite });
    }
    res.status(200).send({ body, favourite });
  } catch (error) {
    next(error);
  }
};

export const getAllUserFavouritesIds = async (req, res, next) => {
  try {
    const user = req.user;
    const favouritesFound = await FavoriteModel.find({ user: user.id }).select(
      "product -_id"
    );
    let idsAcc = [];
    for (let id of favouritesFound) {
      idsAcc.push(id.product);
    }
    res.status(200).send({ favouritesFound: idsAcc });
  } catch (error) {
    next(error);
  }
};

export const getAllUserFavourites = async (req, res, next) => {
  try {
    const user = req.user;
    const favouritesFound = await FavoriteModel.find({
      user: user.id,
    }).populate({
      path: "product",
      select: "images brand name price coin",
      options: { slice: { images: 1 } },
    });
    //console.log(favouritesFound);
    const favouritesRemain = [];
    const favouritesDelete = [];

    for (let favourite of favouritesFound) {
      favourite.product
        ? favouritesRemain.push(favourite)
        : favouritesDelete.push({
            deleteOne: { filter: { _id: favourite._id } },
          });
    }
    const dataUpdated =
      favouritesDelete.length > 0 &&
      (await FavoriteModel.bulkWrite(favouritesDelete));
    res.status(200).send({
      favouritesFound: favouritesRemain,
      favouritesDelete,
      dataUpdated,
    });
  } catch (error) {
    next(error);
  }
};
