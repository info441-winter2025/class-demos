import React from "react";
import "./styles.css";

function App() {
  const handleLogin = () => {
    alert("This will later trigger Azure.");
  };

  return (
    <div className="Container">
      <button className="button" onClick={handleLogin}>
        LOGIN
      </button>
    </div>
  );
}

export default App;
