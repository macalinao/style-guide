import { buildSections, ruleDocsUrl } from "$lib/server/rules";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = () => {
  const sections = buildSections();
  const total = sections.reduce((sum, section) => sum + section.rules.length, 0);

  return {
    total,
    sections: sections.map((section) => ({
      id: section.id,
      title: section.title,
      intro: section.intro,
      rules: section.rules.map((rule) => ({
        name: rule.name,
        slug: rule.slug,
        severity: rule.severity,
        summary: rule.summary,
        details: rule.details,
        docsUrl: ruleDocsUrl(rule),
        optionsJson:
          rule.options === null ? null : JSON.stringify(rule.options, null, 2),
      })),
    })),
  };
};
