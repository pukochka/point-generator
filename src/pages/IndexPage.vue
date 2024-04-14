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
        <q-btn unelevated no-caps size="md" color="primary" class="fit">
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
          color="positive"
          label="Рассчитать"
          class="fit"
          :disable="condition"
          @click="generator.calculateTracks"
        />
      </div>

      <div class="col">
        <q-input
          v-model="generator.misleadingCount"
          label="Кол-во ложных сигналов"
          outlined
          mask="####"
        />
      </div>

      <div class="col">
        <q-input
          v-model="generator.location"
          label="СКО координат"
          outlined
          suffix="°"
          mask="######"
        />
      </div>

      <div class="col">
        <q-input
          v-model="generator.frequency"
          label="СКО частоты"
          outlined
          suffix="МГц"
          mask="######"
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

      <q-btn no-caps unelevated flat size="md" color="primary" label="Витки">
        <q-menu>
          <q-list dense style="width: 250px">
            <q-item
              tag="label"
              v-for="[value, label] in Object.entries(turns)"
              :key="value"
            >
              <q-item-section>
                <q-item-label>{{ label }}</q-item-label>
              </q-item-section>

              <q-item-section side>
                <q-item-label>
                  <q-checkbox
                    @update:model-value="generator.updateVisible(Number(value))"
                    :model-value="Number(value) === generator.visible"
                    color="primary"
                  />
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>

      <q-btn
        flat
        size="md"
        color="primary"
        icon="info"
        :disable="generator.moving < 2"
      >
        <q-menu>
          <q-list dense style="width: 250px">
            <q-item v-for="(item, index) in info" :key="index">
              <q-item-section>
                <q-item-label>{{ item.label }}</q-item-label>
              </q-item-section>

              <q-item-section side>
                <q-item-label>{{ item.value }} </q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>
    </div>

    <div class="row justify-center">
      <div class="row q-gutter-x-md col-7">
        <q-btn
          unelevated
          no-caps
          size="md"
          color="info"
          class="col"
          :disable="condition"
          @click="generator.misleading"
        >
          <div>
            <div>Сгенерировать</div>
            <div>ложные сигналы</div>
          </div>
        </q-btn>

        <q-btn
          unelevated
          no-caps
          size="md"
          color="secondary"
          class="col"
          :disable="condition"
          @click="generator.modal = true"
        >
          <div>
            <div>Сохранить</div>
            <div>в файл</div>
          </div>
        </q-btn>
      </div>
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

const info = computed(() => [
  {
    label: 'Кол-во витков',
    value: generator.turns,
  },
  {
    label: 'Кол-во витков в зоне',
    value: generator.intersected,
  },
]);

const turns = {
  0: 'Все витки',
  1: 'В зоне обзора',
  2: 'Не в зоне обзора',
  3: 'Убрать витки',
};
</script>
