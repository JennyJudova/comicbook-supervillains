import React, { useState } from 'react';
import axios from 'axios';

import { Link } from 'react-router-dom';
import Auth from '../../lib/auth';

export default function Register() {
  const [login, setLogin] = useState();
  const [errors, setErrors] = useState();

  const handleChange = (e) => {
    const updateLogin = { ...login };
    setLogin({ ...updateLogin, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    console.log('user', login);
    e.preventDefault();
    // const history = useHistory();
    // const history = useHistory;
    axios
      .post('/api/login', login)
      .then((res) => {
        Auth.setToken(res.data.token);
        console.log(res.data.token);
        // history.push('/villains');
        // this.props.history.goBack();
      })
      .catch((err) => setErrors(err));
  };

  const keyPress = (e) => {
    if (e.keyCode === 13) {
      handleSubmit(e);
    }
  };

  return (
    <div className="mainFormWrapLogin">
      <div className="formWrapper">
        <form className="panelWrapper" onSubmit={handleSubmit}>
          <h2>Login</h2>
          <p>Email</p>
          <input
            name="email"
            placeholder="name@email.com"
            onChange={handleChange}
          />
          <p>Password</p>
          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
          />
          <br />
          {errors && <p>Oops, something went wrong. please try again</p>}
          <button type="submit">Login</button>
          <Link to="/register">
            <small>No account yet? Click here to register.</small>
          </Link>
        </form>
      </div>
    </div>
  );
}
