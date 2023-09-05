"use client";
import SwaggerUIConstructor from "swagger-ui";
import "swagger-ui/dist/swagger-ui.css";
import React, { useCallback, useEffect, useState } from "react";
import parseHeaders from "http-headers";

const STR = "string";

const getRequestCode = (url: URL, opts: any = {}) => {
  const method = opts.method || "GET";
  let headers = "[]";

  if (opts.headers instanceof Headers) {
    const phpArray = [];
    for (const pair of opts.headers.entries()) {
      let key = pair[0].toLowerCase();
      if (key !== "content_type") {
        key = "http_" + key;
      }

      phpArray.push(`"${key}" => "${pair[1]}"`);
    }

    headers = `[${phpArray.join(", ")}]`;
  }

  return `(function() {
    require './vendor/autoload.php';
    if (!($guide = $_SERVER['APP_GUIDE'] ?? $_ENV['APP_GUIDE'] ?? null)) {
        throw new \\RuntimeException('No guide.');
    }
    [$app, $args] = (new \\Symfony\\Component\\Runtime\\SymfonyRuntime(['disable_dotenv']))
        ->getResolver(function (array $context) use ($guide) {
        return new \\ApiPlatform\\Playground\\Kernel($context['APP_ENV'], (bool) $context['APP_DEBUG'], $guide);
    })->resolve();
    $app = $app(...$args);
    return (string) $app->handle(\\Symfony\\Component\\HttpFoundation\\Request::create('${url.toString()}', '${method}', [], [], [], ${headers}));
  })();`;
};

function phpFetch(url: URL, opts: any = {}) {
  const spec = opts.ccall(
    "phpw_exec",
    STR,
    [STR],
    [getRequestCode(url, opts)]
  ) as string;

  if (!spec) {
    throw new Error("PHP call did not return anything.");
  }

  const parts = spec.split("\r\n\r\n");
  const head = parseHeaders(parts[0]) as any;
  const body = parts[1];

  return new Response(body, {
    status: head.statusCode,
    statusText: head.statusMessage,
    headers: new Headers(head.headers),
  });
}

function SwaggerUIReact(props: any) {
  const ui = SwaggerUIConstructor(props) as any;
  const SwaggerUIComponent = ui.getComponent("App", "root");
  return <SwaggerUIComponent />;
}

export default function SwaggerUI({
  guide,
  ccall,
}: {
  guide: string;
  ccall: any;
}) {
  const [openApiDoc, setOpenApiDoc] = useState(null);

  useEffect(() => {
    let ignore = false;

    (async () => {
      await Promise.resolve();
      if (ignore) {
        return;
      }

      ccall("setenv", null, [STR, STR, "number"], ["APP_GUIDE", guide, 1]);
      const response = phpFetch(new URL("https://localhost/docs.json"), {
        ccall,
      });
      const docs = await response.json();
      setOpenApiDoc(docs);
    })();

    // @see https://marmelab.com/blog/2023/01/11/use-async-effect-react.html
    return () => {
      ignore = true;
    };
  }, [ccall, guide]);

  // req is a swagger request with some special options
  const requestInterceptor = useCallback(
    (req: any) => {
      req.userFetch = (url: string, opts: RequestInit) => {
        return phpFetch(new URL(url), { ...opts, ccall });
      };
      return req;
    },
    [ccall]
  );

  if (!openApiDoc) {
    return <div>Loading</div>;
  }

  return (
    <SwaggerUIReact
      docExpansion={"full"}
      tryItOutEnabled={true}
      requestInterceptor={requestInterceptor}
      spec={openApiDoc}
      syntaxHighlight={false} // react-syntax-highlighter is broken
    />
  );
}
