<template>
  <q-list dense style="width: 500px; max-height: 500px; overflow-y: scroll">
    <q-item v-for="item in optic" :key="item.link">
      <q-item-section>
        <q-item-label class="text-center text-h6 q-py-sm">
          {{ item.label }}
        </q-item-label>

        <q-img class="full-width" :src="item.link" />
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { optic1, optic2 } from 'src/lib/meta';
import { useGeneratorStore } from 'stores/generatorStore';

const store = useGeneratorStore();

const optic = computed(() => (store.tab === '1' ? optic1 : optic2));
</script>

<style scoped></style>
