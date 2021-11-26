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

    // Main Routes
    router.post('/createCompareList', Tools.createCompareList );

    app.use('/api/tools', router);
};