import classes from './BuildControl.module.css'
// import {type} from '../../../../containers/BurgerBuilder/BurgerBuilder'

interface Props   {
    label: string
    added: ()=>void
    removed: ()=>void
}




const BuildControl = (props:Props) => (
   <div className={classes.BuildControl}> 
        <div className={classes.Label}>{props.label}</div>
        <button className={classes.Less} onClick={props.removed}>LESS</button>
        <button className={classes.More} onClick={props.added}>MORE</button>
   </div>
)

export default BuildControl