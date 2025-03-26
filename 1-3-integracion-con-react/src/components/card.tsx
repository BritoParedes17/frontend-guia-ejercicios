import React from "react";

const Card = ({ name, price, image, submitCarrito} : ({name: string, price: number, image: string, submitCarrito: () => void})) => {

  return(
    <div className="mt-5 mb-5 mr-5 border-solid border-gray-200 border-2 rounded-sm p-2">
      <div>
        <img alt={name} className="object-cover h-52 w-full" src={image}/>  
      </div>
      <div className="ml-2 mr-2 mt-2 text-lg">
        {name}
      </div>
      <div className="ml-2 mr-2 mt-2 mb-2 text-xs">
        {price}
      </div>
      <div>
        <button onClick={submitCarrito} type="button" className="px-7 py-2 mb-2 bg-yellow-500 text-white rounded-full text-center cursor-pointer hover:bg-yellow-700">Agregar al carrito</button>
      </div>
    </div>
  )
}

export default Card;