"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import usePHP from "../utils/usePHP";
import PhpEditor from "./PhpEditor";
import Response from "./Response";
import SwaggerUI from "./SwaggerUI";
import classNames from "classnames";
import NavLink from "../../../components/layout/NavLink";
import { bufferTime } from "rxjs";
import { getGuides, GuideMetadata } from "../utils/getGuides";
import { useParams } from "next/navigation";
import Logo from "components/common/Logo";

const STR = "string";

export default function Playground() {
  const [guide, setGuide] = useState("");
  const { FS, stdout, stderr, ccall, loading } = usePHP();
  const [response, setResponse] = useState("");
  // TODO: use this somehow to show errors
  const [versions, setVersions] = useState({ php: "", apiPlatform: "" });
  const [isJsonResponse, setIsJsonResponse] = useState(true);
  const [code, setCode] = useState("");
  const [guides, setGuides] = useState([] as GuideMetadata[]);
  const [activeTab, setActiveTab] = useState("response");

  const routeParams = useParams();

  useEffect(() => {
    setGuide(routeParams.guide);
  }, [routeParams.guide]);

  const guideName = useMemo(() => {
    if (guides && guide) {
      const currentGuideIndex = guides.findIndex((g) => guide === g.slug);
      if (currentGuideIndex !== -1) {
        const currentGuide = guides[currentGuideIndex];
        return `${currentGuideIndex + 1} - ${currentGuide.name}`;
      } else {
        return ""; // Guide non trouvé, renvoie une chaîne vide
      }
    }
    return "";
  }, [guide, guides]);

  // handles stdout and stderr, note that stdout is our HTTP body response
  useEffect(() => {
    const out = stdout.pipe(bufferTime(256)).subscribe((out) => {
      if (!out.length) {
        return;
      }

      const buffer = out.join("\n");
      // let's try if this is JSON
      let result = buffer.replaceAll("\\/", "/");
      try {
        result = JSON.parse(result);
        setResponse(JSON.stringify(result, null, 2));
        setIsJsonResponse(true);
      } catch (e) {
        setResponse(buffer);
        setIsJsonResponse(false);
      }
    });

    const err = stderr.subscribe((err) => console.log(err));

    return () => {
      out.unsubscribe();
      err.unsubscribe();
    };
  }, [stdout, stderr, response, isJsonResponse]);

  // main function that load code
  useEffect(() => {
    if (loading) {
      return;
    }

    setVersions({
      php: ccall("phpw_exec", STR, [STR], ["phpversion();"]) as string,
      apiPlatform: ccall(
        "phpw_exec",
        STR,
        [STR],
        [
          `(function() {
  return array_filter(json_decode(file_get_contents('/src/composer.lock'))->packages, fn($v) => $v->name === 'api-platform/core')[0]->version;
})()`,
        ]
      ) as string,
    });

    ccall("chdir", null, [STR], ["/src"]);
    ccall("setenv", null, [STR, STR, "number"], ["SHELL_VERBOSITY", "2", 1]);
  }, [loading, ccall]);

  useEffect(() => {
    if (loading) {
      return;
    }

    setCode(
      FS.readFile(`/src/guides/${guide}.php`, {
        encoding: "utf8",
      }).toString()
    );
    ccall("setenv", null, [STR, STR, "number"], ["APP_GUIDE", guide, 1]);
    ccall("phpw", null, [STR], ["public/index.php"]);
  }, [guide, loading, FS, ccall]);

  useEffect(() => {
    if (!FS) {
      return;
    }

    setGuides(getGuides(FS).filter((e) => e.executable === "true"));
  }, [FS]);

  const switchTab = useCallback((tab: string) => {
    setActiveTab(tab);
  }, []);

  const onCodeChange = useCallback(
    (code: string) => {
      FS.unlink(`/src/guides/${guide}.php`);
      FS.writeFile(`/src/guides/${guide}.php`, code);
      ccall("phpw", null, [STR], ["public/index.php"]);
    },
    [guide, FS, ccall]
  );

  /*const onGuideChange = useCallback((event: ChangeEvent) => {
    const newGuide = (event.target as HTMLSelectElement).value;
    const url = new URL(window.location.href);
    url.pathname = "/playground/" + newGuide;
    window.history.pushState({}, "", url);
    setGuide(newGuide);
  }, []);*/

  const onGuideChange = useCallback((newGuide: string) => {
    const url = new URL(window.location.href);
    url.pathname = "/playground/" + newGuide;
    window.history.pushState({}, "", url);
    setGuide(newGuide);
  }, []);

  if (loading || !guide) {
    return <h1>Loading</h1>;
  }

  return (
    <>
      <div className="h-screen w-screen flex flex-col pt-16">
        <div className="h-16 z-50 top-0 fixed w-full bg-white border-b-px border-b-gray-200">
          <div className="mx-auto py-2 px-6 md:px-8 h-16 flex flex-row items-center gap-x-4 w-full">
            <NavLink
              href="/"
              className={classNames("flex flex-row text-inherit text-blue")}
              title="API Platform"
            >
              <div className="flex flex-row gap-2 items-center">
                <Logo className="h-5" inline />
                <div className="h-full w-px bg-blue" />
                <h1 className="font-title font-semibold">PLAYGROUND</h1>
              </div>
            </NavLink>
            <div className="flex flex-row flex-1 items-center justify-end gap-2 text-text-secondary/70 font-semibold">
              <div className="text-left rounded-xl text-xs bg-gray-100 px-3 py-1">
                API Platform {versions.apiPlatform}
              </div>
              <div className="text-left rounded-xl text-xs bg-gray-100 px-3 py-1">
                PHP {versions.php}
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 grid grid-cols-2 overflow-hidden">
          <div className="h-full flex flex-col">
            <div className="flex flex-row items-center space-between py-3 pl-8 pr-4 shadow-md z-10">
              <h2 className="font-title text-2xl text-text-secondary font-bold flex-1">{`${guideName}`}</h2>
              <div className="group relative">
                <div className="bg-blue rounded-3xl text-white text-xs font-semibold z-20 relative py-2 px-3 flex flex-row items-center gap-2 cursor-pointer group-hover:bg-blue-dark transition-colors">
                  <div>Pick a guide</div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                </div>

                <ul
                  className={classNames(
                    "absolute top-0 border-px border-gray-200 text-sm right-0 flex flex-col max-h-[calc(100vh-150px)] w-72 bg-white rounded-xl pb-4 pt-6 shadow-2xl opacity-0 pointer-events-none overflow-hidden transition-[top,opacity]",
                    "group-hover:opacity-100 group-hover:h-auto group-hover:pointer-events-auto group-hover:overflow-auto group-hover:top-1/2"
                  )}
                >
                  {guides.map((e, i) => (
                    <li
                      className="block text-left cursor-pointer text-text-secondary px-4 py-2 hover:bg-gray-100 hover:text-blue"
                      key={e.slug}
                      onClick={() => onGuideChange(e.slug)}
                    >
                      {`${i + 1} - ${e.name}`}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="flex-1">
              <PhpEditor code={code} onChange={onCodeChange} />
            </div>
          </div>
          <div className="flex flex-col justify-start h-[calc(100vh-64px)] bg-[#f6f8fa] border-l-px border-l-gray-100 z-10 relative">
            <div className="border-b border-gray-200 shadow-sm z-10 px-4">
              <nav className="flex gap-4" aria-label="Tabs" role="tablist">
                {[
                  { title: "Response", value: "response" },
                  { title: "Swagger UI", value: "swaggerui" },
                ].map((tab) => (
                  <button
                    key={tab.value}
                    type="button"
                    className={classNames(
                      "relative flex py-4 text-sm font-semibold focus:outline-none after:absolute after:bg-blue rounded-full after:bottom-0 after:w-full",
                      activeTab === tab.value
                        ? "text-blue after:h-0.5"
                        : "text-text-secondary"
                    )}
                    id="tabs-with-underline-item-1"
                    aria-controls="tabs-with-underline-1"
                    role="tab"
                    onClick={() => switchTab(tab.value)}
                  >
                    {tab.title}
                  </button>
                ))}
              </nav>
            </div>
            <div className="flex-1 overflow-auto px-4 py-2 text-sm leading-normal">
              {activeTab === "response" ? (
                <Response response={response} isJson={isJsonResponse} />
              ) : (
                <SwaggerUI guide={guide} ccall={ccall} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
