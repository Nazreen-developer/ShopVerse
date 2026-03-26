import { useEffect, useRef, useState } from "react";
import { FaFilter } from "react-icons/fa";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";

import FilterSidebar from "../components/Products/FilterSidebar";
import SortOptions from "../components/Products/SortOptions";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const CollectionPage = () => {

  const { collection } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const sortBy = searchParams.get("sortBy");

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const [filters, setFilters] = useState({
    category: [],
    brand: [],
    size: [],
    color: [],
    material: [],
    price: 5000
  });

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);

  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };

  /* ==========================
     IMAGE FIX (IMPORTANT)
  ========================== */
  const getImage = (product) => {
    const img = product?.images?.[0]?.url;

    if (!img) return "https://via.placeholder.com/500";

    // ✅ Cloudinary / external
    if (img.startsWith("http")) return img;

    // ✅ fallback (old images)
    return `${BACKEND_URL}${img}`;
  };

  /* FETCH PRODUCTS */

  useEffect(() => {

    const fetchProducts = async () => {

      try {

        const { data } = await axios.get(`${BACKEND_URL}/api/products`);

        setProducts(data);
        setFilteredProducts(data);

      } catch (error) {
        console.log("Product fetch error:", error);
      }

    };

    fetchProducts();

  }, []);


  /* CLOSE SIDEBAR OUTSIDE CLICK */

  useEffect(() => {

    const handleClickOutside = (e) => {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
        setIsSidebarOpen(false);
      }
    };

    if (isSidebarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);

  }, [isSidebarOpen]);


  /* FILTER + SORT */

  useEffect(() => {

    let updated = [...products];

    if (collection) {
      updated = updated.filter(product =>
        product.mainCategory?.toLowerCase() === collection.toLowerCase()
      );
    }

    if (filters.category.length > 0) {
      updated = updated.filter(product =>
        filters.category.includes(product.subCategory)
      );
    }

    if (filters.brand.length > 0) {
      updated = updated.filter(product =>
        filters.brand.includes(product.brand)
      );
    }

    if (filters.size.length > 0) {
      updated = updated.filter(product =>
        product.sizes?.some(size => filters.size.includes(size))
      );
    }

    if (filters.color.length > 0) {
      updated = updated.filter(product =>
        product.colors?.some(color => filters.color.includes(color))
      );
    }

    if (filters.material.length > 0) {
      updated = updated.filter(product =>
        filters.material.includes(product.material)
      );
    }

    updated = updated.filter(product => product.price <= filters.price);

    if (sortBy === "priceAsc") {
      updated.sort((a, b) => a.price - b.price);
    }

    if (sortBy === "priceDesc") {
      updated.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(updated);

  }, [filters, collection, products, sortBy]);


  return (

    <div className="min-h-screen bg-[#f5f1eb]">

      <div className="lg:hidden p-4">
        <button
          onClick={toggleSidebar}
          className="flex items-center gap-2 bg-[#6f4e37] text-white px-4 py-2 rounded shadow"
        >
          <FaFilter />
          Filters
        </button>
      </div>

      <div className="flex">

        <div
          ref={sidebarRef}
          className={`
          fixed top-0 left-0 z-50 w-72 bg-[#6f4e37]
          transform transition-transform duration-300
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:static lg:translate-x-0
          `}
        >
          <FilterSidebar
            collection={collection}
            filters={filters}
            setFilters={setFilters}
            closeSidebar={() => setIsSidebarOpen(false)}
          />
        </div>

        {isSidebarOpen && (
          <div className="fixed inset-0 bg-black/40 z-40 lg:hidden"></div>
        )}

        <div className="flex-1 p-6">

          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold uppercase text-[#6f4e37]">
              {collection ? collection : "All Collection"}
            </h2>
            <SortOptions />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">

            {filteredProducts.length === 0 ? (
              <p>No products found</p>
            ) : (

              filteredProducts.map(product => (

                <div
                  key={product._id}
                  onClick={() => navigate(`/product/${product._id}`)}
                  className="bg-white rounded-lg shadow hover:shadow-xl transition duration-300 cursor-pointer"
                >

                  <img
                    src={getImage(product)}   // ✅ FIXED HERE
                    alt={product.name}
                    className="w-full h-60 object-cover rounded-t-lg"
                  />

                  <div className="p-3">
                    <h3 className="text-sm font-medium truncate">
                      {product.name}
                    </h3>

                    <p className="text-[#6f4e37] font-semibold mt-1">
                      ₹{product.price}
                    </p>

                    <p className="text-xs text-gray-500 mt-1">
                      {product.brand}
                    </p>
                  </div>

                </div>

              ))

            )}

          </div>

        </div>

      </div>

    </div>

  );

};

export default CollectionPage;