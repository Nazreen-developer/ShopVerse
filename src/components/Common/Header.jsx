import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, X } from "lucide-react";
import { TbBrandMeta } from "react-icons/tb";
import { IoLogoInstagram } from "react-icons/io";
import { RiTwitterXLine } from "react-icons/ri";
import { FiPhone } from "react-icons/fi";
import { HiOutlineUser, HiOutlineSearch } from "react-icons/hi";
import CartDrawer from "../Layout/CartDrawer";
import axios from "../../utils/axios";

const Header = () => {
  const navigate = useNavigate();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [cartItems, setCartItems] = useState([]);

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  // =========================
  // CART DRAWER
  // =========================
  const toggleCartDrawer = () => {
    setDrawerOpen((prev) => !prev);
  };

  // =========================
  // SEARCH
  // =========================
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    navigate(`/collections/search?q=${query}`);
    setSearchOpen(false);
    setQuery("");
  };

  // =========================
  // NAV LINKS
  // =========================
  const navLinks = [
    "Men",
    "Women",
    "Kids",
    "Beauty",
    "Furnitures",
    "Sports",
    "Home Utilities",
  ];

  // =========================
  // GET GUEST ID
  // =========================
  const getGuestId = () => {
    let guestId = localStorage.getItem("guestId");

    if (!guestId) {
      guestId = "guest_" + Date.now();
      localStorage.setItem("guestId", guestId);
    }

    return guestId;
  };

  // =========================
  // FETCH CART
  // =========================
  const fetchCart = async () => {
    try {
      const guestId = getGuestId();

      const { data } = await axios.get("/carts", {
        params: { guestId },
      });

      if (data?.products) {
        setCartItems(data.products);
      } else {
        setCartItems([]);
      }
    } catch (error) {
      console.log("Cart fetch error:", error);
      setCartItems([]);
    }
  };

  useEffect(() => {
    fetchCart();

    // Listen for cart updates
    const updateCart = () => fetchCart();

    window.addEventListener("cartUpdated", updateCart);

    return () => {
      window.removeEventListener("cartUpdated", updateCart);
    };
  }, []);

  // =========================
  // PRICE CALCULATION
  // =========================
  const subtotal = cartItems.reduce(
    (acc, item) => acc + (item.price || 0) * (item.quantity || 1),
    0
  );

  const shipping = subtotal > 2000 ? 0 : 100;
  const tax = subtotal * 0.05;
  const total = subtotal + shipping + tax;

  const cartCount = cartItems.reduce(
    (acc, item) => acc + (item.quantity || 1),
    0
  );

  // =========================
  // CHECKOUT
  // =========================
  const handleCheckout = () => {
    navigate("/checkout");
  };

  return (
    <>
      {/* ================= FIXED HEADER ================= */}
      <div className="fixed top-0 left-0 w-full z-50">

        {/* ================= TOPBAR ================= */}
        <div
          className="text-white shadow-md"
          style={{
            background: "linear-gradient(90deg, #C19A6B 0%, #A47149 100%)",
          }}
        >
          <div className="max-w-7xl mx-auto px-8 py-3 flex items-center justify-between">

            <div className="flex items-center gap-6 text-xl">
              <a href="#" className="hover:scale-110 transition">
                <TbBrandMeta />
              </a>
              <a href="#" className="hover:scale-110 transition">
                <IoLogoInstagram />
              </a>
              <a href="#" className="hover:scale-110 transition">
                <RiTwitterXLine />
              </a>
            </div>

            <div className="hidden md:block text-sm font-semibold">
              🚚 We ship worldwide – Fast & Reliable Shipping!
            </div>

            <div className="flex items-center gap-2 text-sm font-semibold">
              <FiPhone />
              +91 98765 43210
            </div>

          </div>
        </div>

        {/* ================= NAVBAR ================= */}
        <div className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">

            <Link
              to="/"
              className="text-2xl font-bold tracking-wide text-gray-900 hover:text-pink-500 transition"
            >
              ShopVerse
            </Link>

            {/* NAV LINKS */}
            <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-gray-700">
              {navLinks.map((item, index) => (
                <Link
                  key={index}
                  to={`/collections/${item.toLowerCase()}`}
                  className="relative group"
                >
                  {item}
                  <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-pink-500 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              ))}
            </div>

            {/* ICONS */}
            <div className="flex items-center gap-6 text-xl text-gray-700">

              {/* SEARCH */}
              <button
                onClick={() => setSearchOpen((prev) => !prev)}
                className="hover:text-pink-500 transition"
              >
                <HiOutlineSearch />
              </button>

              {/* USER */}
              <Link to="/login" className="hover:text-pink-500 transition">
                <HiOutlineUser />
              </Link>

              {/* CART */}
              <div className="relative">
                <button
                  onClick={toggleCartDrawer}
                  className="hover:text-pink-500 transition"
                >
                  <ShoppingCart size={26} />
                </button>

                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    {cartCount}
                  </span>
                )}
              </div>

            </div>

          </div>
        </div>

        {/* ================= SEARCH BAR ================= */}
        {searchOpen && (
          <div className="bg-gray-100 border-t border-gray-200 py-6">
            <div className="max-w-5xl mx-auto px-6">

              <form
                onSubmit={handleSearchSubmit}
                className="flex items-center bg-white border border-gray-300 rounded-lg overflow-hidden shadow-sm"
              >

                <input
                  type="text"
                  placeholder="Search for products, brands and more..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  autoFocus
                  className="flex-1 px-6 py-4 text-lg outline-none"
                />

                <button
                  type="submit"
                  className="bg-yellow-400 hover:bg-yellow-500 px-8 py-4 flex items-center justify-center transition"
                >
                  <HiOutlineSearch size={26} className="text-black" />
                </button>

                <button
                  type="button"
                  onClick={() => setSearchOpen(false)}
                  className="px-4 text-gray-500 hover:text-black"
                >
                  <X size={26} />
                </button>

              </form>

            </div>
          </div>
        )}
      </div>

      {/* ================= CART DRAWER ================= */}
      <CartDrawer
        drawerOpen={drawerOpen}
        toggleCartDrawer={toggleCartDrawer}
        cartItems={cartItems.map((item) => ({
          ...item,
          image: item.image ? `${BACKEND_URL}${item.image}` : "",
        }))}
        total={total}
        handleCheckout={handleCheckout}
      />
    </>
  );
};

export default Header;