interface LogoProps {
  className?: string;
}

export const Logo = ({ className = "w-8 h-8" }: LogoProps) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 188 39" fill="none">
      <g clip-path="url(#clip0_248_4953)">
      <path d="M14 14.0391L14 28.0196L7.00208 21.0314L14 14.0391Z" fill="#8FD5EA"/>
      <path d="M28 0.0542004L28 14.0348L21.0021 7.04656L28 0.0542004Z" fill="#FFF970"/>
      <path d="M42 0.0541992L35.0021 7.04656L28 0.0541992L42 0.0541992Z" fill="#A788FF"/>
      <path d="M14 0L7.00209 6.99236L0 0H14Z" fill="#A788FF"/>
      <path d="M14 42.0002H0L7.00209 35.0078L14 42.0002Z" fill="#A788FF"/>
      <path d="M28 28.0151L28 41.9999L21.0021 35.0075L28 28.0151Z" fill="#FFF970"/>
      <path d="M42 42.0002H28L35.0021 35.0078L42 42.0002Z" fill="#A788FF"/>
      <path d="M21.0021 21.027L14 28.0152L14 14.0347L21.0021 21.027Z" fill="#7AC3D9"/>
      <path d="M35.0021 35.0075L28 41.9999L28 28.0151L35.0021 35.0075Z" fill="#F1EA3C"/>
      <path d="M28 28.0155L14 28.0155L21.0021 21.0273L28 28.0155Z" fill="#FD9B99"/>
      <path d="M28 28.0151L21.0021 35.0075L14 28.0151L28 28.0151Z" fill="#F58D8A"/>
      <path d="M28 14.0347L21.0021 21.027L14 14.0347L28 14.0347Z" fill="#FD9B99"/>
      <path d="M28 14.0346L14 14.0346L21.0021 7.04639L28 14.0346Z" fill="#F58D8A"/>
      <path d="M35.0021 7.04656L28 14.0348L28 0.0541992L35.0021 7.04656Z" fill="#F1EA3C"/>
      </g>
      <defs>
        <clipPath id="clip0_248_4953">
          <rect width="42" height="42" fill="white"/>
        </clipPath>
      </defs>
    </svg>
  );
}; 