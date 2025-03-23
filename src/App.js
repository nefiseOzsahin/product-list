import { use, useState } from "react";

const data = [
  {
    id: 1,
    image: {
      thumbnail: "./assets/images/image-waffle-thumbnail.jpg",
      mobile: "./assets/images/image-waffle-mobile.jpg",
      tablet: "./assets/images/image-waffle-tablet.jpg",
      desktop: "./assets/images/image-waffle-desktop.jpg",
    },
    name: "Waffle with Berries",
    category: "Waffle",
    price: 6.5,
  },
  {
    id: 2,
    image: {
      thumbnail: "./assets/images/image-creme-brulee-thumbnail.jpg",
      mobile: "./assets/images/image-creme-brulee-mobile.jpg",
      tablet: "./assets/images/image-creme-brulee-tablet.jpg",
      desktop: "./assets/images/image-creme-brulee-desktop.jpg",
    },
    name: "Vanilla Bean Crème Brûlée",
    category: "Crème Brûlée",
    price: 7.0,
  },
  {
    id: 3,
    image: {
      thumbnail: "./assets/images/image-macaron-thumbnail.jpg",
      mobile: "./assets/images/image-macaron-mobile.jpg",
      tablet: "./assets/images/image-macaron-tablet.jpg",
      desktop: "./assets/images/image-macaron-desktop.jpg",
    },
    name: "Macaron Mix of Five",
    category: "Macaron",
    price: 8.0,
  },
  {
    id: 4,
    image: {
      thumbnail: "./assets/images/image-tiramisu-thumbnail.jpg",
      mobile: "./assets/images/image-tiramisu-mobile.jpg",
      tablet: "./assets/images/image-tiramisu-tablet.jpg",
      desktop: "./assets/images/image-tiramisu-desktop.jpg",
    },
    name: "Classic Tiramisu",
    category: "Tiramisu",
    price: 5.5,
  },
  {
    id: 5,
    image: {
      thumbnail: "./assets/images/image-baklava-thumbnail.jpg",
      mobile: "./assets/images/image-baklava-mobile.jpg",
      tablet: "./assets/images/image-baklava-tablet.jpg",
      desktop: "./assets/images/image-baklava-desktop.jpg",
    },
    name: "Pistachio Baklava",
    category: "Baklava",
    price: 4.0,
  },
  {
    id: 6,
    image: {
      thumbnail: "./assets/images/image-meringue-thumbnail.jpg",
      mobile: "./assets/images/image-meringue-mobile.jpg",
      tablet: "./assets/images/image-meringue-tablet.jpg",
      desktop: "./assets/images/image-meringue-desktop.jpg",
    },
    name: "Lemon Meringue Pie",
    category: "Pie",
    price: 5.0,
  },
  {
    id: 7,
    image: {
      thumbnail: "./assets/images/image-cake-thumbnail.jpg",
      mobile: "./assets/images/image-cake-mobile.jpg",
      tablet: "./assets/images/image-cake-tablet.jpg",
      desktop: "./assets/images/image-cake-desktop.jpg",
    },
    name: "Red Velvet Cake",
    category: "Cake",
    price: 4.5,
  },
  {
    id: 8,
    image: {
      thumbnail: "./assets/images/image-brownie-thumbnail.jpg",
      mobile: "./assets/images/image-brownie-mobile.jpg",
      tablet: "./assets/images/image-brownie-tablet.jpg",
      desktop: "./assets/images/image-brownie-desktop.jpg",
    },
    name: "Salted Caramel Brownie",
    category: "Brownie",
    price: 4.5,
  },
  {
    id: 9,
    image: {
      thumbnail: "./assets/images/image-panna-cotta-thumbnail.jpg",
      mobile: "./assets/images/image-panna-cotta-mobile.jpg",
      tablet: "./assets/images/image-panna-cotta-tablet.jpg",
      desktop: "./assets/images/image-panna-cotta-desktop.jpg",
    },
    name: "Vanilla Panna Cotta",
    category: "Panna Cotta",
    price: 6.5,
  },
];

export default function App() {
  const [cart, setCart] = useState([]);

  return (
    <div>
      <div className="main-container">
        <div className="main-desert-container">
          <h1 className="main-header">Desserts</h1>
          <div className="desert-container">
            {data.map((desert) => (
              <Desert desert={desert} key={desert.id} setCart={setCart} />
            ))}
          </div>
        </div>
        <div className="order-container">
          <h2 className="empty-order-header">Your Cart({cart.length})</h2>
          {cart.length === 0 ? (
            <>
              <img
                src="/assets/images/illustration-empty-cart.svg"
                alt="empty order image"
              ></img>

              <p className="order-empty-message">
                Your added items will appear here
              </p>
            </>
          ) : (
            <>
              <div>
                <Cart cart={cart} />
              </div>
              <div className="carbon-container">
                <img
                  className="carbon"
                  src="/assets/images/icon-carbon-neutral.svg"
                  alt="carbon neutral icon"
                ></img>
                <p>
                  This is a <span className="carbon-text">carbon-neutral</span>{" "}
                  delivery
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function Desert({ desert, setCart }) {
  const [showOrder, setShowOrder] = useState(false);
  const [selectedDesert, setSelectedDesert] = useState(null);
  const [quantity, setQuantity] = useState(0);

  function handleDecrement() {
    if (quantity === 0) return;
    setQuantity((prev) => Math.max(prev - 1, 0));
    setCart((prev) => {
      const index = prev.findIndex((item) => item.id === selectedDesert.id);
      if (index !== -1) {
        const newCart = [...prev];
        newCart.splice(index, 1); //belirtilen index konumundaki 1 öğeyi siliyor.
        return newCart;
      }
      return prev;
    });
  }

  function handleIncrement() {
    setQuantity((prev) => prev + 1);
    setCart((prev) => [...prev, selectedDesert]);
  }
  return (
    <div className="desert">
      <div className="desert-head">
        <img src={desert.image.desktop} alt={desert.title} />
        {!showOrder ? (
          <div
            className="addButton"
            onMouseEnter={() => {
              setShowOrder(true);
              setSelectedDesert(desert);
            }}
          >
            <div>
              <img
                src="/assets/images/icon-add-to-cart.svg"
                alt="icon add to cart"
              ></img>
            </div>
            <div>Add to Cart</div>
          </div>
        ) : (
          <div
            className="order"
            onMouseLeave={() => {
              setShowOrder(false);
              setSelectedDesert(null);
            }}
          >
            <div className="circle" onClick={handleDecrement}>
              <img
                src="/assets/images/icon-decrement-quantity.svg"
                alt="decrement icon"
              ></img>
            </div>
            <div className="quantity">{quantity}</div>
            <div className="circle" onClick={handleIncrement}>
              <img
                src="/assets/images/icon-increment-quantity.svg"
                alt="decrement icon"
              ></img>
            </div>
          </div>
        )}
      </div>
      <p className="category">{desert.category}</p>
      <p className="desert-name">{desert.name}</p>
      <p className="price">${desert.price.toFixed(2)}</p>
    </div>
  );
}

function Cart({ cart }) {
  const groupedCart = cart.reduce((acc, item) => {
    const existingItem = acc.find((el) => el.name === item.name);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      acc.push({ ...item, quantity: 1 });
    }
    return acc;
  }, []);

  return (
    <div>
      {groupedCart.map((item) => (
        <p key={item.name}>
          {item.quantity}x {item.name} ${item.price * item.quantity}
        </p>
      ))}
    </div>
  );
}
