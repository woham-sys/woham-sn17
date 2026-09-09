function __sn17_user(THREE) {
  const root = new THREE.Group();

  const pan_bodyMat = new THREE.MeshStandardMaterial({
    color: 0x151515,
    metalness: 0.0,
    roughness: 0.55,
    side: THREE.DoubleSide,
  });

  const rolled_rimMat = new THREE.MeshStandardMaterial({
    color: 0x070707,
    metalness: 0.0,
    roughness: 0.28,
  });

  const base_ringMat = rolled_rimMat;

  const pan_bodyProfile = [
    new THREE.Vector2(0.000, -0.285),
    new THREE.Vector2(0.690, -0.285),
    new THREE.Vector2(0.740, -0.280),
    new THREE.Vector2(0.785, -0.255),
    new THREE.Vector2(0.810, -0.205),
    new THREE.Vector2(0.840,  0.110),
    new THREE.Vector2(0.855,  0.175),
    new THREE.Vector2(0.865,  0.205),
    new THREE.Vector2(0.845,  0.225),
    new THREE.Vector2(0.815,  0.215),
    new THREE.Vector2(0.795,  0.185),
    new THREE.Vector2(0.785,  0.120),
    new THREE.Vector2(0.755, -0.155),
    new THREE.Vector2(0.720, -0.205),
    new THREE.Vector2(0.665, -0.225),
    new THREE.Vector2(0.000, -0.225),
  ];
  const pan_bodyGeom = new THREE.LatheGeometry(pan_bodyProfile, 96);
  const pan_body = new THREE.Mesh(pan_bodyGeom, pan_bodyMat);
  root.add(pan_body);

  const rolled_rimGeom = new THREE.TorusGeometry(0.835, 0.055, 20, 96);
  const rolled_rim = new THREE.Mesh(rolled_rimGeom, rolled_rimMat);
  rolled_rim.rotation.x = Math.PI / 2;
  rolled_rim.position.y = 0.225;
  root.add(rolled_rim);

  const base_ringGeom = new THREE.TorusGeometry(0.735, 0.022, 12, 96);
  const base_ring = new THREE.Mesh(base_ringGeom, base_ringMat);
  base_ring.rotation.x = Math.PI / 2;
  base_ring.position.y = -0.270;
  root.add(base_ring);

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
  const scale = 0.98 / maxDim;
  root.scale.setScalar(scale);
  root.position.set(-center.x * scale, -center.y * scale, -center.z * scale);
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
