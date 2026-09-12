// miner-diag: gpus=? tflops=? stream48=? power=? probe_tps=3831 cpu_quota=?/? net=? batch=2 wall=1559 seed=870128282
export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "ornate_wooden_box";

  const bodyW = 1.42;
  const bodyD = 1.12;
  const bodyH = 0.62;
  const bodyY = 0.50;
  const panelH = 0.47;
  const panelY = 0.50;

  const woodMat = new THREE.MeshStandardMaterial({
    color: 0x754326,
    metalness: 0.0,
    roughness: 0.6,
  });
  const panelMat = new THREE.MeshStandardMaterial({
    color: 0x67371f,
    metalness: 0.0,
    roughness: 0.6,
  });
  const edgeWoodMat = new THREE.MeshStandardMaterial({
    color: 0x8a512d,
    metalness: 0.0,
    roughness: 0.6,
  });
  const interiorWoodMat = new THREE.MeshStandardMaterial({
    color: 0x482719,
    metalness: 0.0,
    roughness: 0.9,
  });
  const carvedWoodMat = new THREE.MeshStandardMaterial({
    color: 0x925832,
    metalness: 0.0,
    roughness: 0.6,
  });
  const grainMat = new THREE.MeshStandardMaterial({
    color: 0x2f1a11,
    metalness: 0.0,
    roughness: 0.9,
  });
  const bronzeMat = new THREE.MeshStandardMaterial({
    color: 0x76664f,
    metalness: 0.5,
    roughness: 0.5,
  });
  const darkBronzeMat = new THREE.MeshStandardMaterial({
    color: 0x4b4337,
    metalness: 0.5,
    roughness: 0.5,
  });
  const handleWoodMat = new THREE.MeshStandardMaterial({
    color: 0x6d3b22,
    metalness: 0.0,
    roughness: 0.6,
  });

  function addBox(name, w, h, d, mat, x, y, z) {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
    mesh.name = name;
    mesh.position.set(x, y, z);
    root.add(mesh);
    return mesh;
  }

  function addTube(name, points, radius, mat, segments) {
    const curve = new THREE.CatmullRomCurve3(points, false, "centripetal");
    const geom = new THREE.TubeGeometry(curve, segments || 24, radius, 7, false);
    const mesh = new THREE.Mesh(geom, mat);
    mesh.name = name;
    root.add(mesh);
    return mesh;
  }

  const base_plinth = addBox("base_plinth", 1.62, 0.16, 1.30, woodMat, 0, 0.08, 0);
  const base_upper_molding = addBox("base_upper_molding", 1.56, 0.07, 1.24, edgeWoodMat, 0, 0.18, 0);
  const base_front_round = new THREE.Mesh(
    new THREE.CylinderGeometry(0.035, 0.035, 1.56, 12),
    edgeWoodMat
  );
  base_front_round.name = "base_front_round";
  base_front_round.rotation.z = Math.PI / 2;
  base_front_round.position.set(0, 0.18, 0.62);
  root.add(base_front_round);

  const base_right_round = new THREE.Mesh(
    new THREE.CylinderGeometry(0.035, 0.035, 1.22, 12),
    edgeWoodMat
  );
  base_right_round.name = "base_right_round";
  base_right_round.rotation.x = Math.PI / 2;
  base_right_round.position.set(0.78, 0.18, 0);
  root.add(base_right_round);

  const footGeom = new THREE.BoxGeometry(0.28, 0.11, 0.24);
  const feet = new THREE.InstancedMesh(footGeom, woodMat, 4);
  feet.name = "feet";
  const footMatrix = new THREE.Matrix4();
  const footPositions = [
    [-0.58, -0.015, 0.48],
    [0.58, -0.015, 0.48],
    [-0.58, -0.015, -0.48],
    [0.58, -0.015, -0.48],
  ];
  for (let i = 0; i < footPositions.length; i++) {
    const p = footPositions[i];
    footMatrix.makeTranslation(p[0], p[1], p[2]);
    feet.setMatrixAt(i, footMatrix);
  }
  feet.instanceMatrix.needsUpdate = true;
  root.add(feet);

  const front_panel = addBox("front_panel", 1.20, panelH, 0.06, panelMat, 0, panelY, bodyD / 2);
  const right_panel = addBox("right_panel", 0.06, panelH, 0.90, panelMat, bodyW / 2, panelY, 0);
  const back_panel = addBox("back_panel", 1.20, panelH, 0.06, panelMat, 0, panelY, -bodyD / 2);
  const left_panel = addBox("left_panel", 0.06, panelH, 0.90, panelMat, -bodyW / 2, panelY, 0);

  const front_left_post = addBox("front_left_post", 0.11, bodyH, 0.11, woodMat, -0.66, bodyY, 0.56);
  const front_right_post = addBox("front_right_post", 0.11, bodyH, 0.11, woodMat, 0.66, bodyY, 0.56);
  const back_left_post = addBox("back_left_post", 0.11, bodyH, 0.11, woodMat, -0.66, bodyY, -0.56);
  const back_right_post = addBox("back_right_post", 0.11, bodyH, 0.11, woodMat, 0.66, bodyY, -0.56);

  const front_top_rail = addBox("front_top_rail", 1.40, 0.10, 0.10, woodMat, 0, 0.79, 0.56);
  const front_bottom_rail = addBox("front_bottom_rail", 1.40, 0.10, 0.10, woodMat, 0, 0.22, 0.56);
  const right_top_rail = addBox("right_top_rail", 0.10, 0.10, 1.10, woodMat, 0.71, 0.79, 0);
  const right_bottom_rail = addBox("right_bottom_rail", 0.10, 0.10, 1.10, woodMat, 0.71, 0.22, 0);
  const back_top_rail = addBox("back_top_rail", 1.40, 0.10, 0.10, woodMat, 0, 0.79, -0.56);
  const back_bottom_rail = addBox("back_bottom_rail", 1.40, 0.10, 0.10, woodMat, 0, 0.22, -0.56);
  const left_top_rail = addBox("left_top_rail", 0.10, 0.10, 1.10, woodMat, -0.71, 0.79, 0);
  const left_bottom_rail = addBox("left_bottom_rail", 0.10, 0.10, 1.10, woodMat, -0.71, 0.22, 0);

  const interior_bottom = addBox("interior_bottom", 1.18, 0.045, 0.86, interiorWoodMat, 0, 0.27, 0);
  const interior_back_wall = addBox("interior_back_wall", 1.18, 0.45, 0.035, interiorWoodMat, 0, 0.50, -0.49);
  const interior_left_wall = addBox("interior_left_wall", 0.035, 0.45, 0.86, interiorWoodMat, -0.64, 0.50, 0);
  const interior_right_wall = addBox("interior_right_wall", 0.035, 0.45, 0.86, interiorWoodMat, 0.64, 0.50, 0);
  const interior_front_wall = addBox("interior_front_wall", 1.18, 0.45, 0.035, interiorWoodMat, 0, 0.50, 0.49);

  const front_top_molding = new THREE.Mesh(
    new THREE.CylinderGeometry(0.026, 0.026, 1.38, 12),
    edgeWoodMat
  );
  front_top_molding.name = "front_top_molding";
  front_top_molding.rotation.z = Math.PI / 2;
  front_top_molding.position.set(0, 0.82, 0.615);
  root.add(front_top_molding);

  const right_top_molding = new THREE.Mesh(
    new THREE.CylinderGeometry(0.026, 0.026, 1.08, 12),
    edgeWoodMat
  );
  right_top_molding.name = "right_top_molding";
  right_top_molding.rotation.x = Math.PI / 2;
  right_top_molding.position.set(0.765, 0.82, 0);
  root.add(right_top_molding);

  const lid_front_rim = addBox("lid_front_rim", 1.58, 0.16, 0.20, woodMat, 0, 0.88, 0.56);
  const lid_back_rim = addBox("lid_back_rim", 1.58, 0.16, 0.20, woodMat, 0, 0.88, -0.56);
  const lid_left_rim = addBox("lid_left_rim", 0.20, 0.16, 0.92, woodMat, -0.69, 0.88, 0);
  const lid_right_rim = addBox("lid_right_rim", 0.20, 0.16, 0.92, woodMat, 0.69, 0.88, 0);

  const lid_front_outer_molding = new THREE.Mesh(
    new THREE.CylinderGeometry(0.035, 0.035, 1.58, 14),
    edgeWoodMat
  );
  lid_front_outer_molding.name = "lid_front_outer_molding";
  lid_front_outer_molding.rotation.z = Math.PI / 2;
  lid_front_outer_molding.position.set(0, 0.94, 0.66);
  root.add(lid_front_outer_molding);

  const lid_back_outer_molding = new THREE.Mesh(
    new THREE.CylinderGeometry(0.035, 0.035, 1.58, 14),
    edgeWoodMat
  );
  lid_back_outer_molding.name = "lid_back_outer_molding";
  lid_back_outer_molding.rotation.z = Math.PI / 2;
  lid_back_outer_molding.position.set(0, 0.94, -0.66);
  root.add(lid_back_outer_molding);

  const lid_left_outer_molding = new THREE.Mesh(
    new THREE.CylinderGeometry(0.035, 0.035, 1.22, 14),
    edgeWoodMat
  );
  lid_left_outer_molding.name = "lid_left_outer_molding";
  lid_left_outer_molding.rotation.x = Math.PI / 2;
  lid_left_outer_molding.position.set(-0.79, 0.94, 0);
  root.add(lid_left_outer_molding);

  const lid_right_outer_molding = new THREE.Mesh(
    new THREE.CylinderGeometry(0.035, 0.035, 1.22, 14),
    edgeWoodMat
  );
  lid_right_outer_molding.name = "lid_right_outer_molding";
  lid_right_outer_molding.rotation.x = Math.PI / 2;
  lid_right_outer_molding.position.set(0.79, 0.94, 0);
  root.add(lid_right_outer_molding);

  const lid_front_inner_lip = new THREE.Mesh(
    new THREE.CylinderGeometry(0.018, 0.018, 1.20, 10),
    grainMat
  );
  lid_front_inner_lip.name = "lid_front_inner_lip";
  lid_front_inner_lip.rotation.z = Math.PI / 2;
  lid_front_inner_lip.position.set(0, 0.89, 0.455);
  root.add(lid_front_inner_lip);

  const lid_right_inner_lip = new THREE.Mesh(
    new THREE.CylinderGeometry(0.018, 0.018, 0.88, 10),
    grainMat
  );
  lid_right_inner_lip.name = "lid_right_inner_lip";
  lid_right_inner_lip.rotation.x = Math.PI / 2;
  lid_right_inner_lip.position.set(0.585, 0.89, 0);
  root.add(lid_right_inner_lip);

  const front_scrollwork = new THREE.Group();
  front_scrollwork.name = "front_scrollwork";
  root.add(front_scrollwork);

  function addFrontScroll(name, coords, radius) {
    const points = coords.map((p) => new THREE.Vector3(p[0], p[1], 0.604));
    const scroll = new THREE.Mesh(
      new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points, false, "centripetal"), 28, radius || 0.014, 7, false),
      carvedWoodMat
    );
    scroll.name = name;
    front_scrollwork.add(scroll);
    return scroll;
  }

  addFrontScroll("front_upper_left_scroll", [
    [-0.56, 0.66], [-0.48, 0.72], [-0.36, 0.70], [-0.30, 0.62],
    [-0.34, 0.55], [-0.43, 0.55], [-0.47, 0.61], [-0.42, 0.66], [-0.36, 0.64],
  ]);
  addFrontScroll("front_upper_right_scroll", [
    [0.56, 0.66], [0.48, 0.72], [0.36, 0.70], [0.30, 0.62],
    [0.34, 0.55], [0.43, 0.55], [0.47, 0.61], [0.42, 0.66], [0.36, 0.64],
  ]);
  addFrontScroll("front_center_left_scroll", [
    [-0.03, 0.58], [-0.12, 0.66], [-0.24, 0.66], [-0.30, 0.59],
    [-0.27, 0.52], [-0.19, 0.51], [-0.16, 0.56],
  ]);
  addFrontScroll("front_center_right_scroll", [
    [0.03, 0.58], [0.12, 0.66], [0.24, 0.66], [0.30, 0.59],
    [0.27, 0.52], [0.19, 0.51], [0.16, 0.56],
  ]);
  addFrontScroll("front_lower_left_scroll", [
    [-0.56, 0.31], [-0.48, 0.24], [-0.36, 0.25], [-0.30, 0.33],
    [-0.34, 0.41], [-0.43, 0.42], [-0.48, 0.36], [-0.44, 0.31], [-0.37, 0.32],
  ]);
  addFrontScroll("front_lower_right_scroll", [
    [0.56, 0.31], [0.48, 0.24], [0.36, 0.25], [0.30, 0.33],
    [0.34, 0.41], [0.43, 0.42], [0.48, 0.36], [0.44, 0.31], [0.37, 0.32],
  ]);
  addFrontScroll("front_bottom_center_scroll", [
    [-0.28, 0.27], [-0.18, 0.22], [-0.08, 0.25], [0, 0.31],
    [0.08, 0.25], [0.18, 0.22], [0.28, 0.27],
  ]);

  const front_leafGeom = new THREE.SphereGeometry(1, 12, 6);
  const front_carved_leaves = new THREE.InstancedMesh(front_leafGeom, carvedWoodMat, 10);
  front_carved_leaves.name = "front_carved_leaves";
  const frontLeafData = [
    [-0.51, 0.43, -0.75], [-0.40, 0.48, 0.75], [-0.27, 0.39, -0.45],
    [0.51, 0.43, 0.75], [0.40, 0.48, -0.75], [0.27, 0.39, 0.45],
    [-0.18, 0.64, -0.35], [0.18, 0.64, 0.35], [-0.17, 0.29, 0.55], [0.17, 0.29, -0.55],
  ];
  const leafMatrix = new THREE.Matrix4();
  const leafQuat = new THREE.Quaternion();
  const leafScale = new THREE.Vector3(0.065, 0.025, 0.012);
  for (let i = 0; i < frontLeafData.length; i++) {
    const d = frontLeafData[i];
    leafQuat.setFromEuler(new THREE.Euler(0, 0, d[2]));
    leafMatrix.compose(new THREE.Vector3(d[0], d[1], 0.607), leafQuat, leafScale);
    front_carved_leaves.setMatrixAt(i, leafMatrix);
  }
  front_carved_leaves.instanceMatrix.needsUpdate = true;
  root.add(front_carved_leaves);

  const front_rosetteGeom = new THREE.TorusGeometry(0.045, 0.011, 8, 20);
  const front_carved_rosettes = new THREE.InstancedMesh(front_rosetteGeom, carvedWoodMat, 4);
  front_carved_rosettes.name = "front_carved_rosettes";
  const rosetteMatrix = new THREE.Matrix4();
  const rosettePositions = [
    [-0.49, 0.31], [0.49, 0.31], [-0.49, 0.67], [0.49, 0.67],
  ];
  for (let i = 0; i < rosettePositions.length; i++) {
    rosetteMatrix.makeTranslation(rosettePositions[i][0], rosettePositions[i][1], 0.608);
    front_carved_rosettes.setMatrixAt(i, rosetteMatrix);
  }
  front_carved_rosettes.instanceMatrix.needsUpdate = true;
  root.add(front_carved_rosettes);

  const right_scrollwork = new THREE.Group();
  right_scrollwork.name = "right_scrollwork";
  root.add(right_scrollwork);

  function addRightScroll(name, coords, radius) {
    const points = coords.map((p) => new THREE.Vector3(0.744, p[1], p[0]));
    const scroll = new THREE.Mesh(
      new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points, false, "centripetal"), 28, radius || 0.014, 7, false),
      carvedWoodMat
    );
    scroll.name = name;
    right_scrollwork.add(scroll);
    return scroll;
  }

  addRightScroll("right_upper_front_scroll", [
    [0.42, 0.66], [0.34, 0.72], [0.22, 0.70], [0.16, 0.62],
    [0.20, 0.55], [0.29, 0.55], [0.33, 0.61], [0.28, 0.66], [0.22, 0.64],
  ]);
  addRightScroll("right_upper_back_scroll", [
    [-0.42, 0.66], [-0.34, 0.72], [-0.22, 0.70], [-0.16, 0.62],
    [-0.20, 0.55], [-0.29, 0.55], [-0.33, 0.61], [-0.28, 0.66], [-0.22, 0.64],
  ]);
  addRightScroll("right_lower_front_scroll", [
    [0.42, 0.31], [0.34, 0.24], [0.22, 0.25], [0.16, 0.33],
    [0.20, 0.41], [0.29, 0.42], [0.33, 0.36], [0.28, 0.31], [0.22, 0.32],
  ]);
  addRightScroll("right_lower_back_scroll", [
    [-0.42, 0.31], [-0.34, 0.24], [-0.22, 0.25], [-0.16, 0.33],
    [-0.20, 0.41], [-0.29, 0.42], [-0.33, 0.36], [-0.28, 0.31], [-0.22, 0.32],
  ]);
  addRightScroll("right_center_scroll", [
    [-0.22, 0.50], [-0.12, 0.57], [0, 0.55], [0.10, 0.48],
    [0.02, 0.43], [-0.08, 0.46], [-0.10, 0.51],
  ]);

  const right_carved_leaves = new THREE.InstancedMesh(front_leafGeom, carvedWoodMat, 8);
  right_carved_leaves.name = "right_carved_leaves";
  const rightLeafData = [
    [0.36, 0.43, -0.7], [-0.36, 0.43, 0.7], [0.25, 0.64, -0.4],
    [-0.25, 0.64, 0.4], [0.25, 0.28, 0.5], [-0.25, 0.28, -0.5],
    [0.08, 0.55, 0.2], [-0.08, 0.47, -0.2],
  ];
  for (let i = 0; i < rightLeafData.length; i++) {
    const d = rightLeafData[i];
    leafQuat.setFromEuler(new THREE.Euler(d[2], 0, 0));
    leafMatrix.compose(new THREE.Vector3(0.747, d[1], d[0]), leafQuat, leafScale);
    right_carved_leaves.setMatrixAt(i, leafMatrix);
  }
  right_carved_leaves.instanceMatrix.needsUpdate = true;
  root.add(right_carved_leaves);

  const lid_front_scrollwork = new THREE.Group();
  lid_front_scrollwork.name = "lid_front_scrollwork";
  root.add(lid_front_scrollwork);

  function addLidFrontScroll(name, coords) {
    const points = coords.map((p) => new THREE.Vector3(p[0], p[1], 0.666));
    const scroll = new THREE.Mesh(
      new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points, false, "centripetal"), 24, 0.011, 7, false),
      carvedWoodMat
    );
    scroll.name = name;
    lid_front_scrollwork.add(scroll);
    return scroll;
  }

  addLidFrontScroll("lid_left_leaf_scroll", [
    [-0.66, 0.90], [-0.58, 0.95], [-0.49, 0.92], [-0.43, 0.87],
    [-0.35, 0.90], [-0.27, 0.87],
  ]);
  addLidFrontScroll("lid_center_leaf_scroll", [
    [-0.24, 0.88], [-0.14, 0.95], [-0.04, 0.91], [0.05, 0.87],
    [0.15, 0.94], [0.25, 0.89],
  ]);
  addLidFrontScroll("lid_right_leaf_scroll", [
    [0.28, 0.88], [0.36, 0.95], [0.45, 0.92], [0.51, 0.87],
    [0.59, 0.91], [0.67, 0.88],
  ]);

  const lid_front_shellGeom = new THREE.TorusGeometry(
    0.052, 0.010, 7, 18, Math.PI * 1.55
  );
  const lid_front_shells = new THREE.InstancedMesh(lid_front_shellGeom, carvedWoodMat, 5);
  lid_front_shells.name = "lid_front_shells";
  const shellMatrix = new THREE.Matrix4();
  const shellQuat = new THREE.Quaternion();
  const shellScale = new THREE.Vector3(1, 0.72, 1);
  const shellData = [
    [-0.55, 0.905, 0.2], [-0.27, 0.91, -0.25], [0, 0.905, 0.1],
    [0.28, 0.91, 0.3], [0.56, 0.905, -0.2],
  ];
  for (let i = 0; i < shellData.length; i++) {
    const d = shellData[i];
    shellQuat.setFromEuler(new THREE.Euler(0, 0, d[2]));
    shellMatrix.compose(new THREE.Vector3(d[0], d[1], 0.669), shellQuat, shellScale);
    lid_front_shells.setMatrixAt(i, shellMatrix);
  }
  lid_front_shells.instanceMatrix.needsUpdate = true;
  root.add(lid_front_shells);

  const lid_right_scrollwork = new THREE.Group();
  lid_right_scrollwork.name = "lid_right_scrollwork";
  root.add(lid_right_scrollwork);

  function addLidRightScroll(name, coords) {
    const points = coords.map((p) => new THREE.Vector3(0.796, p[1], p[0]));
    const scroll = new THREE.Mesh(
      new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points, false, "centripetal"), 24, 0.011, 7, false),
      carvedWoodMat
    );
    scroll.name = name;
    lid_right_scrollwork.add(scroll);
    return scroll;
  }

  addLidRightScroll("lid_right_front_scroll", [
    [0.42, 0.90], [0.34, 0.95], [0.25, 0.92], [0.18, 0.87], [0.10, 0.91],
  ]);
  addLidRightScroll("lid_right_center_scroll", [
    [0.10, 0.89], [0.02, 0.95], [-0.07, 0.91], [-0.15, 0.87], [-0.23, 0.92],
  ]);
  addLidRightScroll("lid_right_back_scroll", [
    [-0.23, 0.90], [-0.31, 0.95], [-0.39, 0.92], [-0.45, 0.87], [-0.50, 0.90],
  ]);

  const front_handle_mountGeom = new THREE.CylinderGeometry(0.068, 0.068, 0.026, 18);
  const front_handle_mounts = new THREE.InstancedMesh(front_handle_mountGeom, darkBronzeMat, 2);
  front_handle_mounts.name = "front_handle_mounts";
  const mountQuat = new THREE.Quaternion().setFromEuler(new THREE.Euler(Math.PI / 2, 0, 0));
  const mountScale = new THREE.Vector3(1, 1, 1);
  const mountMatrix = new THREE.Matrix4();
  for (let i = 0; i < 2; i++) {
    mountMatrix.compose(
      new THREE.Vector3(i === 0 ? -0.23 : 0.23, 0.57, 0.628),
      mountQuat,
      mountScale
    );
    front_handle_mounts.setMatrixAt(i, mountMatrix);
  }
  front_handle_mounts.instanceMatrix.needsUpdate = true;
  root.add(front_handle_mounts);

  const front_handle_pinGeom = new THREE.SphereGeometry(0.038, 14, 8);
  const front_handle_pins = new THREE.InstancedMesh(front_handle_pinGeom, bronzeMat, 2);
  front_handle_pins.name = "front_handle_pins";
  for (let i = 0; i < 2; i++) {
    mountMatrix.makeTranslation(i === 0 ? -0.23 : 0.23, 0.57, 0.655);
    front_handle_pins.setMatrixAt(i, mountMatrix);
  }
  front_handle_pins.instanceMatrix.needsUpdate = true;
  root.add(front_handle_pins);

  const front_handle = addTube("front_handle", [
    new THREE.Vector3(-0.23, 0.57, 0.665),
    new THREE.Vector3(-0.22, 0.48, 0.685),
    new THREE.Vector3(-0.17, 0.39, 0.700),
    new THREE.Vector3(0, 0.35, 0.705),
    new THREE.Vector3(0.17, 0.39, 0.700),
    new THREE.Vector3(0.22, 0.48, 0.685),
    new THREE.Vector3(0.23, 0.57, 0.665),
  ], 0.034, handleWoodMat, 36);

  const front_handle_left_collar = new THREE.Mesh(
    new THREE.TorusGeometry(0.045, 0.010, 8, 18),
    bronzeMat
  );
  front_handle_left_collar.name = "front_handle_left_collar";
  front_handle_left_collar.position.set(-0.225, 0.505, 0.688);
  front_handle_left_collar.rotation.z = -0.18;
  root.add(front_handle_left_collar);

  const front_handle_right_collar = new THREE.Mesh(
    new THREE.TorusGeometry(0.045, 0.010, 8, 18),
    bronzeMat
  );
  front_handle_right_collar.name = "front_handle_right_collar";
  front_handle_right_collar.position.set(0.225, 0.505, 0.688);
  front_handle_right_collar.rotation.z = 0.18;
  root.add(front_handle_right_collar);

  const right_handle_mounts = new THREE.InstancedMesh(front_handle_mountGeom, darkBronzeMat, 2);
  right_handle_mounts.name = "right_handle_mounts";
  const sideMountQuat = new THREE.Quaternion().setFromEuler(new THREE.Euler(0, 0, -Math.PI / 2));
  for (let i = 0; i < 2; i++) {
    mountMatrix.compose(
      new THREE.Vector3(0.758, 0.57, i === 0 ? -0.20 : 0.20),
      sideMountQuat,
      mountScale
    );
    right_handle_mounts.setMatrixAt(i, mountMatrix);
  }
  right_handle_mounts.instanceMatrix.needsUpdate = true;
  root.add(right_handle_mounts);

  const right_handle_pins = new THREE.InstancedMesh(front_handle_pinGeom, bronzeMat, 2);
  right_handle_pins.name = "right_handle_pins";
  for (let i = 0; i < 2; i++) {
    mountMatrix.makeTranslation(0.785, 0.57, i === 0 ? -0.20 : 0.20);
    right_handle_pins.setMatrixAt(i, mountMatrix);
  }
  right_handle_pins.instanceMatrix.needsUpdate = true;
  root.add(right_handle_pins);

  const right_handle = addTube("right_handle", [
    new THREE.Vector3(0.785, 0.57, -0.20),
    new THREE.Vector3(0.805, 0.48, -0.19),
    new THREE.Vector3(0.820, 0.39, -0.14),
    new THREE.Vector3(0.825, 0.35, 0),
    new THREE.Vector3(0.820, 0.39, 0.14),
    new THREE.Vector3(0.805, 0.48, 0.19),
    new THREE.Vector3(0.785, 0.57, 0.20),
  ], 0.034, handleWoodMat, 36);

  const front_grainGeom = new THREE.BoxGeometry(0.18, 0.006, 0.006);
  const front_wood_grain = new THREE.InstancedMesh(front_grainGeom, grainMat, 18);
  front_wood_grain.name = "front_wood_grain";
  const grainMatrix = new THREE.Matrix4();
  const grainQuat = new THREE.Quaternion();
  const grainScale = new THREE.Vector3();
  for (let i = 0; i < 18; i++) {
    const row = Math.floor(i / 6);
    const col = i % 6;
    const x = -0.52 + col * 0.205 + (row % 2) * 0.025;
    const y = 0.30 + row * 0.18 + ((i * 3) % 5 - 2) * 0.008;
    const sx = 0.55 + ((i * 7) % 5) * 0.12;
    grainQuat.setFromEuler(new THREE.Euler(0, 0, ((i % 3) - 1) * 0.035));
    grainScale.set(sx, 1, 1);
    grainMatrix.compose(new THREE.Vector3(x, y, 0.594), grainQuat, grainScale);
    front_wood_grain.setMatrixAt(i, grainMatrix);
  }
  front_wood_grain.instanceMatrix.needsUpdate = true;
  root.add(front_wood_grain);

  const right_wood_grain = new THREE.InstancedMesh(front_grainGeom, grainMat, 14);
  right_wood_grain.name = "right_wood_grain";
  for (let i = 0; i < 14; i++) {
    const row = Math.floor(i / 7);
    const col = i % 7;
    const z = -0.38 + col * 0.125 + (row % 2) * 0.018;
    const y = 0.31 + row * 0.34 + ((i * 5) % 7 - 3) * 0.007;
    const sx = 0.52 + ((i * 4) % 5) * 0.11;
    grainQuat.setFromEuler(new THREE.Euler(0, Math.PI / 2, ((i % 3) - 1) * 0.035));
    grainScale.set(sx, 1, 1);
    grainMatrix.compose(new THREE.Vector3(0.734, y, z), grainQuat, grainScale);
    right_wood_grain.setMatrixAt(i, grainMatrix);
  }
  right_wood_grain.instanceMatrix.needsUpdate = true;
  root.add(right_wood_grain);

  const interior_back_grain = new THREE.InstancedMesh(front_grainGeom, grainMat, 10);
  interior_back_grain.name = "interior_back_grain";
  for (let i = 0; i < 10; i++) {
    const x = -0.48 + (i % 5) * 0.22;
    const y = 0.34 + Math.floor(i / 5) * 0.28 + (i % 2) * 0.025;
    grainQuat.setFromEuler(new THREE.Euler(0, 0, ((i % 3) - 1) * 0.025));
    grainScale.set(0.65 + (i % 4) * 0.12, 1, 1);
    grainMatrix.compose(new THREE.Vector3(x, y, -0.468), grainQuat, grainScale);
    interior_back_grain.setMatrixAt(i, grainMatrix);
  }
  interior_back_grain.instanceMatrix.needsUpdate = true;
  root.add(interior_back_grain);

  fitToUnitCube(root);
  return root;

  function fitToUnitCube(object) {
    const box = new THREE.Box3().setFromObject(object);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    const scale = 0.95 / maxDim;
    object.scale.setScalar(scale);
    object.position.set(-center.x * scale, -center.y * scale, -center.z * scale);
  }
}