import { instance } from "../libs/axiosConfig";

export const getCartApi = () => instance.get(`/user/showCartItems`);

export const addToCartApi = (id, quantity) =>
  instance.post(`/user/addToCart/${id}`, {
    quantity,
  });

export const removeFromCartApi = (id) =>
  instance.delete(`/user/removeCartProduct/${id}`);

export const buyTheOrderApi = (id) =>
  instance.delete(`/user/buyTheOrder/${id}`);

export const updateCartApi = (id, data) =>
  instance.put(`/user/updateCart/${id}`, data);
