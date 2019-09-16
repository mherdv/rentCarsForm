import React from "react";
import { Grid, TextField, InputAdornment } from "@material-ui/core";
import IntegrationAutosuggest from "../autoSuggest/AutoSuggest";
import { Add, Delete } from "../addDelete/AddDelete";

function checkValidation(
  route,
  changeInvalidItems,
  invalidItems,
  routes,
  thisPrices
) {
  if (!route.value && !route.price) {
    route.isValid = true;
    invalidItems.value = false;
    invalidItems.price = false;
  } else if (!route.value) {
    route.isValid = false;
    invalidItems.value = true;

    invalidItems.price = false;
  } else if (!route.price) {
    route.isValid = false;
    invalidItems.price = true;

    invalidItems.value = false;
  } else {
    route.isValid = true;
    invalidItems.value = false;
    invalidItems.price = false;
  }

  changeInvalidItems({ ...invalidItems });
  checkRoutesValidation(thisPrices, routes);
}

function checkRoutesValidation(thisPrices, routes) {
  thisPrices.routesAreValid = true;

  thisPrices.hasRoutePrice = false;
  try {
    routes.forEach(route => {
      if (route.value) thisPrices.hasRoutePrice = true;
      if (!route.isValid) throw new Error();
    });
  } catch (e) {
    thisPrices.routesAreValid = false;
    thisPrices.hasRoutePrice = false;
  }
}

const RoutePrice = props => {
  const {
    route,
    pricesForm,
    index,
    thisPrices,
    routes,
    classes,
    changeRoutesForm,
    formObject
  } = props;

  route.price = route.price || "";

  const [price, changePrice] = React.useState(route.price || "");

  const [invalidItems, changeInvalidItems] = React.useState({
    price: false,
    value: false
  });

  React.useEffect(() => {
    route.isValid = true;
  }, []);
  React.useEffect(() => {
    changePrice(route.price);
  }, [route]);

  const autoSuggest = (
    <Grid xs={6}>
      {/* rout name */}
      <IntegrationAutosuggest
        input={route}
        inputsArray={pricesForm}
        index={index}
        thisPrices={thisPrices}
        formObject={formObject}
        invalidItems={invalidItems}
        changeInvalidItems={changeInvalidItems}
        callBack={checkValidation}
        routes={routes}
        currentComponent={thisPrices}
      />
    </Grid>
  );
  const routePrice = (
    <Grid xs={6}>
      <TextField
        className={
          classes.textField + " " + (invalidItems.price ? "invalid" : "")
        }
        invalidItems={invalidItems}
        label={"Գին"}
        placeholder={"Գին"}
        margin="normal"
        value={price}
        onChange={e => {
          if (!route.value) return;
          route.price = e.target.value;
          changePrice(route.price);
          checkValidation(
            route,
            changeInvalidItems,
            invalidItems,
            routes,
            thisPrices
          );
        }}
        InputProps={{
          startAdornment: <InputAdornment position="start">AMD</InputAdornment>
        }}
      />
    </Grid>
  );

  return (
    <div className="relative w-100 dFlex  addRoutePriceContainer ">
      {autoSuggest}

      {routePrice}

      {index > 0 ? (
        <Delete
          onClick={() => {
            routes.splice(index, 1);
            changeRoutesForm([...routes]);

            thisPrices.routes = routes;
            checkRoutesValidation(thisPrices, routes);
          }}
        />
      ) : (
        <Add
          onClick={() => {
            routes.push({ value: "", isValid: true });
            changeRoutesForm([...routes]);

            thisPrices.routes = routes;
            checkRoutesValidation(thisPrices, routes);
          }}
        />
      )}
    </div>
  );
};
export default RoutePrice;
