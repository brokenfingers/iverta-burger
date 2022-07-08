import classes from './BuildControls.module.css'
import BuildControl from './BuiltControl/BuildControl'

import {type} from '../../../containers/BurgerBuilder/BurgerBuilder'


interface Props {
    ingredientAdded: (type:type)=>void
    ingredientRemove: (type:type)=>void
}

const controls:{label:string, type:type}[] = [
    {label: 'Salad', type: 'salad'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Meat', type: 'meat'}
]

const BuildControls = (props:Props) => (
    <div className={classes.BuildControls}>
        {
            controls.map(ctrl => (
                <BuildControl 
                key={ctrl.label} 
                label={ctrl.label} 
                added={()=>props.ingredientAdded(ctrl.type)} 
                removed={()=>props.ingredientRemove(ctrl.type)} 
                />
            ))
        }
    </div>
)

export default BuildControls