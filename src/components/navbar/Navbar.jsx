
import React from 'react'
import { AppBar , Toolbar , IconButton , Badge  , Typography } from '@material-ui/core'
import { ShoppingCart } from '@material-ui/icons'
import useStyles from './styles'
import pg from '../products/assets/ln logo.png'
import { Link } from 'react-router-dom'

const Navbar = (totalItems) => {
  const classes = useStyles()
  return (
    <div>
      <AppBar position='fixed' className={classes.appBar} color='inherit' style={{background:"LightCyan"}} >
        <Toolbar >
          <Typography  component={Link} to='/' variant ='h6' className={classes.title} color='inherit' >
            <img src={pg} alt='3d ' height='25px' className={classes.image}/>
            3d ecommerce

          </Typography>
          <div className={classes.grow}/>
          <div className={classes.button}>
            <IconButton component={Link} to='/cart' aria-label='show cart items' color='inherit'>
              <Badge badgeContent={totalItems.totalItems} color='secondary'>
                <ShoppingCart />

              </Badge>

            </IconButton>

          </div>
        </Toolbar>

      </AppBar>
      
    </div>
  )
}

export default Navbar
