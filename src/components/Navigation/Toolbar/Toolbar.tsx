import Logo from '../../Logo/Logo'
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle'
import NavigationItems from '../NavigationItems/NavigationItems'
import classes from './Toolbar.module.css'

interface Props {
    openSidedrawer: ()=>void
}

const Toolbar = (props:Props) => (
    <header className={classes.Toolbar}>
        <DrawerToggle open={props.openSidedrawer}/>
        <Logo/>
        <nav className={classes.DesktopOnly}>
            <NavigationItems/>
        </nav>
    </header>
)

export default Toolbar