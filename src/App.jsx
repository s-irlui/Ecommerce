import { BrowserRouter, Routes, Route } from "react-router-dom"
import "./index.css"
import Home from "./Pages/Home"
import Products from "./Pages/Products"
import AddProduct from "./Pages/AddProduct"
import EditProduct from "./Pages/EditProduct"
import NotFound from "./Pages/NotFound"
import Navbar from "./components/NavBar"

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/edit/:id" element={<EditProduct />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
