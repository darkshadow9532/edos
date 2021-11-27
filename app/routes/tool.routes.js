module.exports = app => {
    const Tools = require("../controllers/tool.controller");

    var router = require("express").Router();

    // Test Functions
    // router.get('/', function(req, res){
    //     res.send("OK");
    // });
    // router.get('/createCompareListData', Tools.createCompareListData );
    // router.get('/checkCount', Tools.checkCount );
    // router.get('/countMatchingElements', Tools.countMatchingElements );
    // router.get('/getLastStep', Tools.getLastStep );

    // createNumNumList Function Test:

    // router.get("/findUniqueValues", Tools.findUniqueValues);
    // router.get("/elementCount", Tools.elementCount);
    // router.get("/f1", Tools.f1);
    // router.get("/f2", Tools.f2);
    // router.get("/f3", Tools.f3);
    router.post("/createNewNumList", Tools.createNewNumList);

    // router.get("/createFullElement", )

    // Main Routes
    router.post('/createCompareList', Tools.createCompareList );

    app.use('/api/tools', router);
};