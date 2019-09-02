import React ,{useState} from 'react';

import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

import InputAdornment from '@material-ui/core/InputAdornment';

const PricesInput = (props) => {


    const {route , routes,index,classes,changeRoutesPrices,thisPrices} = props;


    
    let [val,changeValue] = useState(route.value);






    const addingCarPrices = (input) => event => {
       
        let target = event.target;
        let value = target.value.replace(/\,/g, '');
        if (event.target.value.length >= 9) {


            target.value =  target.value.slice(0,target.value.length-1);
            return
        };

            
            thisPrices.prices[input.index] = event.target.value;

            let newValue = new Intl.NumberFormat('ja-JP').format(value)

            if (isNaN(value) || newValue === '0') {
                newValue = "";
            }

            event.target.value = newValue;
            // lastValue = newValue;
            input.value = event.target.value ;

            event.target.setAttribute('value', input.value);

            changeValue(newValue)

            // setTimeout(()=>{
            //     // console.log(54678)
            //     target.setAttribute('value',target.value)
            //     target.value=target.value
            
            // },100)
            
            // changePriceState(pricesState)
            




        if (!event.target.value) {
            delete thisPrices.prices[input.index];
        }


        if (!Object.keys(thisPrices.prices).length) {
            thisPrices.isValid = false;
        } else {
            thisPrices.isValid = true
        }




    }





    return (
        <Grid  xs={6} key={index} >
        <TextField
        
            id="standard-name"

            label="Name"
            className={classes.textField}
            label={route.label}
            placeholder={route.label}
            margin="normal"
            value={val}
            onChange={addingCarPrices(route,routes ,changeRoutesPrices)}
            InputProps={{
                startAdornment: <InputAdornment position="start">AMD</InputAdornment>,
            }}
        />
    </Grid>
    );
};

export default PricesInput;