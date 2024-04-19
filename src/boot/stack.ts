import { boot } from 'quasar/wrappers';

import { scene } from 'src/lib/three/launch';

import { group } from 'src/lib/three/vector';
import { createElasticPoints } from 'src/lib/three/points';

export default boot(() => {
  // initializeAxes();
  scene.add(group);
  createElasticPoints();
});
