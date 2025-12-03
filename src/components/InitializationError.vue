<template>
  <main class="min-h-screen bg-gray-50 text-gray-900 flex items-center justify-center px-4">
    <section
      class="w-full max-w-2xl bg-white shadow-xl rounded-2xl border border-gray-100 p-8 space-y-6"
      role="alert"
      aria-live="assertive"
    >
      <header class="flex items-center gap-3 text-red-700">
        <span class="flex h-10 w-10 items-center justify-center rounded-full bg-red-50 border border-red-100">
          <svg
            aria-hidden="true"
            class="h-5 w-5 text-red-600"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
          </svg>
        </span>
        <div>
          <p class="text-sm font-semibold uppercase tracking-wide text-red-600">Startup issue</p>
          <h1 class="text-2xl font-bold">We could not start Blogchain</h1>
        </div>
      </header>

      <p class="text-base leading-relaxed text-gray-700">
        Something went wrong while loading the application. Please check your connection and try again. If the problem
        persists, contact support with the details below so we can investigate quickly.
      </p>

      <div class="rounded-xl bg-gray-50 border border-gray-200 p-4" data-testid="initialization-error-details">
        <p class="text-sm font-semibold text-gray-800">Error details</p>
        <p class="mt-1 text-sm text-gray-700 break-words" data-testid="initialization-error-message">
          {{ errorMessage }}
        </p>
      </div>

      <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div class="flex gap-3">
          <button
            type="button"
            class="inline-flex items-center justify-center rounded-lg bg-red-600 px-4 py-2 text-white font-semibold shadow hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            @click="$emit('retry')"
          >
            Retry startup
          </button>
          <button
            type="button"
            class="inline-flex items-center justify-center rounded-lg bg-white px-4 py-2 text-gray-900 font-semibold border border-gray-300 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            @click="reloadPage"
          >
            Reload page
          </button>
        </div>
        <p class="text-sm text-gray-600">
          Need help? <a class="text-red-700 underline" href="mailto:support@capsule.social">support@capsule.social</a>
        </p>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    errorMessage: string;
  }>(),
  {
    errorMessage: 'An unexpected error occurred while starting Blogchain.',
  },
);

const reloadPage = () => window.location.reload();
</script>
