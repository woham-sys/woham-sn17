// miner-diag: gpus=? tflops=? stream48=? power=? probe_tps=3831 cpu_quota=?/? net=? batch=3 wall=1521 seed=870128282
export default function generate(THREE) {
  const root = new THREE.Group();
  const tool = new THREE.Group();
  tool.name = "vintage_claw_hammer";
  tool.rotation.z = -0.55;
  root.add(tool);

  const handleMat = new THREE.MeshStandardMaterial({
    color: 0x9b642f,
    metalness: 0.0,
    roughness: 0.6,
  });
  const handle_grainMat = new THREE.MeshStandardMaterial({
    color: 0x4a2b16,
    metalness: 0.0,
    roughness: 0.9,
  });
  const handle_highlightMat = new THREE.MeshStandardMaterial({
    color: 0xc18a4a,
    metalness: 0.0,
    roughness: 0.6,
  });
  const headMat = new THREE.MeshStandardMaterial({
    color: 0x3a3a3a,
    metalness: 0.6,
    roughness: 0.5,
  });
  const worn_edgeMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25,
  });
  const rustMat = new THREE.MeshStandardMaterial({
    color: 0x87432d,
    metalness: 0.0,
    roughness: 0.9,
    side: THREE.DoubleSide,
  });
  const stampMat = new THREE.MeshStandardMaterial({
    color: 0x202020,
    metalness: 0.3,
    roughness: 0.75,
  });

  const handleProfile = [
    new THREE.Vector2(0.000, -1.620),
    new THREE.Vector2(0.070, -1.615),
    new THREE.Vector2(0.130, -1.580),
    new THREE.Vector2(0.165, -1.510),
    new THREE.Vector2(0.175, -1.400),
    new THREE.Vector2(0.170, -1.150),
    new THREE.Vector2(0.160, -0.700),
    new THREE.Vector2(0.150, -0.200),
    new THREE.Vector2(0.142, 0.250),
    new THREE.Vector2(0.135, 0.500),
    new THREE.Vector2(0.120, 0.580),
    new THREE.Vector2(0.000, 0.590),
  ];
  const handleGeom = new THREE.LatheGeometry(handleProfile, 40);
  const handle = new THREE.Mesh(handleGeom, handleMat);
  handle.name = "handle";
  tool.add(handle);

  function handleRadiusAt(y) {
    if (y < -1.45) return 0.165;
    if (y < -0.70) return 0.170 - (y + 1.45) * 0.013;
    if (y < 0.25) return 0.160 - (y + 0.70) * 0.019;
    return 0.142 - (y - 0.25) * 0.028;
  }

  const handle_grain = new THREE.Group();
  handle_grain.name = "handle_grain";
  for (let i = 0; i < 12; i++) {
    const points = [];
    const y0 = -1.46 + (i % 3) * 0.055;
    const y1 = 0.42 - (i % 4) * 0.075;
    const baseAngle = 0.35 + i * Math.PI * 2 / 12;
    for (let j = 0; j <= 6; j++) {
      const t = j / 6;
      const y = y0 + (y1 - y0) * t;
      const angle = baseAngle + 0.025 * Math.sin(t * Math.PI * 2 + i * 0.7);
      const radius = handleRadiusAt(y) + 0.002;
      points.push(new THREE.Vector3(
        Math.cos(angle) * radius,
        y,
        Math.sin(angle) * radius
      ));
    }
    const grainGeom = new THREE.TubeGeometry(
      new THREE.CatmullRomCurve3(points),
      18,
      0.0022,
      5,
      false
    );
    const grain = new THREE.Mesh(grainGeom, handle_grainMat);
    handle_grain.add(grain);
  }
  tool.add(handle_grain);

  const handle_highlightPoints = [];
  for (let i = 0; i <= 7; i++) {
    const t = i / 7;
    const y = -1.42 + t * 1.82;
    const angle = 2.45 + 0.018 * Math.sin(t * Math.PI * 3);
    const radius = handleRadiusAt(y) + 0.0025;
    handle_highlightPoints.push(new THREE.Vector3(
      Math.cos(angle) * radius,
      y,
      Math.sin(angle) * radius
    ));
  }
  const handle_highlightGeom = new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3(handle_highlightPoints),
    20,
    0.003,
    6,
    false
  );
  const handle_highlight = new THREE.Mesh(handle_highlightGeom, handle_highlightMat);
  handle_highlight.name = "handle_highlight";
  tool.add(handle_highlight);

  const handle_ringGeom = new THREE.TorusGeometry(0.143, 0.0035, 6, 40);
  const handle_rings = new THREE.InstancedMesh(handle_ringGeom, handle_grainMat, 2);
  handle_rings.name = "handle_rings";
  const ring_dummy = new THREE.Object3D();
  const ringData = [
    [0.245, 1.00],
    [0.305, 0.985],
  ];
  for (let i = 0; i < ringData.length; i++) {
    ring_dummy.position.set(0, ringData[i][0], 0);
    ring_dummy.rotation.set(Math.PI / 2, 0, 0);
    ring_dummy.scale.setScalar(ringData[i][1]);
    ring_dummy.updateMatrix();
    handle_rings.setMatrixAt(i, ring_dummy.matrix);
  }
  handle_rings.instanceMatrix.needsUpdate = true;
  tool.add(handle_rings);

  const handle_knotGeom = new THREE.TorusGeometry(0.026, 0.004, 6, 20);
  const handle_knot = new THREE.Mesh(handle_knotGeom, handle_grainMat);
  handle_knot.name = "handle_knot";
  handle_knot.position.set(0.025, -0.18, 0.148);
  handle_knot.rotation.z = 0.35;
  handle_knot.scale.set(1.0, 0.62, 1.0);
  tool.add(handle_knot);

  const handle_knot_centerGeom = new THREE.CircleGeometry(0.010, 14);
  const handle_knot_center = new THREE.Mesh(handle_knot_centerGeom, handle_grainMat);
  handle_knot_center.name = "handle_knot_center";
  handle_knot_center.position.set(0.025, -0.18, 0.153);
  handle_knot_center.rotation.z = 0.35;
  handle_knot_center.scale.set(1.0, 0.65, 1.0);
  tool.add(handle_knot_center);

  const headShape = new THREE.Shape();
  headShape.moveTo(-0.18, 0.50);
  headShape.bezierCurveTo(-0.34, 0.55, -0.50, 0.67, -0.68, 0.72);
  headShape.bezierCurveTo(-0.88, 0.79, -1.08, 0.73, -1.25, 0.61);
  headShape.bezierCurveTo(-1.31, 0.57, -1.34, 0.61, -1.33, 0.67);
  headShape.bezierCurveTo(-1.31, 0.80, -1.18, 0.94, -0.98, 1.04);
  headShape.bezierCurveTo(-0.72, 1.17, -0.38, 1.22, -0.08, 1.20);
  headShape.bezierCurveTo(0.25, 1.18, 0.52, 1.07, 0.72, 0.94);
  headShape.bezierCurveTo(0.84, 0.86, 0.92, 0.76, 0.96, 0.65);
  headShape.bezierCurveTo(0.99, 0.56, 0.95, 0.47, 0.87, 0.41);
  headShape.bezierCurveTo(0.78, 0.35, 0.67, 0.35, 0.58, 0.40);
  headShape.bezierCurveTo(0.47, 0.46, 0.39, 0.55, 0.29, 0.58);
  headShape.bezierCurveTo(0.18, 0.61, 0.08, 0.55, 0.02, 0.47);
  headShape.bezierCurveTo(-0.04, 0.40, -0.10, 0.45, -0.18, 0.50);
  headShape.closePath();

  const headDepth = 0.30;
  const headGeom = new THREE.ExtrudeGeometry(headShape, {
    depth: headDepth,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.025,
    bevelSize: 0.025,
    bevelSegments: 3,
    curveSegments: 16,
  });
  headGeom.translate(0, 0, -headDepth / 2);
  const head = new THREE.Mesh(headGeom, headMat);
  head.name = "head";
  tool.add(head);

  const claw_tip_wearShape = new THREE.Shape();
  claw_tip_wearShape.moveTo(-1.325, 0.635);
  claw_tip_wearShape.bezierCurveTo(-1.335, 0.705, -1.285, 0.815, -1.185, 0.895);
  claw_tip_wearShape.lineTo(-1.105, 0.845);
  claw_tip_wearShape.bezierCurveTo(-1.195, 0.770, -1.245, 0.685, -1.235, 0.615);
  claw_tip_wearShape.closePath();
  const claw_tip_wearGeom = new THREE.ShapeGeometry(claw_tip_wearShape, 12);
  const claw_tip_wear = new THREE.Mesh(claw_tip_wearGeom, worn_edgeMat);
  claw_tip_wear.name = "claw_tip_wear";
  claw_tip_wear.position.z = 0.178;
  tool.add(claw_tip_wear);

  const claw_inner_wearPoints = [
    new THREE.Vector3(-1.285, 0.650, 0.178),
    new THREE.Vector3(-1.145, 0.755, 0.178),
    new THREE.Vector3(-0.955, 0.845, 0.178),
    new THREE.Vector3(-0.735, 0.895, 0.178),
    new THREE.Vector3(-0.515, 0.885, 0.178),
    new THREE.Vector3(-0.355, 0.815, 0.178),
  ];
  const claw_inner_wearGeom = new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3(claw_inner_wearPoints),
    28,
    0.008,
    6,
    false
  );
  const claw_inner_wear = new THREE.Mesh(claw_inner_wearGeom, worn_edgeMat);
  claw_inner_wear.name = "claw_inner_wear";
  tool.add(claw_inner_wear);

  const striking_face_wearShape = new THREE.Shape();
  striking_face_wearShape.moveTo(0.790, 0.430);
  striking_face_wearShape.bezierCurveTo(0.895, 0.465, 0.955, 0.545, 0.950, 0.645);
  striking_face_wearShape.bezierCurveTo(0.940, 0.755, 0.865, 0.855, 0.745, 0.925);
  striking_face_wearShape.lineTo(0.685, 0.870);
  striking_face_wearShape.bezierCurveTo(0.790, 0.790, 0.835, 0.690, 0.840, 0.585);
  striking_face_wearShape.bezierCurveTo(0.845, 0.515, 0.815, 0.470, 0.745, 0.445);
  striking_face_wearShape.closePath();
  const striking_face_wearGeom = new THREE.ShapeGeometry(striking_face_wearShape, 12);
  const striking_face_wear = new THREE.Mesh(striking_face_wearGeom, worn_edgeMat);
  striking_face_wear.name = "striking_face_wear";
  striking_face_wear.position.z = 0.178;
  tool.add(striking_face_wear);

  const rustShape = new THREE.Shape();
  rustShape.moveTo(0.98, 0.08);
  rustShape.lineTo(0.62, 0.48);
  rustShape.lineTo(0.12, 0.78);
  rustShape.lineTo(-0.42, 0.61);
  rustShape.lineTo(-0.88, 0.18);
  rustShape.lineTo(-0.71, -0.43);
  rustShape.lineTo(-0.18, -0.76);
  rustShape.lineTo(0.47, -0.58);
  rustShape.closePath();
  const rustGeom = new THREE.ShapeGeometry(rustShape);

  const headRustData = [
    [-1.17, 0.70, 0.055, 0.025, 0.20],
    [-1.02, 0.84, 0.075, 0.030, -0.45],
    [-0.82, 0.98, 0.060, 0.022, 0.70],
    [-0.58, 1.09, 0.085, 0.025, -0.20],
    [-0.30, 1.14, 0.050, 0.018, 0.40],
    [-0.02, 1.14, 0.070, 0.020, -0.60],
    [0.25, 1.08, 0.090, 0.025, 0.25],
    [0.48, 0.99, 0.065, 0.022, -0.35],
    [0.68, 0.86, 0.080, 0.026, 0.55],
    [0.82, 0.70, 0.060, 0.020, -0.20],
    [0.84, 0.50, 0.050, 0.018, 0.80],
    [0.62, 0.47, 0.070, 0.020, -0.50],
    [0.36, 0.62, 0.055, 0.018, 0.15],
    [0.08, 0.72, 0.045, 0.016, -0.75],
    [-0.22, 0.70, 0.060, 0.018, 0.45],
    [-0.50, 0.75, 0.050, 0.016, -0.25],
    [-0.78, 0.75, 0.070, 0.020, 0.65],
    [-1.08, 0.62, 0.040, 0.014, -0.40],
  ];
  const head_rust = new THREE.InstancedMesh(rustGeom, rustMat, headRustData.length * 2);
  head_rust.name = "head_rust";
  const rust_dummy = new THREE.Object3D();
  let rustIndex = 0;
  for (let side = 0; side < 2; side++) {
    const z = side === 0 ? 0.179 : -0.179;
    for (let i = 0; i < headRustData.length; i++) {
      const d = headRustData[i];
      rust_dummy.position.set(d[0], d[1], z);
      rust_dummy.rotation.set(0, 0, side === 0 ? d[4] : -d[4]);
      rust_dummy.scale.set(d[2], d[3], 1);
      rust_dummy.updateMatrix();
      head_rust.setMatrixAt(rustIndex++, rust_dummy.matrix);
    }
  }
  head_rust.instanceMatrix.needsUpdate = true;
  tool.add(head_rust);

  const head_pitGeom = new THREE.CircleGeometry(1, 10);
  const pitData = [
    [-1.03, 0.77, 0.010], [-0.86, 0.91, 0.008],
    [-0.64, 1.02, 0.007], [-0.42, 1.10, 0.009],
    [-0.15, 1.10, 0.007], [0.10, 1.08, 0.008],
    [0.34, 1.02, 0.006], [0.55, 0.94, 0.009],
    [0.72, 0.82, 0.007], [0.78, 0.62, 0.008],
    [0.55, 0.55, 0.006], [0.28, 0.67, 0.007],
    [0.00, 0.76, 0.006], [-0.30, 0.75, 0.008],
    [-0.62, 0.78, 0.006], [-0.92, 0.69, 0.007],
  ];
  const head_pits = new THREE.InstancedMesh(head_pitGeom, stampMat, pitData.length * 2);
  head_pits.name = "head_pits";
  let pitIndex = 0;
  for (let side = 0; side < 2; side++) {
    for (let i = 0; i < pitData.length; i++) {
      const d = pitData[i];
      rust_dummy.position.set(d[0], d[1], side === 0 ? 0.181 : -0.181);
      rust_dummy.rotation.set(0, 0, 0);
      rust_dummy.scale.set(d[2], d[2] * 0.72, 1);
      rust_dummy.updateMatrix();
      head_pits.setMatrixAt(pitIndex++, rust_dummy.matrix);
    }
  }
  head_pits.instanceMatrix.needsUpdate = true;
  tool.add(head_pits);

  const maker_stamp = new THREE.Group();
  maker_stamp.name = "maker_stamp";
  maker_stamp.position.set(0.34, 0.84, 0.184);
  maker_stamp.rotation.z = -0.18;

  const stamp_barGeom = new THREE.BoxGeometry(1, 1, 0.006);
  function addStampBar(w, h, x, y) {
    const bar = new THREE.Mesh(stamp_barGeom, stampMat);
    bar.position.set(x, y, 0);
    bar.scale.set(w, h, 1);
    maker_stamp.add(bar);
  }

  addStampBar(0.010, 0.070, -0.070, 0.000);
  addStampBar(0.045, 0.010, -0.052, 0.030);
  addStampBar(0.040, 0.010, -0.052, 0.000);
  addStampBar(0.045, 0.010, -0.052, -0.030);

  addStampBar(0.010, 0.070, -0.005, 0.000);
  addStampBar(0.010, 0.070, 0.025, 0.000);
  addStampBar(0.040, 0.010, 0.010, 0.030);
  addStampBar(0.040, 0.010, 0.010, -0.030);

  addStampBar(0.010, 0.070, 0.065, 0.000);
  addStampBar(0.045, 0.010, 0.083, 0.030);
  addStampBar(0.040, 0.010, 0.080, 0.000);
  addStampBar(0.010, 0.035, 0.103, 0.015);

  addStampBar(0.010, 0.070, 0.125, 0.000);
  addStampBar(0.045, 0.010, 0.143, 0.030);
  addStampBar(0.040, 0.010, 0.140, 0.000);
  addStampBar(0.045, 0.010, 0.143, -0.030);
  tool.add(maker_stamp);

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