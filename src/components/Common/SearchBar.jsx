import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import axios from "../../utils/axios";

const SearchBar = ({ isOpen }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  // fetch products when typing
  useEffect(() => {
    const fetchResults = async () => {
      if (!query.trim()) {
        setResults([]);
        return;
      }

      try {
        const { data } = await axios.get(`/products/search?q=${query}`);
        setResults(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchResults();
  }, [query]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    navigate(`/collections/search?q=${query}`);
  };

  if (!isOpen) return null;

  return (
    <div className="w-full bg-white border-b border-gray-200 relative">
      <div className="max-w-6xl mx-auto px-6 py-3">

        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-4"
        >
          <input
            type="text"
            placeholder="Search for products..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="flex-1 text-xl md:text-2xl bg-transparent outline-none border-b-2 border-black pb-2 placeholder-gray-500"
          />

          <button type="submit">
            <Search size={28} className="text-black" />
          </button>
        </form>

        {/* SEARCH RESULTS DROPDOWN */}
        {results.length > 0 && (
          <div className="absolute left-0 right-0 bg-white shadow-lg border mt-3 rounded-md max-h-80 overflow-y-auto z-50">

            {results.map((product) => (
              <div
                key={product._id}
                onClick={() => navigate(`/product/${product._id}`)}
                className="flex items-center gap-4 p-3 hover:bg-gray-100 cursor-pointer"
              >

                <img
                  src={`${BACKEND_URL}${product.image}`}
                  alt={product.name}
                  className="w-12 h-12 object-cover rounded"
                />

                <div>
                  <p className="font-medium">{product.name}</p>
                  <p className="text-sm text-gray-500">
                    ₹{product.price}
                  </p>
                </div>

              </div>
            ))}

          </div>
        )}

      </div>
    </div>
  );
};

export default SearchBar;