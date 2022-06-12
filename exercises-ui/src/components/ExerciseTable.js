import React from "react";
import ExerciseRow from "./ExerciseRow";

function ExerciseTable({ exercises, onDelete, onEdit }) {
  return (
    <>
      <table id="exercises">
        <thead>
          <tr>
            <th>Name</th>
            <th>Reps</th>
            <th>Weight</th>
            <th>Unit</th>
            <th>Date</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {exercises.map((exercise, i) => (
            <ExerciseRow
              exercise={exercise}
              onEdit={onEdit}
              onDelete={onDelete}
              key={i}
            />
          ))}
        </tbody>
      </table>
    </>
  );
}

export default ExerciseTable;
