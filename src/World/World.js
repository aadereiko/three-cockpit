import { createCamera } from "./components/camera.js";
import { createLights } from "./components/lights.js";
import { createScene } from "./components/scene.js";
import { createHelpers } from "./components/helpers.js";

import { createRenderer } from "./systems/renderer.js";
import { Resizer } from "./systems/Resizer.js";
import { Loop } from "./systems/Loop.js";
import { createOrbitControls } from "./systems/controls.js";
import { createSea } from "./components/sea.js";
import { createSky } from "./components/sky.js";
import { createAirPlane } from "./components/airPlane.js";
import { createPilot, getHairs } from "./components/pilot.js";

let camera;
let renderer;
let scene;
let loop;

class World {
  constructor(container) {
    camera = createCamera();
    renderer = createRenderer();
    scene = createScene();

    loop = new Loop(camera, scene, renderer);
    container.append(renderer.domElement);

    // const orbitControls = createOrbitControls(camera, renderer.domElement);

    // orbitControls.enabled = false;
    const { hemisphereLight, shadowLight, ambientLight } = createLights();

    // loop.updatables.push(orbitControls);

    new Resizer(container, camera, renderer);

    const { axesHelper } = createHelpers();
    const sea = createSea();
    const sky = createSky();

    const { airPlane, propeller } = createAirPlane();
    const hairs = getHairs();
    loop.updatables.push(propeller, sea, sky, airPlane, hairs);

    scene.add(hemisphereLight, shadowLight,ambientLight);
    scene.add(sea);
    scene.add(sky);
    scene.add(airPlane);
    // scene.add(axesHelper);
  }

  async init() {}
  render() {
    renderer.render(scene, camera);
  }

  start() {
    loop.start();
  }

  stop() {
    loop.stop();
  }
}

export { World };
