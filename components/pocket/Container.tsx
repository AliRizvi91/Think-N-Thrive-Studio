import React, { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
  className?: string;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'Exl' | 'full';
  centered?: boolean;
  style?: React.CSSProperties;
}

const Container: React.FC<ContainerProps> = ({
  children,
  className = '',
  maxWidth = 'lg',
  centered = true,
  style = {},
}) => {
  // Responsive max-width mapping
  const maxWidthMap: Record<string, string> = {
    xs: '100%',      // full width on mobile
    sm: '30rem',     // small screens
    md: '48rem',     // medium screens
    lg: '64rem',     // large screens
    xl: '80rem',     // extra large
    Exl: '100rem',   // extra extra large
    full: '100%',
  };

  const containerStyle: React.CSSProperties = {
    width: '100%',
    maxWidth: maxWidthMap[maxWidth],
    margin: centered ? '0 auto' : '0',
    padding: '0 1rem', // Add horizontal padding for small screens
    boxSizing: 'border-box',
    ...style,
  };

  return (
    <div className={`container ${className}`} style={containerStyle}>
      {children}
    </div>
  );
};

export default Container;
