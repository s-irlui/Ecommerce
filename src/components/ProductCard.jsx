<div className="product-card">
  <img src={product.image} alt={product.name} />
  <h3>{product.name}</h3>
  <p>${product.price}</p>
  <p>{product.category}</p>

  <button onClick={() => navigate(`/edit/${product.id}`)}>
    Edit
  </button>

  <button onClick={() => handleDelete(product.id)}>
    Delete
  </button>
</div>