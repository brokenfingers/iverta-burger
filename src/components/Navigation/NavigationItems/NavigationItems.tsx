import NavigationItem from './NavigationItem/NavigationItem'
import classes from './NavigationItems.module.css'

const NavigationItems = () => (
    <ul className={classes.NavigationItems}>
        <NavigationItem active link='/'>Burger Builder</NavigationItem>
        <NavigationItem active={false} link='/'>Checkout</NavigationItem>
    </ul>
)

export default NavigationItems