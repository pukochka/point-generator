<template>
  <q-list separator style="max-width: 700px">
    <q-item clickable v-for="(item, index) of ground" :key="index">
      <q-item-section v-for="(key, index) of Object.keys(item)" :key="index">
        <q-item-label>{{ item[key] }}</q-item-label>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { ground1, ground2, ground3, ground4 } from 'src/lib/meta';
import { useGeneratorStore } from 'stores/generatorStore';

const store = useGeneratorStore();

const ground = computed(() =>
  store.situation === 1
    ? store.tab === '1'
      ? ground1
      : ground2
    : store.tab === '1'
    ? ground3
    : ground4
);
</script>

<style scoped></style>
