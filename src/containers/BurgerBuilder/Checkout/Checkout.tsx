import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import CheckoutSummary from '../../../components/Order/CheckoutSummary/CheckoutSummary'
import Spinner from '../../../components/UI/Spinner/Spinner'
import { Ingredients } from '../../../Interfaces'

const Checkout = () => {

    const initState: { ingredients: Ingredients } = {
        ingredients: {
        }
    }
    const [checkoutState, setCheckoutState] = useState(initState)
    const [searchParams] = useSearchParams()

    useEffect(() => {
        let ingredients = {} as Ingredients;
        searchParams.forEach((value, key) => {
            ingredients[key] = +value
        })
        setCheckoutState(prev => ({ ...prev, ingredients: ingredients }))
        console.log(checkoutState)
    }, [])

    const navigate = useNavigate()

    let checkoutJSX = <Spinner />
    if (Object.keys(checkoutState.ingredients).length) {
        checkoutJSX = <CheckoutSummary
            ingredients={checkoutState.ingredients}
            checkoutCanceled={() => { navigate(-1) }}
            checkoutContinued={() => { navigate('checkout/contact-data') }}
        />
    }

    return (
        <div>
            {checkoutJSX}
        </div>
    )


}

export default Checkout