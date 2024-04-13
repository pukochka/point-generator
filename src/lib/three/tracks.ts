import { BufferGeometry, Group, Line, LineBasicMaterial, Vector2 } from 'three';
import {
  EARTH_RADIUS,
  FIRST_SPACE_SPEED,
  ORBIT_HEIGHT,
  SCENE_HEIGHT,
  SCENE_WIDTH,
  SECONDS_PER_DAY,
  TRACK_COLORS,
  ZONE_RADIUS,
} from 'src/lib/constants';
import { useGeneratorStore } from 'stores/generatorStore';
import { distanceBetweenCartesian } from 'src/lib/helpers';

const DENSITY = 200;
const ORBIT_LENGTH = 2 * Math.PI * (ORBIT_HEIGHT + EARTH_RADIUS);
const TIME_PER_TURN = ORBIT_LENGTH / FIRST_SPACE_SPEED;
const TURNS_PER_DAY = SECONDS_PER_DAY / TIME_PER_TURN;
const STEP_X = SCENE_WIDTH / DENSITY;
const STEP_Y = SCENE_HEIGHT / DENSITY;
const OFFSET = SCENE_WIDTH / TURNS_PER_DAY;
const DENSITY_PER_STEP = SCENE_WIDTH / DENSITY;
const COUNT = DENSITY / ((OFFSET * 100) / SCENE_WIDTH);

export const trackGroup = new Group();
export const trackIntersectsGroup = new Group();

export function drawSatelliteTracks(days: number) {
  const generator = useGeneratorStore();

  const turns = Math.floor(days * TURNS_PER_DAY);

  generator.turns = turns;

  let interceptor = 0;
  const intersects: Array<number> = [];

  for (let turn = 0; turn < turns; turn++) {
    const currentTurn = turn + 1;
    const points: Array<Vector2> = [];

    for (
      let index = 0 - turn * COUNT;
      index < DENSITY - turn * COUNT;
      index++
    ) {
      const x = STEP_X * index - SCENE_HEIGHT + DENSITY_PER_STEP * turn * COUNT;
      const y = Math.sin(STEP_Y * index) * 4;

      const point = new Vector2(x, y);

      const condition = generator.divisions
        .map(
          (division) => distanceBetweenCartesian(point, division) < ZONE_RADIUS
        )
        .filter(Boolean);

      if (condition.length && !intersects.includes(currentTurn)) {
        intersects.push(currentTurn);
      }

      points.push(point);
    }

    if (interceptor % 14 === 0) {
      interceptor = 0;
    }

    const color = TRACK_COLORS[interceptor];

    interceptor++;

    const material = new LineBasicMaterial({ color });
    const geometry = new BufferGeometry().setFromPoints(points);
    const line = new Line(geometry, material);

    if (intersects.includes(currentTurn)) {
      trackIntersectsGroup.add(line);
    } else {
      trackGroup.add(line);
    }
  }

  generator.intersects = intersects;
}
