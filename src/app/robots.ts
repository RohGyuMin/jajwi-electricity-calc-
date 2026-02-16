import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://jajwi-electricity-calc-rs7h.vercel.app/sitemap.xml",
  };
}
