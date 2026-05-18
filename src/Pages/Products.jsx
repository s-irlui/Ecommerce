import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import SearchBar from "../components/SearchBar"
import { deleteProduct, getProducts } from "../Services/api"

function Products() {
  const [products, setProducts] = useState([])
  const [search, setSearch] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const loadProducts = async () => {
    try {
      const data = await getProducts()
      setProducts(data)
      setError("")
    } catch (err) {
      console.error("Error loading products:", err)
      setError("Could not load products. Refresh the page and try again.")
    }
  }

  useEffect(() => {
    loadProducts()
  }, [])

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id)
      loadProducts()
    } catch (err) {
      console.error("Error deleting product:", err)
      alert("Could not delete product. Refresh the page and try again.")
    }
  }

  const filteredProducts = products.filter((product) =>
    (product.name || "").toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="page">
      <h1>Products Page</h1>

      <SearchBar search={search} setSearch={setSearch} />
      {error && <p className="error">{error}</p>}

      <div className="products-container">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product.id} className="product-card">
              
              {product.image && (
                <img
                  src={product.image}
                  alt={product.name}
                />
              )}

              <h3>{product.name}</h3>
              <p>Price: KES {product.price}</p>
              <p className="category">{product.category}</p>

              <button
                className="primary"
                onClick={() => navigate(`/edit/${product.id}`)}
              >
                Edit
              </button>

              <button
                className="danger"
                onClick={() => handleDelete(product.id)}
              >
                Delete
              </button>
            </div>
          ))
        ) : (
          <p className="empty">No products found</p>
        )}
      </div>
    </div>
  )
}

export default Products
