import ReactDOMServer from "react-dom/server";
import { ReactElement, ReactNode } from "react";
import { getDictionary } from "i18n/get-dictionary";
import { Locale } from "i18n/i18n-config";

type DictionaryReturn = Awaited<ReturnType<typeof getDictionary>>;

export type TranslationPatterns = Record<string, ReactNode>;

export const getTranslation = async (locale: Locale) => {
  const dict = await getDictionary(locale);
  return t(dict);
};

export const t =
  (dict: DictionaryReturn) =>
  (key: string, translationParams: TranslationPatterns = {}) => {
    const keyToFind =
      translationParams?.plural !== undefined
        ? `key_${translationParams.plural ? "plural" : "one"}`
        : key;

    if (!keyToFind) return "";
    const keys = keyToFind.split(".");
    let currentKey: any = dict;
    for (const key of keys) {
      currentKey = currentKey?.[key];
    }

    Object.keys(translationParams).forEach((search) => {
      const value = translationParams[search];
      currentKey = currentKey?.replace(
        new RegExp(`{{${search}}}`, "g"),
        ReactDOMServer.renderToString(value as ReactElement)
      );
    });

    currentKey = currentKey?.replace(/(\s)(?!\u00A0)([:!?])/g, "\u00A0$2");

    return currentKey || key;
  };
