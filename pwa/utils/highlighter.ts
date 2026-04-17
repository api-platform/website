import { createHighlighter, BundledLanguage, bundledLanguages } from "shiki";

let highlighter: any = null;

// to avoid multiplication of highlighters during doc building
export async function getOrCreateHighlighter() {
  if (!highlighter) {
    highlighter = await createHighlighter({
      themes: ["github-light", "one-dark-pro"],
      langs: Object.keys(bundledLanguages) as BundledLanguage[],
    });
  }
  return highlighter;
}

export function getLoadedLanguages(): string[] {
  return highlighter ? highlighter.getLoadedLanguages() : [];
}

export function highlightCode(code: string, language: string) {
  try {
    language = language.toLowerCase();
    const langExists = getLoadedLanguages().includes(language as BundledLanguage);
    const lang = langExists ? language : "shell";

    return (
      highlighter.codeToHtml(code, { lang, theme: "one-dark-pro" }) +
      highlighter.codeToHtml(code, { lang, theme: "github-light" })
    );
  } catch {
    return code;
  }
}
