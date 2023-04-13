import classNames from "classnames";

interface IconProps {
  className?: string;
}

export default function Github({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 16 10.71"
      className={classNames("fill-current", className)}
      aria-hidden="true"
    >
      <path d="M7.06,.58c-.45-.77-1.57-.77-2.02,0L.16,8.98c-.45,.77,.11,1.73,1.01,1.73h3.81c-.38-.33-.52-.91-.24-1.41l3.7-6.34L7.06,.58Z" />
      <path d="M10.16,2.42c.37-.63,1.3-.63,1.67,0l4.04,6.87c.37,.63-.09,1.42-.83,1.42H6.95c-.74,0-1.21-.79-.83-1.42L10.16,2.42Z" />
    </svg>
  );
}
