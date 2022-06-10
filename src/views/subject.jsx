import React from "react";
import Cards from "../components/subjectDashboard/cards";
export default function Physics() {
  return (
    <div>
      <Cards subject={window.location.pathname.split("/")[2]} />
    </div>
  );
}
