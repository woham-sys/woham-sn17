function __sn17_user(THREE) {
  const root = new THREE.Group();
  root.name = "frying_pan";

  const pan_bodyMat = new THREE.MeshStandardMaterial({
    color: 0xb8b8b5,
    metalness: 0.45,
    roughness: 0.32,
    side: THREE.DoubleSide,
  });
  const cooking_surfaceMat = new THREE.MeshStandardMaterial({
    color: 0xd0d0cc,
    metalness: 0.4,
    roughness: 0.28,
    side: THREE.DoubleSide,
  });
  const rimMat = new THREE.MeshStandardMaterial({
    color: 0xd5d5d1,
    metalness: 0.5,
    roughness: 0.24,
  });
  const rivetMat = new THREE.MeshStandardMaterial({
    color: 0xe0e0dc,
    metalness: 0.5,
    roughness: 0.2,
  });
  const handle_tangMat = new THREE.MeshStandardMaterial({
    color: 0xc8c8c4,
    metalness: 0.5,
    roughness: 0.26,
  });
  const handle_gripMat = new THREE.MeshStandardMaterial({
    color: 0x111111,
    metalness: 0.0,
    roughness: 0.8,
  });
  const hanging_hole_rimMat = new THREE.MeshStandardMaterial({
    color: 0x050505,
    metalness: 0.0,
    roughness: 0.85,
    side: THREE.DoubleSide,
  });
  const logoMat = new THREE.MeshStandardMaterial({
    color: 0x050505,
    metalness: 0.0,
    roughness: 0.9,
  });

  const pan_bodyProfile = [
    new THREE.Vector2(0.00, -0.110),
    new THREE.Vector2(0.28, -0.110),
    new THREE.Vector2(0.38, -0.095),
    new THREE.Vector2(0.47, -0.055),
    new THREE.Vector2(0.535, 0.035),
    new THREE.Vector2(0.565, 0.140),
    new THREE.Vector2(0.565, 0.170),
    new THREE.Vector2(0.550, 0.185),
    new THREE.Vector2(0.525, 0.180),
    new THREE.Vector2(0.510, 0.140),
    new THREE.Vector2(0.485, 0.075),
    new THREE.Vector2(0.440, 0.025),
    new THREE.Vector2(0.360, -0.005),
    new THREE.Vector2(0.220, -0.018),
    new THREE.Vector2(0.000, -0.018),
  ];
  const pan_bodyGeo = new THREE.LatheGeometry(pan_bodyProfile, 72);
  const pan_body = new THREE.Mesh(pan_bodyGeo, pan_bodyMat);
  pan_body.name = "pan_body";
  root.add(pan_body);

  const cooking_surfaceGeo = new THREE.CircleGeometry(0.36, 72);
  const cooking_surface = new THREE.Mesh(cooking_surfaceGeo, cooking_surfaceMat);
  cooking_surface.name = "cooking_surface";
  cooking_surface.rotation.x = -Math.PI / 2;
  cooking_surface.position.y = -0.012;
  root.add(cooking_surface);

  const rimGeom = new THREE.TorusGeometry(0.551, 0.014, 12, 72);
  const rim = new THREE.Mesh(rimGeom, rimMat);
  rim.name = "rim";
  rim.rotation.x = Math.PI / 2;
  rim.position.y = 0.174;
  root.add(rim);

  const bottom_foot_ringGeom = new THREE.TorusGeometry(0.30, 0.012, 10, 64);
  const bottom_foot_ring = new THREE.Mesh(bottom_foot_ringGeom, pan_bodyMat);
  bottom_foot_ring.name = "bottom_foot_ring";
  bottom_foot_ring.rotation.x = Math.PI / 2;
  bottom_foot_ring.position.y = -0.108;
  root.add(bottom_foot_ring);

  const handle_assembly = new THREE.Group();
  handle_assembly.name = "handle_assembly";
  handle_assembly.position.set(0, 0.135, 0.50);
  handle_assembly.rotation.x = 0.045;
  root.add(handle_assembly);

  const handle_tangShape = new THREE.Shape();
  handle_tangShape.moveTo(-0.095, -0.035);
  handle_tangShape.lineTo(0.095, -0.035);
  handle_tangShape.lineTo(0.075, 0.31);
  handle_tangShape.lineTo(-0.075, 0.31);
  handle_tangShape.closePath();

  const handle_tangGeom = new THREE.ExtrudeGeometry(handle_tangShape, {
    depth: 0.055,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.008,
    bevelSize: 0.008,
    bevelSegments: 2,
  });
  handle_tangGeom.translate(0, 0, -0.0275);
  const handle_tang = new THREE.Mesh(handle_tangGeom, handle_tangMat);
  handle_tang.name = "handle_tang";
  handle_tang.rotation.x = Math.PI / 2;
  handle_assembly.add(handle_tang);

  const handle_gripShape = new THREE.Shape();
  handle_gripShape.moveTo(-0.105, 0.16);
  handle_gripShape.bezierCurveTo(-0.125, 0.16, -0.135, 0.19, -0.135, 0.23);
  handle_gripShape.lineTo(-0.155, 1.10);
  handle_gripShape.bezierCurveTo(-0.158, 1.22, -0.095, 1.30, 0.000, 1.31);
  handle_gripShape.bezierCurveTo(0.095, 1.30, 0.158, 1.22, 0.155, 1.10);
  handle_gripShape.lineTo(0.135, 0.23);
  handle_gripShape.bezierCurveTo(0.135, 0.19, 0.125, 0.16, 0.105, 0.16);
  handle_gripShape.closePath();

  const hanging_holePath = new THREE.Path();
  hanging_holePath.absellipse(
    0,
    1.15,
    0.058,
    0.082,
    0,
    Math.PI * 2,
    false,
    0
  );
  handle_gripShape.holes.push(hanging_holePath);

  const handle_gripGeom = new THREE.ExtrudeGeometry(handle_gripShape, {
    depth: 0.11,
    steps: 1,
    curveSegments: 24,
    bevelEnabled: true,
    bevelThickness: 0.018,
    bevelSize: 0.018,
    bevelSegments: 4,
  });
  handle_gripGeom.translate(0, 0, -0.055);
  const handle_grip = new THREE.Mesh(handle_gripGeom, handle_gripMat);
  handle_grip.name = "handle_grip";
  handle_grip.rotation.x = Math.PI / 2;
  handle_assembly.add(handle_grip);

  const hanging_hole_rimGeom = new THREE.RingGeometry(0.052, 0.071, 32);
  const hanging_hole_rim = new THREE.Mesh(
    hanging_hole_rimGeom,
    hanging_hole_rimMat
  );
  hanging_hole_rim.name = "hanging_hole_rim";
  hanging_hole_rim.rotation.x = -Math.PI / 2;
  hanging_hole_rim.scale.set(1, 1.4, 1);
  hanging_hole_rim.position.set(0, 0.075, 1.15);
  handle_assembly.add(hanging_hole_rim);

  const rivetGeom = new THREE.SphereGeometry(0.045, 24, 12);
  const rivets = new THREE.InstancedMesh(rivetGeom, rivetMat, 2);
  rivets.name = "rivets";
  const rivet_dummy = new THREE.Object3D();
  const rivet_positions = [
    [-0.072, 0.112, 0.512],
    [0.072, 0.060, 0.512],
  ];
  for (let i = 0; i < rivet_positions.length; i++) {
    const p = rivet_positions[i];
    rivet_dummy.position.set(p[0], p[1], p[2]);
    rivet_dummy.scale.set(1, 1, 0.38);
    rivet_dummy.updateMatrix();
    rivets.setMatrixAt(i, rivet_dummy.matrix);
  }
  rivets.instanceMatrix.needsUpdate = true;
  root.add(rivets);

  const logo_marksGeom = new THREE.BoxGeometry(0.012, 0.006, 0.052);
  const logo_marks = new THREE.InstancedMesh(logo_marksGeom, logoMat, 3);
  logo_marks.name = "logo_marks";
  const logo_dummy = new THREE.Object3D();
  for (let i = 0; i < 3; i++) {
    logo_dummy.position.set((i - 1) * 0.022, 0.077, 0.43 + i * 0.006);
    logo_dummy.rotation.set(0, -0.22, 0);
    logo_dummy.updateMatrix();
    logo_marks.setMatrixAt(i, logo_dummy.matrix);
  }
  logo_marks.instanceMatrix.needsUpdate = true;
  handle_assembly.add(logo_marks);

  fitToUnitCube(THREE, root);
  return root;
}

function fitToUnitCube(THREE, root) {
  const box = new THREE.Box3().setFromObject(root);
  const size = new THREE.Vector3();
  box.getSize(size);
  const center = new THREE.Vector3();
  box.getCenter(center);
  root.position.sub(center);
  const maxDim = Math.max(size.x, size.y, size.z);
  if (maxDim > 0) {
    const scale = 0.98 / maxDim;
    root.scale.setScalar(scale);
  }
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
