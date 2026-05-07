import kaleidoPictogram from '@/assets/kaleidoswap-pictogram.svg'

interface LogoProps {
  className?: string;
}

export const Logo = ({ className = "w-8 h-8" }: LogoProps) => {
  return (
    <img src={kaleidoPictogram} className={className} alt="KaleidoSwap" />
  );
};
