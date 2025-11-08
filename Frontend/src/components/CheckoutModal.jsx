import { useState } from "react";

export default function CheckoutModal({ open, onClose, onSubmit, emailDefault }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState(emailDefault || "");

  if (!open) return null;

  return (
    <div style={{
      position:'fixed', inset:0, background:'rgba(0,0,0,0.3)',
      display:'grid', placeItems:'center', padding:16
    }}>
      <div className="card" style={{maxWidth:420, width:'100%'}}>
        <h3 style={{marginTop:0}}>Checkout</h3>
        <div style={{display:'grid', gap:10}}>
          <input className="input" placeholder="Your name" value={name} onChange={e=>setName(e.target.value)} />
          <input className="input" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        </div>
        <div className="row" style={{justifyContent:'flex-end', marginTop:12}}>
          <button className="btn light" onClick={onClose}>Cancel</button>
          <button className="btn" onClick={() => onSubmit({name,email})}>Pay</button>
        </div>
      </div>
    </div>
  );
}
