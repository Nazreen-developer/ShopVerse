import { Link } from "react-router-dom";

const API = import.meta.env.VITE_BACKEND_URL;

const ProductGrid = ({ products }) => {
  const getImage = (product) => {
    const img = product.images?.[0]?.url;

    if (!img) return "https://via.placeholder.com/500";

    // Cloudinary or external image
    if (img.startsWith("http")) {
      return img;
    }

    // Local upload
    return `${API}${img}`;
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {products.map((product) => (
        <Link
          key={product._id}
          to={`/product/${product._id}`}
          className="group block"
        >
          <div className="bg-[#f8f6f2] p-4 rounded-2xl overflow-hidden hover:shadow-xl transition">

            <div className="relative w-full h-80 overflow-hidden rounded-xl">
              <img
                src={getImage(product)}
                alt={product.name}
                className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
              />
            </div>

            <div className="mt-4 text-center">
              <h3 className="text-base font-semibold">
                {product.name}
              </h3>

              <p className="text-gray-700 font-medium mt-1">
                ₹{product.price}
              </p>
            </div>

          </div>
        </Link>
      ))}
    </div>
  );
};

export default ProductGrid;