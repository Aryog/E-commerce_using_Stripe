import React,{useState,useEffect} from 'react'
import Products from './components/Products/Products'
import Navbar from './components/Navbar/Navbar'
import CheckOut from './components/CheckoutForm/Checkout/Checkout'
import Cart from './components/Cart/Cart'
import {commerce} from './lib/commerce'
import { BrowserRouter as Router,Route,Switch } from "react-router-dom"

const App = () => {
    const [products, setProducts] = useState([]);
    const [order, setOrder] = useState({})
    const [cart, setCart] = useState({});
    const [errorMessage, setErrorMessage] = useState('')

    const fetchProducts = async()=>{
        const {data} = await commerce.products.list();
        setProducts(data);
    }


    const fetchCart= async()=>
    {
        setCart(await commerce.cart.retrieve());
    }


    const handleAddToCart=async(productId,quantity)=>
    {
        const item = await commerce.cart.add(productId,quantity);
        setCart(item.cart);
    }

    const handleUpdateCardQty=async(productId,quantity)=>
    {
        const item = await commerce.cart.update(productId,{quantity});
        console.log("item quantity updated");
        setCart(item.cart);
    }

    const handleRemoveFromCart=async(productId)=>
    {
        const item = await commerce.cart.remove(productId);
        setCart(item.cart);
    }
    const handleEmptyCart= async ()=>
    {
        const response = await commerce.cart.empty();
        setCart(response.cart);
    }
    const Refresh =async()=>{
        const newCart = await commerce.cart.refresh();
        setCart(newCart);
    }
    const handleCaptureCheckout =async(checkoutTokenId,newOrder)=>{
        try {
            const incomingOrder = await commerce.checkout.capture(checkoutTokenId,newOrder);
            setOrder(incomingOrder);
            Refresh();
        } catch (error) {
            setErrorMessage(error.data.error.message);
        }
    }

    useEffect(() => {
        fetchProducts();
        fetchCart();
    }, []);
    return (
        <div>
                        <Router>
                        <Navbar totalItems={cart.total_items}/>
                <Switch>
                            <Route exact path='/'>
                                <Products products={products} handleAddToCart={handleAddToCart}/>
                            </Route>
                            <Route exact path='/cart'>
                                <Cart cart={cart}
                                handleEmptyCart={handleEmptyCart}
                                handleUpdateCardQty={handleUpdateCardQty}
                                handleRemoveFromCart={handleRemoveFromCart}
                                />
                            </Route>
                            <Route exact path ='/checkout'>
                                <CheckOut cart={cart}
                                order={order}
                                onCaptureCheckout={handleCaptureCheckout}
                                error={errorMessage}
                                />
                            </Route>
                </Switch>

            </Router>
                    </div>
    )
}

export default App
