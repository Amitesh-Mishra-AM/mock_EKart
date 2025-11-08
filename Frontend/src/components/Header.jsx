export default function Header({ cartCount, onCheckout }) {
  return (
    <header style={{borderBottom:'1px solid #eee', padding:'12px 0', background:'#fff'}}>
      <div className="container row" style={{justifyContent:'space-between'}}>
        <h3 style={{margin:0}}>Vibe Cart</h3>
        <div className="row">
          <span className="badge">Cart: {cartCount}</span>
          <button className="btn light" onClick={onCheckout}>Checkout</button>
        </div>
      </div>
    </header>
  );
}
