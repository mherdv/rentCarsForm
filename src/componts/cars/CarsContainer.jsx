import React, { useState, memo,useMemo, useCallback} from 'react';
import UserContext from '../../contextBigForm';

import Cars from './Cars';
let someIndex = 0;
const CarsContainer = memo( ({cars}) => {
    
    




    const [carsClone,changeCarsClone] = useState([]) 

    return (
      

        <div id='carsContainer'>

            {cars.map((car, index) => {
                    
                    return  <Cars  key={index + '_car'}  index={index} thisCarForm={car} />
                
            })}


        </div>

    );
});

export default CarsContainer;