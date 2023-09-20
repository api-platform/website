import classNames from "classnames";
import useOnClickOutside from "hooks/useOnClickOutside";
import { useRef, useState } from "react";

interface ReferenceFilterDropdown {
  value?: string;
  onChange: (value?: string) => void;
  label?: string;
  ListItem?: ({ value }: { value?: string }) => JSX.Element;
  CurrentValueComponent?: ({ value }: { value?: string }) => JSX.Element;
  values: string[];
  className?: string;
}

export default function ReferenceFilterDropdown({
  value,
  onChange,
  label,
  ListItem,
  values,
  CurrentValueComponent,
  className,
}: ReferenceFilterDropdown) {
  const [open, setOpen] = useState(false);
  const toggleOpen = () => setOpen(!open);

  const dropdown = useRef<HTMLDivElement>(null);

  useOnClickOutside(dropdown, () => setOpen(false));

  return (
    <div ref={dropdown} className="relative">
      <button
        type="button"
        className={classNames(
          "bg-white text-gray-500 text-sm rounded-[14px] relative min-w-[200px] px-3 h-9 w-full flex flex-row items-center | dark:bg-blue-darkest ",
          className
        )}
        id="menu-button"
        aria-expanded="true"
        aria-haspopup="true"
        onClick={toggleOpen}
      >
        {label ? (
          <span className="text-gray-400 font-normal dark:text-white/50">
            {`${label}:`}
          </span>
        ) : null}
        <div
          className={classNames(
            "pl-2 font-semibold flex flex-row items-center",
            value ? "text-blue" : "text-gray-500 dark:text-white/80"
          )}
        >
          {CurrentValueComponent ? (
            <CurrentValueComponent value={value} />
          ) : (
            value || "All"
          )}
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 ml-auto"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 8.25l-7.5 7.5-7.5-7.5"
          />
        </svg>
      </button>
      <ul
        onClick={() => setOpen(false)}
        className={classNames(
          "text-gray-500 divide-y font-light text-sm rounded-[14px] divide-blue/20 absolute left-0 top-0 z-10 w-full bg-white shadow-md focus:outline-none overflow-hidden | dark:bg-blue-darkest dark:text-white/80",
          open ? "opacity-1" : "opacity-0 pointer-events-none"
        )}
      >
        <li
          className={classNames(
            "flex flex-row items-center px-2 py-2 transition-all hover:bg-blue/10",
            !value && "font-bold"
          )}
          role="button"
          onClick={() => onChange(undefined)}
        >
          All
        </li>
        {values.map((v) => (
          <li
            className={classNames(
              "flex flex-row items-center px-2 py-2 transition-all hover:bg-blue/10",
              value === v ? "font-bold text-blue" : "font-light"
            )}
            key={v}
            role="button"
            onClick={() => onChange(v)}
          >
            {ListItem ? <ListItem value={v} /> : v}
          </li>
        ))}
      </ul>
    </div>
  );
}
