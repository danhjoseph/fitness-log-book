import React from "react";
import { MdEdit, MdDeleteForever } from "react-icons/md";

function ExerciseRow({ exercise, onDelete, onEdit }) {
  const [year, month, day] = exercise.date.split("-");

  const date = [month, day, year.slice(2, 4)].join("/");

  return (
    <>
      <tr>
        <td>{exercise.name}</td>
        <td>{exercise.reps}</td>
        <td>{exercise.weight}</td>
        <td>{exercise.unit}</td>
        <td>{date}</td>
        <td>
          <MdEdit className="Button" onClick={() => onEdit(exercise)} />
        </td>
        <td>
          <MdDeleteForever
            className="Button"
            onClick={() => onDelete(exercise._id)}
          />
        </td>
      </tr>
    </>
  );
}
export default ExerciseRow;
