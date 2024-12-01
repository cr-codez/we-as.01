// Define validation rules
const validationRules = {
  name: {
    required: true,
    message: "Name is required",
  },
  email: {
    required: true,
    email: true,
    message: "Invalid email",
  },
  password: {
    required: true,
    minLength: 8,
    message: "Password must be at least 8 characters",
  },
  number: {
    required: true,
    number: true,
    message: "Invalid number",
  },
  date: {
    required: true,
    date: true,
    message: "Invalid date",
  },
  phone: {
    required: true,
    pattern: /^\d{3}-\d{3}-\d{4}$/,
    message: "Invalid phone number",
  },
  "postal-code": {
    required: true,
    pattern: /^\d{5}(-\d{4})?$/,
    message: "Invalid postal code",
  },
};

// Get form elements
const form = document.getElementById("web-form");
const validationSummary = document.getElementById("validation-summary");

// Form submission handler
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  const errors = validateForm(formData);
  if (errors.length > 0) {
    displayErrors(errors);
  } else {
    displaySuccess();
  }
});

// Form validation function
function validateForm(formData) {
  const errors = [];
  Object.keys(validationRules).forEach((field) => {
    const rule = validationRules[field];
    const value = formData.get(field);
    if (rule.required && !value) {
      errors.push(rule.message);
    } else if (
      rule.email &&
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)
    ) {
      errors.push(rule.message);
    } else if (rule.minLength && value.length < rule.minLength) {
      errors.push(rule.message);
    } else if (rule.pattern && !rule.pattern.test(value)) {
      errors.push(rule.message);
    } else if (rule.number && isNaN(value)) {
      errors.push(rule.message);
    } else if (rule.date && !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
      errors.push(rule.message);
    }
  });
  return errors;
}

// Display errors
function displayErrors(errors) {
  validationSummary.innerHTML = "";
  errors.forEach((error) => {
    const li = document.createElement("li");
    li.textContent = error;
    validationSummary.appendChild(li);
  });
}

// Display success message
function displaySuccess() {
  validationSummary.innerHTML = "";
  const p = document.createElement("p");
  p.textContent = "Form submitted successfully!";
  validationSummary.appendChild(p);
}