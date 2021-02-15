import {
  FlatShading,
  CylinderGeometry,
  Matrix4,
  Mesh,
  MeshPhongMaterial,
} from "three";
import { COLORS } from "../../styles/colors";

let sea = null;
let waves = [];

function createSea() {
  const geom = new CylinderGeometry(900, 700, 4000, 40, 10);

  geom.applyMatrix(new Matrix4().makeRotationX(-Math.PI / 2));
  geom.mergeVertices();

  for (let i = 0; i < geom.vertices.length; i++) {
    const { x, y, z } = geom.vertices[i];

    waves.push({
      x,
      y,
      z,
      ang: Math.random() * Math.PI * 2,
      // a random distance
      amp: 15 + Math.random() * 15,
      // a random speed between 0.016 and 0.048 radians / frame
      speed: 0.016 + Math.random() * 0.032,
    });
  }

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
    moveWaves();
    sea.rotation.z += 0.005;
  };

  return sea;
}

const moveWaves = () => {
  const verts = sea.geometry.vertices;

  for (let i = 0; i < verts.length; i++) {
    const v = verts[i];
    const vProps = waves[i];

    v.x = vProps.x + Math.cos(vProps.ang) * vProps.amp;
    v.y = vProps.y + Math.sin(vProps.ang) * vProps.amp;

    vProps.ang += vProps.speed;
  }

  sea.geometry.verticesNeedUpdate = true;
}

function getSea() {
  return sea;
}

export { createSea, getSea };
