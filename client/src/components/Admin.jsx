import React, { useState, useEffect } from 'react';
import avatarImg from '../assets/profile_avatar.jpg';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// Helper to render preset SVG icons for default seeded projects
const getSvgIcon = (presetName) => {
  switch (presetName) {
    case 'netflix':
      return (
        <div className="flex flex-col items-center justify-center scale-75">
          <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center shadow-lg">
            <span className="text-red-600 font-extrabold text-3xl font-sans tracking-tighter select-none">N</span>
          </div>
        </div>
      );
    case 'database':
      return (
        <div className="flex flex-row items-center justify-center gap-0.5 scale-75">
          <svg width="20" height="45" viewBox="0 0 40 90" className="opacity-80">
            <path d="M 0 10 A 20 8 0 0 0 40 10 L 40 80 A 20 8 0 0 1 0 80 Z" fill="#2563eb" />
            <ellipse cx="20" cy="10" rx="20" ry="8" fill="#60a5fa" />
          </svg>
        </div>
      );
    case 'billing':
      return (
        <div className="flex flex-col items-center justify-center scale-75">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500">
            <path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1-2-1Z" />
          </svg>
        </div>
      );
    default:
      return (
        <div className="flex flex-col items-center justify-center text-gray-400 scale-75">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="16 18 22 12 16 6"></polyline>
            <polyline points="8 6 2 12 8 18"></polyline>
          </svg>
        </div>
      );
  }
};

