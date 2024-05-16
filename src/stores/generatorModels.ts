import { Line2 } from 'three/examples/jsm/lines/Line2';
import { Vector2 } from 'three';
import { RLS } from 'src/lib/meta';

export interface GeneratorStore {
  track: Line2 | null;
  moving: number;
  distance: number;
  speed: number;
  days: number;
  d: number;

  time: number;
  turns: number;
  modal: boolean;

  start: Vector2;
  end: Vector2;
  mouse: Vector2;

  divisions: Array<Vector2>;
  visible: number;
  intersects: Array<number>;

  location: number;
  frequency: number;

  selected: Array<RLS>;

  uInt8Array: Uint8Array;

  filename: string;

  divisionsCount: number;
  misleadingCount: number;

  tab: string;
}
