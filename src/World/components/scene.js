import { Color, Fog, Scene } from 'three';

function createScene() {
  const scene = new Scene();
  scene.fog = new Fog(0xf7d9aa, 12000, 60000);
  return scene;
}

export { createScene };
