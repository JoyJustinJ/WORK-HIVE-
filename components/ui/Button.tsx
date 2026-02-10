import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  fullWidth?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false,
  size = 'md',
  className = '',
  ...props 
}) => {
  // Updated baseStyle to rounded-sm for dashboard, but Landing Page uses explicit classes.
  // Keeping general components clean and premium.
  const baseStyle = "font-medium transition-all duration-200 flex items-center justify-center gap-2 rounded-sm border";
  
  const sizeStyles = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-6 py-2.5 text-sm",
    lg: "px-8 py-3.5 text-base"
  };

  const variants = {
    primary: "bg-black text-white border-black hover:bg-zinc-800 shadow-none hover:shadow-lg",
    secondary: "bg-white text-black border-gray-300 hover:border-black hover:bg-gray-50",
    outline: "bg-transparent border-black text-black hover:bg-black hover:text-white",
    ghost: "bg-transparent border-transparent text-gray-600 hover:text-black hover:bg-gray-100"
  };

  return (
    <button 
      className={`${baseStyle} ${sizeStyles[size]} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;