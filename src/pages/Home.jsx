import { useEffect, useState } from "react";
import api from "../utils/axios";

import Hero from "../components/Layout/Hero";
import BrandAds from "../components/Products/temp";
import GenderCollectionSection from "../components/Products/GenderCollectionSection";
import NewArrivals from "../components/Products/NewArrivals";
import ProductDetails from "../components/Products/ProductDetails";
import FeaturesSection from "../components/Products/FeaturesSection";
import ProductGrid from "../components/Products/ProductGrid";

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await api.get("/products");
      setProducts(data);
    };
    fetchProducts();
  }, []);

  return (
    <>
      <Hero />
      <BrandAds />
      <GenderCollectionSection />
      <NewArrivals />

      <section className="py-16 bg-[#f5f1eb]">
        <h2 className="text-4xl font-bold text-center mb-12">
          Best Seller
        </h2>

        {products.length > 0 && (
          <ProductDetails productId={products[0]._id} />
        )}

        <div className="container mx-auto px-6">
          <ProductGrid products={products.slice(0, 4)} />
        </div>
      </section>

      <FeaturesSection />
    </>
  );
};

export default Home;