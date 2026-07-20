<script lang="ts">
  import { SITE_URL } from "$lib/site";
  import type { PageData } from "./$types";

  let { data }: { data: PageData } = $props();

  const PLUGIN_LABELS: Record<string, string> = {
    typescript: "TypeScript",
    react: "React",
    "react-hooks": "React Hooks",
    unicorn: "Unicorn",
    eslint: "ESLint Core",
  };

  function pluginLabel(plugin: string): string {
    return PLUGIN_LABELS[plugin] ?? plugin;
  }

  const title = "Rules";
  const description = $derived(
    `All ${data.total} lint rules in @macalinao/oxlint-config, grouped by plugin.`,
  );
</script>

<svelte:head>
  <title>{title} — Ian Macalinao's Style Guide</title>
  <meta name="description" content={description} />
  <link rel="canonical" href={`${SITE_URL}/rules/`} />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:type" content="website" />
</svelte:head>

<article class="space-y-10">
  <section class="space-y-3">
    <h1 class="text-2xl">Rules</h1>
    <p class="text-[var(--color-muted)]">
      {data.total} rules across {data.groups.length} plugins. Each rule links to
      its rationale and upstream documentation.
    </p>
  </section>

  {#each data.groups as group (group.plugin)}
    <section class="space-y-4">
      <h2 class="text-lg">{pluginLabel(group.plugin)}</h2>
      <ul class="space-y-4">
        {#each group.rules as rule (rule.slug)}
          <li class="space-y-1">
            <a href={`/rules/${rule.slug}/`} class="no-underline">
              <code class="text-[var(--color-ink)]">{rule.name}</code>
            </a>
            <p class="text-sm text-[var(--color-muted)]">{rule.summary}</p>
          </li>
        {/each}
      </ul>
    </section>
  {/each}
</article>
