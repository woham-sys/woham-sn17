// miner-diag: gpus=? tflops=? stream48=? power=? probe_tps=3831 cpu_quota=?/? net=? batch=3 wall=1521 seed=870128282
export default function generate(THREE) {
  const root = new THREE.Group();

  const bodyMat = new THREE.MeshStandardMaterial({
    color: 0x2b0813,
    metalness: 0.0,
    roughness: 0.4,
  });

  const inner_wallMat = new THREE.MeshStandardMaterial({
    color: 0x140207,
    metalness: 0.0,
    roughness: 0.4,
    side: THREE.DoubleSide,
  });

  const opening_shadowMat = new THREE.MeshStandardMaterial({
    color: 0x070103,
    metalness: 0.0,
    roughness: 0.4,
    side: THREE.DoubleSide,
  });

  const bodyProfile = [
    new THREE.Vector2(0.00, 0.00),
    new THREE.Vector2(0.38, 0.00),
    new THREE.Vector2(0.43, 0.025),
    new THREE.Vector2(0.46, 0.09),
    new THREE.Vector2(0.48, 0.22),
    new THREE.Vector2(0.53, 0.42),
    new THREE.Vector2(0.59, 0.66),
    new THREE.Vector2(0.63, 0.90),
    new THREE.Vector2(0.64, 1.10),
    new THREE.Vector2(0.62, 1.30),
    new THREE.Vector2(0.57, 1.49),
    new THREE.Vector2(0.49, 1.66),
    new THREE.Vector2(0.39, 1.80),
    new THREE.Vector2(0.31, 1.92),
    new THREE.Vector2(0.28, 2.06),
    new THREE.Vector2(0.28, 2.18),
    new THREE.Vector2(0.30, 2.31),
    new THREE.Vector2(0.34, 2.43),
    new THREE.Vector2(0.40, 2.55),
    new THREE.Vector2(0.47, 2.65),
    new THREE.Vector2(0.53, 2.71),
    new THREE.Vector2(0.55, 2.74),
  ];
  const bodyGeom = new THREE.LatheGeometry(bodyProfile, 64);
  const body = new THREE.Mesh(bodyGeom, bodyMat);
  root.add(body);

  const inner_wallProfile = [
    new THREE.Vector2(0.30, 2.50),
    new THREE.Vector2(0.34, 2.56),
    new THREE.Vector2(0.40, 2.64),
    new THREE.Vector2(0.46, 2.70),
    new THREE.Vector2(0.48, 2.735),
  ];
  const inner_wallGeom = new THREE.LatheGeometry(inner_wallProfile, 64);
  const inner_wall = new THREE.Mesh(inner_wallGeom, inner_wallMat);
  root.add(inner_wall);

  const opening_shadowGeom = new THREE.CircleGeometry(0.30, 64);
  const opening_shadow = new THREE.Mesh(opening_shadowGeom, opening_shadowMat);
  opening_shadow.rotation.x = -Math.PI / 2;
  opening_shadow.position.y = 2.50;
  root.add(opening_shadow);

  const rimMat = bodyMat;
  const rimGeom = new THREE.TorusGeometry(0.515, 0.045, 20, 64);
  const rim = new THREE.Mesh(rimGeom, rimMat);
  rim.rotation.x = Math.PI / 2;
  rim.position.y = 2.745;
  root.add(rim);

  const base_ringMat = bodyMat;
  const base_ringGeom = new THREE.TorusGeometry(0.405, 0.018, 12, 64);
  const base_ring = new THREE.Mesh(base_ringGeom, base_ringMat);
  base_ring.rotation.x = Math.PI / 2;
  base_ring.position.y = 0.022;
  root.add(base_ring);

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

  fitToUnitCube(root);
  return root;
}