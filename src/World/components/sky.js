import { cloneUniforms } from "three";
import { Object3D } from "three/build/three.module";
import { createCloud } from "./cloud";

let sky = 0;

function createSky() {
  sky = new Object3D();

  const nClouds = 20;
  const stepAngle = (Math.PI * 2) / nClouds;

  for (let i = 0; i < nClouds; i++) {
    const cloud = createCloud();

    const finalAngle = stepAngle * i;
    const distance = 700 + Math.random() * 200;

    cloud.position.y = Math.sin(finalAngle) * distance;
    cloud.position.x = Math.cos(finalAngle) * distance;

    cloud.rotation.z = finalAngle + Math.PI / 2;
    cloud.position.z = -400 - Math.random() * 400;

    const size = 1 + Math.random() * 2;
    cloud.scale.set(size, size, size);

    sky.add(cloud);
    sky.tick = () => {
      sky.rotation.z += 0.01;
    };
  }

  sky.position.y = -600;

  return sky;
}

export { createSky };
