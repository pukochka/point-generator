import { PerspectiveCamera, Scene, TextureLoader, WebGLRenderer } from 'three';

export const scene = new Scene();

export const WIDTH = (window.innerWidth / 6) * 4;
export const HEIGHT = WIDTH / 2;

export const camera = new PerspectiveCamera(45, WIDTH / HEIGHT, 0.1, 10000);
camera.position.z = 15;

scene.background = new TextureLoader().load('./worldmap1.png');

export const renderer = new WebGLRenderer();
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(WIDTH, HEIGHT);

export function onWindowResize() {
  camera.aspect = WIDTH / HEIGHT;

  camera.updateProjectionMatrix();

  renderer.setSize(WIDTH, HEIGHT);
}

export function animate() {
  requestAnimationFrame(animate);

  render();
}

function render() {
  renderer.render(scene, camera);
}
