import React, { useState } from "react";
import { LuSparkles, LuLeaf, LuShieldCheck, LuTruck } from "react-icons/lu";

const WhyGrainMartSection = () => {
  const [active, setActive] = useState(0);

  const data = [
    {
      icon: <LuSparkles />,
      title: "Fresh Grinding",
      desc: "Every order is freshly ground only after you place it. This ensures maximum nutrition, rich aroma, and authentic taste — just like traditional home chakki grinding.",
    },
    {
      icon: <LuLeaf />,
      title: "Pure Ingredients",
      desc: "We source directly from trusted farms, ensuring clean, chemical-free grains that are safe, natural, and full of real goodness.",
    },
    {
      icon: <LuShieldCheck />,
      title: "Trusted Quality",
      desc: "Each batch is carefully checked and processed hygienically, so you always receive consistent, safe, and premium quality flour.",
    },
    {
      icon: <LuTruck />,
      title: "Easy Experience",
      desc: "Flexible grinding slots, quick processing, and smooth delivery — everything designed to fit your daily routine effortlessly.",
    },
  ];

  return (
   <section className="py-16 px-6 font-manrope relative overflow-hidden bg-[#f9fafb]">

      {/* SOFT BACKGROUND GLOW */}
      {/* <div className="absolute -top-20 -right-20 w-[400px] h-[400px] bg-primary-100 opacity-40 blur-3xl rounded-full"></div> */}

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-start">
        {/* LEFT IMAGE */}
        <div className="sticky top-24 h-[500px]">
          <img
            src="https://images.unsplash.com/photo-1606787366850-de6330128bfc?q=80&w=1200&auto=format&fit=crop"
            alt="grainmart"
            className="w-full h-full object-cover rounded-2xl shadow-lg"
          />
        </div>

        {/* RIGHT SIDE */}
        <div>
          <p className="text-lg text-primary-500 mb-2 font-medium tracking-wide">
            Why GrainMart
          </p>

          <h2 className="text-3xl md:text-4xl font-dm-serif text-heading mb-10 leading-snug">
            Designed for Better Living
          </h2>

          <div className="space-y-5">
            {data.map((item, index) => {
              const isActive = active === index;

              return (
                <div
                  key={index}
                  onClick={() => setActive(index)}
                  className="cursor-pointer border-b border-border pb-4 transition-all"
                >
                  <div className="flex items-start gap-4">
                    {/* ICON */}
                    <div
                      className={`text-2xl mt-1 transition-all duration-300 ${
                        isActive
                          ? "text-primary-500 scale-110"
                          : "text-neutral-400"
                      }`}
                    >
                      {item.icon}
                    </div>

                    {/* TEXT */}
                    <div className="flex-1">
                      <h3
                        className={`text-lg font-medium transition ${
                          isActive ? "text-heading" : "text-neutral-500"
                        }`}
                      >
                        {item.title}
                      </h3>

                      {/* SMOOTH ACCORDION */}
                      <div
                        className={`grid transition-all duration-500 ease-in-out ${
                          isActive ? "grid-rows-[1fr] mt-2" : "grid-rows-[0fr]"
                        }`}
                      >
                        <div className="overflow-hidden">
                          <p className="text-body text-base leading-relaxed">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyGrainMartSection;
