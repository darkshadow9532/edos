// F1 - createCompareListFromInputAndName
// const NumLists = require("../controllers/numList.controller.js");
// const CompareLists = require("../controllers/compareList.controller.js");

const db = require("../models");
const NumList = db.numLists;
const CompareList = db.compareLists

function countMatchingElements(array1, array2){
    const intersection = array2.filter(element => array1.includes(element));
    var count = intersection.length;
    return count;
}

function getLastStep(compareLists){
    // console.log("getLastStep");
    var maxStep = 0;
    var lastStep = {};
    compareLists.forEach(e =>{
        if(e.phaseStep > maxStep){
            maxStep = e.phaseStep;
        }
    })
    compareLists.forEach(e =>{
        if(e.phaseStep == maxStep){
            lastStep = e;
        }
    })
    return lastStep;
}

function checkCount(count, sign, margin){
    // console.log("checkCount");
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

function createCompareListData(arr, sign, margin, data){
    // console.log("createCompareListData");
    var result = [];
    data.forEach(e => {
        var count = countMatchingElements(e.numList, arr);
        var compare = checkCount(count, sign, margin);
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
    // console.log("arr", arr);
    // console.log("sign", sign);
    // console.log("margin", margin);
    var result = [];
    var data = await NumList.find();
    // console.log(data);
    result = createCompareListData(arr, sign, margin, data);
    return result;
}

async function f4b(arr, phaseCode, sign, margin){
    var result = [];
    var data = await CompareList.find({phaseCode: phaseCode})
    // console.log("f4b data", data);
    var len = data.length;

    if (len == 0) {
        result = await f4a(arr, sign, margin);
        var compareList = new CompareList({
            phaseCode: phaseCode,
            phaseStep: 1,
            data: result
        });
        try {
            var newCompare = await compareList
                .save(compareList);
            // console.log(newCompare);
            return newCompare;
        } catch(err) {
            console.log(err);
            return { message: "ERROR"};
        }
        
        // console.log("len = 0: result =", result);
    } else {
        var lastStep = getLastStep(data);
        // console.log("lastStep: ", lastStep);
        result = createCompareListData(arr, sign, margin, lastStep.data);
        var compareList = new CompareList({
            phaseCode: phaseCode,
            phaseStep: lastStep.phaseStep + 1,
            data: result
        });
        try {
            var newCompare = await compareList
                .save(compareList);
            console.log(newCompare);
            return newCompare;
        } catch {
            console.log(err);
            return { message: "ERROR"};
        }
        // console.log("len != 0: result =", result);
    }

    // return result;
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

async function createCompareList(arr, phaseCode, sign, margin){
    var CompareList = await f4b(arr, phaseCode, sign, margin);
    // console.log(CompareList);
    return CompareList;
}

// module.exports.getLastStep = getLastStep;
// module.exports.countMatchingElements = countMatchingElements;
// module.exports.checkCount = checkCount;
// module.exports.createCompareListData = createCompareListData;
module.exports.createCompareList = createCompareList;