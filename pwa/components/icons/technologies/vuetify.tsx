import classNames from "classnames";

interface IconProps {
  className?: string;
}

export default function Github({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 14 16"
      className={classNames("fill-current", className)}
      aria-hidden="true"
    >
      <polygon points="10.27 0 7 0 3.73 0 7 7.73 10.27 0" />
      <polygon points="10.33 2.33 7 10 3.67 2.33 0 2.33 7 16 14 2.33 10.33 2.33" />
    </svg>
  );
}
