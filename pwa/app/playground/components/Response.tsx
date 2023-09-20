import React, { useEffect, useState } from "react";
import hljs from "highlight.js/lib/core";
import "highlight.js/styles/github.css";
import json from "highlight.js/lib/languages/json";
hljs.registerLanguage("json", json);

export default function Response({
  response,
  isJson,
}: {
  response: string;
  isJson: boolean;
}) {
  const a = hljs.highlight(response, { language: "json" }).value;
  if (isJson) {
    return (
      <div
        style={{ whiteSpace: "pre" }}
        dangerouslySetInnerHTML={{ __html: a }}
      />
    );
  }

  return (
    <iframe
      title="response"
      width="100%"
      height="100%"
      srcDoc={response}
    ></iframe>
  );
}
