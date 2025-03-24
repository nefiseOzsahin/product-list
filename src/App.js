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
    isOpen: false,
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
    isOpen: false,
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
    isOpen: false,
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
    isOpen: false,
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
    isOpen: false,
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
    isOpen: false,
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
    isOpen: false,
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
    isOpen: false,
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
    isOpen: false,
  },
];

export default function App() {
  const [cart, setCart] = useState([]);
  const [quantities, setQuantities] = useState({}); // Tatlıların miktarları
  const [desserts, setDesserts] = useState(data);

  function handleIncrement(dessert) {
    setQuantities((prev) => ({
      ...prev,
      [dessert.id]: (prev[dessert.id] || 0) + 1,
    }));

    setCart((prev) => [...prev, dessert]); // Sepete ekleme

    setDesserts(
      desserts.map((prev) =>
        prev.id === dessert.id ? { ...prev, isOpen: true } : prev
      )
    );
  }

  function handleDecrement(dessert) {
    //if (quantity === 0) return;
    if (!quantities[dessert.id] || quantities[dessert.id] === 0) return;
    //setQuantity((prev) => Math.max(prev - 1, 0));
    setQuantities((prev) => ({
      ...prev,
      [dessert.id]: Math.max(prev[dessert.id] - 1, 0),
    }));
    setCart((prev) => {
      const index = prev.findIndex((item) => item.id === dessert.id);
      if (index !== -1) {
        const newCart = [...prev];
        newCart.splice(index, 1); //belirtilen index konumundaki 1 öğeyi siliyor.
        return newCart;
      }
      return prev;
    });

    if (!quantities[dessert.id]) {
      setDesserts(
        desserts.map((prev) =>
          prev.id === dessert.id ? { ...prev, isOpen: false } : prev
        )
      );
    }
  }

  return (
    <div>
      <div className="main-container">
        <div className="main-desert-container">
          <h1 className="main-header">Desserts</h1>
          <div className="desert-container">
            {desserts.map((desert) => (
              <Desert
                desert={desert}
                key={desert.id}
                setCart={setCart}
                quantities={quantities}
                handleDecrement={handleDecrement}
                handleIncrement={handleIncrement}
                setDesserts={setDesserts}
              />
            ))}
          </div>
        </div>
        <div className="order-container">
          <h2 className="empty-order-header">Your Cart({cart.length})</h2>
          {cart.length === 0 ? (
            <>
              <img
                className="empty-img"
                src="/assets/images/illustration-empty-cart.svg"
                alt="empty order"
              ></img>

              <p className="order-empty-message">
                Your added items will appear here
              </p>
            </>
          ) : (
            <>
              <div>
                <Cart
                  cart={cart}
                  setCart={setCart}
                  setQuantities={setQuantities}
                  quantities={quantities}
                  setDesserts={setDesserts}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function Desert({
  desert,
  quantities,
  handleDecrement,
  handleIncrement,
  setDesserts,
}) {
  const [showOrder, setShowOrder] = useState(false);
  const [showBorder, setShowBorder] = useState(false);

  function handleOpen() {
    setDesserts((prevDesserts) =>
      prevDesserts.map((prev) =>
        prev.id === desert.id ? { ...prev, isOpen: true } : prev
      )
    );
  }

  function handleClose() {
    if (!quantities[desert.id]) {
      setDesserts((prevDesserts) =>
        prevDesserts.map((prev) =>
          prev.id === desert.id ? { ...prev, isOpen: false } : prev
        )
      );
    }
  }

  return (
    <div className="desert">
      <div className="desert-head">
        <img
          src={desert.image.desktop}
          alt={desert.title}
          className={showBorder ? "dessert-image" : ""}
        />

        {!desert.isOpen ? (
          <div
            className="addButton"
            onMouseEnter={() => {
              setShowOrder(handleOpen);
              setShowBorder(true);
              //setSelectedDesert(desert);
            }}
            onMouseLeave={() => setShowBorder(false)}
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
            onMouseEnter={() => setShowBorder(true)}
            onMouseLeave={() => {
              setShowOrder(handleClose);
              setShowBorder(false);
            }}
          >
            <div className="circle" onClick={() => handleDecrement(desert)}>
              <img
                src="/assets/images/icon-decrement-quantity.svg"
                alt="decrement icon"
              ></img>
            </div>
            <div className="quantity">{quantities[desert.id] || 0}</div>
            <div className="circle" onClick={() => handleIncrement(desert)}>
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

function Cart({ cart, setCart, setQuantities, setDesserts }) {
  const [isOrdered, setIsOrdered] = useState(false);
  const totalPrice = cart.reduce((acc, item) => acc + item.price, 0);
  const groupedCart = cart.reduce((acc, item) => {
    const existingItem = acc.find((el) => el.name === item.name);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      acc.push({ ...item, quantity: 1 });
    }
    return acc;
  }, []);

  function cancel(cancelItem) {
    setCart((prev) => prev.filter((dessert) => dessert.id !== cancelItem.id));
    setQuantities((prev) => ({
      ...prev,
      [cancelItem.id]: 0,
    }));
    handleClose(cancelItem);
  }

  function handleClose(desert) {
    setDesserts((prevDesserts) =>
      prevDesserts.map((prev) =>
        prev.id === desert.id ? { ...prev, isOpen: false } : prev
      )
    );
  }

  function handleOrder() {
    setIsOrdered(true);
  }

  function handleNewOrder() {
    setDesserts((prev) =>
      prev.map((dessert) => ({
        ...dessert,
        isOpen: false,
      }))
    );
    setCart([]);
    setQuantities({});
  }

  return (
    <div>
      <Order
        groupedCart={groupedCart}
        cancel={cancel}
        totalPrice={totalPrice}
      />
      <div className="order-button" onClick={handleOrder}>
        Confirm Order
      </div>
      {isOrdered && (
        <div className="modal-overlay">
          <div className="modal-content">
            <img
              className="confirm"
              src="/assets/images/icon-order-confirmed.svg"
              alt="confirm icon"
            ></img>

            <div className="order-confirm-container">
              <h1>Order Confirmed</h1>
              <p className="wish">We hope you enjoy your food!</p>
              <OrderSummary groupedCart={groupedCart} totalPrice={totalPrice} />
              <div className="order-button" onClick={handleNewOrder}>
                Start New Order
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Order({ groupedCart, cancel, totalPrice }) {
  return (
    <div>
      <div>
        {groupedCart.map((item) => (
          <div className="order-item" key={item.id}>
            <div>
              <h4>{item.name}</h4>
              <div key={item.name} className="order-detail">
                <div className="summary-quantity"> {item.quantity}x </div>
                <div className="summary-price">@${item.price.toFixed(2)}</div>
                <div className="confirm-total-price">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            </div>
            <div className="close" onClick={() => cancel(item)}>
              x
            </div>
          </div>
        ))}
        <div className="total">
          <div>Order Total</div>
          <div className="total-price">${totalPrice.toFixed(2)}</div>
        </div>
      </div>
    </div>
  );
}

function OrderSummary({ groupedCart, totalPrice }) {
  return (
    <div>
      <div className="order-summary-styled">
        {groupedCart.map((item) => (
          <div className="order-item-summary" key={item.id}>
            <div>
              <img
                src={item.image.thumbnail}
                alt={item.name}
                className="order-summary-img"
              />
            </div>
            <div>
              <h4>{item.name}</h4>
              <div key={item.name} className="order-detail">
                <div className="summary-quantity"> {item.quantity}x </div>
                <div className="summary-price">@${item.price.toFixed(2)}</div>
              </div>
            </div>

            <div className="summary-total-price">
              ${(item.price * item.quantity).toFixed(2)}
            </div>
          </div>
        ))}
        <div className="total">
          <div>Order Total</div>
          <div className="total-price">${totalPrice.toFixed(2)}</div>
        </div>
      </div>
    </div>
  );
}
