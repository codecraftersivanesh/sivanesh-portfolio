import React, { useEffect, useState } from 'react';
import deskBg from '../assets/bg-image2.jpg';

const FrontPage = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isBgLoaded, setIsBgLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);

    const img = new Image();
    img.src = deskBg;
    img.onload = () => {
      setIsBgLoaded(true);
    };
  }, []);

  return (
    <div className={`relative w-full min-h-screen bg-[#0b0b0b] text-white font-sans overflow-x-hidden flex flex-col transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      {/* Background Image Container */}
      <div 
        className={`absolute inset-0 bg-cover bg-no-repeat bg-[position:right_30%_center] z-1 will-change-[opacity,filter] transition-all duration-[1200ms] ease-out ${
          isBgLoaded ? 'opacity-85 blur-0 scale-100' : 'opacity-0 blur-2xl scale-[1.05]'
        }`}
        style={{ backgroundImage: `url(${deskBg})` }}
      />
      
      {/* Gradients Overlay */}
      <div 
        className="absolute inset-0 z-2 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 30% 50%, rgba(11, 11, 11, 0.4) 0%, rgba(11, 11, 11, 0.95) 100%),
                       linear-gradient(to right, rgba(11, 11, 11, 1) 0%, rgba(11, 11, 11, 0.8) 35%, rgba(11, 11, 11, 0) 70%, rgba(11, 11, 11, 0.6) 100%)`
        }}
      />

      {/* Navigation Bar */}
      <header className="relative z-10 flex flex-col md:flex-row justify-between items-center px-6 py-8 md:px-20 md:py-10 gap-6 md:gap-0 opacity-0 animate-slide-down [animation-delay:0.2s]">
        <div className="logo-container">
          <a href="#intro" className="font-mono text-xl font-bold tracking-[2px] text-white hover:text-orange-accent transition-colors duration-300">SIVANESH.S</a>
        </div>
        <nav className="flex items-center gap-6 md:gap-10">
          <a href="#intro" className="text-white text-sm font-semibold tracking-[2px] relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-orange-accent after:transition-all after:duration-300 after:w-full">INTRO</a>
          <a href="#about" className="text-gray-400 hover:text-white text-sm font-semibold tracking-[2px] relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-orange-accent after:transition-all after:duration-300 after:w-0 hover:after:w-full">ABOUT</a>
          <a href="#project" className="text-gray-400 hover:text-white text-sm font-semibold tracking-[2px] relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-orange-accent after:transition-all after:duration-300 after:w-0 hover:after:w-full">PROJECT</a>
          <a href="#say-hello" className="border border-white/15 px-6 py-2.5 rounded-full bg-white/2 hover:bg-orange-accent hover:border-orange-accent text-white text-sm font-semibold tracking-[2px] transition-all duration-300 hover:shadow-[0_0_20px_rgba(217,119,6,0.3)] hover:-translate-y-0.5">SAY HELLO</a>
        </nav>
      </header>

      {/* Main Content Area */}
      <main className="relative z-5 flex-grow flex flex-col lg:flex-row items-center justify-between px-6 py-10 md:px-20 md:pb-16 gap-10 lg:gap-0">
        <div className="max-w-[680px] flex flex-col gap-6 text-center lg:text-left items-center lg:items-start opacity-0 animate-fade-in-up [animation-delay:0.5s]">
          <div className="flex items-center gap-4">
            <span className="w-10 h-[2px] bg-orange-accent shadow-[0_0_10px_rgba(217,119,6,0.3)]"></span>
            <span className="font-mono text-orange-accent text-sm font-bold tracking-[3px]">HELLO WORLD</span>
          </div>
          
          <h1 className="font-mono text-3xl md:text-5xl lg:text-[52px] leading-[1.35] font-medium tracking-tight text-white">
            I am <span className="font-bold">Sivanesh</span>,<br />
            Full-stack developer,<br />
            creative and high-performance in Front-end Engineering.
            {/* and <span className="font-bold">Devops </span>
            Engineer. */}
          </h1>
        </div>

        {/* Right Social Sidebar */}
        <aside className="flex flex-row lg:flex-col items-center gap-5 justify-center lg:justify-start w-full lg:w-auto opacity-0 animate-slide-in-left [animation-delay:0.7s]">
          <a 
            href="https://www.linkedin.com/in/sivanesh-saravanan/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center justify-center w-12 h-12 rounded-full bg-white/5 border border-white/8 transition-all duration-300 hover:bg-white hover:border-white hover:-translate-y-1 hover:scale-105 hover:shadow-[0_10px_20px_rgba(255,255,255,0.1)] group"
            aria-label="LinkedIn"
          >
            <svg viewBox="0 0 24 24" className="w-4.5 h-4.5 fill-white group-hover:fill-[#0b0b0b] group-hover:scale-110 transition-all duration-300">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
            </svg>
          </a>
          <a 
            href="https://www.instagram.com/sivaa._.nesh?igsh=MTRvYm8yNnE2M3VkaA==" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center justify-center w-12 h-12 rounded-full bg-white/5 border border-white/8 transition-all duration-300 hover:bg-white hover:border-white hover:-translate-y-1 hover:scale-105 hover:shadow-[0_10px_20px_rgba(255,255,255,0.1)] group"
            aria-label="Instagram"
          >
            <svg viewBox="0 0 24 24" className="w-4.5 h-4.5 fill-white group-hover:fill-[#0b0b0b] group-hover:scale-110 transition-all duration-300">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </a>
          <a 
            href="https://github.com/codecraftersivanesh" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center justify-center w-12 h-12 rounded-full bg-white/5 border border-white/8 transition-all duration-300 hover:bg-white hover:border-white hover:-translate-y-1 hover:scale-105 hover:shadow-[0_10px_20px_rgba(255,255,255,0.1)] group"
            aria-label="GitHub"
          >
            <svg viewBox="0 0 24 24" className="w-4.5 h-4.5 fill-white group-hover:fill-[#0b0b0b] group-hover:scale-110 transition-all duration-300">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
          </a>
          <a 
            href="https://x.com/CodeSivanesh" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center justify-center w-12 h-12 rounded-full bg-white/5 border border-white/8 transition-all duration-300 hover:bg-white hover:border-white hover:-translate-y-1 hover:scale-105 hover:shadow-[0_10px_20px_rgba(255,255,255,0.1)] group"
            aria-label="Twitter"
          >
            <svg viewBox="0 0 24 24" className="w-4.5 h-4.5 fill-white group-hover:fill-[#0b0b0b] group-hover:scale-110 transition-all duration-300">
              <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
            </svg>
          </a>
        </aside>
      </main>
    </div>
  );
};

export default FrontPage;
