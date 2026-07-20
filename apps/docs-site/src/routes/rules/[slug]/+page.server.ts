import { error } from "@sveltejs/kit";
import { parseRuleDocs, ruleDocsUrl } from "$lib/server/rules";
import type { EntryGenerator, PageServerLoad } from "./$types";

export const entries: EntryGenerator = () =>
  parseRuleDocs().map((rule) => ({ slug: rule.slug }));

export const load: PageServerLoad = ({ params }) => {
  const rule = parseRuleDocs().find((candidate) => candidate.slug === params.slug);
  if (!rule) {
    error(404, `Rule not found: ${params.slug}`);
  }

  return {
    rule,
    docsUrl: ruleDocsUrl(rule),
    optionsJson:
      rule.options === null ? null : JSON.stringify(rule.options, null, 2),
  };
};
