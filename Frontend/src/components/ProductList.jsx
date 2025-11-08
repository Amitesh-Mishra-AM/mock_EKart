import React from "react";

function ProductList({ products, onAdd }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 20 }}>
      {products.map(p => (
        <div key={p.id} style={{ border: "1px solid #ccc", padding: 15 }}>
          <h4>{p.name}</h4>
          <p>₹{p.price}</p>
          <button onClick={() => onAdd(p.id)}>Add to Cart</button>
        </div>
      ))}
    </div>
  );
}

export default ProductList;
