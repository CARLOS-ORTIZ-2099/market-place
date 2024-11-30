/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useFormFields } from "../../hooks/useFormFields";
import { useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import { Box, Button, Input, Text, Textarea, useToast } from "@chakra-ui/react";
import { initial } from "../../libs/initialData";
import { StateCheckbox } from "../../components/state-checkbox/StateCheckbox";
import { PhotosUpload } from "../../components/photos-upload/PhotosUpload";
import { PriceSelect } from "../../components/price-select/PriceSelect";
import { CategorySelect } from "../../components/category-select/CategorySelect";
import { DeliveryMethodCheckbox } from "../../components/delivery-method/DeliveryMethodCheckbox";
import { WarrantyCheckbox } from "../../components/warranty-checkbox/WarrantyCheckbox";
import { getOneProductApi } from "../../api/products";
import { useUploadPhotos } from "../../hooks/useUploadPhotos";
import { processFormdata } from "../../libs/processFormdata";
import { useProduct } from "../../hooks/useProduct";
import { PreInput } from "../../components/pre-imput/PreInput";

export const FormPost = () => {
  const { auth } = useAuth();
  const {
    photos,
    photosDelete,
    uploadPhotos,
    handleSetPhotos,
    removePhoto,
    selectImageMain,
    handleSetPhotosDelete,
  } = useUploadPhotos("multiple");
  const {
    formData,
    handleSetFields,
    handlerChange,
    validateErrors,
    handleSetErrors,
    errors,
  } = useFormFields(initial);
  const { id } = useParams();
  const toast = useToast();
  const { createProduct, updateProduct, loading } = useProduct();
  useEffect(() => {
    if (id && auth) {
      getOneProduct();
    } else if (!id) {
      //console.log("no hay id");
      handleSetPhotos([]);
      handleSetPhotosDelete([]);
      handleSetFields(initial);
    }
  }, [id]);

  const getOneProduct = async () => {
    try {
      const { data } = await getOneProductApi(id);
      //console.log(data);
      let objectData = {};
      for (let key in data.product) {
        objectData[key] = data.product[key];
      }
      delete objectData["__v"];
      delete objectData["images"];
      delete objectData["_id"];
      delete objectData["seller"];
      handleSetFields(objectData);
      handleSetPhotos(data.product.images);
    } catch (error) {
      console.log(error);
    }
  };

  async function sendData(e) {
    e.preventDefault();
    let response = validateErrors(photos);
    //console.log(response);
    if (response) {
      handleSetErrors(response);
      return;
    }
    let newFormData = processFormdata(photos, toast, formData, photosDelete);
    if (!newFormData) return;
    if (id) {
      updateProduct(id, newFormData);
    } else {
      createProduct(newFormData);
    }
  }
  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      minH={"70vh"}
    >
      <Box w={{ base: "90%", md: "500px" }}>
        <Text fontSize={{ base: "3xl", lg: "5xl" }}>
          {id ? "update post" : "create post"}
        </Text>

        <Box as="form" onSubmit={sendData} sx={{ "& > *": { mt: "15px" } }}>
          <Button
            type="submit"
            colorScheme="teal"
            my={"5"}
            width={"100%"}
            borderRadius={"18"}
            isLoading={loading}
          >
            {id ? "update post" : "create post"}
          </Button>

          <PreInput
            header={"brand"}
            desc={
              "write the real brand of the product or generic if not have brand"
            }
          />
          <Input
            type="text"
            placeholder="brand"
            borderRadius={"18"}
            value={formData.brand}
            onChange={handlerChange}
            name="brand"
          />
          {errors.brand && (
            <p style={{ color: "tomato", fontWeight: "bolder" }}>
              {errors.brand.message}
            </p>
          )}

          <PreInput
            header={"state"}
            desc={
              "select of appropriate condition for your product and avoid clain from your buyers"
            }
          />
          <StateCheckbox handlerChange={handlerChange} formData={formData} />

          {errors.state && (
            <p style={{ color: "tomato", fontWeight: "bolder" }}>
              {errors.state.message}
            </p>
          )}

          <PreInput
            header={"name"}
            desc={
              "include product, brand, model and highlights theirs main features"
            }
          />
          <Input
            type="text"
            placeholder="name"
            borderRadius={"18"}
            value={formData.name}
            onChange={handlerChange}
            name="name"
          />
          {errors.name && (
            <p style={{ color: "tomato", fontWeight: "bolder" }}>
              {errors.name.message}
            </p>
          )}

          <PreInput
            header={"photos"}
            desc={"upload good photos for that the product highlights"}
          />
          <PhotosUpload
            photos={photos}
            uploadPhotos={uploadPhotos}
            removePhoto={removePhoto}
            selectImageMain={selectImageMain}
          />
          {errors.images && (
            <p style={{ color: "tomato", fontWeight: "bolder" }}>
              {errors.images.message}
            </p>
          )}

          <PreInput
            header={"stock"}
            desc={"Indicate how many units you have for sale"}
          />
          <Input
            type="number"
            min={1}
            placeholder="quantityMax"
            borderRadius={"18"}
            value={formData.quantityMax}
            onChange={handlerChange}
            name="quantityMax"
          />
          {errors.quantityMax && (
            <p style={{ color: "tomato", fontWeight: "bolder" }}>
              {errors.quantityMax.message}
            </p>
          )}
          <PreInput
            header={"description"}
            desc={"details the main features of you product"}
          />
          <Textarea
            placeholder="description"
            borderRadius={"18"}
            size="sm"
            resize={"none"}
            value={formData.description}
            onChange={handlerChange}
            name="description"
          />
          {errors.description && (
            <p style={{ color: "tomato", fontWeight: "bolder" }}>
              {errors.description.message}
            </p>
          )}

          <PreInput
            header={"price"}
            desc={"Indicate how much you want to sell the product for"}
          />
          <PriceSelect handlerChange={handlerChange} formData={formData} />
          {errors.coin && (
            <p style={{ color: "tomato", fontWeight: "bolder" }}>
              {"selecciona el tipo de moneda"}
            </p>
          )}
          {errors.price && (
            <p style={{ color: "tomato", fontWeight: "bolder" }}>
              {errors.price.message}
            </p>
          )}

          <PreInput
            header={"category"}
            desc={"write the category of the product"}
          />
          <CategorySelect handlerChange={handlerChange} formData={formData} />
          {errors.category && (
            <p style={{ color: "tomato", fontWeight: "bolder" }}>
              {errors.category.message}
            </p>
          )}

          <PreInput header={"Delivery method"} desc={"choose one"} />
          <DeliveryMethodCheckbox
            handlerChange={handlerChange}
            formData={formData}
          />
          {errors.deliveryMethod && (
            <p style={{ color: "tomato", fontWeight: "bolder" }}>
              {errors.deliveryMethod.message}
            </p>
          )}

          <PreInput
            header={"warranty"}
            desc={"Indicates the type of guarantee offered"}
          />
          <WarrantyCheckbox handlerChange={handlerChange} formData={formData} />
          {errors.warranty && (
            <p style={{ color: "tomato", fontWeight: "bolder" }}>
              {errors.warranty.message}
            </p>
          )}
        </Box>
      </Box>
    </Box>
  );
};
