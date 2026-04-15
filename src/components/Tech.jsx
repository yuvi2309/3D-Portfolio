import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { technologies } from "../constants";

gsap.registerPlugin(ScrollTrigger);

const techDescriptions = {
  "Python": "Primary language for ML, scripting & automation",
  "SQL": "Complex queries, data pipelines & analytics",
  "JavaScript": "Frontend logic, APIs & interactive UIs",
  "React JS": "SPA development with component architecture",
  "Figma": "Wireframing, prototyping & design systems",
  "Jira": "Sprint planning, roadmaps & agile workflows",
  "Notion": "Documentation, wikis & product specs",
  "Postman": "API testing, mock servers & collections",
  "Tailwind CSS": "Utility-first styling & responsive design",
  "Node JS": "Backend services, REST APIs & tooling",
  "Git": "Version control, branching & CI/CD pipelines",
};

const Tech = () => {
  const containerRef = useRef(null);
  const itemsRef = useRef([]);
  const headingRef = useRef(null);
  const [hoveredIdx, setHoveredIdx] = useState(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { xPercent: -8 },
        {
          xPercent: 3,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          },
        }
      );

      itemsRef.current.forEach((el, i) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { opacity: 0, y: 30, scale: 0.85 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.5,
            ease: "back.out(1.4)",
            scrollTrigger: {
              trigger: el,
              start: "top 92%",
            },
            delay: i * 0.05,
          }
        );
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative py-16 sm:py-20 px-6 sm:px-12 lg:px-20 max-w-[1800px] mx-auto overflow-hidden"
    >
      <h2
        ref={headingRef}
        className="text-[18vw] sm:text-[14vw] font-black text-black/[0.03] leading-none absolute top-6 left-[-8%] select-none pointer-events-none whitespace-nowrap"
      >
        STACK
      </h2>

      <div className="relative z-10 mb-12">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-8 h-[1px] bg-purple-500" />
          <span className="text-[11px] uppercase tracking-[0.3em] text-purple-600 font-medium">
            My toolkit
          </span>
        </div>
        <h3 className="text-[36px] sm:text-[48px] font-black text-neutral-900 leading-[1.1] tracking-tight">
          Tech
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500">
            Stack.
          </span>
        </h3>
      </div>

      {/* 2D Grid layout */}
      <div className="relative z-10 grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-5 max-w">
        {technologies.map((tech, i) => (
          <div
            key={tech.name}
            ref={(el) => (itemsRef.current[i] = el)}
            className="group relative cursor-crosshair"
            onMouseEnter={() => setHoveredIdx(i)}
            onMouseLeave={() => setHoveredIdx(null)}
          >
            <div className="flex flex-col items-center text-center p-4 sm:p-5 border border-black/[0.06] rounded-lg bg-white/60 backdrop-blur-sm hover:bg-white hover:border-purple-400/30 hover:shadow-lg hover:shadow-purple-100/30 hover:-translate-y-1 transition-all duration-400">
              <img
                src={tech.icon}
                alt={tech.name}
                className="w-9 h-9 sm:w-10 sm:h-10 object-contain mb-3 transition-transform duration-300 group-hover:scale-110"
              />
              <span className="text-[11px] sm:text-[12px] text-neutral-700 font-medium tracking-wide">
                {tech.name}
              </span>
            </div>

            {/* Hover description tooltip */}
            {hoveredIdx === i && techDescriptions[tech.name] && (
              <div className="absolute left-1/2 -translate-x-1/2 -bottom-2 translate-y-full z-30 w-[200px] px-3 py-2 bg-neutral-900 text-white text-[11px] leading-relaxed rounded-md shadow-xl pointer-events-none animate-fade-in">
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-neutral-900 rotate-45" />
                {techDescriptions[tech.name]}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Tech;
