// miner-diag: gpus=? tflops=? stream48=? power=? probe_tps=3831 cpu_quota=?/? net=? batch=3 wall=1521 seed=870128282
export default function generate(THREE) {
  const root = new THREE.Group();
  const quill_assembly = new THREE.Group();
  quill_assembly.rotation.z = -0.48;
  root.add(quill_assembly);

  const featherMat = new THREE.MeshStandardMaterial({
    color: 0x4a382e,
    metalness: 0.0,
    roughness: 0.95,
    side: THREE.DoubleSide,
  });
  const feather_edgeMat = new THREE.MeshStandardMaterial({
    color: 0x6b5544,
    metalness: 0.0,
    roughness: 0.95,
    side: THREE.DoubleSide,
  });
  const shaftMat = new THREE.MeshStandardMaterial({
    color: 0x29231f,
    metalness: 0.0,
    roughness: 0.7,
  });
  const base_socketMat = new THREE.MeshStandardMaterial({
    color: 0xc8aa72,
    metalness: 0.0,
    roughness: 0.7,
  });
  const wooden_handleMat = new THREE.MeshStandardMaterial({
    color: 0xa98b5f,
    metalness: 0.0,
    roughness: 0.6,
  });
  const ferruleMat = new THREE.MeshStandardMaterial({
    color: 0x603923,
    metalness: 0.0,
    roughness: 0.6,
  });
  const ropeMat = new THREE.MeshStandardMaterial({
    color: 0x8b7457,
    metalness: 0.0,
    roughness: 0.95,
  });
  const rope_darkMat = new THREE.MeshStandardMaterial({
    color: 0x554434,
    metalness: 0.0,
    roughness: 0.95,
  });
  const barb_linesMat = new THREE.LineBasicMaterial({
    color: 0x806b59,
    transparent: true,
    opacity: 0.58,
  });
  const downy_barbsMat = new THREE.LineBasicMaterial({
    color: 0xd8cfbd,
    transparent: true,
    opacity: 0.72,
  });
  const handle_specklesMat = new THREE.LineBasicMaterial({
    color: 0x594632,
    transparent: true,
    opacity: 0.65,
  });

  const featherShape = new THREE.Shape();
  featherShape.moveTo(0.0, 0.02);
  featherShape.lineTo(-0.06, 0.10);
  featherShape.lineTo(-0.13, 0.18);
  featherShape.lineTo(-0.18, 0.29);
  featherShape.lineTo(-0.12, 0.36);
  featherShape.lineTo(-0.23, 0.47);
  featherShape.lineTo(-0.29, 0.61);
  featherShape.lineTo(-0.25, 0.69);
  featherShape.lineTo(-0.34, 0.82);
  featherShape.lineTo(-0.38, 1.00);
  featherShape.lineTo(-0.36, 1.16);
  featherShape.lineTo(-0.39, 1.31);
  featherShape.lineTo(-0.34, 1.47);
  featherShape.lineTo(-0.31, 1.62);
  featherShape.lineTo(-0.24, 1.76);
  featherShape.lineTo(-0.13, 1.87);
  featherShape.lineTo(0.0, 1.92);
  featherShape.lineTo(0.10, 1.87);
  featherShape.lineTo(0.20, 1.78);
  featherShape.lineTo(0.28, 1.65);
  featherShape.lineTo(0.33, 1.50);
  featherShape.lineTo(0.35, 1.34);
  featherShape.lineTo(0.34, 1.18);
  featherShape.lineTo(0.31, 1.04);
  featherShape.lineTo(0.25, 0.91);
  featherShape.lineTo(0.30, 0.84);
  featherShape.lineTo(0.23, 0.72);
  featherShape.lineTo(0.27, 0.62);
  featherShape.lineTo(0.20, 0.49);
  featherShape.lineTo(0.15, 0.36);
  featherShape.lineTo(0.09, 0.22);
  featherShape.lineTo(0.03, 0.08);
  featherShape.closePath();

  const featherGeom = new THREE.ExtrudeGeometry(featherShape, {
    depth: 0.012,
    steps: 1,
    bevelEnabled: false,
  });
  const feather = new THREE.Mesh(featherGeom, featherMat);
  feather.position.z = -0.006;
  quill_assembly.add(feather);

  const left_vaneShape = new THREE.Shape();
  left_vaneShape.moveTo(-0.004, 0.08);
  left_vaneShape.lineTo(-0.06, 0.10);
  left_vaneShape.lineTo(-0.13, 0.18);
  left_vaneShape.lineTo(-0.18, 0.29);
  left_vaneShape.lineTo(-0.12, 0.36);
  left_vaneShape.lineTo(-0.23, 0.47);
  left_vaneShape.lineTo(-0.29, 0.61);
  left_vaneShape.lineTo(-0.25, 0.69);
  left_vaneShape.lineTo(-0.34, 0.82);
  left_vaneShape.lineTo(-0.38, 1.00);
  left_vaneShape.lineTo(-0.36, 1.16);
  left_vaneShape.lineTo(-0.39, 1.31);
  left_vaneShape.lineTo(-0.34, 1.47);
  left_vaneShape.lineTo(-0.31, 1.62);
  left_vaneShape.lineTo(-0.24, 1.76);
  left_vaneShape.lineTo(-0.13, 1.87);
  left_vaneShape.lineTo(0.0, 1.92);
  left_vaneShape.lineTo(-0.006, 1.78);
  left_vaneShape.lineTo(-0.008, 1.45);
  left_vaneShape.lineTo(-0.009, 1.05);
  left_vaneShape.lineTo(-0.010, 0.65);
  left_vaneShape.lineTo(-0.010, 0.30);
  left_vaneShape.closePath();

  const left_vaneGeom = new THREE.ShapeGeometry(left_vaneShape);
  const left_vane = new THREE.Mesh(left_vaneGeom, feather_edgeMat);
  left_vane.position.z = 0.007;
  quill_assembly.add(left_vane);

  const right_vaneShape = new THREE.Shape();
  right_vaneShape.moveTo(0.004, 0.08);
  right_vaneShape.lineTo(0.03, 0.08);
  right_vaneShape.lineTo(0.09, 0.22);
  right_vaneShape.lineTo(0.15, 0.36);
  right_vaneShape.lineTo(0.20, 0.49);
  right_vaneShape.lineTo(0.27, 0.62);
  right_vaneShape.lineTo(0.23, 0.72);
  right_vaneShape.lineTo(0.30, 0.84);
  right_vaneShape.lineTo(0.34, 1.04);
  right_vaneShape.lineTo(0.35, 1.18);
  right_vaneShape.lineTo(0.34, 1.34);
  right_vaneShape.lineTo(0.33, 1.50);
  right_vaneShape.lineTo(0.28, 1.65);
  right_vaneShape.lineTo(0.20, 1.78);
  right_vaneShape.lineTo(0.10, 1.87);
  right_vaneShape.lineTo(0.0, 1.92);
  right_vaneShape.lineTo(0.008, 1.75);
  right_vaneShape.lineTo(0.009, 1.40);
  right_vaneShape.lineTo(0.010, 1.00);
  right_vaneShape.lineTo(0.010, 0.60);
  right_vaneShape.lineTo(0.009, 0.28);
  right_vaneShape.closePath();

  const right_vaneGeom = new THREE.ShapeGeometry(right_vaneShape);
  const right_vane = new THREE.Mesh(right_vaneGeom, feather_edgeMat);
  right_vane.position.z = 0.007;
  quill_assembly.add(right_vane);

  const barb_positions = [];
  const barb_count = 48;
  for (let i = 0; i < barb_count; i++) {
    const y = 0.18 + i * 0.036;
    const t = (y - 0.02) / 1.90;
    const envelope = Math.pow(Math.sin(Math.PI * t), 0.68);
    const left_width = 0.39 * envelope * (0.82 + 0.18 * t);
    const right_width = 0.35 * envelope * (0.90 + 0.10 * t);
    const rise = 0.050 + 0.025 * (1 - t);
    const start_x = -0.010 * (1 - t) + 0.004 * t;

    barb_positions.push(
      start_x, y, 0.012,
      start_x - left_width * 0.94, y + rise, 0.012,
      start_x, y, 0.012,
      start_x + right_width * 0.94, y + rise, 0.012
    );
  }
  const barb_linesGeom = new THREE.BufferGeometry();
  barb_linesGeom.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(barb_positions, 3)
  );
  const barb_lines = new THREE.LineSegments(barb_linesGeom, barb_linesMat);
  quill_assembly.add(barb_lines);

  const downy_positions = [];
  for (let i = 0; i < 22; i++) {
    const side = i % 2 === 0 ? -1 : 1;
    const row = Math.floor(i / 2);
    const y = 0.075 + row * 0.025;
    const reach = 0.10 + ((i * 7) % 9) * 0.018;
    const lift = ((i % 5) - 2) * 0.012;
    downy_positions.push(
      side * 0.012, y, 0.014,
      side * reach, y + lift, 0.014
    );
  }
  const downy_barbsGeom = new THREE.BufferGeometry();
  downy_barbsGeom.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(downy_positions, 3)
  );
  const downy_barbs = new THREE.LineSegments(
    downy_barbsGeom,
    downy_barbsMat
  );
  quill_assembly.add(downy_barbs);

  const shaftPath = new THREE.CatmullRomCurve3(
    [
      new THREE.Vector3(0.0, -0.02, 0.025),
      new THREE.Vector3(0.002, 0.35, 0.025),
      new THREE.Vector3(0.006, 0.75, 0.025),
      new THREE.Vector3(0.010, 1.15, 0.025),
      new THREE.Vector3(0.014, 1.52, 0.025),
      new THREE.Vector3(0.004, 1.88, 0.025),
    ],
    false,
    "centripetal"
  );
  const shaftGeom = new THREE.TubeGeometry(shaftPath, 48, 0.012, 8, false);
  const shaft = new THREE.Mesh(shaftGeom, shaftMat);
  quill_assembly.add(shaft);

  const base_socketPath = new THREE.CatmullRomCurve3(
    [
      new THREE.Vector3(0.0, -0.16, 0.026),
      new THREE.Vector3(0.0, -0.03, 0.026),
      new THREE.Vector3(0.002, 0.13, 0.026),
      new THREE.Vector3(0.004, 0.25, 0.026),
    ],
    false,
    "centripetal"
  );
  const base_socketGeom = new THREE.TubeGeometry(
    base_socketPath,
    18,
    0.030,
    10,
    false
  );
  const base_socket = new THREE.Mesh(base_socketGeom, base_socketMat);
  quill_assembly.add(base_socket);

  const wooden_handleGeom = new THREE.CylinderGeometry(
    0.034,
    0.043,
    0.78,
    18
  );
  const wooden_handle = new THREE.Mesh(wooden_handleGeom, wooden_handleMat);
  wooden_handle.position.y = -0.57;
  quill_assembly.add(wooden_handle);

  const handle_speckle_positions = [];
  for (let i = 0; i < 18; i++) {
    const t = i / 17;
    const y = -0.88 + t * 0.58;
    const radius = 0.043 - t * 0.008;
    const x = Math.sin(i * 2.17) * radius * 0.55;
    const z = Math.sqrt(Math.max(0, radius * radius - x * x)) + 0.002;
    const half = 0.006 + (i % 3) * 0.002;
    handle_speckle_positions.push(x, y - half, z, x, y + half, z);
  }
  const handle_specklesGeom = new THREE.BufferGeometry();
  handle_specklesGeom.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(handle_speckle_positions, 3)
  );
  const handle_speckles = new THREE.LineSegments(
    handle_specklesGeom,
    handle_specklesMat
  );
  quill_assembly.add(handle_speckles);

  const ferruleGeom = new THREE.CylinderGeometry(0.047, 0.052, 0.20, 20);
  const ferrule = new THREE.Mesh(ferruleGeom, ferruleMat);
  ferrule.position.y = -1.04;
  quill_assembly.add(ferrule);

  const ferrule_bandGeom = new THREE.TorusGeometry(0.048, 0.004, 6, 24);
  const ferrule_band = new THREE.Mesh(ferrule_bandGeom, rope_darkMat);
  ferrule_band.rotation.x = Math.PI / 2;
  ferrule_band.position.y = -0.955;
  quill_assembly.add(ferrule_band);

  const rope_wrapsGeom = new THREE.TorusGeometry(0.055, 0.012, 8, 24);
  const rope_wraps = new THREE.InstancedMesh(rope_wrapsGeom, ropeMat, 7);
  const wrap_dummy = new THREE.Object3D();
  for (let i = 0; i < 7; i++) {
    wrap_dummy.position.set(0, -1.17 + i * 0.024, 0);
    wrap_dummy.rotation.set(Math.PI / 2, 0, i * 0.18);
    wrap_dummy.scale.setScalar(1.0 - Math.abs(3 - i) * 0.025);
    wrap_dummy.updateMatrix();
    rope_wraps.setMatrixAt(i, wrap_dummy.matrix);
  }
  rope_wraps.instanceMatrix.needsUpdate = true;
  quill_assembly.add(rope_wraps);

  const rope_knotGeom = new THREE.SphereGeometry(0.060, 16, 10);
  const rope_knot = new THREE.Mesh(rope_knotGeom, ropeMat);
  rope_knot.scale.set(1.0, 0.78, 0.90);
  rope_knot.position.set(-0.004, -1.235, 0.004);
  quill_assembly.add(rope_knot);

  const left_lacePath = new THREE.CatmullRomCurve3(
    [
      new THREE.Vector3(-0.025, -1.22, 0.012),
      new THREE.Vector3(-0.070, -1.36, 0.012),
      new THREE.Vector3(-0.145, -1.50, 0.012),
      new THREE.Vector3(-0.205, -1.62, 0.012),
      new THREE.Vector3(-0.185, -1.70, 0.012),
      new THREE.Vector3(-0.115, -1.73, 0.012),
      new THREE.Vector3(-0.060, -1.67, 0.012),
      new THREE.Vector3(-0.075, -1.59, 0.012),
    ],
    false,
    "centripetal"
  );
  const left_laceGeom = new THREE.TubeGeometry(
    left_lacePath,
    36,
    0.017,
    8,
    false
  );
  const left_lace = new THREE.Mesh(left_laceGeom, ropeMat);
  quill_assembly.add(left_lace);

  const right_lacePath = new THREE.CatmullRomCurve3(
    [
      new THREE.Vector3(0.020, -1.22, 0.010),
      new THREE.Vector3(0.055, -1.39, 0.010),
      new THREE.Vector3(0.075, -1.56, 0.010),
      new THREE.Vector3(0.035, -1.70, 0.010),
      new THREE.Vector3(-0.055, -1.79, 0.010),
      new THREE.Vector3(-0.165, -1.77, 0.010),
      new THREE.Vector3(-0.235, -1.68, 0.010),
      new THREE.Vector3(-0.225, -1.57, 0.010),
      new THREE.Vector3(-0.160, -1.50, 0.010),
    ],
    false,
    "centripetal"
  );
  const right_laceGeom = new THREE.TubeGeometry(
    right_lacePath,
    42,
    0.017,
    8,
    false
  );
  const right_lace = new THREE.Mesh(right_laceGeom, ropeMat);
  quill_assembly.add(right_lace);

  const left_lace_ridgePath = new THREE.CatmullRomCurve3(
    [
      new THREE.Vector3(-0.018, -1.23, 0.028),
      new THREE.Vector3(-0.063, -1.36, 0.028),
      new THREE.Vector3(-0.138, -1.50, 0.028),
      new THREE.Vector3(-0.198, -1.62, 0.028),
      new THREE.Vector3(-0.178, -1.69, 0.028),
      new THREE.Vector3(-0.112, -1.715, 0.028),
      new THREE.Vector3(-0.067, -1.66, 0.028),
    ],
    false,
    "centripetal"
  );
  const left_lace_ridgeGeom = new THREE.TubeGeometry(
    left_lace_ridgePath,
    30,
    0.004,
    6,
    false
  );
  const left_lace_ridge = new THREE.Mesh(
    left_lace_ridgeGeom,
    rope_darkMat
  );
  quill_assembly.add(left_lace_ridge);

  const right_lace_ridgePath = new THREE.CatmullRomCurve3(
    [
      new THREE.Vector3(0.026, -1.23, 0.026),
      new THREE.Vector3(0.062, -1.39, 0.026),
      new THREE.Vector3(0.082, -1.56, 0.026),
      new THREE.Vector3(0.042, -1.69, 0.026),
      new THREE.Vector3(-0.050, -1.775, 0.026),
      new THREE.Vector3(-0.158, -1.755, 0.026),
      new THREE.Vector3(-0.225, -1.67, 0.026),
      new THREE.Vector3(-0.215, -1.58, 0.026),
    ],
    false,
    "centripetal"
  );
  const right_lace_ridgeGeom = new THREE.TubeGeometry(
    right_lace_ridgePath,
    36,
    0.004,
    6,
    false
  );
  const right_lace_ridge = new THREE.Mesh(
    right_lace_ridgeGeom,
    rope_darkMat
  );
  quill_assembly.add(right_lace_ridge);

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