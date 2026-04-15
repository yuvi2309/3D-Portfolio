import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import emailjs from "@emailjs/browser";

import { linkedinIcon, githubIcon } from "../assets";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const formRef = useRef();
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { xPercent: -5 },
        {
          xPercent: 8,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    emailjs
      .sendForm("service_nypzsys", "template_538pvhj", formRef.current, "JOXRybxMCm7DMW-kd")
      .then(
        () => {
          setLoading(false);
          alert("Thank you. I will get back to you as soon as possible.");
          setForm({ name: "", email: "", message: "" });
        },
        (error) => {
          setLoading(false);
          console.error(error);
          alert("Something went wrong. Please try again.");
        }
      );
  };

  const inputClasses = (field) =>
    `w-full bg-transparent border-b ${
      focused === field ? "border-purple-500" : "border-black/[0.08]"
    } py-4 text-[15px] text-neutral-900 placeholder:text-neutral-400 outline-none transition-colors duration-500 font-normal`;

  return (
    <section
      ref={sectionRef}
      className="relative py-20 sm:py-24 px-6 sm:px-12 lg:px-20 max-w-[1800px] mx-auto overflow-hidden"
    >
      <span className="hash-span" id="contact">&nbsp;</span>

      <h2
        ref={headingRef}
        className="text-[18vw] sm:text-[14vw] font-black text-black/[0.03] leading-none absolute top-12 left-[-10%] select-none pointer-events-none whitespace-nowrap"
      >
        CONTACT
      </h2>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20">
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-8 h-[1px] bg-purple-500" />
              <span className="text-[11px] uppercase tracking-[0.3em] text-purple-600">
                Get in touch
              </span>
            </div>

            <h3 className="text-[40px] sm:text-[56px] lg:text-[64px] font-black text-neutral-900 leading-[1] tracking-tight">
              Let&apos;s
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400">
                talk.
              </span>
            </h3>

            <p className="mt-8 text-[14px] text-neutral-600 leading-[1.9] font-normal max-w-[320px]">
              Have a project in mind, or just want to say hi? I&apos;m always open to new opportunities and conversations.
            </p>
          </div>

          <div className="mt-12 lg:mt-0 space-y-6">
            <div className="flex items-center gap-4">
              <a
                href="https://www.linkedin.com/in/yuvrajnagar/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg border border-black/[0.06] flex items-center justify-center hover:border-purple-400/40 hover:shadow-md hover:shadow-purple-100/20 transition-all cursor-pointer"
              >
                <img src={linkedinIcon} alt="LinkedIn" className="w-5 h-5 opacity-40 hover:opacity-80 transition-opacity" />
              </a>
              <a
                href="https://github.com/yuvi2309"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg border border-black/[0.06] flex items-center justify-center hover:border-purple-400/40 hover:shadow-md hover:shadow-purple-100/20 transition-all cursor-pointer"
              >
                <img src={githubIcon} alt="GitHub" className="w-5 h-5 opacity-40 hover:opacity-80 transition-opacity" />
              </a>
            </div>

            <div className="space-y-2">
              <a href="mailto:dhakadyuvraj23@gmail.com" className="block text-[13px] text-neutral-500 hover:text-purple-600 transition-colors font-normal">
                dhakadyuvraj23@gmail.com
              </a>
              <a href="tel:9770594125" className="block text-[13px] text-neutral-500 hover:text-purple-600 transition-colors font-normal">
                +91 9770594125
              </a>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="space-y-10"
          >
            <div>
              <label className="text-[10px] uppercase tracking-[0.25em] text-neutral-400 mb-2 block">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                onFocus={() => setFocused("name")}
                onBlur={() => setFocused(null)}
                placeholder="Your name"
                className={inputClasses("name")}
              />
            </div>

            <div>
              <label className="text-[10px] uppercase tracking-[0.25em] text-neutral-400 mb-2 block">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                onFocus={() => setFocused("email")}
                onBlur={() => setFocused(null)}
                placeholder="your@email.com"
                className={inputClasses("email")}
              />
            </div>

            <div>
              <label className="text-[10px] uppercase tracking-[0.25em] text-neutral-400 mb-2 block">
                Message
              </label>
              <textarea
                rows={4}
                name="message"
                value={form.message}
                onChange={handleChange}
                onFocus={() => setFocused("message")}
                onBlur={() => setFocused(null)}
                placeholder="Tell me about your project..."
                className={`${inputClasses("message")} resize-none`}
              />
            </div>

            <button
              type="submit"
              className="group relative inline-flex items-center gap-4 text-[12px] uppercase tracking-[0.25em] text-neutral-500 hover:text-neutral-900 transition-colors duration-500 mt-4"
            >
              <span>{loading ? "Sending..." : "Send Message"}</span>
              <div className="w-12 h-[1px] bg-neutral-300 group-hover:w-20 group-hover:bg-purple-500 transition-all duration-700" />
            </button>
          </form>
        </div>
      </div>

      <div className="relative z-10 mt-32 pt-8 border-t border-black/[0.06] flex flex-col sm:flex-row justify-between items-center gap-4">
        <span className="text-[11px] text-neutral-400 font-light">
          &copy; 2026 Yuvraj Nagar. All rights reserved.
        </span>
        <span className="text-[11px] text-neutral-300 font-light">
          Designed with intention.
        </span>
      </div>
    </section>
  );
};

export default Contact;
