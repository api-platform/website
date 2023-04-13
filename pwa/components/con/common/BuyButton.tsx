import React from "react";
import useEventBriteModal from "hooks/con/useEventBriteModal";
import Button, { ButtonProps } from "components/con/common/Button";
import classNames from "classnames";

interface BuyButtonProps extends ButtonProps {
  id: string;
}

function BuyButton({ children, id, className, ...props }: BuyButtonProps) {
  useEventBriteModal(id);

  return (
    <Button id={id} className={classNames("pink", className)} {...props}>
      {children}
    </Button>
  );
}

export default function BuyButtonContainer(props: BuyButtonProps) {
  return <BuyButton {...props} />;
}
