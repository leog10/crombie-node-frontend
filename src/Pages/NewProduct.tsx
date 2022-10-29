import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../Components/Input';

// const API_URL = 'http://localhost:5000/product'; // LOCAL
const API_URL = 'https://crombie-node-production.up.railway.app/product'; // REMOTE

type ProductType = {
    name: string,
    brand: string,
    price: number
}

const NewProduct = () => {
    const [name, setName] = useState<string>('');
    const [brand, setBrand] = useState<string>('');
    const [price, setPrice] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);

    const navigate = useNavigate();

    const handleAddProduct = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!name || !brand || !price) {
            return;
        }

        setLoading(true);

        const newProduct: ProductType = {
            name,
            brand,
            price
        }

        fetch(`${API_URL}`, {
            method: 'POST',
            body: JSON.stringify(newProduct),
            headers: {
                'Content-Type': 'application/json',
            }
        }).then((res) => {
            setLoading((value) => {
                return !value;
            });
            if (res.status === 201) {
                setName('');
                setBrand('');
                setPrice(0);
                navigate('/');
            }
        }
        ).catch((error) => console.log(error.message))
    }

    return (
        <div className='NewProduct'>
            <h2 className="underline">Add New Product</h2>
            <form onSubmit={(e) => { handleAddProduct(e) }}>

                <Input value={name} name='name' type='text' label='Name' setValue={setName} />
                <Input value={brand} name='brand' type='text' label='Brand' setValue={setBrand} />
                <Input value={price} name='price' type='number' label='Price' setValue={(e) => setPrice(+e)} />

                <button className='button add' disabled={!name || !brand || !price || loading}>{loading ? <div className="loader"></div> : ''}Add Product</button>
            </form>
            <Link to='/' ><button className='button back'>Go back</button></Link>
        </div>
    );
}

export default NewProduct;