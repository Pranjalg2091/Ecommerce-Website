import React from "react";
import CategoryImage1 from "../../assets/CategoryImage1.png";
import CategoryImage2 from "../../assets/CategoryImage2.png";
import CategoryImage3 from "../../assets/CategoryImage3.png";
import CategoryImage4 from "../../assets/CategoryImage4.png";
import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";

const CollectionSection = () => {

  const categories = [
    {
      title: "Wheat",
      desc: "High-quality wheat sourced from trusted farms.",
      image: CategoryImage1
    },
    {
      title: "Wheat Flour",
      desc: "Freshly ground flour for soft and healthy rotis.",
      image: CategoryImage2
    },
    {
      title: "Organic Grains",
      desc: "Natural and chemical-free grains for your family.",
      image: CategoryImage3
    },
    {
      title: "Grinding Service",
      desc: "Bring your wheat or order from us and get it freshly ground.",
      image: CategoryImage4
    }
  ];

  return (
    <section className="py-16 px-4 lg:px-8">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

        {categories.map((item, index) => (
          <div key={index} className="relative overflow-hidden rounded-xl group cursor-pointer">

            <img
              src={item.image}
              alt={item.title}
              className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
            />

            <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/30 to-transparent"></div>

            <div className="absolute bottom-4 left-4 text-white max-w-[80%]">
              <h2 className="text-xl font-dm-serif mb-2">
                {item.title}
              </h2>

              <p className="font-manrope text-sm mb-3">
                {item.desc}
              </p>

              <Link
                to="/"
                className="flex items-center gap-2 text-sm font-medium hover:underline"
              >
                Explore More <FiArrowRight className="text-lg" />
              </Link>
            </div>

          </div>
        ))}

      </div>
    </section>
  );
};

export default CollectionSection;