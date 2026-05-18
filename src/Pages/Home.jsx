import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

function Home() {
  const [products, setProducts] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    fetch("http://localhost:3001/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
  }, [])

  return (
    <div className="home-container">
      <div className="hero">
        <h1> HOME</h1>
        <p>Manage products, pricing, and inventory in one clean system</p>

        <div className="hero-actions">
          <button onClick={() => navigate("/products")}>
            View Products
          </button>
          <button onClick={() => navigate("/add-product")}>
            Add New Product
          </button>
        </div>
      </div>

      <div className="stats">
        <div className="stat-card">
          <h2>Total Products</h2>
          <p>{products.length}</p>
        </div>

        <div className="stat-card">
          <h2>Active Listings</h2>
          <p>{products.length}</p>
        </div>
      </div>

      <h2 className="section-title">Featured Products</h2>

      <div className="home-grid">
        {products.slice(0, 4).map((product) => (
          <div key={product.id} className="home-card">
            <h3>{product.name}</h3>
            <p>${product.price}</p>
            <span>{product.category}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home