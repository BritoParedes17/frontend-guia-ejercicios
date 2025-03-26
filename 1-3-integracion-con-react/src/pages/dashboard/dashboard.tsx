import React, {useState} from 'react'
import Navbar from '../../components/navbar';
import SideBar from '../../components/sidebar';
import products from '../../products.json';
import Card from '../../components/card';

interface CardItems{
  name: string;
  price: number;
  image: string;
}

function Dashboard(){
  const [carrito, setCarrito] = useState<CardItems[]>([]);

  const handleCarrito = (product: CardItems) => {
    const newCarrito = [...carrito, product];
    setCarrito(newCarrito);
    alert(`"${product.name}" agregado al carrito\nTotal de artículos: ${newCarrito.length}`);
    console.log(newCarrito);
  }
  return(
    <div>
      <Navbar />
      <div className='grid grid-cols-5 gap-6'>
        <SideBar />
        <div className='grid grid-flow-row col-span-4 gap-4 content'>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'>
            {products.map((product, index) => (
              <Card
                key={index}
                image={product.image} 
                name={product.name} 
                price={product.price} 
                submitCarrito={() => handleCarrito(product)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard;