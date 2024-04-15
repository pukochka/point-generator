<template>
  <q-page>
    <div id="world-map"></div>

    <div class="absolute-top-right text-right">
      <div class="">{{ location.lat.toFixed(3) }}</div>
      <div class="">{{ location.lon.toFixed(3) }}</div>
    </div>

    <q-btn
      flat
      size="md"
      color="primary"
      icon="check"
      label="OK"
      @click="generator.modal = true"
    />

    <generate-modal></generate-modal>
  </q-page>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { onWindowResize, renderer } from 'src/lib/three/launch';

import { handleClick, handleMousemove } from 'src/lib/three/vector';
import { useGeneratorStore } from 'stores/generatorStore';
import { cartesianToDegrees } from 'src/lib/helpers';
import GenerateModal from 'components/GenerateModal.vue';

const generator = useGeneratorStore();

const location = computed(() =>
  cartesianToDegrees(generator.mouse.x, generator.mouse.y)
);

onMounted(() => {
  const el = document.getElementById('world-map');

  if (el) {
    el.appendChild(renderer.domElement);
    el.addEventListener('resize', onWindowResize);
    el.addEventListener('mousemove', handleMousemove);
    el.addEventListener('click', handleClick);
  }
});
</script>
