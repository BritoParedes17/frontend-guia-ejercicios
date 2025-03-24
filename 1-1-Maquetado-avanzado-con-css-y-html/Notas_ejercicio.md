# Sección 1: Maquetado Avanzado con CSS y HTML
## Instrucción:
Dado el siguiente diseño, debes replicarlo utilizando HTML5 y CSS3 (sin frameworks de
diseño como Bootstrap o Tailwind). El diseño consta de un encabezado fijo en la parte
superior de la página, una barra lateral que se contrae al hacer hover sobre ella, y un área
principal de contenido con un grid de productos que se ajusta automáticamente a
diferentes tamaños de pantalla.

## Requisitos:
- El encabezado debe quedar fijo en la parte superior.
- La barra lateral debe ser contraíble al pasar el mouse (hover).
- El área de contenido debe implementar un grid que responda de manera
adecuada a pantallas pequeñas (1 columna), medianas (2 columnas) y grandes (4
columnas).
---
## Propuesta
Para este ejercicio, lo que quisiera destacar es el uso de las propiedad display:grid de css. 

Para ello, podemos podemos usarla de la siguiente manera:

```css
.elemento-padre{
    display: grid;
    grid-template-colums: repeat(NumColumnas, 1fr)
}    
```
"1fr" podriamos catalogarla como la unidad de medida para hacer nuestro grid, haciendo que de esta manera, tengamos la cantidad de columnas deseadas en el espacio disponible. Esto lo podemos complementar con los media querys de css para poder hacer un grid responsivo. 