import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import '../Components/Loader.css'
import Input from "../Components/Input";

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
            {product ? <div><form onSubmit={(e) => { handleEditProduct(e) }}>

                <Input value={name} name='name' type='text' label='Name' setValue={setName} />
                <Input value={brand} name='brand' type='text' label='Brand' setValue={setBrand} />
                <Input value={price} name='price' type='number' label='Price' setValue={(e) => setPrice(+e)} />

                <button className='button add' disabled={(!name || !brand || !price) || (product?.name === name && product?.brand === brand && product?.price === price) || loading}>{loading ? <div className="loader"></div> : ''}Edit</button>
            </form>
                <Link to='/' ><button className='button back'><i className="bi bi-arrow-counterclockwise"></i>Go back</button></Link>
            </div> : <h3>Loading...</h3>}
        </div>
    );
}

export default EditProduct;