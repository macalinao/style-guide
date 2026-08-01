<script lang="ts">
  import { SITE_TITLE, SITE_URL } from "$lib/site";
  import type { PageData } from "./$types";

  let { data }: { data: PageData } = $props();

  const title = "The base oxlint config";
  const canonical = `${SITE_URL}/oxlint/base/`;
  const description = $derived(
    `A prose walkthrough of all ${data.total} rules in @macalinao/oxlint-config, ` +
      "grouped by theme with the reasoning behind each one.",
  );

  const extendsSnippet = `// .oxlintrc.json
{
  "extends": ["./node_modules/@macalinao/oxlint-config/base.jsonc"]
}`;

  function severityLabel(severity: string): string {
    if (severity === "off") {
      return "off";
    }
    if (severity === "warn") {
      return "warn";
    }
    return "error";
  }
</script>

<svelte:head>
  <title>{title} — {SITE_TITLE}</title>
  <meta name="description" content={description} />
  <link rel="canonical" href={canonical} />
  <meta property="og:title" content={`${title} — ${SITE_TITLE}`} />
  <meta property="og:description" content={description} />
  <meta property="og:type" content="article" />
</svelte:head>

<article class="space-y-12">
  <section class="space-y-4">
    <p class="text-sm">
      <a href="/" class="text-[var(--color-muted)]">Style Guide</a>
    </p>
    <h1 class="text-2xl">The base oxlint config</h1>
    <p class="text-[var(--color-muted)]">
      <code>@macalinao/oxlint-config/base.jsonc</code> is the linting baseline I
      use across every TypeScript project. It denies oxlint's
      <code>correctness</code> category wholesale and then turns on
      <strong>{data.total}</strong> further rules by hand, each one chosen and documented
      rather than pulled in as part of a preset. This page is that config read top
      to bottom: related rules grouped together, with each group introduced by why
      the whole family is worth enforcing.
    </p>
    <p class="text-[var(--color-muted)]">
      Install <code>@macalinao/oxlint-config</code> and extend it from your
      <code>.oxlintrc.json</code>:
    </p>
    <pre
      class="overflow-x-auto rounded-none border border-[var(--color-hairline)] bg-[#fafafa] p-4 text-sm"><code
        >{extendsSnippet}</code
      ></pre>
  </section>

  <nav class="space-y-3 border-y border-[var(--color-hairline)] py-6">
    <h2 class="text-sm font-semibold tracking-wide text-[var(--color-muted)]">
      On this page
    </h2>
    <ol class="space-y-1 text-sm">
      {#each data.sections as section (section.id)}
        <li>
          <a href={`#${section.id}`}>{section.title}</a>
          <span class="text-[var(--color-muted)]">
            ({section.rules.length})</span
          >
        </li>
      {/each}
    </ol>
  </nav>

  {#each data.sections as section (section.id)}
    <section class="space-y-6">
      <div class="space-y-4">
        <h2 id={section.id} class="scroll-mt-8 text-lg">{section.title}</h2>
        {#each section.intro as paragraph, i (i)}
          <p class="text-[var(--color-muted)]">{paragraph}</p>
        {/each}
      </div>

      <div class="space-y-8">
        {#each section.rules as rule (rule.slug)}
          <div class="space-y-3">
            <div class="space-y-1">
              <h3
                id={rule.slug}
                class="scroll-mt-8 flex flex-wrap items-baseline gap-x-3 gap-y-1"
              >
                <code class="font-mono text-base break-words">{rule.name}</code>
                <span
                  class={`font-normal text-xs tracking-wide ${rule.severity === "off" ? "text-[var(--color-ink)]" : "text-[var(--color-muted)]"}`}
                >
                  {#if rule.severity === "off"}deliberately off{:else}{severityLabel(
                      rule.severity,
                    )}{/if}
                </span>
              </h3>
            </div>

            <p>{rule.summary}</p>

            {#if rule.details.length > 0}
              <div class="space-y-3 text-[var(--color-muted)]">
                {#each rule.details as paragraph, i (i)}
                  <p>{paragraph}</p>
                {/each}
              </div>
            {/if}

            {#if rule.optionsJson}
              <pre
                class="overflow-x-auto rounded-none border border-[var(--color-hairline)] bg-[#fafafa] p-3 text-xs"><code
                  >{rule.optionsJson}</code
                ></pre>
            {/if}

            <p class="text-sm">
              <a href={rule.docsUrl} rel="noreferrer"
                >oxlint docs for {rule.name} &rarr;</a
              >
            </p>
          </div>
        {/each}
      </div>
    </section>
  {/each}
</article>
