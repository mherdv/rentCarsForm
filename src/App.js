import React, { useState, useCallback } from "react";
import { makeStyles, MuiThemeProvider } from "@material-ui/core/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import blue from "@material-ui/core/colors/blue";
import red from "@material-ui/core/colors/red";
import PeopleIcon from "@material-ui/icons/People";
import DirectionsCarIcon from "@material-ui/icons/DirectionsCar";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";

import Partner from "./componts/partner/Partner";
import SectionTitle from "./componts/sectionTitle/SectionTitle";
import PricesContainer from "./componts/prices/PricesContainer";

import { UserProvider } from "./contextBigForm.jsx";
import CustomizedSnackbars from "./componts/notification/Notification";
import Paper from "@material-ui/core/Paper";
import CarsContainer from "./componts/cars/CarsContainer";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";

import TextareaAutosize from "@material-ui/core/TextareaAutosize";

import axios from "axios";

import {
  removeEmptyPriceForms,
  setFormPrices,
  carsFormValidationChecking,
  partnerValidationChecking
} from "./helper/validationChackers";
// import { TextField } from "@material-ui/core";

let stateOfApplication = {};

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    textAlign: "center"
  },
  rightIcon: {
    marginLeft: theme.spacing(1)
  }
}));

const materialBlue = blue[900];
const materialRed = red[500];

const theme = createMuiTheme({
  palette: {
    primary: {
      main: materialBlue
    },
    secondary: {
      main: materialRed
    }
  }
});

const App = React.memo(() => {
  const classes = useStyles();

  const [formObject, changeFormObject] = useState({
    partnerInfo: {
      legal_name: "",
      phone_number: "",
      Email: "",
      AVC: "",
      notes: ""
    },
    partnerInfoValidArray: [],
    // todo adding cars checkboxes
    cars: [{ uniqueId: "1_unique" }],
    prices: [{ uniqueId: "1_unique" }],

    errorTexts: "",
    successText: "ձեր հայտն ընդունված Է շնորհակալություն",
    infoText: "ձեր հարցումը մշակվում է խնդրում ենք սպասել ",
    isFormValid: true,
    isAdded: false,
    notificationType: "error",
    isSended: false,
    callBacks: []
    // count:0
  });

  const [cars, changeCars] = useState([{}]);

  const [prices, changePrices] = useState([{}]);

  // useEffect(() => {

  // },[formObject.cars])

  const carsContainer = useCallback(() => {
    return <CarsContainer cars={cars} />;
  }, [cars.length]);

  const pricesContainer = useCallback(() => {
    return <PricesContainer prices={prices} />;
  }, [prices.length]);

  // cb()

  function sendForm() {
    if (formObject.isSended) return;
    formObject.cars = cars;
    formObject.prices = prices;
    formObject.errorTexts = "";
    partnerValidationChecking(formObject);
    carsFormValidationChecking(formObject);
    setFormPrices(formObject);
    removeEmptyPriceForms(formObject);

    let hasError = !!formObject.errorTexts.trim();

    formObject.notificationType = hasError ? "error" : "info";

    changeFormObject({
      ...formObject,
      isAdded: true,
      errorTexts: formObject.errorTexts,
      notificationType: hasError ? "error" : "info"
    });

    if (!hasError) {
      // console.log(formObject);
      const FD = new FormData();

      FD.append(formObject.partnerInfo);
      FD.append(formObject.cars);
      FD.append(formObject.prices);

      axios
        .post("api/save_transportation_data", {
          formObject: JSON.stringify(FD)
        })
        .then(function(response) {
          console.log(response);

          if (response === 1) {
            changeFormObject({ ...formObject, notificationType: "success" });
          }
        });

      formObject.isSended = true;

      // setTimeout(() => {
      //   changeFormObject({ ...formObject, notificationType: "success" });
      // }, 3000);
    }
  }

  return (
    <MuiThemeProvider theme={theme}>
      <div className="form">
        <UserProvider
          value={{
            formObject,
            changeFormObject,
            cars,
            changeCars,
            prices,
            changePrices
          }}
        >
          <form className={classes.container} autoComplete="off">
            <SectionTitle number={<PeopleIcon />} title={"Գործընկեր"} />
            <Paper>
              <Partner />
            </Paper>
            <SectionTitle number={<DirectionsCarIcon />} title={"Ավտոմեքենա"} />

            {carsContainer()}

            <SectionTitle number={<AttachMoneyIcon />} title={"Գներ"} />

            {pricesContainer()}

            <SectionTitle
              number={<MoreHorizIcon />}
              title={"Այլ տեղեկություն "}
            />
            <Paper
              style={{ width: "100%", marginTop: "30px", padding: "30px 10px" }}
            >
              <TextareaAutosize
                // placeholder="v"
                multiline={true}
                aria-label="minimum height"
                rows={3}
                style={{
                  width: "calc(100% - 20px)",
                  margin: "10px",
                  fontSize: "18px"
                }}
                onChange={event => {
                  formObject.partnerInfo.notes = event.target.value.trim();
                }}
              />
            </Paper>

            <CustomizedSnackbars
              type={formObject.notificationType}
              massage={formObject}
              click={sendForm}
              buttonText="Ուղարկել"
            />
          </form>
        </UserProvider>
      </div>
    </MuiThemeProvider>
  );
});

export const appState = stateOfApplication;
export default App;
