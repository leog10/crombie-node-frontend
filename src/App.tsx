import './App.css';
import { useEffect, useState } from 'react';
import Product from './Components/Product';
import Button from './Components/Button';
import NewProduct from './NewProduct';

const API_URL = 'http://localhost:5000'; // LOCAL
// const API_URL = 'https://crombie-node-production.up.railway.app'; // REMOTE

type ProductType = {
  name: string,
  brand: string,
  price: number
  id: number
}

function App() {
  const [products, setProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    fetch(`${API_URL}/product`)
      .then((res) => res.json())
      .then((result) => setProducts(result)
      ).catch((error) => console.log(error.message)
      );
  }, [products])

  const handleOnDelete = (id: number) => {
    fetch(`${API_URL}/product/${id}`, {
      method: 'DELETE'
    })
      .then((res) => res.json())
      .then((result) => console.log(result))
      .catch((error) => console.log(error)
      )
  }

  const handleOnUpdate = () => {
    console.log("update");

  }

  return (
    <div className="App">
      <table cellSpacing='0' cellPadding="0">
        <thead>
          <tr>
            <th>Name</th>
            <th>Brand</th>
            <th>Price</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {products && products.map((p) =>
            <Product key={p.id} id={p.id} brand={p.brand} name={p.name} price={p.price} handleOnDelete={handleOnDelete} handleOnUpdate={handleOnUpdate} />
          )}
        </tbody>
        <tfoot>
        </tfoot>
      </table>

      <Button className='' text='Add Product' handleOnClick={() => { }} />

      <NewProduct />
    </div >
  );
}

export default App;
