const { check, validationResult } = require('express-validator');

// sign up.
exports.signupValidator = [
  check("username")
    .not().isEmpty()
    .trim()
    .withMessage("All fields are required"),
  check("email")
    .isEmail()
    .normalizeEmail()
    .withMessage("Invalid email"),
  check("password")
    .isLength({ min: 8 })
    .withMessage("password must be atleast 6 characters long")
];

// sign in.
exports.signinValidator = [
  check("email")
    .isEmail()
    .normalizeEmail()
    .withMessage("Invalid email"),
  check("password")
    .isLength({ min: 8 })
    .withMessage("password must be atleast 6 characters long")
];

exports.validatorResult = (req, res, next) => {
  const result = validationResult(req);
  const hasErrors = !result.isEmpty();

  if (hasErrors) {
    const firstError = result.array()[0].msg
    return res.status(400).json({
      errorMessage: firstError 
    })
    // console.log("has errors: ",hasErrors);
    // console.log("result", result);    
  }

  next();
}