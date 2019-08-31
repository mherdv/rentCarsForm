import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

// import { appState } from '../../App';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';

// import connect from 'react-watcher';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Add, Delete } from '../addDelete/AddDelete';
import { Paper } from '@material-ui/core';

import {staticPrices, routsPrices}  from '../../helper/carRantePrices';

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

export default function Prices(props) {

    // let priceForm = props.thisPriceForm;


    // console.log(appState)




    // let callB = [];
    const classes = useStyles();


    let formObject = props.formObject;
    let changeFormObject = props.changeFormObject;



    let [thisPrices] = useState(props.thisPriceForm);

    // let inputs = useContext(UserContext)[0];


    let [cars, changeCars] = useState(props.cars);

    let prices = props.prices;
    let changePrices = props.changePrices;



    useEffect(() => {




        thisPrices.prices = {};
        thisPrices.cars = [];
        // callBacks = formObject.callBacks;

        changeCars(props.cars);


    }, [])


    // formObject.cars



    useEffect(() => {




        // thisPrices.prices = {};
        // thisPrices.cars = [];
        // callBacks = formObject.callBacks;

        changeCars(props.cars);


    }, [props.cars])


    // useEffect(()=>{

    //     formObject          =  App.formObject;
    //     changeFormObject    =  App.changeFormObject;
    // },[App.formObject])

    const [showPrices, ChangeShowPrices] = useState(false);
    let [pricesForm, changePricesForm] = useState(staticPrices);
    let [routes, changeRoutesPrices] = useState( routsPrices);

    // let lastValue;
    const addingCarPrices = (input, pricesState, changePriceState) => event => {
        let target = event.target;
        let value = target.value.replace(/\,/g, '');
        // if (event.target.value.length <= 9) {

            thisPrices.prices[input.index] = event.target.value;

            let newValue = new Intl.NumberFormat('ja-JP').format(value)

            if (isNaN(value) || newValue === '0') {
                newValue = "";
            }

            event.target.value = newValue;
            // lastValue = newValue;
            input.value = event.target.value ;

            
            changePriceState(pricesState)
            




        if (!event.target.value) {
            delete thisPrices.prices[input.index];
        }


        if (!Object.keys(thisPrices.prices).length) {
            thisPrices.isValid = false;
        } else {
            thisPrices.isValid = true
        }




    }




    const handleChange = (name, className, carObj, index) => event => {

        let thisClassElements = [...document.querySelectorAll(className)];

        let carObject = cars[index];

        carObject.priceForm = null;

        thisClassElements.forEach(checkbox => {
            let input = checkbox.querySelector('input')



            // console.log(App.formObject===formObject)
            if (input !== event.target.closest('input') && input.checked && event.isTrusted) {

                input.click()

            }

            // changeFormObject({...lastCarsFormOP})
            // let carObjj=   fObj || carObj;


            // console.log(fObj)




            // if(fObj){
            //     carObj = fObj.cars[index]
            // }
            // changeCars()




            // console.log( App.formObject)

            if (input.checked) {

                carObject.priceForm = thisPrices;


            }
            // else {

            //     console.log(456)
            //     carObject.priceForm = null;
            //     // formObject.checkedCarsCount--;
            //     // thisPrices.cars.splice(thisPrices.cars.indexOf(index),1)



            // }


            // changeCars([...fObj.cars])


        })




        // event.target.checked = true
        // setState({ ...state, [name]: event.target.checked });
    };
    function addPrice() {
        let priceObj = {}
        prices.push(priceObj);

        changePrices([...prices]);
        
    }


    function deletePrice(event) {
        prices.splice(props.index, 1);
        
        
        changePrices([...prices]);
    }

    return (

        // <UserProvider value={[formObject, changeFormObject]}>


        // </UserProvider>
        <Paper>
            <div className="Prices" style={{ textAlign: "left", width: "100%" }}>

                {cars.length > 1 && props.index === 0 ? <Add onClick={addPrice} /> : null}
                <div>
                    {prices.length > 1 && props.index !== 0 ?
                        <Delete onClick={deletePrice} />

                        : null
                    }

                    {cars.map((car, index) => {

                        return (
                            <div className={classes.marginLeft + ' checkBox_' + index}>
                                {!car.inputs[0].value == "0" ? <Grid item xs={6} key={index}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox

                                                onChange={handleChange(index, '.checkBox_' + index, car, index)}
                                                value={car.inputs[0].value}
                                                color="primary"
                                            />
                                        }
                                        label={car.inputs[0].value + " " + car.inputs[1].value}
                                    /></Grid> : null}
                            </div>
                        )

                    })}


                    <div className={classes.container + ' price-inputs'}>

                        {pricesForm.map((priceInput, index) => {
                            return (
                                <Grid item xs={6} key={index} >
                                    <TextField
                                        key={index}

                                        id="standard-name"
                                        label="Name"
                                        value={priceInput.value}
                                        className={classes.textField}
                                        label={priceInput.label}
                                        onChange={addingCarPrices(priceInput, pricesForm, changePricesForm)}
                                        placeholder={priceInput.label}
                                        margin="normal"
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start">AMD</InputAdornment>,
                                        }}
                                    />
                                </Grid>
                            )
                        })}
                        <Grid item xs={12} >

                            <Button variant="outlined" color="primary" className={classes.button} onClick={() => ChangeShowPrices(!showPrices)}>
                                Գին ըստ ֆիքսված երթուղու
                </Button>
                        </Grid>


                        {showPrices ? (routes.map((route, index) => {
                            return (
                                <Grid item xs={6} key={index} >
                                    <TextField
                                        key={index}
                                        id="standard-name"

                                        label="Name"
                                        className={classes.textField}
                                        label={route.label}
                                        placeholder={route.label}
                                        margin="normal"
                                        value={route.value}
                                        onChange={addingCarPrices(route,routes ,changeRoutesPrices)}
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start">AMD</InputAdornment>,
                                        }}
                                    />
                                </Grid>
                            )
                        })) : null}

                    </div>
                </div>
            </div>
        </Paper>

    )
}