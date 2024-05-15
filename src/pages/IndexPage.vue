<template>
  <q-page class="bg-brand">
    <div id="world-map"></div>

    <div
      class="bg-grey absolute-top-right text-center"
      style="width: 60px; border-radius: 10px"
    >
      <div class="">{{ location.lat.toFixed(3) }}</div>
      <div class="">{{ location.lon.toFixed(3) }}</div>
    </div>

    <div class="column q-gutter-y-md q-pa-lg">
      <q-btn
        no-caps
        unelevated
        size="lg"
        color="orange"
        label="Рассчитать"
        class="rounded"
        :disable="condition"
        text-color="black"
        @click="generator.calculateTracks"
      />

      <q-btn
        v-if="generator.moving >= 2"
        no-caps
        unelevated
        size="lg"
        color="orange"
        text-color="black"
        label="Очистить"
        class="rounded"
        @click="generator.removeTrack"
      />

      <q-btn
        unelevated
        no-caps
        size="lg"
        color="orange"
        text-color="black"
        label="Показать ложные сигналы"
        class="rounded"
        :disable="condition"
        @click="generator.misleading"
      />

      <q-btn
        unelevated
        no-caps
        size="lg"
        color="orange"
        label="Сохранить в файл"
        class="rounded"
        text-color="black"
        :disable="condition"
        @click="generator.modal = true"
      />
    </div>

    <div class="row justify-center q-gutter-x-sm q-px-lg">
      <q-input
        v-model="generator.frequency"
        label="Отклонение частоты"
        outlined
        class="bg-orange rounded col"
        suffix="МГц"
        mask="######"
      />

      <q-input
        v-model="generator.days"
        label="Кол-во суток"
        outlined
        class="bg-orange rounded col"
        mask="#"
      />

      <q-input
        v-model="generator.location"
        label="Отклонение координат"
        outlined
        class="bg-orange rounded col"
        suffix="°"
      />
    </div>

    <generate-modal></generate-modal>
  </q-page>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { onWindowResize, renderer } from 'src/lib/three/launch';

import { handleClick, handleMousemove } from 'src/lib/three/vector';
import { useGeneratorStore } from 'stores/generatorStore';
import GenerateModal from 'components/GenerateModal.vue';
import { cartesianToDegrees } from 'src/lib/helpers';

const generator = useGeneratorStore();

const location = computed(() =>
  cartesianToDegrees(generator.mouse.x, generator.mouse.y)
);

const condition = computed(
  () =>
    !(
      generator.moving > 1 &&
      empty(generator.frequency) &&
      empty(generator.days)
    )
);

const empty = (value: string | number) => !isNaN(Number(value)) && value !== '';

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
<style></style>
