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

    prices: {},
    isFormValid: false,
    isAdded:false
  });




  function sendForm(){
    changeFormObject({...formObject, isAdded: true})
  }




  return (
    <MuiThemeProvider theme={theme}>
    <div className="form">

      <UserProvider value={[formObject, changeFormObject]}>
        <form className={classes.container} Validate autoComplete="off">

          <SectionTitle number={<PeopleIcon/>} title={"Գործընկեր"} />
          <Partner />
          <SectionTitle number={<DirectionsCarIcon/>} title={"Ավտոմեքենա"} />

          {formObject.cars.map((car, index) => {
            return <Cars key={index} index={index} thisCarForm={car}/>
          })}
           <SectionTitle number={<AttachMoneyIcon/>} title={"Գներ"} />
          <Prices />


          <Button onClick={sendForm} variant="contained" color="primary" className={classes.button + " " + "send"}>
          Ուղարկել
           <SendIcon className={classes.rightIcon}/>
          </Button>
          {/* <div   style={{textAlign:'center', width:'100%', background:'gray', color:'#fff', cursor:'pointer'}}>finall add</div> */}
        </form>
      </UserProvider>
    </div>
    </MuiThemeProvider>
  );
}

export default App;
