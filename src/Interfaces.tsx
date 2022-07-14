

export interface Ingredients {
    [key: string]: number;
}

export interface IBugerBuilderState {
    ingredients: Ingredients;
    totalPrice: number;
    purchasable: boolean;
    purchasing: boolean;
    loading: boolean;
    error: boolean
}