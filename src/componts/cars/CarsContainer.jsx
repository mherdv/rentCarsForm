import React, { useState, useEffect, useContext , memo} from 'react';
import UserContext from '../../contextBigForm';

import Cars from './Cars';

const CarsContainer = memo( ({cars}) => {
    
    // console.log(123456878)  
    return (
      

        <div id='carsContainer'>

            {cars.map((car, index) => {

                return  <Cars  key={index + '_car'}  index={index} thisCarForm={car} />
            })}

            {/* [...CarsArray] */}
        </div>

    );
});

export default CarsContainer;