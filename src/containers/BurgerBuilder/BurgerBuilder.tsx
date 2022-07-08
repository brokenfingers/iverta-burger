
import React, { Component } from 'react'
import Burger from '../../components/Burger/Burger'
import Aux from '../../hoc/Auxx'



class BurgerBuilder extends Component {
    // constructor(props:{}) {
    //     super(props)
    //     this.state = {}
    // }
    state = {
        ingredients:{
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0 
        }
        
    }


    render() {
        return <Aux>
            <Burger ingredients={this.state.ingredients}/>
            <div>Burger Controls</div>
        </Aux>
    }

}

export default BurgerBuilder