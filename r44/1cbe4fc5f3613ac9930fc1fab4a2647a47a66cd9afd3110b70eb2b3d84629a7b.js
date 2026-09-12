// miner-diag: gpus=? tflops=? stream48=? power=? probe_tps=3831 cpu_quota=?/? net=? batch=1 wall=1609 seed=870128282
export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "cream_topped_biscuit";

  const biscuit_group = new THREE.Group();
  biscuit_group.name = "biscuit_group";
  root.add(biscuit_group);

  const cream_group = new THREE.Group();
  cream_group.name = "cream_group";
  root.add(cream_group);

  const biscuit_sideMat = new THREE.MeshStandardMaterial({
    color: 0xe7c66f,
    metalness: 0.0,
    roughness: 0.9
  });
  const bottom_crustMat = new THREE.MeshStandardMaterial({
    color: 0xb86b2d,
    metalness: 0.0,
    roughness: 0.9
  });
  const top_crustMat = new THREE.MeshStandardMaterial({
    color: 0xc77a2d,
    metalness: 0.0,
    roughness: 0.85
  });
  const top_surfaceMat = new THREE.MeshStandardMaterial({
    color: 0xd38a38,
    metalness: 0.0,
    roughness: 0.82
  });
  const poreMat = new THREE.MeshStandardMaterial({
    color: 0xa97835,
    metalness: 0.0,
    roughness: 0.95,
    side: THREE.DoubleSide
  });
  const creamMat = new THREE.MeshStandardMaterial({
    color: 0xfffdf5,
    metalness: 0.0,
    roughness: 0.95
  });
  const powdered_sugarMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    metalness: 0.0,
    roughness: 0.95
  });

  const biscuit_sideProfile = [
    new THREE.Vector2(0.00, -0.34),
    new THREE.Vector2(0.78, -0.34),
    new THREE.Vector2(0.96, -0.31),
    new THREE.Vector2(1.06, -0.24),
    new THREE.Vector2(1.10, -0.10),
    new THREE.Vector2(1.11, 0.08),
    new THREE.Vector2(1.09, 0.22),
    new THREE.Vector2(1.03, 0.32),
    new THREE.Vector2(0.00, 0.32)
  ];
  const biscuit_sideGeom = new THREE.LatheGeometry(biscuit_sideProfile, 64);
  const biscuit_side = new THREE.Mesh(biscuit_sideGeom, biscuit_sideMat);
  biscuit_side.name = "biscuit_side";
  biscuit_group.add(biscuit_side);

  const bottom_crustProfile = [
    new THREE.Vector2(0.00, -0.42),
    new THREE.Vector2(0.82, -0.42),
    new THREE.Vector2(0.98, -0.39),
    new THREE.Vector2(1.07, -0.34),
    new THREE.Vector2(1.11, -0.26),
    new THREE.Vector2(1.09, -0.19),
    new THREE.Vector2(0.00, -0.19)
  ];
  const bottom_crustGeom = new THREE.LatheGeometry(bottom_crustProfile, 64);
  const bottom_crust = new THREE.Mesh(bottom_crustGeom, bottom_crustMat);
  bottom_crust.name = "bottom_crust";
  biscuit_group.add(bottom_crust);

  const top_crustProfile = [
    new THREE.Vector2(0.00, 0.18),
    new THREE.Vector2(1.02, 0.18),
    new THREE.Vector2(1.09, 0.23),
    new THREE.Vector2(1.12, 0.30),
    new THREE.Vector2(1.08, 0.38),
    new THREE.Vector2(0.98, 0.44),
    new THREE.Vector2(0.00, 0.44)
  ];
  const top_crustGeom = new THREE.LatheGeometry(top_crustProfile, 64);
  const top_crust = new THREE.Mesh(top_crustGeom, top_crustMat);
  top_crust.name = "top_crust";
  biscuit_group.add(top_crust);

  const top_surfaceGeom = new THREE.CylinderGeometry(1.0, 1.04, 0.045, 64);
  const top_surface = new THREE.Mesh(top_surfaceGeom, top_surfaceMat);
  top_surface.name = "top_surface";
  top_surface.position.y = 0.415;
  biscuit_group.add(top_surface);

  const torn_crumbsGeom = new THREE.DodecahedronGeometry(1, 0);
  const torn_crumbs = new THREE.InstancedMesh(
    torn_crumbsGeom,
    biscuit_sideMat,
    22
  );
  torn_crumbs.name = "torn_crumbs";
  const torn_dummy = new THREE.Object3D();
  for (let i = 0; i < 22; i++) {
    const angle = i / 22 * Math.PI * 2;
    const radius = 1.045 + 0.025 * Math.sin(i * 1.7);
    const y = -0.145 + 0.035 * Math.sin(i * 2.1);
    const sx = 0.055 + 0.025 * ((i % 4) / 3);
    const sy = 0.025 + 0.018 * (((i * 3) % 5) / 4);
    const sz = 0.035 + 0.018 * (((i * 5) % 7) / 6);
    torn_dummy.position.set(
      Math.cos(angle) * radius,
      y,
      Math.sin(angle) * radius
    );
    torn_dummy.rotation.set(i * 0.31, -angle, i * 0.17);
    torn_dummy.scale.set(sx, sy, sz);
    torn_dummy.updateMatrix();
    torn_crumbs.setMatrixAt(i, torn_dummy.matrix);
  }
  torn_crumbs.instanceMatrix.needsUpdate = true;
  biscuit_group.add(torn_crumbs);

  function biscuitRadiusAt(y) {
    if (y < -0.20) return 1.06 + (y + 0.20) * 0.25;
    if (y < 0.18) return 1.105;
    return 1.105 - (y - 0.18) * 0.25;
  }

  const side_poresGeom = new THREE.CircleGeometry(1, 10);
  const side_pores = new THREE.InstancedMesh(side_poresGeom, poreMat, 72);
  side_pores.name = "side_pores";
  const pore_dummy = new THREE.Object3D();
  const pore_forward = new THREE.Vector3(0, 0, 1);
  const pore_normal = new THREE.Vector3();
  for (let i = 0; i < 72; i++) {
    const angle = i * 2.399963229728653;
    const y = -0.27 + (((i * 17) % 73) / 72) * 0.48;
    const radius = biscuitRadiusAt(y) + 0.006;
    const sx = 0.018 + 0.038 * (((i * 7) % 11) / 10);
    const sy = 0.010 + 0.022 * (((i * 13) % 9) / 8);
    pore_normal.set(Math.cos(angle), 0, Math.sin(angle));
    pore_dummy.position.set(
      pore_normal.x * radius,
      y,
      pore_normal.z * radius
    );
    pore_dummy.quaternion.setFromUnitVectors(pore_forward, pore_normal);
    pore_dummy.scale.set(sx, sy, 1);
    pore_dummy.updateMatrix();
    side_pores.setMatrixAt(i, pore_dummy.matrix);
  }
  side_pores.instanceMatrix.needsUpdate = true;
  biscuit_group.add(side_pores);

  const top_sugarGeom = new THREE.SphereGeometry(1, 7, 5);
  const top_sugar = new THREE.InstancedMesh(
    top_sugarGeom,
    powdered_sugarMat,
    58
  );
  top_sugar.name = "top_sugar";
  const sugar_dummy = new THREE.Object3D();
  for (let i = 0; i < 58; i++) {
    const angle = i * 2.399963229728653 + 0.35;
    const radius = 0.72 + (((i * 19) % 59) / 58) * 0.35;
    const size = 0.012 + 0.024 * (((i * 11) % 13) / 12);
    sugar_dummy.position.set(
      Math.cos(angle) * radius,
      0.447 + size * 0.25,
      Math.sin(angle) * radius
    );
    sugar_dummy.rotation.set(i * 0.23, i * 0.41, i * 0.17);
    sugar_dummy.scale.set(size * 1.25, size * 0.75, size);
    sugar_dummy.updateMatrix();
    top_sugar.setMatrixAt(i, sugar_dummy.matrix);
  }
  top_sugar.instanceMatrix.needsUpdate = true;
  biscuit_group.add(top_sugar);

  const side_sugar = new THREE.InstancedMesh(
    top_sugarGeom,
    powdered_sugarMat,
    34
  );
  side_sugar.name = "side_sugar";
  for (let i = 0; i < 34; i++) {
    const angle = i * 2.399963229728653 + 0.8;
    const y = -0.31 + (((i * 13) % 35) / 34) * 0.62;
    const size = 0.011 + 0.021 * (((i * 9) % 17) / 16);
    const radius = biscuitRadiusAt(y) + 0.012;
    sugar_dummy.position.set(
      Math.cos(angle) * radius,
      y,
      Math.sin(angle) * radius
    );
    sugar_dummy.rotation.set(i * 0.37, i * 0.19, i * 0.29);
    sugar_dummy.scale.set(size, size * 0.8, size * 1.2);
    sugar_dummy.updateMatrix();
    side_sugar.setMatrixAt(i, sugar_dummy.matrix);
  }
  side_sugar.instanceMatrix.needsUpdate = true;
  biscuit_group.add(side_sugar);

  const cream_baseShape = new THREE.Shape();
  const cream_segments = 64;
  for (let i = 0; i < cream_segments; i++) {
    const angle = i / cream_segments * Math.PI * 2;
    const radius =
      1.02 +
      0.070 * Math.sin(angle * 5 + 0.4) +
      0.045 * Math.sin(angle * 9 - 0.7) +
      0.025 * Math.sin(angle * 13 + 1.1);
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    if (i === 0) cream_baseShape.moveTo(x, y);
    else cream_baseShape.lineTo(x, y);
  }
  cream_baseShape.closePath();

  const cream_baseGeom = new THREE.ExtrudeGeometry(cream_baseShape, {
    depth: 0.16,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.045,
    bevelSize: 0.055,
    bevelSegments: 3
  });
  const cream_base = new THREE.Mesh(cream_baseGeom, creamMat);
  cream_base.name = "cream_base";
  cream_base.rotation.x = -Math.PI / 2;
  cream_base.position.y = 0.40;
  cream_group.add(cream_base);

  const cream_moundGeom = new THREE.SphereGeometry(1, 48, 24);
  const cream_mound = new THREE.Mesh(cream_moundGeom, creamMat);
  cream_mound.name = "cream_mound";
  cream_mound.position.set(0, 0.65, 0);
  cream_mound.scale.set(0.98, 0.31, 0.90);
  cream_group.add(cream_mound);

  const cream_edge_lobesGeom = new THREE.SphereGeometry(1, 18, 12);
  const cream_edge_lobes = new THREE.InstancedMesh(
    cream_edge_lobesGeom,
    creamMat,
    18
  );
  cream_edge_lobes.name = "cream_edge_lobes";
  const cream_dummy = new THREE.Object3D();
  for (let i = 0; i < 18; i++) {
    const angle = i / 18 * Math.PI * 2;
    const radius = 0.99 + 0.035 * Math.sin(i * 1.9);
    cream_dummy.position.set(
      Math.cos(angle) * radius,
      0.47 + 0.025 * Math.sin(i * 2.3),
      Math.sin(angle) * radius
    );
    cream_dummy.rotation.set(0, -angle, 0);
    cream_dummy.scale.set(
      0.18 + 0.035 * ((i % 3) / 2),
      0.115 + 0.025 * (((i * 5) % 7) / 6),
      0.22 + 0.035 * (((i * 3) % 5) / 4)
    );
    cream_dummy.updateMatrix();
    cream_edge_lobes.setMatrixAt(i, cream_dummy.matrix);
  }
  cream_edge_lobes.instanceMatrix.needsUpdate = true;
  cream_group.add(cream_edge_lobes);

  const cream_dollopsGeom = new THREE.SphereGeometry(1, 20, 14);
  const cream_dollops = new THREE.InstancedMesh(
    cream_dollopsGeom,
    creamMat,
    20
  );
  cream_dollops.name = "cream_dollops";
  for (let i = 0; i < 20; i++) {
    let angle;
    let radius;
    let sx;
    let sy;
    let sz;
    if (i < 12) {
      angle = i / 12 * Math.PI * 2 + 0.12;
      radius = 0.58 + 0.055 * Math.sin(i * 1.7);
      sx = 0.31 + 0.045 * ((i % 3) / 2);
      sy = 0.17 + 0.035 * (((i * 5) % 7) / 6);
      sz = 0.29 + 0.045 * (((i * 3) % 5) / 4);
    } else {
      angle = (i - 12) / 8 * Math.PI * 2 + 0.4;
      radius = 0.22 + 0.035 * ((i - 12) % 3);
      sx = 0.29 + 0.035 * ((i - 12) % 3);
      sy = 0.20 + 0.025 * (((i - 12) * 3) % 5) / 4;
      sz = 0.28 + 0.035 * (((i - 12) * 5) % 7) / 6;
    }
    cream_dummy.position.set(
      Math.cos(angle) * radius,
      0.79 + 0.025 * Math.sin(i * 1.4),
      Math.sin(angle) * radius * 0.92
    );
    cream_dummy.rotation.set(i * 0.13, -angle, i * 0.19);
    cream_dummy.scale.set(sx, sy, sz);
    cream_dummy.updateMatrix();
    cream_dollops.setMatrixAt(i, cream_dummy.matrix);
  }
  cream_dollops.instanceMatrix.needsUpdate = true;
  cream_group.add(cream_dollops);

  const cream_swirlPoints = [];
  for (let i = 0; i <= 28; i++) {
    const t = i / 28;
    const angle = t * Math.PI * 3.2;
    const radius = 0.70 * (1 - t) + 0.07;
    cream_swirlPoints.push(new THREE.Vector3(
      Math.cos(angle) * radius,
      0.945 + 0.018 * Math.sin(t * Math.PI * 4),
      Math.sin(angle) * radius * 0.90
    ));
  }
  const cream_swirlCurve = new THREE.CatmullRomCurve3(cream_swirlPoints);
  const cream_swirlGeom = new THREE.TubeGeometry(
    cream_swirlCurve,
    72,
    0.035,
    8,
    false
  );
  const cream_swirl = new THREE.Mesh(cream_swirlGeom, creamMat);
  cream_swirl.name = "cream_swirl";
  cream_group.add(cream_swirl);

  const cream_textureGeom = new THREE.SphereGeometry(1, 8, 6);
  const cream_texture = new THREE.InstancedMesh(
    cream_textureGeom,
    creamMat,
    96
  );
  cream_texture.name = "cream_texture";
  for (let i = 0; i < 96; i++) {
    const angle = i * 2.399963229728653;
    const radial = 0.90 * Math.sqrt(((i * 37) % 97) / 96);
    const x = Math.cos(angle) * radial;
    const z = Math.sin(angle) * radial * 0.90;
    const y = 0.94 + 0.025 * Math.sin(i * 1.73) - radial * 0.025;
    const size = 0.018 + 0.026 * (((i * 11) % 19) / 18);
    cream_dummy.position.set(x, y, z);
    cream_dummy.rotation.set(i * 0.27, i * 0.16, i * 0.31);
    cream_dummy.scale.set(size * 1.25, size * 0.75, size);
    cream_dummy.updateMatrix();
    cream_texture.setMatrixAt(i, cream_dummy.matrix);
  }
  cream_texture.instanceMatrix.needsUpdate = true;
  cream_group.add(cream_texture);

  const cream_sugar = new THREE.InstancedMesh(
    top_sugarGeom,
    powdered_sugarMat,
    62
  );
  cream_sugar.name = "cream_sugar";
  for (let i = 0; i < 62; i++) {
    const angle = i * 2.399963229728653 + 0.2;
    const radial = 0.92 * Math.sqrt(((i * 23) % 63) / 62);
    const x = Math.cos(angle) * radial;
    const z = Math.sin(angle) * radial * 0.90;
    const y = 0.955 + 0.018 * Math.sin(i * 1.37) - radial * 0.025;
    const size = 0.009 + 0.017 * (((i * 7) % 13) / 12);
    sugar_dummy.position.set(x, y, z);
    sugar_dummy.rotation.set(i * 0.43, i * 0.21, i * 0.33);
    sugar_dummy.scale.set(size, size * 0.75, size * 1.2);
    sugar_dummy.updateMatrix();
    cream_sugar.setMatrixAt(i, sugar_dummy.matrix);
  }
  cream_sugar.instanceMatrix.needsUpdate = true;
  cream_group.add(cream_sugar);

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