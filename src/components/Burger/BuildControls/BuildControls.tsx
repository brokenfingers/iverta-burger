import classes from './BuildControls.module.css'
import BuildControl from './BuiltControl/BuildControl'

import { type } from '../../../containers/BurgerBuilder/BurgerBuilder'


interface Props {
    ingredientAdded: (type: type) => void
    ingredientRemove: (type: type) => void
    disabled: { [key: string]: number | boolean }
    price: number
    purchasable: boolean
}

const controls: { label: string, type: type }[] = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' }
]

const BuildControls = (props: Props) => (
    <div className={classes.BuildControls}>
        <p>Current Price: <strong>{props.price.toFixed(2)}$</strong></p>
        {
            controls.map(ctrl => (
                <BuildControl
                    key={ctrl.label}
                    label={ctrl.label}
                    added={() => props.ingredientAdded(ctrl.type)}
                    removed={() => props.ingredientRemove(ctrl.type)}
                    disabled={props.disabled[ctrl.type]}
                />
            ))
        }
        <button className={classes.OrderButton}
            disabled={!props.purchasable}
        >ORDER NOW</button>
    </div>
)

export default BuildControls