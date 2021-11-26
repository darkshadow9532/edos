// F1 - createCompareListFromInputAndName
// const NumLists = require("../controllers/numList.controller.js");
// const CompareLists = require("../controllers/compareList.controller.js");

const db = require("../models");
const NumList = db.numLists;
const CompareList = db.compareLists

function getLastStep(compareLists){
    var maxStep = 0;
    var lastStep = {};
    compareLists.forEach(e =>{
        if(e.phaseStep > maxStep){
            maxStep = phaseStep;
        }
    })
    compareLists.forEach(e =>{
        if(e.phaseStep == maxStep){
            lastStep = e;
        }
    })
    return lastStep;
}

function countMatchingElements(array1, array2){
    const intersection = array1.filter(element => array2.includes(element));
    var count = intersection.length;
    return count;
}

function f2(count, sign, margin){
    if(sign == "ge"){
        if(count >= margin){
            return true;
        } else {
            return false;
        }
    } else if (sign == "le"){
        if(count <= margin){
            return true;
        } else {
            return false;
        }
    }
    else {
        return false;
    }
}

function f3(arr, sign, margin, data){
    var result = [];
    data.forEach(e => {
        var count = countMatchingElements(e.numList, arr);
        var compare = f2(count, sign, margin);
        if (compare){
            result.push({
                name: e.name,
                numList: e.numList,
                value: count
            })
        }
    })
    return result;
}

async function f4a(arr, sign, margin){
    var result = [];
    await NumList.find()
        .then((data) => {
            result = f3(arr, sign, margin, data);
        })
        .catch((err) => {
            console.log(err);
        })
    return result;
}


async function f4b(arr, phaseCode, sign, margin){
    var result = [];
    await CompareList.find({phaseCode: phaseCode})
        .then((data) => {
            var len = data.length;
            if (len == 0) {
                result = f4a(arr, sign, margin);
            } else {
                var lastStep = getLastStep(data);
                result = f3(arr, sign, margin, lastStep);
            }            
        })
        .catch((err) => {
            console.log(err);
        })
    return result;
}


//controller
// function createCompareListFromInputAndName(arr, phaseCode, sign, margin){
    
//     if(!phaseCode){
//         createNewPhase();
//     }
//     else{
//         names = getNames(phaseCode);
//         createNewPhase(names);
//     }
// }

function createCompareList(arr, phaseCode, sign, margin){
    var CompareListData = await f4b(arr, phaseCode, sign, margin);
    
}