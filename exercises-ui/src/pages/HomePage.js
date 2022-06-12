import React from "react";
import ExerciseTable from "../components/ExerciseTable";
import { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";

function HomePage({ setExerciseToEdit }) {
  const history = useHistory();
  const [exercises, setExercises] = useState([]);

  const loadExercises = async () => {
    const response = await fetch("/exercises");
    const exercises = await response.json();
    setExercises(exercises);
  };

  const onDelete = async (_id) => {
    const response = await fetch(`/exercises/${_id}`, { method: "DELETE" });
    console.log(response);
    if (response.status === 204) {
      console.log("test");
      setExercises(exercises.filter((exer) => exer._id !== _id));
    } else {
      console.error(
        `Failed to delete exercise with id = ${_id}, STATUS CODE = ${response.status}`
      );
    }
  };

  const onEdit = (exercise) => {
    setExerciseToEdit(exercise);
    history.push("/edit");
  };

  useEffect(() => {
    loadExercises();
  }, []);

  return (
    <>
      <h2>Your Exercises</h2>
      <ExerciseTable
        exercises={exercises}
        onDelete={onDelete}
        onEdit={onEdit}
      ></ExerciseTable>
    </>
  );
}

export default HomePage;
