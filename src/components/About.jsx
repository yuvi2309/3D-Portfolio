import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { services } from "../constants";
import { fadeIn } from "../utils/motion";

gsap.registerPlugin(ScrollTrigger);

const ServiceCard = ({ index, title, icon }) => (
  <motion.div
    variants={fadeIn("up", "spring", 0.3 * index, 0.75)}
    className="group relative"
  >
    <div className="relative w-full sm:w-[240px] overflow-hidden">
      <span className="absolute -top-2 -left-1 text-[70px] font-black text-black/[0.04] leading-none select-none z-0">
        0{index + 1}
      </span>

      <div className="relative z-10 border border-black/[0.08] rounded-sm p-7 bg-white/70 backdrop-blur-sm hover:bg-white transition-all duration-500 hover:border-purple-400/30 group-hover:translate-y-[-4px] hover:shadow-lg hover:shadow-purple-100/40">
        <img
          src={icon}
          alt={title}
          className="w-11 h-11 object-contain mb-5 grayscale group-hover:grayscale-0 transition-all duration-500"
        />
        <h3 className="text-neutral-800 text-[14px] font-semibold tracking-wide">
          {title}
        </h3>
        <div className="w-8 h-[1px] bg-purple-500/40 mt-3 group-hover:w-full transition-all duration-700" />
      </div>
    </div>
  </motion.div>
);

const About = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { xPercent: -10 },
        {
          xPercent: 5,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          },
        }
      );

      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 85%",
          },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-20 sm:py-24 px-6 sm:px-12 lg:px-20 max-w-[1800px] mx-auto overflow-hidden"
    >
      <span className="hash-span" id="about">&nbsp;</span>

      <h2
        ref={headingRef}
        className="text-[18vw] sm:text-[14vw] font-black text-black/[0.03] leading-none absolute top-16 left-[-5%] select-none pointer-events-none whitespace-nowrap"
      >
        ABOUT
      </h2>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
        <div className="lg:col-span-4 lg:col-start-1">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-8 h-[1px] bg-purple-500" />
            <span className="text-[11px] uppercase tracking-[0.3em] text-purple-600 font-medium">
              Introduction
            </span>
          </div>
          <h3 className="text-[36px] sm:text-[48px] font-black text-neutral-900 leading-[1.1] tracking-tight">
            Over
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400">
              view.
            </span>
          </h3>
        </div>

        <div className="lg:col-span-6 lg:col-start-6 flex flex-col justify-center">
          <p
            ref={textRef}
            className="text-[15px] sm:text-[16px] text-neutral-600 leading-[1.85] font-normal"
          >
            Product Manager in Fintech at Dice, owning T&amp;E, P2P, AP modules and 
            expanding into invoice discounting. B.Tech in CS from IIT Goa.
            <br /><br />
            I bridge business and technology &mdash; designing scalable policy engines, 
            self-onboarding systems, and AI-driven automation. Strong in enterprise 
            system design, config-heavy products, and driving fintech partnerships.
          </p>

          <div className="flex gap-12 mt-8 pt-6 border-t border-black/[0.08]">
            <div>
              <span className="text-[30px] font-black text-neutral-900">2+</span>
              <p className="text-[10px] uppercase tracking-widest text-neutral-500 mt-1 font-medium">
                Years Exp
              </p>
            </div>
            <div>
              <span className="text-[30px] font-black text-neutral-900">5+</span>
              <p className="text-[10px] uppercase tracking-widest text-neutral-500 mt-1 font-medium">
                Products
              </p>
            </div>
            <div>
              <span className="text-[30px] font-black text-neutral-900">11+</span>
              <p className="text-[10px] uppercase tracking-widest text-neutral-500 mt-1 font-medium">
                Technologies
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 mt-16 flex flex-wrap gap-5 sm:gap-6 justify-start">
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>
    </section>
  );
};

export default About;
