import React, { useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


import UserContext from '../../contextBigForm'
// import ReactDropzone from 'react-dropzone';
// import request from "superagent";

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
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        // margin: theme.spacing(1),
        minWidth: 120,
        width: 'calc(100% )',
        marginTop: 20,
        margin: 'auto'
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

export default function Cars(props) {
    let formObject = useContext(UserContext)[0];
    let changeFormObject = useContext(UserContext)[1];


    


    // setTimeout(function(){
    //     if( formObject.cars!=12454)
    //         changeFormObject({...formObject, cars:[12454]})
    // },1000)
    const classes = useStyles();
    const [values, setValues] = React.useState({
        name: '',
        multiline: '',
        currency: '',
    });


    const handleValueChange = input => event => {
        // changeHandler({ ...values, value: event.target.value });
        input.value =  event.target.value 
        console.log(input)

    };

    const handleChange = elem => event=> console.log(event)
    function selectChange(event) {
        setValues(oldValues => ({
            ...oldValues,
            [event.target.name]: event.target.value,
        }));
    }

    const inputs = [
        {
            label: "Մակնիշ *",
            name: 'Brand'
        },
        {
            label: "Մոդել *",
            name: 'Model'
        },
        {
            label: "Գույնը *",
            name: 'Color'
        },
        {
            label: "Արտադրման տարեթիվ *",
            name: 'date of production:'
        },
        {
            label: "Ուղևորների նստատեղերի քանակ *",
            name: 'Number of passenger seats'
        },
        {
            label: "Սրահի հավաքման որակ *",
            name: 'Salon quality'
        }
    ];
    const seats = [

        {
            title: 'Նստատեղերը կաշվից են',
            items: [
                { label: "Syes", value: "Այո" },
                { label: "Sno", value: "Ոչ" }
            ]
        },
        {
            title: 'Նստատեղերը ծալվում են դեպի հետ',
            items: [
                { label: "Fyes", value: "Այո" },
                { label: "Fno", value: "Ոչ" }
            ]
        }


    ]

    // const onDrop = (files) => {
    //     // POST to a test endpoint for demo purposes
    //     const req = request.post('https://httpbin.org/post');

    //     files.forEach(file => {
    //         req.attach(file.name, file);
    //     });

    //     req.end();
    // }


    return (
        <div className="Cars" style={{ textAlign: "left" }}>
            <div>
                <div className={classes.container}>
                    {inputs.map((input, index) => {


                        return (
                            <Grid item xs={6} key={index}>
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

                    {seats.map((seat, index) => {
                        return (
                            <Grid item xs={6} key={index}>
                                <div className="radio-container">
                                    <div>{seat.title}</div>
                                    <RadioGroup >
                                        <Grid item xs={12} >
                                            <div>
                                                {seat.items.map((option, index) => {

                                                    // console.log(option)
                                                    return (

                                                        <FormControlLabel
                                                            key={index}
                                                            value={option.label}
                                                            control={<Radio color="primary" />}
                                                            label={option.value}
                                                            labelPlacement="end"
                                                        />

                                                    )

                                                })}
                                            </div>
                                        </Grid>
                                    </RadioGroup>
                                </div>
                            </Grid>
                        )
                    })}


                    <Grid item xs={12} className="select-container">


                        <FormControl className={classes.formControl}>

                            <InputLabel htmlFor="fuel">Շարժիչի վառելիք</InputLabel>
                            <Select
                                value={values.fuel}
                                onChange={selectChange}
                                inputProps={{
                                    name: 'fuel',
                                    id: 'fuel',
                                }}
                            >
                                <MenuItem value={10}>Բենզին</MenuItem>
                                <MenuItem value={20}>Գազ</MenuItem>
                                <MenuItem value={30}>Դիզվառելիք</MenuItem>
                            </Select>

                        </FormControl>
                        <div className="custom-container">
                            <TextField
                                id="standard-name"
                                label="Name"

                                value=''
                                className="custom-container"
                                label={"Շարժիչի աշխատանքային ծավալ *"}
                                placeholder={"Շարժիչի աշխատանքային ծավալ *"}
                                onChange={handleChange('name')}
                                margin="normal" />
                        </div>
                    </Grid>
                    {/* <ReactDropzone
                        onDrop={onDrop}
                    >
                        Drop your best gator GIFs here!!
                    </ReactDropzone> */}
                </div>

            </div>
        </div>
    )
}
