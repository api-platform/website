import React from 'react';
import useEventBriteModal from '../hooks/useEventBriteModal';
import Button, { ButtonProps } from './Button';

interface BuyButtonProps extends ButtonProps {
  id: string;
}

const BuyButton: React.ComponentType<BuyButtonProps> = ({ children, id, ...props }) => {
  useEventBriteModal(id);

  return (
    <Button id={id} {...props}>
      {children}
    </Button>
  );
};

export default BuyButton;
