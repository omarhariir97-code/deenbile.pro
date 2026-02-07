
import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
}

const Logo: React.FC<LogoProps> = ({ className = "", size = 48, showText = false }) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div style={{ width: size, height: size }} className="relative flex items-center justify-center">
        {/* Stylized Book/Database Logo reconstruction */}
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-xl">
          {/* Back Book Pages */}
          <path d="M10 40 Q 30 30, 50 40 Q 70 30, 90 40 L 90 80 Q 70 70, 50 80 Q 30 70, 10 80 Z" fill="#4CAF50" fillOpacity="0.8" />
          <path d="M15 35 Q 35 25, 50 35 Q 65 25, 85 35 L 85 75 Q 65 65, 50 75 Q 35 65, 15 75 Z" fill="#9C27B0" fillOpacity="0.6" />
          
          {/* Database Cylinder */}
          <ellipse cx="50" cy="45" rx="20" ry="8" fill="#0066CC" />
          <rect x="30" y="45" width="40" height="25" fill="#0052A3" />
          <ellipse cx="50" cy="70" rx="20" ry="8" fill="#004080" />
          
          {/* Highlight on Cylinder */}
          <path d="M45 45 Q 50 48, 55 45" stroke="white" strokeWidth="1" strokeOpacity="0.5" />
          
          {/* Digital Pixels escaping from top */}
          <rect x="45" y="15" width="5" height="5" fill="#4CAF50" />
          <rect x="52" y="22" width="4" height="4" fill="#F59E0B" />
          <rect x="42" y="28" width="6" height="6" fill="#0066CC" />
        </svg>
      </div>
      {showText && (
        <div className="flex font-black tracking-tight text-xl">
          <span className="text-[#0066CC]">Deen</span>
          <span className="text-[#F59E0B]">Bile</span>
        </div>
      )}
    </div>
  );
};

export default Logo;
