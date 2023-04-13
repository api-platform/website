import React from "react";

const map = new Map<string, React.RefObject<HTMLElement>>();

function setRef(key: string) {
  if (!key) {
    console.warn(`useDynamicRefs: Cannot set ref without key `);
    return null;
  }
  const ref = React.createRef<HTMLElement>();
  map.set(key, ref);
  return ref;
}

function getRef(key: string) {
  if (!key) {
    console.warn(`useDynamicRefs: Cannot get ref without key`);
    return null;
  }
  return map.get(key);
}

function useDynamicRefs() {
  return [getRef, setRef];
}

export default useDynamicRefs;
