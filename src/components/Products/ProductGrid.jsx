import { Link } from "react-router-dom";

const ProductGrid = ({ products }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {products.map((product, index) => (
        <Link
          key={index}
          to={`/product/${product._id}`}
          className="group block"
        >
          <div className="bg-[#f8f6f2] p-4 rounded-2xl overflow-hidden transition duration-300 hover:shadow-xl">

            {/* Image Container */}
            <div className="relative w-full h-80 overflow-hidden rounded-xl">
              <img
                src={
                  product.images?.[0]?.url
                    ? `http://localhost:3500${product.images[0].url}`
                    : "https://via.placeholder.com/500"
                }
                alt={product.name}
                className="w-full h-full object-cover transform transition duration-500 group-hover:scale-110"
              />
            </div>

            {/* Product Info */}
            <div className="mt-4 text-center">
              <h3 className="text-base font-semibold tracking-wide">
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