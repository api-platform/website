import React, { useCallback } from "react";
import Editor from "@monaco-editor/react";
import debounce from "lodash.debounce";

export default function PhpEditor({
  code,
  onChange,
}: {
  code: string;
  onChange: (code: string) => void;
}) {
  const onEditorChange = useCallback(
    (newValue: string, _event: any) => {
      debounce(() => {
        onChange(newValue);
      }, 750);
    },
    [onChange]
  );

  return (
    <Editor
      onChange={(newValue, e) => newValue && onEditorChange(newValue, e)}
      language="php"
      value={code}
      defaultValue={`<?php\n  `}
      options={{
        wordWrap: "on",
        automaticLayout: true,
      }}
    />
  );
}
