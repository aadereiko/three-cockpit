import {
  FlatShading,
  CylinderGeometry,
  Matrix4,
  Mesh,
  MeshPhongMaterial,
} from "three";
import { COLORS } from "../../styles/colors";

let sea = null;

function createSea() {
  const geom = new CylinderGeometry(900, 700, 4000, 40, 10);

  geom.applyMatrix(new Matrix4().makeRotationX(-Math.PI / 2));
  const mat = new MeshPhongMaterial({
    color: COLORS.blue,
    transparent: true,
    opacity: 0.6,
    shading: FlatShading,
  });

  sea = new Mesh(geom, mat);
  sea.position.y = -1250;
  sea.receiveShadow = true;

  sea.tick = () => {
    sea.rotation.z += 0.005;
  }

  return sea;
}

function getSea() {
  return sea;
}

export { createSea, getSea };
