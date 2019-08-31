import React ,{useState, useEffect}from 'react';

import Cars from './Cars';

const CarsContainer = (props) => {
    

    // const formObject = props.formObject;
    // const changeFormObject = props.changeFormObject;


    // const [cars,changeCars] = useState(props.cars);


    // useEffect(()=>{
    //     props.formObject.cars = cars;
    // },[cars])


    return (
        <div id='carsContainer'>

            {props.cars.map((car, index) => {

                return <div className='carFormContainer'> <Cars key={index + '_car'}{...props}  thisCarForm={car}/></div>
            })}

        </div>
    );
};

export default CarsContainer;