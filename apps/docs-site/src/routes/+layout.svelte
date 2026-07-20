<script lang="ts">
  import "../app.css";
  import { GITHUB_URL, SITE_TITLE } from "$lib/site";
  import type { Snippet } from "svelte";

  let { children }: { children: Snippet } = $props();
</script>

<div class="flex min-h-screen flex-col">
  <header class="border-b border-[var(--color-hairline)]">
    <nav
      class="mx-auto flex max-w-2xl items-center justify-between gap-6 px-6 py-4 text-sm"
    >
      <a href="/" class="font-semibold no-underline">{SITE_TITLE}</a>
      <div class="flex items-center gap-5 text-[var(--color-muted)]">
        <a
          href="/oxlint/base/"
          class="no-underline hover:text-[var(--color-ink)]">Oxlint</a
        >
        <a
          href={GITHUB_URL}
          class="no-underline hover:text-[var(--color-ink)]"
          rel="noreferrer">GitHub</a
        >
      </div>
    </nav>
  </header>

  <main class="mx-auto w-full max-w-2xl flex-1 px-6 py-12">
    {@render children()}
  </main>

  <footer
    class="border-t border-[var(--color-hairline)] text-sm text-[var(--color-muted)]"
  >
    <div class="mx-auto max-w-2xl px-6 py-8">
      &copy; {new Date().getFullYear()}
      <a href="https://ianm.com" rel="noreferrer">Ian Macalinao</a>
    </div>
  </footer>
</div>
