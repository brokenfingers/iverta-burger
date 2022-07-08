import { string } from "prop-types";
import React, { Component } from "react";
import PropTypes, {InferProps} from 'prop-types'

// class BurgerIngredients extends Component {
//     render() {
//         return <div></div>
//     }
// }

// export default BurgerIngredients


import classes from './BurgerIngredients.module.css'

interface Props {
    type: string
}

class BurgerIngredients extends Component<Props, Props>  {
    // static defaultProps = {
    //     type: string.isRequired
    // }
    static propType = {
        type: string.isRequired
    }
    // constructor(props:Props){
    //     super(props)
        
    // }
    render() {
        let ingredient = null
        switch (this.props.type) {
            case 'bread-bottom':
                ingredient = <div className={classes.BreadBottom}></div>
                break;
            case 'bread-top':
                ingredient = (
                    <div className={classes.BreadTop}>
                        <div className={classes.Seeds1}></div>
                        <div className={classes.Seeds2}></div>
    
                    </div>
                )
                break;
            case 'meat':
                ingredient = <div className={classes.Meat}></div>
                break;
            case 'cheese':
                ingredient = <div className={classes.Cheese}></div>
                break;
            case 'salad':
                ingredient = <div className={classes.Salad}></div>
                break;
            case 'bacon':
                ingredient = <div className={classes.Bacon}></div>
                break;
            default:
                ingredient = null
        }
        return ingredient
    }
}

// BurgerIngredients.propType = {
//     type: string.isRequired
// }

export default BurgerIngredients