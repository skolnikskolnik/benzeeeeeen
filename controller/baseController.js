const db = require("../models");

module.exports = {

    //Gets all acids from the db
    findAll: function(req, res) {
        db.Base
          .find(req.query)
          .then(dbModel => res.json(dbModel))
          .catch(err => res.status(422).json(err));
      },

    //Creates a new Base in the db
    create: function (req, res) {
        console.log(req.body);
        
        db.Base
            .create(req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },

    //Deletes an Base from the db
    remove: function (req, res) {
        db.Base
            .findById({ _id: req.params.id })
            .then(dbModel => dbModel.remove())
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },

    //Edits an existing entry into the db
    update: function(req, res){
        db.Base
        .findOneAndUpdate({ _id: req.params.id }, req.body)
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    }
    
}