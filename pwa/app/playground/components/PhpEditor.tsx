import React, { useCallback } from "react";
import Editor from "@monaco-editor/react";
import debounce from "lodash.debounce";
import ghLight from "../utils/gh-light.json";

export default function PhpEditor({
  code,
  onChange,
}: {
  code: string;
  onChange: (code: string) => void;
}) {
  const onEditorChange = useCallback(
    debounce((newValue: string, _event: any) => {
      onChange(newValue);
    }, 750),
    [onChange]
  );

  function handleEditorWillMount(monaco: any) {
    monaco.editor.defineTheme("github", ghLight);
  }

  return (
    <Editor
      onChange={(newValue, e) => newValue && onEditorChange(newValue, e)}
      language="php"
      value={code}
      defaultValue={`<?php\n  `}
      beforeMount={handleEditorWillMount}
      theme="github"
      options={{
        wordWrap: "on",
        automaticLayout: true,
        minimap: { enabled: false },
        fontSize: 14,
        lineHeight: 1.6,
        padding: { top: 10, bottom: 10 },
        scrollBeyondLastLine: false,
      }}
    />
  );
}
