<template>
  <div class="flex flex-col md:flex-row h-screen bg-gray-50">
    <aside class="hidden md:flex border-r border-gray-200 flex-col bg-brand-bg">
      <div class="p-4 border-b border-gray-200 bg-brand-bg">
        <img src="~/assets/images/logo.png" alt="Logo" class="h-12 w-auto" />
      </div>

      <nav class="flex-1">
        <NuxtLink
          to="/orders"
          class="flex items-center justify-center px-3 py-2 text-gray-700 hover:bg-gray-100 mb-1"
          active-class="bg-white"
        >
          <DocumentTextIcon class="w-5 h-5" />
        </NuxtLink>

        <NuxtLink
          to="/menu"
          class="flex items-center justify-center px-3 py-2 text-gray-700 hover:bg-gray-100 mb-1"
          active-class="bg-white"
        >
          <BookOpenIcon class="w-5 h-5" />
        </NuxtLink>

        <NuxtLink
          to="/settings"
          class="flex items-center justify-center px-3 py-2 text-gray-700 hover:bg-gray-100"
          active-class="bg-white"
        >
          <Cog6ToothIcon class="w-5 h-5" />
        </NuxtLink>
      </nav>
    </aside>

    <div class="md:hidden flex items-center justify-between p-4 border-b border-gray-200 bg-brand-bg">
      <img src="~/assets/images/logo.png" alt="Logo" class="h-10 w-auto" />
    </div>

    <main class="flex-1 overflow-auto">
      <slot />
    </main>

    <nav class="md:hidden flex items-center justify-around border-t border-gray-200 py-2 bg-brand-bg">
      <NuxtLink
        to="/orders"
        class="flex flex-col items-center justify-center px-4 py-2 text-gray-700"
        active-class="bg-white"
      >
        <DocumentTextIcon class="w-6 h-6" />
        <span class="text-xs mt-1">Orders</span>
      </NuxtLink>

      <NuxtLink
        to="/menu"
        class="flex flex-col items-center justify-center px-4 py-2 text-gray-700"
        active-class="bg-white"
      >
        <BookOpenIcon class="w-6 h-6" />
        <span class="text-xs mt-1">Menu</span>
      </NuxtLink>

      <NuxtLink
        to="/settings"
        class="flex flex-col items-center justify-center px-4 py-2 text-gray-700"
        active-class="bg-white"
      >
        <Cog6ToothIcon class="w-6 h-6" />
        <span class="text-xs mt-1">Settings</span>
      </NuxtLink>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { DocumentTextIcon, BookOpenIcon, Cog6ToothIcon } from '@heroicons/vue/24/outline'
</script>
