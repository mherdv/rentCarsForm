import React, { memo } from "react";

import Cars from "./Cars";

const CarsContainer = memo(({ cars }) => {
  return (
    <div id="carsContainer">
      {cars.map((car, index) => {
        car.uniqueId || (car.uniqueId = "1_unique");
        return (
          <Cars key={car.uniqueId + "_car"} index={index} thisCarForm={car} />
        );
      })}
    </div>
  );
});

export default CarsContainer;
