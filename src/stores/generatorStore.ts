import { defineStore } from 'pinia';
import { GeneratorStore } from 'stores/generatorModels';
import {
  drawSatelliteTracks,
  trackGroup,
  trackIntersectsGroup,
} from 'src/lib/three/tracks';
import { Mesh, MeshBasicMaterial, SphereGeometry, Vector2 } from 'three';
import { LineGeometry } from 'three/examples/jsm/lines/LineGeometry';
import { RLS, rlsList } from 'src/lib/meta';
import { misleadingGroup, Signal } from 'src/lib/signal';
import {
  cartesianToDegrees,
  degreesToCartesian,
  distanceBetweenCartesian,
  getRandomArbitrary,
} from 'src/lib/helpers';
import axios from 'axios';
import { group } from 'src/lib/three/vector';

export const useGeneratorStore = defineStore('gen', {
  state: () =>
    ({
      track: null,
      moving: 0,
      distance: 0.1,
      speed: 60,
      days: 1,

      time: 0,
      turns: 0,
      d: 0,
      modal: false,

      start: new Vector2(0, 0),
      end: new Vector2(0, 0),
      mouse: new Vector2(0, 0),

      divisions: [],

      visible: 1,
      intersects: [],

      location: 0.1,
      frequency: 1000,

      selected: [],

      uInt8Array: new Uint8Array(),

      filename: 'обстановка',

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
      this.d = 0;
      this.intersects = [];
      this.divisions = [];
      this.selected = [];

      group.remove(...group.children);
      trackGroup.remove(...trackGroup.children);
      misleadingGroup.remove(...misleadingGroup.children);
      trackIntersectsGroup.remove(...trackIntersectsGroup.children);
    },

    updateVisible(value: number) {
      this.visible = value;

      trackGroup.visible = false;
      trackIntersectsGroup.visible = true;
    },

    calculateTracks() {
      this.time = this.distance / (280 / 24); // В часах

      this.divisionsCount = getRandomArbitrary(4 * this.days, 8 * this.days);

      for (let index = 0; index <= this.divisionsCount; index++) {
        const start = this.start.clone();
        const end = this.end.clone();
        const length =
          index * (this.start.distanceTo(this.end) / this.divisionsCount);

        const division = end.sub(start).setLength(length).add(start);

        this.divisions.push(division);
      }

      this.updateVisible(2);
      drawSatelliteTracks(this.time / 24);
    },

    computeMouse(vec: Vector2) {
      vec.set(this.mouse.x, this.mouse.y);
    },

    computeGeometry() {
      const geometry = new LineGeometry();

      let end = this.end.clone();

      if (distanceBetweenCartesian(this.start, this.end) > 280 * this.days) {
        if (this.d === 0) {
          this.d = this.start.distanceTo(this.end);
        }

        end = this.end.sub(this.start).setLength(this.d).add(this.start);
      }

      geometry.setPositions([this.start.x, this.start.y, 0, end.x, end.y, 0]);

      return geometry;
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
        this.misleadingCount * this.divisionsCount * 128
      );

      for (const point of this.divisions) {
        const randRLS = Math.floor(Math.random() * rlsList.length);
        const randTurn = Math.floor(Math.random() * this.intersects.length);
        const turn = this.intersects[randTurn];
        const rls = rlsList[randRLS];
        const degrees = cartesianToDegrees(point.x, point.y);

        for (let i = 0; i < 12; i++) {
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
