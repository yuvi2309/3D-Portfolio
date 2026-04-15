import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";

const Hero = () => {
  const containerRef = useRef(null);
  const nameRef = useRef(null);
  const roleRef = useRef(null);
  const lineRef = useRef(null);
  const marqueeRef = useRef(null);
  const gridRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

    const nameChars = nameRef.current?.querySelectorAll(".name-char");
    if (nameChars) {
      tl.fromTo(
        nameChars,
        { yPercent: 120, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 1.4, delay: 0.2 }
      );
    }

    tl.fromTo(
      roleRef.current,
      { xPercent: 100, opacity: 0 },
      { xPercent: 0, opacity: 1, duration: 1.2 },
      "-=0.8"
    );

    tl.fromTo(
      lineRef.current,
      { scaleX: 0 },
      { scaleX: 1, duration: 1.5, ease: "power4.inOut" },
      "-=1.0"
    );

    // Animate grid blocks
    const blocks = gridRef.current?.querySelectorAll(".grid-block");
    if (blocks) {
      tl.fromTo(
        blocks,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, stagger: 0.04, duration: 0.6, ease: "back.out(1.7)" },
        "-=1.0"
      );
    }

    if (marqueeRef.current) {
      gsap.to(marqueeRef.current, {
        xPercent: -50,
        repeat: -1,
        duration: 20,
        ease: "none",
      });
    }
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 30,
        y: (e.clientY / window.innerHeight - 0.5) * 30,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const splitName = (text) =>
    text.split("").map((ch, i) => (
      <span key={i} className="name-char inline-block">
        {ch}
      </span>
    ));

  // Interactive grid pattern — reacts to mouse
  const gridBlocks = Array.from({ length: 36 }, (_, i) => {
    const row = Math.floor(i / 6);
    const col = i % 6;
    const distX = (col / 5 - 0.5) * 2;
    const distY = (row / 5 - 0.5) * 2;
    const moveX = mousePos.x * distX * 0.4;
    const moveY = mousePos.y * distY * 0.4;
    const isAccent = [7, 14, 16, 23, 28, 35].includes(i);
    return { moveX, moveY, isAccent, delay: (row + col) * 0.03 };
  });

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden flex items-end"
    >
      <div className="noise-overlay" />

      {/* Floating gradient orbs */}
      <div
        className="absolute w-[50vw] h-[50vw] rounded-full blur-[180px] opacity-[0.18] pointer-events-none"
        style={{
          background: "radial-gradient(circle, #c084fc, #f9a8d4, transparent 70%)",
          top: "5%",
          left: "-10%",
          transform: `translate(${mousePos.x * 0.5}px, ${mousePos.y * 0.5}px)`,
          transition: "transform 0.8s cubic-bezier(0.23, 1, 0.32, 1)",
        }}
      />
      <div
        className="absolute w-[35vw] h-[35vw] rounded-full blur-[150px] opacity-[0.15] pointer-events-none"
        style={{
          background: "radial-gradient(circle, #67e8f9, #93c5fd, transparent 70%)",
          bottom: "10%",
          right: "-5%",
          transform: `translate(${mousePos.x * -0.3}px, ${mousePos.y * -0.3}px)`,
          transition: "transform 0.8s cubic-bezier(0.23, 1, 0.32, 1)",
        }}
      />

      {/* Diagonal accent line */}
      <div
        ref={lineRef}
        className="absolute top-[35%] left-0 w-[70vw] h-[1px] origin-left"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(168,85,247,0.3), transparent)",
        }}
      />

      {/* Interactive geometric grid — right side */}
      <div
        ref={gridRef}
        className="hidden md:grid absolute right-[6%] top-1/2 -translate-y-1/2 grid-cols-6 gap-3 w-[320px] lg:w-[380px]"
      >
        {gridBlocks.map((block, i) => (
          <div
            key={i}
            className="grid-block aspect-square rounded-[4px] transition-transform duration-700 ease-out"
            style={{
              transform: `translate(${block.moveX}px, ${block.moveY}px)`,
              background: block.isAccent
                ? "linear-gradient(135deg, #a855f7, #ec4899)"
                : "rgba(0,0,0,0.04)",
              border: block.isAccent ? "none" : "1px solid rgba(0,0,0,0.06)",
              opacity: block.isAccent ? 0.7 : 1,
            }}
          />
        ))}
      </div>

      {/* Main content — left side */}
      <div className="relative z-10 px-6 sm:px-12 lg:px-20 pb-[10vh] w-full max-w-[60%]">
        <div
          ref={roleRef}
          className="flex items-center gap-4 mb-4 ml-1 opacity-0"
        >
          <div className="w-12 h-[1px] bg-purple-500" />
          <span className="text-[11px] sm:text-[13px] uppercase tracking-[0.35em] text-purple-600 font-medium">
            Product Manager &mdash; Fintech
          </span>
        </div>

        <h1
          ref={nameRef}
          className="text-[13vw] sm:text-[10vw] md:text-[8vw] font-black leading-none tracking-[-0.04em] text-neutral-900"
        >
          <span className="block">
            {splitName("YUVRAJ")}
          </span>
          <span className="block">
            {splitName("NAGAR")}
          </span>
        </h1>

        <p className="mt-6 ml-1 max-w-[420px] text-[14px] sm:text-[16px] leading-relaxed text-neutral-600">
          Building enterprise products at the intersection of fintech, AI, and scalable system design.
        </p>
      </div>

      {/* Vertical text element */}
      <div className="hidden md:flex absolute right-8 top-1/2 -translate-y-1/2 flex-col items-center gap-6 z-20">
        <div className="w-[1px] h-16 bg-gradient-to-b from-transparent to-purple-500/40" />
        <span className="text-[10px] uppercase tracking-[0.3em] text-neutral-500 writing-vertical font-medium">
          Portfolio 2026
        </span>
        <div className="w-[1px] h-16 bg-gradient-to-b from-purple-500/40 to-transparent" />
      </div>

      {/* Marquee strip */}
      <div className="absolute bottom-[16vh] sm:bottom-[20vh] left-0 w-[200%] overflow-hidden opacity-[0.05] pointer-events-none">
        <div ref={marqueeRef} className="flex whitespace-nowrap">
          {Array.from({ length: 4 }).map((_, i) => (
            <span
              key={i}
              className="text-[6vw] font-black uppercase tracking-wider mr-[4vw] text-neutral-900"
            >
              PRODUCT &bull; DESIGN &bull; FINTECH &bull; AI &bull;&nbsp;
            </span>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 right-8 sm:right-12 flex flex-col items-center gap-2 z-20">
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-[1px] h-8 bg-gradient-to-b from-purple-500/50 to-transparent"
        />
        <span className="text-[9px] uppercase tracking-[0.25em] text-neutral-500 font-medium">
          Scroll
        </span>
      </div>
    </section>
  );
};

export default Hero;
