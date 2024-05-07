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

          <Route path='/' element={<Movies userId={userId} />} />
          <Route path='/api/movies/:movieId' element={<SingleMovie token={token} userId={userId} />} />
          <Route path='/login' element={<Login setToken={setToken} setUserId={setUserId} userId={userId} />} />
          <Route path='/register' element={<Register setToken={setToken} setUserId={setUserId} />} />
          <Route path='/users/me' element={<Account token={token} userId={userId} />} />

        </Routes>
      </div>
      </div>
  );
}

export default App;
