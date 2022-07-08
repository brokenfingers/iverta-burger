import classes from './BuildControl.module.css'
interface Props   {
    label: string
}


const BuildControl = (props:Props) => (
   <div className={classes.BuildControl}> 
        <div className={classes.Label}>{props.label}</div>
        <button className={classes.Less}>LESS</button>
        <button className={classes.More}>MORE</button>
   </div>
)

export default BuildControl