import React, { useContext, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import UserContext from '../../contextBigForm';

import { isEmail, isRequirers } from '../../helper/valdators';



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
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 300,
  },
}));

export default function Partner(props) {

  let formObject = useContext(UserContext)[0];
  // let changeFormObject = useContext(UserContext)[1];

  const classes = useStyles();



  const [inputs, changeInputs] = useState([
    { label: "Իրավաբանական Անուն *", name: 'Legal Name', validators: [isRequirers] },
    { label: "Հեռախոսահամար *", name: 'Phone number', validators: [isRequirers] },
    { label: "Էլ հասցե *", name: 'Email', validators: [isEmail, isRequirers] },
    { label: "ՀՎՀՀ *", name: 'AVC', validators: [isRequirers] },
  ])



  useEffect(() => {
    if (formObject.errorTexts) return;

    try {

      inputs.forEach(input => {
        if (!!!input.isValid) {
          formObject.errorTexts = input.label + ' պարտադիր դաշտը լրացված չե կամ սխալ է լրացված  ';

          throw new Object;
        }

      })
    } catch (e) {

    }
  })
  const handleValueChange = input => event => {
    // changeHandler({ ...values, value: event.target.value });
    input.value = event.target.value;
    input.isValid = true;


    input.validators.forEach(validator => {
      if (!validator(input.value)) {
        input.isValid = false;

      }
    })


    changeInputs([...inputs])
    formObject.partnerInfo[input.name] = input.value;

  };





  return (
    <div className="Partner" style={{ textAlign: "left" }}>
      <div className={classes.container}>
        {inputs.map((input, index) => {

          return (
            <Grid item xs={6} key={index} className={!input.isValid && formObject.isAdded ? 'invalid' : ''}>

              <TextField
                key={index}
                id="standard-name"
                label="Name"
                value={input.value}
                className={classes.textField}
                label={input.label}
                placeholder={input.label}
                onChange={handleValueChange(input)}
                margin="normal" />
            </Grid>
          )
        })}
      </div>


    </div>
  )
}
