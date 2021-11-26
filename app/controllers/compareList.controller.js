const db = require("../models");
const CompareList = db.compareLists;

// Create and Save a new Action
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({ message: "Content can not be empty!" });
      return;
    }
  
    // Create a Action
    const compareList = new CompareList({
        phaseCode: req.body.phaseCode,
        phaseStep: req.body.phaseStep,
        data: req.body.data
    });
  
    // Save Action in the database
    compareList
      .save(compareList)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Action."
        });
      });
  };

// Retrieve all Actions from the database.
exports.findAll = (req, res) => {
    var condition = {}

    CompareList.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving actions."
      });
    });
};

// Find Actions by Attributes
// exports.findByAttributes = (req, res) => {
//   const { invoiceCode, actionName, actionStatus, actionData } = req.query;
//   var query = {
//     invoiceCode: invoiceCode,
//     actionName: actionName,
//     actionStatus: actionStatus,
//     actionData: actionData
//   }
//   var condition = {}
//   for (var key in query){
//     if (query[key]){
//       condition[key] = query[key];
//     }
//   }
  

//     Action.find(condition)
//     .then(data => {
//       res.send(data);
//     })
//     .catch(err => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while retrieving actions."
//       });
//     });
// };

// Find a single Action with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
  
    CompareList.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found Action with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving Action with id=" + id });
      });
  };

// Update a Action by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!"
      });
    }
  
    const id = req.params.id;
  
    CompareList.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update Action with id=${id}. Maybe Action was not found!`
          });
        } else res.send({ message: "Action was updated successfully." });
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Action with id=" + id
        });
      });
  };

// Delete a Action with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
  
    CompareList.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Action with id=${id}. Maybe Action was not found!`
          });
        } else {
          res.send({
            message: "Action was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Action with id=" + id
        });
      });
  };
// Delete all Actions from the database.
exports.deleteAll = (req, res) => {
    CompareList.deleteMany({})
      .then(data => {
        res.send({
          message: `${data.deletedCount} Actions were deleted successfully!`
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all actions."
        });
      });
};