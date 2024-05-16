<template>
  <q-page class="justify-center row">
    <div class="">
      <div class="row justify-start">
        <q-tabs dense v-model="store.tab" class="text-primary">
          <q-tab
            no-caps
            name="1"
            class="q-px-xl"
            @click="updateVisiblePositions"
          >
            <div class="text-weight-bold text-body1">1 день</div>
          </q-tab>

          <q-tab
            no-caps
            name="2"
            class="q-px-xl"
            @click="updateVisiblePositions"
          >
            <div class="text-weight-bold text-body1">2 день</div>
          </q-tab>

          <q-separator vertical class="q-px-xs" />

          <q-btn
            square
            unelevated
            :flat="selected !== 1"
            size="md"
            color="brand"
            class="q-px-xl"
            @click="selected = 1"
          >
            <div class="text-weight-bold text-body1">КРЭК</div>
          </q-btn>

          <q-btn
            square
            unelevated
            :flat="selected !== 2"
            size="md"
            color="positive"
            class="q-px-xl"
            @click="selected = 2"
          >
            <div class="text-weight-bold text-body1">КОЭК</div>
          </q-btn>

          <q-btn
            square
            unelevated
            :flat="selected !== 3"
            size="md"
            color="secondary"
            class="q-px-xl"
            @click="selected = 3"
          >
            <div class="text-weight-bold text-body1">НРЭК</div>
          </q-btn>

          <q-separator vertical class="q-px-xs" />

          <q-btn
            square
            flat
            dense
            size="md"
            color="red"
            icon="close"
            @click="selected = 0"
          />
        </q-tabs>
      </div>

      <div class="relative-position bordered rounded-borders">
        <div id="world-map"></div>

        <q-card flat bordered square class="absolute-top-left">
          <satellite-link v-if="selected === 1"></satellite-link>

          <optic-link v-if="selected === 2"></optic-link>

          <ground-link v-if="selected === 3"></ground-link>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { onWindowResize, renderer } from 'src/lib/three/launch';

import { handleMousemove } from 'src/lib/three/vector';

import { firstGroup, secondGroup } from 'src/lib/three/axes';

import SatelliteLink from 'components/SatelliteLink.vue';
import OpticLink from 'components/OpticLink.vue';
import GroundLink from 'components/GroundLink.vue';
import { useGeneratorStore } from 'stores/generatorStore';

const store = useGeneratorStore();

const selected = ref(0);

const updateVisiblePositions = () => {
  firstGroup.visible = !firstGroup.visible;
  secondGroup.visible = !secondGroup.visible;
};

onMounted(() => {
  const el = document.getElementById('world-map');
  if (el) {
    el.appendChild(renderer.domElement);
    el.addEventListener('resize', onWindowResize);
    el.addEventListener('mousemove', handleMousemove);
  }
});
</script>
<style></style>
