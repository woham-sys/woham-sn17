function __sn17_user(THREE) {
  const root = new THREE.Group();
  root.name = "aged_cracked_mirror";

  const frame_group = new THREE.Group();
  frame_group.name = "frame_group";
  root.add(frame_group);

  const artwork_group = new THREE.Group();
  artwork_group.name = "artwork_group";
  root.add(artwork_group);

  const stand_group = new THREE.Group();
  stand_group.name = "stand_group";
  root.add(stand_group);

  const outerW = 1.0;
  const outerH = 1.32;
  const innerW = 0.66;
  const innerH = 0.96;

  const silverMat = new THREE.MeshStandardMaterial({
    color: 0xaeb3b2,
    metalness: 0.55,
    roughness: 0.38
  });
  const brightSilverMat = new THREE.MeshStandardMaterial({
    color: 0xd2d4d1,
    metalness: 0.6,
    roughness: 0.28
  });
  const darkMetalMat = new THREE.MeshStandardMaterial({
    color: 0x555b5b,
    metalness: 0.5,
    roughness: 0.5
  });
  const rustMat = new THREE.MeshStandardMaterial({
    color: 0x6b3f2b,
    metalness: 0.1,
    roughness: 0.9,
    side: THREE.DoubleSide
  });
  const patinaMat = new THREE.MeshStandardMaterial({
    color: 0x58706c,
    metalness: 0.2,
    roughness: 0.75,
    side: THREE.DoubleSide
  });
  const backingMat = new THREE.MeshStandardMaterial({
    color: 0x202727,
    metalness: 0.1,
    roughness: 0.8
  });
  const panelMat = new THREE.MeshStandardMaterial({
    color: 0x10262b,
    metalness: 0.0,
    roughness: 0.55
  });
  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0x9fd8d2,
    transparent: true,
    opacity: 0.22,
    roughness: 0.15,
    depthWrite: false
  });
  const glowOuterMat = new THREE.MeshBasicMaterial({
    color: 0x2aa8a5,
    transparent: true,
    opacity: 0.07,
    depthWrite: false,
    side: THREE.DoubleSide
  });
  const glowMiddleMat = new THREE.MeshBasicMaterial({
    color: 0x58c9c3,
    transparent: true,
    opacity: 0.11,
    depthWrite: false,
    side: THREE.DoubleSide
  });
  const glowCoreMat = new THREE.MeshBasicMaterial({
    color: 0x91ffff,
    transparent: true,
    opacity: 0.16,
    depthWrite: false,
    side: THREE.DoubleSide
  });
  const crackGlowMat = new THREE.MeshBasicMaterial({
    color: 0x62e7df,
    transparent: true,
    opacity: 0.55,
    depthWrite: false
  });
  const crackMat = new THREE.MeshBasicMaterial({
    color: 0xb8ffff,
    transparent: true,
    opacity: 0.95,
    depthWrite: false
  });
  const fineCrackMat = new THREE.MeshBasicMaterial({
    color: 0x7edbd7,
    transparent: true,
    opacity: 0.48,
    depthWrite: false
  });

  function traceRoundedRect(path, w, h, r) {
    const x = -w / 2;
    const y = -h / 2;
    path.moveTo(x + r, y);
    path.lineTo(x + w - r, y);
    path.quadraticCurveTo(x + w, y, x + w, y + r);
    path.lineTo(x + w, y + h - r);
    path.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    path.lineTo(x + r, y + h);
    path.quadraticCurveTo(x, y + h, x, y + h - r);
    path.lineTo(x, y + r);
    path.quadraticCurveTo(x, y, x + r, y);
  }

  function makeRoundedRectShape(w, h, r) {
    const shape = new THREE.Shape();
    traceRoundedRect(shape, w, h, r);
    return shape;
  }

  function makeRingShape(ow, oh, iw, ih, round) {
    const shape = makeRoundedRectShape(ow, oh, round);
    const hole = new THREE.Path();
    traceRoundedRect(hole, iw, ih, round * 0.55);
    shape.holes.push(hole);
    return shape;
  }

  function makeBeveledRing(ow, oh, iw, ih) {
    const shape = new THREE.Shape();
    shape.moveTo(-ow / 2, -oh / 2);
    shape.lineTo(ow / 2, -oh / 2);
    shape.lineTo(iw / 2, ih / 2);
    shape.lineTo(-iw / 2, ih / 2);
    shape.closePath();
    return shape;
  }

  function makeExtrudedGeometry(shape, depth, bevelSize, bevelThickness) {
    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth: depth,
      bevelEnabled: bevelSize > 0,
      bevelSegments: 3,
      bevelSize: bevelSize,
      bevelThickness: bevelThickness
    });
    geometry.translate(0, 0, -depth / 2);
    return geometry;
  }

  function addCrack(name, coordinates, radius, material, z) {
    const points = [];
    for (let i = 0; i < coordinates.length; i++) {
      points.push(new THREE.Vector3(coordinates[i][0], coordinates[i][1], z));
    }
    const curve = new THREE.CatmullRomCurve3(points, false, "centripetal");
    const geometry = new THREE.TubeGeometry(curve, Math.max(12, points.length * 5), radius, 6, false);
    const mesh = new THREE.Mesh(geometry, material);
    mesh.name = name;
    artwork_group.add(mesh);
    return mesh;
  }

  const rear_backingGeom = new THREE.BoxGeometry(0.94, 1.26, 0.035);
  const rear_backing = new THREE.Mesh(rear_backingGeom, backingMat);
  rear_backing.name = "rear_backing";
  rear_backing.position.z = -0.045;
  frame_group.add(rear_backing);

  const frame_baseShape = makeRingShape(outerW, outerH, 0.69, 0.99, 0.035);
  const frame_baseGeom = makeExtrudedGeometry(frame_baseShape, 0.075, 0.012, 0.012);
  const frame_base = new THREE.Mesh(frame_baseGeom, darkMetalMat);
  frame_base.name = "frame_base";
  frame_group.add(frame_base);

  const outer_frameShape = makeRingShape(outerW, outerH, innerW, innerH, 0.035);
  const outer_frameGeom = makeExtrudedGeometry(outer_frameShape, 0.07, 0.014, 0.014);
  const outer_frame = new THREE.Mesh(outer_frameGeom, silverMat);
  outer_frame.name = "outer_frame";
  outer_frame.position.z = 0.018;
  frame_group.add(outer_frame);

  const outer_edgeGeom = makeExtrudedGeometry(
    makeRingShape(1.01, 1.33, 0.955, 1.275, 0.025),
    0.025,
    0.006,
    0.006
  );
  const outer_edge = new THREE.Mesh(outer_edgeGeom, brightSilverMat);
  outer_edge.name = "outer_edge";
  outer_edge.position.z = 0.066;
  frame_group.add(outer_edge);

  const outer_ridgeGeom = makeExtrudedGeometry(
    makeRingShape(0.965, 1.285, 0.91, 1.225, 0.022),
    0.024,
    0.006,
    0.006
  );
  const outer_ridge = new THREE.Mesh(outer_ridgeGeom, brightSilverMat);
  outer_ridge.name = "outer_ridge";
  outer_ridge.position.z = 0.071;
  frame_group.add(outer_ridge);

  const recessed_channelGeom = makeExtrudedGeometry(
    makeRingShape(0.91, 1.225, 0.855, 1.17, 0.018),
    0.018,
    0.003,
    0.003
  );
  const recessed_channel = new THREE.Mesh(recessed_channelGeom, darkMetalMat);
  recessed_channel.name = "recessed_channel";
  recessed_channel.position.z = 0.067;
  frame_group.add(recessed_channel);

  const broad_bevelGeom = makeExtrudedGeometry(
    makeBeveledRing(0.86, 1.17, 0.70, 1.0),
    0.026,
    0.008,
    0.008
  );
  const broad_bevel = new THREE.Mesh(broad_bevelGeom, silverMat);
  broad_bevel.name = "broad_bevel";
  broad_bevel.position.z = 0.071;
  frame_group.add(broad_bevel);

  const inner_lipGeom = makeExtrudedGeometry(
    makeRingShape(0.735, 1.035, 0.675, 0.975, 0.014),
    0.027,
    0.006,
    0.006
  );
  const inner_lip = new THREE.Mesh(inner_lipGeom, brightSilverMat);
  inner_lip.name = "inner_lip";
  inner_lip.position.z = 0.079;
  frame_group.add(inner_lip);

  const inner_shadowGeom = makeExtrudedGeometry(
    makeRingShape(0.69, 0.99, 0.65, 0.95, 0.008),
    0.014,
    0.002,
    0.002
  );
  const inner_shadow = new THREE.Mesh(inner_shadowGeom, darkMetalMat);
  inner_shadow.name = "inner_shadow";
  inner_shadow.position.z = 0.069;
  frame_group.add(inner_shadow);

  const corner_seamsGeom = new THREE.BoxGeometry(0.006, 0.235, 0.006);
  const corner_seams = new THREE.InstancedMesh(corner_seamsGeom, darkMetalMat, 4);
  corner_seams.name = "corner_seams";
  const seamDummy = new THREE.Object3D();
  const seamData = [
    [-0.455, 0.615, -Math.PI / 4],
    [0.455, 0.615, Math.PI / 4],
    [-0.455, -0.615, Math.PI / 4],
    [0.455, -0.615, -Math.PI / 4]
  ];
  for (let i = 0; i < seamData.length; i++) {
    seamDummy.position.set(seamData[i][0], seamData[i][1], 0.087);
    seamDummy.rotation.set(0, 0, seamData[i][2]);
    seamDummy.updateMatrix();
    corner_seams.setMatrixAt(i, seamDummy.matrix);
  }
  corner_seams.instanceMatrix.needsUpdate = true;
  frame_group.add(corner_seams);

  const artwork_panelGeom = new THREE.PlaneGeometry(innerW - 0.018, innerH - 0.018);
  const artwork_panel = new THREE.Mesh(artwork_panelGeom, panelMat);
  artwork_panel.name = "artwork_panel";
  artwork_panel.position.z = 0.055;
  artwork_group.add(artwork_panel);

  const central_glow_outerGeom = new THREE.CircleGeometry(0.29, 48);
  const central_glow_outer = new THREE.Mesh(central_glow_outerGeom, glowOuterMat);
  central_glow_outer.name = "central_glow_outer";
  central_glow_outer.scale.set(0.78, 1.18, 1);
  central_glow_outer.position.set(0.015, -0.035, 0.057);
  artwork_group.add(central_glow_outer);

  const central_glow_middleGeom = new THREE.CircleGeometry(0.21, 48);
  const central_glow_middle = new THREE.Mesh(central_glow_middleGeom, glowMiddleMat);
  central_glow_middle.name = "central_glow_middle";
  central_glow_middle.scale.set(0.72, 1.22, 1);
  central_glow_middle.position.set(0.015, -0.035, 0.058);
  artwork_group.add(central_glow_middle);

  const central_glow_coreGeom = new THREE.CircleGeometry(0.125, 40);
  const central_glow_core = new THREE.Mesh(central_glow_coreGeom, glowCoreMat);
  central_glow_core.name = "central_glow_core";
  central_glow_core.scale.set(0.68, 1.28, 1);
  central_glow_core.position.set(0.015, -0.035, 0.059);
  artwork_group.add(central_glow_core);

  const upper_main_crack_glow = addCrack("upper_main_crack_glow", [
    [-0.31, 0.39], [-0.27, 0.32], [-0.20, 0.27], [-0.13, 0.22],
    [-0.05, 0.25], [0.01, 0.18], [0.08, 0.22], [0.14, 0.15],
    [0.21, 0.18], [0.27, 0.12], [0.32, 0.15]
  ], 0.006, crackGlowMat, 0.061);

  const upper_main_crack = addCrack("upper_main_crack", [
    [-0.31, 0.39], [-0.27, 0.32], [-0.20, 0.27], [-0.13, 0.22],
    [-0.05, 0.25], [0.01, 0.18], [0.08, 0.22], [0.14, 0.15],
    [0.21, 0.18], [0.27, 0.12], [0.32, 0.15]
  ], 0.0022, crackMat, 0.064);

  const left_branch_crack = addCrack("left_branch_crack", [
    [-0.13, 0.22], [-0.17, 0.14], [-0.15, 0.07], [-0.21, 0.01],
    [-0.20, -0.07], [-0.27, -0.13], [-0.29, -0.22]
  ], 0.0028, crackMat, 0.064);

  const lower_left_crack_glow = addCrack("lower_left_crack_glow", [
    [-0.31, -0.29], [-0.27, -0.34], [-0.23, -0.39], [-0.16, -0.40],
    [-0.12, -0.46], [-0.04, -0.47], [0.02, -0.50]
  ], 0.006, crackGlowMat, 0.061);

  const lower_left_crack = addCrack("lower_left_crack", [
    [-0.31, -0.29], [-0.27, -0.34], [-0.23, -0.39], [-0.16, -0.40],
    [-0.12, -0.46], [-0.04, -0.47], [0.02, -0.50]
  ], 0.0025, crackMat, 0.064);

  const lower_main_crack_glow = addCrack("lower_main_crack_glow", [
    [0.02, -0.49], [0.06, -0.42], [0.10, -0.35], [0.16, -0.29],
    [0.19, -0.21], [0.25, -0.16], [0.29, -0.09], [0.34, -0.06]
  ], 0.007, crackGlowMat, 0.061);

  const lower_main_crack = addCrack("lower_main_crack", [
    [0.02, -0.49], [0.06, -0.42], [0.10, -0.35], [0.16, -0.29],
    [0.19, -0.21], [0.25, -0.16], [0.29, -0.09], [0.34, -0.06]
  ], 0.0028, crackMat, 0.064);

  const right_branch_crack = addCrack("right_branch_crack", [
    [0.19, -0.21], [0.25, -0.27], [0.30, -0.31], [0.33, -0.38],
    [0.31, -0.45], [0.34, -0.50]
  ], 0.0025, crackMat, 0.064);

  const top_right_crack = addCrack("top_right_crack", [
    [0.21, 0.18], [0.25, 0.25], [0.30, 0.31], [0.32, 0.40]
  ], 0.0025, crackMat, 0.064);

  const center_drop_crack = addCrack("center_drop_crack", [
    [0.01, 0.18], [-0.01, 0.09], [0.03, 0.02], [0.01, -0.07],
    [0.07, -0.15], [0.06, -0.25], [0.10, -0.35]
  ], 0.0021, crackMat, 0.064);

  const upper_fine_crack = addCrack("upper_fine_crack", [
    [-0.27, 0.45], [-0.25, 0.39], [-0.27, 0.32], [-0.22, 0.30], [-0.20, 0.27]
  ], 0.0012, fineCrackMat, 0.063);

  const left_fine_crack = addCrack("left_fine_crack", [
    [-0.34, 0.19], [-0.30, 0.13], [-0.31, 0.06], [-0.26, 0.01], [-0.21, 0.01]
  ], 0.0012, fineCrackMat, 0.063);

  const center_fine_crack = addCrack("center_fine_crack", [
    [-0.05, 0.25], [-0.02, 0.32], [0.02, 0.36], [0.00, 0.43]
  ], 0.0011, fineCrackMat, 0.063);

  const right_fine_crack = addCrack("right_fine_crack", [
    [0.27, 0.12], [0.31, 0.07], [0.30, 0.00], [0.34, -0.04]
  ], 0.0012, fineCrackMat, 0.063);

  const lower_fine_crack = addCrack("lower_fine_crack", [
    [-0.16, -0.40], [-0.18, -0.33], [-0.15, -0.26], [-0.18, -0.19]
  ], 0.0011, fineCrackMat, 0.063);

  const bottom_fine_crack = addCrack("bottom_fine_crack", [
    [0.16, -0.29], [0.13, -0.36], [0.14, -0.43], [0.10, -0.49]
  ], 0.0012, fineCrackMat, 0.063);

  const glass_coverGeom = new THREE.PlaneGeometry(innerW - 0.012, innerH - 0.012);
  const glass_cover = new THREE.Mesh(glass_coverGeom, glassMat);
  glass_cover.name = "glass_cover";
  glass_cover.position.z = 0.067;
  artwork_group.add(glass_cover);

  const rust_spotsGeom = new THREE.CircleGeometry(1, 14);
  const rust_spots = new THREE.InstancedMesh(rust_spotsGeom, rustMat, 42);
  rust_spots.name = "rust_spots";
  const rustDummy = new THREE.Object3D();
  for (let i = 0; i < 42; i++) {
    const edge = i % 4;
    const t = ((i * 37) % 100) / 100;
    let x = 0;
    let y = 0;
    if (edge === 0) {
      x = -0.455 + t * 0.91;
      y = 0.615;
    } else if (edge === 1) {
      x = 0.455;
      y = -0.58 + t * 1.16;
    } else if (edge === 2) {
      x = 0.455 - t * 0.91;
      y = -0.615;
    } else {
      x = -0.455;
      y = 0.58 - t * 1.16;
    }
    const sx = 0.006 + ((i * 11) % 7) * 0.0022;
    const sy = 0.004 + ((i * 17) % 6) * 0.0018;
    rustDummy.position.set(x, y, 0.091);
    rustDummy.rotation.set(0, 0, i * 0.73);
    rustDummy.scale.set(sx, sy, 1);
    rustDummy.updateMatrix();
    rust_spots.setMatrixAt(i, rustDummy.matrix);
  }
  rust_spots.instanceMatrix.needsUpdate = true;
  frame_group.add(rust_spots);

  const patina_spotsGeom = new THREE.CircleGeometry(1, 18);
  const patina_spots = new THREE.InstancedMesh(patina_spotsGeom, patinaMat, 18);
  patina_spots.name = "patina_spots";
  const patinaDummy = new THREE.Object3D();
  for (let i = 0; i < 18; i++) {
    const edge = i % 4;
    const t = ((i * 29 + 13) % 100) / 100;
    let x = 0;
    let y = 0;
    if (edge === 0) {
      x = -0.42 + t * 0.84;
      y = 0.59;
    } else if (edge === 1) {
      x = 0.43;
      y = -0.54 + t * 1.08;
    } else if (edge === 2) {
      x = 0.42 - t * 0.84;
      y = -0.59;
    } else {
      x = -0.43;
      y = 0.54 - t * 1.08;
    }
    const sx = 0.018 + ((i * 7) % 5) * 0.006;
    const sy = 0.008 + ((i * 13) % 4) * 0.004;
    patinaDummy.position.set(x, y, 0.090);
    patinaDummy.rotation.set(0, 0, i * 0.41);
    patinaDummy.scale.set(sx, sy, 1);
    patinaDummy.updateMatrix();
    patina_spots.setMatrixAt(i, patinaDummy.matrix);
  }
  patina_spots.instanceMatrix.needsUpdate = true;
  frame_group.add(patina_spots);

  const scratch_marksGeom = new THREE.BoxGeometry(0.003, 0.035, 0.003);
  const scratch_marks = new THREE.InstancedMesh(scratch_marksGeom, brightSilverMat, 24);
  scratch_marks.name = "scratch_marks";
  const scratchDummy = new THREE.Object3D();
  for (let i = 0; i < 24; i++) {
    const edge = i % 4;
    const t = ((i * 31 + 7) % 100) / 100;
    let x = 0;
    let y = 0;
    let rotation = 0;
    if (edge === 0) {
      x = -0.44 + t * 0.88;
      y = 0.625;
      rotation = Math.PI / 2;
    } else if (edge === 1) {
      x = 0.46;
      y = -0.57 + t * 1.14;
    } else if (edge === 2) {
      x = 0.44 - t * 0.88;
      y = -0.625;
      rotation = Math.PI / 2;
    } else {
      x = -0.46;
      y = 0.57 - t * 1.14;
    }
    scratchDummy.position.set(x, y, 0.093);
    scratchDummy.rotation.set(0, 0, rotation + ((i % 3) - 1) * 0.12);
    scratchDummy.scale.set(1, 0.55 + ((i * 5) % 6) * 0.12, 1);
    scratchDummy.updateMatrix();
    scratch_marks.setMatrixAt(i, scratchDummy.matrix);
  }
  scratch_marks.instanceMatrix.needsUpdate = true;
  frame_group.add(scratch_marks);

  const stand_supportGeom = new THREE.BoxGeometry(0.13, 0.31, 0.045);
  const stand_support = new THREE.Mesh(stand_supportGeom, darkMetalMat);
  stand_support.name = "stand_support";
  stand_support.position.set(-0.25, -0.61, -0.105);
  stand_support.rotation.x = 0.48;
  stand_group.add(stand_support);

  const stand_footGeom = new THREE.BoxGeometry(0.22, 0.045, 0.18);
  const stand_foot = new THREE.Mesh(stand_footGeom, darkMetalMat);
  stand_foot.name = "stand_foot";
  stand_foot.position.set(-0.25, -0.755, -0.165);
  stand_group.add(stand_foot);

  const stand_hingeGeom = new THREE.CylinderGeometry(0.025, 0.025, 0.20, 16);
  const stand_hinge = new THREE.Mesh(stand_hingeGeom, silverMat);
  stand_hinge.name = "stand_hinge";
  stand_hinge.rotation.z = Math.PI / 2;
  stand_hinge.position.set(-0.25, -0.47, -0.065);
  stand_group.add(stand_hinge);

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
  const maxDim = Math.max(size.x, size.y, size.z) || 1;
  const scale = 0.98 / maxDim;
  root.scale.setScalar(scale);
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
