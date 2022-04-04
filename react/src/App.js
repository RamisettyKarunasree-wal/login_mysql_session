import './App.css';
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import axios from 'axios';
import Login from './Login';
import Logout from './Logout';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [login, setLogin] = useState(false);
  const [user, setUser] = useState('');

  useEffect(() => {
    axios
      .get(`/users/loggedUser`)
      .then((res) => {
        console.log(res.data);
        if (res.data.status === 0) {
          setLogin(false);
        } else {
          setLogin(true);
          setUser(res.data.data[0].username);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <BrowserRouter>
      <div className="nav fluid-container bg-dark">
        <div className="row w-100 p-2 m-2">
          {login ? (
            <div className="col">
              <NavLink activeClassName="active" className="links" to="/logout">
                Logout
              </NavLink>
              <div className="col msg">Welcome {user}</div>
            </div>
          ) : (
            <div className="col">
              <NavLink activeClassName="active" className="links" to="/login">
                Login
              </NavLink>
            </div>
          )}
        </div>
      </div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/" />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
