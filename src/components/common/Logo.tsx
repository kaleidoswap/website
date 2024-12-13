// src/components/common/Logo.tsx
interface LogoProps {
    className?: string;
  }
  
  export const Logo = ({ className = "w-8 h-8" }: LogoProps) => {
    return (
      <svg 
        className={className} 
        viewBox="0 0 100 100" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#60A5FA" />
            <stop offset="100%" stopColor="#A855F7" />
          </linearGradient>
        </defs>
        <path 
          d="M50 10 L90 90 L10 90 Z" 
          fill="url(#logo-gradient)"
          stroke="currentColor"
          strokeWidth="2"
        />
      </svg>
    );
  };