import React, { useEffect, useRef, useState } from 'react';
import avatarImg from '../assets/profile.jpeg';
import cv from '../assets/profile.jpeg';

const Details = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isImgLoaded, setIsImgLoaded] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.15,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section 
      id="about" 
      className="relative w-full min-h-screen bg-black text-white flex items-center justify-center px-6 py-16 md:px-20 md:py-24 overflow-hidden border-t border-white/5" 
      ref={sectionRef}
    >
      <div className="grid grid-cols-1 md:grid-cols-[1.1fr_1.9fr] gap-10 md:gap-20 max-w-[1200px] w-full items-center">
        {/* Left Side: Profile Image Frame */}
        <div 
          className={`relative w-full max-w-[320px] md:max-w-none mx-auto aspect-square rounded-lg overflow-hidden bg-[#1a1a1a] border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.8)] transition-all duration-1000 ease-out group ${
            isVisible 
              ? 'opacity-100 translate-y-0 translate-x-0' 
              : 'opacity-0 translate-y-8 md:translate-y-0 md:-translate-x-10'
          }`}
        >
          <img 
            src={avatarImg} 
            alt="S.Sivanesh Profile" 
            className={`w-full h-full object-cover transition-all duration-1000 ease-out group-hover:scale-[1.03] ${
              isImgLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-[1.05]'
            }`}
            onLoad={() => setIsImgLoaded(true)}
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white/[0.03] via-transparent to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>

        {/* Right Side: Info Text & Action */}
        <div 
          className={`flex flex-col gap-8 transition-all duration-1000 ease-out delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="font-mono text-3xl md:text-[44px] font-bold m-0 tracking-tight text-white">S.Sivanesh</h2>
          
          <div className="font-mono text-base md:text-lg leading-[1.7] text-gray-300 flex flex-col gap-5">
            <p className="m-0">
              Hi, I'm Sivanesh &ndash; a <strong className="font-bold text-white">Full-stack Developer and high-performance in Front-end Engineering</strong>.
            </p>
            <p className="m-0">
              I design clean, user-focused interfaces and bring them to life with modern front-end technologies.
            </p>
            <p className="m-0">
              I'm passionate about crafting smooth, responsive, and visually engaging digital experiences.
            </p>
          </div>

          <div className="flex mt-2">
            <a 
              href={cv} 
              className="font-mono inline-flex items-center justify-center border border-white/30 px-9 py-4 rounded-full text-white text-[15px] font-semibold bg-transparent transition-all duration-300 hover:border-white hover:shadow-[0_10px_25px_rgba(255,255,255,0.08)] hover:-translate-y-0.5 relative overflow-hidden group/btn"
            >
              <span className="absolute inset-0 bg-white translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300 ease-out z-1"></span>
              <span className="relative z-10 group-hover/btn:text-black transition-colors duration-300">Download CV</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Details;
