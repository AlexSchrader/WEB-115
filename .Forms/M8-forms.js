// Retrieve the input field element
const inputField = document.getElementById('input-field');

// Retrieve the form element
const form = document.getElementById('my-form');

// Add event listener to form that submits an event
form.addEventListener('submit', validateInput);

// Function to validate the input value using a regular expression
function validateInput(event) {
     const inputValue = inputField.value;
    
    // Check if input value matches the regular expression pattern
    const pattern = /^[a-zA-Z0-9_]+$/;
    if (!pattern.test(inputValue)) {
        displayErrorMessage();
        event.preventDefault();
    } else {
        displayConfirmationMessage();
    }
}

// Function to display error message
function displayErrorMessage() {
    alert('Error: Please enter a valid alphanumeric value.')
    const errorMessage = document.getElementById('error-message');
    const confirmationMessage = document.getElementById('confirmation-message');
    errorMessage.style.display = 'block';
    errorMessage.innerHTML = 'Error: Please enter a valid alphanumeric value.';
    confirmationMessage.style.display = 'none';
}

// Function to display confimation message
function displayConfirmationMessage() {
    alert('Success: Your input is valid.')
    const errorMessage = document.getElementById('error-message');
    const confirmationMessage = document.getElementById('confirmation-message');
    errorMessage.style.display = 'none';
    confirmationMessage.style.display = 'block';
    confirmationMessage.innerHTML = 'Success: Your input is valid.';
}