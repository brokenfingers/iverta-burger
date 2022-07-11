import Logo from '../../Logo/Logo'
import classes from './Toolbar.module.css'

interface Props {

}

const Toolbar = (props:Props) => (
    <header className={classes.Toolbar}>
        <div>MENU</div>
        <Logo/>
        <nav>
            ...
        </nav>
    </header>
)

export default Toolbar