import classNames from "classnames";

interface IconProps {
  className?: string;
}

export default function Icon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 16 16"
      className={classNames("fill-current", className)}
      aria-hidden="true"
    >
      <path d="M8,0C3.58,0,0,3.58,0,8s3.58,8,8,8,8-3.58,8-8S12.42,0,8,0Zm-.52,13.35l-.8-.8,3.99-3.99H3.17v-1.13h7.5l-3.98-3.98,.8-.8,5.35,5.35-5.35,5.35Z" />
    </svg>
  );
}
