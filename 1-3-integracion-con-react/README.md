# Sección 3: Integración de React

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Corre el proyecto en tu entorno!

Antes que nada, debes instalarlo con 
`npm install` y luego correrlo con `npm start`

## Instrucción
Ahora debes migrar la interactividad y el renderizado de la Sección 1 y 2 hacia React. En
esta sección debes tomar una decisión importante:
Tienes la opción de mantener algunas funcionalidades en JavaScript puro o migrarlas
completamente a React. Considera factores como la eficiencia, la mantenibilidad del
código, y el rendimiento.

## Requisitos
- Implementa el componente del grid de productos utilizando React.
- Los productos deben renderizarse de manera dinámica con datos simulados
(puedes usar un array de objetos en el estado del componente).
- Implementa el carrito de compras como un estado en el componente principal.

## Toma de decisión:
- Debes decidir si mantienes la barra lateral y el encabezado con JavaScript puro o
si también los migras a componentes de React.
- Justifica tu decisión con al menos dos argumentos técnicos claros.

## Propuesta

Como requisitos previos, debemos tener instalado node y su respectivo package manager npm. 

Una vez con eso con estos requisitos, vamos a usar react con typescript usando el comando
```
npx create-react-app --template typecript
```
usamos typescript para que el proyecto para que las mayoria de los elementos estén tipados, como en el caso de los props de componentesm, como veremos más adelante. 

Una vez creado el proyecto, vamos a instalar las librerias *react-router-dom* y *tailwind css*

