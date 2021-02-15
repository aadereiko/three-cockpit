import { PerspectiveCamera } from 'three';
import { Vector3 } from 'three/build/three.module';

function createCamera() {
  const camera = new PerspectiveCamera(window.innerWidth/ window.innerHeight, 50, 0.1, 100000);

  camera.position.set(0, 4000, 25228);
  camera.lookAt(new Vector3())

  return camera;
}

export { createCamera };
