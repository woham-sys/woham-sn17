function __sn17_user(THREE) {
  const root = new THREE.Group();

  const silverMat = new THREE.MeshStandardMaterial({
    color: 0xd8d8d2,
    metalness: 0.65,
    roughness: 0.18
  });
  const redMat = new THREE.MeshStandardMaterial({
    color: 0xe31a1a,
    metalness: 0.0,
    roughness: 0.22
  });

  const coilRadius = 0.31;
  const coilTurns = 13.0;
  const coilLength = 1.05;
  const wireRadius = 0.017;
  const coilSamples = 420;
  const coilPoints = [];

  for (let i = 0; i <= coilSamples; i++) {
    const t = i / coilSamples;
    const theta = t * Math.PI * 2 * coilTurns;
    const radialWobble = 0.004 * Math.sin(theta * 2.0);
    const r = coilRadius + radialWobble;
    const x = -coilLength / 2 + coilLength * t;
    const y = r * Math.cos(theta);
    const z = r * Math.sin(theta);
    coilPoints.push(new THREE.Vector3(x, y, z));
  }

  const springCurve = new THREE.CatmullRomCurve3(coilPoints, false, "centripetal", 0.5);
  const springGeom = new THREE.TubeGeometry(springCurve, 620, wireRadius, 14, false);
  const spring = new THREE.Mesh(springGeom, silverMat);
  root.add(spring);

  const endCapGeom = new THREE.SphereGeometry(wireRadius, 18, 10);

  const leftEndCap = new THREE.Mesh(endCapGeom, silverMat);
  leftEndCap.position.copy(coilPoints[0]);
  root.add(leftEndCap);

  const rightEndCap = new THREE.Mesh(endCapGeom, silverMat);
  rightEndCap.position.copy(coilPoints[coilPoints.length - 1]);
  root.add(rightEndCap);

  const handleShape = new THREE.Shape();
  handleShape.moveTo(-0.055, -0.052);
  handleShape.lineTo(0.285, -0.052);
  handleShape.bezierCurveTo(0.355, -0.052, 0.395, -0.025, 0.395, 0.0);
  handleShape.bezierCurveTo(0.395, 0.025, 0.355, 0.052, 0.285, 0.052);
  handleShape.lineTo(-0.055, 0.052);
  handleShape.bezierCurveTo(-0.095, 0.052, -0.115, 0.025, -0.115, 0.0);
  handleShape.bezierCurveTo(-0.115, -0.025, -0.095, -0.052, -0.055, -0.052);

  const handleHole = new THREE.Path();
  handleHole.absellipse(0.285, 0.0, 0.055, 0.022, 0, Math.PI * 2, true, 0);
  handleShape.holes.push(handleHole);

  const handleGeom = new THREE.ExtrudeGeometry(handleShape, 1);
  handleGeom.translate(0, 0, -0.018);
  const handle = new THREE.Mesh(handleGeom, redMat);
  handle.rotation.z = -0.08;
  handle.position.set(0.30, -0.018, -0.018);
  root.add(handle);

  const gripShaftGeom = new THREE.CylinderGeometry(0.035, 0.035, 0.20, 24);
  const gripShaft = new THREE.Mesh(gripShaftGeom, redMat);
  gripShaft.rotation.z = Math.PI / 2;
  gripShaft.position.set(0.245, -0.012, -0.025);
  root.add(gripShaft);

  const gripBulbGeom = new THREE.SphereGeometry(0.047, 24, 14);
  const gripBulb = new THREE.Mesh(gripBulbGeom, redMat);
  gripBulb.scale.set(1.15, 0.82, 0.82);
  gripBulb.position.set(0.165, -0.012, -0.025);
  root.add(gripBulb);

  fitToUnitCube(THREE, root);
  return root;
}

function fitToUnitCube(THREE, root) {
  const box = new THREE.Box3().setFromObject(root);
  const size = new THREE.Vector3();
  box.getSize(size);
  const center = new THREE.Vector3();
  box.getCenter(center);
  root.position.sub(center);
  const maxDim = Math.max(size.x, size.y, size.z) || 1;
  const scale = 0.95 / maxDim;
  root.scale.setScalar(scale);
}


export default function generate(THREE) {
  const obj = __sn17_user(THREE);
  if (obj === null || obj === undefined) return obj;
  const root = new THREE.Group();
  const inner = new THREE.Group();
  inner.add(obj);
  root.add(inner);
  const box = new THREE.Box3().setFromObject(inner);
  const size = new THREE.Vector3(); box.getSize(size);
  const ctr = new THREE.Vector3(); box.getCenter(ctr);
  if (isFinite(ctr.x) && isFinite(ctr.y) && isFinite(ctr.z)) inner.position.sub(ctr);
  const m = Math.max(size.x, size.y, size.z);
  if (isFinite(m) && m > 0) root.scale.setScalar(0.98 / m);
  return root;
}
