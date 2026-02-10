import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  noPadding?: boolean;
  hoverEffect?: boolean;
}

const Card: React.FC<CardProps> = ({ children, className = '', noPadding = false, hoverEffect = false }) => {
  return (
    <div className={`bg-black/40 backdrop-blur-md border border-white/10 text-white rounded-xl ${hoverEffect ? 'hover:border-white/30 hover:shadow-glow-sm transition-all duration-300' : ''} ${noPadding ? '' : 'p-6'} ${className}`}>
      {children}
    </div>
  );
};

export default Card;