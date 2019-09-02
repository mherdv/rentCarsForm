import React, {memo} from 'react';

import Prices from './Prices';

const PricesContainer = memo(({prices}) => {




    
    
    return (




        <div id='pricesContainer'>

            {prices.map((price, index) => {
                return < div className='priceFormContainer' key={index + '_price'} ><Prices  index={index} thisPriceForm={price}  /></div>
            })}
        </div>

    );
});

export default PricesContainer;