import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { showErrorMsg } from "../../helpers/message.helper";
import { showLoading } from "../../helpers/loading.helper";
import isEmail from "validator/lib/isEmail";
import isEmpty from "validator/lib/isEmpty";
import { signin } from "../../api/auth.api"
import "./signin.css"
import { setAuthentication, isAuthenticated } from "../../helpers/auth.helper"

const Signin = () => {
  const history = useHistory();

  useEffect(() => {
    if (isAuthenticated() && isAuthenticated().role === 1) {
      history.push("/admin/dashboard")
    } else if (isAuthenticated() && isAuthenticated().role === 0) {
      history.push("/user/dashboard")
    }
  }, [history]);

  const[formData, setFormData] = useState({
    email: "",
    password: "",
    errorMsg: false,
    loading: false
  });

  const {
    email, 
    password,  
    errorMsg,
    loading } = formData;

    const handleChange = (event) => {
      setFormData({
        ...formData,
        [event.target.name]: event.target.value,
        errorMsg: ''
      })
    };

        // handle submit button
        const handleSubmit = (event) => {
          // stopping the browser to reload on submit
          event.preventDefault();

          // checking or validating inputs
          if ( isEmpty(email) || isEmpty(password) ) {
            setFormData({
              ...formData, errorMsg: "All fields are required"
            });
          } else if ( !isEmail(email) ) {
            setFormData({
              ...formData, errorMsg: "Invalid email"
            });
          } else {
            const { email, password} = formData;
            const data = { email, password};
    
            setFormData({
              ...formData, loading: true
            });
    
            signin(data)
            .then( (response) => {
              setAuthentication(response.data.token, response.data.user);
              if (isAuthenticated() && isAuthenticated().role === 1) {
                console.log("redirecting to admin dashboard");
                history.push("/admin/dashboard")
              } else {
                console.log("redirecting to user dashboard");
                history.push("/user/dashboard")
              }
            })
            .catch(err => {
              console.log("signin api function error: ", err);
              setFormData({
                ...formData,
                loading: false,
                errorMsg: err.response.data.errorMessage
              })
            })
          }
        }

    const showSigninForm = () => (
      <form className="signup-form" onSubmit={handleSubmit}>
        {/* email */}
        <div className="form-group input-group">
          <div className="input-group-prepend">
            <span className="input-group-text">
              <i className="fa fa-envelope"></i>
            </span>
          </div>
          <input 
          name="email"
          value={email}
          className="form-control"
          placeholder="Email address"
          type="email"
          onChange={handleChange}
          />
        </div>
  
        {/* password */}
        <div className="form-group input-group">
          <div className="input-group-prepend">
            <span className="input-group-text">
              <i className="fa fa-lock"></i>
            </span>
          </div>
          <input
          name="password"
          value={password}
          className="form-control"
          placeholder="Create password"
          type="password"
          onChange={handleChange}
          />
        </div>
  
       
        {/* sign in button */}
        <div className="text-center text-white">
          <button type="submit" className="btn btn-primary btn-block">
            Log in
          </button>
        </div>
  
        {/* already have account */}
        <p className="text-center text-white">
          Don't have an account? <Link to="/signup">Register Here</Link>
        </p>
      </form>
    )
  

  return (
    <div className="signin-container">
     <div className="row px-3 vh-100">
        <div className="col-md-5 mx-auto align-self-center">
          {errorMsg && showErrorMsg(errorMsg)}
          {loading && <div className="text-center pb-4"> {showLoading()} </div>}
          {showSigninForm()}
        </div>
      </div>
    </div>  
  )
}

export default Signin;