import { Grid, TextField } from '@material-ui/core'
//import { Label } from '@material-ui/icons'
import React from 'react'
import { useFormContext  , Controller} from 'react-hook-form'

//const nameDetails = 'name'

const CustomTextField = ({label ,name}) => {
    const {control} =useFormContext()
  return (
    <Grid item xs={12} sm={6}>
        <Controller  
            
            render={({ field }) => <TextField {...field}  label={label}/>}
            name={name}
            control={control}
            defaultValue = ''
            fullWidth
            
            
            
            
            
        />
      
    </Grid>
  )
}

export default CustomTextField
