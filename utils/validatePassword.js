
//Function to validate password strength

const validatePassword = (password) => {
    // Password must be between 12 and 128 characters long,
    //  contain at least one uppercase letter, 
    // one lowercase letter, 
    // one digit, 
    // and one special character.
    // Check whether the password is a string
    // If it is not a string, return false
    if (typeof password !== "string") {
        return false;
    }
    const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$!%*?&])[A-Za-z\d@#$!%*?&]{12,128}$/;

    return passwordRegex.test(password);
};

export default validatePassword;