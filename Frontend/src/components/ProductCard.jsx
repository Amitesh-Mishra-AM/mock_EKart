export default function ProductCard({ p, onAdd }) {
  return (
    <div className="card">
      <div style={{height:140, background:'#f8f8f8', borderRadius:8, marginBottom:10, display:'grid', placeItems:'center'}}>
        <span style={{opacity:.6}}>{p.name.slice(0,1)}</span>
      </div>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <div>
          <div style={{fontWeight:600}}>{p.name}</div>
          <div>₹{p.price}</div>
        </div>
        <button className="btn" onClick={() => onAdd(p)}>Add</button>
      </div>
    </div>
  );
}
