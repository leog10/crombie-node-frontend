import { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import Input from "../Components/Input";
import Modal from "../Components/Modal";
import Product from "../Components/Product";
import EditProduct from "./EditProduct";
import NewProduct from "./NewProduct";

// const API_URL = 'http://localhost:5000/product'; // LOCAL
const API_URL = 'https://crombie-node-production.up.railway.app/product'; // REMOTE

type ProductType = {
    name: string,
    brand: string,
    price: number
    id: number
}

const Home = () => {
    const [products, setProducts] = useState<ProductType[]>();
    const [showAddNewProduct, setShowAddNewProduct] = useState<boolean>(false);
    const [showEditProduct, setShowEditProduct] = useState<boolean>(false);
    const [editProduct, setEditProduct] = useState<ProductType | undefined>();
    const [search, setSearch] = useState<string>('');
    const [searchBy, setSearchBy] = useState<string>('name');
    const [loading, setLoading] = useState<boolean>(true);

    const toastStyle = {
        style: {
            color: '#fff',
            background: '#2A3745',
            display: 'flex',
            alignItems: 'baseline',
            border: '1px solid rgba(144, 202, 249, 0.5)'
        }
    }

    const fetchProducts = (url: string) => {
        setProducts([])
        fetch(url)
            .then((res) => {
                if (res.status === 200) return res.json();
                throw new Error('Error fetching products')
            })
            .then((result) => {
                setProducts(result);
                setLoading(false);
            }
            ).catch((error) => {
                console.log(error.message)
                setLoading(false);
            }
            );
    }

    const fetchWithSearchQuery = () => {
        fetchProducts(`${API_URL}?${searchBy}=${search}`);
    }

    useEffect(() => {
        fetchProducts(API_URL);
    }, [])

    const closeAddModal = () => {
        fetchWithSearchQuery();
        setShowAddNewProduct((prev) => !prev);
    }

    const closeEditModal = () => {
        fetchWithSearchQuery();
        setShowEditProduct((prev) => !prev);
    }

    const handleOnDelete = (id: number) => {
        toast.promise(
            fetch(`${API_URL}/${id}`, {
                method: 'DELETE'
            })
                .then((res) => {
                    if (res.status === 200) {
                        setProducts((prev) => {
                            const products = prev!.filter((p) => p.id !== id);
                            return products;
                        })
                    } else {
                        throw new Error('Error deleting product')
                    }
                }),
            {
                loading: 'Deleting...',
                success: 'Product deleted!',
                error: (err) => err.message,

            },
            toastStyle
        )
    }

    const handleOnEdit = (id: number) => {
        if (products?.some((p) => p.id === id)) {
            const product = products!.filter((p) => p.id === id)[0];
            setEditProduct(product);
            setShowEditProduct((prev) => !prev);
        }
    }

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        fetchProducts(`${API_URL}?${searchBy}=${search}`);
    }

    return (<div className={showAddNewProduct || showEditProduct ? "modal-open" : 'Home'}>
        <Toaster />
        <div className="table-container">
            <>
                <div className="search-container">
                    <form autoComplete="off" onSubmit={(e) => handleSearch(e)}>
                        <Input errorSpan={false} required={false} name="search" label="Search product" value={search} type='text' setValue={(e) => setSearch(e)} />
                        <div className="select-container">
                            <select onChange={(e) => setSearchBy(e.target.value)} defaultValue={'name'} title="Search by" >
                                <option value="name">Search by name</option>
                                <option value="brand">Search by brand</option>
                            </select>
                        </div>
                        <button className="button delete">{!loading ? <i className="bi bi-search"></i> : <div className="loader"></div>}Search</button>
                    </form>
                </div>


                <table cellSpacing='0' cellPadding="0">
                    <thead>
                        <tr>
                            <th>Name<div className="th-separator"></div></th>
                            <th>Brand<div className="th-separator"></div></th>
                            <th>Price<div className="th-separator"></div></th>
                            <th>Edit<div className="th-separator"></div></th>
                            <th>Delete</th>
                        </tr>
                    </thead>

                    {loading ?
                        <tfoot>
                            <tr>
                                <td colSpan={5}>
                                    <h2 className="home-loading"><div className="loader"></div>Loading...</h2>
                                </td>
                            </tr>
                        </tfoot>
                        :
                        products?.length === 0 && !loading ?
                            <tfoot>
                                <tr>
                                    <td colSpan={5}>
                                        <h3>No products found</h3>
                                    </td>
                                </tr>
                            </tfoot>
                            :
                            <>
                                <tbody>
                                    {products && products.map((p) =>
                                        <Product key={p.id} id={p.id} brand={p.brand} name={p.name} price={p.price} onEdit={(id) => handleOnEdit(id)} onDelete={() => handleOnDelete(p.id)} />
                                    )}
                                </tbody>
                                <tfoot>
                                </tfoot>
                            </>
                    }
                </table>
            </>

            <button onClick={() => setShowAddNewProduct(!showAddNewProduct)} className="button add">Add Product</button>
        </div>
        {showAddNewProduct && <Modal closeModal={() => setShowAddNewProduct(false)}><NewProduct toastStyle={toastStyle} fetchProducts={closeAddModal} /></Modal>}
        {showEditProduct && <Modal closeModal={() => setShowEditProduct(false)}><EditProduct toastStyle={toastStyle} product={editProduct} fetchProducts={closeEditModal} /></Modal>}
    </div>);
}

export default Home;