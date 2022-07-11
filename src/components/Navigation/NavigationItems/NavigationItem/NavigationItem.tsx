import classes from './NavigationItem.module.css'

interface Props{
    children: React.ReactNode;
    link:string;
    active:boolean;

}

const NavigationItem = (props:Props) => (
    <li className={classes.NavigationItem}>
        <a 
        href={props.link}
        className={props.active ? classes.active : undefined }
        >{props.children}</a>
    </li>
)

export default NavigationItem
