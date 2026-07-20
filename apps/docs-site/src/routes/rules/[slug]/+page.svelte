<script lang="ts">
  import { SITE_TITLE, SITE_URL } from "$lib/site";
  import type { PageData } from "./$types";

  let { data }: { data: PageData } = $props();

  const rule = $derived(data.rule);
  const canonical = $derived(`${SITE_URL}/rules/${rule.slug}/`);
</script>

<svelte:head>
  <title>{rule.name} — {SITE_TITLE}</title>
  <meta name="description" content={rule.summary} />
  <link rel="canonical" href={canonical} />
  <meta property="og:title" content={rule.name} />
  <meta property="og:description" content={rule.summary} />
  <meta property="og:type" content="article" />
</svelte:head>

<article class="space-y-6">
  <div class="space-y-3">
    <p class="text-sm">
      <a href="/rules/" class="text-[var(--color-muted)]">Rules</a>
    </p>
    <h1 class="font-mono text-xl break-words">{rule.name}</h1>
    <div class="flex flex-wrap gap-x-4 gap-y-1 text-sm text-[var(--color-muted)]">
      <span>plugin: {rule.plugin}</span>
      <span>severity: {rule.severity}</span>
    </div>
  </div>

  <p class="text-lg">{rule.summary}</p>

  {#if rule.details.length > 0}
    <div class="space-y-4 text-[var(--color-muted)]">
      {#each rule.details as paragraph, i (i)}
        <p>{paragraph}</p>
      {/each}
    </div>
  {/if}

  {#if data.optionsJson}
    <section class="space-y-2">
      <h2 class="text-sm font-semibold">Options</h2>
      <pre
        class="overflow-x-auto border border-[var(--color-hairline)] bg-[#fafafa] p-4 text-sm"><code
          >{data.optionsJson}</code
        ></pre>
    </section>
  {/if}

  <p class="text-sm">
    <a href={data.docsUrl} rel="noreferrer">Read the oxlint documentation &rarr;</a>
  </p>
</article>
