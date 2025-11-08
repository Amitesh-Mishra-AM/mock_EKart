export default function Cart({ items, total, onQty, onRemove }) {
  if (!items.length) return <p>Your cart is empty.</p>;
  return (
    <div className="card">
      <h4 style={{marginTop:0}}>Cart</h4>
      {items.map(it => (
        <div key={it.productId} className="row" style={{justifyContent:'space-between', marginBottom:8}}>
          <div style={{display:'grid'}}>
            <strong>{it.name}</strong>
            <span>₹{it.price}</span>
          </div>
          <div className="row">
            <button className="btn light" onClick={() => onQty(it.productId, Math.max(1, it.qty-1))}>-</button>
            <span>{it.qty}</span>
            <button className="btn light" onClick={() => onQty(it.productId, it.qty+1)}>+</button>
            <button className="btn light" onClick={() => onRemove(it.productId)}>Remove</button>
          </div>
        </div>
      ))}
      <div className="row" style={{justifyContent:'space-between', marginTop:12}}>
        <strong>Total</strong>
        <strong>₹{total}</strong>
      </div>
    </div>
  );
}
