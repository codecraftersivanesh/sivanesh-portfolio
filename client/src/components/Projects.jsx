import React, { useEffect, useRef, useState } from 'react';
import avatarImg from '../assets/profile_avatar.jpg';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const getSvgIcon = (presetName) => {
  switch (presetName) {
    case 'netflix':
      return (
        <div className="flex flex-col items-center justify-center">
          <div className="w-24 h-24 rounded-full bg-black flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-500">
            <span className="text-red-600 font-extrabold text-7xl font-sans tracking-tighter select-none">N</span>
          </div>
          <span className="text-red-600 font-bold text-2xl mt-3 select-none">NetflixClone</span>
        </div>
      );
    case 'database':
      return (
        <div className="flex flex-row items-center justify-center gap-2 group-hover:scale-105 transition-transform duration-500">
          <div className="flex flex-col">
            <svg width="40" height="90" viewBox="0 0 40 90" className="opacity-80">
              <path d="M 0 10 A 20 8 0 0 0 40 10 L 40 80 A 20 8 0 0 1 0 80 Z" fill="#2563eb" />
              <ellipse cx="20" cy="10" rx="20" ry="8" fill="#60a5fa" />
              <path d="M 0 35 A 20 8 0 0 0 40 35" fill="none" stroke="#1d4ed8" strokeWidth="2" />
              <path d="M 0 60 A 20 8 0 0 0 40 60" fill="none" stroke="#1d4ed8" strokeWidth="2" />
            </svg>
          </div>
          <div className="flex flex-col -mt-4 z-1">
            <svg width="48" height="100" viewBox="0 0 48 100" className="filter drop-shadow-lg">
              <path d="M 0 12 A 24 9 0 0 0 48 12 L 48 88 A 24 9 0 0 1 0 88 Z" fill="#1e3a8a" />
              <ellipse cx="24" cy="12" rx="24" ry="9" fill="#3b82f6" />
              <path d="M 0 38 A 24 9 0 0 0 48 38" fill="none" stroke="#172554" strokeWidth="2.5" />
              <path d="M 0 63 A 24 9 0 0 0 48 63" fill="none" stroke="#172554" strokeWidth="2.5" />
            </svg>
          </div>
          <div className="flex flex-col">
            <svg width="40" height="90" viewBox="0 0 40 90" className="opacity-80">
              <path d="M 0 10 A 20 8 0 0 0 40 10 L 40 80 A 20 8 0 0 1 0 80 Z" fill="#2563eb" />
              <ellipse cx="20" cy="10" rx="20" ry="8" fill="#60a5fa" />
              <path d="M 0 35 A 20 8 0 0 0 40 35" fill="none" stroke="#1d4ed8" strokeWidth="2" />
              <path d="M 0 60 A 20 8 0 0 0 40 60" fill="none" stroke="#1d4ed8" strokeWidth="2" />
            </svg>
          </div>
        </div>
      );
    case 'billing':
      return (
        <div className="flex flex-col items-center justify-center group-hover:scale-105 transition-transform duration-500">
          <div className="relative">
            <svg width="84" height="84" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500">
              <path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1-2-1Z" />
              <path d="M16 8H8" />
              <path d="M16 12H8" />
              <path d="M13 16H8" />
            </svg>
            <div className="absolute -bottom-1 -right-1 bg-yellow-500 rounded-full w-8 h-8 flex items-center justify-center border-2 border-white shadow-md">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
              </svg>
            </div>
          </div>
          <span className="text-[#111827] font-bold text-xl mt-4 select-none">OwnBillBook</span>
        </div>
      );
    default:
      return (
        <div className="flex flex-col items-center justify-center group-hover:scale-105 transition-transform duration-500 text-gray-400">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="16 18 22 12 16 6"></polyline>
            <polyline points="8 6 2 12 8 18"></polyline>
          </svg>
        </div>
      );
  }
};

