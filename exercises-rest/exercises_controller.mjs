import "dotenv/config";
import express from "express";
import validator from "express-validator";
import * as exercises from "./exercises_model.mjs";

const PORT = process.env.PORT;

const app = express();
const { body, validationResult } = validator;

app.use(express.json());

app.post(
  "/exercises",
  body("name").isAlpha("en-US", { ignore: " " }),
  body("reps").isInt({ min: 1 }),
  body("weight").isInt({ min: 1 }),
  body("unit").isIn(["lbs", "kgs"]),
  // body("date").matches(/^\d\d-\d\d-\d\d$/),
  body("date").isDate(),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.error(errors);
      return res.status(400).send({ Error: "Invalid request" });
    }
    exercises
      .createExercise(
        req.body.name,
        req.body.reps,
        req.body.weight,
        req.body.unit,
        req.body.date
      )
      .then((exercises) => {
        console.log("Exercise Created");
        return res.status(201).json(exercises);
      });
  }
);

//Retrieve exercises by id
app.get("/exercises/:_id", (req, res) => {
  const exerciseID = req.params._id;
  exercises.getExerciseByID(exerciseID).then((exercises) => {
    if (exercises !== null) {
      return res.status(200).json(exercises);
    } else {
      return res.status(404).json({ Error: "Not Found" });
    }
  });
});

// Retrieve all exercises
app.get("/exercises", (req, res) => {
  exercises.getExercise().then((exercises) => {
    return res.status(200).json(exercises);
  });
});

// Update exercise by id
app.put(
  "/exercises/:_id",
  body("name").isAlpha("en-US", { ignore: " " }),
  body("reps").isInt({ min: 1 }),
  body("weight").isInt({ min: 1 }),
  body("unit").isIn(["lbs", "kgs"]),
  // body("date").matches(/^\d\d-\d\d-\d\d$/),
  body("date").isDate(),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.error(errors);
      return res.status(400).send({ Error: "Invalid request" });
    }
    exercises.updateExecise(req.params._id, req.body).then((updated) => {
      if (updated != null) {
        return res.status(200).json(updated);
      } else {
        return res.status(404).json({ Error: "Not Found" });
      }
    });
  }
);

// Delete exercise by id
app.delete("/exercises/:_id", (req, res) => {
  exercises.deleteExercise(req.params._id).then((deleted) => {
    if (deleted === 0) {
      return res.status(404).json({ Error: "Not Found" });
    } else {
      return res.status(204).json();
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
