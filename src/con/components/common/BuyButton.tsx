import React from 'react';
import Button, { ButtonProps } from '@con/components/common/Button';

interface BuyButtonProps extends ButtonProps {
  id: string;
}

const BuyButton: React.ComponentType<BuyButtonProps> = ({ children, id, ...props }) => {
  return (
    <Button id={id} {...props}>
      {children}
    </Button>
  );
};

export default BuyButton;
