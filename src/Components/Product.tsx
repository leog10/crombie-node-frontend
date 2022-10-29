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
            <td>{name}</td>
            <td>{brand}</td>
            <td>${price}</td>
            <td>
                <Link to={`/edit/${id}`}><button className="button edit">Edit</button></Link>
                <Link to={`/edit/${id}`}><div className="edit-responsive"><i className="bi bi-pen-fill"></i></div></Link>
            </td>
            <td>
                <Button loading={loading} text="Delete" className="button delete" handleOnClick={handleOnClick} />
                <div className={loading ? 'loading delete-responsive' : "delete-responsive"}><i onClick={handleOnClick} className="bi bi-trash-fill"></i></div>
            </td>
        </tr>
    );
}

export default Product;