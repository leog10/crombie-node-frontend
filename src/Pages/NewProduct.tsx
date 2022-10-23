import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

type ProductType = {
    name: string,
    brand: string,
    price: number
}

const NewProduct = () => {
    const [name, setName] = useState<string>('');
    const [brand, setBrand] = useState<string>('');
    const [price, setPrice] = useState<number>(0);

    const navigate = useNavigate();

    const handleAddProduct = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!name || !brand || !price) {
            return;
        }

        const newProduct: ProductType = {
            name,
            brand,
            price
        }

        fetch('http://localhost:5000/product', {
            method: 'POST',
            body: JSON.stringify(newProduct),
            headers: {
                'Content-Type': 'application/json',
            }
        }).then((res) => {
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
                <div>
                    <label className={name ? '' : "hidden"} htmlFor="name">Name</label>
                    <input value={name ? name : ''} name="name" type="text" placeholder={'Name'} onChange={(e) => setName(e.target.value)} />
                </div>

                <div>
                    <label className={brand ? '' : "hidden"} htmlFor="brand">Brand</label>
                    <input value={brand ? brand : ''} name="brand" type="text" placeholder={'Brand'} onChange={(e) => setBrand(e.target.value)} />
                </div>

                <div>
                    <label className={price ? '' : "hidden"} htmlFor="price">Price $</label>
                    <input value={price ? price : ''} name="price" type="number" placeholder={'Price'} onChange={(e) => setPrice(+e.target.value)} />
                </div>
                <button className='button add' disabled={!name || !brand || !price}>Add</button>
            </form>
            <Link to='/' ><button className='button back'>Go back</button></Link>
        </div>
    );
}

export default NewProduct;