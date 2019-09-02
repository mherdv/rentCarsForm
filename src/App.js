import React, { useState, useEffect, memo, useCallback } from 'react';
import { makeStyles, MuiThemeProvider } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import red from '@material-ui/core/colors/red';
import PeopleIcon from '@material-ui/icons/People';
import DirectionsCarIcon from '@material-ui/icons/DirectionsCar';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';

import Partner from "./componts/partner/Partner";
import SectionTitle from "./componts/sectionTitle/SectionTitle";
import PricesContainer from "./componts/prices/PricesContainer";

import { UserProvider } from './contextBigForm.jsx'
import CustomizedSnackbars from './componts/notification/Notification';
import Paper from '@material-ui/core/Paper';


import CarsContainer from './componts/cars/CarsContainer';

import { removeEmptyPriceForms, setFormPrices, carsFormValidationChecking, partnerValidationChecking } from './helper/validationChackers';


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




const App = React.memo(() => {
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
    callBacks: [],
    // count:0
  });




  const [cars, changeCars] = useState([{}]);

  const [prices, changePrices] = useState([{}])

  // useEffect(() => {

  // },[formObject.cars])


  const carsContainer = useCallback((() => {



    return <CarsContainer cars={cars} />;
  }), [cars.length])


  const pricesContainer = useCallback((() => {


    return <PricesContainer prices={prices} />;
  }), [prices.length])


  




  // cb()


  function sendForm() {
    // if(formObject.isSended) return;
    formObject.cars = cars;
    formObject.prices = prices;
    formObject.errorTexts = ''
    partnerValidationChecking(formObject);
    carsFormValidationChecking(formObject);
    setFormPrices(formObject);
    removeEmptyPriceForms(formObject)




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

        <UserProvider value={{ formObject, changeFormObject, cars, changeCars, prices, changePrices }}>



          <form className={classes.container} autoComplete="off">

            <SectionTitle number={<PeopleIcon />} title={"Գործընկեր"} />
            <Paper>
              <Partner />
            </Paper>
            <SectionTitle number={<DirectionsCarIcon />} title={"Ավտոմեքենա"} />



            {/* <CarsContainer cars={cars} formObject={formObject} changeFormObject='/> */}

            {carsContainer()}

            {/* <CarsContainer cars={cars} /> */}

            {/* <div id='carsContainer'>
              
              {cars.map((car, index)=>{

                 return  <div className='carFormContainer'> <Cars key={index + '_car'} formObject={formObject} changeFormObject={changeFormObject} index={index} thisCarForm={car}  cars={cars}   changeCars={changeCars}/></div>
              })}
            
          </div> */}




            <SectionTitle number={<AttachMoneyIcon />} title={"Գներ"} />

            {pricesContainer()}

            <CustomizedSnackbars type={formObject.notificationType} massage={formObject} click={sendForm} buttonText='Ուղարկել' />



          </form>
        </UserProvider>
      </div>
    </MuiThemeProvider>
  );
})

export const appState = stateOfApplication;
export default App;
