<script lang="ts">
  import { SITE_DESCRIPTION, SITE_TITLE, SITE_URL } from "$lib/site";
  import type { PageData } from "./$types";

  let { data }: { data: PageData } = $props();

  const packages: { name: string; description: string }[] = [
    {
      name: "@macalinao/oxlint-config",
      description: "Oxlint configuration — the rules documented on this site.",
    },
    {
      name: "@macalinao/biome-config",
      description: "Biome formatter and linter configuration.",
    },
    {
      name: "@macalinao/eslint-config",
      description: "Base ESLint configuration for TypeScript projects.",
    },
    {
      name: "@macalinao/eslint-config-react",
      description: "ESLint configuration for React projects.",
    },
    {
      name: "@macalinao/tsconfig",
      description: "Shared strict TypeScript configurations.",
    },
  ];

  const oxlintQuickStart = `// .oxlintrc.json
{
  "extends": ["./node_modules/@macalinao/oxlint-config/base.jsonc"]
}`;

  const tanstackSnippet = `// .oxlintrc.json
{
  "extends": [
    "./node_modules/@macalinao/oxlint-config/base.jsonc",
    "./node_modules/@macalinao/oxlint-config/tanstack-router.jsonc"
  ]
}`;
</script>

<svelte:head>
  <title>{SITE_TITLE}</title>
  <meta name="description" content={SITE_DESCRIPTION} />
  <link rel="canonical" href={`${SITE_URL}/`} />
  <meta property="og:title" content={SITE_TITLE} />
  <meta property="og:description" content={SITE_DESCRIPTION} />
  <meta property="og:type" content="website" />
</svelte:head>

<article class="space-y-10">
  <section class="space-y-4">
    <h1 class="text-2xl">Ian Macalinao's Style Guide</h1>
    <p class="text-[var(--color-muted)]">
      A set of standardized TypeScript tooling configurations. These are the
      linting, formatting, and compiler settings I use across my projects,
      packaged so they can be shared and reused with a single dependency.
    </p>
  </section>

  <section class="space-y-4">
    <h2 class="text-lg">Packages</h2>
    <ul class="space-y-3">
      {#each packages as pkg (pkg.name)}
        <li>
          <a href={`https://www.npmjs.com/package/${pkg.name}`} rel="noreferrer">
            <code>{pkg.name}</code>
          </a>
          <span class="text-[var(--color-muted)]"> — {pkg.description}</span>
        </li>
      {/each}
    </ul>
  </section>

  <section class="space-y-4">
    <h2 class="text-lg">Quick start with oxlint</h2>
    <p class="text-[var(--color-muted)]">
      Install <code>@macalinao/oxlint-config</code> and extend it from your
      <code>.oxlintrc.json</code>:
    </p>
    <pre
      class="overflow-x-auto rounded-none border border-[var(--color-hairline)] bg-[#fafafa] p-4 text-sm"><code
        >{oxlintQuickStart}</code
      ></pre>
    <p class="text-[var(--color-muted)]">
      The configuration enables <strong>{data.ruleCount}</strong> rules. Each one
      is documented with the reasoning behind it —
      <a href="/oxlint/base/">read the annotated base config</a>.
    </p>
  </section>

  <section class="space-y-4">
    <h2 class="text-lg">TanStack Router add-on</h2>
    <p class="text-[var(--color-muted)]">
      Projects using <a
        href="https://tanstack.com/router"
        rel="noreferrer">TanStack Router</a
      >
      can layer on <code>tanstack-router.jsonc</code>, an opt-in config that
      ignores the generated <code>routeTree.gen.ts</code> file and relaxes the
      <code>react/only-export-components</code> rule for route modules:
    </p>
    <pre
      class="overflow-x-auto rounded-none border border-[var(--color-hairline)] bg-[#fafafa] p-4 text-sm"><code
        >{tanstackSnippet}</code
      ></pre>
  </section>
</article>
