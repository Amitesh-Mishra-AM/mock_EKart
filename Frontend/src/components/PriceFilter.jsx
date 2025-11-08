import { useState } from "react";

export default function PriceFilter({ onApply }) {
  const [q, setQ] = useState("");
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");

  return (
    <div className="toolbar">
      <input className="input" placeholder="Search products..." value={q} onChange={e=>setQ(e.target.value)} />
      <input className="input" placeholder="Min price" value={min} onChange={e=>setMin(e.target.value)} />
      <input className="input" placeholder="Max price" value={max} onChange={e=>setMax(e.target.value)} />
      <button className="btn light" onClick={() => onApply({ q, min, max })}>Apply</button>
    </div>
  );
}
