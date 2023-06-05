"use client";
import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState, useEffect } from "react";
import { DocLink } from "types";

export interface NavPartProps {
  title: string;
  link?: string;
  basePath: string;
  links?: DocLink[];
  autoOpen?: boolean;
}

function NavPart({ title, link, links, basePath, autoOpen }: NavPartProps) {
  const pathname = usePathname();
  const [isOpen, setOpen] = useState(false);
  const listContainer = useRef<HTMLUListElement>(null);
  const [listHeight, setListHeight] = useState(500);

  useEffect(() => {
    const handleResize = () => {
      if (listContainer.current)
        setListHeight(listContainer.current.getBoundingClientRect().height);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (listContainer.current)
      setListHeight(listContainer.current.getBoundingClientRect().height);
  }, []);

  useEffect(() => {
    if (!autoOpen) return;
    if (pathname === link || pathname.startsWith(basePath)) setOpen(true);
    else setOpen(false);
  }, [pathname, autoOpen]);

  return (
    <div
      className={classNames(
        "transition-all duration-300",
        isOpen ? "mb-8" : "mb-4"
      )}
    >
      <div
        className={classNames(
          "flex flex-row items-center text-left",
          pathname === link || pathname.startsWith(basePath)
            ? "text-blue"
            : "text-gray-700 dark:text-white"
        )}
      >
        {link ? (
          <Link href={link} className="flex-1 font-semibold uppercase">
            {title}
          </Link>
        ) : (
          <p
            role="button"
            onClick={() => setOpen(!isOpen)}
            className="flex-1 font-semibold uppercase"
          >
            {title}
          </p>
        )}
        <button
          className={classNames(
            "ml-2 transition-all",
            links?.length ? "block" : "hidden"
          )}
          onClick={() => setOpen(!isOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={classNames(
              "h-4 w-4 transition-transform",
              isOpen && "rotate-180"
            )}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
            />
          </svg>
        </button>
      </div>
      <div
        style={{ maxHeight: isOpen ? `${listHeight}px` : 0 }}
        className={classNames(
          "overflow-hidden mt-4 text-gray-500 dark:text-gray-300 duration-500 transition-all"
        )}
      >
        <ul
          ref={listContainer}
          className={classNames(
            "pr-8 border-l-gray-300 dark:border-l-blue-dark border-l-px transition-all duration-500",
            isOpen ? "opacity-100" : "opacity-0"
          )}
        >
          {links?.map((subLink) => (
            <li className="mb-4" key={subLink.link}>
              <Link
                href={subLink.link}
                className={classNames(
                  "relative block pl-4 -translate-x-px border-l-px transition-all hover:border-l-gray-500",
                  pathname === subLink.link
                    ? "text-blue border-l-blue font-semibold"
                    : "text-gray-500 border-l-transparent"
                )}
              >
                {subLink.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function DocMenu({
  parts,
  autoOpen,
}: {
  parts: NavPartProps[];
  autoOpen?: boolean;
}) {
  return (
    <>
      {parts.map((part, index) => (
        <NavPart key={`${part.title} ${index}`} autoOpen={autoOpen} {...part} />
      ))}
    </>
  );
}
