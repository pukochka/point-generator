import { boot } from 'quasar/wrappers';

import { scene } from 'src/lib/three/launch';
import { trackGroup, trackIntersectsGroup } from 'src/lib/three/tracks';
import { misleadingGroup } from 'src/lib/signal';
import { group } from 'src/lib/three/vector';

export default boot(() => {
  // initializeAxes();
  scene.add(group);
  scene.add(trackGroup);
  scene.add(misleadingGroup);
  scene.add(trackIntersectsGroup);
});
