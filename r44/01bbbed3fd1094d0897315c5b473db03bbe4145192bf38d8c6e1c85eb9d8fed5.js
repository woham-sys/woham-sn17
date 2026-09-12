// miner-diag: gpus=? tflops=? stream48=? power=? probe_tps=3831 cpu_quota=?/? net=? batch=1 wall=1609 seed=870128282
export default function generate(THREE) {
  const root = new THREE.Group();
  const knife_assembly = new THREE.Group();
  root.add(knife_assembly);

  const bladeMat = new THREE.MeshStandardMaterial({
    color: 0x927943,
    metalness: 0.6,
    roughness: 0.5,
  });
  const blade_faceMat = new THREE.MeshStandardMaterial({
    color: 0xa58a4d,
    metalness: 0.6,
    roughness: 0.5,
    side: THREE.DoubleSide,
  });
  const blade_highlightMat = new THREE.MeshStandardMaterial({
    color: 0xb7a06a,
    metalness: 0.6,
    roughness: 0.5,
  });
  const blade_shadowMat = new THREE.MeshStandardMaterial({
    color: 0x5f5133,
    metalness: 0.6,
    roughness: 0.5,
  });
  const engravingMat = new THREE.MeshStandardMaterial({
    color: 0xc5a963,
    metalness: 0.6,
    roughness: 0.5,
    side: THREE.DoubleSide,
  });
  const patinaMat = new THREE.MeshStandardMaterial({
    color: 0x4e4532,
    metalness: 0.0,
    roughness: 0.7,
    side: THREE.DoubleSide,
  });
  const woodMat = new THREE.MeshStandardMaterial({
    color: 0x7b4225,
    metalness: 0.0,
    roughness: 0.6,
  });
  const wood_grainMat = new THREE.MeshStandardMaterial({
    color: 0x3d2116,
    metalness: 0.0,
    roughness: 0.6,
  });
  const wood_highlightMat = new THREE.MeshStandardMaterial({
    color: 0xa76436,
    metalness: 0.0,
    roughness: 0.6,
  });
  const leatherMat = new THREE.MeshStandardMaterial({
    color: 0x28211e,
    metalness: 0.0,
    roughness: 0.7,
  });

  const bladeShape = new THREE.Shape();
  bladeShape.moveTo(0, -2.5);
  bladeShape.bezierCurveTo(0.14, -2.34, 0.25, -2.05, 0.29, -1.72);
  bladeShape.lineTo(0.34, 0.14);
  bladeShape.lineTo(-0.34, 0.14);
  bladeShape.lineTo(-0.30, -1.72);
  bladeShape.bezierCurveTo(-0.25, -2.05, -0.14, -2.34, 0, -2.5);
  bladeShape.closePath();

  const bladeGeom = new THREE.ExtrudeGeometry(bladeShape, {
    depth: 0.07,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.025,
    bevelSize: 0.025,
    bevelSegments: 3,
  });
  bladeGeom.translate(0, 0, -0.035);
  const blade = new THREE.Mesh(bladeGeom, bladeMat);
  knife_assembly.add(blade);

  const blade_faceShape = new THREE.Shape();
  blade_faceShape.moveTo(0, -2.39);
  blade_faceShape.bezierCurveTo(0.09, -2.25, 0.17, -2.01, 0.20, -1.69);
  blade_faceShape.lineTo(0.245, 0.075);
  blade_faceShape.lineTo(-0.245, 0.075);
  blade_faceShape.lineTo(-0.20, -1.69);
  blade_faceShape.bezierCurveTo(-0.17, -2.01, -0.09, -2.25, 0, -2.39);
  blade_faceShape.closePath();

  const blade_faceGeom = new THREE.ShapeGeometry(blade_faceShape, 24);
  const blade_face = new THREE.Mesh(blade_faceGeom, blade_faceMat);
  blade_face.position.z = 0.062;
  knife_assembly.add(blade_face);

  const blade_edge_points = [
    new THREE.Vector3(0, -2.46, 0.066),
    new THREE.Vector3(0.15, -2.25, 0.066),
    new THREE.Vector3(0.27, -1.92, 0.066),
    new THREE.Vector3(0.325, -1.15, 0.066),
    new THREE.Vector3(0.335, 0.10, 0.066),
  ];
  const blade_edgeGeom = new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3(blade_edge_points, false, "centripetal"),
    36,
    0.008,
    6,
    false
  );

  const right_cutting_edge = new THREE.Mesh(blade_edgeGeom, blade_highlightMat);
  knife_assembly.add(right_cutting_edge);

  const left_cutting_edge = new THREE.Mesh(blade_edgeGeom, blade_highlightMat);
  left_cutting_edge.scale.x = -1;
  knife_assembly.add(left_cutting_edge);

  const fuller_groove_points = [
    new THREE.Vector3(0, -2.12, 0.069),
    new THREE.Vector3(0.025, -1.86, 0.069),
    new THREE.Vector3(0.045, -1.25, 0.069),
    new THREE.Vector3(0.055, -0.55, 0.069),
    new THREE.Vector3(0.065, 0.03, 0.069),
  ];
  const fuller_grooveGeom = new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3(fuller_groove_points, false, "centripetal"),
    32,
    0.014,
    8,
    false
  );
  const fuller_groove = new THREE.Mesh(fuller_grooveGeom, blade_shadowMat);
  knife_assembly.add(fuller_groove);

  const fuller_ridge_points = [
    new THREE.Vector3(0.006, -2.10, 0.081),
    new THREE.Vector3(0.031, -1.84, 0.081),
    new THREE.Vector3(0.051, -1.24, 0.081),
    new THREE.Vector3(0.061, -0.54, 0.081),
    new THREE.Vector3(0.071, 0.02, 0.081),
  ];
  const fuller_ridgeGeom = new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3(fuller_ridge_points, false, "centripetal"),
    32,
    0.005,
    6,
    false
  );
  const fuller_ridge = new THREE.Mesh(fuller_ridgeGeom, blade_highlightMat);
  knife_assembly.add(fuller_ridge);

  const blade_collarShape = new THREE.Shape();
  blade_collarShape.moveTo(-0.44, -0.045);
  blade_collarShape.lineTo(0.44, -0.045);
  blade_collarShape.bezierCurveTo(0.48, -0.025, 0.48, 0.035, 0.44, 0.065);
  blade_collarShape.lineTo(-0.44, 0.065);
  blade_collarShape.bezierCurveTo(-0.48, 0.035, -0.48, -0.025, -0.44, -0.045);
  blade_collarShape.closePath();

  const blade_collarGeom = new THREE.ExtrudeGeometry(blade_collarShape, {
    depth: 0.18,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.015,
    bevelSize: 0.015,
    bevelSegments: 2,
  });
  blade_collarGeom.translate(0, 0, -0.09);
  const blade_collar = new THREE.Mesh(blade_collarGeom, bladeMat);
  blade_collar.position.y = 0.14;
  knife_assembly.add(blade_collar);

  const collar_inscriptionGeom = new THREE.BoxGeometry(0.018, 0.052, 0.008);
  const collar_inscription = new THREE.InstancedMesh(
    collar_inscriptionGeom,
    engravingMat,
    9
  );
  const inscription_dummy = new THREE.Object3D();
  for (let i = 0; i < 9; i++) {
    inscription_dummy.position.set(-0.25 + i * 0.0625, 0.143, 0.111);
    inscription_dummy.rotation.set(0, 0, (i % 3 - 1) * 0.12);
    inscription_dummy.scale.set(1, 0.72 + (i % 2) * 0.22, 1);
    inscription_dummy.updateMatrix();
    collar_inscription.setMatrixAt(i, inscription_dummy.matrix);
  }
  collar_inscription.instanceMatrix.needsUpdate = true;
  knife_assembly.add(collar_inscription);

  const blade_emblemShape = new THREE.Shape();
  blade_emblemShape.moveTo(0, -0.13);
  blade_emblemShape.lineTo(0.045, -0.075);
  blade_emblemShape.lineTo(0.13, -0.085);
  blade_emblemShape.lineTo(0.09, -0.025);
  blade_emblemShape.lineTo(0.145, 0.025);
  blade_emblemShape.lineTo(0.075, 0.055);
  blade_emblemShape.lineTo(0.05, 0.125);
  blade_emblemShape.lineTo(0, 0.085);
  blade_emblemShape.lineTo(-0.05, 0.125);
  blade_emblemShape.lineTo(-0.075, 0.055);
  blade_emblemShape.lineTo(-0.145, 0.025);
  blade_emblemShape.lineTo(-0.09, -0.025);
  blade_emblemShape.lineTo(-0.13, -0.085);
  blade_emblemShape.lineTo(-0.045, -0.075);
  blade_emblemShape.closePath();

  const blade_emblemGeom = new THREE.ShapeGeometry(blade_emblemShape);
  const blade_emblem = new THREE.Mesh(blade_emblemGeom, engravingMat);
  blade_emblem.position.set(0, -0.035, 0.068);
  knife_assembly.add(blade_emblem);

  const emblem_centerGeom = new THREE.CircleGeometry(0.035, 16);
  const emblem_center = new THREE.Mesh(emblem_centerGeom, blade_shadowMat);
  emblem_center.position.set(0, -0.035, 0.071);
  knife_assembly.add(emblem_center);

  const patina_spotsGeom = new THREE.CircleGeometry(0.025, 12);
  const patina_spots = new THREE.InstancedMesh(patina_spotsGeom, patinaMat, 8);
  const patina_dummy = new THREE.Object3D();
  const patina_data = [
    [-0.16, -1.82, 1.2, 0.55, 0.2],
    [0.17, -1.52, 0.75, 0.45, -0.4],
    [-0.20, -1.12, 0.65, 0.38, 0.7],
    [0.15, -0.78, 1.0, 0.42, -0.2],
    [-0.12, -0.42, 0.55, 0.32, 0.5],
    [0.20, -0.12, 0.72, 0.36, -0.6],
    [-0.08, 0.01, 0.48, 0.28, 0.1],
    [0.06, -2.18, 0.42, 0.25, 0.8],
  ];
  for (let i = 0; i < patina_data.length; i++) {
    const spot = patina_data[i];
    patina_dummy.position.set(spot[0], spot[1], 0.066);
    patina_dummy.rotation.set(0, 0, spot[4]);
    patina_dummy.scale.set(spot[2], spot[3], 1);
    patina_dummy.updateMatrix();
    patina_spots.setMatrixAt(i, patina_dummy.matrix);
  }
  patina_spots.instanceMatrix.needsUpdate = true;
  knife_assembly.add(patina_spots);

  const handle_coreProfile = [
    new THREE.Vector2(0, 0.16),
    new THREE.Vector2(0.18, 0.16),
    new THREE.Vector2(0.215, 0.22),
    new THREE.Vector2(0.225, 0.34),
    new THREE.Vector2(0.218, 0.58),
    new THREE.Vector2(0.205, 0.86),
    new THREE.Vector2(0.19, 1.12),
    new THREE.Vector2(0.18, 1.25),
    new THREE.Vector2(0, 1.25),
  ];
  const handle_coreGeom = new THREE.LatheGeometry(handle_coreProfile, 32);
  const handle_core = new THREE.Mesh(handle_coreGeom, woodMat);
  knife_assembly.add(handle_core);

  const handle_groovesGeom = new THREE.TorusGeometry(0.205, 0.012, 8, 32);
  const handle_grooves = new THREE.InstancedMesh(
    handle_groovesGeom,
    leatherMat,
    7
  );
  const groove_dummy = new THREE.Object3D();
  for (let i = 0; i < 7; i++) {
    const y = 0.31 + i * 0.14;
    const scale = 1.06 - i * 0.022;
    groove_dummy.position.set(0, y, 0);
    groove_dummy.rotation.set(Math.PI / 2, 0, 0);
    groove_dummy.scale.setScalar(scale);
    groove_dummy.updateMatrix();
    handle_grooves.setMatrixAt(i, groove_dummy.matrix);
  }
  handle_grooves.instanceMatrix.needsUpdate = true;
  knife_assembly.add(handle_grooves);

  const handle_grainGeom = new THREE.BoxGeometry(0.012, 0.24, 0.006);
  const handle_grain = new THREE.InstancedMesh(
    handle_grainGeom,
    wood_grainMat,
    12
  );
  const grain_dummy = new THREE.Object3D();
  for (let i = 0; i < 12; i++) {
    const angle = i * 2.3999632297;
    const y = 0.30 + (i % 6) * 0.17;
    const radius = 0.222 - Math.abs(y - 0.72) * 0.035;
    grain_dummy.position.set(
      Math.cos(angle) * radius,
      y,
      Math.sin(angle) * radius
    );
    grain_dummy.rotation.set(0, Math.PI / 2 - angle, 0);
    grain_dummy.scale.set(1, 0.72 + (i % 3) * 0.16, 1);
    grain_dummy.updateMatrix();
    handle_grain.setMatrixAt(i, grain_dummy.matrix);
  }
  handle_grain.instanceMatrix.needsUpdate = true;
  knife_assembly.add(handle_grain);

  const handle_highlight_grainGeom = new THREE.BoxGeometry(0.009, 0.19, 0.005);
  const handle_highlight_grain = new THREE.InstancedMesh(
    handle_highlight_grainGeom,
    wood_highlightMat,
    8
  );
  const highlight_grain_dummy = new THREE.Object3D();
  for (let i = 0; i < 8; i++) {
    const angle = 0.55 + i * 2.3999632297;
    const y = 0.39 + (i % 4) * 0.23;
    const radius = 0.224 - Math.abs(y - 0.72) * 0.035;
    highlight_grain_dummy.position.set(
      Math.cos(angle) * radius,
      y,
      Math.sin(angle) * radius
    );
    highlight_grain_dummy.rotation.set(0, Math.PI / 2 - angle, 0);
    highlight_grain_dummy.scale.set(1, 0.75 + (i % 2) * 0.2, 1);
    highlight_grain_dummy.updateMatrix();
    handle_highlight_grain.setMatrixAt(i, highlight_grain_dummy.matrix);
  }
  handle_highlight_grain.instanceMatrix.needsUpdate = true;
  knife_assembly.add(handle_highlight_grain);

  const pommel_collarGeom = new THREE.CylinderGeometry(0.22, 0.205, 0.13, 32);
  const pommel_collar = new THREE.Mesh(pommel_collarGeom, bladeMat);
  pommel_collar.position.y = 1.285;
  knife_assembly.add(pommel_collar);

  const pommel_collar_rimsGeom = new THREE.TorusGeometry(0.207, 0.014, 8, 32);
  const pommel_collar_rims = new THREE.InstancedMesh(
    pommel_collar_rimsGeom,
    blade_highlightMat,
    2
  );
  const collar_rim_dummy = new THREE.Object3D();
  for (let i = 0; i < 2; i++) {
    collar_rim_dummy.position.set(0, 1.225 + i * 0.12, 0);
    collar_rim_dummy.rotation.set(Math.PI / 2, 0, 0);
    collar_rim_dummy.scale.setScalar(i === 0 ? 0.98 : 1.04);
    collar_rim_dummy.updateMatrix();
    pommel_collar_rims.setMatrixAt(i, collar_rim_dummy.matrix);
  }
  pommel_collar_rims.instanceMatrix.needsUpdate = true;
  knife_assembly.add(pommel_collar_rims);

  const pommelProfile = [
    new THREE.Vector2(0, 1.32),
    new THREE.Vector2(0.19, 1.32),
    new THREE.Vector2(0.22, 1.36),
    new THREE.Vector2(0.27, 1.40),
    new THREE.Vector2(0.30, 1.48),
    new THREE.Vector2(0.30, 1.57),
    new THREE.Vector2(0.27, 1.65),
    new THREE.Vector2(0.20, 1.70),
    new THREE.Vector2(0, 1.72),
  ];
  const pommelGeom = new THREE.LatheGeometry(pommelProfile, 32);
  const pommel = new THREE.Mesh(pommelGeom, woodMat);
  knife_assembly.add(pommel);

  const pommel_base_ringGeom = new THREE.TorusGeometry(0.225, 0.018, 10, 32);
  const pommel_base_ring = new THREE.Mesh(pommel_base_ringGeom, blade_shadowMat);
  pommel_base_ring.rotation.x = Math.PI / 2;
  pommel_base_ring.position.y = 1.355;
  knife_assembly.add(pommel_base_ring);

  const pommel_grainGeom = new THREE.TorusGeometry(0.286, 0.006, 6, 32);
  const pommel_grain = new THREE.InstancedMesh(
    pommel_grainGeom,
    wood_grainMat,
    3
  );
  const pommel_grain_dummy = new THREE.Object3D();
  const pommel_ring_data = [
    [1.46, 1.02],
    [1.56, 1.04],
    [1.64, 0.94],
  ];
  for (let i = 0; i < pommel_ring_data.length; i++) {
    pommel_grain_dummy.position.set(0, pommel_ring_data[i][0], 0);
    pommel_grain_dummy.rotation.set(Math.PI / 2, 0, 0);
    pommel_grain_dummy.scale.setScalar(pommel_ring_data[i][1]);
    pommel_grain_dummy.updateMatrix();
    pommel_grain.setMatrixAt(i, pommel_grain_dummy.matrix);
  }
  pommel_grain.instanceMatrix.needsUpdate = true;
  knife_assembly.add(pommel_grain);

  knife_assembly.rotation.z = -0.72;

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

  fitToUnitCube(root);
  return root;
}