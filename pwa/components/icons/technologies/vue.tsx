import classNames from "classnames";

interface IconProps {
  className?: string;
}

export default function Github({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 16 13.86"
      className={classNames("fill-current", className)}
      aria-hidden="true"
    >
      <path d="M9.52,0l-1.52,2.62L6.48,0H0L8,13.86,16,0h-6.48ZM1.18,.68H3.75l4.25,7.36L12.25,.68h2.57L8,12.5,1.18,.68Z" />
    </svg>
  );
}
