const tools = require("../tools/functions");

const db = require("../models");
const NumList = db.numLists;
const CompareList = db.compareLists;

exports.createCompareList = (req, res) => {
    if(!req.body){
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }
    var arr = req.body.arr;
    var phaseCode = req.body.phaseCode;
    var sign = req.body.sign;
    var margin = req.body.margin;

    tools.createCompareList(arr, phaseCode, sign, margin)
    .then(data => {
        if(data.message){
            res.status(500).send({message: "Fail Create New Compare Phase"})
        }
        else {
            res.send(data);
        }        
    })
    .catch(err => {
        console.log(err);
        res.status(500).send("Internal error!");
    });
}


// // Test OK!

// exports.createCompareListData = (req, res) => {
    
//     var dump_data = [{name : "B0001", numList: ["0","1","2"]},
//     {name : "B0002", numList: ["2","3","4"]},
//     {name : "B0003", numList: ["3","4","5"]},
//     {name : "B0004", numList: ["4","5","6"]}, ]
//     var sign = "ge";
//     var margin = 1;
//     var arr = ["2","3"];
//     var result = tools.createCompareListData(arr,sign,margin,dump_data);
//     res.send(result);
// }

// // Test OK!

// exports.checkCount = (req, res) => {
//     var count = 4;
//     var sign = "ge";
//     var margin = 3;
//     var check = tools.checkCount(count, sign, margin);
//     console.log(check);
//     res.send({
//         message: "OK"
//     })
// }

// // Test OK!
// exports.countMatchingElements = (req, res) => {
//     var dump_data_1 = ["a1", "a2", "a3"];
//     var dump_data_2 = ["a2", "a3", "a4"];

//     var result = tools.countMatchingElements(dump_data_1, dump_data_2);
//     console.log(result);
//     res.send("OK");
// }


// // Test OK!
// exports.getLastStep = (req, res) => {

//     var dump_data = [{
//         phaseStep : 1, data: "1"
//     }, {phaseStep : 3, data: "2"}, {phaseStep : 4, data: "3"}, {phaseStep : 3, data: "4"}, {phaseStep : 2, data: "5"}]

//     var result = tools.getLastStep(dump_data);
//     res.send(result);
// }