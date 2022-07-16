import { useEffect, useState } from "react";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Burger from "../../components/Burger/Burger";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Modal from "../../components/UI/Modal/Modal";
import Aux from "../../hoc/Auxx/Auxx";

import Axios, { axiosOrders } from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import { Ingredients, IBugerBuilderState } from "../../Interfaces";
import { createSearchParams, ParamKeyValuePair, useNavigate, useSearchParams } from "react-router-dom";

export type type = "salad" | "bacon" | "cheese" | "meat";

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7,
};


export const BurgerBuilder = () => {
    const initState: IBugerBuilderState = {
        ingredients: {} as Ingredients,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false,
    };
    const navigate = useNavigate()
    const [state, setState] = useState(initState)
    const purchaseHandler = () => {
        setState(prev => ({ ...prev, purchasing: true }));
    };

    useEffect(() => {
        axiosOrders
            .getIngredients()
            .then(response => setState(prev => ({ ...prev, ingredients: response })))
            .catch((error) => {
                setState(prev => ({ ...prev, error: true }));
            });
    }, [])

    const updatePurchaseState = (ingredients: { [key: string]: number }) => {
        const sum = Object.keys(ingredients)
            .map((igKey) => ingredients[igKey])
            .reduce((newSum, el) => newSum + el, 0);
        setState(prev => ({ ...prev, purchasable: sum > 0 }));
    }

    const addIngredientHandles = (type: type) => {
        const oldCount = state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...state.ingredients,
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        setState(prev => ({ ...prev, totalPrice: newPrice, ingredients: updatedIngredients }));
        updatePurchaseState(updatedIngredients);
    };
    const purchaseCancelHandler = () => {
        setState(prev => ({ ...prev, purchasing: false }));
    };

    const purchaseContinueHandler = () => {
        // this.setState({ loading: true })
        // const order = {
        //     ingredients: this.state.ingredients,
        //     price: this.state.totalPrice,
        //     customer: {
        //         name: 'Stasys',
        //         address: {
        //             street: 'Procincijos 20',
        //             postCode: 'lt61321',
        //             country: 'Lithuania'
        //         },
        //         email: 'baranku20@gmail.com'
        //     },
        //     deliveryMethod: 'fastest'
        // }
        // axiosOrders.addOrder(order)
        //     .then(response => { this.setState({ loading: false, purchasing: false }) })
        //     .catch(err => { this.setState({ loading: false, purchasing: false }) })


        const search = Object.entries(state.ingredients).map(arr => arr.map(arr2 => arr2)) as ParamKeyValuePair[]


        navigate({
            pathname: '/checkout',
            search: `?${createSearchParams(search)}`
        })
    }

    const removeIngredientHandles = (type: type) => {
        const oldCount = state.ingredients[type];
        if (oldCount <= 0) {
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...state.ingredients,
        };
        updatedIngredients[type] = updatedCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        setState(prev => ({ ...prev, totalPrice: newPrice, ingredients: updatedIngredients }));
        updatePurchaseState(updatedIngredients);
    };

    const disabledInfo: { [key: string]: number | boolean } = {
        ...state.ingredients,
    };

    for (let key in disabledInfo) {
        disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSummary = null;

    let burger = state.error ? (
        <p>Ingredients can't be loaded!</p>
    ) : (
        <Spinner />
    );
    if (Object.keys(state.ingredients).length) {
        burger = (
            <Aux>
                <Burger ingredients={state.ingredients} />
                <BuildControls
                    ingredientAdded={addIngredientHandles}
                    ingredientRemove={removeIngredientHandles}
                    disabled={disabledInfo}
                    price={state.totalPrice}
                    purchasable={state.purchasable}
                    ordered={purchaseHandler}
                />
            </Aux>
        );

        orderSummary = (
            <OrderSummary
                ingredients={state.ingredients}
                purchaseCanceled={purchaseCancelHandler}
                purchaseContinued={purchaseContinueHandler}
                price={state.totalPrice}
            />
        );
        if (state.loading) {
            orderSummary = <Spinner />;
        }
    }

    return (
        <Aux>
            <Modal
                show={state.purchasing}
                modalClosed={purchaseCancelHandler}
            >
                {orderSummary}
            </Modal>
            {burger}
        </Aux>
    );

}

// export default BurgerBuilder
export default withErrorHandler(BurgerBuilder, Axios);

// export class BurgerBuilder extends Component<IProps, IBugerBuilderState> {

// state = {
//     ingredients: {} as Ingredients,
//     totalPrice: 4,
//     purchasable: false,
//     purchasing: false,
//     loading: false,
//     error: false,
// };

// purchaseHandler = () => {
//     this.setState({ purchasing: true });
// };

// componentDidMount() {
//     axiosOrders
//         .getIngredients()
//         .then((response) => this.setState({ ingredients: response }))
//         .catch((error) => {
//             this.setState({ error: true });
//         });
// }

// updatePurchaseState(ingredients: { [key: string]: number }) {
//     const sum = Object.keys(ingredients)
//         .map((igKey) => ingredients[igKey])
//         .reduce((newSum, el) => newSum + el, 0);
//     this.setState({ purchasable: sum > 0 });
// }

// addIngredientHandles = (type: type) => {
//     const oldCount = this.state.ingredients[type];
//     const updatedCount = oldCount + 1;
//     const updatedIngredients = {
//         ...this.state.ingredients,
//     };
//     updatedIngredients[type] = updatedCount;
//     const priceAddition = INGREDIENT_PRICES[type];
//     const oldPrice = this.state.totalPrice;
//     const newPrice = oldPrice + priceAddition;
//     this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
//     this.updatePurchaseState(updatedIngredients);
// };

// purchaseCancelHandler = () => {
//     this.setState({ purchasing: false });
// };

// purchaseContinueHandler = () => {
    // this.setState({ loading: true })
    // const order = {
    //     ingredients: this.state.ingredients,
    //     price: this.state.totalPrice,
    //     customer: {
    //         name: 'Stasys',
    //         address: {
    //             street: 'Procincijos 20',
    //             postCode: 'lt61321',
    //             country: 'Lithuania'
    //         },
    //         email: 'baranku20@gmail.com'
    //     },
    //     deliveryMethod: 'fastest'
    // }
    // axiosOrders.addOrder(order)
    //     .then(response => { this.setState({ loading: false, purchasing: false }) })
    //     .catch(err => { this.setState({ loading: false, purchasing: false }) })

    // this.props.redir();

// };

// removeIngredientHandles = (type: type) => {
//     const oldCount = this.state.ingredients[type];
//     if (oldCount <= 0) {
//         return;
//     }
//     const updatedCount = oldCount - 1;
//     const updatedIngredients = {
//         ...this.state.ingredients,
//     };
//     updatedIngredients[type] = updatedCount;
//     const priceDeduction = INGREDIENT_PRICES[type];
//     const oldPrice = this.state.totalPrice;
//     const newPrice = oldPrice - priceDeduction;
//     this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
//     this.updatePurchaseState(updatedIngredients);
// };

// render() {
//     const disabledInfo: { [key: string]: number | boolean } = {
//         ...this.state.ingredients,
//     };

//     for (let key in disabledInfo) {
//         disabledInfo[key] = disabledInfo[key] <= 0;
//     }
//     let orderSummary = null;

//     let burger = this.state.error ? (
//         <p>Ingredients can't be loaded!</p>
//     ) : (
//         <Spinner />
//     );
//     if (Object.keys(this.state.ingredients).length) {
//         burger = (
//             <Aux>
//                 <Burger ingredients={this.state.ingredients} />
//                 <BuildControls
//                     ingredientAdded={this.addIngredientHandles}
//                     ingredientRemove={this.removeIngredientHandles}
//                     disabled={disabledInfo}
//                     price={this.state.totalPrice}
//                     purchasable={this.state.purchasable}
//                     ordered={this.purchaseHandler}
//                 />
//             </Aux>
//         );

//         orderSummary = (
//             <OrderSummary
//                 ingredients={this.state.ingredients}
//                 purchaseCanceled={this.purchaseCancelHandler}
//                 purchaseContinued={this.purchaseContinueHandler}
//                 price={this.state.totalPrice}
//             />
//         );
//         if (this.state.loading) {
//             orderSummary = <Spinner />;
//         }
//     }

//     return (
//         <Aux>
//             <Modal
//                 show={this.state.purchasing}
//                 modalClosed={this.purchaseCancelHandler}
//             >
//                 {orderSummary}
//             </Modal>
//             {burger}
//         </Aux>
//     );
// }
// }

// export default withErrorHandler(BurgerBuilder, Axios);
