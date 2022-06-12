import mongoose from "mongoose";
import "dotenv/config";

mongoose.connect(process.env.MONGODB_CONNECT_STRING, { useNewUrlParser: true });

const db = mongoose.connection;

// Define Schema
const exerciseSchema = mongoose.Schema({
  name: { type: String, required: true },
  reps: { type: Number, required: true },
  weight: { type: Number, required: true },
  unit: { type: String, required: true },
  date: { type: String, required: true },
});

const Exercise = mongoose.model("Exercise", exerciseSchema);

// Create exercise
const createExercise = async (name, reps, weight, unit, date) => {
  const exercise = new Exercise({
    name: name,
    reps: reps,
    weight: weight,
    unit: unit,
    date: date,
  });
  return exercise.save();
};

// Retrieve all exercises
const getExercise = async () => {
  const data = Exercise.find({});
  return data.exec();
};

// Retrieve exercise by ID
const getExerciseByID = async (id) => {
  const data = Exercise.findById(id);
  return data.exec();
};

//Update exercise by ID
const updateExecise = async (_id, updates) => {
  const data = await Exercise.findOneAndUpdate({ _id: _id }, updates, {
    new: true,
  });
  return data;
};

//Delete exercise by ID
const deleteExercise = async (_id) => {
  const result = await Exercise.deleteOne({ _id: _id });
  return result.deletedCount;
};

db.once("open", () => {
  console.log("Successfully connected to MongoDB using Mongoose!");
});

export {
  createExercise,
  getExercise,
  getExerciseByID,
  updateExecise,
  deleteExercise,
};
