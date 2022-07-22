import { Component } from 'react'
import Auxx from '../Auxx/Auxx'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import classes from './Layout.module.css'

interface Props {
    children: React.ReactNode;
};

interface State {
    showSideDrawer: boolean
}



class Layout extends Component<Props, State> {

    state = {
        showSideDrawer: false
    }

    sideDrawerClosedHandler = () => {
        this.setState({ showSideDrawer: false })
    }

    sideDrawerOpenHandler = () => {
        this.setState(prevState => {
            return { showSideDrawer: !prevState.showSideDrawer }
        })
    }

    render() {
        return (
            <Auxx>
                <Toolbar openSidedrawer={this.sideDrawerOpenHandler} />
                <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler} />
                <div>Toolbar, SideBar, Backdrop</div>
                <main className={classes.Content}>
                    {
                        this.props.children
                    }
                </main>

            </Auxx>
        )
    }

}






export default Layout