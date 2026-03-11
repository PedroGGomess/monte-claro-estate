import { siteConfig } from "@/config/siteConfig";
import { useLanguage } from "@/context/LanguageContext";

const SiteFooter = () => {
  const { t } = useLanguage();

  return (
    <footer className="border-t gold-border-line px-8 md:px-14 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="font-display text-bone text-sm tracking-widest">
        Herdade do <em>Monte Claro</em>
      </div>
      <span className="label-muted">{t("footer.tagline")}</span>
      <span className="label-muted">{siteConfig.footer.phone}</span>
    </footer>
  );
};

export default SiteFooter;
