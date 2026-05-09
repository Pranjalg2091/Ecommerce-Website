import React, { useEffect, useState } from "react";
import Hero from "../components/Layout/Hero.jsx";
import CategorySection from "../components/Products/CategorySection.jsx";
import NewArrivals from "../components/Products/NewArrivals.jsx";
import ProductDetails from "../components/Products/ProductDetails.jsx";
import TrustStatsSection from "../components/Layout/TrustStatsSection.jsx";
import FreshGrindingSection from "../components/Layout/FreshGrindingSection.jsx";
import SimpleStepsSection from "../components/Layout/SimpleStepsSection.jsx";
import WhyGrainMartSection from "../components/Layout/WhyGrainMartSection.jsx";
import TestimonialsSection from "../components/Layout/TestimonialsSection.jsx";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsByFilters } from "../redux/slices/productSlice.js";
import axios from "axios";

const Home = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  const [bestSellerProduct, setBestSellerProduct] = useState(null);

  useEffect(() => {
    // Fetch products for a specific collection
    dispatch(
      fetchProductsByFilters({
        size: "25kg",
        category: "Wheat",
        grindingSlots: "5:00 PM - 9:00 PM",
      }),
    );

    // Fetch best seller product
    const fetchBestSeller = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/products/best-seller`,
        );
        setBestSellerProduct(response.data);
      } catch (error) {
        console.error("Error fetching best seller product:", error);
      }
    };

    fetchBestSeller();
  }, [dispatch]);

  return (
    <div>
      <Hero />
      <FreshGrindingSection />
      <CategorySection />
      <NewArrivals />

      {/* Best Seller */}
      <h2 className="text-3xl text-center font-dm-serif mb-4">
        Today’s Highlight
      </h2>
      {bestSellerProduct ? (
        <ProductDetails productId={bestSellerProduct._id} />
      ) : (
        <p className="text-center">Loading best seller product...</p>
      )}

      {/* <ProductDetails /> */}
      <TrustStatsSection />
      <SimpleStepsSection />
      <WhyGrainMartSection />
      <TestimonialsSection />
    </div>
  );
};

export default Home;
