import React , {useContext}from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';



import UserContext from '../../contextBigForm';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    textAlign: 'center'
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 300
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
  let changeFormObject = useContext(UserContext)[1];

  const classes = useStyles();


  const handleValueChange = input => event => {
    // changeHandler({ ...values, value: event.target.value });
    input.value = event.target.value;


    formObject.partnerInfo[input.name] = input.value 
    console.log(formObject)

  };


  const inputs = [
    { label: "Իրավաբանական Անուն *", name: 'Legal Name' },
    { label: "Հեռախոսահամար *", name: 'Phone number' },
    { label: "Էլ հասցե *", name: 'Email' },
    { label: "ՀՎՀՀ *", name: 'AVC' },
  ]



  return (
    <div className="Partner" style={{ textAlign: "left" }}>
      <div className={classes.container}>
        {inputs.map((input, index) => {
          return (
            <Grid item xs={6} key={index} >
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
