<script setup lang="ts">
const { $trpc } = useNuxtApp()
const { data } = useLazyAsyncData(() => $trpc.greeting.query({ name: 'world' }))
// eslint-disable-next-line no-console
console.log(data.value)
</script>

<template>
  <NuxtWelcome />
</template>
