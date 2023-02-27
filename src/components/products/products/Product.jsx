import React from 'react'
import {Card , CardMedia ,CardContent,CardActions,Typography, IconButton} from '@material-ui/core'
import { AddShoppingCart } from '@material-ui/icons'
import useStyles from './styles'
//import HR from '../assets/New Lens 2.glb'
//import {productImage} from '../dimensional/Dimensional'



/*
const imgCard =()=>(
    <model-viewer src={HR} alt="VR Headset" auto-rotate camera-controls ar ios-src="https://v.creators3d.com/index.html?load=%2Fviews%2Fproduction%2Fitem%2F202329%2F1828663660352555%2F1828663660352555.glb&autorotate=true&json-data=1675943743744&decrypt=1&tv=147" >
    </model-viewer>

)
*/


const Product = ({product , onAddTocart  }) => {
    const classes = useStyles
    console.log('products',product)
    
  return (
    <Card className={classes.root} style={{height:'100%' ,background:'LightCyan'}} >
        <CardMedia className={classes.media}  title={product.name} >
            {/*<model-viewer src={HR} alt="VR Headset" disable-tap auto-rotate shadow-intensity="1" camera-controls        touch-action="pan-y"  >
            </model-viewer>*/}
            <img src={product.image.url}   alt='item' style={{width:'100%' ,background:'LightCyan' }} />
        </CardMedia>

        <CardContent>
            <div className={classes.cardContent}>
                <Typography variant='h5' gutterBottom>
                    {product.name}

                </Typography>
                <Typography variant='h5' >
                    {product.price.formatted_with_symbol}

                </Typography>

            </div>
            <Typography dangerouslySetInnerHTML={{__html:product.description}} variant='body2' color='textSecondary' /> 
        </CardContent>
        <CardActions disableSpacing className={classes.cardActions}>
            <IconButton aria-label='add to cart' onClick={()=> {
                
                onAddTocart(product.id, 1)}} >
                <AddShoppingCart />
            </IconButton>
        </CardActions>
        
      
    </Card>
  )
}

export default Product
