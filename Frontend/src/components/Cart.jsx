import React from "react";

function Cart({ cart, onRemove, onCheckout }) {
  return (
    <div style={{ marginTop: 40 }}>
      <h3>Your Cart</h3>

      {cart.items.length === 0 && <p>No items.</p>}

      {cart.items.map(item => (
        <div key={item.id} style={{ display: "flex", justifyContent: "space-between", padding: 10 }}>
          <span>{item.name} × {item.qty}</span>
          <span>₹{item.price * item.qty}</span>
          <button onClick={() => onRemove(item.id)}>Remove</button>
        </div>
      ))}

      {cart.items.length > 0 && (
        <>
          <h4>Total: ₹{cart.total}</h4>
          <button onClick={onCheckout}>Checkout</button>
        </>
      )}
    </div>
  );
}

export default Cart;
