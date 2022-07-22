
export type IngredientNames = 'salad' | 'meat' | 'cheese' | 'bacon'

export type Ingredients = { [K in IngredientNames]: number }



export interface IBugerBuilderState {
  ingredients: Ingredients;
  totalPrice: number;
  purchasable: boolean;
  purchasing: boolean;
  loading: boolean;
  error: boolean;
}

export interface ICheckoutState {
  ingredients: Ingredients;
  price: number;
}

export interface IStringObject {
  [key: string]: string;
}

export interface IOrder {
  ingredients: Ingredients;
  price: number;
  orderData: IStringObject;
  deliveryMethod: string;
  id?: string; //used in Order.tsx
}

export type InputTypes = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement