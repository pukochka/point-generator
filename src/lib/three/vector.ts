import { Group, Raycaster } from 'three';
import { camera, HEIGHT, WIDTH } from 'src/lib/three/launch';
import { cartesianToDegrees, distanceBetweenDegrees } from 'src/lib/helpers';
import { useGeneratorStore } from 'stores/generatorStore';
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial';
import { Line2 } from 'three/examples/jsm/lines/Line2';
import {
  HALF_HEIGHT,
  HALF_WIDTH,
  SCENE_HEIGHT,
  SCENE_WIDTH,
} from 'src/lib/constants';

export const raycaster = new Raycaster();
export const group = new Group();
function createTrack() {
  const generator = useGeneratorStore();

  const geometry = generator.computeGeometry();
  const material = new LineMaterial({ color: 0x780000, linewidth: 0.004 });

  return new Line2(geometry, material);
}

export function handleClick() {
  const generator = useGeneratorStore();

  raycaster.setFromCamera(generator.mouse.clone(), camera);

  generator.moving++;

  if (generator.moving === 1) {
    const track = createTrack();

    generator.track = track;

    generator.computeMouse(generator.start);
    generator.computeMouse(generator.end);

    track.geometry.setFromPoints([generator.start, generator.end]);

    group.add(track);
  }

  if (generator.moving === 2) {
    const startDegrees = cartesianToDegrees(
      generator.start.x,
      generator.start.y
    );
    const endDegrees = cartesianToDegrees(generator.end.x, generator.end.y);

    generator.distance = distanceBetweenDegrees(startDegrees, endDegrees);
  }
}

export function handleMousemove(ev: MouseEvent) {
  const generator = useGeneratorStore();

  const x = (ev.clientX / WIDTH) * SCENE_WIDTH - HALF_WIDTH;
  const y = -(ev.clientY / HEIGHT) * SCENE_HEIGHT + HALF_HEIGHT;

  generator.mouse.set(x, y);

  if (generator.moving === 1) {
    generator.computeMouse(generator.end);

    if (generator.track) {
      generator.track.geometry = generator.computeGeometry();
    }
  }
}
