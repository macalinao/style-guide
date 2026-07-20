import configRaw from "@macalinao/oxlint-config/base.jsonc?raw";
import { createScanner, parse } from "jsonc-parser";

/**
 * jsonc-parser exports `SyntaxKind` as a `const enum`, which cannot be
 * referenced under `verbatimModuleSyntax`. These are its stable numeric token
 * kinds, used to compare against the values returned by the scanner.
 */
const Tok = {
  OpenBraceToken: 1,
  CloseBraceToken: 2,
  OpenBracketToken: 3,
  CloseBracketToken: 4,
  CommaToken: 5,
  StringLiteral: 10,
  LineCommentTrivia: 12,
  BlockCommentTrivia: 13,
  LineBreakTrivia: 14,
  Trivia: 15,
  EOF: 17,
} as const;

export interface RuleDoc {
  /** Full rule key, e.g. "typescript/await-thenable" or "eqeqeq". */
  name: string;
  /** Plugin prefix, or "eslint" for unprefixed core rules. */
  plugin: string;
  /** URL-safe identifier: name with "/" replaced by "-". */
  slug: string;
  /** Configured severity: "error" | "warn" | "off". */
  severity: string;
  /** Options object when configured as [severity, options]; otherwise null. */
  options: unknown;
  /** First comment paragraph above the rule (the summary). */
  summary: string;
  /** Remaining comment paragraphs. */
  details: string[];
}

/**
 * The oxlint config data, typed loosely: `rules` maps a rule name to either a
 * bare severity string or a `[severity, options]` tuple.
 */
interface OxlintConfig {
  rules?: Record<string, string | [string, unknown]>;
}

/** Tracks a JSON container while scanning tokens. */
interface Container {
  isArray: boolean;
  isRules: boolean;
  expectKey: boolean;
}

/**
 * Walk the raw JSONC source and, for every property key inside the top-level
 * `rules` object, collect the contiguous run of `//` line comments immediately
 * above it. Returns a map from rule name to its raw comment lines (each still
 * including the leading `//`).
 */
function collectRuleComments(source: string): Map<string, string[]> {
  const scanner = createScanner(source, /* ignoreTrivia */ false);
  const stack: Container[] = [];
  const comments = new Map<string, string[]>();
  let commentBuffer: string[] = [];
  let nextObjectIsRules = false;

  let kind: number = scanner.scan();
  while (kind !== Tok.EOF) {
    // Accumulate consecutive line comments; let whitespace and line breaks
    // pass through without disturbing the buffer.
    if (kind === Tok.LineCommentTrivia) {
      commentBuffer.push(scanner.getTokenValue());
      kind = scanner.scan();
      continue;
    }
    if (
      kind === Tok.LineBreakTrivia ||
      kind === Tok.Trivia ||
      kind === Tok.BlockCommentTrivia
    ) {
      kind = scanner.scan();
      continue;
    }

    const top = stack.length > 0 ? stack[stack.length - 1] : undefined;

    switch (kind) {
      case Tok.OpenBraceToken: {
        const isRules = nextObjectIsRules;
        nextObjectIsRules = false;
        stack.push({ isArray: false, isRules, expectKey: true });
        break;
      }
      case Tok.OpenBracketToken: {
        stack.push({ isArray: true, isRules: false, expectKey: false });
        break;
      }
      case Tok.CloseBraceToken:
      case Tok.CloseBracketToken: {
        stack.pop();
        break;
      }
      case Tok.CommaToken: {
        if (top && !top.isArray) {
          top.expectKey = true;
        }
        break;
      }
      case Tok.StringLiteral: {
        if (top && !top.isArray && top.expectKey) {
          // This string is a property key.
          const keyName = scanner.getTokenValue();
          // The root object is the only container on the stack when its keys
          // are read; a `rules` key there marks the next object as the rules
          // object.
          if (stack.length === 1 && keyName === "rules") {
            nextObjectIsRules = true;
          }
          if (top.isRules) {
            comments.set(keyName, [...commentBuffer]);
          }
          top.expectKey = false;
        }
        break;
      }
      default:
        break;
    }

    // Any non-trivia token ends a comment run.
    commentBuffer = [];
    kind = scanner.scan();
  }

  return comments;
}

