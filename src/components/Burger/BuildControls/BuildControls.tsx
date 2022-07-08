import classes from './BuildControls.module.css'
import BuildControl from './BuiltControl/BuildControl'

interface Props {

}

const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Meat', type: 'meat'}
]

const BuildControls = (props:Props) => (
    <div className={classes.BuildControls}>
        {
            controls.map(ctrl => (
                <BuildControl key={ctrl.label} label={ctrl.label} />
            ))
        }
    </div>
)

export default BuildControls