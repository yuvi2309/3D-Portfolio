import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { navLinks } from "../constants";
import { logo, menu, close } from "../assets";

const Navbar = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "py-3 bg-primary/90 backdrop-blur-xl border-b border-black/[0.06]"
          : "py-6 bg-transparent"
      }`}
    >
      <div className="flex justify-between items-center px-6 sm:px-12 lg:px-20 max-w-[1800px] mx-auto">
        <Link
          to="/"
          className="flex items-center gap-3 group"
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0);
          }}
        >
          <img
            src={logo}
            alt="logo"
            className="w-8 h-8 object-contain group-hover:rotate-[360deg] transition-transform duration-700"
          />
          <div className="hidden sm:flex flex-col leading-tight">
            <span className="text-neutral-900 text-[13px] font-semibold tracking-wide">
              Yuvraj
            </span>
            <span className="text-neutral-400 text-[9px] uppercase tracking-[0.2em]">
              Product Manager
            </span>
          </div>
        </Link>

        <ul className="list-none hidden sm:flex items-center gap-1">
          {navLinks.map((link, i) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                onClick={() => setActive(link.title)}
                className={`relative px-5 py-2 text-[12px] uppercase tracking-[0.2em] font-medium transition-colors duration-300 group ${
                  active === link.title ? "text-neutral-900" : "text-neutral-400 hover:text-neutral-700"
                }`}
              >
                {link.title}
                <span
                  className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[1px] bg-purple-500 transition-all duration-500 ${
                    active === link.title ? "w-full" : "w-0 group-hover:w-1/2"
                  }`}
                />
              </a>
              {i < navLinks.length - 1 && (
                <span className="text-neutral-300 text-[10px] mx-1">/</span>
              )}
            </li>
          ))}
        </ul>

        <div className="hidden sm:flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[10px] text-neutral-400 uppercase tracking-widest">
            Available
          </span>
        </div>

        <div className="sm:hidden">
          <img
            src={toggle ? close : menu}
            alt="menu"
            className="w-6 h-6 object-contain cursor-pointer opacity-60"
            onClick={() => setToggle(!toggle)}
          />

          <div
            className={`fixed inset-0 bg-primary/95 backdrop-blur-2xl z-50 flex flex-col items-center justify-center gap-8 transition-all duration-500 ${
              toggle ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
            }`}
          >
            <img
              src={close}
              alt="close"
              className="absolute top-6 right-6 w-6 h-6 cursor-pointer opacity-60"
              onClick={() => setToggle(false)}
            />
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={() => {
                  setToggle(false);
                  setActive(link.title);
                }}
                className="text-[8vw] font-black text-neutral-800 hover:text-neutral-900 tracking-tight transition-colors"
              >
                {link.title}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
