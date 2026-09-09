function __sn17_user(THREE) {
  const root = new THREE.Group();
  const knife = new THREE.Group();
  root.add(knife);

  const bladeMat = new THREE.MeshStandardMaterial({
    color: 0x8a7345,
    metalness: 0.55,
    roughness: 0.48
  });
  const bladeDarkMat = new THREE.MeshStandardMaterial({
    color: 0x4b402d,
    metalness: 0.45,
    roughness: 0.62
  });
  const bladeLightMat = new THREE.MeshStandardMaterial({
    color: 0xb09a5a,
    metalness: 0.5,
    roughness: 0.42
  });
  const brassMat = new THREE.MeshStandardMaterial({
    color: 0x9b7a38,
    metalness: 0.55,
    roughness: 0.45
  });
  const darkBrassMat = new THREE.MeshStandardMaterial({
    color: 0x594724,
    metalness: 0.45,
    roughness: 0.58
  });
  const woodMat = new THREE.MeshStandardMaterial({
    color: 0x7a4326,
    metalness: 0.15,
    roughness: 0.55
  });
  const darkWoodMat = new THREE.MeshStandardMaterial({
    color: 0x3b2118,
    metalness: 0.15,
    roughness: 0.65
  });
  const patinaMat = new THREE.MeshStandardMaterial({
    color: 0x3f3a2c,
    metalness: 0.25,
    roughness: 0.8,
    side: THREE.DoubleSide
  });

  const bladeShape = new THREE.Shape();
  bladeShape.moveTo(-0.145, -0.02);
  bladeShape.lineTo(-0.135, -0.92);
  bladeShape.quadraticCurveTo(-0.125, -1.18, -0.035, -1.31);
  bladeShape.quadraticCurveTo(0.015, -1.34, 0.055, -1.285);
  bladeShape.quadraticCurveTo(0.125, -1.15, 0.135, -0.92);
  bladeShape.lineTo(0.145, -0.02);
  bladeShape.closePath();

  const bladeGeom = new THREE.ExtrudeGeometry(bladeShape, {
    depth: 0.035,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.008,
    bevelSize: 0.008,
    bevelSegments: 3
  });
  bladeGeom.translate(0, 0, -0.0175);
  const blade = new THREE.Mesh(bladeGeom, bladeMat);
  knife.add(blade);

  const centralGrooveShape = new THREE.Shape();
  centralGrooveShape.moveTo(-0.018, -0.08);
  centralGrooveShape.lineTo(-0.014, -1.02);
  centralGrooveShape.quadraticCurveTo(-0.012, -1.15, 0, -1.225);
  centralGrooveShape.quadraticCurveTo(0.012, -1.15, 0.014, -1.02);
  centralGrooveShape.lineTo(0.018, -0.08);
  centralGrooveShape.closePath();

  const central_groove_geom = new THREE.ShapeGeometry(centralGrooveShape);
  const central_groove = new THREE.Mesh(central_groove_geom, bladeDarkMat);
  central_groove.position.z = 0.021;
  knife.add(central_groove);

  const left_ridge_curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.026, -0.08, 0.025),
    new THREE.Vector3(-0.024, -0.55, 0.025),
    new THREE.Vector3(-0.018, -1.05, 0.025),
    new THREE.Vector3(-0.004, -1.205, 0.025)
  ]);
  const left_ridge_geom = new THREE.TubeGeometry(left_ridge_curve, 32, 0.0045, 8, false);
  const left_ridge = new THREE.Mesh(left_ridge_geom, bladeLightMat);
  knife.add(left_ridge);

  const right_ridge_curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.026, -0.08, 0.025),
    new THREE.Vector3(0.024, -0.55, 0.025),
    new THREE.Vector3(0.018, -1.05, 0.025),
    new THREE.Vector3(0.004, -1.205, 0.025)
  ]);
  const right_ridge_geom = new THREE.TubeGeometry(right_ridge_curve, 32, 0.0045, 8, false);
  const right_ridge = new THREE.Mesh(right_ridge_geom, bladeLightMat);
  knife.add(right_ridge);

  const guardShape = new THREE.Shape();
  guardShape.moveTo(-0.235, 0.015);
  guardShape.quadraticCurveTo(-0.245, 0.065, -0.19, 0.082);
  guardShape.lineTo(0.19, 0.082);
  guardShape.quadraticCurveTo(0.245, 0.065, 0.235, 0.015);
  guardShape.quadraticCurveTo(0.225, -0.025, 0.17, -0.032);
  guardShape.lineTo(-0.17, -0.032);
  guardShape.quadraticCurveTo(-0.225, -0.025, -0.235, 0.015);
  guardShape.closePath();

  const guard_geom = new THREE.ExtrudeGeometry(guardShape, {
    depth: 0.07,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.008,
    bevelSize: 0.008,
    bevelSegments: 3
  });
  guard_geom.translate(0, 0, -0.035);
  const guard = new THREE.Mesh(guard_geom, brassMat);
  knife.add(guard);

  const guard_inscription_geom = new THREE.BoxGeometry(0.012, 0.038, 0.006);
  const guard_inscription_marks = new THREE.InstancedMesh(guard_inscription_geom, darkBrassMat, 9);
  const inscriptionDummy = new THREE.Object3D();
  for (let i = 0; i < 9; i++) {
    inscriptionDummy.position.set(-0.115 + i * 0.029, 0.035, 0.047);
    inscriptionDummy.rotation.set(0, 0, (i % 3 - 1) * 0.12);
    inscriptionDummy.updateMatrix();
    guard_inscription_marks.setMatrixAt(i, inscriptionDummy.matrix);
  }
  knife.add(guard_inscription_marks);

  const handleProfile = [
    new THREE.Vector2(0, 0.065),
    new THREE.Vector2(0.082, 0.065),
    new THREE.Vector2(0.096, 0.11),
    new THREE.Vector2(0.094, 0.22),
    new THREE.Vector2(0.087, 0.42),
    new THREE.Vector2(0.078, 0.62),
    new THREE.Vector2(0.084, 0.70),
    new THREE.Vector2(0.101, 0.755),
    new THREE.Vector2(0.125, 0.80),
    new THREE.Vector2(0.132, 0.865),
    new THREE.Vector2(0.118, 0.925),
    new THREE.Vector2(0.075, 0.975),
    new THREE.Vector2(0, 0.99)
  ];
  const handle_geom = new THREE.LatheGeometry(handleProfile, 64);
  const handle = new THREE.Mesh(handle_geom, woodMat);
  knife.add(handle);

  const grip_ring_geom = new THREE.TorusGeometry(0.086, 0.006, 8, 48);
  const grip_rings = new THREE.InstancedMesh(grip_ring_geom, darkWoodMat, 7);
  const ringDummy = new THREE.Object3D();
  for (let i = 0; i < 7; i++) {
    const t = i / 6;
    const y = 0.16 + t * 0.47;
    const r = 0.094 - t * 0.014;
    ringDummy.position.set(0, y, 0);
    ringDummy.rotation.set(Math.PI / 2, 0, 0);
    ringDummy.scale.set(r / 0.086, r / 0.086, 1);
    ringDummy.updateMatrix();
    grip_rings.setMatrixAt(i, ringDummy.matrix);
  }
  knife.add(grip_rings);

  const lower_wood_collar_geom = new THREE.TorusGeometry(0.096, 0.008, 10, 48);
  const lower_wood_collar = new THREE.Mesh(lower_wood_collar_geom, darkWoodMat);
  lower_wood_collar.rotation.x = Math.PI / 2;
  lower_wood_collar.position.y = 0.105;
  knife.add(lower_wood_collar);

  const upper_brass_band_geom = new THREE.CylinderGeometry(0.09, 0.086, 0.045, 48);
  const upper_brass_band = new THREE.Mesh(upper_brass_band_geom, brassMat);
  upper_brass_band.position.y = 0.705;
  knife.add(upper_brass_band);

  const upper_dark_band_geom = new THREE.TorusGeometry(0.087, 0.006, 8, 48);
  const upper_dark_band = new THREE.Mesh(upper_dark_band_geom, darkBrassMat);
  upper_dark_band.rotation.x = Math.PI / 2;
  upper_dark_band.position.y = 0.73;
  knife.add(upper_dark_band);

  const pommel_lower_band_geom = new THREE.TorusGeometry(0.105, 0.008, 10, 48);
  const pommel_lower_band = new THREE.Mesh(pommel_lower_band_geom, darkBrassMat);
  pommel_lower_band.rotation.x = Math.PI / 2;
  pommel_lower_band.position.y = 0.785;
  knife.add(pommel_lower_band);

  const wood_grain_line_geom = new THREE.BoxGeometry(0.006, 0.34, 0.003);
  const wood_grain_lines = new THREE.InstancedMesh(wood_grain_line_geom, darkWoodMat, 8);
  const grainDummy = new THREE.Object3D();
  for (let i = 0; i < 8; i++) {
    const angle = i / 8 * Math.PI * 2 + 0.18;
    const radius = 0.089;
    grainDummy.position.set(Math.cos(angle) * radius, 0.405, Math.sin(angle) * radius);
    grainDummy.rotation.set(0, Math.PI / 2 - angle, 0);
    grainDummy.scale.set(1, 0.85 + (i % 3) * 0.08, 1);
    grainDummy.updateMatrix();
    wood_grain_lines.setMatrixAt(i, grainDummy.matrix);
  }
  knife.add(wood_grain_lines);

  const emblem_group = new THREE.Group();
  emblem_group.position.set(0, -0.075, 0.027);
  knife.add(emblem_group);

  const emblemDiamondShape = new THREE.Shape();
  emblemDiamondShape.moveTo(0, 0.075);
  emblemDiamondShape.lineTo(0.055, 0);
  emblemDiamondShape.lineTo(0, -0.075);
  emblemDiamondShape.lineTo(-0.055, 0);
  emblemDiamondShape.closePath();

  const emblem_diamond_geom = new THREE.ShapeGeometry(emblemDiamondShape);
  const emblem_diamond = new THREE.Mesh(emblem_diamond_geom, bladeDarkMat);
  emblem_group.add(emblem_diamond);

  const emblem_stem_curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, -0.045, 0.004),
    new THREE.Vector3(-0.004, -0.005, 0.004),
    new THREE.Vector3(0.006, 0.045, 0.004)
  ]);
  const emblem_stem_geom = new THREE.TubeGeometry(emblem_stem_curve, 16, 0.0035, 6, false);
  const emblem_stem = new THREE.Mesh(emblem_stem_geom, bladeLightMat);
  emblem_group.add(emblem_stem);

  const emblem_left_leaf_curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.002, 0.012, 0.004),
    new THREE.Vector3(-0.025, 0.03, 0.004),
    new THREE.Vector3(-0.04, 0.018, 0.004)
  ]);
  const emblem_left_leaf_geom = new THREE.TubeGeometry(emblem_left_leaf_curve, 12, 0.003, 6, false);
  const emblem_left_leaf = new THREE.Mesh(emblem_left_leaf_geom, bladeLightMat);
  emblem_group.add(emblem_left_leaf);

  const emblem_right_leaf_curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.002, 0.026, 0.004),
    new THREE.Vector3(0.028, 0.044, 0.004),
    new THREE.Vector3(0.042, 0.028, 0.004)
  ]);
  const emblem_right_leaf_geom = new THREE.TubeGeometry(emblem_right_leaf_curve, 12, 0.003, 6, false);
  const emblem_right_leaf = new THREE.Mesh(emblem_right_leaf_geom, bladeLightMat);
  emblem_group.add(emblem_right_leaf);

  const patina_spot_geom = new THREE.CircleGeometry(0.012, 12);
  const patina_spots = new THREE.InstancedMesh(patina_spot_geom, patinaMat, 14);
  const spotData = [
    [-0.075, -0.18, 1.4, 0.55, 0.2],
    [0.068, -0.27, 0.75, 1.25, -0.4],
    [-0.092, -0.43, 1.1, 0.45, 0.7],
    [0.085, -0.52, 0.65, 0.85, 0.1],
    [-0.055, -0.66, 1.5, 0.38, -0.2],
    [0.095, -0.74, 0.8, 0.45, 0.5],
    [-0.07, -0.88, 0.55, 1.1, 0.8],
    [0.055, -1.02, 1.25, 0.35, -0.5],
    [-0.025, -1.13, 0.7, 0.55, 0.25],
    [0.105, -0.35, 0.45, 0.75, -0.1],
    [-0.105, -0.58, 0.5, 0.5, 0.4],
    [0.035, -0.92, 0.45, 0.9, -0.7],
    [-0.04, -0.33, 0.8, 0.35, 0.15],
    [0.075, -0.14, 0.55, 0.45, -0.35]
  ];
  const spotDummy = new THREE.Object3D();
  for (let i = 0; i < spotData.length; i++) {
    const d = spotData[i];
    spotDummy.position.set(d[0], d[1], 0.024);
    spotDummy.rotation.set(0, 0, d[4]);
    spotDummy.scale.set(d[2], d[3], 1);
    spotDummy.updateMatrix();
    patina_spots.setMatrixAt(i, spotDummy.matrix);
  }
  knife.add(patina_spots);

  const scratch_line_geom = new THREE.BoxGeometry(0.004, 0.075, 0.002);
  const scratch_lines = new THREE.InstancedMesh(scratch_line_geom, patinaMat, 8);
  const scratchData = [
    [-0.08, -0.31, 0.35, 0.8],
    [0.075, -0.47, -0.25, 0.55],
    [-0.06, -0.72, 0.5, 0.7],
    [0.09, -0.86, -0.45, 0.45],
    [-0.035, -1.04, 0.2, 0.6],
    [0.045, -0.2, -0.6, 0.35],
    [-0.105, -0.55, 0.7, 0.3],
    [0.015, -1.17, -0.15, 0.4]
  ];
  const scratchDummy = new THREE.Object3D();
  for (let i = 0; i < scratchData.length; i++) {
    const d = scratchData[i];
    scratchDummy.position.set(d[0], d[1], 0.026);
    scratchDummy.rotation.set(0, 0, d[2]);
    scratchDummy.scale.set(1, d[3], 1);
    scratchDummy.updateMatrix();
    scratch_lines.setMatrixAt(i, scratchDummy.matrix);
  }
  knife.add(scratch_lines);

  knife.rotation.z = -0.72;

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
