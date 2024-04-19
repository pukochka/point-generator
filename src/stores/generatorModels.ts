import { Mesh, Vector2 } from 'three';
import { RLS } from 'src/lib/meta';

export interface GeneratorStore {
  modal: boolean;
  movement: boolean;

  selected: Array<RLS>;
  points: Array<{
    point: Mesh;
    value: { lat: Array<number>; lon: Array<number> };
  }>;
  mouse: Vector2;
}
