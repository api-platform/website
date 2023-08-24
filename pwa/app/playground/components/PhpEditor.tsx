import React, { useCallback } from "react";
import Editor from "@monaco-editor/react";
import Nanobounce from "nanobounce";

const nanobounce = Nanobounce();

export default function PhpEditor(props: {
  code: string;
  onChange: (code: string) => void;
}) {
  const onChange = useCallback((newValue: string, _event: any) => {
    nanobounce(() => {
      props.onChange(newValue);
    });
  }, [props.onChange]);

  return (
    <Editor
      onChange={(newValue, e) => onChange(newValue, e)}
      language="php"
      value={props.code}
      defaultValue={`<?php\n  `}
      options={{
        wordWrap: "on",
        automaticLayout: true,
      }}
    />
  );
}
