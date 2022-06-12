import React, { useState } from "react";
import { useHistory } from "react-router-dom";

export const EditExercises = ({ exerciseToEdit }) => {
  const [name, setName] = useState(exerciseToEdit.name);
  const [reps, setReps] = useState(exerciseToEdit.reps);
  const [weight, setWeight] = useState(exerciseToEdit.weight);
  const [unit, setUnit] = useState(exerciseToEdit.unit);
  const [date, setDate] = useState(exerciseToEdit.date);

  const history = useHistory();

  const editExercise = async () => {
    const editedExercise = { name, reps, weight, unit, date };
    const response = await fetch(`/exercises/${exerciseToEdit._id}`, {
      method: "PUT",
      body: JSON.stringify(editedExercise),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status === 200) {
      alert("Successfully edited the exercise!");
    } else {
      alert(`Failed to edit exercise, STATUS CODE ${response.status}`);
    }
    history.push("/");
  };

  return (
    <div className="Edit">
      <h1>Edit Exercise</h1>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="number"
        placeholder="Total Reps"
        value={reps}
        onChange={(e) => setReps(e.target.value)}
      />
      <input
        type="number"
        placeholder="Weight"
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
      />
      <select value={unit} onChange={(e) => setUnit(e.target.value)}>
        <option value="" selected disabled hidden>
          Unit
        </option>
        <option value="lbs">lbs</option>
        <option value="kgs">kgs</option>
      </select>
      <input
        type="date"
        placeholder="Date MM-DD-YY"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <button onClick={editExercise}>Save Changes</button>
    </div>
  );
};

export default EditExercises;
