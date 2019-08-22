import React, { useState ,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Partner from "./componts/partner/Partner";
import Cars from "./componts/cars/Cars";
import SectionTitle from "./componts/sectionTitle/SectionTitle";

import { UserProvider } from './contextBigForm.jsx'

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

    },
    cars: [{},{},{}]
  });







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

        </form>
      </UserProvider>
    </div>
  );
}

export default App;