- En el caso de caso de *react-router-dom* el comando es `npm install react-router-dom@latest`
- Para instalar *Tailwind* dentro de nuestro proyecto debemos seguir una serie de pasos que se encuentran dentro de su [pagina web](https://v3.tailwindcss.com/docs/guides/create-react-app).
  - Comando `npm install -D tailwindcss@3`
  - Inicializar com `npm tailwindcss init`
  - En el archivo de configuración `tailwind.config.js`, asegurarnos de que se acepte los archivos .ts y .tsx que son los que usa typescript
  - Al archivo index.css, importar las siguiente directivas: *@tailwind base; @tailwind components; @tailwind utilities;*

Una vez con esas librerías instaladas, podemos empezar a construir nuestro proyecto. 

Lo primero que realizamos fue asignar las carpetas en donde se contendrán los diferentes archivos, para esta ocasión serán 2 carpetas correspodientes a *components* y *pages*. 

Creamos una pagina llamada Dashboard la cual contendrá nuestra pequeña tienda virtual.
También crearemos un navbar que será aquel que vaya en la parte superior de la pagina y un sidebar para tener contenido a la derecha de la misma. Hasta este punto, no tenemos nada espectacular.

Ahora que tenemos elementos para empezar a trabajar, podemos configurar las rutas dentro del archivo App.tsx con ayuda de *react-router-dom* usando BrowserRouter, Routes y Route. Agregando a *Route* el elemento Dashboard. Con eso, ya seremos capaces de poder ver nuestra pagina. 

En el dashboard, podemos empezar a asignar posiciones. El navbar será el primer elemento, seguido por un div contenedor que tendrá un grid gracias a los elementos proporcionados por Tailwind (puede ver más información sobre estilos dentro del archivo correspondiente). Aquel div contendor tendrá propiedad que le asignen las columnas necesarias provocando un efecto de responsividad. Asignaremos un grid de 5 columnas, a la cual, el sidebar tendrá una y el resto del contenido tendrá las 4 restante. 

El div que contedrá a los productos le asignaremos la propiedad `col-span-4` para que ocupe el resto del contenedor y dentro de él, dividimos el espacio entre 1, 2 o 4 columnas, segun el tamaño de la pantalla. 

Ahora, viene un paso importante. Dentro del div, podriamos poner elementos estaticos y se mostrarán en sus respectivas columnas, pero para hacer este ejercicio un poco más dinámico, vamos a hacer un mapeo desde un archivo *products.json*.
Este archivo json contendrá 8 elementos por el momento, cada uno con sus propiedades *id, name, price e image*: 
```json
[
  {
    "id": 1,
    "name": "Camara Fotografica Maravillosa",
    "price": 4000,
    "image": "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg"
  }
]
```

Dentro de dashboard, haremos el mapeado, recordando importar json. La sintaxis del mapeado es: 
```tsx
  {products.map((product) => (
    <img src={product.image} />
    <p>{product.name}</p>
    <p>{product.price}</p>
    <button onclick={handleCarrito}>Añadir al carrito</button>
  ))}
```

De esta manera funciona, pero podemos hacerlo más bonito. Para eso, crearemos un componente llamado Card. Este contendrá *props* que requerirá cuando el componente sea llamado *Card*

Para este componente, recibiremos las props que enviaremos desde dashboard. Recordamos que typescript requiere que especifiquemos los tipos

```tsx
function Card = ({name, price, image, submitCarrito} : ({name: string, price:number, image: string, submitCarrito: () => void})) => {
  return(
    <div>
      <img src={image} />
      <div>{name}</div>
      <div>{price}</div>
      <button onclick={submitCarrito}></button>
    </div>
  )
}
```

Con esta estructura basica, podemos ir modificando sus estilos para dejarlo como queramos y, una vez a esté a nuestras necesidas, lo podemos importar a Dashboard y ocuparlo.

```tsx
  {products.map((product) => (
    <Card 
      name={product.name}
      price={product.price}
      image={product.image}
      submitCarrito={handleCarrito}
    />
  ))}
```

Los componentes son reutilizables y serán los mismos cada vez que se rendericen, cambiando en este caso, la información del producto que contiene, así, es más fácil mantenerlo y hacer cambios según se requiera. 

Ahora, si vemos, tenemos la función *handleCarrito* en el botón, la cual se ocupará de hacer la lógica de nuestra actividad: añadir los elementos del carrito en un array y contar cuantos elementos se han agregado.

Para eso, debemos ser capaces de poder manipular los datos del json, aun estando afuera del mapeo, por lo que necesitaremos una interface

```tsx
interface CardItems {
  name:string;
  price:number;
  image:string;
}
```

Una vez teniendo la interface, podemos empezar a generar nuestra función con ayuda de useState

```tsx
const [carrito, setCarrito] = useState<CardItems[]>([])

const handleCarrito = (product: CardItems) => {
  const newCarrito = [...carrito, product];
  setCarrito(newCarrito);
  alert(`"${product.name}" ha sido añadido al carrito.\nHay un total de ${carrito.length} articulos`);
  console.log(carrito);
}
```

Con esta función, podemos ver que articulo se ha añadido al carrito y cuantos se han añadido a lo largo del uso de la pagina.

### Toma de decisión
Migrar nuestro proyecto a un framework como react, es una buena opción una vez que consideramos el tamaño de nuestro sitio web a futuro. 
En primera, gracias a su naturaleza modular, es más facil de mantener, ya sea que haya un error en un componente o queramos ir agregando rutas mientras el proyecto va creciendo, los ajustes que se tienen que hacer son minimos, solo en el componente necesario y se aplicará a todas las áreas en donde ese componente se renderice. 
Como segundo argumento, el usar un framework con componentes, aumenta el rendimiento dado que solo cambian los elementos que se necesitan renderizar, eso quiere decir que, como en nuestro ejercicio, si tuvieramos que cambiar de contenido y que en vez de ver el listado de productos, queremos ver detalles del producto en una pagina aparte, pero queriendo mantener el navbar y el sidebar, usando html, css y javascript nativo se tendría que cargar todos los elementos, a diferencia de react en donde solo se cargaría la nueva pagina, dejando a las demás como están, provocando que la carga de elementos desde el navegador sea menor.

Así que si, elegiría que usaramos un react o un framework si nuestro sitio será más grande en el futuro. 