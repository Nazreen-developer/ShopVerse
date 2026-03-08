import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CartContents from "../Cart/CartContents";

const API = import.meta.env.VITE_BACKEND_URL;

const CartDrawer = ({ drawerOpen, toggleCartDrawer, user }) => {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);

  const getGuestId = () => {
    let guestId = localStorage.getItem("guestId");
    if (!guestId) {
      guestId = "guest_" + Date.now();
      localStorage.setItem("guestId", guestId);
    }
    return guestId;
  };

  const fetchCart = async () => {
    try {
      const guestId = getGuestId();
      const userId = user?._id;

      const res = await axios.get(`${API}/api/carts`, {
        params: userId ? { userId } : { guestId },
      });

      setCartItems(res.data.products || []);
      setTotal(res.data.totalPrice || 0);
    } catch (error) {
      // Handle cart not found gracefully
      if (error.response?.status === 404) {
        setCartItems([]);
        setTotal(0);
      } else {
        console.error("Cart fetch error:", error.response?.data || error);
      }
    }
  };

  const removeItem = async (item) => {
    try {
      const guestId = getGuestId();
      const userId = user?._id;

      await axios.delete(`${API}/api/carts`, {
        data: userId
          ? { userId, productId: item.productId, size: item.size, color: item.color }
          : { guestId, productId: item.productId, size: item.size, color: item.color },
      });

      fetchCart();
      window.dispatchEvent(new Event("cartUpdated"));
    } catch (error) {
      // Handle cart not found gracefully
      if (error.response?.status !== 404) {
        console.error("Remove item error:", error.response?.data || error);
      }
    }
  };

  useEffect(() => {
    fetchCart();
    window.addEventListener("cartUpdated", fetchCart);
    return () => window.removeEventListener("cartUpdated", fetchCart);
  }, [user]);

  const handleCheckout = () => {
    toggleCartDrawer();
    navigate("/checkout");
  };

  return (
    <>
      {drawerOpen && (
        <div
          onClick={toggleCartDrawer}
          className="fixed inset-0 bg-black/40 z-40"
        />
      )}

      <div
        className={`fixed top-0 right-0 h-full
          w-3/4 sm:w-1/2 md:w-[28rem]
          bg-[#F8F5F0] shadow-2xl z-50
          flex flex-col
          transform transition-transform duration-300
          ${drawerOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex justify-between items-center p-5 border-b">
          <h2 className="text-xl font-semibold">Your Cart</h2>
          <button onClick={toggleCartDrawer}>
            <IoMdClose size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5">
          <CartContents cartItems={cartItems} removeItem={removeItem} />
        </div>

        <div className="p-5 border-t bg-white">
          <div className="flex justify-between mb-4 text-lg font-semibold">
            <span>Total</span>
            <span>₹{total.toFixed(2)}</span>
          </div>

          <button
            onClick={handleCheckout}
            className="w-full py-3 rounded-md text-white
              bg-gradient-to-r from-[#C19A6B] to-[#A47149]"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </>
  );
};

export default CartDrawer;