import React, { useState, useEffect } from 'react';
import { makeStyles, MuiThemeProvider } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import red from '@material-ui/core/colors/red';
import PeopleIcon from '@material-ui/icons/People';
import DirectionsCarIcon from '@material-ui/icons/DirectionsCar';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';

import Partner from "./componts/partner/Partner";
import Cars from "./componts/cars/Cars";
import SectionTitle from "./componts/sectionTitle/SectionTitle";
import Prices from "./componts/prices/Prices";

import { UserProvider } from './contextBigForm.jsx'
import CustomizedSnackbars from './componts/notification/Notification';
import Paper from '@material-ui/core/Paper';


let stateOfApplication = {};


const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    textAlign: 'center'
  },
  rightIcon: {
    marginLeft: theme.spacing(1),
  },
}));


const materialBlue = blue[900];
const materialRed = red[500];

const theme = createMuiTheme({
  palette: {
    primary: {
      main: materialBlue
    },
    secondary: {
      main: materialRed
    }
  },
});




function App() {
  const classes = useStyles();

  const [formObject, changeFormObject] = useState({
    partnerInfo: {
      'Legal Name': '',
      'Phone number': '',
      'Email': '',
      'AVC': ''
    },




    partnerInfoValidArray: [],


    // todo adding cars checkboxes 


    cars: [{}],
    prices: [{}],

    errorTexts: '',
    successText: 'ձեր հայտն ընդունված Է շնորհակալություն',
    infoText: 'ձեր հարցումը մշակվում է խնդրում ենք սպասել ',
    isFormValid: true,
    isAdded: false,
    notificationType: 'error',

    isSended: false,
    callBacks: []
  });

  stateOfApplication.formObject = formObject;
  stateOfApplication.changeFormObject = changeFormObject;

  useEffect(() => {
    stateOfApplication.formObject = formObject;
    stateOfApplication.changeFormObject = changeFormObject;
  })




  function partnerValidationChecking() {


    // if (formObject.errorTexts) return;

    try {
      console.log(formObject.partnerInfo)
      formObject.partnerInfoValidArray.forEach(input => {
        if (!!!input.isValid) {
          formObject.errorTexts = input.label + ' պարտադիր դաշտը լրացված չե կամ սխալ է լրացված  ';

          throw new Error();
        }

      })
    } catch (e) {

    }
  }

  function carsFormValidationChecking() {

    try {

      formObject.cars.forEach(carForm => {
        if (!!formObject.errorTexts) throw new Error();
        let areInputsValid = true;


        try {
          carForm.inputs.forEach(input => {


            if (!!!input.isValid) {
              areInputsValid = false;
              formObject.errorTexts = input.label + ' պարտադիր դաշտը լրացված չե կամ սխալ է լրացված  ';
              throw new Error();
            }
          })
        } catch (e) {
          throw new Error();
        }


        carForm.isValid = !!(carForm.working_volume && carForm.fuelType.value && areInputsValid);


        if (!carForm.isValid && !formObject.errorTexts) {

          if (!carForm.fuelType.value) {
            formObject.errorTexts = 'Շարժիչի վառելիք  դաշտը պարտադիր է';
          } else {
            formObject.errorTexts = 'Շարժիչի աշխատանքային ծավալ  պարտադիր դաշտը լրացված չե կամ լրացված է սխալ';
          }

          throw new Error();
        }
        else { formObject.errorTexts = '' }
      })
    } catch (e) {

    }

  }


  function setFormPrices() {
    if (!formObject.errorTexts.trim()) {

      let c;
      try {

        formObject.cars.forEach((car, index) => {
          c = car
          if (!car.priceForm || !car.priceForm.isValid) throw new Error;
          else {
            car.priceForm.cars.push(index)
          }



        })
      } catch (e) {
        // hasError = true;
        formObject.errorTexts = c.inputs[0].value + ' ավտոմեքենայի համար գին նշած չէ';

        formObject.prices.forEach(price => {
          price.cars = [];
        })




      }
    }
  }

  function removeEmptyPriceForms() {

    if (!!formObject.errorTexts.trim()) return
    for (let i = 0; i < formObject.prices.length; i++) {
      if (!formObject.prices[i].cars.length)
        formObject.prices.splice(i, 1)
    }
  }


  function sendForm() {
    // if(formObject.isSended) return;
    formObject.errorTexts = ''
    partnerValidationChecking();
    carsFormValidationChecking();
    setFormPrices();
    removeEmptyPriceForms()




    let hasError = !!formObject.errorTexts.trim();




    formObject.notificationType = hasError ? 'error' : 'info';



    changeFormObject({ ...formObject, isAdded: true, errorTexts: formObject.errorTexts, notificationType: hasError ? 'error' : 'info' });




    if (!hasError) {
      formObject.isSended = true
      // console.log(123)
      // formObject.showButton = false;

      // changeFormObject({ ...formObject, showButton:false})

      setTimeout(() => {
        changeFormObject({ ...formObject, notificationType: 'success' });
      }, 3000)
    }


  }


  return (

    <MuiThemeProvider theme={theme}>

      <div className="form">

        <UserProvider value={[formObject, changeFormObject]}>



          <form className={classes.container} autoComplete="off">

            <SectionTitle number={<PeopleIcon />} title={"Գործընկեր"}/>
            <Paper>
              <Partner />
            </Paper>
            <SectionTitle number={<DirectionsCarIcon />} title={"Ավտոմեքենա"} />



            <div id='carsContainer'>
              
                <div className='carFormContainer'> <Cars key={0} index={0} thisCarForm={formObject.cars[0]} /></div>
              
            </div>




            <SectionTitle number={<AttachMoneyIcon />} title={"Գներ"} />

            <div id='pricesContainer'>
            
              <div className='priceFormContainer'><Prices key={0} index={0} thisPriceForm={formObject.prices[0]} cars={formObject.cars} context={[formObject, changeFormObject]} /></div>
            
            </div>

            <CustomizedSnackbars type={formObject.notificationType} massage={formObject} click={sendForm} buttonText='Ուղարկել' />



          </form>
        </UserProvider>
      </div>
    </MuiThemeProvider>
  );
}

export const appState = stateOfApplication;
export default App;
