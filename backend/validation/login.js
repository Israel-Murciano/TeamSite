const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateLoginInput(data) {
    let errors = {};

    //Convert empty fields into empty strings so we can use validator functions
    data.username = !isEmpty(data.username) ? data.username : "";
    data.password = !isEmpty(data.password) ? data.password : "";

    //username checks
    if (Validator.isEmpty(data.username)) {
        errors.username = " username field is required";
    } 
    


    //Password checks
    if (Validator.isEmpty(data.password)) {
        errors.password = " Password field is required"
    }

    return { 
        errors,
        isValid: isEmpty(errors)
    };
};