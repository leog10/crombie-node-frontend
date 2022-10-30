import { useState } from 'react';
import Input from '../Components/Input';

// const API_URL = 'http://localhost:5000/product'; // LOCAL
const API_URL = 'https://crombie-node-production.up.railway.app/product'; // REMOTE

type ProductType = {
    name: string,
    brand: string,
    price: number | string
}

type NewProductType = {
    fetchProducts: () => void;
}

const NewProduct: React.FC<NewProductType> = ({ fetchProducts }) => {
    const [newProduct, setNewProduct] = useState<ProductType>({ name: '', brand: '', price: 0 });
    const [loading, setLoading] = useState<boolean>(false);

    const handleAddProduct = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setLoading(true);

        fetch(`${API_URL}`, {
            method: 'POST',
            body: JSON.stringify({ ...newProduct, price: +newProduct.price }),
            headers: {
                'Content-Type': 'application/json',
            }
        }).then((res) => {
            setLoading((prev) => !prev);
            if (res.status === 201) {
                setNewProduct({ name: '', brand: '', price: 0 });
                fetchProducts();
            }
        }
        ).catch((error) => console.log(error.message))
    }

    return (
        <div className='NewProduct'>
            <h2 className="underline">Add New Product</h2>
            <form autoComplete="off" onSubmit={(e) => { handleAddProduct(e) }}>

                <Input autoFocus value={newProduct.name} name='name' type='text' label='Name' setValue={(name) => setNewProduct({ ...newProduct, name })} />
                <Input value={newProduct.brand} name='brand' type='text' label='Brand' setValue={(brand) => setNewProduct({ ...newProduct, brand })} />
                <Input value={newProduct.price} name='price' type='number' label='Price' setValue={(price) => setNewProduct({ ...newProduct, price: +price })} />

                <button className='button add' disabled={!newProduct.name || !newProduct.brand || !newProduct.price || loading}>{loading ? <div className="loader"></div> : ''}Add Product</button>
            </form>
        </div>
    );
}

export default NewProduct;