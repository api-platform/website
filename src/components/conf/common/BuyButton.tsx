import React, { useLayoutEffect } from 'react';
import Button, { ButtonProps } from './Button';

const ID = () => `_${Math.random().toString(36).substr(2, 9)}`;

const ButtonBuy: React.ComponentType<ButtonProps> = ({ children, ...props }) => {
  const id = ID();

  useLayoutEffect(() => {
    const onOrderComplete = () => console.log('order complete!');

    window.EBWidgets?.createWidget({
      widgetType: 'checkout',
      eventId: '146559873527',
      modal: true,
      modalTriggerElementId: id,
      onOrderComplete,
    });
  }, [id]);

  return (
    <Button id={id} {...props}>
      {children}
    </Button>
  );
};

export default ButtonBuy;
