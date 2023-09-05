"use client";
import { useEffect, useRef, useMemo, useState } from "react";
import { Observable } from "rxjs";
import phpBinary from "./php-web.mjs";

export type CCall = (
  ident: string,
  returnType: string | null,
  argTypes: string[],
  args: Array<any>,
  opts?: any
) => void | string;
export type PhpState = {
  loading: boolean;
  ccall: CCall;
  FS?: any; // find the type on types for https://emscripten.org/docs/api_reference/Filesystem-API.html?highlight=fs#filesystem-api-idbfs
  stdout: Observable<string>;
  stderr: Observable<string>;
};

export default function usePHP(): PhpState {
  const onStdout = useRef({ next: (data: string) => {} });
  const onStderr = useRef({ next: (data: string) => {} });

  const stdout: Observable<string> = useMemo(
    () =>
      new Observable((subscriber) => {
        onStdout.current = subscriber;
      }),
    []
  );
  const stderr: Observable<string> = useMemo(
    () =>
      new Observable((subscriber) => {
        onStderr.current = subscriber;
      }),
    []
  );

  const ccall = useRef(() => {});
  const FS = useRef(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;

    (async () => {
      await Promise.resolve();
      if (ignore) {
        return;
      }

      await phpBinary({
        locateFile: function (path: string, prefix: string) {
          if (path.endsWith(".data")) {
            return "/" + path;
          }

          if (path.endsWith(".wasm")) {
            return "/" + path;
          }

          return prefix + path;
        },
        onAbort(reason: string) {
          console.error(`WASM aborted: ${reason}`);
        },
        print(data: string) {
          if (data) {
            onStdout.current.next(data);
          }
        },
        printErr(data: string) {
          if (data) {
            onStderr.current.next(data);
          }
        },
        onRuntimeInitialized: function () {
          // This sets USE_ZEND_ALLOC=0 to avoid nunmap errors
          (this as any).ccall(
            "setenv",
            null,
            ["string", "string", "number"],
            ["USE_ZEND_ALLOC", "0", 1]
          );

          ccall.current = (this as any).ccall;
          FS.current = (this as any).FS;
          setLoading(false);
        },
      });
    })();

    // @see https://marmelab.com/blog/2023/01/11/use-async-effect-react.html
    return () => {
      ignore = true;
    };
  }, []);

  return { ccall: ccall.current, FS: FS.current, loading, stdout, stderr };
}
/* eslint @typescript-eslint/no-empty-function: "off" -- We want to declare empty functions while loading. */
