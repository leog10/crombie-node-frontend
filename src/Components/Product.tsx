import { useState } from "react";
import Button from "./Button";

type ProductType = {
    name: string,
    brand: string,
    price: number,
    id: number,
    loading?: boolean,
    onDelete: () => void,
    onEdit: (id: number) => void,
}

const Product: React.FC<ProductType> = ({ brand, name, price, id, onDelete, onEdit }) => {
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
                <button onClick={() => onEdit(id)} className="button edit"><i className="bi bi-pen-fill"></i>Edit</button>
                <div onClick={() => onEdit(id)} className="edit-responsive"><i className="bi bi-pen-fill"></i></div>
            </td>
            <td>
                <Button loading={loading} text="Delete" className="button delete" handleOnClick={handleOnClick} />
                <div className={loading ? 'loading delete-responsive' : "delete-responsive"}><i onClick={handleOnClick} className="bi bi-trash-fill"></i></div>
            </td>
        </tr>
    );
}

export default Product;