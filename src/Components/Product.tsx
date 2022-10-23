import { Link } from "react-router-dom";
import Button from "./Button";

type ProductType = {
    name: string,
    brand: string,
    price: number,
    id: number,
    handleOnDelete: (id: number) => void
}

const Product: React.FC<ProductType> = ({ brand, name, price, id, handleOnDelete }) => {
    return (
        <>
            <tr key={id}>
                <td><p>{name}</p></td>
                <td><p>{brand}</p></td>
                <td><p>${price}</p></td>
                <td><Link to={`/edit/${id}`}><button className="button edit">Edit</button></Link></td>
                <td><Button text="Delete" className="button delete" handleOnClick={() => handleOnDelete(id)} /></td>
            </tr>
        </>
    );
}

export default Product;