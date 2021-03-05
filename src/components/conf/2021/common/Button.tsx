import React from 'react';
import classnames from 'classnames';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLDivElement> {
  size?: 'small' | 'large';
  className?: string;
  empty?: boolean;
  disabled?: boolean;
}

const Button: React.ComponentType<ButtonProps> = ({
  children,
  className,
  empty,
  disabled,
  size = 'large',
  ...props
}) => {
  return (
    <div className={classnames('conf__button', { small: 'small' === size, empty, disabled }, className)} {...props}>
      {children}
    </div>
  );
};

export default Button;
