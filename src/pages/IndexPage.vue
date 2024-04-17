<template>
  <q-page>
    <div id="world-map"></div>

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
          v-model="generator.speed"
          label="Скорость"
          outlined
          suffix="км/ч"
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

      <q-btn flat size="md" color="primary" :icon="mdiCog">
        <q-menu>
          <q-list style="width: 300px">
            <q-input
              square
              v-model="generator.divisionsCount"
              label="Кол-во делений на трассе"
              outlined
              type="number"
            />
            <q-input
              square
              v-model="generator.misleadingCount"
              label="Кол-во дополнительных точек на делении"
              outlined
              type="number"
            />
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
import { mdiCog } from '@quasar/extras/mdi-v7';

const generator = useGeneratorStore();

const condition = computed(
  () =>
    !(
      generator.selected.length > 0 &&
      generator.moving > 1 &&
      empty(generator.speed) &&
      empty(generator.frequency) &&
      empty(generator.location)
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

  // setTimeout(add, 10000)
});

// const width = window.innerWidth - 64;
// const height = window.innerHeight - 64;
// const speed = 0.005;
// const density = (Math.PI * 7) / 4;
// let iteration = (3 * Math.PI) / 4;

// function add() {
//   const icon = createIcon();
//   const style = createStyle();
//
//   move(icon);
//
//   document.body.append(icon, style);
// }
//
// function move(icon: HTMLElement) {
//   if (iteration >= density) {
//     icon.setAttribute(
//       'style',
//       'left:calc(100vw - 30px - 64px);' +
//         'top:calc(100vh - (100vh - 64px - 200px));' +
//         'position:absolute;' +
//         'transition:0.5s'
//     );
//     icon.className = 'pulse';
//     icon.addEventListener('click', handleClick1);
//     return;
//   }
//
//   const x = Math.cos(iteration) * (width / 2) + width / 2;
//   const y = Math.sin(iteration) * (height / 2) + height / 2;
//
//   icon.setAttribute('style', `top:${y}px;left:${x}px;position:absolute;`);
//
//   iteration += speed;
//   requestAnimationFrame(move.bind(window, icon));
// }
//
// function handleClick1() {
//   const modal = document.createElement('div');
//   modal.className = 'fixed-full form-modal';
//
//   document.body.append(modal);
// }
//
// function createStyle() {
//   const style =
//     '.text-primary{color:#1976D2 !important}.q-icon{line-height: 1;width: 1em;height: 1em;flex-shrink: 0;letter-spacing: normal;text-transform: none;white-space: nowrap;word-wrap: normal;direction: ltr;text-align: center;position: relative;box-sizing: content-box;fill: currentColor;}';
//   const el = document.createElement('style');
//   el.appendChild(document.createTextNode(style));
//
//   return el;
// }
//
// function createIcon() {
//   const fabTelegramPlane =
//     'M446.7 98.6l-67.6 318.8c-5.1 22.5-18.4 28.1-37.3 17.5l-103-75.9-49.7 47.8c-5.5 5.5-10.1 10.1-20.7 10.1l7.4-104.9 190.9-172.5c8.3-7.4-1.8-11.5-12.9-4.1L117.8 284 16.2 252.2c-22.1-6.9-22.5-22.1 4.6-32.7L418.2 66.4c18.4-6.9 34.5 4.1 28.5 32.2z';
//   const el = document.createElement('div');
//   const root = document.createElement('i');
//   const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
//   const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
//
//   root.className = 'q-icon text-primary';
//   root.setAttribute('style', 'font-size: 64px;');
//   svg.setAttribute('viewBox', '0 0 448 512');
//   path.setAttribute('d', fabTelegramPlane);
//
//   svg.append(path);
//   root.append(svg);
//   el.append(root);
//   return el;
// }

const info = computed(() => [
  {
    label: 'Расстояние',
    value: generator.distance.toFixed(2) + ' км',
  },
  {
    label: 'Время',
    value: generator.time.toFixed(2) + ' ч',
  },
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
<style>
.form-modal {
  transition: 0.3s all;
  background: rgba(0, 0, 0, 0.12);
}
.pulse::after,
.pulse::before {
  content: '';
  position: absolute;
  border: 2px solid #1976d2;
  left: -20px;
  opacity: 0;
  right: -20px;
  top: -20px;
  bottom: -20px;
  border-radius: 50%;
  animation: pulse 2.5s linear infinite;
}

.pulse::after {
  animation-delay: 0.5s;
}

@keyframes pulse {
  0% {
    transform: scale(0.5);
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    transform: scale(1.2);
    opacity: 0;
  }
}
</style>
