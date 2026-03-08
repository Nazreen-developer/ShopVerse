import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Checkout = ({ user }) => {
  const navigate = useNavigate();
  const API = import.meta.env.VITE_BACKEND_URL;

  const [cartItems, setCartItems] = useState([]);
  const [shippingAddress, setShippingAddress] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    phone: "",
  });

  // Get guest ID
  const getGuestId = () => {
    let guestId = localStorage.getItem("guestId");
    if (!guestId) {
      guestId = "guest_" + Date.now();
      localStorage.setItem("guestId", guestId);
    }
    return guestId;
  };

  // Fetch cart on mount or user change
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const guestId = getGuestId();
        const userId = user?._id;

        const res = await axios.get(`${API}/api/carts`, {
          params: userId ? { userId } : { guestId },
        });

        setCartItems(res.data.products || []);
      } catch (error) {
        // Handle cart not found gracefully
        if (error.response?.status === 404) {
          setCartItems([]);
        } else {
          console.error("Cart fetch error:", error.response?.data || error);
        }
      }
    };

    fetchCart();
  }, [user]);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + (item.price || 0) * (item.quantity || 1),
    0
  );
  const shipping = subtotal > 200 ? 0 : 20;
  const total = subtotal + shipping;

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      alert("Cart is empty");
      return;
    }

    try {
      const guestId = getGuestId();
      const userId = user?._id;

      const orderItems = cartItems.map((item) => ({
        productId: item.productId || item.product || item._id,
        name: item.name,
        image: item.image,
        price: item.price,
        quantity: item.quantity || 1,
        color: item.color || "",
        size: item.size || "",
      }));

      const orderData = {
        userId: userId || undefined,
        guestId: !userId ? guestId : undefined,
        orderItems,
        shippingAddress: {
          name: `${shippingAddress.firstName} ${shippingAddress.lastName}`,
          email: shippingAddress.email,
          phone: shippingAddress.phone,
          address: shippingAddress.address,
          city: shippingAddress.city,
          postalCode: shippingAddress.postalCode,
          country: shippingAddress.country,
        },
        paymentMethod: "COD",
        totalPrice: total,
      };

      const res = await axios.post(`${API}/api/orders`, orderData);
      console.log("Order created:", res.data);

      // Automatically clear cart, ignore 404
      const cartDeleteData = userId ? { userId } : { guestId };
      try {
        await axios.delete(`${API}/api/carts`, { data: cartDeleteData });
      } catch (deleteError) {
        if (deleteError.response?.status !== 404) {
          console.error("Cart delete error:", deleteError.response?.data || deleteError);
        }
      }

      navigate(`/order-confirmation/${res.data._id}`);
    } catch (error) {
      console.error("Order error:", error.response?.data || error);
      alert("Order failed. Please try again.");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* LEFT - FORM */}
      <div className="bg-white p-6 rounded-lg shadow-md space-y-6">
        <h2 className="text-2xl font-bold uppercase text-[#C19A6B]">
          Checkout
        </h2>

        <form onSubmit={handlePlaceOrder} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            required
            value={shippingAddress.email}
            onChange={(e) =>
              setShippingAddress({ ...shippingAddress, email: e.target.value })
            }
            className="w-full p-2 border rounded"
          />

          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="First Name"
              required
              value={shippingAddress.firstName}
              onChange={(e) =>
                setShippingAddress({ ...shippingAddress, firstName: e.target.value })
              }
              className="p-2 border rounded"
            />
            <input
              type="text"
              placeholder="Last Name"
              required
              value={shippingAddress.lastName}
              onChange={(e) =>
                setShippingAddress({ ...shippingAddress, lastName: e.target.value })
              }
              className="p-2 border rounded"
            />
          </div>

          <input
            type="text"
            placeholder="Address"
            required
            value={shippingAddress.address}
            onChange={(e) =>
              setShippingAddress({ ...shippingAddress, address: e.target.value })
            }
            className="w-full p-2 border rounded"
          />

          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="City"
              required
              value={shippingAddress.city}
              onChange={(e) =>
                setShippingAddress({ ...shippingAddress, city: e.target.value })
              }
              className="p-2 border rounded"
            />
            <input
              type="text"
              placeholder="Postal Code"
              required
              value={shippingAddress.postalCode}
              onChange={(e) =>
                setShippingAddress({ ...shippingAddress, postalCode: e.target.value })
              }
              className="p-2 border rounded"
            />
          </div>

          <input
            type="text"
            placeholder="Country"
            required
            value={shippingAddress.country}
            onChange={(e) =>
              setShippingAddress({ ...shippingAddress, country: e.target.value })
            }
            className="w-full p-2 border rounded"
          />
          <input
            type="tel"
            placeholder="Phone"
            required
            value={shippingAddress.phone}
            onChange={(e) =>
              setShippingAddress({ ...shippingAddress, phone: e.target.value })
            }
            className="w-full p-2 border rounded"
          />

          <button
            type="submit"
            className="w-full py-3 bg-[#C19A6B] text-white rounded font-semibold hover:opacity-90"
          >
            Place Order
          </button>
        </form>
      </div>

      {/* RIGHT - SUMMARY */}
      <div className="bg-white p-6 rounded-lg shadow-md space-y-6">
        <h2 className="text-2xl font-bold uppercase text-[#C19A6B]">
          Order Summary
        </h2>

        {cartItems.length === 0 ? (
          <p className="text-gray-500">Your cart is empty</p>
        ) : (
          cartItems.map((item, index) => (
            <div key={index} className="flex gap-4 items-center">
              <img
                src={item.image ? `${API}${item.image}` : "/placeholder.png"}
                alt={item.name}
                className="w-20 h-24 object-cover rounded"
              />
              <div className="flex-1">
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-sm text-gray-500">{item.color} | {item.size}</p>
                <p className="text-sm text-gray-500">Qty: {item.quantity || 1}</p>
                <p className="font-semibold">₹{item.price}</p>
              </div>
            </div>
          ))
        )}

        <div className="border-t pt-4 space-y-2">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>₹{subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>{shipping === 0 ? "Free" : `₹${shipping}`}</span>
          </div>
          <div className="flex justify-between text-lg font-bold">
            <span>Total</span>
            <span>₹{total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;