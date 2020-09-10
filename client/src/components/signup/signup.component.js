import React, {useState, useEffect} from "react";
import { Link, useHistory } from "react-router-dom";
import isEmail from "validator/lib/isEmail";
import isEmpty from "validator/lib/isEmpty";
import equals from "validator/lib/equals";
import { showErrorMsg } from "../../helpers/message.helper"
import { showSuccessMsg } from "../../helpers/message.helper"
import { showLoading } from "../../helpers/loading.helper"
import { isAuthenticated } from "../../helpers/auth.helper"
import { signup } from "../../api/auth.api"
import "./signup.css";

const Signup = () => {

  const history = useHistory();

  useEffect(() => {
    if (isAuthenticated() && isAuthenticated().role === 1) {
      history.push("/admin/dashboard")
    } else if (isAuthenticated() && isAuthenticated().role === 0) {
      history.push("/user/dashboard")
    }
  }, [history]);


    const[formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    successMsg: false,
    errorMsg: false,
    loading: false
  });

  const {
    username, 
    email, 
    password, 
    confirmPassword, 
    successMsg, 
    errorMsg,
    loading} = formData;

    // event handlers 

    const handleChange = (event) => {
      // console.log(event.target.value)
      setFormData({
        ...formData,
        [event.target.name]: event.target.value,
        successMsg: '',
        errorMsg: ''
      })
    }

    // handle submit button
    const handleSubmit = (event) => {
      // stopping the browser to reload on submit
      event.preventDefault();
      // console.log(formData);

      // client-side validation
      if ( isEmpty(username) ||  isEmpty(email) || isEmpty(password) || isEmpty(confirmPassword) ) {
        setFormData({
          ...formData, errorMsg: "All fields are required"
        });
      } else if ( !isEmail(email) ) {
        setFormData({
          ...formData, errorMsg: "Invalid email"
        });
      } else if ( !equals(password, confirmPassword) ) {
        setFormData({
          ...formData, errorMsg: "Passwords do not match!"
        })
      } 
      else {
        const { username, email, password} = formData;
        const data = { username, email, password};

        setFormData({
          ...formData, loading: true
        });

        signup(data)
        .then(response => {
          console.log("Axios signup success", response);
          setFormData({
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
            loading: false,
            successMsg: response.data.successMessage
          })
        })
        .catch((err) => {
          console.log("Axios signup error ", err);
          setFormData({
            ...formData, loading: false, errorMsg: err.response.data.errorMessage
          })
        })

      }
    }

    //views
  const showSignupForm = () => (
    <form className="signup-form" onSubmit={handleSubmit}>
      {/* username */}
      <div className="form-group input-group">
        <div className="input-group-prepend">
          <span className="input-group-text">
            <i className="fa fa-user"></i>
          </span>
        </div>
        <input 
        name="username"
        value={username}
        className="form-control"
        placeholder="Username"
        type="text" 
        onChange={handleChange}
        />
      </div>

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

      {/* password confirmation */}
      <div className="form-group input-group">
        <div className="input-group-prepend">
          <span className="input-group-text">
            <i className="fa fa-lock"></i>
          </span>
        </div>
        <input
        name="confirmPassword"
        value={confirmPassword}
        className="form-control"
        placeholder="Confirm password"
        type="password"
        onChange={handleChange}
        />
      </div>

      {/* sign up button */}
      <div className="text-center text-white">
        <button type="submit" className="btn btn-primary btn-block">
          Create Account
        </button>
      </div>

      {/* already have account */}
      <p className="text-center text-white">
        Have an account? <Link to="/signin">Log In</Link>
      </p>
    </form>
  )
  
  // render
  return (
    <div className="signup-container">
      <div className="row px-3 vh-100">
        <div className="col-md-5 mx-auto align-self-center">
          {successMsg && showSuccessMsg(successMsg)}
          {errorMsg && showErrorMsg(errorMsg)}
          {loading && <div className="text-center pb-4"> {showLoading()} </div>}
          {showSignupForm()}
        </div>
      </div>
    </div>
  )
}

export default Signup;