import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'


interface Ingredients {
    [key: string]: number
}

export interface IOrder {
    ingredients: Ingredients,
    price: number,
    customer: {
        name: string,
        address: {
            [key: string]: string
        },
        email: string
    },
    deliveryMethod: string

}
interface AxiosCreate {
    url: string,
    data: IOrder,
    config: AxiosRequestConfig
}

const instance = axios.create({
    baseURL: 'https://iverta-burger-default-rtdb.europe-west1.firebasedatabase.app'
})

const responseBody = (response: AxiosResponse) => response.data


const orderRequests = {
    // get: (url: string) => instance.get<Book>(url).then(responseBody),
    post: (url: string, body: IOrder) => instance.post<IOrder>(url, body).then(responseBody),
    // delete: (url: string) => instance.delete<Book>(url).then(responseBody),
}

export const axiosOrders = {
    // getBooks: (): Promise<Book[]> => bookRequests.get('/books'),
    // getSingleBook : (isbn: string): Promise<Book> => bookRequests.get(`/books/${isbn}`),
    addOrder: (order: IOrder): Promise<IOrder> => orderRequests.post('/orders.json', order)
    // deleteBook : (isbn: string): Promise<Book> => bookRequests.delete(`/books/${isbn}`)
}


// import Books from './api' // config added in api.ts file
// const [books, setBooks] = React.useState<Book[]>([]);
// Books.getPosts()
//     .then((data) => {
//         setBooks(data);
//     })
//     .catch((err) => {
//         console.log(err);
//     });


export default instance