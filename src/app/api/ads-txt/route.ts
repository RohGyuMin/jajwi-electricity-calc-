const ADSENSE_CLIENT_ID = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;
const ADSENSE_AUTHORITY_ID = "f08c47fec0942fa0";

export function GET() {
  const publisherId = ADSENSE_CLIENT_ID?.replace(/^ca-/, "");

  const body = publisherId
    ? `google.com, ${publisherId}, DIRECT, ${ADSENSE_AUTHORITY_ID}\n`
    : "# Missing NEXT_PUBLIC_ADSENSE_CLIENT_ID\n";

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
