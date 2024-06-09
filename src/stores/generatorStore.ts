import { defineStore } from 'pinia';
import { GeneratorStore } from 'stores/generatorModels';
import {
  drawSatelliteTracks,
  trackGroup,
  trackIntersectsGroup,
} from 'src/lib/three/tracks';
import { Mesh, MeshBasicMaterial, SphereGeometry, Vector2 } from 'three';

import { RLS } from 'src/lib/meta';
import { misleadingGroup, Signal } from 'src/lib/signal';
import { cartesianToDegrees, degreesToCartesian } from 'src/lib/helpers';
import axios from 'axios';
import { group } from 'src/lib/three/vector';

export const useGeneratorStore = defineStore('gen', {
  state: () =>
    ({
      track: null,
      moving: 0,
      distance: 0.1,
      speed: 60,

      time: 48,
      turns: 0,
      modal: false,

      start: new Vector2(0, 0),
      end: new Vector2(0, 0),
      mouse: new Vector2(0, 0),

      points: [],

      visible: 1,
      intersects: [],

      location: 1,
      frequency: 1000,

      selected: [],

      uInt8Array: new Uint8Array(),

      filename: '1',

      divisionsCount: 40,
      misleadingCount: 16,
    } as GeneratorStore),
  getters: {
    intersected: (state) => state.intersects.length,
    mappedSelected: (state) => state.selected.map((item) => item.label),
  },
  actions: {
    removeTrack() {
      this.track = null;
      this.moving = 0;
      this.intersects = [];
      this.points = [];
      this.selected = [];

      group.remove(...group.children);
      trackGroup.remove(...trackGroup.children);
      misleadingGroup.remove(...misleadingGroup.children);
      trackIntersectsGroup.remove(...trackIntersectsGroup.children);
    },

    updateVisible(value: number) {
      this.visible = value;

      trackGroup.visible = value !== 3 && (value === 0 || value === 2);
      trackIntersectsGroup.visible =
        value !== 3 && (value === 0 || value === 1);
    },

    calculateTracks() {
      this.updateVisible(1);
      drawSatelliteTracks(this.time / 24);
    },

    select(rls: RLS) {
      const condition = this.mappedSelected.includes(rls.label);

      if (condition) {
        this.selected = this.selected.filter(
          (item) => item.label !== rls.label
        );

        return;
      }

      if (this.selected.length >= 5) return;

      this.selected.push(rls);
    },

    misleading() {
      let offset = 0;
      this.uInt8Array = new Uint8Array(
        this.misleadingCount * this.points.length * 128
      );

      for (const point of this.points) {
        const randRLS = Math.floor(Math.random() * this.selected.length);
        const randTurn = Math.floor(Math.random() * this.intersects.length);
        const turn = this.intersects[randTurn];
        const rls = this.selected[randRLS];
        const degrees = cartesianToDegrees(point.position.x, point.position.y);

        for (let index = 0; index < this.misleadingCount - 1; index++) {
          const signal = new Signal(
            rls,
            degrees,
            this.location,
            this.frequency,
            turn
          );

          this.uInt8Array.set(signal.array, offset);
          offset += signal.array.length;
        }
      }
    },

    createFile() {
      axios
        .post('http://localhost:3000/', {
          signals: this.uInt8Array,
          name: this.filename,
        })
        .then(() => (this.filename = ''));
    },

    addFalsePoint(lat: number, lon: number) {
      const point = degreesToCartesian(lon, lat);

      const geometry = new SphereGeometry(0.02, 32, 16);
      const material = new MeshBasicMaterial({ color: 0xffff00 });
      const sphere = new Mesh(geometry, material);

      sphere.position.set(point.x, point.y, point.z);

      misleadingGroup.add(sphere);
    },
  },
});
