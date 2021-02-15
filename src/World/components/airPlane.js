const {
  Object3D,
  BoxGeometry,
  MeshPhongMaterial,
  FlatShading,
  Mesh,
} = require("three");
import { COLORS } from "../../styles/colors";

let airPlane = null;
let propeller = null;

function createAirPlane() {
  airPlane = new Object3D();

  const geomCockpit = new BoxGeometry(60, 50, 50, 1, 1, 1);
  const matCockpit = new MeshPhongMaterial({
    color: COLORS.red,
    shading: FlatShading,
  });

  const cockpit = new Mesh(geomCockpit, matCockpit);
  cockpit.castShadow = true;
  cockpit.receiveShadow = true;
  airPlane.add(cockpit);

  const geomEngine = new BoxGeometry(20, 50, 50, 1, 1, 1);
  const matEngine = new MeshPhongMaterial({
    color: COLORS.white,
    shading: FlatShading,
  });
  const engine = new Mesh(geomEngine, matEngine);
  engine.position.x = 40;
  engine.castShadow = true;
  engine.receiveShadow = true;
  airPlane.add(engine);

  const geomTailPlane = new BoxGeometry(15, 20, 5, 1, 1, 1);
  const matTailPlane = new MeshPhongMaterial({
    color: COLORS.red,
    shading: FlatShading,
  });
  const tailPlane = new Mesh(geomTailPlane, matTailPlane);
  tailPlane.position.set(-35, 25, 0);
  tailPlane.castShadow = true;
  tailPlane.receiveShadow = true;
  airPlane.add(tailPlane);

  const geomSideWing = new BoxGeometry(40, 8, 150, 1, 1, 1);
  const matSideWing = new MeshPhongMaterial({
    color: COLORS.red,
    shading: FlatShading,
  });
  const sideWing = new Mesh(geomSideWing, matSideWing);
  sideWing.castShadow = true;
  sideWing.receiveShadow = true;
  airPlane.add(sideWing);

  const geomPropeller = new BoxGeometry(10, 10, 10, 1, 1, 1);
  const matPropeller = new MeshPhongMaterial({
    color: COLORS.brown,
    shading: FlatShading,
  });
  propeller = new Mesh(geomPropeller, matPropeller);
  propeller.castShadow = true;
  propeller.receiveShadow = true;

  const geomBlade = new BoxGeometry(1, 100, 20, 1, 1, 1);
  const matBlade = new MeshPhongMaterial({
    color: COLORS.brownDark,
    shading: FlatShading,
  });

  const blade = new Mesh(geomBlade, matBlade);
  blade.position.set(5, 0, 0);
  blade.castShadow = true;
  blade.receiveShadow = true;

  propeller.add(blade);
  propeller.tick = () => {
    propeller.rotation.x += 0.3;
  };
  propeller.position.set(55, 0, 0);
  airPlane.add(propeller);
  airPlane.tick = () => {
    updatePlane();
  }

  // airPlane.scale.set(0.25, 0.25, 0.25);
  // airPlane.position.z = 200;

  return { airPlane, propeller };
}

export { createAirPlane };

document.addEventListener("mousemove", handleMouseMove, false);

const mousePos = { x: 0, y: 0 };
function handleMouseMove(event) {
  // here we are converting the mouse position value received
  // to a normalized value varying between -1 and 1;
  // this is the formula for the horizontal axis:
  const tx = -1 + (event.clientX / window.innerWidth) * 2;

  // for the vertical axis, we need to inverse the formula
  // because the 2D y-axis goes the opposite direction of the 3D y-axis
  const ty = 1 - (event.clientY / window.innerHeight) * 2;
  mousePos.x = tx;
  mousePos.y = ty;
}

function updatePlane() {
  // let's move the airplane between -100 and 100 on the horizontal axis,
  // and between 25 and 175 on the vertical axis,
  // depending on the mouse position which ranges between -1 and 1 on both axes;
  // to achieve that we use a normalize function (see below)

  const targetX = normalize(mousePos.x, -1, 1, -100, 100);
	const targetY = normalize(mousePos.y, -1, 1, 25, 175);

  airPlane.position.y = targetY;
	airPlane.position.x = targetX;
	propeller.rotation.x += 0.3;
}

function normalize(v, vmin, vmax, tmin, tmax) {
  const nv = Math.max(Math.min(v, vmax), vmin);
  const dv = vmax - vmin;
  const pc = (nv - vmin) / dv;
  const dt = tmax - tmin;
  const tv = tmin + pc * dt;
  return tv;
}
