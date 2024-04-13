import { BufferGeometry, Line, LineBasicMaterial, Vector2 } from 'three';
import { scene } from 'src/lib/three/launch';

const axisMaterial = new LineBasicMaterial({ color: '#cfd2cd' });
const horizontalStep = 6.25 / 8;
const verticalStep = 12.5 / 8;
const vertical = [-6.25, 6.25];
const horizontal = [-12.5, 12.5];

function drawAxes(
  direction: Array<number>,
  step: number,
  side: 'vertical' | 'horizontal'
) {
  const [top, bottom] = direction;
  const condition = side === 'vertical';

  for (let i = -8; i < 8; i++) {
    const start = new Vector2(
      condition ? step * i : top,
      condition ? top : step * i
    );
    const end = new Vector2(
      condition ? step * i : bottom,
      condition ? bottom : step * i
    );
    const geometry = new BufferGeometry().setFromPoints([start, end]);
    const line = new Line(geometry, axisMaterial);

    scene.add(line);
  }
}

export function initializeAxes() {
  drawAxes(vertical, verticalStep, 'vertical');
  drawAxes(horizontal, horizontalStep, 'horizontal');
}
