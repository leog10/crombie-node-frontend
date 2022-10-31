import { useState } from "react";
import Input from "../Components/Input";
import { toast } from "react-hot-toast";

// const API_URL = 'http://localhost:5000/product'; // LOCAL
const API_URL = 'https://crombie-node-production.up.railway.app/product'; // REMOTE

type ProductType = {
    name: string,
    brand: string,
    price: number,
    id?: number,
}

type EditProductType = {
    fetchProducts: () => void,
    product: ProductType | undefined,
    toastStyle: Object,
}

const EditProduct: React.FC<EditProductType> = ({ fetchProducts, product, toastStyle }) => {
    const [editProduct, setEditProduct] = useState<ProductType>({ name: product!.name, brand: product!.brand, price: product!.price });
    const [loading, setLoading] = useState<boolean>(false);

    const handleEditProduct = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!product?.id) {
            return;
        }

        setLoading(true);

        toast.promise(
            fetch(`${API_URL}/${product?.id}`, {
                method: 'PUT',
                body: JSON.stringify({ ...editProduct }),
                headers: {
                    'Content-Type': 'application/json',
                }
            }).then((res) => {
                setLoading((prev) => !prev);
                if (res.status === 200) {
                    fetchProducts();
                }
            }
            ),
            {
                loading: 'Updating...',
                success: 'Product updated!',
                error: (error) => error.message,
            },
            toastStyle
        )
    }

    return (
        <div className="EditProduct">
            <h2 className="underline">Edit Product</h2>
            <form autoComplete="off" onSubmit={(e) => { handleEditProduct(e) }}>

                <Input autoFocus value={editProduct.name} name='name' type='text' label='Name' setValue={(name) => setEditProduct({ ...editProduct, name })} />
                <Input value={editProduct.brand} name='brand' type='text' label='Brand' setValue={(brand) => setEditProduct({ ...editProduct, brand })} />
                <Input value={editProduct.price} name='price' type='number' label='Price' setValue={(price) => setEditProduct({ ...editProduct, price: +price })} />

                <button className='button add' disabled={(!editProduct.name || !editProduct.brand || !editProduct.price) || (product?.name === editProduct.name && product?.brand === editProduct.brand && product?.price === editProduct.price) || loading}>{loading ? <div className="loader"></div> : ''}Edit</button>
            </form>
        </div>
    );
}

export default EditProduct;