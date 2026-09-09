function __sn17_user(THREE) {
  const root = new THREE.Group();

  const turquoise_plastic_material = new THREE.MeshStandardMaterial({
    color: 0x55c9d3,
    metalness: 0.0,
    roughness: 0.22,
  });

  const loop_radius = 0.62;
  const tube_radius = 0.18;
  const loop_geometry = new THREE.TorusGeometry(
    loop_radius,
    tube_radius,
    32,
    128
  );

  const front_loop = new THREE.Mesh(loop_geometry, turquoise_plastic_material);
  front_loop.rotation.set(0.22, -0.12, -0.34);
  root.add(front_loop);

  const rear_loop = new THREE.Mesh(loop_geometry, turquoise_plastic_material);
  rear_loop.rotation.set(-0.20, 0.18, 0.34);
  root.add(rear_loop);

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
