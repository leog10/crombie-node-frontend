import Button from "./Button";

type ProductType = {
    name: string,
    brand: string,
    price: number,
    id: number,
    handleOnDelete: (id: number) => void,
    handleOnUpdate: (id: number) => void,
}

const Product: React.FC<ProductType> = ({ brand, name, price, id, handleOnDelete, handleOnUpdate }) => {
    return (
        <>
            <tr key={id}>
                <td><p>{name}</p></td>
                <td><p>{brand}</p></td>
                <td><p>${price}</p></td>
                <td><Button text="Edit" className="edit" handleOnClick={() => handleOnUpdate(id)} /></td>
                <td><Button text="Delete" className="delete" handleOnClick={() => handleOnDelete(id)} /></td>
            </tr>
        </>
    );
}

export default Product;