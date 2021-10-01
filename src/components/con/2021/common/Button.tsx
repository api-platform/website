import React from 'react';
import classnames from 'classnames';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLDivElement> {
  size?: 'small' | 'large';
  className?: string;
  empty?: boolean;
  disabled?: boolean;
  to?: string;
}

const Button: React.ComponentType<ButtonProps> = ({
  children,
  className,
  empty,
  disabled,
  to,
  size = 'large',
  ...props
}) => {
  const button = (
    <div className={classnames('conf__button', { small: 'small' === size, empty, disabled }, className)} {...props}>
      {children}
    </div>
  );
  return to ? <a href={to}>{button}</a> : button;
};

export default Button;
