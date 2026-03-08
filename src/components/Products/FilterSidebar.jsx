import { useEffect } from "react";

const FilterSidebar = ({ collection, filters, setFilters, closeSidebar }) => {

  /* SUBCATEGORIES BASED ON COLLECTION */

  const subCategories = {
    men: ["Shirts", "T-Shirts", "Jeans", "Jackets"],
    women: ["Dresses", "Tops", "Skirts", "Sarees"],
    kids: ["T-Shirts", "Shorts", "Frocks"],
    beauty: ["Skincare", "Makeup"],
    sports: ["Track Pants", "Sports T-Shirts"],
    furnitures: ["Beds", "Sofas", "Chairs"],
    "home utilities": ["Kitchen", "Storage"]
  };

  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

  const colors = [
    "Red",
    "Blue",
    "Black",
    "Green",
    "Yellow",
    "Light Blue",
    "Dark Wash"
  ];

  const materials = [
    "Cotton",
    "Wool",
    "Denim",
    "Polyester"
  ];

  const brands = [
    "Urban Threads",
    "Modern Fit",
    "ChicStyle",
    "Fashionista",
    "Street Style"
  ];


  /* HANDLE FILTER CHANGE */

  const handleFilterChange = (e) => {

    const { name, value, checked, type } = e.target;

    if (type === "checkbox") {

      setFilters(prev => {

        const updatedArray = checked
          ? [...(prev[name] || []), value]
          : prev[name].filter(item => item !== value);

        return { ...prev, [name]: updatedArray };

      });

    } else {

      setFilters(prev => ({
        ...prev,
        [name]: Number(value)
      }));

    }
  };


  useEffect(() => {
    console.log("Updated Filters:", filters);
  }, [filters]);


  return (

    <div className="w-72 bg-[#6f4e37] text-white p-6 h-screen overflow-y-auto">

      {/* HEADER */}

      <div className="flex justify-between items-center mb-6 border-b border-[#8b5e3c] pb-3">

        <h2 className="text-xl font-bold tracking-wide">FILTERS</h2>

        <button
          onClick={closeSidebar}
          className="lg:hidden text-2xl hover:text-gray-300"
        >
          ✕
        </button>

      </div>


      {/* SUB CATEGORY */}

      {collection && subCategories[collection.toLowerCase()] && (

        <FilterSection title="Category">

          {subCategories[collection.toLowerCase()].map(item => (

            <CheckboxItem
              key={item}
              name="category"
              value={item}
              filters={filters}
              handleChange={handleFilterChange}
            />

          ))}

        </FilterSection>

      )}


      {/* BRAND */}

      <FilterSection title="Brand">

        {brands.map(item => (

          <CheckboxItem
            key={item}
            name="brand"
            value={item}
            filters={filters}
            handleChange={handleFilterChange}
          />

        ))}

      </FilterSection>


      {/* COLOR */}

      <FilterSection title="Color">

        {colors.map(item => (

          <CheckboxItem
            key={item}
            name="color"
            value={item}
            filters={filters}
            handleChange={handleFilterChange}
          />

        ))}

      </FilterSection>


      {/* SIZE */}

      <FilterSection title="Size">

        {sizes.map(item => (

          <CheckboxItem
            key={item}
            name="size"
            value={item}
            filters={filters}
            handleChange={handleFilterChange}
          />

        ))}

      </FilterSection>


      {/* MATERIAL */}

      <FilterSection title="Material">

        {materials.map(item => (

          <CheckboxItem
            key={item}
            name="material"
            value={item}
            filters={filters}
            handleChange={handleFilterChange}
          />

        ))}

      </FilterSection>


      {/* PRICE */}

      <div className="mt-6">

        <h3 className="font-semibold mb-2">Price</h3>

        <input
          type="range"
          name="price"
          min="0"
          max="5000"
          value={filters.price}
          onChange={handleFilterChange}
          className="w-full"
        />

        <p className="mt-2 text-sm">
          Up to ₹{filters.price}
        </p>

      </div>

    </div>
  );
};

export default FilterSidebar;


/* REUSABLE COMPONENTS */

const FilterSection = ({ title, children }) => (

  <div className="mb-6">

    <h3 className="font-semibold mb-2">{title}</h3>

    <div className="space-y-2">
      {children}
    </div>

  </div>

);


const CheckboxItem = ({ name, value, filters, handleChange }) => (

  <label className="flex items-center space-x-2 cursor-pointer">

    <input
      type="checkbox"
      name={name}
      value={value}
      checked={filters[name]?.includes(value) || false}
      onChange={handleChange}
      className="accent-white"
    />

    <span className="text-sm">{value}</span>

  </label>

);