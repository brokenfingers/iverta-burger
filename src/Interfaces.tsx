

export interface Ingredients {
    [key:string]:number;
}

export interface IBurgerBuilder{
    ingredients: Ingredients;
    totalPrice: number;
    purchasable: boolean;
    purchasing: boolean;
    loading: boolean;
    error: boolean
}