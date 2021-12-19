import React from 'react'
import {Grid} from '@material-ui/core'
import Product from '../Product/Product'
import useStyles from './style'

// const products =[
//     { id: 1, name : "Shoes" , description : "Running shoes.",price:'$5',image:"https://media.istockphoto.com/photos/modern-sport-shoes-picture-id623270836?k=20&m=623270836&s=612x612&w=0&h=C0WdoMeoHYugJy8mVgrTl8p1U8DltiZ25AzzjGY05GA="},
//     {id : 2, name: "MacBook",description: 'Apple Macbook' ,price:"$10",image: "https://i.ytimg.com/vi/VuVhwh-IVVg/maxresdefault.jpg"}
// ]
const Products =({products , handleAddToCart})=>{
    const classes = useStyles();
    return (
    <main className={classes.content}>
        <div className={classes.toolbar}/>
        <Grid container justify='center' spacing = {4}>
        {
            products.map((product)=>(
                <Grid item key={product.id} xs={11} sm={6} md={4} lg={3}>
                    <Product product={product} handleAddToCart={handleAddToCart}/>
                </Grid>
            ))
        }
        </Grid>
    </main>
    )

}
export default Products;