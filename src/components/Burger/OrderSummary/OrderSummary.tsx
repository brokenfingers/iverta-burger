import { Component } from 'react'
import Aux from '../../../hoc/Auxx/Auxx'
import Button from '../../UI/Button/Button'

interface Props {
    ingredients: { [key: string]: number }
    purchaseCanceled: () => void
    purchaseContinued: () => void
    price: number
}

class OrderSummary extends Component<Props> {
    // componentDidUpdate() {
    //     console.log('[OrderSummary] WillUpdate')
    // }
    render() {
        const ingredientSummary = Object.keys(this.props.ingredients).map(igKey => <li key={igKey}><span style={{ textTransform: 'capitalize' }}>{igKey}</span>: {this.props.ingredients[igKey]} </li>)
        return (
            <Aux>
                <h3>Your order</h3>
                <p>A delicious burger with the following ingredients:</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>Total Price: {this.props.price.toFixed(2)}$</strong></p>
                <p>Continue to checkout?</p>
                <Button btnType='Danger' clicked={this.props.purchaseCanceled}>CANCEL</Button>
                <Button btnType='Success' clicked={this.props.purchaseContinued}>CONTINUE</Button>
            </Aux>
        )
    }
}

export default OrderSummary