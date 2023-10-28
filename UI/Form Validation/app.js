const form = document.querySelector("#form");
const username = document.querySelector("#username");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const confirmPassword = document.querySelector("#confirmPassword");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  checkInputs();
});

function checkInputs() {
  const usernameValue = username.value.trim();
  const emailValue = email.value.trim();
  const passwordValue = password.value.trim();
  const confirmPasswordValue = confirmPassword.value.trim();

  if (usernameValue === "") {
    setErrorFor(username, "Username cannot be blank");
    return;
  } else {
    setSuccessFor(username);
  }

  if (emailValue === "") {
    setErrorFor(email, "Email cannot be blank");
    return;
  } else if (!isEmailValid(emailValue)) {
    setErrorFor(email, "Email is not valid");
    return;
  } else {
    setSuccessFor(email);
  }

  if (passwordValue === "") {
    setErrorFor(password, "Password cannot be blank");
    return;
  } else if (!isPasswordValid(passwordValue)) {
    setErrorFor(password, "Password should follow pattern");
    return;
  } else {
    setSuccessFor(password);
  }

  if (confirmPasswordValue === "") {
    setErrorFor(confirmPassword, "Please Confirm password");
    return;
} else if(confirmPasswordValue !== passwordValue) {
    setErrorFor(confirmPassword, "Password does not match");
  } else {
    setSuccessFor(confirmPassword);
  }
}

function setErrorFor(input, message) {
  const formControl = input.parentElement;
  const small = formControl.querySelector("small");
  
  small.innerText = message;
  
  formControl.classList.remove("success");
  formControl.classList.add("error");
  input.focus();
}

function setSuccessFor(input) {
  const formControl = input.parentElement;
  formControl.classList.remove("error");
  formControl.classList.add("success");
}

function isEmailValid(email) {
  return /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/.test(
    email
  );
}

function isPasswordValid(password) {
  /*
        --> Minimum eight characters, at least one letter and one number:
        "/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/"

        --> Minimum eight characters, at least one letter, one number and one special character:
        "/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/"

        --> Minimum eight characters, at least one uppercase letter, one lowercase letter and one number:
        "/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/"

        --> Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character:
        "/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/"

        --> Minimum eight and maximum 10 characters, at least one uppercase letter, one lowercase letter, one number and one special character:
        "/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/"

    */

  return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password);
}
