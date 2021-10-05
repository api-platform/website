import React from 'react';
import classnames from 'classnames';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLDivElement> {
  size?: 'small' | 'large';
  className?: string;
  empty?: boolean;
  disabled?: boolean;
  to?: string;
  external?: boolean;
}

const Button: React.ComponentType<ButtonProps> = ({
  children,
  className,
  empty,
  disabled,
  to,
  size = 'large',
  external = false,
  ...props
}) => {
  const classNames = classnames('conf__button', { small: 'small' === size, empty, disabled }, className);
  const externalProps = { target: '_blank', rel: 'noopener noreferrer' };

  return to ? (
    <a className={classNames} href={to} {...(external ? externalProps : {})}>
      {children}
    </a>
  ) : (
    <div className={classNames} {...props}>
      {children}
    </div>
  );
};

export default Button;
