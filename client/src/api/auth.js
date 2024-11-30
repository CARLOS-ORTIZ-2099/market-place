import { instance } from "../libs/axiosConfig";

export const verifyAuthApi = () => {
  return instance.get(`/auth/verifyToken`);
};

export const loginApi = (body) => {
  return instance.post(`/auth/login`, body);
};

export const registerApi = (body) => instance.post(`/auth/register`, body);

export const editProfileApi = (id, body) =>
  instance.put(`/auth/updateUser/${id}`, body);

export const editAvatarApi = (id, body) =>
  instance.put(`/auth/updateUser/avatar/${id}`, body);

export const closeSessionApi = () => instance.post("/auth/closeSession");
