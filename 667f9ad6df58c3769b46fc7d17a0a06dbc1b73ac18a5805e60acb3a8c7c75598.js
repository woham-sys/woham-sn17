function __sn17_user(THREE) {
  const root = new THREE.Group();
  const applicator = new THREE.Group();
  applicator.rotation.set(-0.08, 0, -0.36);
  root.add(applicator);

  const cotton_tip = new THREE.Group();
  const handle_group = new THREE.Group();
  applicator.add(cotton_tip, handle_group);

  const cotton_headMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    emissive: 0xf2f2ee,
    emissiveIntensity: 0.18,
    metalness: 0,
    roughness: 1,
  });
  const cotton_fibersMat = new THREE.LineBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.42,
    depthWrite: false,
  });
  const lower_stickMat = new THREE.MeshStandardMaterial({
    color: 0xf4f1e8,
    metalness: 0,
    roughness: 0.72,
  });
  const wood_socketMat = new THREE.MeshStandardMaterial({
    color: 0xd8b77d,
    metalness: 0,
    roughness: 0.78,
  });
  const wood_grainMat = new THREE.MeshStandardMaterial({
    color: 0xb99059,
    metalness: 0,
    roughness: 0.82,
  });

  const cotton_headProfile = [
    new THREE.Vector2(0.000, 0.035),
    new THREE.Vector2(0.105, 0.035),
    new THREE.Vector2(0.145, 0.055),
    new THREE.Vector2(0.168, 0.100),
    new THREE.Vector2(0.176, 0.180),
    new THREE.Vector2(0.176, 0.820),
    new THREE.Vector2(0.170, 0.900),
    new THREE.Vector2(0.150, 0.965),
    new THREE.Vector2(0.110, 1.015),
    new THREE.Vector2(0.055, 1.045),
    new THREE.Vector2(0.000, 1.055),
  ];
  const cotton_headGeo = new THREE.LatheGeometry(cotton_headProfile, 48);
  const cotton_head = new THREE.Mesh(cotton_headGeo, cotton_headMat);
  cotton_tip.add(cotton_head);

  const cotton_fiber_positions = [];
  const golden_angle = 2.399963229728653;

  function addFiberSegment(a, b) {
    cotton_fiber_positions.push(a.x, a.y, a.z, b.x, b.y, b.z);
  }

  function surfacePoint(angle, y, radius) {
    return new THREE.Vector3(
      Math.cos(angle) * radius,
      y,
      Math.sin(angle) * radius
    );
  }

  for (let i = 0; i < 150; i++) {
    const t = (i + 0.5) / 150;
    const y = 0.105 + t * 0.790;
    const angle = i * golden_angle;
    const length = 0.018 + ((i * 11) % 13) / 12 * 0.038;
    const rise = (((i * 7) % 9) - 4) * 0.0015;
    const curl = (((i * 5) % 7) - 3) * 0.0008;
    const start = surfacePoint(angle, y, 0.178);
    const middle = surfacePoint(
      angle + curl,
      y + rise,
      0.181 + (i % 3) * 0.001
    );
    const end = surfacePoint(
      angle + curl * 1.7,
      y + rise + length,
      0.182
    );
    addFiberSegment(start, middle);
    addFiberSegment(middle, end);
  }

  for (let i = 0; i < 42; i++) {
    const t = (i + 0.5) / 42;
    const y = 0.045 + t * 0.125;
    const angle = i * golden_angle + 0.35;
    const start = surfacePoint(angle, y, 0.154);
    const middle = surfacePoint(
      angle + 0.012,
      y + 0.006,
      0.169 + (i % 2) * 0.003
    );
    const end = surfacePoint(
      angle + 0.025,
      y + 0.018 + (i % 5) * 0.003,
      0.178
    );
    addFiberSegment(start, middle);
    addFiberSegment(middle, end);
  }

  for (let i = 0; i < 36; i++) {
    const t = (i + 0.5) / 36;
    const y = 0.875 + t * 0.155;
    const angle = i * golden_angle + 0.7;
    const radius = 0.170 - t * 0.105;
    const start = surfacePoint(angle, y, radius);
    const middle = surfacePoint(
      angle + 0.018,
      y + 0.008,
      radius + 0.006
    );
    const end = surfacePoint(
      angle + 0.035,
      y + 0.022 + (i % 4) * 0.003,
      radius + 0.008
    );
    addFiberSegment(start, middle);
    addFiberSegment(middle, end);
  }

  const cotton_fibersGeo = new THREE.BufferGeometry();
  cotton_fibersGeo.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(cotton_fiber_positions, 3)
  );
  const cotton_fibers = new THREE.LineSegments(
    cotton_fibersGeo,
    cotton_fibersMat
  );
  cotton_tip.add(cotton_fibers);

  const wood_socketProfile = [
    new THREE.Vector2(0.000, -0.045),
    new THREE.Vector2(0.043, -0.045),
    new THREE.Vector2(0.047, -0.025),
    new THREE.Vector2(0.047, 0.125),
    new THREE.Vector2(0.043, 0.150),
    new THREE.Vector2(0.000, 0.150),
  ];
  const wood_socketGeo = new THREE.LatheGeometry(wood_socketProfile, 32);
  const wood_socket = new THREE.Mesh(wood_socketGeo, wood_socketMat);
  handle_group.add(wood_socket);

  const lower_stickProfile = [
    new THREE.Vector2(0.000, -1.025),
    new THREE.Vector2(0.025, -1.025),
    new THREE.Vector2(0.033, -1.012),
    new THREE.Vector2(0.035, -0.985),
    new THREE.Vector2(0.035, -0.075),
    new THREE.Vector2(0.033, -0.045),
    new THREE.Vector2(0.000, -0.045),
  ];
  const lower_stickGeo = new THREE.LatheGeometry(lower_stickProfile, 32);
  const lower_stick = new THREE.Mesh(lower_stickGeo, lower_stickMat);
  handle_group.add(lower_stick);

  const wood_grain_positions = [];
  for (let i = 0; i < 12; i++) {
    const angle = i / 12 * Math.PI * 2 + 0.17;
    const y0 = -0.020 + (i % 4) * 0.020;
    const y1 = 0.105 + (i % 3) * 0.010;
    wood_grain_positions.push(
      Math.cos(angle) * 0.048,
      y0,
      Math.sin(angle) * 0.048,
      Math.cos(angle + 0.015) * 0.048,
      y1,
      Math.sin(angle + 0.015) * 0.048
    );
  }
  const wood_grainGeom = new THREE.BufferGeometry();
  wood_grainGeom.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(wood_grain_positions, 3)
  );
  const wood_grain = new THREE.LineSegments(
    wood_grainGeom,
    new THREE.LineBasicMaterial({
      color: 0xb99059,
      transparent: true,
      opacity: 0.32,
      depthWrite: false,
    })
  );
  handle_group.add(wood_grain);

  const lower_stick_fiber_positions = [];
  for (let i = 0; i < 24; i++) {
    const t = (i + 0.5) / 24;
    const y = -0.965 + t * 0.850;
    const angle = i * golden_angle + 0.4;
    const start = new THREE.Vector3(
      Math.cos(angle) * 0.035,
      y,
      Math.sin(angle) * 0.035
    );
    const middle = new THREE.Vector3(
      Math.cos(angle + 0.012) * 0.037,
      y + 0.004,
      Math.sin(angle + 0.012) * 0.037
    );
    const end = new THREE.Vector3(
      Math.cos(angle + 0.025) * 0.038,
      y + 0.018 + (i % 5) * 0.003,
      Math.sin(angle + 0.025) * 0.038
    );
    lower_stick_fiber_positions.push(
      start.x, start.y, start.z,
      middle.x, middle.y, middle.z,
      middle.x, middle.y, middle.z,
      end.x, end.y, end.z
    );
  }
  const lower_stick_fibersGeom = new THREE.BufferGeometry();
  lower_stick_fibersGeom.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(lower_stick_fiber_positions, 3)
  );
  const lower_stick_fibers = new THREE.LineSegments(
    lower_stick_fibersGeom,
    cotton_fibersMat
  );
  handle_group.add(lower_stick_fibers);

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
