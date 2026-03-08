import { useEffect, useState } from "react";
import api from "../utils/api";

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
      try {

        const { data } = await api.get("/products");

        setProducts(data);

      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();

  }, []);

  return (
    <>
      <Hero />

      <BrandAds />

      <GenderCollectionSection />

      <NewArrivals />

      {/* Best Seller */}
      <section className="py-16 bg-[#f5f1eb]">

        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
          Best Seller
        </h2>

        <ProductDetails />

        <div className="container mx-auto px-6">
          <ProductGrid products={products.slice(0, 4)} />
        </div>

      </section>

      {/* Top Wears */}
      <section className="py-16">

        <h2 className="text-4xl text-center font-bold mb-10">
          Top Wears for Women
        </h2>

        <div className="container mx-auto px-6">
          <ProductGrid products={products.slice(4, 8)} />
        </div>

      </section>

      <FeaturesSection />
    </>
  );
};

export default Home;