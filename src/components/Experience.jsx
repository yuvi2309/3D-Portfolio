import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { experiences } from "../constants";

gsap.registerPlugin(ScrollTrigger);

const ExperienceCard = ({ experience, index }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 60, clipPath: "inset(100% 0 0 0)" },
        {
          opacity: 1,
          y: 0,
          clipPath: "inset(0% 0 0 0)",
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 85%",
          },
        }
      );
    });
    return () => ctx.revert();
  }, [index]);

  return (
    <div ref={cardRef} className="relative group mb-16 sm:mb-20 last:mb-0">
      <div className="absolute -top-4 sm:-top-6 right-0 sm:right-4 text-[60px] sm:text-[80px] font-black text-black/[0.03] leading-none select-none pointer-events-none z-0">
        {experience.date.split(" ")[0]}
      </div>

      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-12 gap-6 sm:gap-10">
        <div className="sm:col-span-3 flex sm:flex-col gap-4 items-start">
          <div
            className="w-14 h-14 rounded-lg flex items-center justify-center border border-black/[0.06] flex-shrink-0 bg-white shadow-sm"
          >
            <img
              src={experience.icon}
              alt={experience.company_name}
              className="w-8 h-8 object-contain"
            />
          </div>
          <div>
            <span className="text-[10px] uppercase tracking-[0.2em] text-purple-600 block">
              {experience.date}
            </span>
            <span className="text-[11px] text-neutral-500 mt-1 block">
              {experience.company_name}
            </span>
          </div>
        </div>

        <div className="sm:col-span-9 border-l border-black/[0.06] pl-6 sm:pl-10 hover:border-purple-400/40 transition-colors duration-700">
          <h3 className="text-[22px] sm:text-[28px] font-bold text-neutral-900 tracking-tight mb-6">
            {experience.title}
          </h3>

          <div className="space-y-4">
            {experience.points.map((point, i) => (
              <div key={i} className="flex gap-4 items-start group/point">
                <span className="text-[10px] text-purple-500/60 font-mono mt-1.5 flex-shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-[13px] sm:text-[14px] text-neutral-600 leading-[1.8] group-hover/point:text-neutral-800 transition-colors duration-300">
                  {point}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-10 sm:mt-14 h-[1px] bg-gradient-to-r from-black/[0.06] via-purple-400/15 to-transparent" />
    </div>
  );
};

const Experience = () => {
  const headingRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { xPercent: 10 },
        {
          xPercent: -5,
          ease: "none",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <section className="relative py-16 sm:py-20 px-6 sm:px-12 lg:px-20 max-w-[1800px] mx-auto overflow-hidden">
      <span className="hash-span" id="work">&nbsp;</span>

      <h2
        ref={headingRef}
        className="text-[16vw] sm:text-[12vw] font-black text-black/[0.03] leading-none absolute top-16 right-[-5%] select-none pointer-events-none whitespace-nowrap"
      >
        WORK
      </h2>

      <div className="relative z-10 mb-20">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-8 h-[1px] bg-purple-500" />
          <span className="text-[11px] uppercase tracking-[0.3em] text-purple-600">
            Where I&apos;ve been
          </span>
        </div>
        <h3 className="text-[36px] sm:text-[48px] font-black text-neutral-900 leading-[1.1] tracking-tight">
          Work
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400">
            Experience.
          </span>
        </h3>
      </div>

      <div className="relative z-10">
        {experiences.map((experience, index) => (
          <ExperienceCard
            key={`experience-${index}`}
            experience={experience}
            index={index}
          />
        ))}
      </div>
    </section>
  );
};

export default Experience;
