import React , {useState , useEffect} from 'react'
import Products from './components/products/Products'
import Navbar from './components/navbar/Navbar'
import { commerce } from './lib/commerce'
import Cart from './components/cart/Cart'
import CheckOut from './components/checkOutForm/checkOut/CheckOut'
import { BrowserRouter as Router ,Routes ,Route } from 'react-router-dom'


//import { Navbar , Products } from './components'

          const App = () => {
            const [products , setProducts] = useState([])
            const [cart , setCart]= useState([])
            const [order , setOrder]=useState({})
            const [errorMessage , setErrorMessage]=useState('')

            const fetchProducts = async() => {
              const {data} = await commerce.products.list() ;

              setProducts(data);

            }
            const fetchCart = async () =>{
              const cart= await commerce.cart.retrieve()

              setCart( cart)

            }
            
            const handleToCart = async (product_id , quantity)=>{
              try{
                const cart = await commerce.cart.add(product_id , quantity)

                setCart(cart)
                console.log(cart)
              }catch(error){
              console.log(error)
              }
              

            }
            
             const updateCartQuantity = async(product_id , quantity) =>{
              const cart = await commerce.cart.update(product_id ,quantity)
              console.log('this cart',cart)
              setCart(cart)
             }
             const handleRemoveFromcart = async(product_id , quantity)=>{
              const cart = await commerce.cart.remove(product_id ,quantity)

              setCart(cart)

             }
             const handleEmptyCart = async()=>{
              const {cart} = await commerce.cart.empty()

              setCart(cart)

             }
             const refreshCart =async ()=>{
              const newCart = await commerce.cart.refresh()

              setCart(newCart)

             }
             const handleCheckOut= async(checkoutTokenId , newOrder)=>{
              try{
                const incomingOrder = await commerce.checkout.capture(checkoutTokenId , newOrder)

                setOrder(incomingOrder)
                refreshCart()

              } catch (error){
                setErrorMessage(error.data.error.message)

              }
             }
              {/*
                      order={order}
                      onHandleCheckOut={handleCheckOut}
                      error={errorMessage}
                    */}
             

            
            useEffect(()=> {
              fetchProducts()
              fetchCart()

            } , [])
            console.log('Cart',cart)
            //console.log(products)
            return (
             
              
              <Router>
                <div>
                <Navbar  totalItems={cart?.total_items} />
               
                <Routes>
                  
                    <Route exact path='/' element={<Products products ={products} onAddTocart={handleToCart}  />}/>
                    <Route exact path='/cart' element={  <Cart 
                        cart={cart}
                        updateCartQuantity = {updateCartQuantity}
                        handleRemoveFromcart = {handleRemoveFromcart}
                        handleEmptyCart = {handleEmptyCart}
                      />}/>
                    <Route exact path='/checkout' element={ <CheckOut
                      cart={cart}
                      order={order}
                      onHandleCheckOut={handleCheckOut}
                      error={errorMessage}

                    />} />
                  
                </Routes>
                
                
              </div>
              </Router>
              
              
            )
          }

          export default App
