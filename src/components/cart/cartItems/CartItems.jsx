
import React from "react"
import { Typography , Button , Card, CardActions, CardContent, CardMedia } from "@material-ui/core"
import useStyles from './styles'

const CartItems = ({item , onAddToCart, onRemoveFromCart}) => {
    const classes= useStyles
  return (
    <Card   style={{height:'100%'}}>
      <CardMedia className={classes.media}> <img src={item.image.url}   alt='item' style={{width:'100%'}} /></CardMedia>
      <CardContent>
        <Typography variant="h4">{item.name}</Typography>
        <Typography variant="h5">{item.line_total.formatted_with_symbol}</Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <div className={classes.buttons}>
            <Button type="button" size="small" onClick={()=>onAddToCart(item.id , { quantity: item.quantity-1 })}>-</Button>
            <Typography>{item.quantity}</Typography>
            <Button type="button" size="small" onClick={()=>{
              
              onAddToCart(item.id , { quantity: item.quantity+1 })}}>+</Button>

        </div>
        <Button type="button" variant="contained" color="secondary" onClick={()=> onRemoveFromCart(item?.id)}>Remove</Button>

      </CardActions>
    </Card>
  )
}

export default CartItems

