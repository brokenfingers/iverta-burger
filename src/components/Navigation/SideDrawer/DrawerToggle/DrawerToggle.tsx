import classes from './DrawerToggle.module.css'
import drawerToggleImg from '../../../../assets/images/hamburger.png'

interface Props {
    open:()=>void
}

const DrawerToggle = (props:Props) => (
    <div className={classes.DrawerToggle} onClick={props.open}>
        <img src={drawerToggleImg} alt='menu hamburger'/>
    </div>
)

export default DrawerToggle