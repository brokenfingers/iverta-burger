import Aux from '../../../hoc/Auxx'
import Button from '../../UI/Button/Button'

interface Props {
    ingredients: { [key: string]: number }
    purchaseCanceled: () => void
    purchaseContinued: () => void
    price: number
}

const OrderSummary = (props: Props) => {
    const ingredientSummary = Object.keys(props.ingredients).map(igKey => <li key={igKey}><span style={{ textTransform: 'capitalize' }}>{igKey}</span>: {props.ingredients[igKey]} </li>)
    return (
        <Aux>
            <h3>Your order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total Price: {props.price.toFixed(2)}$</strong></p>
            <p>Continue to checkout?</p>
            <Button btnType='Danger' clicked={props.purchaseCanceled}>CANCEL</Button>
            <Button btnType='Success' clicked={props.purchaseContinued}>CONTINUE</Button>
        </Aux>
    )
}

export default OrderSummary