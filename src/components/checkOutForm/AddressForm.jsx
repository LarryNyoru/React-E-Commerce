import React, { useState ,useEffect} from 'react'
import {   Button, Grid , Typography , Select,InputLabel,MenuItem  } from '@material-ui/core'
import { useForm,FormProvider } from 'react-hook-form'
import CustomTextField from './checkOut/CustomTextField'
import {commerce} from '../../lib/commerce'
import { Link } from 'react-router-dom'

const AddressForm = ({checkoutToken , test}) => {
  const methods = useForm()
  const [shippingCountries , setShippingCountries] = useState([])
  const[shippingCountry , setShippingCountry] = useState('') 
 
  const [shippingSubdivisions , setShippingSubdivisions] = useState([])
  const [shippingSubdivision , setShippingSubdivision] = useState('')
  
  const [shippingOptions , setShippingOptions] = useState([])
  const [shippingOption , setShippingOption] = useState('')
  //const countries = [Object.entries(shippingCountries).map(([code , name]) => ({id:code , label:name})) ]
  //console.log(countries ,'countries') 
            

  //const countriesArray = countriesObject.map((...[code ])=>({id : code, label:code}))
  //
const countries = [Object.entries(shippingCountries).map(([code , name ]) => ({ id: code, label: name }))]
console.log(countries ,'countries array')

const subdivisions = [Object.entries(shippingSubdivisions).map(([code ,name]) => ({ id: code, label:name }))]

  
const options= shippingOptions.map((ship)=>({id :ship.id , label: `${ship.description} -(${ship.price.formatted_with_symbol})` }))
console.log('shipping otions' , shippingOptions)

  const fetchShippingCountries = async(checkoutToken)=> {
    const {countries} = await commerce.services.localeListShippingCountries(checkoutToken)
    const myCountries = [Object.entries(countries).map(([code , name ]) => ({ id: code, label: name }))]
    console.log('Objects',myCountries)
    setShippingCountries(myCountries[0])
    setShippingCountry(Object.keys(countries)[0])
    console.log('Here',Object.keys(countries)[0])
    
  }
  const fetchSubdivisions = async (checkoutToken)=>{
    try {
      const {subdivisions} = await commerce.services.localeListShippingSubdivisions(checkoutToken, shippingCountry)

      const mySubdivisions = [Object.entries(subdivisions).map(([code ,name]) => ({ id: code, label:name }))]
      
        console.log(mySubdivisions ,'sub here division')

      
      setShippingSubdivisions(mySubdivisions)
      setShippingSubdivision(Object.keys(mySubdivisions)[0][0]) 
    } catch (error) {
      console.log("My error is here",error)
    }


  }
  const fetchShippingOptions = async(checkoutToken , country , region=null)=>{
    const options = await commerce.checkout.getShippingOptions(checkoutToken , {country ,region})

    setShippingOptions(options)
    setShippingOption(options[0].id)

  }

  useEffect(()=>{
    console.log('Useeffect countries',shippingCountries)
    if(shippingCountries?.length>0){
      return;
    }
    fetchShippingCountries(checkoutToken.id)
    

  },[checkoutToken])
  useEffect(()=>{
    if(shippingCountry) fetchSubdivisions(shippingCountry)
  }, [shippingCountry])

  useEffect(()=>{
    if(shippingSubdivision) fetchShippingOptions( checkoutToken.id,shippingCountry ,shippingSubdivision)

  } ,[shippingSubdivision])
  return (
    <>
    
    <Typography>Shipping Adress</Typography>
    <FormProvider {...methods}>
      <form  onSubmit={methods.handleSubmit((data)=>{test({data , shippingCountry , shippingSubdivision ,shippingOption})})}>
        <Grid container spacing={3}>
          <CustomTextField  name='firstName' label='First Name' />
          <CustomTextField  name='lastName' label='Last Name' />
          <CustomTextField  name='email' label=' Email' />
          <CustomTextField  name='city' label='City' />
         
          <Grid item xs={12} sm={6}>
            <InputLabel>Shipping Country</InputLabel>
            {console.log('look',shippingCountries)}
            <Select value={shippingCountry}  fullWidth onChange={(e)=>setShippingCountry(e.target.value)} >
                {shippingCountries?.map((country) => (
                  <MenuItem key ={country.id} value={country.id}>
                    {country.label}
                  </MenuItem>
                ))}
                
            </Select>
          </Grid>
          
        
          <Grid item xs={12} sm={6}>
            <InputLabel>Shipping Subdivision</InputLabel>
            <Select value={shippingSubdivisions[0]?shippingSubdivisions[0][0]?.id:undefined} fullWidth onChange={(event)=> (setShippingSubdivision(event.target.value))} >
              
                {shippingSubdivisions[0]?.map((subdivision) => (
                  <MenuItem key ={subdivision.id} value={subdivision.id}>
                    {subdivision.label}
                  </MenuItem>
                ))}
            </Select>
          </Grid>
           
          <Grid item xs={12} sm={6}>
            <InputLabel>Shipping Option</InputLabel>
            <Select value={shippingOption} fullWidth onChange={(event)=> (setShippingOption(event.target.value))} >
            {options.map((option) => (
                  <MenuItem key ={option.id} value={option.id}>
                    {option.label}
                  </MenuItem>
                ))}
            </Select>
          </Grid>
        </Grid>
        
        <br />
        <div style={{display : 'flex' , justifyContent : 'space-between'}}>
          <Button component={Link} to='/cart' style={{color:'blue'}} variant='contained'> Back to Cart</Button>
          <Button type='submit' variant='contained' color='primmary'>Next</Button>

        </div>
        

      </form>

    </FormProvider>

      
    </>
    
  )
}

export default AddressForm
