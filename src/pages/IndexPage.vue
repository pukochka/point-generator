<template>
  <q-page>
    <div id="world-map"></div>

    <div
      class="bg-grey absolute-top-right text-center"
      style="width: 60px; border-radius: 10px"
    >
      <div class="">{{ location.lat.toFixed(3) }}</div>
      <div class="">{{ location.lon.toFixed(3) }}</div>
    </div>

    <div class="row q-gutter-x-md q-pa-lg">
      <div class="col">
        <q-btn unelevated no-caps size="md" color="secondary" class="fit">
          <div v-if="generator.selected.length === 0">Выберите РЛС</div>

          <div v-else-if="generator.selected.length === 1">
            <div>{{ generator.selected[0].label }}</div>

            <div class="text-caption">
              {{ generator.selected[0].range[0] }} -
              {{ generator.selected[0].range[1] }} МГц
            </div>
          </div>

          <div v-else>Выбранно {{ generator.selected.length }}</div>

          <q-menu max-height="350px">
            <q-list style="width: 250px" dense>
              <q-item
                v-for="(rls, index) of rlsList"
                :key="index"
                clickable
                @click="generator.select(rls)"
              >
                <q-item-section>
                  <q-item-label>{{ rls.label }}</q-item-label>

                  <q-item-label caption>
                    {{ rls.range[0] }} - {{ rls.range[1] }} МГц
                  </q-item-label>
                </q-item-section>

                <q-item-section
                  side
                  v-if="generator.mappedSelected.includes(rls.label)"
                >
                  <q-icon name="check" color="primary" size="32px" />
                </q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </div>

      <div class="col">
        <q-btn
          no-caps
          unelevated
          size="md"
          color="accent"
          label="Рассчитать"
          class="fit"
          :disable="condition"
          @click="generator.calculateTracks"
        />
      </div>

      <div class="col" v-if="generator.moving >= 2">
        <q-btn
          no-caps
          unelevated
          size="md"
          color="warning"
          class="fit"
          label="Очистить"
          @click="generator.removeTrack"
        />
      </div>
    </div>

    <div class="column q-px-lg q-gutter-y-sm">
      <q-btn
        unelevated
        no-caps
        size="md"
        color="warning"
        class="col"
        :disable="condition"
        label="Сгенерировать сигналы"
        @click="generator.misleading"
      />

      <q-btn
        unelevated
        no-caps
        size="md"
        color="warning"
        class="col"
        :disable="condition"
        label="Сохранить"
        @click="generator.modal = true"
      />
    </div>

    <generate-modal></generate-modal>
  </q-page>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { onWindowResize, renderer } from 'src/lib/three/launch';
import { rlsList } from 'src/lib/meta';
import { handleClick, handleMousemove } from 'src/lib/three/vector';
import { useGeneratorStore } from 'stores/generatorStore';
import GenerateModal from 'components/GenerateModal.vue';
import { cartesianToDegrees } from '../lib/helpers';

const generator = useGeneratorStore();

const condition = computed(
  () =>
    !(
      generator.selected.length > 0 &&
      generator.moving > 1 &&
      empty(generator.misleadingCount) &&
      empty(generator.frequency) &&
      empty(generator.location)
    )
);

const location = computed(() =>
  cartesianToDegrees(generator.mouse.x, generator.mouse.y)
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
