# ✅ **README.md**

# Mock E-Com Cart (Full Stack Assignment)

This project is a small full-stack shopping cart application built for the Vibe Commerce recruitment assignment.
It covers basic product listing, cart management, and a mock checkout flow.
The stack uses **React**, **Node/Express**, and an in-memory cart (MongoDB can be added later).

## **Features**

### **Frontend**

* Product grid with 5–10 items
* “Add to Cart” button
* Cart view showing items, qty, and total
* Remove item from cart
* Simple checkout form (name + email)
* Receipt shown after checkout
* Responsive layout

### **Backend**

* `GET /api/products` – returns mock product list
* `POST /api/cart` – add item to cart
* `DELETE /api/cart/:id` – remove item
* `GET /api/cart` – get cart + total
* `POST /api/checkout` – returns a mock receipt

Backend uses a small in-memory cart class. No real payments.

## **Project Structure**

```
/backend
   server.js
   products.js
   cart.js
   package.json

/frontend
   src/
      App.js
      api.js
      components/
         ProductList.js
         Cart.js
         Checkout.js
   package.json

README.md
```

# ✅ **How to Run Locally**

## **1. Clone the repository**

```
git clone <repo-url>
cd mock-ecom
```

## **2. Start the Backend**

```
cd backend
npm install
npm start
```

Backend runs on:

```
http://localhost:5000
```

## **3. Start the Frontend**

```
cd ../frontend
npm install
npm start
```

Frontend runs on:

```
http://localhost:3000
```

Make sure both servers are running.

# ✅ **How the App Works**

1. The product grid loads from `/api/products`.
2. Clicking **Add to Cart** sends a POST request to `/api/cart`.
3. Cart automatically updates using `GET /api/cart`.
4. Removing an item calls `DELETE /api/cart/:id`.
5. On checkout, the frontend sends name, email, and cart items to `/api/checkout`.
6. The backend returns a simple receipt object:

   * customer name
   * email
   * items
   * total
   * timestamp

# ✅ **API Endpoints**

### **GET /api/products**

Returns product list.

### **GET /api/cart**

Returns cart items + total.

### **POST /api/cart**

```
{
  "productId": "p2",
  "qty": 1
}
```

### **DELETE /api/cart/:id**

Removes an item.

### **POST /api/checkout**

```
{
  "cartItems": [...],
  "name": "test",
  "email": "test@example.com"
}
```