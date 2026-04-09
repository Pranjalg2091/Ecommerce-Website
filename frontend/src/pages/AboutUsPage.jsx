import React from "react";
import { HiOutlineSparkles, HiOutlineScale } from "react-icons/hi";

import { MdOutlineFactory, MdOutlineHealthAndSafety } from "react-icons/md";

import { GiWheat } from "react-icons/gi";

const AboutUsPage = () => {
  return (
    <div className=" text-body font-manrope">
      {/* HERO */}
      <section className="relative h-[75vh] flex items-center justify-center text-center">
        <img
          src="https://picsum.photos/1600/900?random=1"
          alt="hero"
          className="absolute w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60"></div>

        <div className="relative z-10 px-4">
          <h1 className="text-4xl md:text-6xl font-dm-serif text-white mb-6 leading-tight">
            Bringing Purity Back <br /> To Your Plate
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-neutral-200">
            Fresh grains. Honest sourcing. Traditional grinding — reimagined for
            modern homes.
          </p>
        </div>
      </section>

      {/* STORY */}
      <section className="py-16 px-6 max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div className="relative">
          <img
            src="https://picsum.photos/600/500?random=2"
            alt="story"
            className="rounded-xl shadow object-cover w-full h-full"
          />
        </div>

        <div>
          <h2 className="text-4xl font-dm-serif mb-6 text-heading">
            Our Story
          </h2>
          <p className="mb-4 text-body text-lg leading-relaxed">
            In a world full of packaged food, freshness has been lost. We
            started GrainMart to bring back purity and trust in everyday
            essentials.
          </p>
          <p className="mb-4 text-body text-lg leading-relaxed">
            We reconnect people with real food — naturally grown, carefully
            selected, and freshly prepared.
          </p>
          <p className="text-body text-lg leading-relaxed">
            This isn’t just business — it’s a step towards healthier living.
          </p>
        </div>
      </section>

      {/* VALUES */}
      <section className="py-16 px-6 bg-white">
        {/* HEADER */}
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-start mb-16">
          <h2 className="text-4xl font-dm-serif text-heading">
            What Makes Us <br /> Different
          </h2>

          <p className="text-body text-lg max-w-md ">
            We focus on purity, freshness, and fairness — ensuring every grain
            you receive meets the highest standards of quality and trust.
          </p>
        </div>

        {/* ITEMS */}
        <div className="max-w-6xl mx-auto grid sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* ITEM 1 */}
          <div className="flex flex-col items-start gap-4 border border-border p-6">
            <HiOutlineSparkles className="text-2xl text-body" />

            <h3 className="text-lg font-medium text-heading">Pure & Natural</h3>

            <p className="text-body text-sm leading-relaxed max-w-xs">
              No chemicals, no shortcuts — just clean grains you can trust.
            </p>
          </div>

          {/* ITEM 2 */}
          <div className="flex flex-col items-start gap-4 border border-border p-6">
            <MdOutlineFactory className="text-2xl text-body" />

            <h3 className="text-lg font-medium text-heading">
              Fresh Processing
            </h3>

            <p className="text-body text-sm leading-relaxed max-w-xs">
              Every order is freshly ground for maximum nutrition.
            </p>
          </div>

          {/* ITEM 3 */}
          <div className="flex flex-col items-start gap-4 border border-border p-6">
            <HiOutlineScale className="text-2xl text-body" />

            <h3 className="text-lg font-medium text-heading">Fair Sourcing</h3>

            <p className="text-body text-sm leading-relaxed max-w-xs">
              Direct partnerships with farmers ensure honesty & quality.
            </p>
          </div>

          {/* ITEM 4 */}
          <div className="flex flex-col items-start gap-4 border border-border p-6">
            <MdOutlineHealthAndSafety className="text-2xl text-body" />

            <h3 className="text-lg font-medium text-heading">
              Built for Healthier Living
            </h3>

            <p className="text-body text-sm leading-relaxed max-w-xs">
              Fresh flour retains nutrients, aroma, and taste — giving your
              family a healthier lifestyle.
            </p>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-16 px-6 bg-neutral-50">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          {/* LEFT CONTENT */}
          <div>
            <h2 className="text-4xl font-dm-serif mb-6 text-heading">
              From Grain <br /> to Flour
            </h2>

            <p className="text-body mb-10 max-w-md">
              A simple, transparent process that ensures freshness, purity, and
              quality at every step.
            </p>

            {/* STEPS */}
            <div className="space-y-8">
              {/* STEP */}
              <div className="flex items-start gap-5">
                <div className="w-16 h-16 flex items-center justify-center rounded-full bg-primary-800/10">
                  <GiWheat className="text-primary-500 text-2xl" />
                </div>
                <div>
                  <h3 className="font-medium text-heading">Select Grains</h3>
                  <p className="text-sm text-body">
                    Carefully sourced and quality-checked grains.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-5">
                <div className="w-16 h-16 flex items-center justify-center rounded-full bg-primary-800/10">
                  <MdOutlineFactory className="text-primary-500 text-2xl" />
                </div>
                <div>
                  <h3 className="font-medium text-heading">
                    Customize Grinding
                  </h3>
                  <p className="text-sm text-body">
                    Choose texture and preferences as per your need.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-5">
                <div className="w-16 h-16 flex items-center justify-center rounded-full bg-primary-800/10">
                  <HiOutlineSparkles className="text-primary-500 text-2xl" />
                </div>
                <div>
                  <h3 className="font-medium text-heading">Fresh Processing</h3>
                  <p className="text-sm text-body">
                    Hygienic grinding to retain nutrition and taste.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-5">
                <div className="w-16 h-16 flex items-center justify-center rounded-full bg-primary-800/10">
                  <HiOutlineScale className="text-primary-500 text-2xl" />
                </div>
                <div>
                  <h3 className="font-medium text-heading">Home Delivery</h3>
                  <p className="text-sm text-body">
                    Fresh flour delivered straight to your doorstep.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="relative">
            <img
              src="https://picsum.photos/600/600?random=3"
              alt="process"
              className="rounded-xl"
            />

            {/* FLOATING CARD (premium touch 💎) */}
            <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-md p-4 rounded-xl shadow-md">
              <p className="text-sm font-medium text-heading">
                100% Fresh Grinding
              </p>
              <p className="text-xs text-body">
                Prepared only after your order
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-16 text-center text-white">
        <img
          src="https://picsum.photos/1600/900?random=4"
          alt="cta"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/70"></div>

        <div className="relative z-10">
          <h2 className="text-3xl md:text-5xl font-dm-serif mb-6">
            Taste the Difference
          </h2>
          <p className="mb-8 text-neutral-200">
            Once you switch to fresh, there’s no going back.
          </p>

          <div className="flex justify-center gap-4 flex-wrap">
            <button className="bg-primary-500 hover:bg-primary-600 px-8 py-3 rounded-md transition">
              Shop Now
            </button>
            <button className="bg-secondary-500 hover:bg-secondary-600 px-8 py-3 rounded-md transition">
              Book Grinding
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUsPage;