/** Strip `//` and one leading space, then group lines into prose paragraphs. */
function toParagraphs(commentLines: string[]): string[] {
  const stripped = commentLines.map((line) => {
    // jsonc-parser's scanner includes the whitespace char immediately before
    // the `//` in the token value, so trim leading whitespace before stripping
    // the comment marker.
    let text = line.trimStart();
    if (text.startsWith("//")) {
      text = text.slice(2);
    }
    if (text.startsWith(" ")) {
      text = text.slice(1);
    }
    return text.replace(/\s+$/, "");
  });

  const paragraphs: string[] = [];
  let current: string[] = [];
  for (const line of stripped) {
    if (line.trim() === "") {
      if (current.length > 0) {
        paragraphs.push(current.join(" "));
        current = [];
      }
    } else {
      current.push(line.trim());
    }
  }
  if (current.length > 0) {
    paragraphs.push(current.join(" "));
  }
  return paragraphs;
}

/**
 * Parse the oxlint config and produce one {@link RuleDoc} per configured rule.
 * Throws, naming the offending rule, if any rule lacks a comment block — this
 * is the enforcement mechanism that keeps every rule documented.
 */
export function parseRuleDocs(): RuleDoc[] {
  const config = parse(configRaw) as OxlintConfig;
  const rules = config.rules;
  if (!rules || typeof rules !== "object") {
    throw new Error(
      "oxlint config has no `rules` object; cannot build rule docs.",
    );
  }

  const commentsByRule = collectRuleComments(configRaw);
  const docs: RuleDoc[] = [];

  for (const [name, value] of Object.entries(rules)) {
    const rawComments = commentsByRule.get(name);
    const paragraphs = rawComments ? toParagraphs(rawComments) : [];
    if (paragraphs.length === 0) {
      throw new Error(
        `Rule "${name}" is missing its rationale comment block in ` +
          "@macalinao/oxlint-config/base.jsonc. Every rule must be preceded " +
          "by a `//` comment block whose first paragraph summarizes it.",
      );
    }

    let severity: string;
    let options: unknown = null;
    if (Array.isArray(value)) {
      severity = String(value[0]);
      options = value.length > 1 ? value[1] : null;
    } else {
      severity = String(value);
    }

    const slashIndex = name.indexOf("/");
    const plugin = slashIndex === -1 ? "eslint" : name.slice(0, slashIndex);

    docs.push({
      name,
      plugin,
      slug: name.replaceAll("/", "-"),
      severity,
      options,
      summary: paragraphs[0],
      details: paragraphs.slice(1),
    });
  }

  return docs;
}

/**
 * Group rules by plugin, preserving first-seen plugin order and rule order
 * within each plugin.
 */
export function groupByPlugin(rules: RuleDoc[]): Map<string, RuleDoc[]> {
  const groups = new Map<string, RuleDoc[]>();
  for (const rule of rules) {
    const existing = groups.get(rule.plugin);
    if (existing) {
      existing.push(rule);
    } else {
      groups.set(rule.plugin, [rule]);
    }
  }
  return groups;
}

/** Map a config plugin prefix to its path segment in the oxc.rs docs site. */
function docsPluginPath(plugin: string): string {
  // oxlint documents react-hooks rules (rules-of-hooks, exhaustive-deps) under
  // the `react` plugin path.
  if (plugin === "react-hooks") {
    return "react";
  }
  return plugin;
}

/** Build the canonical oxc.rs documentation URL for a rule. */
export function ruleDocsUrl(rule: RuleDoc): string {
  const slashIndex = rule.name.indexOf("/");
  const shortName =
    slashIndex === -1 ? rule.name : rule.name.slice(slashIndex + 1);
  const pluginPath = docsPluginPath(rule.plugin);
  return `https://oxc.rs/docs/guide/usage/linter/rules/${pluginPath}/${shortName}`;
}
