import validator from "validator";

// // Add real-time validation on 'input' event for each input field
// document.getElementById("username").addEventListener("input", validateEmail);
// document.getElementById("password").addEventListener("input", validatePassword);
// document.getElementById("confirmPassword").addEventListener("input", validatePassword);

// document
//   .getElementById("registerForm")
//   .addEventListener("submit", function (event) {
//     event.preventDefault();

//     // Clear existing error messages
//     clearErrorMessages();

//     // Perform validation using validator.js
//     validateEmail();
//     validatePassword();
//     validateConfirmPassword()

//     // Check if any errors exist
//     const errorElements = document.getElementsByClassName("error");
//     const hasErrors = Array.from(errorElements).some(
//       (element) => element.textContent !== ""
//     );

//     if (!hasErrors) {
//       // If validation passes, you can submit the form programmatically
//       //   document.getElementById("registerForm").submit();
//       console.log("form submitted");
//     }
//   });

// function validateEmail() {
//   const email = document.getElementById("email").value;
//   const emailError = document.getElementById("emailError");
//   if (!validator.isEmail(email)) {
//     emailError.textContent = "Invalid email format.";
//   } else {
//     emailError.textContent = "";
//   }
// }

// function validatePassword() {
//   const password = document.getElementById("password").value;
//   const passwordError = document.getElementById("passwordError");
//   if (!validator.isLength(password, { min: 6 })) {
//     passwordError.textContent = "Password must be at least 6 characters long.";
//   } else {
//     passwordError.textContent = "";
//   }
// }

// function validateConfirmPassword() {
//     const confirmPassword = document.getElementById("confirmPassword").value;
//     const password = document.getElementById("password").value;
//     const confirmPasswordError = document.getElementById("confirmPasswordError");
//     if (confirmPassword !== password) {
//       confirmPasswordError.textContent = "Passwords do not match.";
//     } else {
//       confirmPasswordError.textContent = "";
//     }
//   }

// function clearErrorMessages() {
//   const errorElements = document.getElementsByClassName("error");
//   for (let i = 0; i < errorElements.length; i++) {
//     errorElements[i].textContent = "";
//   }
// }

// const form = document.getElementById('registerForm');

// form.addEventListener('input', function (event) {
//   if (event.target.tagName === 'INPUT' || event.target.tagName === 'SELECT') {
//     const errorElement = document.getElementById(`${event.target.id}-error`);
//     clearErrors(errorElement);
//   }
// });

// // Add a blur event listener to clear errors when the field loses focus for all inputs
// form.addEventListener('blur', function (event) {
//   if (event.target.tagName === 'INPUT' || event.target.tagName === 'SELECT') {
//     const errorElement = document.getElementById(`${event.target.id}Error`);
//     clearErrors(errorElement);
//   }
// });

// form.addEventListener('submit', function (event) {
//   event.preventDefault();

//   // Clear previous error messages
//   clearErrors();

//   const username = document.getElementById('username').value;
//   let rollNo = document.getElementById('rollNo').value;
//   const selectedClass = document.getElementById('class').value;
//   const specification = document.getElementById('specification').value;
//   const section = document.getElementById('section').value;
//   const date = document.getElementById('date').value;
//   const password = document.getElementById('password').value;
//   const confirmPassword = document.getElementById('confirmPassword').value;

//   console.log(selectedClass)

//   let valid = true;

//   if (!validator.isAlphanumeric(username) || !validator.isLength(username, { min: 3, max: 20 })) {
//     showError('username', 'Invalid Username');
//     valid = false;
//   }

//   if (!validator.isInt(rollNo)) {
//     rollNo = Number(rollNo)
//     showError('rollNo', 'Invalid Roll no');
//     valid = false;
//   }

//   if (!selectedClass) {
//     showError('class', 'Please select a class.');
//     valid = false;
//   }

//   if (!specification) {
//     showError('specification', 'Please select a specification.');
//     valid = false;
//   }

//   if (!section) {
//     showError('section', 'Please select a section.');
//     valid = false;
//   }

//   if (!validator.isDate(date)) {
//     showError('date', 'Invalid date.');
//     valid = false;
//   }

//   if (!validator.isStrongPassword(password)) {
//     showError('password', 'Password must be at least 6 characters long.');
//     valid = false;
//   }

//   if (password !== confirmPassword) {
//     showError('confirmPassword', 'Passwords do not match.');
//     valid = false;
//   }

//   if (valid) {
//     // Perform registration or form submission
//     alert('Registration successful!');
//   }
// });

// function showError(field, message) {
//   const errorElement = document.getElementById(`${field}Error`);
//   errorElement.textContent = message;
// }

// function clearErrors() {
//   const errorElements = document.querySelectorAll('.errors');
//   errorElements.forEach(element => {
//     element.textContent = '';
//   });
// }




const form = document.getElementById('registerForm');

// Add real-time validation on input
form.addEventListener('input', function (event) {
  console.log("validating")
  if (event.target.tagName === 'INPUT' || event.target.tagName === 'SELECT') {
    const input = event.target;
    const errorElement = document.getElementById(`${input.id}Error`);
    
    validateInput(input, errorElement);
  }
});

// Function to validate input and display error
function validateInput(input, errorElement) {
  const inputValue = input.value.trim();
  let errorMessage = '';

  switch (input.id) {
    case 'username':
      if (!validator.isAlphanumeric(inputValue) || !validator.isLength(inputValue, { min: 3, max: 20 })) {
        errorMessage = 'Username must contain letters and numbers';
      }
      break;

    case 'rollNo':
      if (!validator.isInt(inputValue)) {
        errorMessage = 'Invalid Roll No';
      }
      break;

    case 'class':
    case 'specification':
    case 'section':
      const defaultValue = input.options[0].value; // Value of the default option
      if (inputValue === defaultValue) {
        errorMessage = `Please select an option for ${input.id}.`;
      }
      break;

    case 'date':
      if (!validator.isDate(inputValue)) {
        errorMessage = 'Invalid date.';
      }
      break;

    case 'password':
      if (!validator.isStrongPassword(inputValue)) {
        errorMessage = 'Password Must be Strong';
      }
      break;

    case 'confirmPassword':
      const password = document.getElementById('password').value;
      if (inputValue !== password) {
        errorMessage = 'Passwords do not match.';
      }
      break;
  }

  errorElement.textContent = errorMessage;
}



// Prevent form submission if errors exist
form.addEventListener('submit', function (event) {
  const inputs = form.querySelectorAll('input, select');
  let hasErrors = false;

  inputs.forEach(input => {
    const errorElement = document.getElementById(`${input.id}Error`);
    validateInput(input, errorElement); // Validate and display error for each input
    if (errorElement.textContent) {
      hasErrors = true;
    }
  });

  if (hasErrors) {
    event.preventDefault();
  }
});

// Function to check if any input fields are blank
function areInputsBlank() {
  const inputs = form.querySelectorAll('input, select');
  for (const input of inputs) {
    if (input.value.trim() === '') {
      return true;
    }
  }
  return false;
}
