import React from "react";
import { Link } from "react-router-dom";

function Navigation() {
  return (
    <nav>
      <Link classname="Link" to="/">Home</Link>
      <Link className="Link" to="/create">Add</Link>
    </nav>
  );
}

export default Navigation;
