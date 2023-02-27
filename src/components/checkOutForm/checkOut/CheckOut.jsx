import React from 'react'
import { useState , useEffect } from 'react'
import { StepLabel , Paper ,Step , Typography,Stepper,  CircularProgress , Divider ,  Button } from '@material-ui/core'
import useStyles from './styles'
import AddressForm from '../AddressForm'
import PaymentForm from '../PaymentForm'
import { commerce } from '../../../lib/commerce'
import { Link , useNavigate } from 'react-router-dom'


const steps = ['Shipping adress' , 'Payment details']

const CheckOut = ({cart , order ,onHandleCheckOut, error}) => {
  const classes= useStyles()
  const navigate = useNavigate

  const [activeStep , setActiveStep ]= useState(0)
  const [shippingData , setShippingData] = useState({})
  const [checkoutToken, setCheckoutToken] = useState(null)
  
  useEffect(()=>{
    const generateToken = async ()=>{
      try{
        const token = await commerce.checkout.generateToken( cart.id , {type:'cart'})

        console.log(token , ' my is here token')
        console.log(checkoutToken ,'checkoutToken')
        setCheckoutToken(token)

      }
      catch (error){
        if (activeStep !== steps.length) navigate('/');

      }
    }
    generateToken()

  },[cart])

  
   const nextStep= ()=> setActiveStep((prevActiveStep)=> prevActiveStep + 1)
   const prevStep = ()=> setActiveStep((prevActiveStep)=> prevActiveStep -1)
   
   const test = (data)=>{

    setShippingData(data)
    nextStep()

   }

 let Confirmation = ()=> order.customer(
    <>
      <div>
        <Typography variant='h5' >Thank you for your purchase , {order.customer.lastname} {order.customer.firstname}</Typography>
        <Divider className={classes.divider}/>
        <Typography variant='subtitle2'> Order ref : {order.customer_refernce}</Typography>
      </div>
      <br />
      <Button component={Link} to='/' type='button' variant='outlined'> Back Home</Button>
    </>
  )  (
    <di className={classes.spinner}>
      <CircularProgress />

    </di>

  )
  if(error){
    <>
      <Typography variant='h5'>Error : {error}</Typography>
    </>

  }
  

  const Form = () => (
    activeStep === 0
      ? <AddressForm  checkoutToken={checkoutToken} test ={test}/>
      : <PaymentForm  shippingData={shippingData} checkoutToken={checkoutToken} nextStep={nextStep} prevStep={prevStep} onHandleCheckOut={onHandleCheckOut}/>
 )
  
  return (
    <>
        <div className={classes.toolbar} />
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Typography variant='h4' align='centre'> CheckOut</Typography>
            <Stepper activeStep={activeStep} className={classes.stepper}>
              {steps.map((step)=>(
                <Step key={step}>
                  <StepLabel>{step}</StepLabel>
                  
                </Step>

              ))}
            </Stepper>
            {activeStep === steps.length ? <Confirmation /> : checkoutToken && <Form />}
          </Paper>

        </main>
      
    </>
  )
}

export default CheckOut
