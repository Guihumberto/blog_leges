<template>
  <div class="loading-container">
    <v-progress-circular
      indeterminate
      :size="size"
      :width="width"
      :color="color"
    ></v-progress-circular>
    <p v-if="message" class="mt-4 text-center">{{ message }}</p>
  </div>
</template>

<script setup lang="ts">
  interface Props {
    size?: number
    width?: number
    color?: string
    message?: string
  }

  withDefaults(defineProps<Props>(), {
    size: 64,
    width: 4,
    color: 'primary',
    message: 'Carregando...'
  })
  </script>

  <style scoped>
  .loading-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2rem;
  }
</style>