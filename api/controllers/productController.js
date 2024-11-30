import { MyError } from "../errors/MyError.js";
import { deleteAllImage, uploadStream } from "../libs/cloudinary.js";
import { processImage } from "../libs/processImage.js";
import { ProductModel } from "../models/Product.js";

export const createProduct = async (req, res, next) => {
  try {
    const user = req.user;
    const { body } = req;
    const images = req.files;
    const store = [];

    for (let ele of images) {
      const processedImage = await processImage(ele.buffer);
      const { secure_url, public_id } = await uploadStream(processedImage);
      store.push({ secure_url, public_id, id: public_id });
    }
    //console.log(store)

    const newProduct = new ProductModel({
      ...body,
      images: store,
      seller: user.id,
    });
    await newProduct.save();

    res.status(201).send({ message: "product created" });
  } catch (err) {
    console.log("entro".red);
    next(err);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = req.user;

    const productFound = await ProductModel.findById({ _id: id });
    if (!productFound) return next(new MyError("producto no encontrado", 404));

    if (productFound.seller.toString() !== user.id) {
      return next(new MyError("usuario no autorizado", 404));
    }

    const resp = await ProductModel.findByIdAndDelete({ _id: id });

    const imagesDelete = [];
    for (let i = 0; i < resp.images.length; i++) {
      imagesDelete.push(resp.images[i].public_id);
    }
    await deleteAllImage(imagesDelete);

    res.send({ message: resp });
  } catch (err) {
    next(err);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = req.user;
    const body = req.body;
    const images = req.files;
    const store = [];

    for (let ele of images) {
      const { secure_url, public_id } = await uploadStream(ele.buffer);
      store.push({ secure_url, public_id, id: public_id });
    }
    //console.log(store);

    if (body.photosDelete) {
      const imagesDelete = [];
      for (let photo of JSON.parse(body.photosDelete)) {
        imagesDelete.push(photo.public_id);
      }
      console.log(imagesDelete);
      imagesDelete.length > 0 && (await deleteAllImage(imagesDelete));
    }

    const newImages = body?.photosRemaind
      ? [...JSON.parse(body.photosRemaind), ...store]
      : [...store];

    //console.log(newImages);

    delete body["photosDelete"];
    delete body["photosRemaind"];
    //console.log(body)

    const resp = await ProductModel.findOneAndUpdate(
      { _id: id, seller: user.id },
      { ...body, images: newImages },
      { runValidators: true }
    );

    if (!resp) return next(new MyError("usuario no autorizado", 404));

    res.send({ message: "edited successfully" });
  } catch (err) {
    next(err);
  }
};

export const getAllProducts = async (req, res, next) => {
  try {
    const id = req.params.id;
    //console.log(id);

    if (id) {
      const productsFoundUser = await ProductModel.find(
        { seller: id },
        {
          images: { $slice: 1 },
          brand: 1,
          name: 1,
          price: 1,
          coin: 1,
        }
      );
      return res.send({
        products: productsFoundUser,
        count: productsFoundUser.length,
      });
    }
    const productsFound = await ProductModel.find(
      {},
      {
        images: { $slice: 1 },
        brand: 1,
        name: 1,
        price: 1,
        coin: 1,
      }
    );
    if (productsFound.length < 1) return res.send({ products: [] });
    res.send({ products: productsFound, count: productsFound.length });
  } catch (err) {
    next(err);
  }
};

export const getOneProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    const productFound = await ProductModel.findById({ _id: id }).populate(
      "seller"
    );
    if (!productFound) return next(new MyError("no se encontro producto", 404));
    console.log(productFound);
    res.send({ product: productFound });
  } catch (err) {
    next(err);
  }
};
