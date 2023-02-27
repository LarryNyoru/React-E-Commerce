
import React from 'react'
import { Container , Typography , Button , Grid } from '@material-ui/core'
import useStyles from './styles'
import CartItems from './cartItems/CartItems'
import { Link } from 'react-router-dom'


const Cart = ({cart, updateCartQuantity ,handleRemoveFromcart , handleEmptyCart}) => {
    const classes = useStyles()
    const isEmpty = !cart?.total_line_items  

    // check if cart is empty
   
        const EmptyCart = ()=>(
            <Typography variant='subtitle1'> 
                 your cart is empty 
                <Button component={Link} to="/" variant='containe' color='blue' size='large' className={classes.checkOutButton}> Add Items</Button>
            </Typography>
            
        )

    
    
    //if its not empty then perform following 

    const FilledCart = ()=>(
        <div>
            <Grid container spacing={3}>
                {cart?.line_items?.map( (item) => (
                    <Grid item xs={12} sm={4} key={item.id} >
                        <CartItems item={item} onAddToCart={updateCartQuantity} onRemoveFromCart={handleRemoveFromcart} />

                    </Grid>
                ))}
            </Grid>
            <div className={classes.cardDetails}>
                <Typography variant='h4'> subtotal: {cart?.subtotal?.formatted_with_symbol}</Typography>
                <div>
                    <Button className={classes.emptyButton} size="large" type="button" variant="contained" color="secondary" onClick={handleEmptyCart}>
                        Empty Cart

                    </Button>
                    <Button  component={Link} to="/checkout" className={classes.checkOutButton} size="large" type="button" variant="contained" color="primary" >
                        Check Out

                    </Button>
                </div>
                
            </div>
        </div>

    )
    //if(isEmpty) return 'Loading ......'

  return (
    <Container>
        <div  className={classes.toolbar} style={{background:'LightCyan'}}/>
        <Typography className={classes.title} variant='h3' gutterBottom> Your Shopping cart</Typography>
        {  <FilledCart />} 
        {/* isEmpty? <EmptyCart /> : */}
       

    </Container>
  )
}

export default Cart

