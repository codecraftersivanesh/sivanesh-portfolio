import React, { useEffect, useRef, useState } from 'react';

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);
  const footerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.1,
      }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => {
      if (footerRef.current) {
        observer.unobserve(footerRef.current);
      }
    };
  }, []);

  return (
    <footer 
      id="say-hello" 
      className="relative w-full bg-[#050505] text-white flex flex-col pt-20 pb-8 px-6 md:px-20 overflow-hidden border-t border-white/5" 
      ref={footerRef}
    >
      <div className="max-w-[1200px] w-full mx-auto flex flex-col gap-16">
        
        {/* Top Header & Message */}
        <div 
          className={`flex flex-col gap-6 text-left transition-all duration-1000 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="font-mono text-gray-500 text-xs md:text-sm tracking-[3px] uppercase">
            GET IN TOUCH
          </span>
          <h2 className="font-mono text-xl md:text-2xl lg:text-3xl font-bold leading-relaxed max-w-4xl text-white">
            I love to hear from you. Whether you have<br className="hidden md:inline" />
            a question or just want to chat about<br className="hidden md:inline" />
            design, tech &amp; art &mdash; shoot me a message.
          </h2>
        </div>

        {/* Bottom Details Grid */}
        <div 
          className={`grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6 items-start transition-all duration-1000 ease-out delay-250 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Reach Me At */}
          <div className="flex flex-col gap-3 text-left">
            <span className="font-mono text-gray-500 text-xs tracking-[2px] uppercase">
              REACH ME AT
            </span>
            <div className="font-mono text-sm md:text-base text-gray-300 flex flex-col gap-1">
              <a 
                href="mailto:sivaneshsaravanan2@gmail.com" 
                className="hover:text-orange-accent transition-colors duration-300 w-fit"
              >
                sivaneshsaravanan2@gmail.com
              </a>
              <a 
                href="tel:+918122583536" 
                className="hover:text-orange-accent transition-colors duration-300 w-fit"
              >
                +91 8122583536
              </a>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex flex-col gap-3 text-left">
            <span className="font-mono text-gray-500 text-xs tracking-[2px] uppercase">
              SOCIAL
            </span>
            <div className="font-mono text-sm md:text-base text-gray-300 flex flex-wrap gap-x-2 gap-y-1">
              <a href="https://www.linkedin.com/in/sivanesh-saravanan/" target="_blank" rel="noopener noreferrer" className="hover:text-orange-accent hover:underline transition-all duration-300">Linkedin</a>,
              <a href="https://www.instagram.com/sivaa._.nesh?igsh=MTRvYm8yNnE2M3VkaA==" target="_blank" rel="noopener noreferrer" className="hover:text-orange-accent hover:underline transition-all duration-300">Instagram</a>,
              <a href="https://x.com/CodeSivanesh" target="_blank" rel="noopener noreferrer" className="hover:text-orange-accent hover:underline transition-all duration-300">Twitter</a>,
              <a href="https://github.com/codecraftersivanesh" target="_blank" rel="noopener noreferrer" className="hover:text-orange-accent hover:underline transition-all duration-300">Github</a>
            </div>
          </div>

          {/* Action Button */}
          <div className="flex justify-start md:justify-end items-center h-full">
            <a 
              href="mailto:sivaneshsaravanan2@gmail.com" 
              className="font-mono inline-flex items-center justify-center bg-white text-black px-8 py-3.5 border border-white font-bold text-sm tracking-[2px] transition-all duration-300 hover:bg-transparent hover:text-white hover:shadow-[0_10px_20px_rgba(255,255,255,0.05)] hover:-translate-y-0.5"
            >
              SAY HELLO.
            </a>
          </div>
        </div>

        {/* Separator line */}
        <div className="w-full h-[1px] bg-white/5 mt-4" />

        {/* Copyright bar */}
        <div className="w-full flex flex-col md:flex-row justify-center items-center gap-4 text-center">
          <p className="font-mono text-2xs md:text-xs text-gray-500 tracking-wide select-none">
            &copy; Copyright sivanesh 2026 | Design by <span className="font-bold text-gray-400">Sivanesh</span>
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
