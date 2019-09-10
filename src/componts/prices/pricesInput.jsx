import React, { useState, useEffect } from "react";

import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";

import InputAdornment from "@material-ui/core/InputAdornment";

const PricesInput = props => {
  const {
    input,
    inputsArray,
    index,
    classes,
    handleChange,
    thisPrices
  } = props;

  let [val, changeValue] = useState(inputsArray[index].value || "");

  // console.log(578989)

  useEffect(() => {
    // console.log(inputsArray)

    changeValue(inputsArray[index].value || "");
    // console.log(val)
  }, [inputsArray[index].value]);

  return (
    <Grid xs={6} key={index}>
      <TextField
        id="standard-name"
        className={classes.textField}
        label={input.label}
        placeholder={input.label}
        margin="normal"
        value={val}
        onChange={handleChange(input, changeValue, thisPrices)}
        InputProps={{
          startAdornment: <InputAdornment position="start">AMD</InputAdornment>
        }}
      />
    </Grid>
  );
};

export default PricesInput;
