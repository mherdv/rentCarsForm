import React, { useState, useContext, useEffect } from 'react';
import ReactDOM from 'react-dom';

import {appState} from '../../App';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';

import connect from 'react-watcher';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';


import UserContext from '../../contextBigForm';

import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';

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


let callBacks

// let fObj  

export default connect(function Prices(props) {

    // let priceForm = props.thisPriceForm;


    // console.log(appState)




    let callB = []; 
    const classes = useStyles();


    let formObject          =  appState.formObject;
    let changeFormObject    =  appState.changeFormObject;







    let [thisPrices, changeThisPrice] = useState(props.thisPriceForm);

    // let inputs = useContext(UserContext)[0];


    let [cars, changeCars] = useState(appState.formObject.cars);


    useEffect(() => {

        if (!~formObject.callBacks.indexOf(callB)) {
            callB.push([changeCars,formObject.cars])

            formObject.callBacks.push(callB)
        }


        thisPrices.prices = {};
        thisPrices.cars = [];
        callBacks = formObject.callBacks;

        changeCars(appState.formObject.cars);


    }, [appState.formObject,appState.formObject.cars])


    // useEffect(()=>{

    //     formObject          =  App.formObject;
    //     changeFormObject    =  App.changeFormObject;
    // },[App.formObject])

    const [showPrices, ChangeShowPrices] = useState(false);
    let pricesForm;

    pricesForm = [
        {
            label: "Գին 1կմ ի համար",
            name: 'withoudivriver',
            index: 1

        },
        {
            label: "Գին 1կմ ի համար վարորդով",
            name: 'withDriver',
            index: 2

        }
    ];


    let routes = [
        {
            label: "City tour in Yerevan",
            name: '',
            index: 3

        },
        {
            label: "Khor Virap-Noravank-Selim-Sevan",
            name: '',
            index: 4

        },
        {
            label: "Echmiadzin",
            name: '',
            index: 5

        },
        {
            label: "Airport",
            name: '',
            index: 6

        },
        {
            label: "Khor Virap-Noravank-Tatev",
            name: '',
            index: 7

        },
        {
            label: "Stepanakert",
            name: '',
            index: 8

        },
        {
            label: "Sevan",
            name: '',
            index: 9

        },
        {
            label: "Tsaghkadzor",
            name: '',
            index: 10

        },
        {
            label: "Khor Virap",
            name: '',
            index: 11

        },
        {
            label: "Bagratashen",
            name: '',
            index: 12

        },
        {
            label: "Ejmiatsin-Sardarapat",
            name: '',
            index: 13

        },
        {
            label: "Garni-Geghart",
            name: '',
            index: 14

        },
        {
            label: "Ashtarak-Oshakan",
            name: '',

            index: 15
        },
        {
            label: "Ashtarak-Byurakan",
            name: '',

            index: 16

        },
        {
            label: "Ashtarak-Amberd",
            name: '',
            index: 17

        },
        {
            label: "Aghveran",
            name: '',
            index: 18

        },
        {
            label: "Hankavan",
            name: '',
            index: 19

        },
        {
            label: "Sevan-Tsaghkadzor",
            name: '',
            index: 20

        },
        {
            label: "Sevan-Ayrivank-Noratus",
            name: '',
            index: 21

        },
        {
            label: "Sevan-Haghartzin",
            name: '',

            index: 22

        },
        {
            label: "Sevan-Haghartzin-Goshavank",
            name: '',

            index: 23

        },
        {
            label: "Tsapatagh",
            name: '',

            index: 24

        },
        {
            label: "Khor Virap-Noravank",
            name: '',

            index: 25

        },
        {
            label: "Khor Virap-Noravank-Jermuk",
            name: '',

            index: 26

        },
        {
            label: "Sisian",
            name: '',
            index: 27

        },
        {
            label: "Goris-Khndzoresk",
            name: '',
            index: 28

        },
        {
            label: "Kapan",
            name: '',
            index: 29
        },
        {
            label: "Megri",
            name: '',
            index: 30

        },
        {
            label: "Vanadzor",
            name: '',
            index: 31

        },
        {
            label: "Sanahin-Haghpat",
            name: '',
            index: 32

        },
        {
            label: "Bavra",
            name: '',
            index: 33

        },
        {
            label: "Tbilisi",
            name: '',
            index: 34

        },
        {
            label: "Gyumri",
            name: '',
            index: 35

        },
        {
            label: "Yenokavan",
            name: '',
            index: 36

        },
        {
            label: "Ani",
            name: '',
            index: 37

        },
        {
            label: "Oshakan-Amberd",
            name: '',
            index: 38

        },
        {
            label: "Ashtaraki Dzor",
            name: '',
            index: 39

        },
        {
            label: "Ashtarak-Saghmosavank-Ohanavank",
            name: '',
            index: 40

        },
        {
            label: "Tsaghkadzor-Sevan",
            name: '',
            index: 41

        },
        {
            label: "Tsaghkadzor-Sevan-Haghartsin",
            name: '',
            index: 42

        },
        {
            label: "Sevan-Noraduz-Haghartsin",
            name: '',
            index: 43

        },
        {
            label: "Gavar",
            name: '',
            index: 44

        },
        {
            label: "Khor Virap-Noravank-Gladzor",
            name: '',
            index: 45

        },
        {
            label: "Stepanakert (2day/1night)",
            name: '',
            index: 46

        },
        {
            label: "Kharabagh (3day/2nights)",
            name: '',
            index: 47

        },
        {
            label: "Kharabagh+Jermuk(4day/3nights)",
            name: '',
            index: 48

        },
        {
            label: "Sanahin-Haghpat-Odzun",
            name: '',
            index: 49

        },
        {
            label: "Aruch-Talin-Mastara",
            name: '',
            index: 50

        },
        {
            label: "Gyumri-Marmashen",
            name: '',
            index: 51

        },
        {
            label: "Khndzoresk",
            name: '',
            index: 52

        },
        {
            label: "Tatev",
            name: '',
            index: 53

        },
        {
            label: "Tatev-Khndzoresk",
            name: '',
            index: 54

        },
        {
            label: "Haghartsin-Dilijan-Goshavank",
            name: '',
            index: 55

        },
        {
            label: "Sevan-Dilijan-Haghpat-Sanahin-Armenian-Georgian border",
            name: '',
            index: 56

        },
        {
            label: "Parking in Airport",
            name: '',
            index: 57

        }

    ]

    const addingCarPrices = input => event => {
        thisPrices.prices[input.index] = event.target.value;


        if (!event.target.value)
            delete thisPrices.prices[input.index];



        if (!Object.keys(thisPrices.prices).length) {
            thisPrices.isValid = false;
        } else {
            thisPrices.isValid = true
        }


    }




    const handleChange = (name, className, carObj, index) => event => {

        let thisClassElements = [...document.querySelectorAll(className)];

        let carObject = appState.formObject.cars[index];

        carObject.priceForm = null;

        thisClassElements.forEach(checkbox => {
            let input = checkbox.querySelector('input')
            


            // console.log(App.formObject===formObject)
            if (input != event.target.closest('input') && input.checked && event.isTrusted) {

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
    return (

        // <UserProvider value={[formObject, changeFormObject]}>


        // </UserProvider>
        <div className="Prices" style={{ textAlign: "left", width: "100%" }}>

            {formObject.cars.length > 1 && props.index === 0 ? <Fab color="primary" aria-label="add"
                className={classes.fab + " addCarFormContainer"}
                onClick={
                    function () {

                        let priceObj = {}
                        formObject.prices.push(priceObj);
                        // fObj = formObject


                        changeFormObject({ ...formObject });


                        let div = document.createElement('div');

                        div.classList.add('priceFormContainer');
                        let elem = <Prices {...props} index={formObject.prices.indexOf(priceObj)} thisPriceForm={priceObj}  formObject={formObject} changeFormObject={changeFormObject}/>

                        ReactDOM.render(
                            elem,
                            div
                        );

                        document.querySelector('#pricesContainer').appendChild(div)
                    }
                }
            >
                <AddIcon />
            </Fab> : null}
            <div>
                {formObject.prices.length > 1 && props.index !== 0 ?
                    <Fab aria-label="delete"
                        className={classes.fab + ' removeButtonContainer'}
                        onClick={
                            function (event) {
                                formObject.prices.splice(props.index, 1);

                                let container = event.target.closest('.priceFormContainer')

                                changeFormObject({ ...formObject, prices: [...formObject.prices] });



                                formObject.callBacks.splice(formObject.callBacks.indexOf(callB), 1);

                                setTimeout(() => {

                                    ReactDOM.unmountComponentAtNode(container);
                                })

                            }}>
                        <DeleteIcon />
                    </Fab>

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
                                    label={car.inputs[0].value}
                                /></Grid> : null}
                        </div>
                    )

                })}


                <div className={classes.container + ' price-inputs'}>

                    {pricesForm.map((pricesForm, index) => {
                        return (
                            <Grid item xs={6} key={index} >
                                <TextField
                                    key={index}
                                    id="standard-name"
                                    label="Name"
                                    value={pricesForm.value}
                                    className={classes.textField}
                                    label={pricesForm.label}

                                    onChange={addingCarPrices(pricesForm)}
                                    placeholder={pricesForm.label}
                                    margin="normal" />
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

                                    id="standard-name"
                                    label="Name"
                                    className={classes.textField}
                                    label={route.label}
                                    placeholder={route.label}
                                    margin="normal"
                                    value={route.value}
                                    onChange={addingCarPrices(route)}
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


    )
})