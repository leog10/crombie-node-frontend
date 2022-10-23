import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Product from "../Components/Product";

// const API_URL = 'http://localhost:5000/product'; // LOCAL
const API_URL = 'https://crombie-node-production.up.railway.app/product'; // REMOTE

type ProductType = {
    name: string,
    brand: string,
    price: number
    id: number
}

const Home = () => {
    const [products, setProducts] = useState<ProductType[]>();


    useEffect(() => {
        fetch(`${API_URL}`)
            .then((res) => res.json())
            .then((result) => setProducts(result)
            ).catch((error) => console.log(error.message)
            );
    }, [products])



    return (<div className="Home">
        {products ? <table cellSpacing='0' cellPadding="0">
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
                    <Product key={p.id} id={p.id} brand={p.brand} name={p.name} price={p.price} handleOnDelete={() => { }} />
                )}
            </tbody>
            <tfoot>
            </tfoot>
        </table> : <h2>Loading...</h2>}

        <Link to="/new"><button className="button add">Add Product</button></Link>
    </div>);
}

export default Home;