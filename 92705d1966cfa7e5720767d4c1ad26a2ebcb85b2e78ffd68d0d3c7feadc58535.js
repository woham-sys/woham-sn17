function __sn17_user(THREE) {
  const root = new THREE.Group();
  const tool_group = new THREE.Group();
  root.add(tool_group);

  const steelMat = new THREE.MeshStandardMaterial({
    color: 0x6f7472,
    metalness: 0.5,
    roughness: 0.58,
  });
  const darkSteelMat = new THREE.MeshStandardMaterial({
    color: 0x3d4140,
    metalness: 0.5,
    roughness: 0.62,
  });
  const rustMat = new THREE.MeshStandardMaterial({
    color: 0x8a4a2e,
    metalness: 0.15,
    roughness: 0.9,
    side: THREE.DoubleSide,
  });
  const woodMat = new THREE.MeshStandardMaterial({
    color: 0x9a642f,
    metalness: 0.0,
    roughness: 0.72,
  });
  const darkWoodMat = new THREE.MeshStandardMaterial({
    color: 0x4b2d18,
    metalness: 0.0,
    roughness: 0.82,
  });
  const lightWoodMat = new THREE.MeshStandardMaterial({
    color: 0xc18a4a,
    metalness: 0.0,
    roughness: 0.78,
  });
  const brassMat = new THREE.MeshStandardMaterial({
    color: 0xb8a66b,
    metalness: 0.55,
    roughness: 0.35,
  });

  function createExtrudedGeometry(points, depth, bevelSize) {
    const shape = new THREE.Shape();
    shape.moveTo(points[0][0], points[0][1]);
    for (let i = 1; i < points.length; i++) {
      shape.lineTo(points[i][0], points[i][1]);
    }
    shape.closePath();
    const geom = new THREE.ExtrudeGeometry(shape, {
      depth: depth,
      bevelEnabled: true,
      bevelThickness: bevelSize,
      bevelSize: bevelSize,
      bevelSegments: 2,
    });
    geom.translate(0, 0, -depth / 2);
    return geom;
  }

  function createHandleGeometry(points, depth) {
    const shape = new THREE.Shape();
    shape.moveTo(points[0][0], points[0][1]);
    for (let i = 1; i < points.length; i++) {
      shape.lineTo(points[i][0], points[i][1]);
    }
    shape.closePath();
    const geom = new THREE.ExtrudeGeometry(shape, {
      depth: depth,
      bevelEnabled: true,
      bevelThickness: 0.018,
      bevelSize: 0.018,
      bevelSegments: 3,
    });
    geom.translate(0, 0, -depth / 2);
    return geom;
  }

  function createTube(points, radius, mat) {
    const curve = new THREE.CatmullRomCurve3(points);
    return new THREE.Mesh(new THREE.TubeGeometry(curve, 18, radius, 6, false), mat);
  }

  const left_bladeGeom = createExtrudedGeometry([
    [-0.085, -0.025],
    [0.085, -0.025],
    [0.085, 0.585],
    [0.0, 0.665],
    [-0.085, 0.585],
  ], 0.055, 0.006);
  const left_blade = new THREE.Mesh(left_bladeGeom, steelMat);
  left_blade.position.set(-0.018, 0.0, -0.018);
  left_blade.rotation.z = 0.48;
  tool_group.add(left_blade);

  const right_bladeGeom = createExtrudedGeometry([
    [-0.085, -0.025],
    [0.085, -0.025],
    [0.085, 0.565],
    [0.0, 0.645],
    [-0.085, 0.565],
  ], 0.055, 0.006);
  const right_blade = new THREE.Mesh(right_bladeGeom, steelMat);
  right_blade.position.set(0.018, 0.0, -0.018);
  right_blade.rotation.z = -0.48;
  tool_group.add(right_blade);

  const toothShape = new THREE.Shape();
  toothShape.moveTo(0.0, -0.018);
  toothShape.lineTo(0.052, 0.0);
  toothShape.lineTo(0.0, 0.018);
  toothShape.closePath();
  const toothGeom = new THREE.ExtrudeGeometry(toothShape, {
    depth: 0.058,
    bevelEnabled: false,
  });
  toothGeom.translate(0, 0, -0.029);

  const left_serrated_teeth = new THREE.InstancedMesh(toothGeom, steelMat, 13);
  const right_serrated_teeth = new THREE.InstancedMesh(toothGeom, steelMat, 13);
  const tooth_dummy = new THREE.Object3D();

  for (let i = 0; i < 13; i++) {
    const y = 0.105 + i * 0.039;

    tooth_dummy.position.set(-0.018, y, -0.018);
    tooth_dummy.rotation.set(0, 0, 0.48);
    tooth_dummy.updateMatrix();
    left_serrated_teeth.setMatrixAt(i, tooth_dummy.matrix);

    tooth_dummy.position.set(0.018, y, -0.018);
    tooth_dummy.rotation.set(0, 0, -0.48);
    tooth_dummy.updateMatrix();
    right_serrated_teeth.setMatrixAt(i, tooth_dummy.matrix);
  }
  left_serrated_teeth.instanceMatrix.needsUpdate = true;
  right_serrated_teeth.instanceMatrix.needsUpdate = true;
  tool_group.add(left_serrated_teeth, right_serrated_teeth);

  const left_handle_tangGeom = createExtrudedGeometry([
    [-0.075, -0.075],
    [0.075, -0.075],
    [0.075, -0.205],
    [-0.075, -0.205],
  ], 0.07, 0.008);
  const left_handle_tang = new THREE.Mesh(left_handle_tangGeom, darkSteelMat);
  left_handle_tang.position.set(-0.025, 0.0, -0.025);
  left_handle_tang.rotation.z = 0.48;
  tool_group.add(left_handle_tang);

  const right_handle_tangGeom = createExtrudedGeometry([
    [-0.075, -0.075],
    [0.075, -0.075],
    [0.075, -0.205],
    [-0.075, -0.205],
  ], 0.07, 0.008);
  const right_handle_tang = new THREE.Mesh(right_handle_tangGeom, darkSteelMat);
  right_handle_tang.position.set(0.025, 0.0, -0.025);
  right_handle_tang.rotation.z = -0.48;
  tool_group.add(right_handle_tang);

  const left_wood_handleGeom = createHandleGeometry([
    [-0.055, -0.135],
    [0.055, -0.135],
    [0.078, -0.82],
    [0.055, -0.94],
    [-0.055, -0.94],
    [-0.078, -0.82],
  ], 0.105);
  const left_wood_handle = new THREE.Mesh(left_wood_handleGeom, woodMat);
  left_wood_handle.position.set(-0.035, 0.0, -0.035);
  left_wood_handle.rotation.z = 0.48;
  tool_group.add(left_wood_handle);

  const right_wood_handleGeom = createHandleGeometry([
    [-0.055, -0.135],
    [0.055, -0.135],
    [0.078, -0.82],
    [0.055, -0.94],
    [-0.055, -0.94],
    [-0.078, -0.82],
  ], 0.105);
  const right_wood_handle = new THREE.Mesh(right_wood_handleGeom, woodMat);
  right_wood_handle.position.set(0.035, 0.0, -0.035);
  right_wood_handle.rotation.z = -0.48;
  tool_group.add(right_wood_handle);

  const left_handle_groove = createTube([
    new THREE.Vector3(-0.025, -0.20, 0.024),
    new THREE.Vector3(-0.045, -0.50, 0.026),
    new THREE.Vector3(-0.075, -0.82, 0.024),
  ], 0.006, darkWoodMat);
  tool_group.add(left_handle_groove);

  const right_handle_groove = createTube([
    new THREE.Vector3(0.025, -0.20, 0.024),
    new THREE.Vector3(0.045, -0.50, 0.026),
    new THREE.Vector3(0.075, -0.82, 0.024),
  ], 0.006, darkWoodMat);
  tool_group.add(right_handle_groove);

  const left_handle_highlight = createTube([
    new THREE.Vector3(-0.055, -0.24, 0.025),
    new THREE.Vector3(-0.075, -0.55, 0.027),
    new THREE.Vector3(-0.105, -0.84, 0.025),
  ], 0.004, lightWoodMat);
  tool_group.add(left_handle_highlight);

  const right_handle_highlight = createTube([
    new THREE.Vector3(0.055, -0.24, 0.025),
    new THREE.Vector3(0.075, -0.55, 0.027),
    new THREE.Vector3(0.105, -0.84, 0.025),
  ], 0.004, lightWoodMat);
  tool_group.add(right_handle_highlight);

  const pivot_plateGeom = new THREE.CylinderGeometry(0.145, 0.145, 0.075, 48);
  const pivot_plate = new THREE.Mesh(pivot_plateGeom, rustMat);
  pivot_plate.rotation.x = Math.PI / 2;
  pivot_plate.position.set(0, 0, 0.035);
  tool_group.add(pivot_plate);

  const pivot_rimGeom = new THREE.TorusGeometry(0.118, 0.009, 8, 48);
  const pivot_rim = new THREE.Mesh(pivot_rimGeom, darkSteelMat);
  pivot_rim.position.set(0, 0, 0.076);
  tool_group.add(pivot_rim);

  const pivot_pinGeom = new THREE.SphereGeometry(0.052, 32, 16);
  const pivot_pin = new THREE.Mesh(pivot_pinGeom, steelMat);
  pivot_pin.scale.set(1.0, 1.0, 0.42);
  pivot_pin.position.set(0, 0, 0.092);
  tool_group.add(pivot_pin);

  const pivot_slotGeom = new THREE.BoxGeometry(0.058, 0.008, 0.006);
  const pivot_slot = new THREE.Mesh(pivot_slotGeom, darkSteelMat);
  pivot_slot.position.set(0, 0, 0.116);
  pivot_slot.rotation.z = 0.25;
  tool_group.add(pivot_slot);

  const rust_spotGeom = new THREE.CircleGeometry(1, 12);
  const rust_spots = new THREE.InstancedMesh(rust_spotGeom, rustMat, 34);
  const spot_dummy = new THREE.Object3D();

  for (let i = 0; i < 34; i++) {
    const localY = 0.075 + ((i * 37) % 100) / 100 * 0.49;
    const localX = (((i * 53) % 100) / 100 - 0.5) * 0.12;
    const angle = i % 2 === 0 ? 0.48 : -0.48;
    const baseX = i % 2 === 0 ? -0.018 : 0.018;
    const c = Math.cos(angle);
    const s = Math.sin(angle);
    const x = baseX + c * localX - s * localY;
    const y = s * localX + c * localY;
    const size = 0.006 + ((i * 19) % 7) * 0.0018;

    spot_dummy.position.set(x, y, 0.016);
    spot_dummy.rotation.set(0, 0, angle + i * 0.31);
    spot_dummy.scale.set(size * (1.0 + (i % 3) * 0.25), size, 1);
    spot_dummy.updateMatrix();
    rust_spots.setMatrixAt(i, spot_dummy.matrix);
  }
  rust_spots.instanceMatrix.needsUpdate = true;
  tool_group.add(rust_spots);

  const handle_wear_spots = new THREE.InstancedMesh(rust_spotGeom, darkWoodMat, 18);
  for (let i = 0; i < 18; i++) {
    const localY = -0.22 - ((i * 29) % 100) / 100 * 0.62;
    const localX = (((i * 41) % 100) / 100 - 0.5) * 0.09;
    const angle = i % 2 === 0 ? 0.48 : -0.48;
    const baseX = i % 2 === 0 ? -0.035 : 0.035;
    const c = Math.cos(angle);
    const s = Math.sin(angle);
    const x = baseX + c * localX - s * localY;
    const y = s * localX + c * localY;
    const size = 0.005 + ((i * 13) % 5) * 0.0015;

    spot_dummy.position.set(x, y, 0.028);
    spot_dummy.rotation.set(0, 0, angle + i * 0.19);
    spot_dummy.scale.set(size * 1.7, size, 1);
    spot_dummy.updateMatrix();
    handle_wear_spots.setMatrixAt(i, spot_dummy.matrix);
  }
  handle_wear_spots.instanceMatrix.needsUpdate = true;
  tool_group.add(handle_wear_spots);

  const rivetGeom = new THREE.CylinderGeometry(0.017, 0.017, 0.012, 20);
  const left_handle_rivet = new THREE.Mesh(rivetGeom, brassMat);
  left_handle_rivet.rotation.x = Math.PI / 2;
  left_handle_rivet.position.set(-0.055, -0.43, 0.034);
  left_handle_rivet.rotation.z = 0.48;
  tool_group.add(left_handle_rivet);

  const right_handle_rivet = new THREE.Mesh(rivetGeom, brassMat);
  right_handle_rivet.rotation.x = Math.PI / 2;
  right_handle_rivet.position.set(0.055, -0.43, 0.034);
  right_handle_rivet.rotation.z = -0.48;
  tool_group.add(right_handle_rivet);

  const spring_points = [];
  for (let i = 0; i <= 10; i++) {
    const t = i / 10;
    spring_points.push(new THREE.Vector3(
      -0.035 + t * 0.07,
      -0.13 - t * 0.055 + Math.sin(t * Math.PI * 4) * 0.012,
      0.045
    ));
  }
  const spring_curve = new THREE.CatmullRomCurve3(spring_points);
  const spring_mesh = new THREE.Mesh(
    new THREE.TubeGeometry(spring_curve, 24, 0.006, 6, false),
    darkSteelMat
  );
  tool_group.add(spring_mesh);

  tool_group.rotation.z = -0.72;

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
