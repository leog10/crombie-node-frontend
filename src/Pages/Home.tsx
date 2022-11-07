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
    const [searchQuery, setSearch] = useState<string>('');
    const [searchBy, setSearchBy] = useState<string>('name');
    const [searchLimit, setSearchLimit] = useState<string>('5');
    const [loading, setLoading] = useState<boolean>(true);
    const [pagination, setPagination] = useState({ info: '1', page: 1, totalPages: 1 })

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
        setLoading(true);
        setProducts([])
        fetch(url)
            .then((res) => res.json())
            .then((result) => {
                if (result.error) {
                    throw new Error(result.error);
                }
                setProducts(result.products);
                const [page, totalPages] = result.page.split('/')
                if (result.page && result.showing) {
                    setPagination({ page: +page, totalPages: +totalPages, info: result.showing });
                } else {
                    setPagination({ page: 1, totalPages: 1, info: '0 of 0' });
                }
                setLoading(false);
            }
            ).catch((error) => {
                console.log(error.message)
                setPagination({ page: 1, totalPages: 1, info: '0 of 0' });
                setLoading(false);
            }
            );
    }

    const handleSearch = (e?: React.FormEvent<HTMLFormElement>, limit?: string, page?: number) => {
        e?.preventDefault();
        if (page) {
            return fetchProducts(`${API_URL}?${searchBy}=${searchQuery}&limit=${searchLimit}&page=${page}`);
        }
        if (limit) {
            return fetchProducts(`${API_URL}?${searchBy}=${searchQuery}&limit=${limit}`);
        }
        fetchProducts(`${API_URL}?${searchBy}=${searchQuery}&limit=${searchLimit}`);
    }

    useEffect(() => {
        fetchProducts(API_URL)
    }, [])

    const closeAddModal = () => {
        handleSearch(undefined, undefined, pagination.page);
        setShowAddNewProduct((prev) => !prev);
    }

    const closeEditModal = () => {
        handleSearch(undefined, undefined, pagination.page);
        setShowEditProduct((prev) => !prev);
    }

    const handleOnDelete = (id: number) => {
        toast.promise(
            fetch(`${API_URL}/${id}`, {
                method: 'DELETE'
            })
                .then((res) => {
                    if (res.status === 200) {
                        handleSearch();
                        // I had to refetch to update the table quantity info
                        // setProducts((prev) => {
                        //     const products = prev!.filter((p) => p.id !== id);
                        //     return products;
                        // })
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

    const handlePageUp = () => {
        if (pagination.page < pagination.totalPages) {
            handleSearch(undefined, undefined, pagination.page + 1)
            setPagination((prev) => {
                return { ...prev, page: pagination.page + 1 }
            });
        }
    }

    const handlePageDown = () => {
        if (pagination.page > 1) {
            setPagination((prev) => {
                handleSearch(undefined, undefined, pagination.page - 1)
                return { ...prev, page: pagination.page - 1 }
            });
        }
    }

    return (<div className={showAddNewProduct || showEditProduct ? "modal-open" : 'Home'}>
        <Toaster />
        <div className="table-container">
            <>
                <div className="search-container">
                    <form autoComplete="off" onSubmit={(e) => handleSearch(e)}>
                        <Input errorSpan={false} required={false} name="search" label="Search product" value={searchQuery} type='search' setValue={(e) => setSearch(e)} />
                        <div className="select-container">
                            <select onChange={(e) => setSearchBy(e.target.value)} defaultValue={'name'} >
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
                        <tbody>
                            <tr className="no-hover">
                                <td colSpan={5}>
                                    <h2 className="home-loading"><div className="loader"></div>Loading...</h2>
                                </td>
                            </tr>
                        </tbody>
                        :
                        (products?.length === 0 || !products) && !loading ?
                            <tbody>
                                <tr className={!products?.length ? 'no-hover' : ''}>
                                    <td colSpan={5}>
                                        <h3>No products found</h3>
                                    </td>
                                </tr>
                            </tbody>
                            :
                            <>
                                <tbody>
                                    {products && products.map((p) =>
                                        <Product key={p.id} id={p.id} brand={p.brand} name={p.name} price={p.price} onEdit={(id) => handleOnEdit(id)} onDelete={() => handleOnDelete(p.id)} />
                                    )}
                                    {products && products?.length < +searchLimit ?
                                        <>
                                            {Array((+searchLimit - products.length) - 1).fill(0).map((_, i) => {
                                                return (
                                                    <tr key={i} className='empty-tr'>
                                                    </tr>
                                                )
                                            })}
                                            <tr className="no-hover empty-tr">
                                                <td colSpan={5}></td>
                                            </tr>
                                        </>
                                        :
                                        ''}
                                </tbody>
                            </>
                    }
                    <tfoot>
                        <tr>
                            <td colSpan={5}>
                                <div className="page-buttons-container">
                                    <div>
                                        <span>Rows per page:</span>
                                        <select disabled={!products?.length} onChange={(e) => {
                                            setSearchLimit(e.target.value);
                                            setPagination((prev) => ({ ...prev, page: 1 }));
                                            handleSearch(undefined, e.target.value);
                                        }
                                        } defaultValue={searchLimit}>
                                            <option value="5">5</option>
                                            <option value="10">10</option>
                                            <option value="15">15</option>
                                        </select>
                                    </div>
                                    <span className="pagination-info">{pagination.info}</span>
                                    <span>
                                        <button onClick={handlePageDown} disabled={pagination.page === 1}><i className="bi bi-caret-left"></i></button>
                                        <button onClick={handlePageUp} disabled={pagination.page === pagination.totalPages}><i className="bi bi-caret-right"></i></button>
                                    </span>
                                </div>
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </>

            <button onClick={() => setShowAddNewProduct(!showAddNewProduct)} className="button add">Add Product</button>
        </div>
        {showAddNewProduct && <Modal closeModal={() => setShowAddNewProduct(false)}><NewProduct toastStyle={toastStyle} fetchProducts={closeAddModal} /></Modal>}
        {showEditProduct && <Modal closeModal={() => setShowEditProduct(false)}><EditProduct toastStyle={toastStyle} product={editProduct} fetchProducts={closeEditModal} /></Modal>}
    </div>);
}

export default Home;