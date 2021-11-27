const tools = require("../tools/createCompareList");
const tools_2 = require("../tools/createNewNumLists");

const db = require("../models");
const NumList = db.numLists;
const CompareList = db.compareLists;
const NewNumList = db.NewNumList;

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

exports.createNewNumList =  async (req, res) => {
    if(!req.body){
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }
    var names = req.body.names ? req.body.names : [];
    var chosen_array = req.body.chosen_array ? req.body.chosen_array : [];
    try{
        var result = await tools_2.createNewNumList(names , chosen_array);
        res.send(result);
    }
    catch(err){
        console.log(err);
        res.status(500).send({message: "ERROR"})
    }
    

    
}

// createNewNumList Test

    // Test OK  
// exports.findUniqueValues = (req, res) => {
//     var dump_data = [["01","02","03"],["04","02","03"],["05","04","03"],["07","05","06"]];
//     var result = tools_2.findUniqueValues(dump_data);
//     res.send(result);
// }

// exports.elementCount = (req, res) => {
//     var dump_data = [["01","02","03"],["04","02","03"],["05","04","03"],["07","05","06"]];
//     var dump_uniq = ["01","02","03","04","05","07","06"];
//     var result = tools_2.elementCount(dump_uniq, dump_data);
//     res.send(result);
// }

// exports.f1 = (req, res) => {
//     var dump_data = [["01","02","03"],["04","02","03"],["05","04","03"],["07","05","06"]];
//     var result = tools_2.f1(dump_data);
//     res.send(result);
// }

// exports.f2 = async (req, res) => {
//     var result = await tools_2.f2(["B00001","B00002","B00003", "B00004"]);
//     res.send(result);
// }

// exports.f3 = async (req, res) => {
//     var result = await tools_2.f3(["B00001","B00002","B00003", "B00004"]);
//     res.send(result);
// }



/* createCompareList Test

exports.createCompareListData = (req, res) => {
    
    var dump_data = [{name : "B0001", numList: ["0","1","2"]},
    {name : "B0002", numList: ["2","3","4"]},
    {name : "B0003", numList: ["3","4","5"]},
    {name : "B0004", numList: ["4","5","6"]}, ]
    var sign = "ge";
    var margin = 1;
    var arr = ["2","3"];
    var result = tools.createCompareListData(arr,sign,margin,dump_data);
    res.send(result);
}

// Test OK!

exports.checkCount = (req, res) => {
    var count = 4;
    var sign = "ge";
    var margin = 3;
    var check = tools.checkCount(count, sign, margin);
    console.log(check);
    res.send({
        message: "OK"
    })
}

// Test OK!
exports.countMatchingElements = (req, res) => {
    var dump_data_1 = ["a1", "a2", "a3"];
    var dump_data_2 = ["a2", "a3", "a4"];

    var result = tools.countMatchingElements(dump_data_1, dump_data_2);
    console.log(result);
    res.send("OK");
}


// Test OK!
exports.getLastStep = (req, res) => {

    var dump_data = [{
        phaseStep : 1, data: "1"
    }, {phaseStep : 3, data: "2"}, {phaseStep : 4, data: "3"}, {phaseStep : 3, data: "4"}, {phaseStep : 2, data: "5"}]

    var result = tools.getLastStep(dump_data);
    res.send(result);
}

*/