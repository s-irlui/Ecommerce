const BASE_URL = "http://localhost:3002"

export const getProducts = async () => {
  const res = await fetch(`${BASE_URL}/products`)
  if (!res.ok) {
    throw new Error("Failed to fetch products")
  }
  return res.json()
}

export const getProduct = async (id) => {
  const res = await fetch(`${BASE_URL}/products/${id}`)
  if (!res.ok) {
    throw new Error("Product not found")
  }
  return res.json()
}

export const addProduct = async (product) => {
  const res = await fetch(`${BASE_URL}/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(product)
  })

  if (!res.ok) {
    throw new Error("Failed to add product")
  }

  return res.json()
}

export const deleteProduct = async (id) => {
  const res = await fetch(`${BASE_URL}/products/${id}`, {
    method: "DELETE"
  })

  if (!res.ok) {
    throw new Error("Failed to delete product")
  }
}

export const updateProduct = async (id, updatedData) => {
  const res = await fetch(`${BASE_URL}/products/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(updatedData)
  })

  if (!res.ok) {
    throw new Error("Failed to update product")
  }

  return res.json()
}
