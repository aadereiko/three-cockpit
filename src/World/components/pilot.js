import { FlatShading, Object3D } from "three";
import {
  BoxGeometry,
  Matrix4,
  Mesh,
  MeshLambertMaterial,
  MeshPhongMaterial,
} from "three/build/three.module";
import { COLORS } from "../../styles/colors";

let pilot = null;
let hairsTop = null;
let angleHairs = 0;
let hairs = null;

function createPilot() {
  pilot = new Object3D();
  pilot.name = "pilot";


  const bodyGeom = new BoxGeometry(15, 15, 15);
  const bodyMat = new MeshPhongMaterial({
    color: COLORS.brown,
    shading: FlatShading,
  });
  const body = new Mesh(bodyGeom, bodyMat);
  body.position.set(2, -12, 0);
  pilot.add(body);

  const faceGeom = new BoxGeometry(10, 10, 10);
  const faceMat = new MeshLambertMaterial({ color: COLORS.pink });
  const face = new Mesh(faceGeom, faceMat);
  pilot.add(face);

  const hairGeom = new BoxGeometry(4, 4, 4);
  const hairMat = new MeshLambertMaterial({ color: COLORS.brown });
  const hair = new Mesh(hairGeom, hairMat);
  // Align the shape of the hair to its bottom boundary, that will make it easier to scale.
  hair.geometry.applyMatrix(new Matrix4().makeTranslation(0, 2, 0));

  hairs = new Object3D();
  // create a container for the hairs at the top
  // of the head (the ones that will be animated)
  hairsTop = new Object3D();

  // create the hairs at the top of the head
  // and position them on a 3 x 4 grid
  for (let i = 0; i < 12; i++) {
    const h = hair.clone();
    const col = i % 3;
    const row = Math.floor(i / 3);
    const startPosZ = -4;
    const startPosX = -4;
    h.position.set(startPosX + row * 4, 0, startPosZ + col * 4);
    hairsTop.add(h);
  }
  hairs.add(hairsTop);

  const hairSideGeom = new BoxGeometry(12, 4, 2);
  hairSideGeom.applyMatrix(new Matrix4().makeTranslation(-6, 0, 0));
  const hairSideR = new Mesh(hairSideGeom, hairMat);
  const hairSideL = hairSideR.clone();

  hairSideR.position.set(8, -2, 6);
  hairSideR.position.set(8, -2, -6);
  hairs.add(hairSideL);
  hairs.add(hairSideR);

  const hairBackGeom = new BoxGeometry(2, 8, 10);
  const hairBack = new Mesh(hairBackGeom, hairMat);
  hairBack.position.set(-1, -4, 0);
  hairs.add(hairBack);
  hairs.position.set(-5, 5, 0);

  pilot.add(hairs);

  const glassGeom = new BoxGeometry(5, 5, 5);
  const glassMat = new MeshLambertMaterial({ color: COLORS.brown });
  const glassR = new Mesh(glassGeom, glassMat);
  glassR.position.set(6, 0, 3);
  const glassL = glassR.clone();
  glassL.position.z = -glassR.position.z;

  const glassAGeom = new BoxGeometry(11, 1, 11);
  const glassA = new Mesh(glassAGeom, glassMat);
  pilot.add(glassR);
  pilot.add(glassL);
  pilot.add(glassA);

  const earGeom = new BoxGeometry(2, 3, 2);
  const earL = new Mesh(earGeom, faceMat);
  earL.position.set(0, 0, -6);
  const earR = earL.clone();
  earR.position.set(0, 0, 6);
  pilot.add(earL);
  pilot.add(earR);

  hairs.tick = () => {
    updateHairs();
  }

  return { pilot, hairs };
}

const getHairs = () => {
    return hairs;
}

function updateHairs() {
  const hairsChildren = hairsTop.children;
  
  const l = hairsChildren.length;

  for (let i = 0; i < hairsChildren.length; i++) {
    const h = hairsChildren[i];
    h.scale.y = 0.75 + Math.cos(angleHairs + i / 3) * 0.25;
  }

  angleHairs += 0.16;
}

export { createPilot, getHairs };
