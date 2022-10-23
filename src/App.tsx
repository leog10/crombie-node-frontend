import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import NewProduct from './Pages/NewProduct';
import EditProduct from './Pages/EditProduct';



function App() {
  return (
    <div className="App">
      <Routes>
        <Route index element={<Home />} />
        <Route path='/new' element={<NewProduct />} />
        <Route path='/edit' element={<EditProduct />} />

        {/* Using path="*"" means "match anything", so this route
                acts like a catch-all for URLs that we don't have explicit
                routes for. */}
      </Routes>
    </div >
  );
}

export default App;
