import type { MetadataRoute } from "next";
import { SUPPORTED_LOCALES } from "@/src/consts/language.consts";
import { SITE_URL } from "@/src/consts/site.consts";

export default function sitemap(): MetadataRoute.Sitemap {
  return SUPPORTED_LOCALES.map((locale) => ({
    url: `${SITE_URL}/${locale}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 1,
  }));
}
