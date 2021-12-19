import React from 'react'
import {Card,CardMedia,CardContent,CardActions,Typography,IconButton} from '@material-ui/core'
import { AddShoppingCart } from '@material-ui/icons'
import useStyles from './style'
const Product = ({product , handleAddToCart}) => {
    const classes = useStyles();
    return (
        <Card className ={classes.root}>
            <CardMedia className={classes.media} image={product.image.url} title ={product.name}/>
            <CardContent>
                <div className={classes.cardContent}>
                     <Typography variant="h5" component="h2" gutterBottom>
                        {product.name}
                     </Typography>
                     <Typography variant="h5" >
                        {product.price.formatted_with_symbol}
                     </Typography>
                </div>
                <Typography variant="body2" dangerouslySetInnerHTML={{__html:product.description}} color="textSecondary"/>
                
            </CardContent>
            <CardActions disableSpacing className={classes.CardActions}>
                <IconButton aria-label="Add to Cart" onClick={()=>handleAddToCart(product.id,1)}>
                    <AddShoppingCart/>
                </IconButton>
            </CardActions>
        </Card>
    )
}

export default Product
