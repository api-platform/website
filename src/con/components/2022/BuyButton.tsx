import React from 'react';
import useEventBriteModal from '@con/hooks/useEventBriteModal';
import Button, { ButtonProps } from '@con/components/common/Button';

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
