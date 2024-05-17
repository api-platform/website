"use client";
import Button from "components/common/Button";
import classNames from "classnames";
import Web from "components/con/common/Web";
import { useState, useEffect, useRef } from "react";

export default function ModalCon() {
  const [open, setOpen] = useState(false);
  const modal = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modal.current && !modal.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    let timeout: any;
    const storedDate = localStorage.getItem("modal-con-schedule");
    if (
      !storedDate ||
      Date.now() - parseInt(storedDate, 10) > 1 * 24 * 60 * 60 * 1000 // 1 jour
    ) {
      timeout = setTimeout(() => {
        setOpen(true);
        localStorage.setItem("modal-con-schedule", Date.now().toString());
      }, 4000);
    }

    return () => timeout && clearTimeout(timeout);
  }, [setOpen]);

  return (
    <div
      className={classNames(
        "bg-blue-black/75 top-0 left-0 fixed z-[100] transition-colors duration-500",
        open
          ? "bg-blue-black/75 visible w-screen h-screen"
          : "bg-blue-black/0 -translate-x-full w-0 h-0 invisible"
      )}
    >
      <div
        ref={modal}
        className={classNames(
          "fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[100] rounded-3xl w-11/12 md:w-4/5 max-w-[800px] overflow-hidden border-white border-px transition-transform duration-500",
          open ? "scale-100" : "scale-0"
        )}
      >
        <div className="bg-conf-gradient bg-blue-black relative overflow-hidden text-center px-12 py-12">
          <Web
            className="absolute z-0 h-[600px] -translate-x-1/2 -translate-y-1/2 top-1/2 left-[80%] opacity-60 pointer-events-none"
            animated={true}
            isVisible={true}
          />
          <img
            src="/images/con/logo.svg"
            alt="API Platform Conference"
            width="400"
            className="max-w-full mx-auto"
          />
          <div className="border-px mt-4 border-white py-1 px-2 font-bold text-sm text-white uppercase inline-block">
            September 19-20, 2024 | Lille & online
          </div>
          <button
            className="rounded-full bg-blue w-9 h-9 top-4 right-4 absolute text-white flex items-center justify-center"
            onClick={() => setOpen(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentcolor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="bg-white px-5 pb-12 pt-8">
          <div className="flex flex-col gap-4 items-center max-w-2xl text-center mx-auto">
            <p className="text-xs uppercase text-gray-400">
              The international conference on the API Platform Framework
            </p>
            <h2 className="text-blue-light text-2xl font-bold text-center">
              API Platform Conference 2024: meet the best PHP, JavaScript and
              API experts
            </h2>
            <p className="font-light text-sm text-blue-black">
              Lear more about the event, register for the conference, and get
              ready for two days of inspiration, ideas, and knowledge-sharing
              with our incredible lineup of renowned specialists and advocates.
            </p>
            <Button color="pink" size="large" href="/con" className="mt-4">
              Register now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
