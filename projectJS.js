document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('meal-plan-form');
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const goalInput = document.getElementById('goal');
  const generateButton = document.getElementById('generate-plan');
  const clearButton = document.getElementById('clear-plan');
  const customTextInput = document.querySelectorAll('.custom-input');
  // Add save and load buttons
  const saveButton = document.getElementById('save-plan');
  const loadButton = document.getElementById('load-plan');

  // Save meal plan data to local storage
  function saveMealPlan() {
    const mealPlanData = {
      name: nameInput.value,
      email: emailInput.value,
      goal: goalInput.value,
      mealSelects: []
    };

    const mealSelects = document.querySelectorAll('select.dropdown-box');
    mealSelects.forEach((select) => {
      mealPlanData.mealSelects.push(select.value);
    });

    const customTextInputs = document.querySelectorAll('.custom-input');
    customTextInputs.forEach((input) => {
      mealPlanData.customTextInputs = mealPlanData.customTextInputs || [];
      mealPlanData.customTextInputs.push(input.value);
    });

    localStorage.setItem('mealPlanData', JSON.stringify(mealPlanData));
  }

  // Load meal plan data from local storage
  function loadMealPlan() {
    const storedMealPlanData = localStorage.getItem('mealPlanData');
    if (storedMealPlanData) {
      const mealPlanData = JSON.parse(storedMealPlanData);

      nameInput.value = mealPlanData.name;
      emailInput.value = mealPlanData.email;
      goalInput.value = mealPlanData.goal;

      const mealSelects = document.querySelectorAll('select.dropdown-box');
      mealSelects.forEach((select, index) => {
        select.value = mealPlanData.mealSelects[index];
      });

      const customTextInputs = document.querySelectorAll('.custom-input');
      customTextInputs.forEach((input, index) => {
        input.value = mealPlanData.customTextInputs[index];
      });
    }
  }

  // Add event listeners for save and load buttons
  saveButton.addEventListener('click', saveMealPlan);
  loadButton.addEventListener('click', function(event) {
    event.preventDefault();
    loadMealPlan();
  });
  // Validate email input
  function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  // Generate random meal
  function generateRandomMeal() {
    const mealSelects = document.querySelectorAll('select.dropdown-box');
    const randomMealSelect = mealSelects[Math.floor(Math.random() * mealSelects.length)];
    const randomMeal = randomMealSelect.options[Math.floor(Math.random() * randomMealSelect.options.length)].value;
    return randomMeal;
  }

  // Fill meal plan with random meals
  function fillMealPlanWithRandomMeals() {
    const mealSelects = document.querySelectorAll('select.dropdown-box');
    mealSelects.forEach(function(select) {
      const randomIndex = Math.floor(Math.random() * (select.options.length - 1)) + 1;
      select.value = select.options[randomIndex].value;
    });
  }

   // Generate meal plan
   function generateMealPlan() {
    if (!isValidEmail(emailInput.value)) {
      alert('Please enter a valid email address.');
      return;
    }

    const name = nameInput.value;
    const email = emailInput.value;
    const goal = goalInput.value;

    let mealPlanHTML = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Meal Plan - ${name}</title>
          <style>
              /* Styles for screen */
              body {
                  font-family: Arial, sans-serif;
                  margin: 20px;
              }
              table {
                  border-collapse: collapse;
                  width: 100%;
              }
              th, td {
                  border: 1px solid #ddd;
                  padding: 10px;
                  text-align: left;
              }
              th {
                  background-color: #f0f0f0;
              }
              /* Styles for print */
              @media print {
                  body {
                      font-size: 12px;
                  }
                  table {
                      width: 100%;
                      border-collapse: collapse;
                  }
                  th, td {
                      border: 1px solid #000;
                      padding: 5px;
                      text-align: left;
                  }
                  th {
                      background-color: #fff;
                  }
              }
          </style>
      </head>
      <body>
          <h1>Meal Plan for ${name}</h1>
          <p>Email: ${email}</p>
          <p>Goal for the week: ${goal}</p>
          <table>
              <tr>
                  <th>Day</th>
                  <th>Breakfast</th>
                  <th>Snack</th>
                  <th>Lunch</th>
                  <th>Snack 2</th>
                  <th>Dinner</th>
              </tr>
    `;

    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const mealSelects = document.querySelectorAll('select.dropdown-box');

    days.forEach(function(day, index) {
      let breakfastValue = mealSelects[index * 5].value;
      let snackValue = mealSelects[index * 5 + 1].value;
      let lunchValue = mealSelects[index * 5 + 2].value;
      let snack2Value = mealSelects[index * 5 + 3].value;
      let dinnerValue = mealSelects[index * 5 + 4].value;

      if (mealSelects[index * 5].options[mealSelects[index * 5].selectedIndex].text === 'Other') {
        breakfastValue = customTextInput[index * 5].value;
      }
      if (mealSelects[index * 5 + 1].options[mealSelects[index * 5 + 1].selectedIndex].text === 'Other') {
        snackValue = customTextInput[index * 5 + 1].value;
      }
      if (mealSelects[index * 5 + 2].options[mealSelects[index * 5 + 2].selectedIndex].text === 'Other') {
        lunchValue = customTextInput[index * 5 + 2].value;
      }
      if (mealSelects[index * 5 + 3].options[mealSelects[index * 5 + 3].selectedIndex].text === 'Other') {
        snack2Value = customTextInput[index * 5 + 3].value;
      }
      if (mealSelects[index * 5 + 4].options[mealSelects[index * 5 + 4].selectedIndex].text === 'Other') {
        dinnerValue = customTextInput[index * 5 + 4].value;
      }

      mealPlanHTML += `
        <tr>
            <td>${day}</td>
            <td>${breakfastValue}</td>
            <td>${snackValue}</td>
            <td>${lunchValue}</td>
            <td>${snack2Value}</td>
            <td>${dinnerValue}</td>
        </tr>
      `;
    });

    mealPlanHTML += `
    </table>
    <button onclick="window.print();">Print/Download</button>
</body>
</html>
`;

    const newWindow = window.open('', '_blank');
    newWindow.document.open();
    newWindow.document.write(mealPlanHTML);
    newWindow.document.close();
  }

  // Clear meal plan
  function clearMealPlan() {
    location.reload();
  }


  // Event listeners
  generateButton.addEventListener('click', generateMealPlan);
  clearButton.addEventListener('click', function() {
    location.reload();
  });
  
  // Add event listener to random plan button
  const randomPlanButton = document.getElementById('random-plan');
  randomPlanButton.addEventListener('click', function(event) {
    event.preventDefault();
    fillMealPlanWithRandomMeals();
  });
});