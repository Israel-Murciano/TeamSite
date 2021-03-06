const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateRegisterInput(data) {
    let errors = {};

//Convert empty fields into empty strings so we can use validator functions
data.username = !isEmpty(data.username) ? data.username : "";
data.password = !isEmpty(data.password) ? data.password : "";
data.password2 = !isEmpty(data.password2) ? data.password2 : "";

//Username checks
    if (Validator.isEmpty(data.username)) {
        errors.name = "Name field is required"
    }

//Password checks
    if (Validator.isEmpty(data.password)) {
        errors.password = "Password field is required"
    } 

    if (Validator.isEmpty(data.password2)) {
        errors.password2 = "Confirm password field is required"
    }

    if (!Validator.isLength(data.password, {min: 6, max: 30 })) {
        errors.password = "Password must be at least 6 characters"
    }

    if (!Validator.equals(data.password, data.password2)) {
        errors.password2 = "Passwords must match bitch"  
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};