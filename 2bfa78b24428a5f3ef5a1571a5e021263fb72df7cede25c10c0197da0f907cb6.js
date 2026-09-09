function __sn17_user(THREE) {
  const root = new THREE.Group();

  const bronzeMat = new THREE.MeshStandardMaterial({
    color: 0x8b6a45,
    metalness: 0.7,
    roughness: 0.42
  });
  const edgeMat = new THREE.MeshStandardMaterial({
    color: 0xb08a55,
    metalness: 0.75,
    roughness: 0.32
  });
  const darkBronzeMat = new THREE.MeshStandardMaterial({
    color: 0x4a3424,
    metalness: 0.55,
    roughness: 0.65
  });
  const engravingMat = new THREE.MeshStandardMaterial({
    color: 0x2b2119,
    metalness: 0.35,
    roughness: 0.8
  });
  const patinaMat = new THREE.MeshStandardMaterial({
    color: 0x3d4035,
    metalness: 0.25,
    roughness: 0.9,
    transparent: true,
    opacity: 0.22,
    side: THREE.DoubleSide
  });

  const thickness = 0.055;
  const topY = thickness * 0.5 + 0.004;

  function roundedRectShape(width, length, radius) {
    const shape = new THREE.Shape();
    const hw = width * 0.5;
    const hl = length * 0.5;
    const r = Math.min(radius, hw, hl);
    shape.moveTo(-hw + r, -hl);
    shape.lineTo(hw - r, -hl);
    shape.quadraticCurveTo(hw, -hl, hw, -hl + r);
    shape.lineTo(hw, hl - r);
    shape.quadraticCurveTo(hw, hl, hw - r, hl);
    shape.lineTo(-hw + r, hl);
    shape.quadraticCurveTo(-hw, hl, -hw, hl - r);
    shape.lineTo(-hw, -hl + r);
    shape.quadraticCurveTo(-hw, -hl, -hw + r, -hl);
    shape.closePath();
    return shape;
  }

  function extrudedPlateGeometry(shape, depth) {
    const geom = new THREE.ExtrudeGeometry(shape, {
      depth: depth,
      steps: 1,
      curveSegments: 16,
      bevelEnabled: true,
      bevelThickness: 0.008,
      bevelSize: 0.009,
      bevelSegments: 3
    });
    geom.translate(0, 0, -depth * 0.5);
    geom.rotateX(Math.PI * 0.5);
    return geom;
  }

  const left_armShape = roundedRectShape(0.235, 1.48, 0.115);
  const left_armGeom = extrudedPlateGeometry(left_armShape, thickness);
  const left_arm = new THREE.Mesh(left_armGeom, bronzeMat);
  left_arm.position.set(-0.61, 0, 0);
  root.add(left_arm);

  const right_armShape = roundedRectShape(0.19, 1.22, 0.095);
  const right_armGeom = extrudedPlateGeometry(right_armShape, thickness);
  const right_arm = new THREE.Mesh(right_armGeom, bronzeMat);
  right_arm.position.set(0.58, 0, 0);
  root.add(right_arm);

  const central_bridgeShape = new THREE.Shape();
  central_bridgeShape.moveTo(-0.235, -0.22);
  central_bridgeShape.lineTo(0.235, -0.22);
  central_bridgeShape.bezierCurveTo(0.285, -0.18, 0.285, 0.18, 0.235, 0.22);
  central_bridgeShape.lineTo(-0.235, 0.22);
  central_bridgeShape.bezierCurveTo(-0.285, 0.18, -0.285, -0.18, -0.235, -0.22);
  central_bridgeShape.closePath();
  const central_bridgeGeom = extrudedPlateGeometry(central_bridgeShape, thickness * 1.08);
  const central_bridge = new THREE.Mesh(central_bridgeGeom, bronzeMat);
  central_bridge.position.set(0, 0.003, 0);
  root.add(central_bridge);

  const left_edge_highlightGeom = new THREE.BoxGeometry(0.012, 0.006, 1.22);
  const left_edge_highlight = new THREE.Mesh(left_edge_highlightGeom, edgeMat);
  left_edge_highlight.position.set(-0.718, topY, 0);
  root.add(left_edge_highlight);

  const right_edge_highlightGeom = new THREE.BoxGeometry(0.011, 0.006, 1.02);
  const right_edge_highlight = new THREE.Mesh(right_edge_highlightGeom, edgeMat);
  right_edge_highlight.position.set(0.682, topY, 0);
  root.add(right_edge_highlight);

  const inner_left_grooveGeom = new THREE.BoxGeometry(0.012, 0.004, 0.34);
  const inner_left_groove = new THREE.Mesh(inner_left_grooveGeom, darkBronzeMat);
  inner_left_groove.position.set(-0.245, topY + 0.001, 0);
  root.add(inner_left_groove);

  const inner_right_grooveGeom = new THREE.BoxGeometry(0.012, 0.004, 0.34);
  const inner_right_groove = new THREE.Mesh(inner_right_grooveGeom, darkBronzeMat);
  inner_right_groove.position.set(0.245, topY + 0.001, 0);
  root.add(inner_right_groove);

  const patina_spotsGeom = new THREE.CircleGeometry(0.035, 18);
  const patina_spots = new THREE.InstancedMesh(patina_spotsGeom, patinaMat, 18);
  const dummy = new THREE.Object3D();
  for (let i = 0; i < 18; i++) {
    const side = i % 2 === 0 ? -1 : 1;
    const t = ((i * 37) % 100) / 100;
    const z = side < 0 ? -0.62 + t * 1.24 : 0.18 + t * 0.92;
    const x = side * (0.57 + (((i * 11) % 5) - 2) * 0.018);
    const sx = 0.55 + ((i * 7) % 9) * 0.08;
    const sz = 0.35 + ((i * 5) % 7) * 0.07;
    dummy.position.set(x, topY + 0.002, z);
    dummy.rotation.set(-Math.PI * 0.5, 0, 0);
    dummy.scale.set(sx, sz, 1);
    dummy.updateMatrix();
    patina_spots.setMatrixAt(i, dummy.matrix);
  }
  root.add(patina_spots);

  const scratch_marksGeom = new THREE.BoxGeometry(0.004, 0.0025, 0.11);
  const scratch_marks = new THREE.InstancedMesh(scratch_marksGeom, darkBronzeMat, 26);
  for (let i = 0; i < 26; i++) {
    const side = i % 3 === 0 ? 1 : -1;
    const t = ((i * 29) % 100) / 100;
    const z = side < 0 ? -0.66 + t * 1.32 : 0.16 + t * 0.96;
    const x = side * (0.55 + (((i * 13) % 9) - 4) * 0.014);
    const lenScale = 0.35 + ((i * 17) % 8) * 0.08;
    dummy.position.set(x, topY + 0.003, z);
    dummy.rotation.set(0, (((i * 19) % 13) - 6) * 0.035, 0);
    dummy.scale.set(1, 1, lenScale);
    dummy.updateMatrix();
    scratch_marks.setMatrixAt(i, dummy.matrix);
  }
  root.add(scratch_marks);

  const engraving_group = new THREE.Group();
  root.add(engraving_group);

  function addEngravedStroke(cx, cz, length, angle, radius) {
    const geom = new THREE.CylinderGeometry(radius, radius, length, 8);
    const stroke = new THREE.Mesh(geom, engravingMat);
    stroke.position.set(cx, topY + 0.006, cz);
    stroke.rotation.y = angle;
    engraving_group.add(stroke);
    return stroke;
  }

  function addLetterR(cx, cz, w, h) {
    addEngravedStroke(cx - w * 0.5, cz, h, 0, 0.006);
    addEngravedStroke(cx, cz - h * 0.5, w, Math.PI * 0.5, 0.006);
    addEngravedStroke(cx, cz, w * 0.75, Math.PI * 0.5, 0.006);
    addEngravedStroke(cx + w * 0.5, cz - h * 0.25, h * 0.5, 0, 0.006);
    addEngravedStroke(cx + w * 0.28, cz + h * 0.25, h * 0.55, -0.72, 0.006);
  }

  function addLetterO(cx, cz, w, h) {
    addEngravedStroke(cx - w * 0.5, cz, h, 0, 0.006);
    addEngravedStroke(cx + w * 0.5, cz, h, 0, 0.006);
    addEngravedStroke(cx, cz - h * 0.5, w, Math.PI * 0.5, 0.006);
    addEngravedStroke(cx, cz + h * 0.5, w, Math.PI * 0.5, 0.006);
  }

  function addLetterM(cx, cz, w, h) {
    addEngravedStroke(cx - w * 0.5, cz, h, 0, 0.006);
    addEngravedStroke(cx + w * 0.5, cz, h, 0, 0.006);
    addEngravedStroke(cx - w * 0.25, cz - h * 0.24, h * 0.58, -0.55, 0.006);
    addEngravedStroke(cx + w * 0.25, cz - h * 0.24, h * 0.58, 0.55, 0.006);
  }

  function addLetterA(cx, cz, w, h) {
    addEngravedStroke(cx - w * 0.28, cz, h * 1.05, -0.25, 0.006);
    addEngravedStroke(cx + w * 0.28, cz, h * 1.05, 0.25, 0.006);
    addEngravedStroke(cx, cz + h * 0.08, w * 0.62, Math.PI * 0.5, 0.006);
  }

  function addLetterN(cx, cz, w, h) {
    addEngravedStroke(cx - w * 0.5, cz, h, 0, 0.006);
    addEngravedStroke(cx + w * 0.5, cz, h, 0, 0.006);
    addEngravedStroke(cx, cz, h * 1.18, -0.55, 0.006);
  }

  const letterW = 0.065;
  const letterH = 0.105;
  const letterGap = 0.025;
  const wordStart = -0.25;
  addLetterR(wordStart, 0.10, letterW, letterH);
  addLetterO(wordStart + letterW + letterGap, 0.10, letterW, letterH);
  addLetterM(wordStart + (letterW + letterGap) * 2, 0.10, letterW, letterH);
  addLetterA(wordStart + (letterW + letterGap) * 3, 0.10, letterW, letterH);
  addLetterN(wordStart + (letterW + letterGap) * 4, 0.10, letterW, letterH);

  const maker_mark_lineGeom = new THREE.BoxGeometry(0.16, 0.003, 0.006);
  const maker_mark_line = new THREE.Mesh(maker_mark_lineGeom, engravingMat);
  maker_mark_line.position.set(-0.31, topY + 0.005, 0.235);
  root.add(maker_mark_line);

  fitToUnitCube(THREE, root);
  return root;
}

function fitToUnitCube(THREE, root) {
  const box = new THREE.Box3().setFromObject(root);
  const size = new THREE.Vector3();
  box.getSize(size);
  const ctr = new THREE.Vector3();
  box.getCenter(ctr);
  root.position.sub(ctr);
  const m = Math.max(size.x, size.y, size.z);
  if (m > 0) root.scale.setScalar(0.98 / m);
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
