function validateForm() {
  /* let errors = [];
  let name = document.getElementById('name').value;
  let email = document.getElementById('email').value;
  let password = document.getElementById('password').value;
  
  if (name.length < 3) {
    errors.push("El nombre debe tener al menos 3 caracteres.");
  }
  if (!validateEmail(email)) {
    errors.push("El correo electrónico no es válido.");
  }
  if (password.length < 6) {
    errors.push("La contraseña debe tener al menos 6 caracteres.");
  }
  if (errors.length > 0) {
    displayErrors(errors);
    return false;
  } */

  const formData = {
    name: document.getElementById('name').value.trim(),
    email: document.getElementById('email').value.trim(),
    password: document.getElementById('password').value.trim()
  }

  const formRules = [
    {
      condition: formData.name.length < 3,
      message: 'El nombre debe tener al menos 3 caracteres'
    },
    {
      condition: !validateEmail(formData.email),
      message: 'El correo electrónico no es válido.'
    },
    {
      condition: formData.password.length < 6,
      message: 'La contraseña debe tener al menos 6 caracteres.'
    }
  ];

  const errors = formRules
    .filter(rule => rule.condition)
    .map(rule => rule.message);

  if(errors.length > 0){
    displayErrors(errors);
    return false
  }

  return true

}
  
  function validateEmail(email) {
    let re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return re.test(email);
  }

  function displayErrors(errors) {
    let errorDiv = document.getElementById('error-messages');
    errorDiv.innerHTML = errors.join('<br>');
  }