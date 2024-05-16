import { Group, Mesh, MeshBasicMaterial, SphereGeometry } from 'three';
import { scene } from 'src/lib/three/launch';

import { firstDayPositions, secondDayPositions } from 'src/lib/meta';

export const firstGroup = new Group();
export const secondGroup = new Group();

export function initializeAxes() {
  for (let i = 0; i < 30; i++) {
    const geometry = new SphereGeometry(0.05, 32, 16);
    const material = new MeshBasicMaterial({ color: 0xffff00 });
    const sphere = new Mesh(geometry, material);

    const [x1, y1] = firstDayPositions[i];
    const [x2, y2] = secondDayPositions[i];

    sphere.position.set(x1, y1, 0);
    firstGroup.add(sphere);

    const sphere1 = sphere.clone();
    sphere1.position.set(x2, y2, 0);

    secondGroup.add(sphere1);
  }

  secondGroup.visible = false;

  scene.add(firstGroup, secondGroup);
}
