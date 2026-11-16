import type { MetadataRoute } from "next";
import i18nConfig from "../../i18nConfig";
import { buildUrl } from "@/lib/seo";

const paths = ["", "/buy-ticket", "/cart", "/dai-ly", "/about", "faqs"];

export default function sitemap(): MetadataRoute.Sitemap {
  return paths.flatMap((p) =>
    i18nConfig.locales.map((l: any) => ({
      url: buildUrl(l, p),
      lastModified: new Date(),
      alternates: {
        languages: Object.fromEntries(i18nConfig.locales.map((x: any) => [x, buildUrl(x, p)])),
      },
    }))
  );
}
