import validator from "validator";

// Add real-time validation on 'input' event for each input field
document.getElementById("email").addEventListener("input", validateEmail);
document.getElementById("password").addEventListener("input", validatePassword);
document.getElementById("confirmPassword").addEventListener("input", validatePassword);

document
  .getElementById("registerForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    // Clear existing error messages
    clearErrorMessages();

    // Perform validation using validator.js
    validateEmail();
    validatePassword();
    validateConfirmPassword()

    // Check if any errors exist
    const errorElements = document.getElementsByClassName("error");
    const hasErrors = Array.from(errorElements).some(
      (element) => element.textContent !== ""
    );

    if (!hasErrors) {
      // If validation passes, you can submit the form programmatically
      //   document.getElementById("registerForm").submit();
      console.log("form submitted");
    }
  });

function validateEmail() {
  const email = document.getElementById("email").value;
  const emailError = document.getElementById("emailError");
  if (!validator.isEmail(email)) {
    emailError.textContent = "Invalid email format.";
  } else {
    emailError.textContent = "";
  }
}

function validatePassword() {
  const password = document.getElementById("password").value;
  const passwordError = document.getElementById("passwordError");
  if (!validator.isLength(password, { min: 6 })) {
    passwordError.textContent = "Password must be at least 6 characters long.";
  } else {
    passwordError.textContent = "";
  }
}

function validateConfirmPassword() {
    const confirmPassword = document.getElementById("confirmPassword").value;
    const password = document.getElementById("password").value;
    const confirmPasswordError = document.getElementById("confirmPasswordError");
    if (confirmPassword !== password) {
      confirmPasswordError.textContent = "Passwords do not match.";
    } else {
      confirmPasswordError.textContent = "";
    }
  }

function clearErrorMessages() {
  const errorElements = document.getElementsByClassName("error");
  for (let i = 0; i < errorElements.length; i++) {
    errorElements[i].textContent = "";
  }
}
