import { useEffect, useState } from "react";
import "docs-searchbar.js/dist/cdn/docs-searchbar.css";

/*
Weirds things have been done to use docs-searchbar.js
1/ the await import must be done to prevent a "window is not defined" error to trigger
2/ the docsSearchBar must be triggered after the first render or the library will not be able to find the input in the DOM
*/

export default function SearchInput() {
  const [hasAlreadyBeenRendered, setHasAlreadyBeenRendered] = useState(false);

  useEffect(() => {
    if (!hasAlreadyBeenRendered) {
      setHasAlreadyBeenRendered(true);
    }
  }, [hasAlreadyBeenRendered]);

  useEffect(() => {
    (async () => {
      // @ts-ignore
      const docsSearchBar = (await import("docs-searchbar.js")).default;

      if (!hasAlreadyBeenRendered) {
        return;
      }

      docsSearchBar({
        hostUrl: process.env.NEXT_PUBLIC_MEILISEARCH_URL,
        apiKey: process.env.NEXT_PUBLIC_MEILISEARCH_API_KEY,
        indexUid: "docs",
        inputSelector: "#search-bar-input",
        enhancedSearchInput: true,
        meilisearchOptions: {
          limit: 20,
        },
      });
    })();
  }, [hasAlreadyBeenRendered]);

  return <input type="search" id="search-bar-input" />;
}
