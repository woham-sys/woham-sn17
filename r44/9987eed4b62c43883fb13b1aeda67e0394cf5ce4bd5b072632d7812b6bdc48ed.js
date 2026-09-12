// miner-diag: gpus=? tflops=? stream48=? power=? probe_tps=3831 cpu_quota=?/? net=? batch=4 wall=1389 seed=870128282
export default function generate(THREE) {
  const root = new THREE.Group();

  const bodyMat = new THREE.MeshStandardMaterial({
    color: 0x111111,
    metalness: 0.0,
    roughness: 0.8,
  });
  const lidMat = new THREE.MeshStandardMaterial({
    color: 0x171717,
    metalness: 0.0,
    roughness: 0.8,
  });
  const openingMat = new THREE.MeshStandardMaterial({
    color: 0x020202,
    metalness: 0.0,
    roughness: 0.9,
    side: THREE.DoubleSide,
  });
  const handleMat = new THREE.MeshStandardMaterial({
    color: 0xd4d4d4,
    metalness: 0.6,
    roughness: 0.2,
  });

  const bodyProfile = [
    new THREE.Vector2(0.00, 0.00),
    new THREE.Vector2(0.48, 0.00),
    new THREE.Vector2(0.58, 0.025),
    new THREE.Vector2(0.63, 0.075),
    new THREE.Vector2(0.64, 0.15),
    new THREE.Vector2(0.625, 0.34),
    new THREE.Vector2(0.595, 0.62),
    new THREE.Vector2(0.565, 0.90),
    new THREE.Vector2(0.535, 1.18),
    new THREE.Vector2(0.505, 1.40),
    new THREE.Vector2(0.49, 1.48),
    new THREE.Vector2(0.00, 1.48),
  ];
  const bodyGeom = new THREE.LatheGeometry(bodyProfile, 64);
  const body = new THREE.Mesh(bodyGeom, bodyMat);
  root.add(body);

  const base_rimGeom = new THREE.TorusGeometry(0.585, 0.018, 10, 64);
  const base_rim = new THREE.Mesh(base_rimGeom, bodyMat);
  base_rim.rotation.x = Math.PI / 2;
  base_rim.position.y = 0.035;
  root.add(base_rim);

  const top_collarGeom = new THREE.TorusGeometry(0.49, 0.022, 10, 64);
  const top_collar = new THREE.Mesh(top_collarGeom, bodyMat);
  top_collar.rotation.x = Math.PI / 2;
  top_collar.position.y = 1.475;
  root.add(top_collar);

  const lidProfile = [
    new THREE.Vector2(0.00, 0.00),
    new THREE.Vector2(0.45, 0.00),
    new THREE.Vector2(0.495, 0.018),
    new THREE.Vector2(0.51, 0.045),
    new THREE.Vector2(0.50, 0.075),
    new THREE.Vector2(0.465, 0.115),
    new THREE.Vector2(0.39, 0.155),
    new THREE.Vector2(0.27, 0.182),
    new THREE.Vector2(0.12, 0.195),
    new THREE.Vector2(0.00, 0.198),
  ];
  const lidGeom = new THREE.LatheGeometry(lidProfile, 64);
  const lid = new THREE.Mesh(lidGeom, lidMat);
  lid.position.y = 1.47;
  root.add(lid);

  const lid_seamGeom = new THREE.TorusGeometry(0.492, 0.012, 8, 64);
  const lid_seam = new THREE.Mesh(lid_seamGeom, openingMat);
  lid_seam.rotation.x = Math.PI / 2;
  lid_seam.position.y = 1.492;
  root.add(lid_seam);

  const lid_tabGeom = new THREE.CapsuleGeometry(0.04, 0.16, 4, 12);
  const lid_tab = new THREE.Mesh(lid_tabGeom, lidMat);
  lid_tab.rotation.z = Math.PI / 2;
  lid_tab.scale.set(0.38, 1, 1);
  lid_tab.position.set(0.56, 1.565, 0.015);
  root.add(lid_tab);

  const spoutStart = new THREE.Vector3(-0.49, 0.57, 0.02);
  const spoutEnd = new THREE.Vector3(-1.08, 1.27, 0.20);
  const spoutDirection = spoutEnd.clone().sub(spoutStart);
  const spoutLength = spoutDirection.length();
  spoutDirection.normalize();

  const spoutGeom = new THREE.CylinderGeometry(
    0.105,
    0.19,
    spoutLength,
    32,
    1,
    true
  );
  const spout = new THREE.Mesh(spoutGeom, bodyMat);
  spout.position.copy(spoutStart).add(spoutEnd).multiplyScalar(0.5);
  spout.quaternion.setFromUnitVectors(
    new THREE.Vector3(0, 1, 0),
    spoutDirection
  );
  root.add(spout);

  const spout_mountGeom = new THREE.SphereGeometry(0.205, 32, 16);
  const spout_mount = new THREE.Mesh(spout_mountGeom, bodyMat);
  spout_mount.scale.set(0.82, 1.12, 0.9);
  spout_mount.position.copy(spoutStart);
  root.add(spout_mount);

  const spout_rimGeom = new THREE.TorusGeometry(0.088, 0.018, 10, 32);
  const spout_rim = new THREE.Mesh(spout_rimGeom, bodyMat);
  spout_rim.position.copy(spoutEnd);
  spout_rim.quaternion.setFromUnitVectors(
    new THREE.Vector3(0, 0, 1),
    spoutDirection
  );
  root.add(spout_rim);

  const spout_openingGeom = new THREE.CircleGeometry(0.078, 32);
  const spout_opening = new THREE.Mesh(spout_openingGeom, openingMat);
  spout_opening.position
    .copy(spoutEnd)
    .add(spoutDirection.clone().multiplyScalar(0.006));
  spout_opening.quaternion.setFromUnitVectors(
    new THREE.Vector3(0, 0, 1),
    spoutDirection
  );
  root.add(spout_opening);

  const handlePoints = [
    new THREE.Vector3(0.47, 1.35, 0.00),
    new THREE.Vector3(0.68, 1.37, 0.00),
    new THREE.Vector3(0.94, 1.36, 0.00),
    new THREE.Vector3(1.14, 1.23, 0.00),
    new THREE.Vector3(1.25, 1.00, 0.00),
    new THREE.Vector3(1.27, 0.74, 0.00),
    new THREE.Vector3(1.20, 0.50, 0.00),
    new THREE.Vector3(1.06, 0.31, 0.00),
    new THREE.Vector3(0.91, 0.20, 0.00),
  ];
  const handleCurve = new THREE.CatmullRomCurve3(
    handlePoints,
    false,
    "centripetal"
  );
  const handleGeom = new THREE.TubeGeometry(
    handleCurve,
    64,
    0.066,
    14,
    false
  );
  const handle = new THREE.Mesh(handleGeom, handleMat);
  root.add(handle);

  const handle_start_capGeom = new THREE.SphereGeometry(0.067, 20, 12);
  const handle_start_cap = new THREE.Mesh(handle_start_capGeom, handleMat);
  handle_start_cap.position.copy(handlePoints[0]);
  root.add(handle_start_cap);

  const handle_end_capGeom = new THREE.SphereGeometry(0.067, 20, 12);
  const handle_end_cap = new THREE.Mesh(handle_end_capGeom, handleMat);
  handle_end_cap.position.copy(handlePoints[handlePoints.length - 1]);
  root.add(handle_end_cap);

  fitToUnitCube(THREE, root);
  return root;

  function fitToUnitCube(THREE, object) {
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