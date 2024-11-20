"use client";
import { getDictionary } from "i18n/get-dictionary";
import { t, getTranslation, TranslationPatterns } from "utils/con/translation";
import { i18n, Locale } from "i18n/i18n-config";
import { createContext, PropsWithChildren } from "react";

// t("subtitle_trad", {link: <a href="" className="">{t("link_trad"}</a>});
// Take a look at the 2022 edition and find more information on {{link}}

type LanguageContextType = {
  locale: Locale;
  t: Awaited<ReturnType<typeof getTranslation>>;
  getLocaleDictionary?: () => Awaited<ReturnType<typeof getDictionary>>;
  Translate: ({
    translationKey,
    translationParams,
    className,
  }: {
    translationKey: string;
    translationParams?: TranslationPatterns | undefined;
    className?: string;
  }) => JSX.Element;
};

const { defaultLocale } = i18n;

export const LanguageContext = createContext<LanguageContextType>({
  t: () => "",
  Translate: () => <></>,
  locale: defaultLocale,
});

interface LanguageProviderType extends PropsWithChildren {
  locale: Locale;
  dictionary: Awaited<ReturnType<typeof getDictionary>>;
}

export function LanguageProvider({
  locale,
  dictionary,
  children,
}: LanguageProviderType) {
  const translate = t(dictionary);

  const Translate = ({
    translationKey,
    translationParams,
    className,
  }: {
    translationKey: string;
    translationParams?: TranslationPatterns;
    className?: string;
    html?: boolean;
  }) => {
    return (
      <div
        className={className}
        dangerouslySetInnerHTML={{
          __html: translate(translationKey, translationParams),
        }}
      />
    );
  };

  const getLocaleDictionary = () => dictionary;

  return (
    <LanguageContext.Provider
      value={{ locale: locale, t: translate, Translate, getLocaleDictionary }}
    >
      {children}
    </LanguageContext.Provider>
  );
}
