import Auxx from '../../hoc/Auxx'
import classes from './Layout.module.css'

type Props = {
    children: React.ReactNode;
};

const Layout = (props: Props) => (
    <Auxx>
        <div>Toolbar, SideBar, Backdrop</div>
        <main className={classes.Content}>
            {
                props.children
            }
        </main>

    </Auxx>
)







export default Layout