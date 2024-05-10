// App.jsx
import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "./App.css";
import "./index.css";
import Movies from "./components/Movies";
import SingleMovie from "./components/SingleMovie";
import Login from "./components/Login";
import Register from "./components/Register";
import Account from "./components/Account";

function App() {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

//   const handleAdminLogin = () => {
//   const adminUsername = "queen";
//   const adminPassword = "queenadmin";

//   // Simulate user input for username and password
//   const username = prompt("Enter username:");
//   const password = prompt("Enter password:");

//   // Check if the entered username and password match the admin credentials
//   if (username === adminUsername && password === adminPassword) {
//     // If the credentials match, set isAdmin to true
//     setisadmin(true);
//     alert("Successfully logged in as admin!");
//   } else {
//     // If the credentials do not match, display an error message
//     alert("Invalid username or password. Please try again.");
//   }
// }

  return (
    
    <div>
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link className="navbar-brand" to="/">
            {/* <div className="logo-container"> */}
              <img
                src="../public/ReelRaveLogo.png"
                alt="Website Logo"
                className="logo"
              />
            {/* </div> */}
            Movies
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            {token ? (
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/users/me">
                    Account
                  </Link>
                </li>
              </ul>
            ) : (
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Sign In
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">
                    Create Account
                  </Link>
                </li>
              </ul>
            )}
          </div>
        </nav>
      </div>

      <div>
        <Routes>

          <Route path='/' element={<Movies userId={userId}  token={token} setIsAdmin={setIsAdmin} isAdmin={isAdmin} />} />
          <Route path='/api/movies/:movieId' element={<SingleMovie token={token} userId={userId} />} />
          <Route path='/login' element={<Login setToken={setToken} setUserId={setUserId} userId={userId} setIsAdmin={setIsAdmin} isAdmin={isAdmin}  />} />
          <Route path='/register' element={<Register setToken={setToken} setUserId={setUserId} />} />
          <Route path='/users/me' element={<Account token={token} userId={userId} />} />

        </Routes>
      </div>
      </div>
  );
}

export default App;
