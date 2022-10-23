import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Product from "../Components/Product";

const API_URL = 'http://localhost:5000'; // LOCAL
// const API_URL = 'https://crombie-node-production.up.railway.app'; // REMOTE

type ProductType = {
    name: string,
    brand: string,
    price: number
    id: number
}

const Home = () => {
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
            .catch((error) => console.log(error)
            )
    }

    return (<div className="Home">
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
                    <Product key={p.id} id={p.id} brand={p.brand} name={p.name} price={p.price} handleOnDelete={handleOnDelete} />
                )}
            </tbody>
            <tfoot>
            </tfoot>
        </table>

        <Link to="/new"><button className="button add">Add Product</button></Link>
    </div>);
}

export default Home;