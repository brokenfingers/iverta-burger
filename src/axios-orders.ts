import axios, { AxiosResponse } from "axios";
import { Ingredients, IOrder } from "./Interfaces";

export interface iResponse {
  data: IOrder;
}

const instance = axios.create({
  baseURL:
    "https://iverta-burger-default-rtdb.europe-west1.firebasedatabase.app",
});

const responseBody = (response: AxiosResponse) => response.data;

const orderRequests = {
  get: (url: string) => instance.get<Ingredients>(url).then(responseBody),
  post: (url: string, body: IOrder) =>
    instance.post<IOrder>(url, body).then(responseBody),
};

type addOrderReturn = { name: string };

export const axiosOrders = {
  getIngredients: (): Promise<Ingredients> =>
    orderRequests.get("/ingredients.json"),
  getOrders: (token: string | null = "", userId: string): Promise<IOrder[]> => {
    const queryParams = `?auth=${token}&orderBy="userId"&equalTo="${userId}"`;
    return orderRequests.get("/orders.json" + queryParams);
  },

  addOrder: (
    order: IOrder,
    token: string | null = null
  ): Promise<addOrderReturn> => {
    const queryParams = `?auth=${token}`;
    return orderRequests.post("/orders.json" + queryParams, order);
  },
};

export default instance;
