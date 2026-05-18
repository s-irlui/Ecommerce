import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"

function EditProduct() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [category, setCategory] = useState("")

  useEffect(() => {
    fetch(`http://localhost:3001/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setName(data.name)
        setPrice(data.price)
        setCategory(data.category)
      })
  }, [id])

  const handleUpdate = (e) => {
    e.preventDefault()

    fetch(`http://localhost:3001/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        price,
        category
      })
    }).then(() => navigate("/products"))
  }

  return (
    <div>
      <h1>Edit Product</h1>

      <form onSubmit={handleUpdate}>
        <input value={name} onChange={(e) => setName(e.target.value)} />
        <input value={price} onChange={(e) => setPrice(e.target.value)} />
        <input value={category} onChange={(e) => setCategory(e.target.value)} />

        <button type="submit">Update</button>
      </form>
    </div>
  )
}

export default EditProduct