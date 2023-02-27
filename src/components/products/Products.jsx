import React from "react";
import { Grid } from "@material-ui/core";
import Product from "./products/Product";
import useStyles from './styles'
//import laptop from './assets/New Lens 2.glb'
//import HR from './assets/Larrys Laptop.glb'

const Products = ({products , onAddTocart } ) => {
    const classes = useStyles()
    /*
    const Image1= () => 
    <div> 
        <model-viewer src={laptop} alt="VR Headset" auto-rotate camera-controls ar ios-src="assets/HTC_Vive_Headset.gltf">
        </model-viewer>

    </div>
   
    const Image2= () => 
        <div>
            <model-viewer src={HR} alt="VR Headset" auto-rotate camera-controls ar ios-src="assets/HTC_Vive_Headset.gltf">
            </model-viewer>

        </div>
    const productsImages = [
        {id : 1 , name:'laptop' , image:{Image1} } ,
        {id : 2 ,name:'hr' , image:{Image2} } 
    ] 
    */
    
     
    
  return (
    <Grid style={{ background:'LightCyan'}}>
        <main className={classes.content}>
            <div className={classes.toolbar} />
            <Grid container justifyContent= "center" spacing = {4}  style={{ background:'LightCyan'}}>
                {
                    products.map((product) => (
                        <Grid item key ={product.id} xs={12} sm ={6} md={4} lg={3}>
                            <Product product={product} onAddTocart={onAddTocart}/>
                        </Grid>
                    ),
                    /*
                    productsImages.map((item) => (
                        <Grid item xs={12} sm={4} key={item.id}>
                            <Product item={item} />
                        </Grid>
                    )) */
                    )  
                }
            </Grid>
        </main>
    </Grid>
  )
}

export default Products
