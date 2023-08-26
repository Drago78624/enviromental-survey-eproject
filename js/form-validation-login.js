import validator from "validator";

// Add real-time validation on 'input' event for each input field
document.getElementById("username").addEventListener("input", validateUsername);
document.getElementById("password").addEventListener("input", validatePassword);

document
  .getElementById("loginForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    // Clear existing error messages
    clearErrorMessages();

    // Perform validation using validator.js
    validateUsername();
    validatePassword();

    // Check if any errors exist
    const errorElements = document.getElementsByClassName("error");
    const hasErrors = Array.from(errorElements).some(
      (element) => element.textContent !== ""
    );

    if (!hasErrors) {
      // If validation passes, you can submit the form programmatically
      //   document.getElementById("loginForm").submit();
      console.log("form submitted");
    }
  });

function validateUsername() {
  const username = document.getElementById("username").value;
  const usernameError = document.getElementById("usernameError");
  if (
    validator.isAlphanumeric(username) &&
    validator.isLength(username, { min: 3, max: 20 })
  ) {
    usernameError.textContent = "";
  } else {
    usernameError.textContent =
      "Username must be alphanumeric and have a length between 3 and 20 characters.";
  }
}

function validatePassword() {
  const password = document.getElementById("password").value;
  const passwordError = document.getElementById("passwordError");
  if (!validator.isStrongPassword(password, {
    minLength: 8,
    minLowercase: 0,
    minUppercase: 0,
    minNumbers: 1,
    minSymbols: 0,
  })) {
    passwordError.textContent = "Password must be 8+ characters and include at least 1 number.";
  } else {
    passwordError.textContent = "";
  }
}

function clearErrorMessages() {
  const errorElements = document.getElementsByClassName("error");
  for (let i = 0; i < errorElements.length; i++) {
    errorElements[i].textContent = "";
  }
}
