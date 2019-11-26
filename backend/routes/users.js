const router = require("express").Router();

let User = require("../models/user.model");

router.route("/").get((req, res) => {
  User.find()
    .populate()
    .then(users => res.json(users))
    .catch(err => {
      console.log(err);
      return res.status(400).json("Error" + err);
    });
});

router.route("/:id").get((req, res) => {
  User.findById(req.params.id)
    .populate()
    .then(user => {
      if (user) return res.json(user);
      else return res.status(404).json("Error: Not found.");
    })
    .catch(err => {
      console.log(err);
      return res.status(400).json("Error" + err);
    });
});

router.route("/:id").delete((req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then(user => {
      if (user) return res.json("User deleted");
      else return res.status(404).json("Error: Not found.");
    })
    .catch(err => {
      console.log(err);
      return res.status(400).json("Error" + err);
    });
});

router.route("/").post((req, res) => {
  const username = req.body.username;
  const newUser = new User({ username });
  newUser
    .save()
    .then(data => {
      console.table(data);
      return res.json("User added");
    })
    .catch(err => res.status(400).json("Error: " + err));
});

/**
 * Update
 */
router.route("/:id").put((req, res) => {
  User.findById(req.params.id)
    .then(user => {
      if (user) {
        user.username = req.body.username;
        return user.save();
      }
    })
    .then(user => {
      if (user) {
        return res.json(user);
      } else {
        return res.status(404).json("Error: not found.");
      }
    })
    .catch(err => {
      return res.status(400).json("Error: " + err);
    });
});

module.exports = router;
