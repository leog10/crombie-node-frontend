import './App.css';
import { useEffect, useState } from 'react';
import Product from './Components/Product';

// const LOCAL = 'http://localhost:5000';
const REMOTE = 'https://crombie-node-production.up.railway.app';

type ProductType = {
  name: string,
  brand: string,
  price: number
  id: number
}

function App() {
  const [products, setProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    fetch(`${REMOTE}/product`)
      .then((res) => res.json())
      .then((result) => setProducts(result)
      ).catch((error) => console.log(error.message)
      );
  }, [products])

  const handleOnDelete = (id: number) => {
    fetch(`https://crombie-node-production.up.railway.app/product/${id}`, {
      method: 'DELETE'
    })
      .then((res) => res.json())
      .then((result) => console.log(result))
      .catch((error) => console.log(error)
      )
  }

  return (
    <div className="App">
      <header className="App-header">

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
              <Product id={p.id} brand={p.brand} name={p.name} price={p.price} key={p.id} handleOnDelete={() => handleOnDelete(p.id)} handleOnUpdate={() => null} />
            )}
          </tbody>
          <tfoot>
          </tfoot>
        </table>

      </header>
    </div >
  );
}

export default App;
