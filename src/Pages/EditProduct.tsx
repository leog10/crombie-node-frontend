import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import '../Components/Button.css'

// const API_URL = 'http://localhost:5000/product'; // LOCAL
const API_URL = 'https://crombie-node-production.up.railway.app/product'; // REMOTE

type ProductType = {
    name: string,
    brand: string,
    price: number
}

const EditProduct = () => {
    const [name, setName] = useState<string>('');
    const [brand, setBrand] = useState<string>('');
    const [price, setPrice] = useState<number>(0);
    const [product, setProduct] = useState<ProductType>();
    const [loading, setLoading] = useState<boolean>(false);

    const { productId } = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        fetch(`${API_URL}/${productId}`)
            .then((res) => res.json())
            .then((result) => {
                setProduct(result);
                setName(result.name);
                setBrand(result.brand);
                setPrice(result.price);
            }).catch((error) => {
                console.log(error.message);
                navigate('/');
            });
    }, [navigate, productId])

    const handleEditProduct = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setLoading(true);

        if (!name || !brand || !price) {
            return;
        }

        const updateProduct: ProductType = {
            name,
            brand,
            price
        }

        fetch(`${API_URL}/${productId}`, {
            method: 'PUT',
            body: JSON.stringify(updateProduct),
            headers: {
                'Content-Type': 'application/json',
            }
        }).then((res) => {
            setLoading((value) => {
                return !value;
            });
            if (res.status === 200) {
                navigate('/');
            }
        }
        ).catch((error) => console.log(error.message))
    }

    return (
        <div className="EditProduct">
            <h2 className="underline">Edit Product</h2>
            <form onSubmit={(e) => { handleEditProduct(e) }}>
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
                <button className='button add' disabled={(!name || !brand || !price) || (product?.name === name && product?.brand === brand && product?.price === price) || loading}>{loading ? <div className="loader"></div> : ''}Edit</button>
            </form>
            <Link to='/' ><button className='button back'>Go back</button></Link>
        </div>
    );
}

export default EditProduct;