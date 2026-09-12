// miner-diag: gpus=? tflops=? stream48=? power=? probe_tps=3831 cpu_quota=?/? net=? batch=1 wall=1609 seed=870128282
export default function generate(THREE) {
  const root = new THREE.Group();

  const spring_coilMat = new THREE.MeshStandardMaterial({
    color: 0xd4d4d4,
    metalness: 0.6,
    roughness: 0.2,
  });

  const coilRadius = 0.31;
  const wireRadius = 0.038;
  const springLength = 0.78;
  const turnCount = 5.5;
  const pointCount = 180;
  const endTransition = 0.14;
  const endCompression = 0.72;

  const spring_coilPoints = [];
  for (let i = 0; i <= pointCount; i++) {
    const t = i / pointCount;
    const edgeDistance = Math.min(t, 1 - t);
    const compression = edgeDistance < endTransition
      ? endCompression + (1 - endCompression) * edgeDistance / endTransition
      : 1;

    const x = (t - 0.5) * springLength * compression;
    const angle = t * turnCount * Math.PI * 2;
    const y = Math.cos(angle) * coilRadius;
    const z = Math.sin(angle) * coilRadius;

    spring_coilPoints.push(new THREE.Vector3(x, y, z));
  }

  const spring_coilCurve = new THREE.CatmullRomCurve3(
    spring_coilPoints,
    false,
    "centripetal",
    0.5
  );

  const spring_coilGeom = new THREE.TubeGeometry(
    spring_coilCurve,
    320,
    wireRadius,
    14,
    false
  );

  const spring_coil = new THREE.Mesh(spring_coilGeom, spring_coilMat);
  root.add(spring_coil);

  fitToUnitCube(THREE, root);
  return root;
}

function fitToUnitCube(THREE, root) {
  const box = new THREE.Box3().setFromObject(root);
  const size = new THREE.Vector3();
  const center = new THREE.Vector3();
  box.getSize(size);
  box.getCenter(center);
  const maxDim = Math.max(size.x, size.y, size.z) || 1;
  const scale = 0.95 / maxDim;
  root.scale.setScalar(scale);
  root.position.set(
    -center.x * scale,
    -center.y * scale,
    -center.z * scale
  );
}