import { instance } from "../libs/axiosConfig";

export const getAllProductsApi = (id = "") =>
  instance.get(`/product/getAllProducts/${id}`);

export const getOneProductApi = (id) =>
  instance.get(`/product/getOneProduct/${id}`);

export const updateProductApi = (id, data) =>
  instance.put(`/product/updateProduct/${id}`, data);

export const createProductApi = (data) =>
  instance.post(`/product/createProduct`, data);

export const deleteProductApi = (id) =>
  instance.delete(`/product/deleteProduct/${id}`);
