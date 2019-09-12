import React, {
  useContext,
  useState,
  useEffect,
  memo,
  useMemo,
  useCallback
} from "react";

import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import "react-dropzone-uploader/dist/styles.css";
import Paper from "@material-ui/core/Paper";

import ReactDropzone from "react-dropzone";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { Add, Delete } from "../addDelete/AddDelete";
import {
  onPreviewDrop,
  addCar,
  deleteCar,
  handleChange,
  selectChange,
  handleValueChange,
  changeComboBoxValue
} from "./handleFunctions";
import DeleteIcon from "@material-ui/icons/Delete";

import { isRequirers } from "../../helper/valdators";

import UserContext from "../../contextBigForm";
import ComboBox from "../comboBox/ComboBox";

let filesCounter = 0;

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    textAlign: "center"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "90%"
  },
  dense: {
    marginTop: 19
  },
  menu: {
    width: 300
  },
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  formControl: {
    // margin: theme.spacing(1),
    minWidth: 120,
    width: "calc(100% )",
    marginTop: 20,
    margin: "auto"
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}));

const Cars = memo(({ index }) => {
  // let { index, thisCarForm } = props;
  const classes = useStyles();
  const { formObject, cars, changeCars } = useContext(UserContext);

  let carForm = cars[index];

  let [carIsRemoved, changeCarIsRemoved] = useState(false);

  const [files, setFiles] = useState([]);
  useEffect(() => {
    changeInputs(carForm.inputs);
    changeSeats(carForm.seats);
    setFuelType(carForm.fuelType);
    setWorking_volume(carForm.working_volume);
    setFiles(carForm.files);
    carForm.isRemoved ? changeCarIsRemoved(true) : changeCarIsRemoved(false);
  }, [carForm]);
  if (!carForm.files) {
    carForm.files = [];
  }
  const [working_volume, setWorking_volume] = useState("");

  if (!carForm.working_volume) {
    carForm.working_volume = "";
  }

  const [fuelType, setFuelType] = useState({});

  if (!carForm.fuelType) {
    carForm.fuelType = {
      name: "",
      multiline: "",
      currency: "",
      isValid: false,
      validators: [isRequirers]
    };
  }

  const [inputs, changeInputs] = useState([]);
  if (!carForm.inputs) {
    carForm.inputs = [
      {
        label: "Մակնիշ *",
        name: "Brand",
        value: "",

        validators: [isRequirers]
      },
      {
        label: "Մոդել *",
        name: "Model",
        value: "",
        validators: [isRequirers]
      },
      {
        label: "Գույնը *",
        name: "Color",
        value: "",
        validators: [isRequirers]
      },
      {
        label: "Արտադրման տարեթիվ *",
        name: "date of production:",
        value: "",
        validators: [isRequirers]
      },
      {
        label: "Ուղևորների նստատեղերի քանակ *",
        name: "Number of passenger seats",
        value: "",
        validators: [isRequirers]
      }
    ];
  }

  const [seats, changeSeats] = useState([]);

  if (!carForm.seats) {
    carForm.seats = [
      {
        title: "Նստատեղերը կաշվից են",
        items: [{ label: "Այո", value: 1 }, { label: "Ոչ", value: 0 }],
        name: "leather",
        value: 0,
        valdators: [isRequirers]
      },
      {
        title: "Նստատեղերը ծալվում են դեպի հետ",
        items: [{ label: "Այո", value: 1 }, { label: "Ոչ", value: 0 }],
        name: "fold back",
        value: 0,
        valdators: [isRequirers]
      },

      {
        title: "Առկա է օդորակիչ ",
        items: [{ label: "Այո", value: 1 }, { label: "Ոչ", value: 0 }],
        name: "ac",
        value: 0,
        valdators: [isRequirers]
      }
    ];
  }
  const getCarModels = useCallback(() => {
    if (inputs[0].value > 10) {
      return [{ label: "a" }];
    }
  }, [inputs[0]]);

  let inputsComponent = useMemo(() => {
    // console.log(getCarModels);
    return inputs.map((input, index) => {
      return (
        <Grid
          item
          xs={6}
          key={index + "_inputs_" + index}
          className={!input.isValid && formObject.isAdded ? "invalid" : ""}
        >
          {index < 2 ? (
            <ComboBox
              options={index === 0 ? formObject.carsMake : getCarModels() || []}
              label={input.label}
              placeholder={input.label}
              input={input}
              index={index}
              carType={inputs[0]}
              handleChange={callBack => {
                return changeComboBoxValue(
                  input,
                  changeInputs,
                  inputs,
                  callBack,
                  cars,
                  changeCars
                );
              }}
            />
          ) : (
            <TextField
              // key={index}
              id="standard-name"
              value={input.value}
              className={classes.textField}
              label={input.label}
              placeholder={input.label}
              onChange={handleValueChange(
                input,
                changeCars,
                changeInputs,
                cars,
                inputs
              )}
              margin="normal"
            />
          )}
        </Grid>
      );
    });
  }, [inputs, formObject.isAdded, formObject.carsMake]);

  let setsComponent = useMemo(() => {
    return seats.map((seat, index) => {
      return (
        <Grid item xs={6} key={index + "_seats_" + index}>
          <div className="radio-container">
            <div className="radio-title">{seat.title}</div>
            <RadioGroup
              onChange={function(event) {
                seat.value = +event.target.value;

                changeSeats([...seats]);
              }}
              value={seat.value}
            >
              <Grid item xs={12}>
                <div>
                  {seat.items.map((option, index) => {
                    // console.log(option)
                    return (
                      <FormControlLabel
                        key={index + "seat" + index}
                        value={option.value}
                        control={<Radio color="primary" />}
                        label={option.label}
                        labelPlacement="end"
                      />
                    );
                  })}
                </div>
              </Grid>
            </RadioGroup>
          </div>
        </Grid>
      );
    });
  }, [seats]);

  let dropZoneComponent = useMemo(() => {
    return (
      <ReactDropzone
        accept="image/*"
        onDrop={newFiles => {
          onPreviewDrop(newFiles, files, setFiles, carForm);
        }}
      >
        {({ getRootProps, getInputProps }) => (
          <section className="dropZone-wrapper">
            <div className="dropZone" {...getRootProps()}>
              <input {...getInputProps()} />
              <p>Ավելացնել նկար</p>
              <CloudUploadIcon style={{ fontSize: 30 }}></CloudUploadIcon>
            </div>
          </section>
        )}
      </ReactDropzone>
    );
  }, [files]);

  let workingVolumeComponent = useMemo(() => {
    return (
      <Grid item xs={6} className={"w90Ma"}>
        <div
          className={
            "custom-container " +
            (!working_volume.trim() && formObject.isAdded ? "invalid" : "")
          }
        >
          <TextField
            id="standard-name"
            value={working_volume}
            className="custom-container"
            label={"Շարժիչի աշխատանքային ծավալ *"}
            placeholder={"Շարժիչի աշխատանքային ծավալ *"}
            onChange={handleChange(setWorking_volume, carForm)}
            margin="normal"
          />
        </div>
      </Grid>
    );
  }, [working_volume, formObject.isAdded]);

  let selectComponent = useMemo(() => {
    return (
      <Grid item xs={6} className={"w90Ma selectContainer"}>
        <div
          className={!fuelType.isValid && formObject.isAdded ? "invalid" : ""}
        >
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="fuel">Շարժիչի վառելիք</InputLabel>
            <Select
              value={fuelType.value || ""}
              onChange={event => selectChange(event, setFuelType, carForm)}
              inputProps={{
                name: "fuel",
                id: "fuel"
              }}
            >
              <MenuItem value={1}>Բենզին</MenuItem>
              <MenuItem value={2}>Գազ</MenuItem>
              <MenuItem value={3}>Դիզվառելիք</MenuItem>
            </Select>
          </FormControl>
        </div>
      </Grid>
    );
  }, [fuelType, formObject.isAdded, formObject.carsMake]);

  let showFiles = useMemo(() => {
    return (
      files.length > 0 && (
        <div style={{ width: "100%" }} className="previewImagesContainer">
          {files.map((file, index) => {
            filesCounter++;

            file.urlRem = file.urlRem || URL.createObjectURL(file);
            return (
              <div
                className={"imgContainer"}
                key={filesCounter + "files"}
                style={{ display: "inline-block", position: "relative" }}
              >
                <img
                  alt="Preview"
                  key={filesCounter + "images"}
                  src={file.urlRem}
                  style={{
                    display: "inline",
                    width: 100,
                    height: 100,
                    marginRight: 10,
                    marginTop: 10
                  }}
                />
                <div
                  className="removeImage"
                  onClick={function(event) {
                    files.splice(index, 1);
                    setFiles([...files]);
                    // event.target.closest('.imgContainer').remove()
                  }}
                >
                  <DeleteIcon />
                </div>
              </div>
            );
          })}
        </div>
      )
    );
  }, [files.length]);

  // let removeCarComponent = useMemo(()=>{
  //     return (cars.length > 1 && index !== 0 ?
  //                          <Delete onClick={() => deleteCar(cars, changeCars, index)} />

  //                          : null)
  // },[index])

  const countCars = useMemo(() => {
    return <div className={"absoluteCounter"}>{index + 1}</div>;
  }, [index]);
  return (
    <>
      {!carIsRemoved ? (
        <div className="carFormContainer">
          {/* {carFormContainer()} */}
          <div className="Cars" style={{ textAlign: "left" }}>
            {index === 0 ? (
              <Add onClick={() => addCar(cars, changeCars)} />
            ) : null}
            <Paper>
              {countCars}
              <div className="car-component">
                {cars.length > 1 && index !== 0 ? (
                  <Delete
                    onClick={() =>
                      deleteCar(cars, changeCars, index, changeCarIsRemoved)
                    }
                  />
                ) : null}

                <div className={classes.container + " car-inputs"}>
                  {inputsComponent}

                  {workingVolumeComponent}

                  {selectComponent}

                  {setsComponent}

                  {dropZoneComponent}

                  {showFiles}
                </div>
              </div>
            </Paper>
          </div>
        </div>
      ) : null}
    </>
  );
});

export default Cars;
