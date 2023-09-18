import React from "react";
import { Highlight, themes } from "prism-react-renderer";

export default function Response({
  response,
  isJson,
}: {
  response: string;
  isJson: boolean;
}) {
  if (isJson) {
    return (
      <Highlight theme={themes.github} code={response} language="javascript">
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre style={style}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
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
