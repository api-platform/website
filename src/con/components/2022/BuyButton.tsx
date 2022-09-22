import React, { useContext } from 'react';
import { currentEdition } from '@con/data/editions';
import useEventBriteModal from '@con/hooks/useEventBriteModal';
import Button, { ButtonProps } from '@con/components/common/Button';
import { ConfContext } from '../layout';

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

const BuyButtonContainer: React.ComponentType<BuyButtonProps> = (props) => {
  const { edition } = useContext(ConfContext);
  if (edition !== currentEdition) return <></>;
  return <BuyButton {...props} />;
};

export default BuyButtonContainer;
