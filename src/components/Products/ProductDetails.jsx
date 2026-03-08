import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Toaster, toast } from "sonner";
import axios from "axios";
import ProductGrid from "./ProductGrid";

const API = import.meta.env.VITE_BACKEND_URL;

const ProductDetails = () => {

  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [mainImage, setMainImage] = useState("");

  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

  const [quantity, setQuantity] = useState(1);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  /* ==========================
     FETCH PRODUCT
  ========================== */

  useEffect(() => {

    if (!id) return;

    const fetchProduct = async () => {

      try {

        const { data } = await axios.get(`${API}/api/products/${id}`);

        setProduct(data);

        if (data.images && data.images.length > 0) {
          setMainImage(`${API}${data.images[0].url}`);
        }

      } catch (error) {

        console.error("Error fetching product:", error);

      }

    };

    fetchProduct();

  }, [id]);



  /* ==========================
     FETCH SIMILAR PRODUCTS
  ========================== */

  useEffect(() => {

    const fetchSimilarProducts = async () => {

      try {

        const { data } = await axios.get(`${API}/api/products`);

        if (Array.isArray(data)) {
          setSimilarProducts(data.slice(0, 4));
        }

      } catch (error) {

        console.error("Error fetching similar products:", error);

      }

    };

    fetchSimilarProducts();

  }, []);



  if (!product) {
    return <div className="p-10 text-center">Loading...</div>;
  }



  const showVariantOptions =
    product.mainCategory === "Men" || product.mainCategory === "Women";



  /* ==========================
     QUANTITY CHANGE
  ========================== */

  const handleQuantityChange = (action) => {

    if (action === "plus") {
      setQuantity(prev => prev + 1);
    }

    if (action === "minus" && quantity > 1) {
      setQuantity(prev => prev - 1);
    }

  };



  /* ==========================
     ADD TO CART
  ========================== */

  const handleAddToCart = async () => {

    if (showVariantOptions && (!selectedSize || !selectedColor)) {
      toast.error("Please select size and color");
      return;
    }

    try {

      setIsButtonDisabled(true);

      const token = localStorage.getItem("token");

      let guestId = localStorage.getItem("guestId");

      if (!guestId) {
        guestId = `guest_${Date.now()}`;
        localStorage.setItem("guestId", guestId);
      }

      const cartData = {
        productId: product._id,
        quantity,
        size: selectedSize || null,
        color: selectedColor || null,
        guestId
      };

      await axios.post(
        `${API}/api/carts`,
        cartData,
        token
          ? {
              headers: {
                Authorization: `Bearer ${token}`
              }
            }
          : {}
      );

      toast.success("Added to cart!");

      window.dispatchEvent(new Event("cartUpdated"));

    } catch (error) {

      console.error("Add to cart error:", error);

      toast.error("Failed to add to cart");

    } finally {

      setIsButtonDisabled(false);

    }

  };



  return (

    <div className="bg-[#f5f1eb] py-6 px-4">

      <Toaster position="top-center" />

      <div className="max-w-[1200px] mx-auto bg-white p-6 rounded-md">

        <div className="flex flex-col lg:flex-row gap-10">

          {/* PRODUCT IMAGE */}

          <div className="lg:w-1/2 flex justify-center items-start">

            <img
              src={mainImage}
              alt={product.name}
              className="max-h-[420px] w-auto object-contain rounded"
            />

          </div>



          {/* PRODUCT DETAILS */}

          <div className="lg:w-1/2">

            <h1 className="text-2xl font-semibold mb-2">
              {product.name}
            </h1>

            <p className="text-xl font-bold mb-3">
              ₹{product.price}
            </p>

            <p className="text-gray-600 text-sm mb-6">
              {product.description}
            </p>



            {/* SIZE */}

            {showVariantOptions && product.sizes?.length > 0 && (

              <div className="mb-6">

                <p className="text-sm font-medium mb-2">
                  Select Size
                </p>

                <div className="flex gap-2">

                  {product.sizes.map(size => (

                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-1.5 text-sm border rounded ${
                        selectedSize === size
                          ? "bg-black text-white"
                          : "hover:border-black"
                      }`}
                    >
                      {size}
                    </button>

                  ))}

                </div>

              </div>

            )}



            {/* COLOR */}

            {showVariantOptions && product.colors?.length > 0 && (

              <div className="mb-6">

                <p className="text-sm font-medium mb-2">
                  Select Color
                </p>

                <div className="flex gap-3">

                  {product.colors.map(color => (

                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      style={{ backgroundColor: color.toLowerCase() }}
                      className={`w-7 h-7 rounded-full border ${
                        selectedColor === color ? "ring-2 ring-black" : ""
                      }`}
                    />

                  ))}

                </div>

              </div>

            )}



            {/* QUANTITY */}

            <div className="mb-6">

              <p className="text-sm font-medium mb-2">
                Quantity
              </p>

              <div className="flex items-center gap-3">

                <button
                  onClick={() => handleQuantityChange("minus")}
                  className="px-3 py-1 border"
                >
                  -
                </button>

                <span>{quantity}</span>

                <button
                  onClick={() => handleQuantityChange("plus")}
                  className="px-3 py-1 border"
                >
                  +
                </button>

              </div>

            </div>



            {/* ADD TO CART */}

            <button
              disabled={isButtonDisabled}
              onClick={handleAddToCart}
              className="bg-black text-white py-3 w-full text-sm font-medium hover:bg-gray-800"
            >
              ADD TO CART
            </button>

          </div>

        </div>



        {/* SIMILAR PRODUCTS */}

        <div className="mt-12">

          <h2 className="text-3xl font-bold text-center mb-8">
            You May Also Like
          </h2>

          <ProductGrid products={similarProducts} />

        </div>

      </div>

    </div>

  );

};

export default ProductDetails;