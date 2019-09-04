import React,{useState,useEffect} from 'react';

import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const PricesCheckbox = (props) => {

    

    const {classes,handleChange,car,index,thisPrices,cars ,checkbox} = props;

    // console.log(checkbox)


    useEffect(()=>{
        changeChecked(checkbox.checked)
    },[checkbox])
    const  [checked , changeChecked] = useState(checkbox.checked || false);


    function changeCheckboxState(){
        changeChecked( checkbox.checked = !checked);
    }

    return (
        <div key={index + '_' + 'checkBox_' + index} className={classes.marginLeft + ' checkBox_' + index}>
            <Grid item xs={6} key={index}>
                <FormControlLabel
                    control={
                        <Checkbox

                            onChange={handleChange(index, ('.checkBox_' + index), changeCheckboxState)}
                            value={car.inputs[0].value}
                            color="primary"
                            checked={checked}
                        />
                    }
                    label={car.inputs[0].value + " " + car.inputs[1].value}
                /></Grid>
        </div>
    );
};

export default PricesCheckbox;