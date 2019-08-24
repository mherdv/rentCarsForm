import React, { useContext, useState, useEffect} from 'react';
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
import 'react-dropzone-uploader/dist/styles.css';

import ReactDropzone from 'react-dropzone';



import { isRequirers } from '../../helper/valdators';


import UserContext from '../../contextBigForm'

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
    const classes = useStyles();
    let formObject = useContext(UserContext)[0];
    let changeFormObject = useContext(UserContext)[1];

    let carsForm = props.thisCarForm;




    const [files, setFiles] = useState([]);
    // console.warn(files)
    //  init values
    useEffect(() => {

        changeInputs(carsForm.inputs);
        changeSeats(carsForm.seats);
        setFuelType(carsForm.fuelType);
        setWorking_volume(carsForm.working_volume);

        setFiles(carsForm.files);

        
        
       

    }, [carsForm])


    useEffect(() => {



        let areInputsValid = true;

        try {
            inputs.forEach(input=>{

                if(!input.isValid ){
    
                    areInputsValid =  false;
                    formObject.errorTexts = input.label + ' պարտադիր դաշտը լրացված չե կամ սխալ է լրացված  ' ;
                    throw {};
                }
            })
          } catch (e) {
            
          }

        
        carsForm.isValid = !!(carsForm.working_volume && carsForm.fuelType.value && areInputsValid);


        if(!formObject.errorTexts && !carsForm.isValid ){

            if(!carsForm.fuelType.value){
                formObject.errorTexts =  'Շարժիչի վառելիք  դաշտը պարտադիր է';
            }else{
                formObject.errorTexts =  'Շարժիչի աշխատանքային ծավալ  պարտադիր դաշտը լրացված չե կամ լրացված է սխալ';
            }

        }
        console.log(carsForm.fuelType)

        // formObject.errorTexts.push()

        //**************************************************************************************    */ carsForm has price  
        

        
    })


    if (!carsForm.files) {
        carsForm.files = [];
        
    }

    function onPreviewDrop(newFiles) {
        

        setFiles(files.concat(newFiles))

        carsForm.files = files.concat(newFiles);

    };



    ////
 
        // specify upload params and url for your files
        // const getUploadParams = ({ meta }) => {return { url: 'https://httpbin.org/post' } }

        // // called every time a file's `status` changes
        // const handleChangeStatus = ({ meta }, status) => { if(status === 'done'){
        //      onPreviewDrop(meta);
             
        // }}

        // receives array of files that are done uploading when submit button is clicked
        // const handleSubmit = (files, allFiles) => {
        //     console.log(files.map(f => f.meta))
        //     allFiles.forEach(f => f.remove())
        // }


    const [working_volume, setWorking_volume] = React.useState('');

    if (!carsForm.working_volume) {
        carsForm.working_volume = '';
    }

    const handleChange = input => event => {

        setWorking_volume(event.target.value)
        carsForm.working_volume = event.target.value

    };

    const [fuelType, setFuelType] = React.useState({});


    if (!carsForm.fuelType) {
        carsForm.fuelType = {
            name: '',
            multiline: '',
            currency: '',
            isValid: false,
            validators: [isRequirers]
        }
    }


    function selectChange(event) {



        setFuelType(oldValues => ({
            ...oldValues,
            value: event.target.value,
            isValid: true
        }));

        carsForm.fuelType.value = event.target.value;








    }

    const handleValueChange = input => event => {
        input.value = event.target.value;

        input.isValid = true;

        input.validators.forEach(validator => {
            
            
            if (!validator(input.value)) {
                input.isValid = false
            }
        })


        changeInputs([...inputs]);
    };

    const [inputs, changeInputs] = useState([])
    if (!carsForm.inputs) {
        carsForm.inputs = [
            {
                label: "Մակնիշ *",
                name: 'Brand',
                value: '',

                validators: [isRequirers]
            },
            {
                label: "Մոդել *",
                name: 'Model',
                value: '',
                validators: [isRequirers]
            },
            {
                label: "Գույնը *",
                name: 'Color',
                value: '',
                validators: [isRequirers]
            },
            {
                label: "Արտադրման տարեթիվ *",
                name: 'date of production:',
                value: '',
                validators: [isRequirers]
            },
            {
                label: "Ուղևորների նստատեղերի քանակ *",
                name: 'Number of passenger seats',
                value: '',
                validators: [isRequirers]
            },
            {
                label: "Սրահի հավաքման որակ *",
                name: 'Salon quality',
                value: '',
                validators: [isRequirers]
            }
        ]




    }


    const [seats, changeSeats] = useState([])

    if (!carsForm.seats) {
        carsForm.seats = [
            {
                title: 'Նստատեղերը կաշվից են',
                items: [
                    { label: "Այո", value: 1 },
                    { label: "Ոչ", value: 0 }
                ],
                name: 'leather',
                value: 0,
                valdators: [isRequirers]

            },
            {
                title: 'Նստատեղերը ծալվում են դեպի հետ',
                items: [
                    { label: "Այո", value: 1 },
                    { label: "Ոչ", value: 0 }
                ],
                name: 'fold back',
                value: 0,
                valdators: [isRequirers]


            }
        ]
    }


    return (
        <div className="Cars" style={{ textAlign: "left" }}>

            {props.index == 0 ? <div className='addCarFormContainer'><span onClick={

                function () {
                    formObject.cars.push({});

                    changeFormObject({ ...formObject });
                }
            }>+</span></div> : null}
            <div>
                {
                    formObject.cars.length > 1 ?
                        <div className='removeButtonContainer'>
                            <span onClick={function (event) {


                                formObject.cars.splice(props.index, 1);


                                changeFormObject({ ...formObject });


                            }}>-</span>
                        </div>
                        : null
                }




                <div className={classes.container}>
                    {inputs.map((input, index) => {

                        return (
                            <Grid item xs={6} key={index} className={(!input.isValid && formObject.isAdded) ? 'invalid' : ''}>
                                <TextField
                                    key={index}
                                    id="standard-name"
                                    label="Name"
                                    value={input.value || ''}
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
                                    <RadioGroup onChange={

                                        function (event) {
                                            seat.value = +event.target.value;



                                            changeSeats([...seats])
                                        }
                                    } value={seat.value}>
                                        <Grid item xs={12} >
                                            <div>
                                                {seat.items.map((option, index) => {

                                                    // console.log(option)
                                                    return (

                                                        <FormControlLabel
                                                            key={index}
                                                            value={option.value}
                                                            control={<Radio color="primary" />}
                                                            label={option.label}
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


                    <Grid item xs={12} className={"select-container "} >


                        <div className={ (!fuelType.isValid && formObject.isAdded)?'invalid':''} >

                            <FormControl className={classes.formControl}  >

                                <InputLabel htmlFor="fuel">Շարժիչի վառելիք</InputLabel>
                                <Select
                                    value={fuelType.value}
                                    onChange={selectChange}
                                    inputProps={{
                                        name: 'fuel',
                                        id: 'fuel',
                                    }}
                                >
                                    <MenuItem value={1}>Բենզին</MenuItem>
                                    <MenuItem value={2}>Գազ</MenuItem>
                                    <MenuItem value={3}>Դիզվառելիք</MenuItem>
                                </Select>

                            </FormControl>
                        </div>
                        <div className={"custom-container " +((!working_volume.trim() && formObject.isAdded)? 'invalid':'' )} >
                            <TextField
                                id="standard-name"
                                label="Name"

                                value={working_volume}
                                className="custom-container"
                                label={"Շարժիչի աշխատանքային ծավալ *"}
                                placeholder={"Շարժիչի աշխատանքային ծավալ *"}
                                onChange={handleChange()}
                                margin="normal" />
                        </div>
                    </Grid>



                    <ReactDropzone
                        accept="image/*"
                        onDrop={onPreviewDrop}
                    >
                        {({ getRootProps, getInputProps }) => (
                            <section className="dropZone-wrapper">
                                <div className="dropZone" {...getRootProps()}>
                                    <input {...getInputProps()} />
                                    <p>Drag 'n' drop some files here, or click to select files</p>
                                </div>
                            </section>
                        )}
                    </ReactDropzone>
                    {/* <Dropzone
                        getUploadParams={getUploadParams}
                        onChangeStatus={handleChangeStatus}
                        // onSubmit={handleSubmit}

                        initialFiles={[...files]}
                        accept="image/*"
                    /> */}



                    {files.length > 0 && (
                        <div style={{ width: '100%' }}>

                            {files.map((file,index) => {

                                return (



                                    <div className={'imgContainer'}  style={{display:'inline-block', position:'relative'}}>


                                        <img
                                            alt="Preview"
                                            key={file.preview}
                                            src={URL.createObjectURL(file)}
                                            style={{
                                                display: "inline",
                                                width: 100,
                                                height: 100,
                                                marginRight: 10,
                                                marginTop: 10
                                            }}
    
                                        />
                                        <div className="removeImage" onClick= {function(event){
                                            files.splice(index,1);
                                            setFiles([...files]);
                                            // event.target.closest('.imgContainer').remove()
                                        }}>x</div>

                                    </div>
                                )
                            }
                            )}
                        </div>
                    )}

                </div>

            </div>
        </div>
    )
}
