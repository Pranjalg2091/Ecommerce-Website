import React from "react";
import { LuWheat, LuSettings2 } from "react-icons/lu";
import { HiOutlineSparkles } from "react-icons/hi";
import { FiPackage } from "react-icons/fi";

const SimpleStepsSection = () => {
  const steps = [
    {
      icon: <LuWheat />,
      title: "Choose Grain",
      desc: "Explore a carefully selected range of premium wheat and grains sourced directly from trusted farms, ensuring purity, quality, and consistency in every batch you choose.",
    },
    {
      icon: <LuSettings2 />,
      title: "Customize Grind",
      desc: "Personalize your flour just the way you like it — from texture to grinding preferences — giving you complete control over how your everyday flour is prepared.",
    },
    {
      icon: <HiOutlineSparkles />,
      title: "Fresh Processing",
      desc: "Your grains are freshly ground only after you place the order, preserving natural aroma, nutrients, and taste — just like traditional home grinding.",
    },
    {
      icon: <FiPackage />,
      title: "Ready for You",
      desc: "Receive your freshly prepared flour at your doorstep or pick it up at your convenience — packed hygienically and ready to use in your kitchen.",
    },
  ];

  return (
    <section className="py-16 px-4 bg-white font-manrope">
      {/* HEADER */}
      <div className="text-center max-w-2xl mx-auto mb-14">
        <h2 className="text-3xl font-dm-serif mb-4">How It Works</h2>
        <p className="text-body text-lg leading-relaxed">
          From selecting grains to delivering freshly ground flour — every step
          is designed to give you control, freshness, and ease.
        </p>
      </div>

      {/* TIMELINE */}
      <div className="relative max-w-4xl mx-auto">
        {/* LINE */}
        <div className="absolute top-0 left-1/2 w-[2px] h-full bg-border -translate-x-1/2"></div>

        {steps.map((step, index) => (
          <div
            key={index}
            className={`mb-14 flex items-center justify-between ${
              index % 2 === 0 ? "flex-row" : "flex-row-reverse"
            }`}
          >
            {/* CONTENT */}
            <div className="w-[42%]">
              <h3 className="text-xl font-semibold text-heading mb-2">
                {step.title}
              </h3>
              <p className="text-body text-lg leading-relaxed">{step.desc}</p>
            </div>

            {/* ICON */}
            <div className="relative z-10 flex items-center justify-center w-14 h-14 rounded-full bg-primary-500 text-white text-xl shadow-md">
              {step.icon}
            </div>

            <div className="w-[42%]" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default SimpleStepsSection;
