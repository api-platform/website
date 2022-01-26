import React, { useContext } from 'react';
import Button, { ButtonProps } from '@con/components/common/Button';
import { ConfContext } from '../layout';

const BuyButton: React.ComponentType<ButtonProps> = ({ children, ...props }) => {
  const { onButtonBuyClick } = useContext(ConfContext);
  return (
    <Button onClick={onButtonBuyClick} {...props}>
      {children}
    </Button>
  );
};

export default BuyButton;
