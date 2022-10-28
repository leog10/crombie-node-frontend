import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "./Button";

type ProductType = {
    name: string,
    brand: string,
    price: number,
    id: number,
    loading?: boolean,
    onDelete: () => void;
}

const Product: React.FC<ProductType> = ({ brand, name, price, id, onDelete }) => {
    const [loading, setLoading] = useState<boolean>(false)

    const handleOnClick = () => {
        setLoading(true);
        onDelete();
    }

    return (
        <tr key={id}>
            <td><p>{name}</p></td>
            <td><p>{brand}</p></td>
            <td><p>${price}</p></td>
            <td><Link to={`/edit/${id}`}><button className="button edit">Edit</button></Link></td>
            <td><Button loading={loading} text="Delete" className="button delete" handleOnClick={handleOnClick} /></td>
        </tr>
    );
}

export default Product;