/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
import axios from 'axios';

export default function Login() {
  const [error, setError] = useState('');
  const [msg, setMsg] = useState('');
  const getUser = (event) => {
    event.preventDefault();
    axios
      .get(
        `/users/${event.target.username.value}/${event.target.password.value}`
      )
      .then((res) => {
        if (res.data.status === 0) {
          setError(res.data.data);
          setMsg('');
        } else {
          setMsg('login successfull');
          window.location.pathname = '/';
          setError('');
        }
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="fluid-container border border-primary w-25 mx-auto mt-3 p-3">
      <h1>Login Here</h1>
      <p className="error">{error}</p>
      <form onSubmit={getUser}>
        <div className="form-label">
          <b>Enter Username:</b>
        </div>
        <input
          type="text"
          placeholder="User Name"
          name="username"
          required
          className="w-100 p-2 mb-2"
        />
        <br />
        <div className="form-label">
          <b>Enter Password:</b>
        </div>
        <input
          type="password"
          placeholder="password"
          name="password"
          required
          className="w-100 p-2 mb-2"
        />
        <br />
        <button
          type="submit"
          className="btn btn-primary btn-lg m-2 mx-auto w-100"
        >
          Login
        </button>
      </form>
      <p className="msg">{msg}</p>
    </div>
  );
}
