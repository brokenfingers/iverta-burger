

import { Ingredients } from '../../../Interfaces'

import Burger from "../../Burger/Burger"
import Button from '../../UI/Button/Button'
import classes from './CheckoutSummary.module.css'

interface Props {
    ingredients: Ingredients
    checkoutCanceled: () => void
    checkoutContinued: () => void

}

const CheckoutSummary = (props: Props) => {

    return (
        <div className={classes.CheckoutSummary}>
            <h1>We hope it tastes well!</h1>
            <div style={{ width: "100%", margin: 'auto' }}>
                <Burger ingredients={props.ingredients} />
            </div>
            <Button btnType='Danger' clicked={props.checkoutCanceled}>CANCEL</Button>
            <Button btnType='Success' clicked={props.checkoutContinued}>SUCCESS</Button>
        </div>
    )
}

export default CheckoutSummary