const Admin = () => {
  const [title, setTitle] = useState('');
  const [tag, setTag] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  
  const [projects, setProjects] = useState([]);
  const [isLoadingProjects, setIsLoadingProjects] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchProjects = async () => {
    setIsLoadingProjects(true);
    try {
      const res = await fetch(`${API_URL}/api/projects`);
      if (res.ok) {
        const data = await res.json();
        setProjects(data);
      } else {
        console.error('Failed to fetch projects list');
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setIsLoadingProjects(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleDelete = async (projectId) => {
    if (!window.confirm('Are you sure you want to delete this project?')) {
      return;
    }
    
    try {
      const res = await fetch(`${API_URL}/api/projects/${projectId}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        throw new Error('Failed to delete project from server.');
      }

      // Remove from list state
      setProjects((prev) => prev.filter((p) => p._id !== projectId));
      setStatus({ type: 'success', message: 'Project deleted successfully!' });
    } catch (error) {
      console.error('Delete error:', error);
      setStatus({ type: 'error', message: `Delete failed: ${error.message}` });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !tag) {
      setStatus({ type: 'error', message: 'Title and Tag are required.' });
      return;
    }

    setIsSubmitting(true);
    setStatus({ type: '', message: '' });

    try {
      let imagePath = '';

      // Upload cover image
      if (imageFile) {
        const formData = new FormData();
        formData.append('image', imageFile);

        const uploadRes = await fetch(`${API_URL}/api/upload`, {
          method: 'POST',
          body: formData,
        });

        if (!uploadRes.ok) {
          throw new Error('Failed to upload image file.');
        }

        const uploadData = await uploadRes.json();
        imagePath = uploadData.url;
      }

      // Submit project payload (always type 'image' for new dashboard entries)
      const projectPayload = {
        title,
        tag,
        type: 'image',
        imagePath: imagePath || '/uploads/profile_avatar.jpg',
        githubUrl: githubUrl || undefined
      };

      const projectRes = await fetch(`${API_URL}/api/projects`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(projectPayload),
      });

      if (!projectRes.ok) {
        throw new Error('Failed to save project metadata.');
      }

      const newProjectData = await projectRes.json();
      
      // Update local state instantly with new project returned from backend
      if (newProjectData && newProjectData.project) {
        setProjects((prev) => [...prev, newProjectData.project]);
      } else {
        // Fallback to fetching everything again
        fetchProjects();
      }

      setStatus({ type: 'success', message: 'Project added successfully!' });
      
      // Reset form fields
      setTitle('');
      setTag('');
      setGithubUrl('');
      setImageFile(null);
      setPreviewUrl('');
    } catch (error) {
      console.error('Submission error:', error);
      setStatus({ 
        type: 'error', 
        message: `Error: ${error.message}. Make sure the server backend is running on port 5000.` 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative w-full min-h-screen bg-[#0b0b0b] text-white font-sans flex flex-col items-center justify-center p-6 md:p-12">
      
      {/* Decorative Blur Backdrops */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-accent/10 rounded-full filter blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-accent/5 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-6xl bg-[#121212] border border-white/5 rounded-2xl p-8 shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
        {/* Header */}
        <div className="flex justify-between items-center mb-8 pb-4 border-b border-white/5">
          <h2 className="font-mono text-2xl font-bold tracking-tight">Admin Dashboard</h2>
          <a 
            href="#home" 
            className="font-mono text-xs text-gray-400 hover:text-white border border-white/10 hover:border-white/30 px-3 py-1.5 rounded-full transition-all duration-300"
          >
            ← Back Home
          </a>
        </div>

        {/* Responsive Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left">
          
          {/* Left Column: Project Form */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <h3 className="font-mono text-lg font-bold text-orange-accent border-b border-white/5 pb-2">Add New Project</h3>
            
            {/* Status Messages */}
            {status.message && (
              <div className={`p-4 rounded-lg font-mono text-sm border ${
                status.type === 'success' 
                  ? 'bg-green-500/10 border-green-500/30 text-green-400' 
                  : 'bg-red-500/10 border-red-500/30 text-red-400'
              }`}>
                {status.message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              
              {/* Title */}
              <div className="flex flex-col gap-2">
                <label className="font-mono text-xs text-gray-400 uppercase tracking-wider">Project Title</label>
                <input 
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. E-Commerce Dashboard"
                  className="bg-[#181818] border border-white/10 rounded-lg px-4 py-3 text-white font-mono placeholder-gray-600 focus:outline-none focus:border-orange-accent transition-colors duration-300"
                  required
                />
              </div>

              {/* Tag */}
              <div className="flex flex-col gap-2">
                <label className="font-mono text-xs text-gray-400 uppercase tracking-wider">Project Tag</label>
                <input 
                  type="text"
                  value={tag}
                  onChange={(e) => setTag(e.target.value)}
                  placeholder="e.g. React App / Node Backend"
                  className="bg-[#181818] border border-white/10 rounded-lg px-4 py-3 text-white font-mono placeholder-gray-600 focus:outline-none focus:border-orange-accent transition-colors duration-300"
                  required
                />
              </div>

              {/* GitHub URL */}
              <div className="flex flex-col gap-2">
                <label className="font-mono text-xs text-gray-400 uppercase tracking-wider">GitHub Repository URL</label>
                <input 
                  type="url"
                  value={githubUrl}
                  onChange={(e) => setGithubUrl(e.target.value)}
                  placeholder="e.g. https://github.com/username/project"
                  className="bg-[#181818] border border-white/10 rounded-lg px-4 py-3 text-white font-mono placeholder-gray-600 focus:outline-none focus:border-orange-accent transition-colors duration-300"
                />
              </div>

              {/* Cover Image Upload */}
              <div className="flex flex-col gap-3">
                <label className="font-mono text-xs text-gray-400 uppercase tracking-wider">Upload Cover Image</label>
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-white/10 hover:border-white/20 rounded-lg cursor-pointer bg-[#181818] transition-colors duration-300">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg className="w-8 h-8 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                      </svg>
                      <p className="mb-2 text-xs text-gray-400 font-mono"><span className="font-bold">Click to upload</span> or drag and drop</p>
                      <p className="text-[10px] text-gray-500 font-mono">PNG, JPG or WEBP (Square Recommended)</p>
                    </div>
                    <input 
                      type="file" 
                      className="hidden" 
                      onChange={handleFileChange}
                      accept="image/*"
                    />
                  </label>
                </div>

                {/* Upload Preview */}
                {previewUrl && (
                  <div className="mt-2 text-center animate-fade-in-up [animation-duration:300ms]">
                    <span className="font-mono text-[10px] text-gray-500 uppercase tracking-wider block mb-2">Upload Preview</span>
                    <div className="w-24 h-24 mx-auto rounded-lg overflow-hidden border border-white/10 bg-white flex items-center justify-center">
                      <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="font-mono mt-4 w-full bg-orange-accent hover:bg-orange-600 disabled:bg-gray-700 text-white py-4 rounded-lg font-bold transition-all duration-300 shadow-[0_0_25px_rgba(217,119,6,0.2)] hover:shadow-[0_0_35px_rgba(217,119,6,0.3)] hover:-translate-y-0.5"
              >
                {isSubmitting ? 'Submitting...' : 'Add Project to Server'}
              </button>

            </form>
          </div>

          {/* Vertical Divider */}
          <div className="hidden lg:block lg:col-span-1 border-r border-white/5 h-full min-h-[450px] self-stretch" />

          {/* Right Column: Existing Projects List */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <h3 className="font-mono text-lg font-bold text-orange-accent border-b border-white/5 pb-2">Already Added Projects</h3>
            
            {isLoadingProjects ? (
              <div className="font-mono text-sm text-gray-500 animate-pulse">Loading project data from database...</div>
            ) : projects.length === 0 ? (
              <div className="font-mono text-sm text-gray-400 italic">No projects exist in the database.</div>
            ) : (
              <div className="flex flex-col gap-4 overflow-y-auto max-h-[550px] pr-2 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                {projects.map((project) => {
                  let imageSrc = '';
                  if (project.type === 'image') {
                    if (project.imagePath === '/uploads/profile_avatar.jpg') {
                      imageSrc = avatarImg;
                    } else if (project.imagePath && project.imagePath.startsWith('/uploads')) {
                      imageSrc = `${API_URL}${project.imagePath}`;
                    } else {
                      imageSrc = project.imagePath || avatarImg;
                    }
                  }

                  return (
                    <div 
                      key={project._id}
                      className="bg-[#181818] p-4 rounded-xl border border-white/5 flex items-center justify-between gap-4 transition-all duration-300 hover:border-white/10 hover:bg-[#202020]"
                    >
                      {/* Left: Project Info */}
                      <div className="flex items-center gap-4 min-w-0">
                        {/* Miniature Preview Box */}
                        <div className="bg-white w-16 h-16 rounded-lg flex items-center justify-center overflow-hidden shrink-0 border border-white/5 shadow-inner">
                          {project.type === "image" ? (
                            <img 
                              src={imageSrc} 
                              alt={project.title} 
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.target.src = avatarImg;
                              }}
                            />
                          ) : (
                            getSvgIcon(project.svgPreset)
                          )}
                        </div>

                        {/* Text Metadata */}
                        <div className="min-w-0 flex flex-col">
                          <span className="font-mono text-[10px] text-gray-500 tracking-wide uppercase truncate">
                            {project.tag}
                          </span>
                          <h4 className="font-mono text-sm font-bold text-white truncate mt-0.5">
                            {project.title}
                          </h4>
                          {project.githubUrl && (
                            <a 
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-mono text-[10px] text-orange-accent hover:underline flex items-center gap-1.5 mt-1"
                            >
                              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                              </svg>
                              View Code
                            </a>
                          )}
                        </div>
                      </div>

                      {/* Delete Button */}
                      <button
                        onClick={() => handleDelete(project._id)}
                        className="font-mono text-[11px] text-red-400 hover:text-white border border-red-500/20 hover:border-red-500 hover:bg-red-500 px-2.5 py-1.5 rounded-lg transition-all duration-300 flex items-center gap-1.5 select-none shrink-0"
                      >
                        <svg className="w-3.5 h-3.5 stroke-current fill-none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Delete
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Admin;
