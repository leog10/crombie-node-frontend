import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "./Button";

// const API_URL = 'http://localhost:5000/product'; // LOCAL
const API_URL = 'https://crombie-node-production.up.railway.app/product'; // REMOTE

type ProductType = {
    name: string,
    brand: string,
    price: number,
    id: number,
    handleOnDelete: (id: number) => void
}

const Product: React.FC<ProductType> = ({ brand, name, price, id }) => {
    const [loading, setLoading] = useState<boolean>(false);

    const handleOnDelete = (id: number) => {
        setLoading(true);

        fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        })
            .then((res) => {
                if (res.status === 200) {
                    setLoading((value) => {
                        return !value;
                    });
                }
            })
            .catch((error) => console.log(error));
    }

    return (
        <>
            <tr key={id}>
                <td><p>{name}</p></td>
                <td><p>{brand}</p></td>
                <td><p>${price}</p></td>
                <td><Link to={`/edit/${id}`}><button className="button edit">Edit</button></Link></td>
                <td><Button loading={loading} text="Delete" className="button delete" handleOnClick={() => handleOnDelete(id)} /></td>
            </tr>
        </>
    );
}

export default Product;