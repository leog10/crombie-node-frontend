import { useEffect, useState } from "react";
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

    const fetchProducts = () => {
        fetch(`${API_URL}`)
            .then((res) => res.json())
            .then((result) => setProducts(result)
            ).catch((error) => console.log(error.message)
            );
    }

    const closeAddModal = () => {
        fetchProducts();
        setShowAddNewProduct((prev) => !prev);
    }

    const closeEditModal = () => {
        fetchProducts();
        setShowEditProduct((prev) => !prev);
    }

    useEffect(() => {
        fetchProducts();
    }, [])

    const handleOnDelete = (id: number) => {
        fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        })
            .then((res) => {
                if (res.status === 200) {
                    fetch(`${API_URL}`)
                        .then((res) => res.json())
                        .then((result) => setProducts(result)
                        ).catch((error) => console.log(error.message)
                        );
                }
            })
            .catch((error) => console.log(error));
    }

    const handleOnEdit = (id: number) => {
        if (products?.some((p) => p.id === id)) {
            const product = products!.filter((p) => p.id === id)[0];
            setEditProduct(product);
            setShowEditProduct((prev) => !prev);
        }
    }

    return (<div className={showAddNewProduct || showEditProduct ? "modal-open" : 'Home'}>
        <div className="table-container">
            {products ?
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
                    <tbody>
                        {products && products.map((p) =>
                            <Product key={p.id} id={p.id} brand={p.brand} name={p.name} price={p.price} onEdit={(id) => handleOnEdit(id)} onDelete={() => handleOnDelete(p.id)} />
                        )}
                    </tbody>
                    <tfoot>
                    </tfoot>
                </table>
                : <h2 className="home-loading">Loading...</h2>}

            <button onClick={() => setShowAddNewProduct(!showAddNewProduct)} className="button add">Add Product</button>
        </div>
        {showAddNewProduct && <Modal closeModal={() => setShowAddNewProduct(false)}><NewProduct fetchProducts={closeAddModal} /></Modal>}
        {showEditProduct && <Modal closeModal={() => setShowEditProduct(false)}><EditProduct product={editProduct} fetchProducts={closeEditModal} /></Modal>}
    </div>);
}

export default Home;