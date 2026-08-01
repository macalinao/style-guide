/**
 * Thematic grouping of the @macalinao/oxlint-config base rules for the
 * /oxlint/base documentation page. Each section pulls a family of related
 * rules together under an intro that explains why that family is enabled,
 * rather than restating what each rule does.
 *
 * The `rules` arrays reference rules by their exact config name. Every base
 * rule must appear in exactly one section; {@link buildSections} in
 * `server/rules.ts` enforces that at build time, throwing if a rule is missing,
 * duplicated, or names a rule that does not exist.
 */
export interface RuleSection {
  /** Stable anchor id for the section heading and table of contents. */
  id: string;
  /** Human-readable section title. */
  title: string;
  /** One or two prose paragraphs introducing the family. Plain text. */
  intro: string[];
  /** Rule names in the order they should appear under the section. */
  rules: string[];
}

export const SECTIONS: RuleSection[] = [
  {
    id: "keeping-any-out",
    title: "Keeping any out of the type system",
    intro: [
      "Every rule here exists to stop any from spreading. any is less a type than a hole in the type system: the moment a value becomes any, the checker stops verifying what you do with it, and everything derived from it is any as well. One loose annotation at the top of a call chain quietly disables checking for everything downstream, and the leak is invisible because the code still compiles.",
      "The fix always has the same shape. Narrow untyped data to a real type at the boundary where it enters, with a schema or a guard or an assertion you can defend, and the typed interior of the program stays trustworthy. These rules put a wall at each point where any tries to cross into checked code: passing it as an argument, laundering it into a typed variable, calling it, reaching into its members, returning it to callers, or hiding a callable behind the bare Function type. When a shape is genuinely unknown, unknown is the honest choice, because it forces the narrowing step that any skips.",
    ],
    rules: [
      "typescript/no-explicit-any",
      "typescript/no-unsafe-argument",
      "typescript/no-unsafe-assignment",
      "typescript/no-unsafe-call",
      "typescript/no-unsafe-member-access",
      "typescript/no-unsafe-return",
      "typescript/no-unsafe-function-type",
    ],
  },
  {
    id: "async-correctness",
    title: "Async correctness",
    intro: [
      "Asynchronous code is where errors go to disappear. A promise that nobody awaits or returns runs on its own, and if it rejects there is no catch in the call stack to see it, so the failure either takes down the process or vanishes without a trace. These rules make the async control flow honest: every promise is awaited, returned, or explicitly marked fire-and-forget, and a promise never lands in a spot that silently ignores it, like an if condition or a void-returning callback.",
      "The rest of the section keeps errors debuggable across async boundaries. Throwing and rejecting with real Error objects preserves the stack trace that tells you where things went wrong, and typing a caught rejection as unknown forces the same narrowing you would do in a synchronous catch. Taken together they close the gap that makes async bugs so much harder to find than their synchronous equivalents.",
    ],
    rules: [
      "typescript/no-floating-promises",
      "typescript/no-misused-promises",
      "typescript/await-thenable",
      "typescript/require-await",
      "typescript/return-await",
      "typescript/strict-void-return",
      "typescript/only-throw-error",
      "typescript/prefer-promise-reject-errors",
      "typescript/use-unknown-in-catch-callback-variable",
    ],
  },
  {
    id: "nullability",
    title: "Nullability and its escape hatches",
    intro: [
      "null and undefined are the values most likely to crash a program, so the type system tracks them carefully, and the point of these rules is to not lie to it. The non-null assertion, that trailing bang, overrides the checker's nullability analysis with an unchecked promise that a value is present; if the promise is wrong you get exactly the runtime crash the types were meant to prevent. This config bans the bang outright, and separately catches the ways it goes wrong when someone reaches for it anyway: stacked, positioned so it reads like part of an operator, stuck on the end of an optional chain, or paired with a nullish coalesce that handles the case the assertion just swore was impossible.",
      "The other half of the section is about handling absence with the operators built for it. Nullish coalescing falls back only on null and undefined, not on every falsy value the way || does, so a legitimate 0 or empty string survives. Optional chaining expresses a short-circuit in one operator per hop instead of a ladder of && guards. Between them you can describe almost any nullable access precisely, which is what makes the ban on assertions livable.",
    ],
    rules: [
      "typescript/no-non-null-assertion",
      "typescript/no-confusing-non-null-assertion",
      "typescript/no-extra-non-null-assertion",
      "typescript/no-non-null-asserted-nullish-coalescing",
      "typescript/no-non-null-asserted-optional-chain",
      "typescript/non-nullable-type-assertion-style",
      "typescript/prefer-nullish-coalescing",
      "typescript/prefer-optional-chain",
    ],
  },
  {
    id: "coercion",
    title: "Coercion and comparison",
    intro: [
      "JavaScript's implicit coercion is a table almost nobody has fully memorized, and it turns operators into guessing games: + is addition or concatenation depending on runtime types, == walks a chain of conversions that makes empty string equal zero, and a plain object dropped into a string becomes the useless [object Object]. These rules refuse to let coercion happen silently. Where a conversion is genuinely intended, they force you to write it out with String() or Number() at the point it occurs, which turns an invisible surprise into a visible decision.",
      "That covers strict equality over loose, matching operand types for + and for template interpolation, negation only on numbers, and the Number namespace forms that do not coerce their argument the way the bare globals do. The common thread is that a reader scanning the code should be able to see every type change, because coercion bugs are precisely the ones that hide in the places you were not looking.",
    ],
    rules: [
      "eqeqeq",
      "typescript/restrict-plus-operands",
      "typescript/restrict-template-expressions",
      "typescript/no-base-to-string",
      "typescript/no-unsafe-unary-minus",
      "unicorn/prefer-number-properties",
    ],
  },
  {
    id: "enums",
    title: "Enums",
    intro: [
      "Enums are supposed to be a fixed set of named constants, and these rules keep them that way. An enum whose members are set by expressions, or auto-incremented, or accidentally duplicated, stops being a stable mapping: reorder a member and the numbers shift underneath anything that persisted them, or two names collapse to one value and a reverse lookup becomes ambiguous. Requiring explicit literal initializers, forbidding duplicate values, and keeping members all-numeric or all-string makes the enum's runtime shape obvious and safe to refactor.",
      "The last rule guards the comparison side. Checking an enum value against a bare literal of the underlying type compiles fine and silently decouples the code from the enum, so a rename or renumber leaves the comparison meaning the wrong thing with no error to catch it. Comparing against the enum member instead keeps the check tied to its source of truth.",
    ],
    rules: [
      "typescript/no-mixed-enums",
      "typescript/no-duplicate-enum-values",
      "typescript/prefer-literal-enum-member",
      "typescript/prefer-enum-initializers",
      "typescript/no-unsafe-enum-comparison",
    ],
  },
  {
    id: "control-flow",
    title: "Honest control flow",
    intro: [
      "Control flow should read the way it runs. These rules remove the small ambiguities that let a reader, or the author on a later edit, believe a branch does something it does not. Braces on every body stop the classic bug where a second line is added to an if and silently runs unconditionally. Dropping a redundant else after a return, and collapsing a lonely nested if into else if, flatten the staircase of nesting into a series of guard clauses that scan top to bottom.",
      "The rest is about conditions and the void type. Strict boolean expressions keep an any or an untyped union out of a condition where its truthiness is a coin flip, and reject testing an always-truthy object. Exhaustive switches turn adding a union member into a compile error at every switch that has not yet handled it, so the checker walks you to each place instead of letting a case fall through in production. And the void rules keep void meaning the one thing it should, the absence of a return, rather than being returned as a value, wrapped in a redundant operator, or dropped into a type where it misleads.",
    ],
    rules: [
      "curly",
      "no-else-return",
      "no-lonely-if",
      "typescript/strict-boolean-expressions",
      "typescript/switch-exhaustiveness-check",
      "typescript/no-confusing-void-expression",
      "typescript/no-meaningless-void-operator",
      "typescript/no-invalid-void-type",
    ],
  },
  {
    id: "dead-weight",
    title: "Dead weight: redundant types and needless code",
    intro: [
      "Every construct in code is something a reader has to account for, so a construct that does nothing is worse than neutral: it implies a meaning that is not there. A redundant type assertion suggests the value might not be what it looks like. A default parameter the type proves can never trigger implies undefined is possible when it is not. A condition the checker already knows the answer to hints at a case that cannot happen. These rules find the type-level and code-level noise that survives refactors and delete it, so what remains carries real information.",
      "Most of these are type-aware, which is what lets them prove a thing is genuinely redundant rather than merely looking so: a type argument that matches its default, a constituent one member already subsumes, a conversion on a value that is already that type, a generic parameter used only once. Alongside them sit the plain dead-code cases, unused variables and empty exports and annotations inference would supply anyway, that accumulate as an unread tax on anyone reading the file.",
    ],
    rules: [
      "typescript/no-duplicate-type-constituents",
      "typescript/no-redundant-type-constituents",
      "typescript/no-unnecessary-boolean-literal-compare",
      "typescript/no-unnecessary-condition",
      "typescript/no-unnecessary-template-expression",
      "typescript/no-unnecessary-type-arguments",
      "typescript/no-unnecessary-type-assertion",
      "typescript/no-unnecessary-type-conversion",
      "typescript/no-unnecessary-type-parameters",
      "typescript/no-unnecessary-type-constraint",
      "typescript/no-unnecessary-qualifier",
      "typescript/no-unnecessary-parameter-property-assignment",
      "typescript/no-useless-default-assignment",
      "typescript/no-useless-empty-export",
      "typescript/no-inferrable-types",
      "typescript/no-unused-vars",
    ],
  },
  {
    id: "writing-types",
    title: "Writing types consistently",
    intro: [
      "When two spellings mean the same thing, picking one removes a decision from every future edit and a source of pointless diff churn. This section is the config's set of house choices for authoring types: import type and export type on their own lines so the compiler can erase them, interface for object shapes, T[] for arrays, Record for index maps, as const for literals, the as form for assertions, type parameters on the constructor call rather than the annotation. None of these is a deep correctness issue on its own; the value is uniformity, so type code across the codebase reads as though one hand wrote it.",
      "A few of them do carry a real edge. Splitting type-only imports lets a bundler drop the statement entirely instead of keeping a runtime dependency alive. Banning the trap types, the {} that means any non-nullish value rather than an empty object and the boxed String and Number wrappers, steers you off two of TypeScript's oldest footguns toward the primitive or the shape you actually meant.",
    ],
    rules: [
      "typescript/consistent-type-imports",
      "typescript/consistent-type-exports",
      "typescript/consistent-type-definitions",
      "typescript/consistent-type-assertions",
      "typescript/consistent-generic-constructors",
      "typescript/consistent-indexed-object-style",
      "typescript/no-import-type-side-effects",
      "typescript/array-type",
      "typescript/prefer-as-const",
      "typescript/prefer-function-type",
      "typescript/no-empty-object-type",
      "typescript/no-wrapper-object-types",
    ],
  },
  {
    id: "signatures",
    title: "Function and method signatures",
    intro: [
      "A function's signature is the contract everyone reads before its body, so these rules keep that contract legible and sound. Overloads are required to sit together and to collapse when two of them differ only by an optional argument, so the full call surface is visible at once instead of scattered across a declaration. Parameters with defaults have to follow the required ones, because a default before a required argument can never actually be omitted. A getter and its setter must agree on type, so the value you read back matches what assignment accepts.",
      "The method-signature choice is the one with teeth: written as a property function type rather than method shorthand, the parameters are checked contravariantly instead of bivariantly, which rejects unsafe overrides the shorthand would wave through. The rest, return this for fluent builders and the reduce type parameter over an asserted initial value, keep inference flowing where a looser signature would quietly break the chain or suppress a check.",
    ],
    rules: [
      "typescript/method-signature-style",
      "typescript/adjacent-overload-signatures",
      "typescript/unified-signatures",
      "typescript/default-param-last",
      "typescript/prefer-return-this-type",
      "typescript/prefer-reduce-type-parameter",
      "typescript/related-getter-setter-pairs",
    ],
  },
  {
    id: "classes",
    title: "Classes",
    intro: [
      "Classes carry more implicit machinery than plain functions, and these rules keep that machinery from misfiring. The this binding is the main hazard: pull a method off its instance and it loses the receiver, so it breaks when a callback later invokes it, and aliasing this to a local is a dead workaround from before arrow functions captured it lexically. Marking constructor-only private fields readonly documents that they are fixed and makes accidental later mutation a compile error.",
      "The remaining rules catch classes that should not be classes at all, or that lie about their shape. A class that is only a bag of static members is a namespace imported from a language without free functions, and it blocks tree-shaking; exported functions do the job better. An interface merged onto a class can promise members the class never implements, and a new method or an interface constructor is almost always a misunderstanding of how to type something constructable. The literal-property-style rule keeps a class exposing its constants one consistent way.",
    ],
    rules: [
      "typescript/prefer-readonly",
      "typescript/unbound-method",
      "typescript/no-this-alias",
      "typescript/no-extraneous-class",
      "typescript/no-unsafe-declaration-merging",
      "typescript/no-misused-new",
      "typescript/class-literal-property-style",
    ],
  },
  {
    id: "arrays-and-stdlib",
    title: "Arrays, iteration, and the standard library",
    intro: [
      "The standard library already has a method for most of what people hand-roll, and the hand-rolled version is usually both slower and subtly wrong. filter(pred)[0] builds a whole array to read one element and lies about nullability, where find stops at the first match and returns an honest value-or-undefined. indexOf(x) !== -1 is an idiom you have to decode where includes states membership directly and handles NaN. startsWith and endsWith say what an index-and-slice comparison only implies. These rules push toward the named method that expresses the intent and carries the correct types.",
      "The iteration rules cut the other way, away from constructs that do not mean what they look like. for-in over an array walks string keys and inherited properties rather than elements, where for-of expresses element iteration directly and closes off a class of off-by-one and bounds mistakes. delete on an array index leaves a hole instead of shrinking the array, the default sort compares numbers as strings so 10 sorts before 9, and spreading the wrong thing quietly drops a prototype. Each has a correct form the rule steers you to.",
    ],
    rules: [
      "typescript/prefer-find",
      "typescript/prefer-includes",
      "typescript/prefer-string-starts-ends-with",
      "typescript/prefer-regexp-exec",
      "typescript/prefer-for-of",
      "typescript/no-for-in-array",
      "typescript/no-array-delete",
      "typescript/require-array-sort-compare",
      "typescript/no-misused-spread",
    ],
  },
  {
    id: "legacy-typescript",
    title: "Legacy TypeScript and honest suppressions",
    intro: [
      "This codebase is ES-modules-only, and a good deal of TypeScript's own history predates that decision. Namespaces, require imports, and triple-slash references are all pre-modules mechanisms for organizing and pulling in code, and each one defeats the static analysis, tree-shaking, and uniform resolution that standard import and export give every modern tool. These rules keep that older layer out of new code, where the only namespaces that remain legitimate live in ambient declaration files the rules do not touch. Where a namespace is written at all, the namespace keyword is required over the ambiguous module form.",
      "The other half is about suppressing the type checker honestly. A bare ts-ignore silences an error with no record of why and keeps silencing it long after the error is gone; ts-expect-error is self-cleaning, because the moment the code underneath stops erroring the directive itself becomes an error and prompts its own removal. Requiring a description on every suppression, and clearing out dead tslint comments, keeps every escape hatch justified in place and every comment honest about what actually runs.",
    ],
    rules: [
      "typescript/no-namespace",
      "typescript/prefer-namespace-keyword",
      "typescript/no-require-imports",
      "typescript/triple-slash-reference",
      "typescript/ban-ts-comment",
      "typescript/prefer-ts-expect-error",
      "typescript/ban-tslint-comment",
    ],
  },
  {
    id: "js-hygiene",
    title: "Classic JavaScript hygiene",
    intro: [
      "These are the plain JavaScript defaults, the ones that have nothing to do with types and everything to do with not stepping on rakes the language leaves lying around. var hoists and leaks across a loop iteration, which is the source of the classic closure-captures-the-last-value bug; let and const are block-scoped and read the way people actually reason about scope, and defaulting to const makes mutation the marked, visible case. Compound assignment states a mutation once instead of naming the target twice where the two copies can drift apart in an edit.",
      "The rest close specific footguns. Not reassigning parameters keeps a parameter name meaning the one thing the caller passed. Dot notation over bracket access keeps property reads checkable and renamable. Passing a string to setTimeout or the Function constructor is eval with all its injection surface and none of its excuses, dynamic delete turns an object into a deoptimized map, and writing document.cookie by hand is a string API that fails silently. And no-deprecated turns quiet reliance on code slated for removal into a build error you fix on your own schedule rather than during an emergency upgrade.",
    ],
    rules: [
      "no-var",
      "prefer-const",
      "operator-assignment",
      "no-param-reassign",
      "typescript/dot-notation",
      "typescript/no-implied-eval",
      "typescript/no-dynamic-delete",
      "unicorn/no-document-cookie",
      "typescript/no-deprecated",
    ],
  },
  {
    id: "react",
    title: "React",
    intro: [
      "The React rules are few because most of what this config enforces applies to React code already, but the ones here catch mistakes unique to the framework, and two of them are not negotiable. Hooks are identified purely by call order, so a hook behind a condition or inside a loop scrambles the state of every hook after it, and a dependency left out of an effect's array closes the effect over a stale value that drifts out of sync with the UI in ways that are miserable to reproduce. Both are caught statically here, at the one place they can be caught cheaply.",
      "The rest encode how the ecosystem has settled. Components are functions, not classes, because that is where hooks live and where new code composes. Empty elements self-close. And a module that exports a component exports only components, so Fast Refresh can hot-reload it without dropping the state you were looking at. The route-module and shadcn exceptions to that last one live in the tanstack-router add-on and the config overrides, where the pattern is deliberate.",
    ],
    rules: [
      "react-hooks/rules-of-hooks",
      "react-hooks/exhaustive-deps",
      "react/prefer-function-component",
      "react/self-closing-comp",
      "react/only-export-components",
    ],
  },
  {
    id: "deliberately-off",
    title: "Deliberately off",
    intro: [
      "A config is defined as much by what it declines to enforce as by what it turns on, and leaving these choices undocumented invites someone to flip them on later without knowing why they were off. Each rule here was considered and rejected for a concrete reason, not overlooked. Some are pure churn against this codebase's idioms: readonly parameter types would demand the modifier on nearly every function and prop, and explicit return types restate what inference already makes obvious, on a boundary the compiler's isolatedDeclarations already guards a stronger way.",
      "The others would actively make code worse. Banning the type assertion this config still allows would force every load-bearing narrowing cast through as unknown as T, which is strictly less safe. Marking every promise-returning function async inserts a microtask that changes behavior in timing-sensitive scheduling. Requiring consistent returns fights the documented React idiom for effect cleanup. And react-in-jsx-scope wants an import the automatic JSX runtime made dead years ago. Off, in every case, because turning them on would cost more than it pays.",
    ],
    rules: [
      "typescript/prefer-readonly-parameter-types",
      "typescript/explicit-function-return-type",
      "typescript/explicit-module-boundary-types",
      "typescript/no-unsafe-type-assertion",
      "typescript/promise-function-async",
      "typescript/consistent-return",
      "react/react-in-jsx-scope",
    ],
  },
];
