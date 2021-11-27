const db = require("../models");
const NumList = db.numLists;

function createFullElement(){
    var result = [];
    for( i = 0; i<=99;i ++){
        if (i<10){
            var temp = "0"+i;
        }
        else {
            var temp = i.toString();
        }
        result.push(temp);
    }
    return result;
}

function findOtherElements(elements){
    var full_element = createFullElement();
    other_elements = full_element.filter( e => !elements.includes(e));
    return other_elements;
}

function findUniqueValues(array_of_array){
    var unique_elements = []
    array_of_array.forEach(e => {
        e.forEach(e_e => {
            if(! unique_elements.includes(e_e)){
                unique_elements.push(e_e);
            }
        });
    });
    return unique_elements;
}

function elementCount(unique_elements, array_of_array){
    var elementsCount = {}
    var max_value = 0;
    unique_elements.forEach(e => {
        elementsCount[e] = 0;
        array_of_array.forEach(array => {
            if(array.includes(e)){
                elementsCount[e]++;
            }
        })
        if( elementsCount[e] > max_value){
            max_value = elementsCount[e];
        }
    });
    return {
        elementsCount: elementsCount,
        max_value: max_value
    }
}

function f1(array_of_array){

    var unique_elements = findUniqueValues(array_of_array);
    var other_elements = findOtherElements(unique_elements);

    var result = {
        0: other_elements
    };
    var {elementsCount, max_value} = elementCount(unique_elements, array_of_array);
    // console.log(elementsCount);
    // console.log("max_value:", max_value);
    for ( i = 1; i <= max_value; i++ ){
        // console.log("Hi");
        result[i] = [];
        for( const [key, value] of Object.entries(elementsCount)){
            // console.log(key, value);
            if (value == i){
                result[i].push(key);
            }
        }
    }    
    return result;
}

async function f2(names){
    var numListsFilter = await NumList.find({ name: { $in : names}});
    return numListsFilter;
}

async function f3(names){
    var numListsFilter = await f2(names);
    var array_of_array = []
    numListsFilter.forEach(e => {
        array_of_array.push(e.numList);
    })
    var result = f1(array_of_array);
    return result;
}

// async function createCountListFromNames(names){
//     var result = await f3(names);
//     return result;
// }

async function createNewNumList(names, chosen_array){
    var countList = await f3(names);
    var result = [];
    chosen_array.forEach(e => {
        if(countList[e]){
            countList[e].forEach(e_e => {
                result.push(e_e);
            });
        }
    })
    return result.sort();
}

module.exports.findUniqueValues = findUniqueValues;
module.exports.elementCount = elementCount;
module.exports.f1 = f1;
module.exports.f2 = f2;
module.exports.f3 = f3;
module.exports.createNewNumList = createNewNumList;