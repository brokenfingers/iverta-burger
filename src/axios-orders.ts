import axios, { AxiosResponse } from "axios";
import { Ingredients, IOrder } from "./Interfaces";
// import axios, { AxiosRequestConfig } from 'axios'

export interface iResponse {
  data: IOrder;
}

// interface AxiosInstance {
//     request<T = IOrder, R = AxiosResponse<T>>(config: AxiosRequestConfig): Promise<R>;
// }

const instance = axios.create({
  baseURL:
    "https://iverta-burger-default-rtdb.europe-west1.firebasedatabase.app",
});

const responseBody = (response: AxiosResponse) => response.data;

const orderRequests = {
  get: (url: string) => instance.get<Ingredients>(url).then(responseBody),
  post: (url: string, body: IOrder) =>
    instance.post<IOrder>(url, body).then(responseBody),
  // delete: (url: string) => instance.delete<Book>(url).then(responseBody),
};

type addOrderReturn = { name: string };

export const axiosOrders = {
  getIngredients: (): Promise<Ingredients> =>
    orderRequests.get("/ingredients.json"),
  getOrders: (): Promise<IOrder[]> => orderRequests.get("/orders.json"),
  // getSingleBook : (isbn: string): Promise<Book> => bookRequests.get(`/books/${isbn}`),
  addOrder: (order: IOrder): Promise<addOrderReturn> =>
    orderRequests.post("/orders.json", order),
  // deleteBook : (isbn: string): Promise<Book> => bookRequests.delete(`/books/${isbn}`)
};

// import Books from './api' // config added in api.ts file
// const [books, setBooks] = React.useState<Book[]>([]);
// Books.getPosts()
//     .then((data) => {
//         setBooks(data);
//     })
//     .catch((err) => {
//         console.log(err);
//     });

export default instance;
