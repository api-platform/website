import React, { useContext } from "react";
import Button, { ButtonProps } from "components/con/common/Button";
import classNames from "classnames";
import { LanguageContext } from "contexts/con/LanguageContext";

interface BuyButtonProps extends ButtonProps {
  id: string;
}

function BuyButton({ children, id, className, ...props }: BuyButtonProps) {
  //useEventBriteModal(id);
  const { locale } = useContext(LanguageContext);

  return (
    <Button
      id={id}
      to={`/${locale}/con/2026/tickets`}
      className={classNames("pink flex flex-row gap-1", className)}
      {...props}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-5 h-5"
      >
        <path
          fillRule="evenodd"
          d="M12.963 2.286a.75.75 0 0 0-1.071-.136 9.742 9.742 0 0 0-3.539 6.176 7.547 7.547 0 0 1-1.705-1.715.75.75 0 0 0-1.152-.082A9 9 0 1 0 15.68 4.534a7.46 7.46 0 0 1-2.717-2.248ZM15.75 14.25a3.75 3.75 0 1 1-7.313-1.172c.628.465 1.35.81 2.133 1a5.99 5.99 0 0 1 1.925-3.546 3.75 3.75 0 0 1 3.255 3.718Z"
          clipRule="evenodd"
        />
      </svg>

      {children}
    </Button>
  );
}

export default function BuyButtonContainer(props: BuyButtonProps) {
  return <BuyButton {...props} />;
}
