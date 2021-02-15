import {
  BoxGeometry,
    Mesh,
  MeshPhongMaterial,
  Object3D,
} from "three/build/three.module";
import { COLORS } from "../../styles/colors";

function createCloud() {
  const mesh = new Object3D();
  const geom = new BoxGeometry(20, 20, 20);
  const mat = new MeshPhongMaterial({
    color: COLORS.white,
  });

  const nBlocs = 3 + Math.floor(Math.random() * 3);
  for (let i = 0; i < nBlocs; i++) {
      const currentMesh =  new Mesh(geom, mat);

      currentMesh.position.x = i * 15;
      currentMesh.position.y = Math.random() * 10;
      currentMesh.position.z = -400 - Math.random() * 10;
      currentMesh.rotation.z = Math.random() * Math.PI * 2;
      currentMesh.rotation.y = Math.random() * Math.PI * 2;

      const currentSize = 0.1 + Math.random() * 0.9;
      currentMesh.scale.set(currentSize, currentSize, currentSize);

      currentMesh.castShadow = true;
      currentMesh.receiveShadow = true;

      mesh.add(currentMesh);
  }

  return mesh;
}

export { createCloud };