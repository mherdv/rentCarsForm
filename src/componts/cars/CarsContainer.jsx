import React, { useState, memo, useMemo, useCallback } from "react";
import UserContext from "../../contextBigForm";

import Cars from "./Cars";

const CarsContainer = memo(({ cars }) => {
  return (
    <div id="carsContainer">
      {cars.map((car, index) => {
        return !car.isRemoved ? (
          <Cars key={car.uniqueId + "_car"} index={index} thisCarForm={car} />
        ) : null;
      })}
    </div>
  );
});

export default CarsContainer;
