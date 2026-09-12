// miner-diag: gpus=? tflops=? stream48=? power=? probe_tps=3831 cpu_quota=?/? net=? batch=3 wall=1521 seed=870128282
export default function generate(THREE) {
  const root = new THREE.Group();

  const ceramicMat = new THREE.MeshStandardMaterial({
    color: 0xf4f4f1,
    metalness: 0.0,
    roughness: 0.4,
    side: THREE.DoubleSide,
  });

  const baking_dish_profile = [
    new THREE.Vector2(0.00, 0.00),
    new THREE.Vector2(1.12, 0.00),
    new THREE.Vector2(1.23, 0.025),
    new THREE.Vector2(1.31, 0.085),
    new THREE.Vector2(1.36, 0.18),
    new THREE.Vector2(1.40, 0.42),
    new THREE.Vector2(1.44, 0.58),
    new THREE.Vector2(1.50, 0.67),
    new THREE.Vector2(1.53, 0.72),
    new THREE.Vector2(1.51, 0.77),
    new THREE.Vector2(1.46, 0.80),
    new THREE.Vector2(1.40, 0.79),
    new THREE.Vector2(1.35, 0.75),
    new THREE.Vector2(1.32, 0.68),
    new THREE.Vector2(1.29, 0.56),
    new THREE.Vector2(1.25, 0.38),
    new THREE.Vector2(1.20, 0.27),
    new THREE.Vector2(1.13, 0.21),
    new THREE.Vector2(1.02, 0.18),
    new THREE.Vector2(0.00, 0.18),
  ];

  const baking_dishGeom = new THREE.LatheGeometry(baking_dish_profile, 64);
  const baking_dish = new THREE.Mesh(baking_dishGeom, ceramicMat);
  root.add(baking_dish);

  const rolled_rimGeom = new THREE.TorusGeometry(1.43, 0.075, 16, 64);
  const rolled_rim = new THREE.Mesh(rolled_rimGeom, ceramicMat);
  rolled_rim.rotation.x = Math.PI / 2;
  rolled_rim.position.y = 0.745;
  root.add(rolled_rim);

  fitToUnitCube(root);
  return root;

  function fitToUnitCube(object) {
    const box = new THREE.Box3().setFromObject(object);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    const scale = 0.95 / maxDim;
    object.scale.setScalar(scale);
    object.position.set(
      -center.x * scale,
      -center.y * scale,
      -center.z * scale
    );
  }
}