// F1 - createCompareListFromInputAndName
const NumLists = require("../controllers/numList.controller.js");
const CompareLists = require("../controllers/compareList.controller.js");

const db = require("../models");
const NumList = db.numLists;

class Model{
    constructor(){
        this.numLists = [];
        this.compareList = {};
    }

    getNumLists(){
        var that = this;
        
        NumLists.findAll(req, res)
        .then(res => {
            console.log(res);
            that.numLists = res;
        });
    }

    createCompareList(){
        var compareList = new CompareLists({});
        
    }

    compareNumListsWithArray(arr){
        var that = this;
        that.numLists.forEach(e => {
            var value = countMatchingElements(e.numList, arr);
            var temp =  {
                name: e.name,
                value: value
            }
            that.compareList.data.push(temp);
        })
    }
}




function countMatchingElements(arr1, arr2){
    const intersection = array1.filter(element => array2.includes(element));
    var count = intersection.length;
    return count;
}

function createNewPhase(names){
    if (!names){
        
    }
}

//controller
function createCompareListFromInputAndName(arr, phaseCode, sign, origin){
    
    if(!phaseCode){
        createNewPhase();
    }
    else{
        names = getNames(phaseCode);
        createNewPhase(names);
    }
}