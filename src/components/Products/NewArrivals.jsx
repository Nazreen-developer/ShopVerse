import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import api from "../../utils/axios";

const API = import.meta.env.VITE_BACKEND_URL;

const NewArrivals = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const scrollRef = useRef(null);

  /* ==========================
     IMAGE HELPER (FIX)
  ========================== */
  const getImage = (product) => {
    const img = product?.images?.[0]?.url;

    if (!img) return "https://via.placeholder.com/500";

    // ✅ Cloudinary / external
    if (img.startsWith("http")) return img;

    // ✅ fallback (old images)
    return `${API}${img}`;
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await api.get("/products");
        setProducts(data.slice(0, 12));
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const scrollLeft = () => {
    scrollRef.current.scrollBy({
      left: -400,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({
      left: 400,
      behavior: "smooth",
    });
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-12 relative">

      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold">New Arrivals</h2>

        <div className="flex gap-3">
          <button
            onClick={scrollLeft}
            className="p-2 rounded-full border hover:bg-gray-100"
          >
            <ChevronLeft size={22} />
          </button>

          <button
            onClick={scrollRight}
            className="p-2 rounded-full border hover:bg-gray-100"
          >
            <ChevronRight size={22} />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth"
      >
        {products.map((product) => (
          <div
            key={product._id}
            onClick={() => navigate(`/product/${product._id}`)}
            className="min-w-[260px] cursor-pointer bg-white rounded-lg shadow hover:shadow-lg transition"
          >
            <img
              src={getImage(product)}   // ✅ FIXED HERE
              alt={product.name}
              className="w-full h-[300px] object-cover rounded-t-lg"
            />

            <div className="p-4">
              <h3 className="font-semibold text-lg">
                {product.name}
              </h3>

              <div className="flex items-center gap-2 mt-2">
                <span className="font-bold">
                  ₹{product.discountPrice || product.price}
                </span>

                {product.discountPrice && (
                  <span className="text-gray-500 line-through text-sm">
                    ₹{product.price}
                  </span>
                )}
              </div>
            </div>

          </div>
        ))}
      </div>
    </section>
  );
};

export default NewArrivals;