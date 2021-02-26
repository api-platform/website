import React from 'react';
import classnames from 'classnames';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLDivElement> {
  size?: 'small' | 'large';
  className?: string;
  empty?: boolean;
}

const Button: React.ComponentType<ButtonProps> = ({ children, className, empty, size = 'large', ...props }) => {
  return (
    <div className={classnames('conf__button', { small: 'small' === size, empty }, className)} {...props}>
      {children}
    </div>
  );
};

export default Button;
