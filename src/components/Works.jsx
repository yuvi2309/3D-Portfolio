import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { github } from "../assets";
import { projects } from "../constants";

gsap.registerPlugin(ScrollTrigger);

// Animated visual for each project type
const ProjectVisual = ({ index, name }) => {
  const visRef = useRef(null);

  useEffect(() => {
    const el = visRef.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      // Animate inner shapes
      const shapes = el.querySelectorAll(".anim-shape");
      gsap.fromTo(
        shapes,
        { scale: 0, opacity: 0, rotation: -20 },
        {
          scale: 1,
          opacity: 1,
          rotation: 0,
          stagger: 0.08,
          duration: 0.8,
          ease: "back.out(1.7)",
          scrollTrigger: { trigger: el, start: "top 85%" },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  const visuals = [
    // Text Summarizer — flowing text lines
    (
      <div ref={visRef} className="relative w-full h-full flex flex-col justify-center items-center gap-2 p-6">
        {[100, 80, 95, 60, 85, 40].map((w, i) => (
          <div
            key={i}
            className="anim-shape h-[3px] rounded-full"
            style={{
              width: `${w}%`,
              background: i < 3
                ? `linear-gradient(90deg, #a855f7, #ec4899)`
                : `rgba(0,0,0,${0.06 + i * 0.01})`,
              opacity: i < 3 ? 0.7 : 0.4,
            }}
          />
        ))}
        <div className="anim-shape mt-3 px-4 py-1.5 border border-purple-400/30 rounded-full">
          <span className="text-[10px] text-purple-600 font-medium tracking-wider">SUMMARIZED</span>
        </div>
      </div>
    ),
    // Fashion Style Transfer — overlapping circles
    (
      <div ref={visRef} className="relative w-full h-full flex items-center justify-center">
        <div className="anim-shape absolute w-24 h-24 rounded-full border-2 border-pink-400/40 -translate-x-4" />
        <div className="anim-shape absolute w-24 h-24 rounded-full border-2 border-purple-400/40 translate-x-4" />
        <div className="anim-shape absolute w-16 h-16 rounded-full bg-gradient-to-br from-pink-400/20 to-purple-400/20" />
        <span className="anim-shape absolute text-[9px] uppercase tracking-widest text-purple-500 font-semibold mt-20">Transfer</span>
      </div>
    ),
    // Nifty 50 — chart bars
    (
      <div ref={visRef} className="relative w-full h-full flex items-end justify-center gap-2 p-8 pb-10">
        {[40, 65, 50, 80, 55, 90, 70, 45, 75, 60].map((h, i) => (
          <div
            key={i}
            className="anim-shape w-3 rounded-t-sm"
            style={{
              height: `${h}%`,
              background: i >= 7
                ? "linear-gradient(to top, #a855f7, #ec4899)"
                : `rgba(0,0,0,${0.08 + i * 0.01})`,
            }}
          />
        ))}
        <div className="absolute bottom-6 left-8 right-8 h-[1px] bg-black/[0.08]" />
      </div>
    ),
    // MovieLand — film strip
    (
      <div ref={visRef} className="relative w-full h-full flex items-center justify-center">
        <div className="flex gap-2">
          {[0, 1, 2].map((i) => (
            <div key={i} className="anim-shape w-16 h-20 border border-black/[0.08] rounded-sm flex flex-col items-center justify-center gap-1 bg-white/80">
              <div className="w-10 h-8 rounded-sm" style={{ background: ["#f0abfc", "#c4b5fd", "#93c5fd"][i], opacity: 0.4 }} />
              <div className="w-8 h-[2px] bg-black/[0.06] rounded-full" />
              <div className="w-6 h-[2px] bg-black/[0.04] rounded-full" />
            </div>
          ))}
        </div>
      </div>
    ),
    // Movie Recommender — connected nodes
    (
      <div ref={visRef} className="relative w-full h-full flex items-center justify-center">
        <svg viewBox="0 0 120 120" className="w-28 h-28">
          <line x1="60" y1="30" x2="30" y2="70" stroke="#a855f7" strokeWidth="1" opacity="0.3" className="anim-shape" />
          <line x1="60" y1="30" x2="90" y2="70" stroke="#a855f7" strokeWidth="1" opacity="0.3" className="anim-shape" />
          <line x1="30" y1="70" x2="90" y2="70" stroke="#ec4899" strokeWidth="1" opacity="0.3" className="anim-shape" />
          <line x1="60" y1="30" x2="60" y2="95" stroke="#a855f7" strokeWidth="1" opacity="0.2" className="anim-shape" />
          <circle cx="60" cy="30" r="8" fill="#a855f7" opacity="0.6" className="anim-shape" />
          <circle cx="30" cy="70" r="6" fill="#ec4899" opacity="0.5" className="anim-shape" />
          <circle cx="90" cy="70" r="6" fill="#8b5cf6" opacity="0.5" className="anim-shape" />
          <circle cx="60" cy="95" r="5" fill="#f472b6" opacity="0.4" className="anim-shape" />
        </svg>
      </div>
    ),
  ];

  return (
    <div className="aspect-[16/10] bg-gradient-to-br from-white to-neutral-50 border border-black/[0.06] rounded-sm overflow-hidden">
      {visuals[index] || visuals[0]}
    </div>
  );
};

const ProjectCard = ({ project, index }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 60, clipPath: "inset(0 0 100% 0)" },
        {
          opacity: 1,
          y: 0,
          clipPath: "inset(0 0 0% 0)",
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 85%",
          },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  const isEven = index % 2 === 0;

  return (
    <div
      ref={cardRef}
      className="group relative grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-0 mb-16 sm:mb-20 last:mb-0"
      style={{ direction: "ltr" }}
    >
      {/* Animated visual instead of image */}
      <div
        className={`lg:col-span-5 relative overflow-hidden ${
          isEven ? "lg:col-start-1" : "lg:col-start-7"
        }`}
      >
        <ProjectVisual index={index} name={project.name} />
        <span className="absolute top-3 left-5 text-[60px] sm:text-[80px] font-black text-black/[0.04] leading-none select-none pointer-events-none">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      {/* Content */}
      <div
        className={`lg:col-span-7 relative z-10 flex flex-col justify-center ${
          isEven ? "lg:col-start-6 lg:pl-8" : "lg:col-start-1 lg:row-start-1 lg:pr-8 lg:text-right"
        }`}
      >
        <span className={`text-[10px] uppercase tracking-[0.25em] text-purple-600 mb-2 font-medium ${!isEven ? "lg:ml-auto" : ""}`}>
          Featured Project
        </span>

        <h3 className="text-[24px] sm:text-[30px] font-black text-neutral-900 tracking-tight mb-3 leading-[1.1]">
          {project.name}
        </h3>

        <div className={`bg-white/90 backdrop-blur-xl border border-black/[0.06] p-5 sm:p-6 rounded-sm mb-3 shadow-lg shadow-black/[0.03] ${!isEven ? "lg:ml-auto" : ""}`}>
          <p className="text-[13px] sm:text-[14px] text-neutral-600 leading-[1.8] font-normal">
            {project.description}
          </p>
        </div>

        <div className={`flex flex-wrap gap-3 mb-3 ${!isEven ? "lg:justify-end" : ""}`}>
          {project.tags.map((tag) => (
            <span
              key={tag.name}
              className="text-[11px] font-mono text-purple-500/70 hover:text-purple-600 transition-colors"
            >
              {tag.name}
            </span>
          ))}
        </div>

        <div className={`flex ${!isEven ? "lg:justify-end" : ""}`}>
          <div
            onClick={() => window.open(project.source_code_link, "_blank")}
            className="flex items-center gap-2 cursor-pointer group/link"
          >
            <img src={github} alt="code" className="w-5 h-5 object-contain opacity-40 group-hover/link:opacity-70 transition-opacity" />
            <span className="text-[11px] uppercase tracking-[0.15em] text-neutral-500 group-hover/link:text-neutral-700 transition-colors font-medium">
              View Code
            </span>
            <div className="w-0 group-hover/link:w-8 h-[1px] bg-purple-500 transition-all duration-500" />
          </div>
        </div>
      </div>
    </div>
  );
};

const Works = () => {
  const headingRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { xPercent: 5 },
        {
          xPercent: -8,
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
    <section className="relative py-20 sm:py-24 px-6 sm:px-12 lg:px-20 max-w-[1800px] mx-auto overflow-hidden">
      <h2
        ref={headingRef}
        className="text-[16vw] sm:text-[12vw] font-black text-black/[0.03] leading-none absolute top-12 left-[10%] select-none pointer-events-none whitespace-nowrap"
      >
        PROJECTS
      </h2>

      <div className="relative z-10 mb-16 sm:mb-20">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-8 h-[1px] bg-purple-500" />
          <span className="text-[11px] uppercase tracking-[0.3em] text-purple-600 font-medium">
            Selected work
          </span>
        </div>
        <h3 className="text-[36px] sm:text-[48px] font-black text-neutral-900 leading-[1.1] tracking-tight">
          Proj
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400">
            ects.
          </span>
        </h3>
        <p className="mt-4 max-w-[500px] text-[14px] text-neutral-600 leading-[1.8] font-normal">
          Real-world projects showcasing skills across ML, web development, and data analysis.
        </p>
      </div>

      <div className="relative z-10">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.name}
            project={project}
            index={index}
          />
        ))}
      </div>
    </section>
  );
};

export default Works;
