import "./App.css";
import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import EditExercises from "./pages/EditExercises";
import CreateExercises from "./pages/CreateExercises";
import Navigation from "./components/Navigation";

function App() {
  const [exerciseToEdit, setExerciseToEdit] = useState([]);
  return (
    <div className="App">
      <Router>
        <header className="Header">
          <h1>Workout Log</h1>
          <p>Stay Up to Date on Your Fitness Goals!</p>
        </header>
        <Navigation></Navigation>
        <div className="Body">
          <Route path="/" exact>
            <HomePage setExerciseToEdit={setExerciseToEdit} />
          </Route>
          <Route path="/edit">
            <EditExercises exerciseToEdit={exerciseToEdit} />
          </Route>
          <Route path="/create">
            <CreateExercises />
          </Route>
        </div>
        <footer className="Footer">
          <p>&copy;2022 Daniel Joseph</p>
        </footer>
      </Router>
    </div>
  );
}

export default App;
