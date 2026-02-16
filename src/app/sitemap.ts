import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://example.com";

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${baseUrl}/%EC%9B%90%EB%A3%B8-%EC%A0%84%EA%B8%B0%EC%84%B8-%EA%B3%84%EC%82%B0%EA%B8%B0`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/%EC%A0%84%EA%B8%B0%ED%9E%88%ED%84%B0-%EC%A0%84%EA%B8%B0%EC%84%B8-%EA%B3%84%EC%82%B0%EA%B8%B0`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/%EC%A0%84%EA%B8%B0%EC%9E%A5%ED%8C%90-%EC%A0%84%EA%B8%B0%EC%9A%94%EA%B8%88`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
