import React, { useState } from "react";
import { useHistory } from "react-router-dom";

export const CreateExercises = () => {
  const [name, setName] = useState("");
  const [reps, setReps] = useState("");
  const [weight, setWeight] = useState("");
  const [unit, setUnit] = useState("");
  const [date, setDate] = useState("");

  const history = useHistory();

  const addExercise = async () => {
    const newExercise = { name, reps, weight, unit, date };
    const response = await fetch("/exercises", {
      method: "POST",
      body: JSON.stringify(newExercise),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status === 201) {
      alert("Successfully added the exercise!");
    } else {
      alert(`Failed to add exercise!, STATUS CODE ${response.status}`);
    }
    history.push("/");
  };

  return (
    <div className="Add">
      <h1>Add Exercise</h1>
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
        // type="text"
        placeholder="Date MM-DD-YY"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <button onClick={addExercise}>Add</button>
    </div>
  );
};

export default CreateExercises;
