<template>
  <q-page class="non-selectable">
    <div class="row justify-center">
      <div id="world-map"></div>
    </div>

    <div class="row justify-center">
      <div class="row col-8 justify-between">
        <div class="row">
          <q-btn
            square
            flat
            no-caps
            size="md"
            color="secondary"
            label="Определить режим"
            @click="generator.defineMode"
          />

          <q-item clickable dense>
            <q-toggle
              @update:model-value="generator.updatePosition"
              v-model="generator.movement"
              label="Построение"
              color="negative"
            />
          </q-item>
        </div>

        <div class="row">
          <q-btn
            square
            flat
            no-caps
            size="md"
            color="primary"
            label="Открыть таблицу"
            @click="generator.modal = true"
          />

          <q-btn
            square
            flat
            size="md"
            color="primary"
            icon="info"
            :disable="!generator.movement"
          >
            <q-menu max-width="300px">
              <div class="q-pa-sm">
                <div class="">Среднее расстояние между АУГ</div>

                <q-item dense>
                  <q-item-section avatar>
                    <q-avatar size="12px" color="green" />
                  </q-item-section>

                  <q-item-section>1 АУГ</q-item-section>

                  <q-item-section side>30 км</q-item-section>
                </q-item>

                <q-item dense>
                  <q-item-section avatar>
                    <q-avatar size="12px" color="blue" />
                  </q-item-section>

                  <q-item-section>2 АУГ</q-item-section>

                  <q-item-section side>12 км</q-item-section>
                </q-item>
              </div>
            </q-menu>
          </q-btn>
        </div>
      </div>
    </div>

    <div class="row justify-center">
      <div class="row justify-center col-8">
        <q-item
          tag="label"
          class="col-4"
          v-for="(rls, index) of rlsList"
          :key="index"
        >
          <q-item-section side>
            <q-checkbox
              dense
              :model-value="
                generator.selected.map((s) => s.label).includes(rls.label)
              "
              @update:model-value="generator.select(rls)"
              color="primary"
            />
          </q-item-section>

          <q-item-section>{{ rls.label }}</q-item-section>

          <q-item-section side>
            <q-btn round flat size="sm" color="primary" icon="info">
              <q-menu max-width="200px">
                <div class="q-pa-sm">{{ rls.description }}</div>
              </q-menu>
            </q-btn>
          </q-item-section>
        </q-item>

        <q-item tag="label" class="col-4" @click="generator.selected = []">
          <q-item-section class="text-center text-warning text-weight-bold">
            Очистить
          </q-item-section>
        </q-item>
      </div>
    </div>

    <generate-modal></generate-modal>
  </q-page>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { onWindowResize, renderer } from 'src/lib/three/launch';

import { handleClick, handleMousemove } from 'src/lib/three/vector';
import { useGeneratorStore } from 'stores/generatorStore';
import GenerateModal from 'components/GenerateModal.vue';
import { rlsList } from 'src/lib/meta';

const generator = useGeneratorStore();

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
