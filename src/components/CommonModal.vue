<template>
  <q-dialog v-model="store.common" full-width>
    <q-card>
      <div class="row justify-end">
        <q-btn flat size="md" color="primary" icon="close" v-close-popup />
      </div>

      <q-card-section
        class="q-pt-none"
        style="max-width: 800px; margin: 0 auto"
      >
        <satellite-link></satellite-link>

        <optic-link></optic-link>

        <ground-link></ground-link>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { useGeneratorStore } from 'stores/generatorStore';
import SatelliteLink from 'components/SatelliteLink.vue';
import OpticLink from 'components/OpticLink.vue';
import GroundLink from 'components/GroundLink.vue';

const store = useGeneratorStore();
</script>

<style scoped></style>
