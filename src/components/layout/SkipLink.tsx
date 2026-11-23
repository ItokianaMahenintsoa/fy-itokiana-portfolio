import { useTranslations } from "next-intl";

export function SkipLink() {
  const t = useTranslations("Layout");

  return (
    <a
      href="#content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-pill focus:bg-text focus:px-5 focus:py-3 focus:text-label focus:font-medium focus:text-bg"
    >
      {t("skipToContent")}
    </a>
  );
}
