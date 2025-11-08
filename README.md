# Mock E-Com Cart

A full-stack shopping cart application built with React, Express, and MongoDB.
Supports product listing, searching, filtering, cart management, quantity updates, and a mock checkout flow.


## Features

### Frontend (React)

* Product grid with images, name, and price
* Add to Cart button
* Cart view with quantity update (+/–)
* Remove item
* Total price calculation
* Checkout modal (name + email)
* Toast notifications
* Search bar and price filter
* Responsive layout

### Backend (Node.js + Express + MongoDB)

* `/api/products`
* `/api/cart` (add, update, remove, get)
* `/api/checkout`
* Product seeding
* User-specific cart using email as identifier


## Project Structure

```
backend/
  src/
    server.js
    db.js
    models/
      Product.js
      CartItem.js
      User.js
    routes/
      products.js
      cart.js
      checkout.js
  .env

frontend/
  src/
    App.jsx
    api.js
    styles.css
    components/
      ProductCard.jsx
      Cart.jsx
      CheckoutModal.jsx
      Header.jsx
      PriceFilter.jsx
  public/
    img/
      (local product images if any)
```


## Local Setup

### Requirements

* Node.js
* MongoDB running locally (`mongod`)



## Backend Setup

```
cd backend
npm install
```

Create a `.env` file:

```
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/vibe_cart
```

Start the server:

```
npm run dev
```

Seed products:

```
GET http://localhost:5000/api/products/seed
```

---

## Frontend Setup

```
cd frontend
npm install
npm run dev
```

Open the Vite URL shown in the terminal.


## Usage

1. Browse products
2. Filter by search or price
3. Add items to cart
4. Update quantity or remove items
5. Checkout with name and email
6. Receipt is generated and cart is cleared


## API Endpoints

### `GET /api/products`

List products with search and price filters.

### `POST /api/cart`

Add or update an item:

```json
{ "productId": "...", "qty": 2 }
```

### `GET /api/cart`

Get cart for the current user (based on `x-user-email` header).

### `DELETE /api/cart/:productId`

Remove a cart item.

### `POST /api/checkout`

Generate receipt:

```json
{ "name": "Amitesh" }
```