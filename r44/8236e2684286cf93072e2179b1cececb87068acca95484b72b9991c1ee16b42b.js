// miner-diag: gpus=? tflops=? stream48=? power=? probe_tps=3831 cpu_quota=?/? net=? batch=1 wall=1609 seed=870128282
export default function generate(THREE) {
  const root = new THREE.Group();

  const infinity_loopMat = new THREE.MeshStandardMaterial({
    color: 0x58c9d2,
    metalness: 0.0,
    roughness: 0.3,
  });

  const infinity_path_points = [];
  const pointCount = 96;

  for (let i = 0; i < pointCount; i++) {
    const t = (i / pointCount) * Math.PI * 2;
    const x = 0.72 * Math.sin(t);
    const y = 0.43 * Math.sin(2 * t);
    const z = 0.18 * Math.cos(t) - 0.08 * Math.sin(2 * t);
    infinity_path_points.push(new THREE.Vector3(x, y, z));
  }

  const infinity_path = new THREE.CatmullRomCurve3(
    infinity_path_points,
    true,
    "centripetal",
    0.5
  );

  const infinity_loopGeom = new THREE.TubeGeometry(
    infinity_path,
    192,
    0.17,
    24,
    true
  );
  const infinity_loop = new THREE.Mesh(infinity_loopGeom, infinity_loopMat);
  root.add(infinity_loop);

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
  root.position.set(-center.x * scale, -center.y * scale, -center.z * scale);
}