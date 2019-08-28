import React, { useState } from 'react';
import { makeStyles, MuiThemeProvider } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import red from '@material-ui/core/colors/red';
import PeopleIcon from '@material-ui/icons/People';
import DirectionsCarIcon from '@material-ui/icons/DirectionsCar';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import SendIcon from '@material-ui/icons/Send';

import Partner from "./componts/partner/Partner";
import Cars from "./componts/cars/Cars";
import SectionTitle from "./componts/sectionTitle/SectionTitle";
import Button from '@material-ui/core/Button';
import Prices from "./componts/prices/Prices";

import { UserProvider } from './contextBigForm.jsx'
import CustomizedSnackbars from './componts/notification/Notification';



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
      'Legal Name':'',
      'Phone number':'',
      'Email':'',
      'AVC':''
    },
    cars: [{}],
    prices: [{}],

    errorTexts : '',
    successText: 'ձեր հայտն ընդունված Է',
    isFormValid: true,
    isAdded:false,
    notificationType:'error',
    callBacks : []
  });



  function sendForm(){
    
    let hasError = !!formObject.errorTexts.trim();

    
    formObject.notificationType = hasError?'error':'success'

    changeFormObject({...formObject, isAdded: true,errorTexts : '',notificationType:hasError?'error':'success'});


  }


  return (
    
    <MuiThemeProvider theme={theme}>
      
    <div className="form">

      <UserProvider value={[formObject, changeFormObject]}>


        
        <form className={classes.container}  autoComplete="off">

          <SectionTitle number={<PeopleIcon/>} title={"Գործընկեր"} />
          <Partner />
          <SectionTitle number={<DirectionsCarIcon/>} title={"Ավտոմեքենա"} />



          <div id='carsContainer'>

              <div className='carFormContainer'> <Cars key={0} index={0} thisCarForm={formObject.cars[0]} /></div>
          </div>
          


           <SectionTitle number={<AttachMoneyIcon/>} title={"Գներ"} />

          <div id='pricesContainer'>
              
              <div className='priceFormContainer'><Prices key={0} index={0} thisPriceForm={formObject.prices[0]} cars ={formObject.cars}  context= {[formObject,  changeFormObject]} /></div>
          </div>


            <CustomizedSnackbars type={formObject.notificationType} massage={formObject} click={sendForm} buttonText ='Ուղարկել'/>
          

        </form>
      </UserProvider>
    </div>
    </MuiThemeProvider>
  );
}

export default App;
