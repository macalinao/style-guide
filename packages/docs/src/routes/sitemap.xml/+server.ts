import { parseRuleDocs } from "$lib/server/rules";
import { SITE_URL } from "$lib/site";
import type { RequestHandler } from "./$types";

export const prerender = true;

export const GET: RequestHandler = () => {
  const rules = parseRuleDocs();
  const paths = [
    "/",
    "/rules/",
    ...rules.map((rule) => `/rules/${rule.slug}/`),
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths.map((path) => `  <url><loc>${SITE_URL}${path}</loc></url>`).join("\n")}
</urlset>`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
};
