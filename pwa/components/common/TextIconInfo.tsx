import classNames from "classnames";
import { IconProps } from "components/icons";
import { PropsWithChildren } from "react";

export default function TextIconInfo({
  Icon,
  children,
  link,
  higlightIcon,
}: {
  link?: string;
  Icon: React.ComponentType<IconProps>;
  higlightIcon?: boolean;
} & PropsWithChildren) {
  return (
    <div className="py-1">
      {link ? (
        <a
          href={link}
          rel="noopener noreferrer"
          target="_blank"
          className="flex flex-row items-center transition-all font-semibold link"
        >
          <Icon
            className={classNames("w-5 h-5", higlightIcon && "text-blue")}
          />
          &nbsp;
          {children}
        </a>
      ) : (
        <div className="flex flex-row items-center">
          <Icon
            className={classNames("w-5 h-5", higlightIcon && "text-blue")}
          />
          &nbsp;
          {children}
        </div>
      )}
    </div>
  );
}
