import { useState, useRef, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { FaChevronDown } from "react-icons/fa";

const SortOptions = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const currentSort = searchParams.get("sortBy") || "";

  const options = [
    { label: "Default", value: "" },
    { label: "Price: Low to High", value: "priceAsc" },
    { label: "Price: High to Low", value: "priceDesc" },
    { label: "Popularity", value: "popularity" },
  ];

  const handleSortChange = (value) => {
    if (value) {
      searchParams.set("sortBy", value);
    } else {
      searchParams.delete("sortBy");
    }

    setSearchParams(searchParams);
    setOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedLabel =
    options.find((opt) => opt.value === currentSort)?.label ||
    "Default";

  return (
    <div className="relative w-60" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center border border-[#d6c2b2] bg-white px-4 py-2 text-sm rounded shadow-sm hover:shadow-md transition"
      >
        <span>
          <span className="text-gray-500">Sort by : </span>
          <span className="font-semibold text-[#6f4e37]">
            {selectedLabel}
          </span>
        </span>

        <FaChevronDown
          className={`text-[#6f4e37] transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-full bg-white border border-[#d6c2b2] rounded shadow-lg z-50">
          {options.map((option) => (
            <div
              key={option.value}
              onClick={() => handleSortChange(option.value)}
              className={`px-4 py-2 text-sm cursor-pointer hover:bg-[#f5f1eb] transition ${
                currentSort === option.value
                  ? "bg-[#f5f1eb] text-[#6f4e37] font-medium"
                  : ""
              }`}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SortOptions;