import React, { useEffect, useState } from "react";
import Welcome from "./components/Welcome";
import Identity from "./components/Identity";
import "./styles.css";

// NOTE: using function components to control state of app and NOT class components
// CSE 331 class uses class components, but functions work too
function App() {
  // KEY POINT HERE!!!
  // using useState to store user info and pass it to the Welcome component
  // (and other components if you add them later)
  const [user, setUser] = useState(null);

  return (
    <div className="container">
      <h1 className="title">Simple React App</h1>
      <Welcome user={user} />
      <Identity onUserFetched={setUser} />
    </div>
  );
}

export default App;
