import Aux from '../../../hoc/Auxx'

interface Props {
    ingredients: { [key: string]: number }
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
            <p>Continue to checkout?</p>
        </Aux>
    )
}

export default OrderSummary