import validator from "validator";

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
        errorMessage = 'Username must be alphanumeric and have a length between 3 and 20 characters.';
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
      if (!validator.isStrongPassword(password, {
        minLength: 8,
        minLowercase: 0,
        minUppercase: 0,
        minNumbers: 1,
        minSymbols: 0,
      })) {
        errorMessage = 'Password must be 8+ characters and include at least 1 number.';
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
