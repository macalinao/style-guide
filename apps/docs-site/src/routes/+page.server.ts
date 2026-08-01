import { parseRuleDocs } from "$lib/server/rules";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = () => {
  const rules = parseRuleDocs();
  return { ruleCount: rules.length };
};
