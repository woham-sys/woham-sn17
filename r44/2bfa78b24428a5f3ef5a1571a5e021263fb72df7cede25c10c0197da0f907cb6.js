// miner-diag: gpus=? tflops=? stream48=? power=? probe_tps=3831 cpu_quota=?/? net=? batch=1 wall=1609 seed=870128282
export default function generate(THREE) {
  const root = new THREE.Group();

  const bronzeMat = new THREE.MeshStandardMaterial({
    color: 0x8a5a32,
    metalness: 0.6,
    roughness: 0.5,
  });
  const topMat = new THREE.MeshStandardMaterial({
    color: 0x765039,
    metalness: 0.6,
    roughness: 0.5,
  });
  const edgeMat = new THREE.MeshStandardMaterial({
    color: 0xb87333,
    metalness: 0.6,
    roughness: 0.35,
  });
  const engravingMat = new THREE.MeshStandardMaterial({
    color: 0x3b291f,
    metalness: 0.3,
    roughness: 0.75,
  });
  const patinaMat = new THREE.MeshStandardMaterial({
    color: 0x354039,
    metalness: 0.2,
    roughness: 0.9,
    transparent: true,
    opacity: 0.28,
    side: THREE.DoubleSide,
  });
  const wearMat = new THREE.MeshStandardMaterial({
    color: 0xc08a4b,
    metalness: 0.5,
    roughness: 0.55,
    transparent: true,
    opacity: 0.38,
    side: THREE.DoubleSide,
  });

  const thickness = 0.14;
  const bevelThickness = 0.025;
  const topY = thickness * 0.5 + bevelThickness + 0.004;

  function makeRoundedRectShape(x0, x1, halfWidth) {
    const r = halfWidth;
    const shape = new THREE.Shape();
    shape.moveTo(x0 + r, -halfWidth);
    shape.lineTo(x1 - r, -halfWidth);
    shape.quadraticCurveTo(x1, -halfWidth, x1, 0);
    shape.quadraticCurveTo(x1, halfWidth, x1 - r, halfWidth);
    shape.lineTo(x0 + r, halfWidth);
    shape.quadraticCurveTo(x0, halfWidth, x0, 0);
    shape.quadraticCurveTo(x0, -halfWidth, x0 + r, -halfWidth);
    shape.closePath();
    return shape;
  }

  const left_paddleShape = makeRoundedRectShape(-2.75, 0.42, 0.48);
  const left_paddleGeom = new THREE.ExtrudeGeometry(left_paddleShape, {
    depth: thickness,
    steps: 1,
    bevelEnabled: true,
    bevelThickness,
    bevelSize: 0.035,
    bevelSegments: 3,
    curveSegments: 16,
  });
  const left_paddle = new THREE.Mesh(left_paddleGeom, bronzeMat);
  left_paddle.rotation.x = -Math.PI / 2;
  left_paddle.position.y = -thickness * 0.5;
  root.add(left_paddle);

  const left_top_faceShape = makeRoundedRectShape(-2.69, 0.36, 0.425);
  const left_top_faceGeom = new THREE.ShapeGeometry(left_top_faceShape, 16);
  const left_top_face = new THREE.Mesh(left_top_faceGeom, topMat);
  left_top_face.rotation.x = -Math.PI / 2;
  left_top_face.position.y = topY - 0.003;
  root.add(left_top_face);

  const right_handleShape = makeRoundedRectShape(-0.34, 2.75, 0.31);
  const right_handleGeom = new THREE.ExtrudeGeometry(right_handleShape, {
    depth: thickness,
    steps: 1,
    bevelEnabled: true,
    bevelThickness,
    bevelSize: 0.03,
    bevelSegments: 3,
    curveSegments: 16,
  });
  const right_handle = new THREE.Mesh(right_handleGeom, bronzeMat);
  right_handle.rotation.x = -Math.PI / 2;
  right_handle.position.y = -thickness * 0.5;
  root.add(right_handle);

  const right_top_faceShape = makeRoundedRectShape(-0.28, 2.69, 0.255);
  const right_top_faceGeom = new THREE.ShapeGeometry(right_top_faceShape, 16);
  const right_top_face = new THREE.Mesh(right_top_faceGeom, topMat);
  right_top_face.rotation.x = -Math.PI / 2;
  right_top_face.position.y = topY - 0.003;
  root.add(right_top_face);

  const center_jointGeom = new THREE.CylinderGeometry(0.43, 0.43, 0.18, 32);
  const center_joint = new THREE.Mesh(center_jointGeom, bronzeMat);
  center_joint.scale.set(0.34, 1, 1);
  center_joint.position.set(0.02, 0, 0);
  root.add(center_joint);

  const center_joint_topGeom = new THREE.CylinderGeometry(0.37, 0.37, 0.012, 32);
  const center_joint_top = new THREE.Mesh(center_joint_topGeom, topMat);
  center_joint_top.scale.set(0.34, 1, 1);
  center_joint_top.position.set(0.02, topY - 0.002, 0);
  root.add(center_joint_top);

  const left_edge_points = [
    new THREE.Vector3(-2.28, topY + 0.002, -0.455),
    new THREE.Vector3(-1.15, topY + 0.002, -0.455),
    new THREE.Vector3(0.02, topY + 0.002, -0.455),
    new THREE.Vector3(0.22, topY + 0.002, -0.39),
    new THREE.Vector3(0.31, topY + 0.002, -0.22),
    new THREE.Vector3(0.31, topY + 0.002, 0),
    new THREE.Vector3(0.31, topY + 0.002, 0.22),
    new THREE.Vector3(0.22, topY + 0.002, 0.39),
    new THREE.Vector3(0.02, topY + 0.002, 0.455),
    new THREE.Vector3(-1.15, topY + 0.002, 0.455),
    new THREE.Vector3(-2.28, topY + 0.002, 0.455),
  ];
  const left_edge_curve = new THREE.CatmullRomCurve3(left_edge_points, false, "centripetal");
  const left_edge_highlightGeom = new THREE.TubeGeometry(left_edge_curve, 48, 0.011, 6, false);
  const left_edge_highlight = new THREE.Mesh(left_edge_highlightGeom, edgeMat);
  root.add(left_edge_highlight);

  const right_edge_points = [
    new THREE.Vector3(0.18, topY + 0.002, -0.285),
    new THREE.Vector3(0.9, topY + 0.002, -0.285),
    new THREE.Vector3(2.25, topY + 0.002, -0.285),
    new THREE.Vector3(2.48, topY + 0.002, -0.24),
    new THREE.Vector3(2.61, topY + 0.002, -0.13),
    new THREE.Vector3(2.66, topY + 0.002, 0),
    new THREE.Vector3(2.61, topY + 0.002, 0.13),
    new THREE.Vector3(2.48, topY + 0.002, 0.24),
    new THREE.Vector3(2.25, topY + 0.002, 0.285),
    new THREE.Vector3(0.9, topY + 0.002, 0.285),
    new THREE.Vector3(0.18, topY + 0.002, 0.285),
  ];
  const right_edge_curve = new THREE.CatmullRomCurve3(right_edge_points, false, "centripetal");
  const right_edge_highlightGeom = new THREE.TubeGeometry(right_edge_curve, 48, 0.01, 6, false);
  const right_edge_highlight = new THREE.Mesh(right_edge_highlightGeom, edgeMat);
  root.add(right_edge_highlight);

  const left_end_edge_curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-2.28, topY + 0.002, -0.455),
    new THREE.Vector3(-2.52, topY + 0.002, -0.43),
    new THREE.Vector3(-2.69, topY + 0.002, -0.28),
    new THREE.Vector3(-2.75, topY + 0.002, 0),
    new THREE.Vector3(-2.69, topY + 0.002, 0.28),
    new THREE.Vector3(-2.52, topY + 0.002, 0.43),
    new THREE.Vector3(-2.28, topY + 0.002, 0.455),
  ], false, "centripetal");
  const left_end_edgeGeom = new THREE.TubeGeometry(left_end_edge_curve, 24, 0.012, 6, false);
  const left_end_edge = new THREE.Mesh(left_end_edgeGeom, edgeMat);
  root.add(left_end_edge);

  const right_end_edge_curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(2.25, topY + 0.002, -0.285),
    new THREE.Vector3(2.48, topY + 0.002, -0.24),
    new THREE.Vector3(2.61, topY + 0.002, -0.13),
    new THREE.Vector3(2.66, topY + 0.002, 0),
    new THREE.Vector3(2.61, topY + 0.002, 0.13),
    new THREE.Vector3(2.48, topY + 0.002, 0.24),
    new THREE.Vector3(2.25, topY + 0.002, 0.285),
  ], false, "centripetal");
  const right_end_edgeGeom = new THREE.TubeGeometry(right_end_edge_curve, 24, 0.011, 6, false);
  const right_end_edge = new THREE.Mesh(right_end_edgeGeom, edgeMat);
  root.add(right_end_edge);

  const patina_spotGeom = new THREE.CircleGeometry(0.08, 18);
  const patina_data = [
    [-2.35, -0.18, 1.6, 0.55, 0.2],
    [-1.92, 0.22, 1.0, 0.42, -0.5],
    [-1.48, -0.25, 1.8, 0.45, 0.7],
    [-1.02, 0.18, 1.2, 0.5, -0.2],
    [-0.55, -0.22, 1.5, 0.42, 0.4],
    [0.52, -0.12, 1.8, 0.45, -0.4],
    [1.05, 0.13, 1.2, 0.5, 0.3],
    [1.52, -0.14, 1.6, 0.4, -0.6],
    [1.98, 0.12, 1.3, 0.48, 0.5],
    [2.35, -0.08, 1.0, 0.42, -0.1],
  ];
  const patina_spots = new THREE.InstancedMesh(patina_spotGeom, patinaMat, patina_data.length);
  const patina_dummy = new THREE.Object3D();
  for (let i = 0; i < patina_data.length; i++) {
    const p = patina_data[i];
    patina_dummy.position.set(p[0], topY + 0.001, p[1]);
    patina_dummy.rotation.set(-Math.PI / 2, 0, p[4]);
    patina_dummy.scale.set(p[2], p[3], 1);
    patina_dummy.updateMatrix();
    patina_spots.setMatrixAt(i, patina_dummy.matrix);
  }
  patina_spots.instanceMatrix.needsUpdate = true;
  root.add(patina_spots);

  const wear_spotGeom = new THREE.CircleGeometry(0.055, 14);
  const wear_data = [
    [-2.48, 0.12, 1.2, 0.35],
    [-2.05, -0.31, 0.8, 0.28],
    [-1.68, 0.31, 1.1, 0.3],
    [-1.22, -0.12, 0.7, 0.25],
    [-0.78, 0.28, 1.0, 0.28],
    [0.62, 0.2, 0.8, 0.25],
    [1.18, -0.2, 1.1, 0.28],
    [1.72, 0.19, 0.75, 0.24],
    [2.18, -0.18, 1.0, 0.27],
    [2.48, 0.08, 0.7, 0.22],
  ];
  const wear_spots = new THREE.InstancedMesh(wear_spotGeom, wearMat, wear_data.length);
  const wear_dummy = new THREE.Object3D();
  for (let i = 0; i < wear_data.length; i++) {
    const p = wear_data[i];
    wear_dummy.position.set(p[0], topY + 0.002, p[1]);
    wear_dummy.rotation.set(-Math.PI / 2, 0, i * 0.47);
    wear_dummy.scale.set(p[2], p[3], 1);
    wear_dummy.updateMatrix();
    wear_spots.setMatrixAt(i, wear_dummy.matrix);
  }
  wear_spots.instanceMatrix.needsUpdate = true;
  root.add(wear_spots);

  const scratchGeom = new THREE.BoxGeometry(0.22, 0.004, 0.008);
  const scratch_data = [
    [-2.35, -0.05, 0.15, 1.0],
    [-1.95, 0.28, -0.25, 0.7],
    [-1.55, -0.3, 0.35, 0.8],
    [-1.12, 0.08, -0.18, 1.1],
    [-0.72, -0.27, 0.22, 0.75],
    [0.58, 0.16, -0.3, 0.8],
    [1.02, -0.18, 0.18, 1.0],
    [1.48, 0.2, -0.12, 0.7],
    [1.92, -0.19, 0.28, 0.9],
    [2.3, 0.17, -0.2, 0.75],
  ];
  const surface_scratches = new THREE.InstancedMesh(scratchGeom, engravingMat, scratch_data.length);
  const scratch_dummy = new THREE.Object3D();
  for (let i = 0; i < scratch_data.length; i++) {
    const p = scratch_data[i];
    scratch_dummy.position.set(p[0], topY + 0.003, p[1]);
    scratch_dummy.rotation.set(0, p[2], 0);
    scratch_dummy.scale.set(p[3], 1, 1);
    scratch_dummy.updateMatrix();
    surface_scratches.setMatrixAt(i, scratch_dummy.matrix);
  }
  surface_scratches.instanceMatrix.needsUpdate = true;
  root.add(surface_scratches);

  const engraving_segments = [];
  const letter_height = 0.22;
  const letter_width = 0.13;

  function addStroke(x0, z0, x1, z1) {
    engraving_segments.push([x0, z0, x1, z1]);
  }

  function addLetterR(cx) {
    const xL = cx - letter_width * 0.5;
    const xR = cx + letter_width * 0.5;
    const zT = -letter_height * 0.5;
    const zB = letter_height * 0.5;
    addStroke(xL, zT, xL, zB);
    addStroke(xL, zT, cx, zT);
    addStroke(cx, zT, xR, -letter_height * 0.12);
    addStroke(xR, -letter_height * 0.12, cx, 0);
    addStroke(cx, 0, xR, zB);
  }

  function addLetterO(cx) {
    const xL = cx - letter_width * 0.5;
    const xR = cx + letter_width * 0.5;
    const zT = -letter_height * 0.5;
    const zB = letter_height * 0.5;
    addStroke(xL, zT, xL, zB);
    addStroke(xL, zT, xR, zT);
    addStroke(xR, zT, xR, zB);
    addStroke(xR, zB, xL, zB);
  }

  function addLetterM(cx) {
    const xL = cx - letter_width * 0.5;
    const xR = cx + letter_width * 0.5;
    const zT = -letter_height * 0.5;
    const zB = letter_height * 0.5;
    addStroke(xL, zB, xL, zT);
    addStroke(xL, zT, cx, -0.02);
    addStroke(cx, -0.02, xR, zT);
    addStroke(xR, zT, xR, zB);
  }

  function addLetterA(cx) {
    const xL = cx - letter_width * 0.5;
    const xR = cx + letter_width * 0.5;
    const zT = -letter_height * 0.5;
    const zB = letter_height * 0.5;
    addStroke(xL, zB, cx, zT);
    addStroke(cx, zT, xR, zB);
    addStroke(cx - letter_width * 0.28, 0.03, cx + letter_width * 0.28, 0.03);
  }

  function addLetterI(cx) {
    const xL = cx - letter_width * 0.42;
    const xR = cx + letter_width * 0.42;
    const zT = -letter_height * 0.5;
    const zB = letter_height * 0.5;
    addStroke(xL, zT, xR, zT);
    addStroke(cx, zT, cx, zB);
    addStroke(xL, zB, xR, zB);
  }

  function addLetterN(cx) {
    const xL = cx - letter_width * 0.5;
    const xR = cx + letter_width * 0.5;
    const zT = -letter_height * 0.5;
    const zB = letter_height * 0.5;
    addStroke(xL, zB, xL, zT);
    addStroke(xL, zT, xR, zB);
    addStroke(xR, zB, xR, zT);
  }

  const letter_step = 0.225;
  const word_start = -0.52;
  addLetterR(word_start);
  addLetterO(word_start + letter_step);
  addLetterM(word_start + letter_step * 2);
  addLetterA(word_start + letter_step * 3);
  addLetterI(word_start + letter_step * 4);
  addLetterN(word_start + letter_step * 5);

  const engraved_wordGeom = new THREE.BoxGeometry(1, 0.008, 0.018);
  const engraved_word = new THREE.InstancedMesh(engraved_wordGeom, engravingMat, engraving_segments.length);
  const engraving_dummy = new THREE.Object3D();
  for (let i = 0; i < engraving_segments.length; i++) {
    const s = engraving_segments[i];
    const dx = s[2] - s[0];
    const dz = s[3] - s[1];
    const length = Math.sqrt(dx * dx + dz * dz);
    engraving_dummy.position.set((s[0] + s[2]) * 0.5, topY + 0.006, (s[1] + s[3]) * 0.5);
    engraving_dummy.rotation.set(0, -Math.atan2(dz, dx), 0);
    engraving_dummy.scale.set(length, 1, 1);
    engraving_dummy.updateMatrix();
    engraved_word.setMatrixAt(i, engraving_dummy.matrix);
  }
  engraved_word.instanceMatrix.needsUpdate = true;
  root.add(engraved_word);

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