const Projects = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [projects, setProjects] = useState([]);
  const sectionRef = useRef(null);

  const defaultProjects = [
    {
      tag: "Flask Website",
      title: "Netflix Clone.",
      type: "svg",
      svgPreset: "netflix"
    },
    {
      tag: "Database Website",
      title: "Login and Signin page.",
      type: "svg",
      svgPreset: "database"
    },
    {
      tag: "billing Web app Website",
      title: "OwnBillBook",
      type: "svg",
      svgPreset: "billing"
    },
    {
      tag: "Portfolio Website",
      title: "Sivanesh Portfolio.",
      type: "image",
      imagePath: "/uploads/profile_avatar.jpg"
    }
  ];

  useEffect(() => {
    // 1. Setup Intersection Observer for animations
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

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    // 2. Fetch projects from Server backend
    const fetchProjects = async () => {
      try {
        const res = await fetch(`${API_URL}/api/projects`);
        if (!res.ok) {
          throw new Error('API server returned error');
        }
        const data = await res.json();
        if (data && data.length > 0) {
          setProjects(data);
        } else {
          setProjects(defaultProjects);
        }
      } catch (err) {
        console.warn('Backend server offline. Falling back to default static project list.', err);
        setProjects(defaultProjects);
      }
    };

    fetchProjects();

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section 
      id="project" 
      className="relative w-full bg-[#0b0b0b] text-white flex flex-col justify-center px-6 py-16 md:px-20 md:py-24 overflow-hidden border-t border-white/5" 
      ref={sectionRef}
    >
      <div className="max-w-[1200px] w-full mx-auto flex flex-col gap-10">
        {/* Header section */}
        <div 
          className={`flex flex-col gap-4 text-left transition-all duration-1000 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="font-mono text-gray-500 text-xs md:text-sm tracking-[3px] uppercase">
            RECENT WORKS
          </span>
          <h2 className="font-mono text-2xl md:text-3xl lg:text-4xl font-bold leading-snug max-w-2xl text-white">
            Here are some of the projects I've enjoyed worked on recently
          </h2>
        </div>

        {/* Projects Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
          {projects.map((project, index) => {
            // Determine image source
            let imageSrc = '';
            if (project.type === 'image') {
              if (project.imagePath === '/uploads/profile_avatar.jpg') {
                imageSrc = avatarImg; // Use local static import
              } else if (project.imagePath && project.imagePath.startsWith('/uploads')) {
                imageSrc = `${API_URL}${project.imagePath}`; // Use server URL
              } else {
                imageSrc = project.imagePath || avatarImg;
              }
            }

            const CardContent = (
              <>
                {/* White visual box container */}
                <div className="bg-white aspect-square rounded-lg flex items-center justify-center overflow-hidden relative shadow-inner w-full">
                  {project.type === "image" ? (
                    <img 
                      src={imageSrc} 
                      alt={project.title} 
                      className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-105"
                      onError={(e) => {
                        e.target.src = avatarImg; // Fallback if image fails to load
                      }}
                      loading="lazy"
                    />
                  ) : (
                    getSvgIcon(project.svgPreset)
                  )}
                  {/* Vignette border overlay inside white box */}
                  <div className="absolute inset-0 border border-black/5 rounded-lg pointer-events-none" />
                </div>

                {/* Text metadata */}
                <div className="flex flex-col text-left w-full relative">
                  <span className="font-mono text-xs text-gray-500 tracking-wide">
                    {project.tag}
                  </span>
                  <div className="flex items-center justify-between gap-2 mt-1">
                    <h3 className="font-mono text-base font-bold text-white group-hover:text-orange-accent transition-colors duration-300 truncate">
                      {project.title}
                    </h3>
                    {project.githubUrl && (
                      <svg className="w-5 h-5 fill-gray-500 group-hover:fill-orange-accent transition-colors duration-300 shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                      </svg>
                    )}
                  </div>
                </div>
              </>
            );

            const cardClasses = "bg-[#121212] p-4 rounded-xl border border-white/5 flex flex-col gap-4 transition-all duration-700 ease-out hover:-translate-y-2 hover:border-white/10 hover:shadow-[0_15px_30px_rgba(0,0,0,0.5)] group";
            const cardStyles = {
              transitionDelay: isVisible ? `${index * 150}ms` : '0ms',
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(40px)'
            };

            if (project.githubUrl) {
              return (
                <a 
                  key={project._id || index}
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${cardClasses} block cursor-pointer`}
                  style={cardStyles}
                >
                  {CardContent}
                </a>
              );
            }

            return (
              <div 
                key={project._id || index}
                className={cardClasses}
                style={cardStyles}
              >
                {CardContent}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Projects;
