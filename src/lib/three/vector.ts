import {
  Group,
  Mesh,
  MeshBasicMaterial,
  Raycaster,
  SphereGeometry,
} from 'three';
import { camera, HEIGHT, WIDTH } from 'src/lib/three/launch';

import { useGeneratorStore } from 'stores/generatorStore';

import {
  HALF_HEIGHT,
  HALF_WIDTH,
  SCENE_HEIGHT,
  SCENE_WIDTH,
} from 'src/lib/constants';

export const raycaster = new Raycaster();
export const group = new Group();

function createPoint() {
  const geometry = new SphereGeometry(0.05, 32, 16);
  const material = new MeshBasicMaterial({ color: 'red' });

  return new Mesh(geometry, material);
}

export function handleClick() {
  const generator = useGeneratorStore();

  raycaster.setFromCamera(generator.mouse.clone(), camera);

  generator.moving++;

  if (generator.moving < 6) {
    const point = createPoint();

    const { x, y } = generator.mouse;
    point.position.set(x, y, 0);

    group.add(point);
    generator.points.push(point);
  }
}

export function handleMousemove(ev: MouseEvent) {
  const generator = useGeneratorStore();

  const x = (ev.clientX / WIDTH) * SCENE_WIDTH - HALF_WIDTH;
  const y = -(ev.clientY / HEIGHT) * SCENE_HEIGHT + HALF_HEIGHT;

  generator.mouse.set(x, y);
}
