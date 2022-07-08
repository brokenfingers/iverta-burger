interface Props   {
    label: string
}

import classes from './buildControl.module.css'

const buildControl = (props:Props) => (
   <div className={classes.BuildControl}> 
        <div className={classes.Label}>{props.label}</div>
        <button className={classes.Less}>LESS</button>
        <button className={classes.More}>MORE</button>
   </div>
)

export default buildControl