"use client";
import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import usePHP from "../utils/usePHP";
import PhpEditor from "./PhpEditor";
import Response from "./Response";
import SwaggerUI from "./SwaggerUI";
import { bufferTime } from "rxjs";
import { getGuides, GuideMetadata } from "../utils/getGuides";
import { useParams } from "next/navigation";

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
  const notActiveTabClassname =
    "py-4 px-1 inline-flex items-center gap-2 border-b-[3px] border-transparent text-sm whitespace-nowrap text-gray-500 hover:text-blue-600 active";
  const activeTabClassname =
    "font-semibold border-blue-600 text-blue-60 " + notActiveTabClassname;

  const routeParams = useParams();

  useEffect(() => {
    setGuide(routeParams.guide);
  }, [routeParams.guide]);

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

  const onGuideChange = useCallback((event: ChangeEvent) => {
    const newGuide = (event.target as HTMLSelectElement).value;
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
      <div className="h-screen w-full">
        <div className="flex justify-around">
          <div className="text-left">API Platform {versions.apiPlatform}</div>
          <div>PHP {versions.php}</div>
          <div className="">
            <select className="" value={guide} onChange={onGuideChange}>
              {guides.map((e, i) => (
                <option key={e.slug} value={e.slug}>
                  {i + 1} - {e.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="h-full grid grid-cols-2 gap-1">
          <div className="h-full">
            <PhpEditor code={code} onChange={onCodeChange} />
          </div>
          <div className="h-full">
            <div className="border-b border-gray-200 dark:border-gray-700">
              <nav className="flex space-x-2" aria-label="Tabs" role="tablist">
                <button
                  type="button"
                  className={
                    activeTab === "response"
                      ? activeTabClassname
                      : notActiveTabClassname
                  }
                  id="tabs-with-underline-item-1"
                  aria-controls="tabs-with-underline-1"
                  role="tab"
                  onClick={() => switchTab("response")}
                >
                  Response
                </button>
                <button
                  type="button"
                  className={
                    activeTab === "swaggerui"
                      ? activeTabClassname
                      : notActiveTabClassname
                  }
                  id="tabs-with-underline-item-2"
                  aria-controls="tabs-with-underline-2"
                  role="tab"
                  onClick={() => switchTab("swaggerui")}
                >
                  Swagger UI
                </button>
              </nav>
            </div>
            {activeTab === "response" ? (
              <Response response={response} isJson={isJsonResponse} />
            ) : (
              <SwaggerUI guide={guide} ccall={ccall} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
