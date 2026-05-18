import db from "../../db.json"

const STORAGE_KEY = "ecommerce-admin-products"

const readProducts = () => {
  const savedProducts = localStorage.getItem(STORAGE_KEY)

  if (savedProducts) {
    return JSON.parse(savedProducts)
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(db.products))
  return db.products
}

const saveProducts = (products) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products))
}

export const getProducts = async () => {
  return readProducts()
}

export const getProduct = async (id) => {
  const product = readProducts().find((item) => item.id === id)

  if (!product) {
    throw new Error("Product not found")
  }

  return product
}

export const addProduct = async (product) => {
  const products = readProducts()
  const newProduct = {
    ...product,
    id: crypto.randomUUID()
  }

  saveProducts([...products, newProduct])
  return newProduct
}

export const deleteProduct = async (id) => {
  const products = readProducts().filter((product) => product.id !== id)
  saveProducts(products)
}

export const updateProduct = async (id, updatedData) => {
  const products = readProducts()
  const productExists = products.some((product) => product.id === id)

  if (!productExists) {
    throw new Error("Failed to update product")
  }

  const updatedProducts = products.map((product) =>
    product.id === id ? { ...product, ...updatedData, id } : product
  )

  saveProducts(updatedProducts)
  return updatedProducts.find((product) => product.id === id)
}
