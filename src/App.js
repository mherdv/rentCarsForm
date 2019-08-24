import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Partner from "./componts/partner/Partner";
import Cars from "./componts/cars/Cars";
import SectionTitle from "./componts/sectionTitle/SectionTitle";
import Prices from "./componts/prices/Prices";

import { UserProvider } from './contextBigForm.jsx'
import CustomizedSnackbars from './componts/notification/Notification';



const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    textAlign: 'center'
  }
}));



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

    errorTexts : '',
    isFormValid: true,
    isAdded:false
  });




  function sendForm(){
    
    changeFormObject({...formObject, isAdded: true});






  }




  return (
    <div className="form">

      <UserProvider value={[formObject, changeFormObject]}>


        
        <form className={classes.container} Validate autoComplete="off">

          <SectionTitle number={1} title={"Գործընկեր"} />
          <Partner />
          <SectionTitle number={2} title={"Ավտոմեքենա"} />

          {formObject.cars.map((car, key) => {
            return <Cars key={key} index={key} thisCarForm={car}/>
          })}
           <SectionTitle number={3} title={"Գներ"} />
          <Prices/>



        <div   style={{textAlign:'center', width:'100%'}}>
            <CustomizedSnackbars type='error' massage={formObject} click={sendForm} buttonText ='finall add'/>
        
        </div>
        </form>
      </UserProvider>
    </div>
  );
}

export default App;
