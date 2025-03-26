# Evaluación de Práctica para el Área de Front-End - Parte 2

## Instrucciones Generales:
En esta segunda parte, enfrentaremos una situación real de un proyecto en producción.
Deberás realizar una serie de tareas técnicas relacionadas con la optimización y mejora
de un sistema existente. A lo largo de esta sección, se evaluarán tu capacidad de análisis,
resolución de problemas y toma de decisiones bajo presión.

---

## Situación Real: Sistema de Gestión de Usuarios en Producción

Estás trabajando en un sistema de gestión de usuarios para una aplicación web. El
sistema actualmente tiene las siguientes funcionalidades:

- **Registro de usuarios** con validación decampos (nombre, correo electrónico, contraseña).
- **Inicio de sesión** que permite a los usuarios acceder a su perfil.
- **Dashboard** que muestra información básica del usuario.

Recientemente, los usuarios han reportado que la página de registro tiene problemas de rendimiento y que el dashboard se carga de forma lenta cuando hay demasiados datos. Además, la compañía ha decidido implementar nuevas funcionalidades para la **edición del perfil** y la **actualización de la contraseña**.

Tu tarea es optimizar el sistema actual y añadir las nuevas funcionalidades, tomando en
cuenta los siguientes aspectos:

1. **Optimización del rendimiento del registro**: Identificar posibles cuellos de botella en el registro de usuarios y proponer una solución.
2. **Optimización del dashboard**: Identificar las causas de la lentitud en la carga de datos en el dashboard y sugerir una solución técnica.
3. **Implementación de las nuevas funcionalidades**:
    - **Edición de perfil**: Permitir que el usuario actualice su nombre y correoelectrónico.
    - **Actualizacion de contraseña**: Implementar una funcionalidad que permita al usuario cambiar su contraseña de manera segura, solicitando la contraseña actual antes de permitir el cambio.
4. **Compatibilidad con dispositivos móviles**: Asegurarte de que todas las mejoras sean compatibles con dispositivos móviles mediante buenas prácticas de Responsive Design.

## Sección 1: Optimización del Registro de Usuarios

## Instrucción:
El sistema de registro de usuarios tiene un problema de rendimiento causado por la validación de datos en el lado del cliente. La página de registro se congela cuando los usuarios ingresan datos en los campos del formulario.

## Tareas:
- Inspecciona el código de validación del formulario de registro y optimiza su rendimiento.
- Debes asegurarte de que las validaciones continúan funcionando correctamente sin comprometer la experiencia del usuario.

## Código actual:
```js
function validateForm() {
  let errors = [];
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
  }
  return true;
}
function validateEmail(email) {
  let re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return re.test(email);
}
function displayErrors(errors) {
  let errorDiv = document.getElementById('error-messages');
  errorDiv.innerHTML = errors.join('<br>');
}
```

## Propuesta

A nivel de rendimiento de la pagina, en cuanto tiempos de carga, el ejemplo actual no interrumpe la experiencia del usuario dado que es muy pequeño y ocupa muy pocos elementos o validaciones. Lo que podriamos aplicar es una optimización del codigo a nivel de desarrollador para poder hacer un poco más legible y escalable, en caso de que se quieran agregar nuevas reglas condicionales, aunque para un validador de campos de registro no ocuparía muchas más condicionales en el futuro, quizas uno para el numero de celular u ubicación, confimacion de contraseña, etc...

Para ello vamos a realizar 4 pasos:
1. Hacer un array con las variables que contienen *name*, *email* y *password*. Además, añadiremos trim() para evitar los espacios en blanco que el usuario podria dejar.
 ```js
  const formData = {
    name: document.getElementById('name').value.trim();
    email: document.getElementById('email').value.trim();
    password: document.getElementById('password').value.trim();
  }
 ```
2. Hacer un array que contenga las reglas, que son las condicionales con sus respectivos mensajes.
```js
  const formRules = [
    {
      condition: formData.name < 3,
      message: 'El nombre debe tener al menos 3 caracteres'
    }
    /* Resto de las reglas */
  ];
``` 

3. Filtro solo para tener los errores
```js
  const errors = formRules
  .filter(rule => rule.conditional)
  .map(rule => rule.message)
```

4. Si tenemos errores, mostrarlos 
```js
  if(error > 0){
    displayErrors(errors);
    return false;
  }
```

Si todo es correcto, al final de las validaciones, el resultado será
```js
  return true;
```

Con esto podemos tener un codigo más sencillo en cuanto a compresión y aplicación de nuevas reglas de validación. Desde luego, el formulario funciona.