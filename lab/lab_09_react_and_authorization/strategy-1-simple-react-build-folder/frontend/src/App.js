import React, { useEffect, useState } from "react";
import "./styles.css";

function App() {
  const [user, setUser] = useState(null); // State to track logged-in user

  // 🔹 Fetch user identity on page load
  useEffect(() => {
    async function checkLoginStatus() {
      try {
        let response = await fetch("/users/myIdentity"); // Calls Express backend
        let identity = await response.json();

        if (identity.status === "loggedin") {
          setUser(identity.userInfo); // Store user info in state
        }
      } catch (error) {
        console.error("Error fetching user identity:", error);
      }
    }

    checkLoginStatus();
  }, []);

  // 🔹 Redirects to Express authentication
  const handleLogin = () => {
    window.location.href = "/signin"; // Redirects to Express' authentication route
  };

  // 🔹 Logs out the user
  const handleLogout = () => {
    window.location.href = "/signout"; // Redirects to Express' logout route
  };

  return (
    <div className="container">
      <h1 className="title">Simple React App</h1>

      {user ? (
        <>
          <p>
            Welcome, {user.name} ({user.username})
          </p>
          <button className="logout-button" onClick={handleLogout}>
            LOGOUT
          </button>
        </>
      ) : (
        <button className="login-button" onClick={handleLogin}>
          LOGIN
        </button>
      )}
    </div>
  );
}

export default App;
