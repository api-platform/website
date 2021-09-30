import React from 'react';
import classnames from 'classnames';
import { Link } from 'gatsby';

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
  const classNames = classnames('conf__button', { small: 'small' === size, empty, disabled }, className);

  return to ? (
    <Link className={classNames} to={to}>
      {children}
    </Link>
  ) : (
    <div className={classNames} {...props}>
      {children}
    </div>
  );
};

export default Button;
