import { instance } from "../libs/axiosConfig";

export const getAllUserFavouritesApi = () =>
  instance.get(`/user/getAllUserFavourites`);

export const getAllUserFavouritesIdsApi = () =>
  instance.get(`/user/getAllUserFavouritesIds`);

export const addToFavouriteApi = (id, body) =>
  instance.post(`/user/addToFavorite/${id}`, body);
