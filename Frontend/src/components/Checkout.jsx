import React, { useState } from "react";

function Checkout({ onSubmit, onClose }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const submit = () => {
    if (!name || !email) return;
    onSubmit(name, email);
  };

  return (
    <div style={{ background: "#fff", padding: 20, border: "1px solid #ccc", marginTop: 20 }}>
      <h3>Checkout</h3>

      <input
        placeholder="Name"
        value={name}
        onChange={e => setName(e.target.value)}
        style={{ width: "100%", marginBottom: 10 }}
      />

      <input
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        style={{ width: "100%", marginBottom: 10 }}
      />

      <button onClick={submit}>Submit</button>
      <button onClick={onClose} style={{ marginLeft: 10 }}>Close</button>
    </div>
  );
}

export default Checkout;
