function __sn17_user(THREE) {
  const root = new THREE.Group();

  const ceramicMat = new THREE.MeshStandardMaterial({
    color: 0xf4f4f2,
    metalness: 0.0,
    roughness: 0.22,
    emissive: 0xf4f4f2,
    emissiveIntensity: 0.22,
    side: THREE.DoubleSide,
  });

  const bowlProfile = [
    new THREE.Vector2(0.00, -0.300),
    new THREE.Vector2(0.28, -0.300),
    new THREE.Vector2(0.42, -0.285),
    new THREE.Vector2(0.56, -0.235),
    new THREE.Vector2(0.70, -0.150),
    new THREE.Vector2(0.83, -0.030),
    new THREE.Vector2(0.94, 0.115),
    new THREE.Vector2(1.035, 0.275),
    new THREE.Vector2(1.110, 0.435),
    new THREE.Vector2(1.160, 0.565),
    new THREE.Vector2(1.175, 0.625),
    new THREE.Vector2(1.165, 0.665),
    new THREE.Vector2(1.135, 0.690),
    new THREE.Vector2(1.095, 0.685),
    new THREE.Vector2(1.055, 0.650),
    new THREE.Vector2(1.010, 0.570),
    new THREE.Vector2(0.940, 0.465),
    new THREE.Vector2(0.850, 0.355),
    new THREE.Vector2(0.740, 0.265),
    new THREE.Vector2(0.610, 0.195),
    new THREE.Vector2(0.470, 0.145),
    new THREE.Vector2(0.320, 0.115),
    new THREE.Vector2(0.160, 0.100),
    new THREE.Vector2(0.000, 0.095),
  ];
  const bowl_bodyGeom = new THREE.LatheGeometry(bowlProfile, 96);
  const bowl_body = new THREE.Mesh(bowl_bodyGeom, ceramicMat);
  root.add(bowl_body);

  const rimGeom = new THREE.TorusGeometry(1.135, 0.035, 16, 96);
  const rim = new THREE.Mesh(rimGeom, ceramicMat);
  rim.rotation.x = Math.PI / 2;
  rim.position.y = 0.665;
  root.add(rim);

  const footProfile = [
    new THREE.Vector2(0.00, -0.500),
    new THREE.Vector2(0.48, -0.500),
    new THREE.Vector2(0.56, -0.492),
    new THREE.Vector2(0.62, -0.470),
    new THREE.Vector2(0.66, -0.435),
    new THREE.Vector2(0.68, -0.395),
    new THREE.Vector2(0.67, -0.360),
    new THREE.Vector2(0.63, -0.330),
    new THREE.Vector2(0.56, -0.305),
    new THREE.Vector2(0.46, -0.285),
    new THREE.Vector2(0.00, -0.285),
  ];
  const foot_ringGeom = new THREE.LatheGeometry(footProfile, 96);
  const foot_ring = new THREE.Mesh(foot_ringGeom, ceramicMat);
  root.add(foot_ring);

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
