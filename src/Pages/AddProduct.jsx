import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { addProduct as createProduct } from "../Services/api"

function AddProduct() {
  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [category, setCategory] = useState("")
  const [image, setImage] = useState("")
  const [loading, setLoading] = useState(false)
  
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Client-side validation
    const priceNum = Number(price)
    if (isNaN(priceNum) || priceNum <= 0) {
      alert("Please enter a valid price greater than 0")
      return
    }
    
    if (!name.trim()) {
      alert("Product name is required")
      return
    }
    
    if (!category.trim()) {
      alert("Category is required")
      return
    }
    
    setLoading(true)

    const newProduct = {
      name: name.trim(),
      price: priceNum,
      category: category.trim(),
      image: image.trim() || "https://via.placeholder.com/300"
    }

    try {
      const data = await createProduct(newProduct)
      console.log("Added product:", data)

      // Reset form
      setName("")
      setPrice("")
      setCategory("")
      setImage("")

      navigate("/products")
    } catch (error) {
      if (error.name === "AbortError") {
        console.log("Request cancelled")
      } else {
        console.error("Error adding product:", error)
        alert("Product NOT added. Check backend/server.")
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page">
      <h1>Add Product</h1>

      <form onSubmit={handleSubmit}>
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
            min="0.01"
            placeholder="Price (KES)"
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
            placeholder="Image URL (optional)"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </div>

        <button className="success" type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add Product"}
        </button>
      </form>
    </div>
  )
}

export default AddProduct
