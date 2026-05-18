import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import SearchBar from "../components/SearchBar"

function Products() {
  const [products, setProducts] = useState([])
  const [search, setSearch] = useState("")
  const navigate = useNavigate()

  const loadProducts = () => {
    fetch("http://localhost:3001/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
  }

  useEffect(() => {
    loadProducts()
  }, [])

  const handleDelete = (id) => {
    fetch(`http://localhost:3001/products/${id}`, {
      method: "DELETE"
    }).then(() => {
      loadProducts()
    })
  }

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="page">
      <h1>Products Page</h1>

      <SearchBar search={search} setSearch={setSearch} />

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
              <p>Price: ${product.price}</p>
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