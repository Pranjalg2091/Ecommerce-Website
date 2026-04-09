import React, { useState } from "react";
import {
  FiChevronLeft,
  FiChevronRight,
  FiStar,
} from "react-icons/fi";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";

const testimonials = [
  {
    name: "Rahul Sharma",
    location: "Ujjain",
    rating: 4.5,
    review:
      "The flour feels truly fresh and soft. You can clearly notice the difference compared to packaged atta. The aroma, texture, and taste are exactly what we used to get from traditional home grinding.",
  },
  {
    name: "Neha Verma",
    location: "Indore",
    rating: 5,
    review:
      "Very convenient process and excellent quality grains. Booking a grinding slot is simple and fits perfectly into my daily routine.",
  },
  {
    name: "Amit Patel",
    location: "Bhopal",
    rating: 4,
    review:
      "Fresh grinding really makes a difference. The taste is much better, and you feel confident about what you're consuming.",
  },
  {
    name: "Pooja Jain",
    location: "Dewas",
    rating: 4.5,
    review:
      "Clean process, timely delivery, and consistent quality every time. The experience feels premium and trustworthy.",
  },
];

const TestimonialsSection = () => {
  const [index, setIndex] = useState(0);

  const prevSlide = () => {
    setIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const user = testimonials[index];

  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("");

  // ⭐ RATING RENDER FUNCTION
  const renderStars = (rating) => {
    const stars = [];

    for (let i = 1; i <= 5; i++) {
      if (rating >= i) {
        stars.push(<FaStar key={i} className="text-yellow-400" />);
      } else if (rating >= i - 0.5) {
        stars.push(<FaStarHalfAlt key={i} className="text-yellow-400" />);
      } else {
        stars.push(<FiStar key={i} className="text-neutral-300" />);
      }
    }

    return stars;
  };

  return (
    <section className="py-16 px-4 bg-white text-center font-manrope">

      {/* HEADER */}
      <p className="text-lg tracking-widest font-medium text-primary-500 mb-2">
        Testimonials
      </p>

      <h2 className="text-3xl md:text-4xl font-dm-serif mb-10">
        What Our Customers Say
      </h2>

      {/* CARD */}
      <div className="max-w-3xl mx-auto relative">

        {/* ARROWS */}
        <button
          onClick={prevSlide}
          className="absolute -left-6 top-1/2 -translate-y-1/2 bg-white border border-border w-10 h-10 flex items-center justify-center rounded-full"
        >
          <FiChevronLeft />
        </button>

        <button
          onClick={nextSlide}
          className="absolute -right-6 top-1/2 -translate-y-1/2 bg-white border border-border w-10 h-10 flex items-center justify-center rounded-full"
        >
          <FiChevronRight />
        </button>

        {/* CONTENT */}
        <div className="bg-neutral-50 rounded-xl p-8 border border-border">

          {/* USER Initials */}
          <div className="w-14 h-14 mx-auto flex items-center justify-center rounded-full bg-primary-100 text-primary-600 text-lg font-semibold mb-4">
            {initials}
          </div>

          {/* STARS */}
          <div className="flex justify-center gap-1 mb-4 text-lg">
            {renderStars(user.rating)}
          </div>

          {/* REVIEW (FIXED HEIGHT) */}
          <p className="text-body text-base leading-relaxed mb-6 line-clamp-4 min-h-[96px]">
            “{user.review}”
          </p>

          {/* NAME */}
          <h4 className="text-heading font-medium">
            {user.name}
          </h4>

          <p className="text-sm text-body">
            {user.location}
          </p>
        </div>
      </div>

      {/* DOTS */}
      <div className="flex justify-center mt-6 gap-2">
        {testimonials.map((_, i) => (
          <div
            key={i}
            onClick={() => setIndex(i)}
            className={`w-2 h-2 rounded-full cursor-pointer ${
              i === index ? "bg-primary-500" : "bg-primary-100"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default TestimonialsSection;