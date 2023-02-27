import React from 'react'
import { Divider, Typography ,Button } from '@material-ui/core'
import { Elements ,CardElement ,ElementsConsumer } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import Review from './Review'

/*process.env.REACT_APP_STRIPE_PUBLIC_KEY*/
const stripePromise = loadStripe('pk_test_51MdYAbADW0eBHQO1KtMUHqqslGTM7bdiya3afnOlbq16Eb83Kq22oeCpE1ebpBRaD1scDegPmczFezX633S5h0Dv00SkX0eOAX')

const PaymentForm = ( {checkoutToken , prevStep, shippingData, onHandleCheckOut,nextStep}) => {
  

  const handleSubmit = async (event, elements ,stripe)=>{
    event.preventDefault()

    if(!stripe || !elements) return
    const cardElement = elements.getElement(CardElement) 

    const {error ,paymentMethod} = await stripe.createPaymentMethod({type:'card' , card: cardElement})

    if(error){
      console.log(error)
    }
    else{
      const orderData ={
        line_items: checkoutToken.line_items ,
        customer: {firstname: shippingData.firstName , lastName: shippingData.lastName , email: shippingData.email},
        shipping :{
          name:'primary',
          county_state:shippingData.shippingSubdivision, 
          country :shippingData.shippingCountry

        },
        fulfillment : {shipping_method:shippingData.shippingOption},
        payment:{
          gateway : 'stripe',
          stripe :{
            payment_method_id : paymentMethod.id
          }
        }
      }
      onHandleCheckOut(checkoutToken.id , orderData)
      nextStep()
    }

  } //onSubmit={(e)=>handleSubmit(e,elements,stripe)}
  return (
    <>
      <Review  checkoutToken={checkoutToken}/>
      <Divider />
      <Typography variant='h6' gutterBottom style={{margin:'20px 0'}}>Payment Method</Typography>
      <Elements stripe={stripePromise}>
        <ElementsConsumer>
          {({elements , stripe})=>(
            <form onSubmit={(e)=>handleSubmit(e,elements,stripe)} >
              <CardElement />
              <br /> <br />
              <div style={{display : 'flex' , justifyContent:'space-between'}}>
                <Button onClick={prevStep} variant='outlined'>Back</Button>
                <Button type='submit' variant='contained' disabled={!stripe} color='primary'> 
                  Pay {checkoutToken.subtotal.formatted_with_symbol}
                </Button>
              </div>
            </form>

          )}
        </ElementsConsumer>


      </Elements>
    </>
  )
}

export default PaymentForm
