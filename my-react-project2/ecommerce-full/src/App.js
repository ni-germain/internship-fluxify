import React, { useState } from "react";

const App = () => {
const [products, setProducts] = useState([
  {
    id: 1,
    name: "Phone",
    price: 250,
    stock: 12,
    rating: 4.5,
    brand: "TechBrand",
    image: "https://images.unsplash.com/photo-1603899121685-c0e5f5fdf5a8", // smartphone
    description: "A powerful smartphone with 128GB storage."
  },
  {
    id: 2,
    name: "Headphones",
    price: 75,
    stock: 20,
    rating: 4.2,
    brand: "SoundPro",
    image: "https://images.unsplash.com/photo-1580894908360-0405b6d8f69d", // headphones
    description: "High-quality over-ear headphones."
  },
  {
    id: 3,
    name: "Laptop",
    price: 850,
    stock: 5,
    rating: 4.8,
    brand: "CompuMax",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8", // laptop
    description: "14-inch ultra-slim laptop."
  },
  {
    id: 4,
    name: "Smartwatch",
    price: 120,
    stock: 18,
    rating: 4.0,
    brand: "WatchIt",
    image: "https://images.unsplash.com/photo-1603302576837-37561efbcc81", // smartwatch
    description: "Fitness tracking smartwatch."
  },
  {
    id: 5,
    name: "Tablet",
    price: 300,
    stock: 10,
    rating: 4.3,
    brand: "TabLite",
    image: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04", // tablet
    description: "10-inch HD tablet with stylus."
  },
  {
    id: 6,
    name: "Camera",
    price: 500,
    stock: 7,
    rating: 4.6,
    brand: "PhotoZoom",
    image: "https://images.unsplash.com/photo-1519183071298-a2962be96fdf", // DSLR camera
    description: "DSLR camera with zoom lens."
  },
  {
    id: 7,
    name: "Gaming Mouse",
    price: 45,
    stock: 30,
    rating: 4.1,
    brand: "GamerEdge",
    image: "https://images.unsplash.com/photo-1612553835228-cfbc2e8c3a3f", // gaming mouse
    description: "RGB wired gaming mouse."
  },
  {
    id: 8,
    name: "Bluetooth Speaker",
    price: 60,
    stock: 15,
    rating: 4.4,
    brand: "SoundBlast",
    image: "https://images.unsplash.com/photo-1585386959984-a4155226c3b7", // speaker
    description: "Portable waterproof Bluetooth speaker."
  },
  {
    id: 9,
    name: "Keyboard",
    price: 35,
    stock: 22,
    rating: 3.9,
    brand: "KeyPro",
    image: "https://images.unsplash.com/photo-1611186871348-b2b3b56f6d12", // mechanical keyboard
    description: "Backlit mechanical keyboard."
  },
  {
    id: 10,
    name: "Drone",
    price: 950,
    stock: 3,
    rating: 4.9,
    brand: "FlyTech",
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794", // drone
    description: "4K camera drone with remote."
  }
]);

   
  // (rest of your unchanged code continues here…)


  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [view, setView] = useState("grid"); // grid, list, details, cart, wishlist, checkout, addproduct
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [discountCode, setDiscountCode] = useState("");
  const [discountApplied, setDiscountApplied] = useState(false);

  // Filtering products by search
  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Add to cart
  const addToCart = product => {
    if (product.stock <= 0) {
      alert("Sorry, this product is out of stock.");
      return;
    }
    setCart([...cart, product]);
    alert(`${product.name} added to cart!`);
  };

  // Add to wishlist
  const addToWishlist = product => {
    if (wishlist.find(p => p.id === product.id)) {
      alert("Already in wishlist!");
      return;
    }
    setWishlist([...wishlist, product]);
    alert(`${product.name} added to wishlist!`);
  };

  // Remove from cart
  const removeFromCart = index => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  // Remove from wishlist
  const removeFromWishlist = index => {
    const newWishlist = [...wishlist];
    newWishlist.splice(index, 1);
    setWishlist(newWishlist);
  };

  // Calculate total price of cart (apply 10% discount if applied)
  const cartTotal = cart.reduce((sum, p) => sum + p.price, 0);
  const totalWithDiscount = discountApplied ? (cartTotal * 0.9).toFixed(2) : cartTotal.toFixed(2);

  // Handle discount code
  const applyDiscount = () => {
    if (discountCode === "SAVE10") {
      setDiscountApplied(true);
      alert("Discount code applied! 10% off.");
    } else {
      alert("Invalid discount code.");
    }
  };

  // Add product form submit
  const handleAddProduct = e => {
    e.preventDefault();
    const form = e.target;
    const newProduct = {
      id: products.length + 1,
      name: form.name.value,
      price: parseFloat(form.price.value),
      stock: parseInt(form.stock.value),
      rating: 4.0,
      brand: form.brand.value,
      image: form.image.value || "https://via.placeholder.com/150",
      description: form.description.value
    };
    setProducts([...products, newProduct]);
    alert("Product added!");
    form.reset();
    setView("grid");
  };

  // Responsive card/list styles inline
  const productCardStyle = {
    border: "1px solid #ccc",
    borderRadius: "10px",
    padding: "10px",
    backgroundColor: "white",
    width: view === "grid" ? "22%" : "100%",
    boxSizing: "border-box",
    cursor: "pointer",
    marginBottom: view === "list" ? "10px" : "0"
  };

  return (
    <div style={{ backgroundColor: "#ec21e146", minHeight: "100vh", padding: "15px", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>🛒  E-commerce Product Catalog</h1>

      {/* Navigation Buttons */}
      <div style={{ marginBottom: "15px", textAlign: "center" }}>
        <button onClick={() => { setView("grid"); setSelectedProduct(null); }} style={{ marginRight: 10 }}>Home</button>
        <button onClick={() => { setView("cart"); setSelectedProduct(null); }} style={{ marginRight: 10 }}>Cart ({cart.length})</button>
        <button onClick={() => { setView("wishlist"); setSelectedProduct(null); }} style={{ marginRight: 10 }}>Wishlist ({wishlist.length})</button>
        <button onClick={() => setView(view === "grid" ? "list" : "grid")}>Toggle {view === "grid" ? "List" : "Grid"} View</button>
        <button onClick={() => setView("addproduct")} style={{ marginLeft: 20 }}>+ Add Product</button>
      </div>

      {/* Search */}
      <div style={{ marginBottom: "20px", textAlign: "center" }}>
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          style={{ width: "80%", padding: "10px", borderRadius: "5px", border: "1px solid #999" }}
        />
      </div>

      {/* MAIN CONTENT AREA */}
      {view === "grid" || view === "list" ? (
        <div style={{
          display: view === "grid" ? "flex" : "block",
          flexWrap: "wrap",
          justifyContent: "space-between",
          gap: "15px"
        }}>
          {filteredProducts.length === 0 && <p>No products found.</p>}
          {filteredProducts.map(product => (
            <div
              key={product.id}
              style={productCardStyle}
              onClick={() => { setSelectedProduct(product); setView("details"); }}
            >
              <img src={product.image} alt={product.name} style={{ width: "100%", borderRadius: "10px" }} />
              <h3>{product.name}</h3>
              <p>${product.price.toFixed(2)}</p>
              <p>Stock: {product.stock}</p>
              <p>Rating: {"⭐".repeat(Math.round(product.rating))} ({product.rating.toFixed(1)})</p>
            </div>
          ))}
        </div>
      ) : null}

      {/* PRODUCT DETAILS VIEW */}
      {view === "details" && selectedProduct && (
        <div style={{ backgroundColor: "white", padding: "20px", borderRadius: "10px", maxWidth: "600px", margin: "auto" }}>
          <button onClick={() => setView("grid")} style={{ marginBottom: 15 }}>⬅ Back to products</button>
          <h2>{selectedProduct.name}</h2>
          <img src={selectedProduct.image} alt={selectedProduct.name} style={{ width: "100%", maxWidth: "300px", borderRadius: "10px" }} />
          <p>{selectedProduct.description}</p>
          <p><strong>Price:</strong> ${selectedProduct.price.toFixed(2)}</p>
          <p><strong>Brand:</strong> {selectedProduct.brand}</p>
          <p><strong>Stock:</strong> {selectedProduct.stock}</p>
          <p><strong>Rating:</strong> {"⭐".repeat(Math.round(selectedProduct.rating))} ({selectedProduct.rating.toFixed(1)})</p>

          <button onClick={() => addToCart(selectedProduct)} style={{ marginRight: 10 }}>Add to Cart</button>
          <button onClick={() => addToWishlist(selectedProduct)}>Add to Wishlist</button>

          <h3>Reviews</h3>
          <p>⭐⭐⭐⭐ - Very good product!</p>
          <p>⭐⭐⭐ - Good value for price.</p>
        </div>
      )}

      {/* CART VIEW */}
      {view === "cart" && (
        <div style={{ maxWidth: "600px", margin: "auto", background: "white", padding: "20px", borderRadius: "10px" }}>
          <button onClick={() => setView("grid")} style={{ marginBottom: 15 }}>⬅ Back to products</button>
          <h2>Your Cart</h2>
          {cart.length === 0 ? <p>Your cart is empty.</p> : (
            <ul>
              {cart.map((item, idx) => (
                <li key={idx} style={{ marginBottom: "10px" }}>
                  {item.name} - ${item.price.toFixed(2)} &nbsp;
                  <button onClick={() => removeFromCart(idx)} style={{ color: "red" }}>Remove</button>
                </li>
              ))}
            </ul>
          )}
          {cart.length > 0 && (
            <>
              <p><strong>Total:</strong> ${totalWithDiscount}</p>
              {!discountApplied && (
                <>
                  <input
                    type="text"
                    placeholder="Discount code"
                    value={discountCode}
                    onChange={e => setDiscountCode(e.target.value)}
                    style={{ padding: "5px" }}
                  />
                  <button onClick={applyDiscount} style={{ marginLeft: "5px" }}>Apply</button>
                </>
              )}
              <button
                onClick={() => { alert("Mock payment successful! Thank you for your purchase."); setCart([]); setView("grid"); }}
                style={{ marginTop: 15 }}
              >
                Checkout
              </button>
            </>
          )}
        </div>
      )}

      {/* WISHLIST VIEW */}
      {view === "wishlist" && (
        <div style={{ maxWidth: "600px", margin: "auto", background: "white", padding: "20px", borderRadius: "10px" }}>
          <button onClick={() => setView("grid")} style={{ marginBottom: 15 }}>⬅ Back to products</button>
          <h2>Your Wishlist</h2>
          {wishlist.length === 0 ? <p>No items in wishlist.</p> : (
            <ul>
              {wishlist.map((item, idx) => (
                <li key={idx} style={{ marginBottom: "10px" }}>
                  {item.name} &nbsp;
                  <button onClick={() => removeFromWishlist(idx)} style={{ color: "red" }}>Remove</button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* ADD PRODUCT VIEW */}
      {view === "addproduct" && (
        <div style={{ maxWidth: "600px", margin: "auto", background: "white", padding: "20px", borderRadius: "10px" }}>
          <button onClick={() => setView("grid")} style={{ marginBottom: 15 }}>⬅ Back to products</button>
          <h2>Add New Product</h2>
          <form onSubmit={handleAddProduct}>
            <input name="name" placeholder="Name" required style={{ width: "100%", marginBottom: "10px", padding: "8px" }} />
            <input name="price" type="number" placeholder="Price" required min="0" step="0.01" style={{ width: "100%", marginBottom: "10px", padding: "8px" }} />
            <input name="stock" type="number" placeholder="Stock Quantity" required min="0" style={{ width: "100%", marginBottom: "10px", padding: "8px" }} />
            <input name="brand" placeholder="Brand" required style={{ width: "100%", marginBottom: "10px", padding: "8px" }} />
            <input name="image" placeholder="Image URL (optional)" style={{ width: "100%", marginBottom: "10px", padding: "8px" }} />
            <textarea name="description" placeholder="Description" required style={{ width: "100%", marginBottom: "10px", padding: "8px" }} />
            <button type="submit" style={{ padding: "10px 15px" }}>Add Product</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default App;
