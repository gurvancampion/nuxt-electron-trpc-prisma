<script setup lang="ts">
const { $trpc } = useNuxtApp()
const { data: msg } = useLazyAsyncData(() => $trpc.greeting.query({ name: 'world' }))

watch(msg, (msg) => {
// eslint-disable-next-line no-console
  console.log(msg)
})
</script>

<template>
  <NuxtWelcome />
</template>
