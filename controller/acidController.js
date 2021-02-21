const db = require("../models");

module.exports = {

    //Gets all acids from the db
    findAll: function(req, res) {
        db.Acid
          .find(req.query)
          .then(dbModel => res.json(dbModel))
          .catch(err => res.status(422).json(err));
      },

    //Creates a new acid in the db
    create: function (req, res) {
        db.Acid
            .create(req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },

    //Deletes an acid from the db
    remove: function (req, res) {
        db.Acid
            .findById({ _id: req.params.search })
            .then(dbModel => dbModel.remove())
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    }
    
}