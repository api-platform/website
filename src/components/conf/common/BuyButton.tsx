import React, { useLayoutEffect, useContext } from 'react';
import { ConfContext } from '../layout';
import Button, { ButtonProps } from './Button';

interface BuyButtonProps extends ButtonProps {
  id: string;
}

const BuyButton: React.ComponentType<BuyButtonProps> = ({ children, id, ...props }) => {
  const { isEventBriteLoaded } = useContext(ConfContext);

  useLayoutEffect(() => {
    const onOrderComplete = () => console.log('order complete!');
    if (isEventBriteLoaded) {
      // @ts-expect-error eventbrite widget
      window.EBWidgets?.createWidget({
        widgetType: 'checkout',
        eventId: '146559873527',
        modal: true,
        modalTriggerElementId: id,
        onOrderComplete,
      });
    }
  }, [id, isEventBriteLoaded]);

  return (
    <Button id={id} {...props}>
      {children}
    </Button>
  );
};

export default BuyButton;
