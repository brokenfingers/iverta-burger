
import { Component } from 'react'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Burger from '../../components/Burger/Burger'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Modal from '../../components/UI/Modal/Modal'
import Aux from '../../hoc/Auxx/Auxx'
import Axios, { axiosOrders} from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import {Ingredients, IBurgerBuilder} from '../../Interfaces'


export type type = 'salad' | 'bacon' | 'cheese' | 'meat'


const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

interface IProps {
    
}



export class BurgerBuilder extends Component<IProps, IBurgerBuilder> {
    // constructor(props:{}) {
    //     super(props)
    //     this.state = {}
    // }
    state = {
        ingredients: {} as Ingredients,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    purchaseHandler = () => {
        this.setState({ purchasing: true })
        
    }

    componentDidMount () {
        axiosOrders.getIngredients()
        .then(response=>this.setState({ingredients:response}))
        .catch(error => {this.setState({error: true})})
    }

    updatePurchaseState(ingredients: { [key: string]: number }) {
        const sum = Object.keys(ingredients).map(igKey => ingredients[igKey]).reduce((newSum, el) => newSum + el, 0)
        this.setState({ purchasable: sum > 0 })
    }

    addIngredientHandles = (type: type) => {

        const oldCount = this.state.ingredients[type]
        const updatedCount = oldCount + 1
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({ totalPrice: newPrice, ingredients: updatedIngredients })
        this.updatePurchaseState(updatedIngredients)
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false })
    }

    purchaseContinueHandler = () => {

        this.setState({ loading: true })
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Stasys',
                address: {
                    street: 'Procincijos 20',
                    postCode: 'lt61321',
                    country: 'Lithuania'
                },
                email: 'baranku20@gmail.com'
            },
            deliveryMethod: 'fastest'
        }
        axiosOrders.addOrder(order)
            .then(response => { this.setState({ loading: false, purchasing: false }) })
            .catch(err => { this.setState({ loading: false, purchasing: false }) })

    }

    removeIngredientHandles = (type: type) => {

        const oldCount = this.state.ingredients[type]
        if (oldCount <= 0) {
            return
        }
        const updatedCount = oldCount - 1
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({ totalPrice: newPrice, ingredients: updatedIngredients })
        this.updatePurchaseState(updatedIngredients)
    }



    render() {
        const disabledInfo: { [key: string]: number | boolean } = {
            ...this.state.ingredients
        }

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        let orderSummary = null
        
        
        let burger = this.state.error ? <p>Ingredients can't be loaded!</p> : <Spinner/>
        if(Object.keys(this.state.ingredients).length) {
           burger = (
                    <Aux>
                        <Burger ingredients={this.state.ingredients} />
                        <BuildControls ingredientAdded={this.addIngredientHandles}
                            ingredientRemove={this.removeIngredientHandles}
                            disabled={disabledInfo}
                            price={this.state.totalPrice}
                            purchasable={this.state.purchasable}
                            ordered={this.purchaseHandler}
                        />
                    </Aux>
                ) 

                orderSummary = <OrderSummary
                    ingredients={this.state.ingredients}
                    purchaseCanceled={this.purchaseCancelHandler}
                    purchaseContinued={this.purchaseContinueHandler}
                    price={this.state.totalPrice}
                />
                if (this.state.loading) {
                    orderSummary = <Spinner />
                }
        }
        
        return <Aux>
            <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                {orderSummary}
            </Modal>
            {burger}
        </Aux>
    }

}




export default withErrorHandler(BurgerBuilder, Axios) 