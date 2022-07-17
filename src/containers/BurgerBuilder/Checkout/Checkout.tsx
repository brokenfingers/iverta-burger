import { useEffect, useState } from 'react'
import { Route, useNavigate, useSearchParams, useMatch, Routes, useLocation, Outlet } from 'react-router-dom'
import CheckoutSummary from '../../../components/Order/CheckoutSummary/CheckoutSummary'
import Spinner from '../../../components/UI/Spinner/Spinner'
import { Ingredients } from '../../../Interfaces'
import ContactData from './ContactData/ContactData'



const Checkout = () => {

    const initState: { ingredients: Ingredients, currentPath: string } = {
        ingredients: {
        },
        currentPath: ''
    }
    const [checkoutState, setCheckoutState] = useState(initState)
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
    const currentLocation = useLocation()

    useEffect(() => {
        let ingredients = {} as Ingredients;
        searchParams.forEach((value, key) => {
            ingredients[key] = +value
        })
        setCheckoutState(prev => ({ ...prev, ingredients: ingredients, currentPath: currentLocation.search }))
        console.log(checkoutState)
    }, [])


    let checkoutJSX = <Spinner />
    if (Object.keys(checkoutState.ingredients).length) {
        checkoutJSX = <CheckoutSummary
            ingredients={checkoutState.ingredients}
            checkoutCanceled={() => { navigate(-1) }}
            checkoutContinued={() => { navigate('contact-data') }}
        />
    }

    // let match =
    return (
        <div>
            {checkoutJSX}
            <Outlet />
        </div>
    )


}

export default Checkout