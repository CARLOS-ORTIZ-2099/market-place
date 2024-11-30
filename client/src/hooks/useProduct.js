import { useState } from "react";
import {
  createProductApi,
  deleteProductApi,
  getAllProductsApi,
  getOneProductApi,
  updateProductApi,
} from "../api/products";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export const useProduct = (load = false) => {
  const [loading, setLoading] = useState(load);
  const [error, setError] = useState(null);
  const toast = useToast();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [products, setProducts] = useState([]);

  const createProduct = async (data) => {
    setLoading(true);
    try {
      const response = await createProductApi(data);
      //console.log(response);
      toast({
        title: "creado",
        description: response.data.message,
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      navigate("/");
    } catch (error) {
      //console.log(error);
      toast({
        title: "error",
        description: "ocurrio un error",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const updateProduct = async (id, data) => {
    setLoading(true);
    try {
      const response = await updateProductApi(id, data);
      //console.log(response);
      toast({
        title: "editado",
        description: response.data.message,
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      navigate("/");
    } catch (error) {
      //console.log(error);
      toast({
        title: "error",
        description: "ocurrio un error",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const getOneProduct = async (id) => {
    setLoading(true);
    try {
      const { data } = await getOneProductApi(id);
      //console.log(data);
      setProduct(data.product);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id) => {
    const confirmDelete = confirm("deseas eliminar este producto " + id);
    if (confirmDelete) {
      try {
        const data = await deleteProductApi(id);
        if (data.status == 200) {
          toast({
            title: "eliminado",
            description: "publicacion eliminada correctamente",
            status: "success",
            duration: 2000,
            isClosable: true,
          });
          navigate("/");
        }
      } catch (error) {
        //console.log(error);
        toast({
          title: "error",
          description: "ocurrio un error",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      }
    }
  };

  const getAllProducts = async (id = "") => {
    setLoading(true);
    try {
      const { data } = await getAllProductsApi(id);
      setProducts(data.products);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    createProduct,
    updateProduct,
    getOneProduct,
    deleteProduct,
    getAllProducts,
    products,
    product,
    error,
    loading,
  };
};
