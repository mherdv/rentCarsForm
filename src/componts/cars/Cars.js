import React, { useContext, useState, useEffect } from 'react';


import ReactDOM from 'react-dom';
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

import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';


import { isRequirers } from '../../helper/valdators';

import UserContext from '../../contextBigForm';
let inputDetector = null;

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
    let formObject = useContext(UserContext)[0] || props.formObject;
    let changeFormObject = useContext(UserContext)[1] || props.changeFormObject;

    let carForm = props.thisCarForm;




    const [files, setFiles] = useState([]);
    // console.warn(files)
    //  init values
    useEffect(() => {

        changeInputs(carForm.inputs);
        changeSeats(carForm.seats);
        setFuelType(carForm.fuelType);
        setWorking_volume(carForm.working_volume);

        setFiles(carForm.files);



    }, [carForm])


    useEffect(() => {


        if (!!formObject.errorTexts) return;
        let areInputsValid = true;


        try {
            inputs.forEach(input => {


                if (!!!input.isValid) {
                    areInputsValid = false;
                    formObject.errorTexts = input.label + ' պարտադիր դաշտը լրացված չե կամ սխալ է լրացված  ';
                    throw new Error();
                }
            })
        } catch (e) {

        }


        carForm.isValid = !!(carForm.working_volume && carForm.fuelType.value && areInputsValid);


        if (!carForm.isValid && !formObject.errorTexts) {

            if (!carForm.fuelType.value) {
                formObject.errorTexts = 'Շարժիչի վառելիք  դաշտը պարտադիր է';
            } else {
                formObject.errorTexts = 'Շարժիչի աշխատանքային ծավալ  պարտադիր դաշտը լրացված չե կամ լրացված է սխալ';
            }

        }

        // formObject.errorTexts.push()

        //**************************************************************************************    */ carForm has price  



    })


    if (!carForm.files) {
        carForm.files = [];

    }

    function onPreviewDrop(newFiles) {


        setFiles(files.concat(newFiles))

        carForm.files = files.concat(newFiles);

    };


    ////

    // specify upload params and url for your files
    // const getUploadParams = ({ meta }) => {return { url: 'https://httpbin.org/post' } }

    // // called every time a file's `status` changes
    // const handleChangeStatus = ({ meta }, status) => { if(status ==== 'done'){
    //      onPreviewDrop(meta);

    // }}


    // receives array of files that are done uploading when submit button is clicked
    // const handleSubmit = (files, allFiles) => {
    //     console.log(files.map(f => f.meta))
    //     allFiles.forEach(f => f.remove())
    // }


    const [working_volume, setWorking_volume] = React.useState('');

    if (!carForm.working_volume) {
        carForm.working_volume = '';
    }

    const handleChange = input => event => {

        setWorking_volume(event.target.value)
        carForm.working_volume = event.target.value

    };

    const [fuelType, setFuelType] = React.useState({});


    if (!carForm.fuelType) {
        carForm.fuelType = {
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

        carForm.fuelType.value = event.target.value;

    }

    const handleValueChange = input => event => {
        clearTimeout(inputDetector)
        inputDetector = null
        inputDetector = setTimeout(() => {
            console.log(inputDetector)
            changeFormObject({ ...formObject, cars: formObject.cars })
        }, 500)

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
    if (!carForm.inputs) {
        carForm.inputs = [
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

    if (!carForm.seats) {
        carForm.seats = [
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


    console.log(formObject)

    return (


        <div className="Cars" style={{ textAlign: "left" }}>

            {props.index === 0 ? <Fab color="primary" aria-label="add"
                className={classes.fab + " addCarFormContainer"}
                onClick={
                    function () {

                        let carObj = {}
                        formObject.cars.push(carObj);

                        changeFormObject({ ...formObject });

                        let div = document.createElement('div');

                        div.classList.add('carFormContainer')
                        let elem = <Cars index={formObject.cars.indexOf(carObj)} formObject={formObject} changeFormObject={changeFormObject} thisCarForm={carObj} />

                        ReactDOM.render(
                            elem,
                            div
                        );

                        // ReactDOM.render(<Cars index ={formObject.cars.indexOf(carObj)} thisCarForm={carObj}/>,div);
                        document.querySelector('#carsContainer').appendChild(div)
                    }
                }
            >
                <AddIcon />
            </Fab> : null}
            <div>
                {
                    formObject.cars.length > 1 && props.index !== 0 ?
                        <Fab aria-label="delete"
                            className={classes.fab + ' removeButtonContainer'}
                            onClick={
                                function (event) {
                                    formObject.cars.splice(props.index, 1);

                                    let container = event.target.closest('.carFormContainer')

                                    changeFormObject({ ...formObject , cars: [...formObject.cars]});
                                    // event.target.closest('.carFormContainer').remove();a
                                    
                                    setTimeout(()=>{

                                        ReactDOM.unmountComponentAtNode(container);
                                    })

                                }}>
                            <DeleteIcon />
                        </Fab>

                        : null
                }

                <div className={classes.container + " car-inputs"}>
                    {inputs.map((input, index) => {

                        return (
                            <Grid item xs={6} key={index} className={(!input.isValid && formObject.isAdded) ? 'invalid' : ''}>
                                <TextField
                                    key={index}
                                    id="standard-name"
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
                                    <div className="radio-title">{seat.title}</div>
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


                        <div className={(!fuelType.isValid && formObject.isAdded) ? 'invalid' : ''} >

                            <FormControl className={classes.formControl}  >

                                <InputLabel htmlFor="fuel">Շարժիչի վառելիք</InputLabel>
                                <Select
                                    value={fuelType.value || ''}
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
                        <div className={"custom-container " + ((!working_volume.trim() && formObject.isAdded) ? 'invalid' : '')} >
                            <TextField
                                id="standard-name"

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

                            {files.map((file, index) => {

                                return (



                                    <div className={'imgContainer'} style={{ display: 'inline-block', position: 'relative' }}>


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
                                        <div className="removeImage" onClick={function (event) {
                                            files.splice(index, 1);
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
