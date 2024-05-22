import { Group, Mesh, MeshBasicMaterial, SphereGeometry } from 'three';
import { scene } from 'src/lib/three/launch';

import { first, forth, second, third } from 'src/lib/meta';

export const firstGroup = new Group();
export const secondGroup = new Group();
export const thirdGroup = new Group();
export const forthGroup = new Group();

export function initializeAxes() {
  for (let i = 0; i < 30; i++) {
    const geometry = new SphereGeometry(0.05, 32, 16);
    const material = new MeshBasicMaterial({ color: 0xffff00 });
    const sphere = new Mesh(geometry, material);

    const [x1, y1] = first[i];
    const [x2, y2] = second[i];
    const [x3, y3] = third[i];
    const [x4, y4] = forth[i];

    sphere.position.set(x1, y1, 0);
    firstGroup.add(sphere);

    const sphere1 = sphere.clone();
    sphere1.position.set(x2, y2, 0);

    secondGroup.add(sphere1);

    const sphere2 = sphere.clone();
    sphere2.position.set(x3, y3, 0);

    thirdGroup.add(sphere2);

    const sphere3 = sphere.clone();
    sphere3.position.set(x4, y4, 0);

    forthGroup.add(sphere3);
  }

  firstGroup.visible = false;
  secondGroup.visible = false;
  thirdGroup.visible = false;
  forthGroup.visible = false;

  scene.add(firstGroup, secondGroup, thirdGroup, forthGroup);
}
