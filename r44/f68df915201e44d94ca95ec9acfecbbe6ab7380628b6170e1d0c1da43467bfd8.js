// miner-diag: gpus=? tflops=? stream48=? power=? probe_tps=3831 cpu_quota=?/? net=? batch=2 wall=1559 seed=870128282
export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "ornate_wooden_box";

  const base_group = new THREE.Group();
  base_group.name = "base_group";
  const body_group = new THREE.Group();
  body_group.name = "body_group";
  const lid_group = new THREE.Group();
  lid_group.name = "lid_group";
  const hardware_group = new THREE.Group();
  hardware_group.name = "hardware_group";
  root.add(base_group, body_group, lid_group, hardware_group);

  const woodMat = new THREE.MeshStandardMaterial({
    color: 0x8b5432,
    metalness: 0.0,
    roughness: 0.6
  });
  const panelMat = new THREE.MeshStandardMaterial({
    color: 0x754126,
    metalness: 0.0,
    roughness: 0.6
  });
  const edgeWoodMat = new THREE.MeshStandardMaterial({
    color: 0x9b6038,
    metalness: 0.0,
    roughness: 0.6
  });
  const carvedWoodMat = new THREE.MeshStandardMaterial({
    color: 0x382015,
    metalness: 0.0,
    roughness: 0.9
  });
  const brassMat = new THREE.MeshStandardMaterial({
    color: 0xb08a3c,
    metalness: 0.6,
    roughness: 0.2
  });
  const darkBrassMat = new THREE.MeshStandardMaterial({
    color: 0x705522,
    metalness: 0.6,
    roughness: 0.2
  });
  const keyholeMat = new THREE.MeshStandardMaterial({
    color: 0x120d09,
    metalness: 0.0,
    roughness: 0.8
  });

  function roundedRectShape(width, height, radius) {
    const shape = new THREE.Shape();
    const x0 = -width / 2;
    const x1 = width / 2;
    const y0 = -height / 2;
    const y1 = height / 2;
    const r = Math.min(radius, width / 2, height / 2);

    shape.moveTo(x0 + r, y0);
    shape.lineTo(x1 - r, y0);
    shape.quadraticCurveTo(x1, y0, x1, y0 + r);
    shape.lineTo(x1, y1 - r);
    shape.quadraticCurveTo(x1, y1, x1 - r, y1);
    shape.lineTo(x0 + r, y1);
    shape.quadraticCurveTo(x0, y1, x0, y1 - r);
    shape.lineTo(x0, y0 + r);
    shape.quadraticCurveTo(x0, y0, x0 + r, y0);
    return shape;
  }

  function roundedBoxGeometry(width, height, depth, radius, bevel) {
    const shape = roundedRectShape(width, height, radius);
    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth: depth,
      steps: 1,
      curveSegments: 8,
      bevelEnabled: bevel > 0,
      bevelThickness: bevel,
      bevelSize: bevel,
      bevelSegments: 2
    });
    geometry.translate(0, 0, -depth / 2);
    return geometry;
  }

  function addTubePath(parent, name, coordinates, radius, material, closed) {
    const points = [];
    for (let i = 0; i < coordinates.length; i++) {
      const p = coordinates[i];
      points.push(new THREE.Vector3(p[0], p[1], p[2]));
    }
    const curve = new THREE.CatmullRomCurve3(
      points,
      closed === true,
      "centripetal"
    );
    const geometry = new THREE.TubeGeometry(
      curve,
      Math.max(16, coordinates.length * 5),
      radius,
      6,
      closed === true
    );
    const mesh = new THREE.Mesh(geometry, material);
    mesh.name = name;
    parent.add(mesh);
    return mesh;
  }

  function addFrontTube(parent, name, coordinates, radius, material, closed) {
    const points = [];
    for (let i = 0; i < coordinates.length; i++) {
      points.push(new THREE.Vector3(coordinates[i][0], coordinates[i][1], 0));
    }
    const curve = new THREE.CatmullRomCurve3(
      points,
      closed === true,
      "centripetal"
    );
    const geometry = new THREE.TubeGeometry(
      curve,
      Math.max(16, coordinates.length * 5),
      radius,
      6,
      closed === true
    );
    const mesh = new THREE.Mesh(geometry, material);
    mesh.name = name;
    parent.add(mesh);
    return mesh;
  }

  function addTopTube(parent, name, coordinates, radius, material, closed) {
    const points = [];
    for (let i = 0; i < coordinates.length; i++) {
      points.push(new THREE.Vector3(coordinates[i][0], 0, coordinates[i][1]));
    }
    const curve = new THREE.CatmullRomCurve3(
      points,
      closed === true,
      "centripetal"
    );
    const geometry = new THREE.TubeGeometry(
      curve,
      Math.max(16, coordinates.length * 5),
      radius,
      6,
      closed === true
    );
    const mesh = new THREE.Mesh(geometry, material);
    mesh.name = name;
    parent.add(mesh);
    return mesh;
  }

  const base_plinthGeom = roundedBoxGeometry(2.48, 0.14, 1.40, 0.07, 0.025);
  const base_plinth = new THREE.Mesh(base_plinthGeom, edgeWoodMat);
  base_plinth.name = "base_plinth";
  base_plinth.position.y = 0.07;
  base_group.add(base_plinth);

  const base_upper_moldingGeom = roundedBoxGeometry(2.40, 0.08, 1.32, 0.045, 0.018);
  const base_upper_molding = new THREE.Mesh(base_upper_moldingGeom, woodMat);
  base_upper_molding.name = "base_upper_molding";
  base_upper_molding.position.y = 0.17;
  base_group.add(base_upper_molding);

  const base_front_trimGeom = new THREE.BoxGeometry(2.30, 0.035, 0.025);
  const base_front_trim = new THREE.Mesh(base_front_trimGeom, carvedWoodMat);
  base_front_trim.name = "base_front_trim";
  base_front_trim.position.set(0, 0.145, 0.714);
  base_group.add(base_front_trim);

  const base_side_trimGeom = new THREE.BoxGeometry(0.025, 0.035, 1.20);
  const base_left_trim = new THREE.Mesh(base_side_trimGeom, carvedWoodMat);
  base_left_trim.name = "base_left_trim";
  base_left_trim.position.set(-1.254, 0.145, 0);
  base_group.add(base_left_trim);

  const base_right_trim = new THREE.Mesh(base_side_trimGeom, carvedWoodMat);
  base_right_trim.name = "base_right_trim";
  base_right_trim.position.set(1.254, 0.145, 0);
  base_group.add(base_right_trim);

  const body_shellGeom = roundedBoxGeometry(2.34, 0.62, 1.26, 0.045, 0.022);
  const body_shell = new THREE.Mesh(body_shellGeom, woodMat);
  body_shell.name = "body_shell";
  body_shell.position.y = 0.49;
  body_group.add(body_shell);

  const corner_postGeom = new THREE.BoxGeometry(0.105, 0.59, 0.105);
  const front_left_corner_post = new THREE.Mesh(corner_postGeom, edgeWoodMat);
  front_left_corner_post.name = "front_left_corner_post";
  front_left_corner_post.position.set(-1.13, 0.49, 0.615);
  body_group.add(front_left_corner_post);

  const front_right_corner_post = new THREE.Mesh(corner_postGeom, edgeWoodMat);
  front_right_corner_post.name = "front_right_corner_post";
  front_right_corner_post.position.set(1.13, 0.49, 0.615);
  body_group.add(front_right_corner_post);

  const rear_left_corner_post = new THREE.Mesh(corner_postGeom, edgeWoodMat);
  rear_left_corner_post.name = "rear_left_corner_post";
  rear_left_corner_post.position.set(-1.13, 0.49, -0.615);
  body_group.add(rear_left_corner_post);

  const rear_right_corner_post = new THREE.Mesh(corner_postGeom, edgeWoodMat);
  rear_right_corner_post.name = "rear_right_corner_post";
  rear_right_corner_post.position.set(1.13, 0.49, -0.615);
  body_group.add(rear_right_corner_post);

  const front_panelGeom = new THREE.BoxGeometry(2.12, 0.46, 0.025);
  const front_panel = new THREE.Mesh(front_panelGeom, panelMat);
  front_panel.name = "front_panel";
  front_panel.position.set(0, 0.49, 0.665);
  body_group.add(front_panel);

  const side_panelGeom = new THREE.BoxGeometry(0.025, 0.46, 1.06);
  const left_side_panel = new THREE.Mesh(side_panelGeom, panelMat);
  left_side_panel.name = "left_side_panel";
  left_side_panel.position.set(-1.195, 0.49, 0);
  body_group.add(left_side_panel);

  const right_side_panel = new THREE.Mesh(side_panelGeom, panelMat);
  right_side_panel.name = "right_side_panel";
  right_side_panel.position.set(1.195, 0.49, 0);
  body_group.add(right_side_panel);

  const front_panel_border = new THREE.Group();
  front_panel_border.name = "front_panel_border";
  const front_border_horizontalGeom = new THREE.BoxGeometry(2.02, 0.026, 0.018);
  const front_border_verticalGeom = new THREE.BoxGeometry(0.026, 0.40, 0.018);
  for (const y of [0.265, 0.715]) {
    const bar = new THREE.Mesh(front_border_horizontalGeom, carvedWoodMat);
    bar.position.set(0, y, 0.686);
    front_panel_border.add(bar);
  }
  for (const x of [-1.01, 1.01]) {
    const bar = new THREE.Mesh(front_border_verticalGeom, carvedWoodMat);
    bar.position.set(x, 0.49, 0.686);
    front_panel_border.add(bar);
  }
  body_group.add(front_panel_border);

  const side_panel_borders = new THREE.Group();
  side_panel_borders.name = "side_panel_borders";
  const side_border_verticalGeom = new THREE.BoxGeometry(0.018, 0.40, 0.026);
  const side_border_horizontalGeom = new THREE.BoxGeometry(0.018, 0.026, 0.98);
  for (const side of [-1, 1]) {
    for (const z of [-0.49, 0.49]) {
      const bar = new THREE.Mesh(side_border_verticalGeom, carvedWoodMat);
      bar.position.set(side * 1.214, 0.49, z);
      side_panel_borders.add(bar);
    }
    for (const y of [0.265, 0.715]) {
      const bar = new THREE.Mesh(side_border_horizontalGeom, carvedWoodMat);
      bar.position.set(side * 1.214, y, 0);
      side_panel_borders.add(bar);
    }
  }
  body_group.add(side_panel_borders);

  const front_carving = new THREE.Group();
  front_carving.name = "front_carving";
  front_carving.position.z = 0.699;
  body_group.add(front_carving);

  const front_left_scroll = addFrontTube(front_carving, "front_left_scroll", [
    [-0.03, 0.43], [-0.18, 0.31], [-0.38, 0.27], [-0.57, 0.32],
    [-0.68, 0.43], [-0.64, 0.56], [-0.50, 0.61], [-0.39, 0.55],
    [-0.41, 0.45], [-0.50, 0.41], [-0.58, 0.46]
  ], 0.014, carvedWoodMat, false);

  const front_right_scroll = addFrontTube(front_carving, "front_right_scroll", [
    [0.03, 0.43], [0.18, 0.31], [0.38, 0.27], [0.57, 0.32],
    [0.68, 0.43], [0.64, 0.56], [0.50, 0.61], [0.39, 0.55],
    [0.41, 0.45], [0.50, 0.41], [0.58, 0.46]
  ], 0.014, carvedWoodMat, false);

  const front_left_outer_scroll = addFrontTube(front_carving, "front_left_outer_scroll", [
    [-0.55, 0.34], [-0.73, 0.28], [-0.91, 0.31], [-1.00, 0.41],
    [-0.98, 0.54], [-0.87, 0.61], [-0.77, 0.56], [-0.78, 0.47],
    [-0.86, 0.43]
  ], 0.013, carvedWoodMat, false);

  const front_right_outer_scroll = addFrontTube(front_carving, "front_right_outer_scroll", [
    [0.55, 0.34], [0.73, 0.28], [0.91, 0.31], [1.00, 0.41],
    [0.98, 0.54], [0.87, 0.61], [0.77, 0.56], [0.78, 0.47],
    [0.86, 0.43]
  ], 0.013, carvedWoodMat, false);

  const front_center_stem = addFrontTube(front_carving, "front_center_stem", [
    [0, 0.29], [0, 0.39], [0, 0.50], [0, 0.61]
  ], 0.012, carvedWoodMat, false);

  const front_left_flower_curve = addFrontTube(front_carving, "front_left_flower_curve", [
    [-0.01, 0.38], [-0.10, 0.43], [-0.17, 0.50], [-0.20, 0.58]
  ], 0.011, carvedWoodMat, false);

  const front_right_flower_curve = addFrontTube(front_carving, "front_right_flower_curve", [
    [0.01, 0.38], [0.10, 0.43], [0.17, 0.50], [0.20, 0.58]
  ], 0.011, carvedWoodMat, false);

  const front_leafGeom = new THREE.SphereGeometry(1, 12, 6);
  const front_leaf_data = [
    [-0.10, 0.43, -0.75], [-0.17, 0.50, -0.48], [-0.19, 0.57, -0.18],
    [0.10, 0.43, 0.75], [0.17, 0.50, 0.48], [0.19, 0.57, 0.18],
    [-0.34, 0.31, -1.05], [-0.48, 0.30, -1.25], [-0.61, 0.35, -0.85],
    [0.34, 0.31, 1.05], [0.48, 0.30, 1.25], [0.61, 0.35, 0.85],
    [-0.78, 0.31, -1.15], [-0.90, 0.35, -0.75],
    [0.78, 0.31, 1.15], [0.90, 0.35, 0.75]
  ];
  const front_carved_leaves = new THREE.InstancedMesh(
    front_leafGeom,
    carvedWoodMat,
    front_leaf_data.length
  );
  front_carved_leaves.name = "front_carved_leaves";
  const front_leaf_dummy = new THREE.Object3D();
  for (let i = 0; i < front_leaf_data.length; i++) {
    const item = front_leaf_data[i];
    front_leaf_dummy.position.set(item[0], item[1], 0.004);
    front_leaf_dummy.rotation.set(0, 0, item[2]);
    front_leaf_dummy.scale.set(0.075, 0.022, 0.008);
    front_leaf_dummy.updateMatrix();
    front_carved_leaves.setMatrixAt(i, front_leaf_dummy.matrix);
  }
  front_carved_leaves.instanceMatrix.needsUpdate = true;
  front_carving.add(front_carved_leaves);

  const front_carved_centerGeom = new THREE.SphereGeometry(1, 16, 8);
  const front_carved_center = new THREE.Mesh(front_carved_centerGeom, carvedWoodMat);
  front_carved_center.name = "front_carved_center";
  front_carved_center.position.set(0, 0.355, 0.005);
  front_carved_center.scale.set(0.055, 0.055, 0.009);
  front_carving.add(front_carved_center);

  const side_carving_template = new THREE.Group();
  side_carving_template.name = "side_carving_template";

  const side_left_scroll = addFrontTube(side_carving_template, "side_left_scroll", [
    [-0.02, 0.43], [-0.16, 0.31], [-0.32, 0.27], [-0.47, 0.32],
    [-0.54, 0.43], [-0.50, 0.55], [-0.39, 0.59], [-0.31, 0.53],
    [-0.34, 0.45], [-0.42, 0.42]
  ], 0.013, carvedWoodMat, false);

  const side_right_scroll = addFrontTube(side_carving_template, "side_right_scroll", [
    [0.02, 0.43], [0.16, 0.31], [0.32, 0.27], [0.47, 0.32],
    [0.54, 0.43], [0.50, 0.55], [0.39, 0.59], [0.31, 0.53],
    [0.34, 0.45], [0.42, 0.42]
  ], 0.013, carvedWoodMat, false);

  const side_center_stem = addFrontTube(side_carving_template, "side_center_stem", [
    [0, 0.29], [0, 0.39], [0, 0.50], [0, 0.60]
  ], 0.011, carvedWoodMat, false);

  const side_left_branch = addFrontTube(side_carving_template, "side_left_branch", [
    [-0.01, 0.38], [-0.10, 0.43], [-0.18, 0.50], [-0.21, 0.57]
  ], 0.010, carvedWoodMat, false);

  const side_right_branch = addFrontTube(side_carving_template, "side_right_branch", [
    [0.01, 0.38], [0.10, 0.43], [0.18, 0.50], [0.21, 0.57]
  ], 0.010, carvedWoodMat, false);

  const side_leaf_data = [
    [-0.10, 0.43, -0.75], [-0.18, 0.50, -0.45],
    [0.10, 0.43, 0.75], [0.18, 0.50, 0.45],
    [-0.29, 0.31, -1.1], [-0.42, 0.31, -1.25],
    [0.29, 0.31, 1.1], [0.42, 0.31, 1.25]
  ];
  const side_leafGeom = new THREE.SphereGeometry(1, 12, 6);
  const side_carved_leaves = new THREE.InstancedMesh(
    side_leafGeom,
    carvedWoodMat,
    side_leaf_data.length
  );
  side_carved_leaves.name = "side_carved_leaves";
  const side_leaf_dummy = new THREE.Object3D();
  for (let i = 0; i < side_leaf_data.length; i++) {
    const item = side_leaf_data[i];
    side_leaf_dummy.position.set(item[0], item[1], 0.004);
    side_leaf_dummy.rotation.set(0, 0, item[2]);
    side_leaf_dummy.scale.set(0.068, 0.020, 0.008);
    side_leaf_dummy.updateMatrix();
    side_carved_leaves.setMatrixAt(i, side_leaf_dummy.matrix);
  }
  side_carved_leaves.instanceMatrix.needsUpdate = true;
  side_carving_template.add(side_carved_leaves);

  const side_carved_centerGeom = new THREE.SphereGeometry(1, 14, 7);
  const side_carved_center = new THREE.Mesh(side_carved_centerGeom, carvedWoodMat);
  side_carved_center.name = "side_carved_center";
  side_carved_center.position.set(0, 0.355, 0.005);
  side_carved_center.scale.set(0.050, 0.050, 0.008);
  side_carving_template.add(side_carved_center);

  const left_side_carving = side_carving_template.clone(true);
  left_side_carving.name = "left_side_carving";
  left_side_carving.position.set(-1.222, 0, 0);
  left_side_carving.rotation.y = -Math.PI / 2;
  body_group.add(left_side_carving);

  const right_side_carving = side_carving_template.clone(true);
  right_side_carving.name = "right_side_carving";
  right_side_carving.position.set(1.222, 0, 0);
  right_side_carving.rotation.y = Math.PI / 2;
  body_group.add(right_side_carving);

  const lid_lower_bandGeom = roundedBoxGeometry(2.48, 0.11, 1.40, 0.055, 0.022);
  const lid_lower_band = new THREE.Mesh(lid_lower_bandGeom, edgeWoodMat);
  lid_lower_band.name = "lid_lower_band";
  lid_lower_band.position.y = 0.825;
  lid_group.add(lid_lower_band);

  const lid_mainGeom = roundedBoxGeometry(2.50, 0.27, 1.42, 0.085, 0.026);
  const lid_main = new THREE.Mesh(lid_mainGeom, woodMat);
  lid_main.name = "lid_main";
  lid_main.position.y = 0.965;
  lid_group.add(lid_main);

  const lid_top_slabGeom = roundedBoxGeometry(2.38, 0.10, 1.31, 0.055, 0.018);
  const lid_top_slab = new THREE.Mesh(lid_top_slabGeom, edgeWoodMat);
  lid_top_slab.name = "lid_top_slab";
  lid_top_slab.position.y = 1.105;
  lid_group.add(lid_top_slab);

  const lid_top_panelGeom = roundedBoxGeometry(2.20, 0.035, 1.15, 0.025, 0.008);
  const lid_top_panel = new THREE.Mesh(lid_top_panelGeom, panelMat);
  lid_top_panel.name = "lid_top_panel";
  lid_top_panel.position.y = 1.165;
  lid_group.add(lid_top_panel);

  const lid_front_seamGeom = new THREE.BoxGeometry(2.34, 0.018, 0.018);
  const lid_front_seam = new THREE.Mesh(lid_front_seamGeom, carvedWoodMat);
  lid_front_seam.name = "lid_front_seam";
  lid_front_seam.position.set(0, 0.795, 0.724);
  lid_group.add(lid_front_seam);

  const lid_side_seamGeom = new THREE.BoxGeometry(0.018, 0.018, 1.25);
  const lid_left_seam = new THREE.Mesh(lid_side_seamGeom, carvedWoodMat);
  lid_left_seam.name = "lid_left_seam";
  lid_left_seam.position.set(-1.254, 0.795, 0);
  lid_group.add(lid_left_seam);

  const lid_right_seam = new THREE.Mesh(lid_side_seamGeom, carvedWoodMat);
  lid_right_seam.name = "lid_right_seam";
  lid_right_seam.position.set(1.254, 0.795, 0);
  lid_group.add(lid_right_seam);

  const top_panel_border = new THREE.Group();
  top_panel_border.name = "top_panel_border";
  const top_border_xGeom = new THREE.BoxGeometry(2.08, 0.014, 0.025);
  const top_border_zGeom = new THREE.BoxGeometry(0.025, 0.014, 1.03);
  for (const z of [-0.515, 0.515]) {
    const bar = new THREE.Mesh(top_border_xGeom, carvedWoodMat);
    bar.position.set(0, 1.193, z);
    top_panel_border.add(bar);
  }
  for (const x of [-1.04, 1.04]) {
    const bar = new THREE.Mesh(top_border_zGeom, carvedWoodMat);
    bar.position.set(x, 1.193, 0);
    top_panel_border.add(bar);
  }
  lid_group.add(top_panel_border);

  const top_carving = new THREE.Group();
  top_carving.name = "top_carving";
  top_carving.position.y = 1.202;
  lid_group.add(top_carving);

  const top_medallionGeom = new THREE.TorusGeometry(0.205, 0.013, 7, 40);
  const top_medallion = new THREE.Mesh(top_medallionGeom, carvedWoodMat);
  top_medallion.name = "top_medallion";
  top_medallion.rotation.x = Math.PI / 2;
  top_medallion.position.z = 0.02;
  top_carving.add(top_medallion);

  const top_inner_medallionGeom = new THREE.TorusGeometry(0.145, 0.009, 6, 36);
  const top_inner_medallion = new THREE.Mesh(top_inner_medallionGeom, carvedWoodMat);
  top_inner_medallion.name = "top_inner_medallion";
  top_inner_medallion.rotation.x = Math.PI / 2;
  top_inner_medallion.position.z = 0.02;
  top_carving.add(top_inner_medallion);

  const top_center_discGeom = new THREE.CylinderGeometry(0.085, 0.085, 0.012, 24);
  const top_center_disc = new THREE.Mesh(top_center_discGeom, carvedWoodMat);
  top_center_disc.name = "top_center_disc";
  top_center_disc.position.set(0, 0.004, 0.02);
  top_carving.add(top_center_disc);

  const top_petalGeom = new THREE.SphereGeometry(1, 14, 7);
  const top_flower_petals = new THREE.InstancedMesh(top_petalGeom, carvedWoodMat, 14);
  top_flower_petals.name = "top_flower_petals";
  const top_petal_dummy = new THREE.Object3D();
  for (let i = 0; i < 14; i++) {
    const angle = i / 14 * Math.PI * 2;
    top_petal_dummy.position.set(
      Math.cos(angle) * 0.285,
      0.004,
      0.02 + Math.sin(angle) * 0.285
    );
    top_petal_dummy.rotation.set(0, Math.PI / 2 - angle, 0);
    top_petal_dummy.scale.set(0.040, 0.008, 0.095);
    top_petal_dummy.updateMatrix();
    top_flower_petals.setMatrixAt(i, top_petal_dummy.matrix);
  }
  top_flower_petals.instanceMatrix.needsUpdate = true;
  top_carving.add(top_flower_petals);

  const top_front_left_scroll = addTopTube(top_carving, "top_front_left_scroll", [
    [-0.20, 0.13], [-0.38, 0.25], [-0.58, 0.31], [-0.78, 0.29],
    [-0.91, 0.20], [-0.89, 0.08], [-0.77, 0.04], [-0.68, 0.11],
    [-0.72, 0.18], [-0.80, 0.18]
  ], 0.012, carvedWoodMat, false);

  const top_front_right_scroll = addTopTube(top_carving, "top_front_right_scroll", [
    [0.20, 0.13], [0.38, 0.25], [0.58, 0.31], [0.78, 0.29],
    [0.91, 0.20], [0.89, 0.08], [0.77, 0.04], [0.68, 0.11],
    [0.72, 0.18], [0.80, 0.18]
  ], 0.012, carvedWoodMat, false);

  const top_rear_left_scroll = addTopTube(top_carving, "top_rear_left_scroll", [
    [-0.20, -0.10], [-0.38, -0.23], [-0.58, -0.31], [-0.78, -0.29],
    [-0.91, -0.20], [-0.89, -0.08], [-0.77, -0.04], [-0.68, -0.11],
    [-0.72, -0.18], [-0.80, -0.18]
  ], 0.012, carvedWoodMat, false);

  const top_rear_right_scroll = addTopTube(top_carving, "top_rear_right_scroll", [
    [0.20, -0.10], [0.38, -0.23], [0.58, -0.31], [0.78, -0.29],
    [0.91, -0.20], [0.89, -0.08], [0.77, -0.04], [0.68, -0.11],
    [0.72, -0.18], [0.80, -0.18]
  ], 0.012, carvedWoodMat, false);

  const top_left_corner_scroll = addTopTube(top_carving, "top_left_corner_scroll", [
    [-0.82, 0.24], [-0.96, 0.20], [-1.00, 0.08], [-0.96, -0.02],
    [-0.87, -0.03], [-0.84, 0.05], [-0.89, 0.10]
  ], 0.011, carvedWoodMat, false);

  const top_right_corner_scroll = addTopTube(top_carving, "top_right_corner_scroll", [
    [0.82, 0.24], [0.96, 0.20], [1.00, 0.08], [0.96, -0.02],
    [0.87, -0.03], [0.84, 0.05], [0.89, 0.10]
  ], 0.011, carvedWoodMat, false);

  const top_left_rear_tendril = addTopTube(top_carving, "top_left_rear_tendril", [
    [-0.78, -0.27], [-0.91, -0.36], [-0.96, -0.45],
    [-0.89, -0.49], [-0.82, -0.44]
  ], 0.010, carvedWoodMat, false);

  const top_right_rear_tendril = addTopTube(top_carving, "top_right_rear_tendril", [
    [0.78, -0.27], [0.91, -0.36], [0.96, -0.45],
    [0.89, -0.49], [0.82, -0.44]
  ], 0.010, carvedWoodMat, false);

  const top_leafGeom = new THREE.SphereGeometry(1, 12, 6);
  const top_leaf_data = [
    [-0.34, 0.22, -0.75], [-0.48, 0.28, -1.0], [-0.62, 0.29, -1.2],
    [0.34, 0.22, 0.75], [0.48, 0.28, 1.0], [0.62, 0.29, 1.2],
    [-0.34, -0.20, -2.35], [-0.49, -0.27, -2.0], [-0.63, -0.29, -1.75],
    [0.34, -0.20, 2.35], [0.49, -0.27, 2.0], [0.63, -0.29, 1.75],
    [-0.86, 0.13, -1.4], [-0.91, -0.10, -1.8],
    [0.86, 0.13, 1.4], [0.91, -0.10, 1.8]
  ];
  const top_carved_leaves = new THREE.InstancedMesh(
    top_leafGeom,
    carvedWoodMat,
    top_leaf_data.length
  );
  top_carved_leaves.name = "top_carved_leaves";
  const top_leaf_dummy = new THREE.Object3D();
  for (let i = 0; i < top_leaf_data.length; i++) {
    const item = top_leaf_data[i];
    top_leaf_dummy.position.set(item[0], 0.004, item[1]);
    top_leaf_dummy.rotation.set(0, item[2], 0);
    top_leaf_dummy.scale.set(0.065, 0.007, 0.021);
    top_leaf_dummy.updateMatrix();
    top_carved_leaves.setMatrixAt(i, top_leaf_dummy.matrix);
  }
  top_carved_leaves.instanceMatrix.needsUpdate = true;
  top_carving.add(top_carved_leaves);

  const lid_front_grain = new THREE.Group();
  lid_front_grain.name = "lid_front_grain";
  const grainGeom = new THREE.BoxGeometry(1, 1, 1);
  const lid_front_grain_lines = new THREE.InstancedMesh(grainGeom, carvedWoodMat, 6);
  lid_front_grain_lines.name = "lid_front_grain_lines";
  const grain_dummy = new THREE.Object3D();
  const grain_data = [
    [-0.22, 0.875, 1.55], [0.30, 0.905, 1.25], [-0.35, 0.940, 1.70],
    [0.18, 0.975, 1.85], [-0.12, 1.015, 1.45], [0.36, 1.050, 1.10]
  ];
  for (let i = 0; i < grain_data.length; i++) {
    grain_dummy.position.set(grain_data[i][0], grain_data[i][1], 0.742);
    grain_dummy.rotation.set(0, 0, 0);
    grain_dummy.scale.set(grain_data[i][2], 0.006, 0.006);
    grain_dummy.updateMatrix();
    lid_front_grain_lines.setMatrixAt(i, grain_dummy.matrix);
  }
  lid_front_grain_lines.instanceMatrix.needsUpdate = true;
  lid_front_grain.add(lid_front_grain_lines);
  lid_group.add(lid_front_grain);

  const latch_backplateShape = new THREE.Shape();
  latch_backplateShape.moveTo(-0.22, 0.13);
  latch_backplateShape.quadraticCurveTo(-0.25, 0.08, -0.22, 0.02);
  latch_backplateShape.lineTo(-0.18, -0.06);
  latch_backplateShape.quadraticCurveTo(-0.16, -0.12, -0.10, -0.14);
  latch_backplateShape.lineTo(0.10, -0.14);
  latch_backplateShape.quadraticCurveTo(0.16, -0.12, 0.18, -0.06);
  latch_backplateShape.lineTo(0.22, 0.02);
  latch_backplateShape.quadraticCurveTo(0.25, 0.08, 0.22, 0.13);
  latch_backplateShape.quadraticCurveTo(0, 0.18, -0.22, 0.13);

  const latch_backplateGeom = new THREE.ExtrudeGeometry(latch_backplateShape, {
    depth: 0.035,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.008,
    bevelSize: 0.008,
    bevelSegments: 2
  });
  const latch_backplate = new THREE.Mesh(latch_backplateGeom, brassMat);
  latch_backplate.name = "latch_backplate";
  latch_backplate.position.set(0, 0.705, 0.735);
  hardware_group.add(latch_backplate);

  const latch_upper_plateGeom = roundedBoxGeometry(0.46, 0.17, 0.035, 0.075, 0.008);
  const latch_upper_plate = new THREE.Mesh(latch_upper_plateGeom, brassMat);
  latch_upper_plate.name = "latch_upper_plate";
  latch_upper_plate.position.set(0, 0.925, 0.746);
  hardware_group.add(latch_upper_plate);

  const latch_tongueShape = new THREE.Shape();
  latch_tongueShape.moveTo(-0.070, 0.175);
  latch_tongueShape.quadraticCurveTo(-0.090, 0.145, -0.070, 0.105);
  latch_tongueShape.lineTo(-0.055, -0.075);
  latch_tongueShape.quadraticCurveTo(-0.052, -0.125, 0, -0.145);
  latch_tongueShape.quadraticCurveTo(0.052, -0.125, 0.055, -0.075);
  latch_tongueShape.lineTo(0.070, 0.105);
  latch_tongueShape.quadraticCurveTo(0.090, 0.145, 0.070, 0.175);
  latch_tongueShape.quadraticCurveTo(0, 0.205, -0.070, 0.175);

  const latch_tongueGeom = new THREE.ExtrudeGeometry(latch_tongueShape, {
    depth: 0.045,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.008,
    bevelSize: 0.007,
    bevelSegments: 2
  });
  const latch_tongue = new THREE.Mesh(latch_tongueGeom, brassMat);
  latch_tongue.name = "latch_tongue";
  latch_tongue.position.set(0, 0.790, 0.780);
  hardware_group.add(latch_tongue);

  const latch_hinge_barrelGeom = new THREE.CylinderGeometry(0.045, 0.045, 0.25, 18);
  const latch_hinge_barrel = new THREE.Mesh(latch_hinge_barrelGeom, darkBrassMat);
  latch_hinge_barrel.name = "latch_hinge_barrel";
  latch_hinge_barrel.rotation.z = Math.PI / 2;
  latch_hinge_barrel.position.set(0, 0.955, 0.805);
  hardware_group.add(latch_hinge_barrel);

  const latch_pivot_capGeom = new THREE.CylinderGeometry(0.058, 0.058, 0.026, 18);
  const latch_pivot_cap = new THREE.Mesh(latch_pivot_capGeom, brassMat);
  latch_pivot_cap.name = "latch_pivot_cap";
  latch_pivot_cap.rotation.x = Math.PI / 2;
  latch_pivot_cap.position.set(0, 0.955, 0.842);
  hardware_group.add(latch_pivot_cap);

  const latch_keyhole_roundGeom = new THREE.CylinderGeometry(0.026, 0.026, 0.012, 16);
  const latch_keyhole_round = new THREE.Mesh(latch_keyhole_roundGeom, keyholeMat);
  latch_keyhole_round.name = "latch_keyhole_round";
  latch_keyhole_round.rotation.x = Math.PI / 2;
  latch_keyhole_round.position.set(0, 0.675, 0.839);
  hardware_group.add(latch_keyhole_round);

  const latch_keyhole_slotGeom = new THREE.BoxGeometry(0.018, 0.070, 0.012);
  const latch_keyhole_slot = new THREE.Mesh(latch_keyhole_slotGeom, keyholeMat);
  latch_keyhole_slot.name = "latch_keyhole_slot";
  latch_keyhole_slot.position.set(0, 0.635, 0.840);
  hardware_group.add(latch_keyhole_slot);

  const latch_screwGeom = new THREE.CylinderGeometry(0.034, 0.034, 0.014, 16);
  const latch_screws = new THREE.InstancedMesh(latch_screwGeom, darkBrassMat, 4);
  latch_screws.name = "latch_screws";
  const screw_positions = [
    [-0.145, 0.925], [0.145, 0.925],
    [-0.135, 0.665], [0.135, 0.665]
  ];
  const screw_dummy = new THREE.Object3D();
  for (let i = 0; i < screw_positions.length; i++) {
    screw_dummy.position.set(screw_positions[i][0], screw_positions[i][1], 0.842);
    screw_dummy.rotation.set(Math.PI / 2, 0, 0);
    screw_dummy.scale.set(1, 1, 1);
    screw_dummy.updateMatrix();
    latch_screws.setMatrixAt(i, screw_dummy.matrix);
  }
  latch_screws.instanceMatrix.needsUpdate = true;
  hardware_group.add(latch_screws);

  const screw_slotGeom = new THREE.BoxGeometry(0.045, 0.007, 0.008);
  const screw_slots = new THREE.InstancedMesh(screw_slotGeom, keyholeMat, 4);
  screw_slots.name = "screw_slots";
  const slot_dummy = new THREE.Object3D();
  for (let i = 0; i < screw_positions.length; i++) {
    slot_dummy.position.set(screw_positions[i][0], screw_positions[i][1], 0.852);
    slot_dummy.rotation.set(0, 0, i % 2 === 0 ? 0.25 : -0.25);
    slot_dummy.scale.set(1, 1, 1);
    slot_dummy.updateMatrix();
    screw_slots.setMatrixAt(i, slot_dummy.matrix);
  }
  screw_slots.instanceMatrix.needsUpdate = true;
  hardware_group.add(screw_slots);

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