const User = require("../model/user.model");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { jwtSecret, jwtExpire } = require("../config/keys.config");
const DB_CONNECTION = require("../config/db.config")

// sign up controller.
exports.signupController = async (req, res) => {
  console.log('hi')
  const { username, email, password } = req.body;

  try {
     await DB_CONNECTION.query("SELECT * FROM users WHERE user_username = ? AND user_email = ?", [username, email], (err, results, fields) => {
      if (err) {
        console.log(err);
        return;
      }
      if (results.length > 0) {
        return res.status(400).json({
          errorMessage: "Email already exists"
        });
      }
    })
    

    // const newUser = new User();
    // newUser.username = username;
    // newUser.email = email;

    const salt = await bcrypt.genSalt(10);
    const hashpassword = await bcrypt.hash(password, salt)
    
    await DB_CONNECTION.query("INSERT INTO users (user_username, user_email, user_password) VALUES(?,?,?)", [username, email, hashpassword])
    .then((response) => {
      response.json({successMessage: "your account has been created successfully, Please signin"})
    }).catch((err) => {
      console.log("error in saving user")
      if (err) throw err
    })



  } catch (err) {
    console.log("signupController error: ", err);
    res.status(500).json({
      errorMessage: "server error"
    })
  }
}

// sign in controller.
exports.signinController = async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.findOne({ email })

    if (!user) {
      return res.status(400).json({
        errorMessage: "Invalid credientials"
      })
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        errorMessage: "Invalid credientials"
      })
    }

    // payload
    const payload = {
      user: {
        _id: user.id
      }
    }

    jwt.sign(payload, jwtSecret, { expiresIn: jwtExpire}, ( err, token ) => {
      if (err) {
        console.log("jwt error: ", err);
      } 
      const { _id, username, email, role } = user;

      res.json({
        token,
        user: { _id, username, email, role }
      })
    })

  } catch (err){
    console.log("signinController error", err);
    res.status(500).json({
      errorMessage: "server error"
    });
  }
}