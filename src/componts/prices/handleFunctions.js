const addingCarPrices = (input, changeValue,thisPrices) => event => {



    let target = event.target;
    let value = target.value.replace(/\,/g, '');
    if (event.target.value.length >= 9) {


        target.value = target.value.slice(0, target.value.length - 1);
        return
    };


    thisPrices.prices[input.index] = event.target.value;

    let newValue = new Intl.NumberFormat('ja-JP').format(value)

    if (isNaN(value) || newValue === '0') {
        newValue = "";
    }

    event.target.value = newValue;
    // lastValue = newValue;
    input.value = event.target.value;

    event.target.setAttribute('value', input.value);

    changeValue(newValue)

    if (!event.target.value) {
        delete thisPrices.prices[input.index];
    }


    if (!Object.keys(thisPrices.prices).length) {
        thisPrices.isValid = false;
    } else {
        thisPrices.isValid = true
    }




}

function addPrice(prices, changePrices) {
    let priceObj = {}
    prices.push(priceObj);

    changePrices([...prices]);

}

function setCheckboxesState(clear=true,changeCheckboxes,carFromeOut,checkboxes){
    let checkB = carFromeOut.map((car,index)=>{

        let label = '';
        if(car.inputs[0].value || car.inputs[1].value){
            if(car.inputs[0]){
                label+= car.inputs[0].value;
            }
            if(car.inputs[1]){
                label+= ' '+ car.inputs[1].value;
            }
        }
        return {
            label,
            car,
            checked:clear &&((checkboxes[index] && checkboxes[index].checked ) || false)

        }
    })
    

    changeCheckboxes([...checkB])
    // console.log(checkboxes,checkB)
}

function deletePrice(prices, changePrices, index,setCheckboxesState,changeCheckboxes,carFromeOut,checkboxes,thisPrices) {


    prices.splice(index, 1);


    changePrices([...prices]);

    setCheckboxesState(false,changeCheckboxes,carFromeOut,checkboxes);
    thisPrices.isValid = false;

    
}



function handleChange  (index,className ,callback,cars,changeCars,thisPrices){
    
    
    
   return  event => {
    
        let thisClassElements = [...document.querySelectorAll(className)];
    
        cars[index].priceForm = null;
    
        thisClassElements.forEach(checkbox => {
            let input = checkbox.querySelector('input')
            if (input !== event.target.closest('input') && input.checked && event.isTrusted) {
    
                input.click()
    
            }
    
            if (input.checked) {
    
                cars[index].priceForm = thisPrices;
    
    
            }
    
    
        })
    
        changeCars([...cars]);
    
    
    
        callback()
        // console.log( )
    };
} 

export {addingCarPrices,addPrice,setCheckboxesState,deletePrice,handleChange};