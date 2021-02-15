import { CatmullRomCurve3 } from "three/build/three.module";

function createCurveFromTo(fromVector, toVector) {
  const curve = new CatmullRomCurve3([fromVector, toVector]);
  return { curveData: curve };
}

export { createCurveFromTo };
