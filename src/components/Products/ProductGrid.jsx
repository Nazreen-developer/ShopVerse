import { Link } from "react-router-dom";

const API = import.meta.env.VITE_BACKEND_URL;

const ProductGrid = ({ products = [] }) => {

  const getImage = (product) => {
    const img = product?.images?.[0]?.url;

    if (!img) return "https://via.placeholder.com/500";

    // Cloudinary
    if (img.startsWith("http")) return img;

    // Local fallback
    return `${API}${img}`;
  };

  if (!products.length) {
    return (
      <div className="text-center py-10 text-gray-500">
        No products available
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

      {products.map((product) => (
        <Link
          key={product._id}
          to={`/product/${product._id}`}
          className="block"
        >
          <div className="bg-[#f8f6f2] p-4 rounded-xl hover:shadow-lg transition">

            <img
              src={getImage(product)}
              alt={product.name}
              className="w-full h-72 object-cover rounded-lg"
            />

            <h3 className="mt-3 font-semibold text-center">
              {product.name}
            </h3>

            <p className="text-center text-gray-700">
              ₹{product.price}
            </p>

          </div>
        </Link>
      ))}

    </div>
  );
};

export default ProductGrid;