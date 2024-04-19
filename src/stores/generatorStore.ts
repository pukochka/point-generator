import { defineStore } from 'pinia';
import { GeneratorStore } from 'stores/generatorModels';

import { Vector2 } from 'three';
import { modes, RLS } from 'src/lib/meta';
import { degreesToCartesian } from 'src/lib/helpers';
import gsap from 'gsap';
import { Notify } from 'quasar';

export const useGeneratorStore = defineStore('gen', {
  state: () =>
    ({
      modal: false,
      movement: false,
      selected: [],
      points: [],

      mouse: new Vector2(0, 0),
    } as GeneratorStore),
  getters: {},
  actions: {
    select(item: RLS) {
      const condition = this.selected.map((s) => s.label).includes(item.label);

      if (condition) {
        this.selected = this.selected.filter((s) => s.label !== item.label);

        return;
      }

      this.selected.push(item);
    },

    updatePosition(value: boolean) {
      for (const point of this.points) {
        const { lat, lon } = point.value;
        const index = value ? 1 : 0;

        const { x, y, z } = degreesToCartesian(lat[index], lon[index]);

        gsap.to(point.point.position, { duration: 1, x: y, y: x, z });
      }
    },

    defineMode() {
      const mode: Record<number, number> = { 0: 0, 1: 0 };
      this.selected.forEach((m) => mode[m.order]++);

      let message = modes[2];

      if (mode[0] < mode[1]) {
        message = modes[1];
      } else if (mode[1] < mode[0]) {
        message = modes[0];
      }

      if (this.movement) message = modes[1];

      Notify.create({
        message: message.message,
        timeout: 10000,
        position: 'top',
        classes: ['q-pa-lg text-h5 ', message.classes].join(' '),
        actions: [
          {
            round: true,
            icon: 'close',
            color: 'white',
          },
        ],
      });
    },
  },
});
