import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { getProduct, updateProduct } from "../Services/api"

function EditProduct() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [category, setCategory] = useState("")
  const [image, setImage] = useState("")
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    getProduct(id)
      .then((data) => {
        setName(data.name || "")
        setPrice(data.price || "")
        setCategory(data.category || "")
        setImage(data.image || "")
        setLoading(false)
      })
      .catch((err) => {
        console.error("Error fetching product:", err)
        setError(err.message)
        setLoading(false)
      })
  }, [id])

  const handleUpdate = async (e) => {
    e.preventDefault()
    setUpdating(true)

    // Prepare updated product
    const updatedProduct = {
      name,
      price: Number(price), // Convert to number
      category,
      image: image || "https://via.placeholder.com/300"
    }

    try {
      await updateProduct(id, updatedProduct)
      navigate("/products")
    } catch (error) {
      console.error("Error updating product:", error)
      alert("Failed to update product. Please try again.")
      setUpdating(false)
    }
  }

  // Show loading state
  if (loading) {
    return (
      <div className="page">
        <h1>Edit Product</h1>
        <div className="loading-spinner">Loading...</div>
      </div>
    )
  }

  // Show error state
  if (error) {
    return (
      <div className="page">
        <h1>Edit Product</h1>
        <div className="error">
          <p>Error: {error}</p>
          <button onClick={() => navigate("/products")}>Back to Products</button>
        </div>
      </div>
    )
  }

  return (
    <div className="page">
      <h1>Edit Product</h1>

      <form onSubmit={handleUpdate}>
        <div>
          <label htmlFor="name">Product Name:</label>
          <input
            id="name"
            type="text"
            placeholder="Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="price">Price (KES):</label>
          <input
            id="price"
            type="number"
            step="0.01"
            min="0"
            placeholder="Price in KES"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="category">Category:</label>
          <input
            id="category"
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="image">Image URL (optional):</label>
          <input
            id="image"
            type="text"
            placeholder="Image URL"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </div>

        <div className="form-buttons">
          <button type="submit" className="success" disabled={updating}>
            {updating ? "Updating..." : "Update Product"}
          </button>
          <button type="button" className="secondary" onClick={() => navigate("/products")}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default EditProduct
