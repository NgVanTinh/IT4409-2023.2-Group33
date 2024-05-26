import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom"
import InstanceAxios from '../api/axios';

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('11')
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (
      (localStorage.getItem('user') && localStorage.getItem('user') != null) ||
      (localStorage.getItem('token') && localStorage.getItem('token') != null)
    ) {
      navigate("/");
    }
  }, [])

  const handleSave = () => {
    /* kminchelle */
    /* 0lelplR */
    setIsSaving(true);
    var em = username;
    var pas = password;

    InstanceAxios.post('/auth/login', {
      userName: em,
      password: pas
    })
      .then(function (response) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
        localStorage.setItem("token", response.data.token);
        console.log('login success')
        navigate("/admin");
        setIsSaving(false);
        setUsername('')
        setPassword('')
      })
      .catch(function (error) {
        let errorMessage = ''
        if (error.response?.data?.errors) {
          let errorObject = error.response?.data?.errors
          Object.keys(errorObject).forEach(key => {
            // console.log(key, obj[key]);
            errorMessage += errorObject[key] + ' '
          });
        }
        console.log(errorMessage)
        setIsSaving(false)
      });
  }

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
            <div className="card border-0 shadow rounded-3 my-5">
              <div className="card-body p-4 p-sm-5">
                <h5 className="card-title text-center mb-5 fw-light fs-5">Sign In</h5>
                <form>
                  <div className="form-floating mb-3">
                    <input
                      value={username} 
                      onChange={(event) => { setUsername(event.target.value) }}
                      type="text"
                      className="form-control"
                      id="username"
                      placeholder="enter username"
                    />
                    <label htmlFor="username">Username</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      value={password}
                      onChange={(event) => { setPassword(event.target.value) }}
                      type="password"
                      className="form-control"
                      id="password"
                      placeholder="Password"
                    />
                    <label htmlFor="password">Password</label>
                  </div>

                  <div className="d-grid">
                    <button
                      disabled={isSaving}
                      onClick={handleSave}
                      type="submit"
                      className="btn btn-primary btn-login text-uppercase fw-bold" >
                      Sign in
                    </button>
                  </div>
                  <hr className="my-4"></hr>

                  <div className="d-grid">
                    <Link className="btn btn-outline-primary btn-login text-uppercase fw-bold" to="/signup">Create new account </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
