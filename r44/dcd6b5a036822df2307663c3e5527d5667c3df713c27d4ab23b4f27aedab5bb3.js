// miner-diag: gpus=? tflops=? stream48=? power=? probe_tps=3831 cpu_quota=?/? net=? batch=3 wall=1521 seed=870128282
export default function generate(THREE) {
  const root = new THREE.Group();

  const bodyMat = new THREE.MeshStandardMaterial({
    color: 0x0064ff,
    metalness: 0.6,
    roughness: 0.2,
    side: THREE.DoubleSide,
  });
  const interiorMat = new THREE.MeshStandardMaterial({
    color: 0x001b70,
    metalness: 0.4,
    roughness: 0.35,
    side: THREE.DoubleSide,
  });
  const spout_openingMat = new THREE.MeshStandardMaterial({
    color: 0x00124a,
    metalness: 0.3,
    roughness: 0.4,
    side: THREE.DoubleSide,
  });

  const bodyProfile = [
    new THREE.Vector2(0.00, 0.00),
    new THREE.Vector2(0.36, 0.00),
    new THREE.Vector2(0.43, 0.015),
    new THREE.Vector2(0.47, 0.06),
    new THREE.Vector2(0.49, 0.16),
    new THREE.Vector2(0.50, 0.32),
    new THREE.Vector2(0.50, 0.52),
    new THREE.Vector2(0.49, 0.72),
    new THREE.Vector2(0.47, 0.94),
    new THREE.Vector2(0.44, 1.16),
    new THREE.Vector2(0.40, 1.38),
    new THREE.Vector2(0.36, 1.56),
    new THREE.Vector2(0.34, 1.67),
    new THREE.Vector2(0.35, 1.72),
    new THREE.Vector2(0.39, 1.75),
  ];
  const bodyGeom = new THREE.LatheGeometry(bodyProfile, 64);
  const body = new THREE.Mesh(bodyGeom, bodyMat);
  root.add(body);

  const inner_wallGeom = new THREE.CylinderGeometry(
    0.335,
    0.30,
    0.20,
    48,
    1,
    true
  );
  const inner_wall = new THREE.Mesh(inner_wallGeom, interiorMat);
  inner_wall.position.y = 1.65;
  root.add(inner_wall);

  const inner_cavityGeom = new THREE.CircleGeometry(0.30, 48);
  const inner_cavity = new THREE.Mesh(inner_cavityGeom, interiorMat);
  inner_cavity.rotation.x = -Math.PI / 2;
  inner_cavity.position.y = 1.55;
  root.add(inner_cavity);

  const rimPoints = [];
  const rimPointCount = 32;
  for (let i = 0; i < rimPointCount; i++) {
    const angle = (i / rimPointCount) * Math.PI * 2;
    const leftPeak = Math.max(0, (-Math.cos(angle) - 0.45) / 0.55);
    const leftExtension = 0.20 * leftPeak * leftPeak;
    const radius = 0.39 + leftExtension;
    rimPoints.push(
      new THREE.Vector3(
        Math.cos(angle) * radius,
        1.755 - 0.018 * leftPeak,
        Math.sin(angle) * radius
      )
    );
  }
  const rimCurve = new THREE.CatmullRomCurve3(
    rimPoints,
    true,
    "centripetal"
  );
  const rimGeom = new THREE.TubeGeometry(rimCurve, 96, 0.025, 12, true);
  const rim = new THREE.Mesh(rimGeom, bodyMat);
  root.add(rim);

  const spoutShape = new THREE.Shape();
  spoutShape.moveTo(-0.30, 1.54);
  spoutShape.bezierCurveTo(-0.37, 1.61, -0.49, 1.70, -0.68, 1.73);
  spoutShape.bezierCurveTo(-0.75, 1.74, -0.79, 1.77, -0.77, 1.80);
  spoutShape.bezierCurveTo(-0.74, 1.83, -0.67, 1.84, -0.58, 1.83);
  spoutShape.bezierCurveTo(-0.46, 1.82, -0.37, 1.77, -0.27, 1.74);
  spoutShape.bezierCurveTo(-0.23, 1.70, -0.23, 1.61, -0.30, 1.54);
  spoutShape.closePath();

  const spoutGeom = new THREE.ExtrudeGeometry(spoutShape, {
    depth: 0.26,
    steps: 1,
    curveSegments: 24,
    bevelEnabled: true,
    bevelThickness: 0.018,
    bevelSize: 0.018,
    bevelSegments: 3,
  });
  const spout = new THREE.Mesh(spoutGeom, bodyMat);
  spout.position.z = -0.13;
  root.add(spout);

  const spout_openingShape = new THREE.Shape();
  spout_openingShape.moveTo(-0.755, 0.005);
  spout_openingShape.bezierCurveTo(-0.64, -0.055, -0.47, -0.105, -0.29, -0.085);
  spout_openingShape.bezierCurveTo(-0.23, -0.075, -0.21, -0.045, -0.22, -0.015);
  spout_openingShape.bezierCurveTo(-0.39, 0.025, -0.58, 0.055, -0.755, 0.025);
  spout_openingShape.closePath();
  const spout_openingGeom = new THREE.ShapeGeometry(spout_openingShape, 24);
  const spout_opening = new THREE.Mesh(spout_openingGeom, spout_openingMat);
  spout_opening.rotation.x = -Math.PI / 2;
  spout_opening.position.set(0, 1.827, 0);
  root.add(spout_opening);

  const spout_lipPoints = [
    new THREE.Vector3(-0.77, 1.805, 0.00),
    new THREE.Vector3(-0.68, 1.835, 0.13),
    new THREE.Vector3(-0.54, 1.825, 0.14),
    new THREE.Vector3(-0.39, 1.785, 0.11),
    new THREE.Vector3(-0.30, 1.765, 0.04),
  ];
  const spout_lipGeom = new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3(spout_lipPoints, false, "centripetal"),
    32,
    0.018,
    10,
    false
  );
  const spout_lip = new THREE.Mesh(spout_lipGeom, bodyMat);
  root.add(spout_lip);

  const handlePoints = [
    new THREE.Vector3(0.34, 1.59, 0.00),
    new THREE.Vector3(0.48, 1.68, 0.00),
    new THREE.Vector3(0.66, 1.70, 0.00),
    new THREE.Vector3(0.82, 1.62, 0.00),
    new THREE.Vector3(0.91, 1.45, 0.00),
    new THREE.Vector3(0.94, 1.22, 0.00),
    new THREE.Vector3(0.91, 0.98, 0.00),
    new THREE.Vector3(0.83, 0.75, 0.00),
    new THREE.Vector3(0.72, 0.54, 0.00),
    new THREE.Vector3(0.58, 0.37, 0.00),
    new THREE.Vector3(0.47, 0.31, 0.00),
  ];
  const handleCurve = new THREE.CatmullRomCurve3(
    handlePoints,
    false,
    "centripetal"
  );
  const handleGeom = new THREE.TubeGeometry(
    handleCurve,
    72,
    0.065,
    16,
    false
  );
  const handle = new THREE.Mesh(handleGeom, bodyMat);
  root.add(handle);

  const upper_handle_mountGeom = new THREE.SphereGeometry(0.10, 24, 16);
  const upper_handle_mount = new THREE.Mesh(upper_handle_mountGeom, bodyMat);
  upper_handle_mount.position.set(0.35, 1.59, 0);
  upper_handle_mount.scale.set(0.9, 0.72, 0.82);
  root.add(upper_handle_mount);

  const lower_handle_mountGeom = new THREE.SphereGeometry(0.095, 24, 16);
  const lower_handle_mount = new THREE.Mesh(lower_handle_mountGeom, bodyMat);
  lower_handle_mount.position.set(0.47, 0.32, 0);
  lower_handle_mount.scale.set(0.72, 1.18, 0.82);
  root.add(lower_handle_mount);

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