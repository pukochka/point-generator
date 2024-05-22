<template>
  <q-page class="justify-center row">
    <div class="">
      <div class="row justify-start">
        <q-tabs dense v-model="store.tab" class="text-primary">
          <q-btn
            square
            no-caps
            unelevated
            size="md"
            color="primary"
            @click="store.modal = !store.modal"
          >
            <div class="text-weight-bold text-body1">Загрузить</div>
          </q-btn>

          <q-tab
            v-if="store.situation !== 0"
            no-caps
            name="1"
            class="q-px-lg"
            @click="updateVisible(true)"
          >
            <div class="text-weight-bold text-body1">
              {{ situations[store.situation][1] }}
            </div>
          </q-tab>

          <q-tab
            v-if="store.situation !== 0"
            no-caps
            name="2"
            class="q-px-lg"
            @click.prevent="updateVisible"
          >
            <div class="text-weight-bold text-body1">
              {{ situations[store.situation][2] }}
            </div>
          </q-tab>

          <q-separator vertical class="q-px-xs" />

          <q-btn
            square
            unelevated
            :flat="selected !== 1"
            size="md"
            color="brand"
            class="q-px-xl"
            :disable="store.situation === 0"
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
            :disable="store.situation === 0"
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
            :disable="store.situation === 0"
            @click="selected = 3"
          >
            <div class="text-weight-bold text-body1">НРЭК</div>
          </q-btn>

          <q-btn
            no-caps
            square
            flat
            size="md"
            color="red"
            class="q-px-xl"
            :disable="store.situation === 0"
            @click="store.common = true"
          >
            <div class="text-weight-bold text-body1">Общая</div>
          </q-btn>

          <q-separator vertical class="q-px-xs" />

          <q-btn
            v-if="store.situation !== 0"
            square
            flat
            dense
            size="md"
            color="red"
            icon="close"
            @click="closeAll"
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

  <upload-modal></upload-modal>

  <common-modal></common-modal>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { onWindowResize, renderer } from 'src/lib/three/launch';

import { handleMousemove } from 'src/lib/three/vector';

import {
  firstGroup,
  forthGroup,
  secondGroup,
  thirdGroup,
} from 'src/lib/three/axes';

import SatelliteLink from 'components/SatelliteLink.vue';
import OpticLink from 'components/OpticLink.vue';
import GroundLink from 'components/GroundLink.vue';
import { useGeneratorStore } from 'stores/generatorStore';
import UploadModal from 'components/UploadModal.vue';
import CommonModal from 'components/CommonModal.vue';

const store = useGeneratorStore();

const selected = ref(0);

const updateVisible = (first?: boolean) => {
  if (first === true) {
    if (store.situation === 1) {
      firstGroup.visible = true;
      secondGroup.visible = false;
      thirdGroup.visible = false;
      forthGroup.visible = false;

      return;
    }

    firstGroup.visible = false;
    secondGroup.visible = false;
    thirdGroup.visible = true;
    forthGroup.visible = false;

    return;
  }

  if (store.situation === 1) {
    firstGroup.visible = false;
    secondGroup.visible = true;
    thirdGroup.visible = false;
    forthGroup.visible = false;

    return;
  }

  firstGroup.visible = false;
  secondGroup.visible = false;
  thirdGroup.visible = false;
  forthGroup.visible = true;
};

const closeAll = () => {
  selected.value = 0;
  store.situation = 0;

  firstGroup.visible = false;
  secondGroup.visible = false;
};

onMounted(() => {
  const el = document.getElementById('world-map');
  if (el) {
    el.appendChild(renderer.domElement);
    el.addEventListener('resize', onWindowResize);
    el.addEventListener('mousemove', handleMousemove);
  }
});

const situations = {
  1: {
    1: '16/05/2024',
    2: '17/05/2024',
  },
  2: {
    1: '22/05/2024',
    2: '23/05/2024',
  },
};
</script>
<style></style>
