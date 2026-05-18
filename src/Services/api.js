const BASE_URL = "http://localhost:3001"

export const getProducts = async () => {
  const res = await fetch(`${BASE_URL}/products`)
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

  return res.json()
}

export const deleteProduct = async (id) => {
  await fetch(`${BASE_URL}/products/${id}`, {
    method: "DELETE"
  })
}

export const updateProduct = async (id, updatedData) => {
  const res = await fetch(`${BASE_URL}/products/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(updatedData)
  })

  return res.json()
}