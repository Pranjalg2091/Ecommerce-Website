import React from 'react';
import Hero from '../components/Layout/Hero.jsx';
import CategorySection from '../components/Products/CategorySection.jsx';
import NewArrivals from '../components/Products/NewArrivals.jsx';
import ProductDetails from '../components/Products/ProductDetails.jsx';
import TrustStatsSection from '../components/Layout/TrustStatsSection.jsx';
import FreshGrindingSection from '../components/Layout/FreshGrindingSection.jsx';
import SimpleStepsSection from '../components/Layout/SimpleStepsSection.jsx';
import WhyGrainMartSection from '../components/Layout/WhyGrainMartSection.jsx';
import TestimonialsSection from '../components/Layout/TestimonialsSection.jsx';

const Home = () => {
  return (
    <div>
        <Hero/>
        <FreshGrindingSection/>
        <CategorySection/>
        <NewArrivals/>
        {/* Best Seller */}
        <h2 className='text-3xl text-center font-dm-serif mb-4'>
          Today’s Highlight
        </h2>
        <ProductDetails />
        <TrustStatsSection/>
        <SimpleStepsSection/>
<WhyGrainMartSection/>
        <TestimonialsSection/>
    </div>
  )
}

export default Home;