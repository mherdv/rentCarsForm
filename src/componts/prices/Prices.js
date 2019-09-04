import React, { useState, useEffect, useContext, memo } from 'react';



import PricesInput from './pricesInput';

// import { appState } from '../../App';


import PricesCheckbox from './PricesCheckbox';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import UserContext from '../../contextBigForm';

// import connect from 'react-watcher';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Add, Delete } from '../addDelete/AddDelete';
import { Paper } from '@material-ui/core';

import { staticPrices, routsPrices } from '../../helper/carRantePrices';

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        textAlign: 'center'
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: "90%",
    },
    button: {
        margin: 35,
    },
    input: {
        display: 'none',
    },
    marginLeft: {
        marginLeft: theme.spacing(1),
    }
}));


// let callBacks

// let fObj  

let carsLength = 1;


function addPrice(prices, changePrices) {
    let priceObj = {}
    prices.push(priceObj);

    changePrices([...prices]);

}




export default memo(function Prices({ index, thisPriceForm }) {


    let { prices, changePrices, cars: carFromeOut } = useContext(UserContext);
    // let carFromeOut = useContext(UserContext).cars;
    const classes = useStyles();

    let [thisPrices] = useState(thisPriceForm);


    let [cars, changeCars] = useState([]);


    let [checkboxes,changeCheckboxes] = useState([]);





    useEffect(() => {

        thisPrices.prices = {};
        thisPrices.cars = [];

        changeCars(carFromeOut);

    }, [])


    function setCheckboxesState(clear=true){
        let checkB = carFromeOut.map((car,index)=>{

            let label = '';
            if(car.inputs[0].value || car.inputs[1].value){
                if(car.inputs[0]){
                    label+= car.inputs[0].value;
                }
                if(car.inputs[1]){
                    label+= ' '+ car.inputs[1].value;
                }
            }
            return {
                label,
                car,
                checked:clear &&((checkboxes[index] && checkboxes[index].checked ) || false)

            }
        })
        

        changeCheckboxes([...checkB])
        // console.log(checkboxes,checkB)
    }

    useEffect(() => {

        if (carsLength != carFromeOut.length) {
            carsLength = carFromeOut.length;
            return
        }
        changeCars(carFromeOut);

        setCheckboxesState()
        


    }, [carFromeOut])




    const [showPrices, ChangeShowPrices] = useState(false);




    let [pricesForm, changePricesForm] = useState([]);

    let [routes, changeRoutesForm] = useState([]);









    useEffect(() => {
        thisPriceForm.pricesForm = thisPriceForm.pricesForm || [...JSON.parse(JSON.stringify(staticPrices))]
        thisPriceForm.routes = thisPriceForm.routes || [...JSON.parse(JSON.stringify(routsPrices))];

        changePricesForm([...thisPriceForm.pricesForm]);
        changeRoutesForm([...thisPriceForm.routes]);

        
        setCheckboxesState();

    }, [prices.length])


    // let lastValue;


    const addingCarPrices = (input, changeValue) => event => {



        let target = event.target;
        let value = target.value.replace(/\,/g, '');
        if (event.target.value.length >= 9) {


            target.value = target.value.slice(0, target.value.length - 1);
            return
        };


        thisPrices.prices[input.index] = event.target.value;

        let newValue = new Intl.NumberFormat('ja-JP').format(value)

        if (isNaN(value) || newValue === '0') {
            newValue = "";
        }

        event.target.value = newValue;
        // lastValue = newValue;
        input.value = event.target.value;

        event.target.setAttribute('value', input.value);

        changeValue(newValue)

        if (!event.target.value) {
            delete thisPrices.prices[input.index];
        }


        if (!Object.keys(thisPrices.prices).length) {
            thisPrices.isValid = false;
        } else {
            thisPrices.isValid = true
        }




    }

    function deletePrice(prices, changePrices, index) {


        prices.splice(index, 1);


        changePrices([...prices]);

        setCheckboxesState(false);
        thisPrices.isValid = false;

        
    }


    const handleChange = (index,className ,callback) => event => {

        

        let thisClassElements = [...document.querySelectorAll(className)];

        // let carObject = cars[index];

        cars[index].priceForm = null;

       

        thisClassElements.forEach(checkbox => {
            let input = checkbox.querySelector('input')



            if (input !== event.target.closest('input') && input.checked && event.isTrusted) {

                input.click()

            }

            if (input.checked) {

                cars[index].priceForm = thisPrices;


            }


        })

        changeCars([...cars]);



        callback()
        // console.log( )
    };



    return (
        <Paper>
            <div className="Prices" style={{ textAlign: "left", width: "100%" }}>
                <div className={'absoluteCounter priceCounter'}>{index+1}</div>
                {cars.length > 1 && index === 0 ? <Add onClick={() => addPrice(prices, changePrices)} /> : null}
                <div>
                    {prices.length > 1 && index !== 0 ?
                        <Delete onClick={() => deletePrice(prices, changePrices, index)} />

                        : null
                    }

                    {checkboxes.map((checkbox, index) => {

                        // console.log(thisPrices === cars[index].priceForm)
                        // if(!!car.inputs[0].value ) return null;
                        return (
                            <>
                                {checkbox.car.inputs[0].value || checkbox.car.inputs[1].value ? 


                                    <PricesCheckbox index={index} car={checkbox.car} classes={classes} thisPrices={thisPrices} checkbox={checkbox} cars={cars} handleChange={handleChange}/>
                                
                                : null}
                            </>
                        )

                    })}


                    <div className={classes.container + ' price-inputs'}>


                        {pricesForm.map((priceInput, index) => {
                            return (
                                <PricesInput input={priceInput} inputsArray={pricesForm} index={index} classes={classes} handleChange={addingCarPrices} prices={prices} currentComponent={thisPrices} />
                            )
                        })}
                        <Grid item xs={12} >

                            <Button variant="outlined" color="primary" className={classes.button} onClick={() => ChangeShowPrices(!showPrices)}>
                                Գին ըստ ֆիքսված երթուղու
                            </Button>
                        </Grid>


                        {showPrices ? (routes.map((route, index) => {
                            return (
                                <PricesInput input={route} inputsArray={routes} index={index} classes={classes} handleChange={addingCarPrices} prices={prices} currentComponent={thisPrices} />
                            )
                        })) : null}

                    </div>
                </div>
            </div>
        </Paper>

    )
})