import { groupByPlugin, parseRuleDocs } from "$lib/server/rules";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = () => {
  const rules = parseRuleDocs();
  const groups = [...groupByPlugin(rules).entries()].map(
    ([plugin, pluginRules]) => ({
      plugin,
      rules: pluginRules.map((rule) => ({
        name: rule.name,
        slug: rule.slug,
        summary: rule.summary,
      })),
    }),
  );

  return { groups, total: rules.length };
};
