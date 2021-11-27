module.exports = app => {
    const NumLists = require("../controllers/newNumList.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", NumLists.create);
  
    // Retrieve all Tutorials
    router.get("/", NumLists.findAll);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", NumLists.findOne);

    // Update a Tutorial with id
    router.put("/:id", NumLists.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", NumLists.delete);
  
    // Create a new Tutorial
    router.delete("/", NumLists.deleteAll);
  
    app.use('/api/numLists', router);
  };