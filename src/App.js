import React,{useState,useEffect} from 'react'
import Products from './components/Products/Products'
import Navbar from './components/Navbar/Navbar'
import Cart from './components/Cart/Cart'
import {commerce} from './lib/commerce'
import { BrowserRouter as Router,Route,Switch } from "react-router-dom"

const App = () => {
    const [products, setProducts] = useState([]);

    const [cart, setCart] = useState({});

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
                </Switch>

            </Router>
                    </div>
    )
}

export default App
