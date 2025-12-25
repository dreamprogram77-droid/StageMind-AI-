
import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const Logo: React.FC<LogoProps> = ({ className = "", size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24'
  };

  return (
    <div className={`relative group ${sizeClasses[size]} ${className}`}>
      {/* Glow Effect */}
      <div className="absolute inset-0 bg-indigo-500/20 blur-xl rounded-full group-hover:bg-indigo-500/40 transition-all duration-700" />
      
      <svg 
        viewBox="0 0 100 100" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="relative z-10 w-full h-full drop-shadow-[0_0_15px_rgba(100,255,218,0.3)]"
      >
        {/* Stage Arcs (Theatre Seating) */}
        <path 
          d="M20 75C20 75 35 60 50 60C65 60 80 75 80 75" 
          stroke="currentColor" 
          strokeWidth="4" 
          strokeLinecap="round" 
          className="text-white/20 group-hover:text-indigo-400 transition-colors duration-500"
        />
        <path 
          d="M10 85C10 85 30 65 50 65C70 65 90 85 90 85" 
          stroke="currentColor" 
          strokeWidth="4" 
          strokeLinecap="round" 
          className="text-white/10 group-hover:text-indigo-500/50 transition-colors duration-700"
        />
        
        {/* AI Brain Structure */}
        <circle cx="50" cy="35" r="8" fill="url(#logoGradient)" className="animate-pulse" />
        
        {/* Synapses (Connections) */}
        <line x1="50" y1="35" x2="30" y2="45" stroke="url(#logoGradient)" strokeWidth="2" strokeDasharray="4 2" className="animate-[dash_2s_linear_infinite]" />
        <line x1="50" y1="35" x2="70" y2="45" stroke="url(#logoGradient)" strokeWidth="2" strokeDasharray="4 2" className="animate-[dash_2s_linear_infinite_reverse]" />
        <line x1="50" y1="35" x2="50" y2="55" stroke="url(#logoGradient)" strokeWidth="2" strokeDasharray="4 2" />
        
        <circle cx="30" cy="45" r="4" fill="#64FFDA" />
        <circle cx="70" cy="45" r="4" fill="#64FFDA" />
        <circle cx="50" cy="58" r="5" fill="#FFB400" />

        <defs>
          <linearGradient id="logoGradient" x1="50" y1="20" x2="50" y2="60" gradientUnits="userSpaceOnUse">
            <stop stopColor="#64FFDA" />
            <stop offset="1" stopColor="#6366F1" />
          </linearGradient>
          <style>
            {`
              @keyframes dash {
                to { stroke-dashoffset: -10; }
              }
            `}
          </style>
        </defs>
      </svg>
    </div>
  );
};

export default Logo;
