import React from 'react'
import { Typography, Button, Card,CardActions,CardContent,CardMedia } from '@material-ui/core'
import useStyles from '../CartItem/style'
const CartItem = ({item,handleUpdateCardQty,handleRemoveFromCart}) => {
    const classes  =  useStyles();
    console.log("this is item",item);
    return (
        <Card>
            <CardMedia image={item.image.url} alt={item.name} className={classes.media}/>
            <CardContent className={classes.cardContent}>
                <Typography variant='h3'>{item.name}</Typography>
                <Typography variant='h5'>{item.line_total.formatted_with_symbol}</Typography>
            </CardContent>
            <CardActions className={classes.cardActions}>
                <div className={classes.buttons}>
                    <Button type="button" onClick={() =>handleUpdateCardQty(item.id, item.quantity - 1)} size="small">-</Button>
                    <Typography>{item.quantity}</Typography>
                    <Button type="button" onClick={()=>handleUpdateCardQty(item.id,item.quantity + 1)} size="small">+</Button>
                </div>
                <Button variant="contained" onClick={()=>handleRemoveFromCart(item.id)} type="button" color="secondary">Remove</Button>
            </CardActions>

        </Card>
    )
}

export default CartItem;
