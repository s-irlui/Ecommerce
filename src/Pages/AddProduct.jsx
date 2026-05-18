import { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"

function AddProduct() {
  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [category, setCategory] = useState("")
  const [image, setImage] = useState("")
  const [loading, setLoading] = useState(false)
  
  const navigate = useNavigate()
  const abortControllerRef = useRef(null)

  // Cleanup function
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }
    }
  }, [])

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
    
    // Create new abort controller for this request
    abortControllerRef.current = new AbortController()

    const newProduct = {
      name: name.trim(),
      price: priceNum,
      category: category.trim(),
      image: image.trim() || "https://via.placeholder.com/300"
    }

    try {
      const res = await fetch("http://localhost:3001/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newProduct),
        signal: abortControllerRef.current.signal
      })

      if (!res.ok) {
        throw new Error("Failed to add product")
      }

      const data = await res.json()
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
      abortControllerRef.current = null
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
          <label htmlFor="price">Price:</label>
          <input
            id="price"
            type="number"
            step="0.01"
            min="0.01"
            placeholder="Price"
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