import { Mesh, MeshBasicMaterial, SphereGeometry } from 'three';
import { scene } from 'src/lib/three/launch';
import { points } from 'src/lib/meta';
import { degreesToCartesian } from 'src/lib/helpers';
import { useGeneratorStore } from 'stores/generatorStore';

function sphere(color: string) {
  const geometry = new SphereGeometry(0.1, 32, 16);
  const material = new MeshBasicMaterial({ color });

  return new Mesh(geometry, material);
}

export function createElasticPoints() {
  const generator = useGeneratorStore();

  for (const value of points) {
    const point = sphere(value.color);

    const [lat] = value.lat;
    const [lon] = value.lon;

    const { x, y, z } = degreesToCartesian(lat, lon);

    point.position.set(y, x, z);

    generator.points.push({ point, value });

    scene.add(point);
  }
}
