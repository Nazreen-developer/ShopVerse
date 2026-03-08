import { useNavigate } from "react-router-dom";
import { men, women, kids, accessories } from "../../assets";

const GenderCollectionSection = () => {
  const navigate = useNavigate();

  const collections = [
    { name: "Men", image: men, path: "men" },
    { name: "Women", image: women, path: "women" },
    { name: "Kids", image: kids, path: "kids" },
    { name: "Beauty", image: accessories, path: "beauty" },
  ];

  // ✅ FIXED ROUTE
  const handleNavigation = (path) => {
    navigate(`/collections/${path}`);
  };

  return (
    <section className="bg-gray-100 py-12 px-4 md:px-10">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
        {collections.map((item, index) => (
          <div
            key={index}
            onClick={() => handleNavigation(item.path)}
            className="relative group cursor-pointer overflow-hidden rounded-lg shadow-md hover:shadow-xl transition duration-300"
          >
            {/* Image */}
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-[250px] md:h-[380px] object-cover group-hover:scale-105 transition duration-500"
            />

            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition duration-300"></div>

            {/* Text & Button */}
            <div className="absolute bottom-6 left-6 text-white">
              <h3 className="text-lg md:text-xl font-semibold mb-2">
                {item.name}
              </h3>

              <button
                onClick={(e) => {
                  e.stopPropagation(); // ✅ prevents double click trigger
                  handleNavigation(item.path);
                }}
                className="bg-white text-black px-4 py-1.5 text-sm font-medium rounded hover:bg-gray-200 transition"
              >
                Shop Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default GenderCollectionSection;