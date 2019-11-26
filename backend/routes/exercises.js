const router = require("express").Router();

let Exercise = require("../models/exercise.model");

//Get All
router.route("/").get((req, res) => {
  Exercise.find()
    .then(exercises => res.json(exercises))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/").post((req, res) => {
  const username = req.body.username;
  const description = req.body.description;
  const duration = Number(req.body.duration);
  const date = Date.parse(req.body.date);

  const newExercise = new Exercise({
    username,
    description,
    duration,
    date
  });

  newExercise
    .save()
    .then(data => {
      return res.json(data);
    })
    .catch(err => {
      return res.status(400).json("Error: " + err);
    });
});

router.route("/:id").get((req, res) => {
  Exercise.findById(req.params.id)
    .then(exercise => {
      if (exercise) return res.json(exercise);
      else return res.status(404).json("Error: exercise not found.");
    })
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
  Exercise.findByIdAndDelete(req.params.id)
    .then(exercise => {
      if (exercise) {
        res.json("Exercise deleted");
      } else {
        return res.status(404).json("Error: exercise not found.");
      }
    })
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/:id").put((req, res) => {
  Exercise.findById(req.params.id)
    .then(exercise => {
      if (exercise) {
        exercise.username = req.body.username;
        exercise.description = req.body.description;
        exercise.duration = Number(req.body.duration);
        exercise.date = Date.parse(req.body.date);
        return exercise.save();
      }
    })
    .then(exercise => {
      if (exercise) {
        return res.json(exercise);
      } else {
        return res.status(404).json("Error: exercise not found.");
      }
    })
    .catch(err => {
      return res.status(400).json("Error: " + err);
    });
});

module.exports = router;
