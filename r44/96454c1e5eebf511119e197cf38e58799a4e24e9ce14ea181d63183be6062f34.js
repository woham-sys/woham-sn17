// miner-diag: gpus=? tflops=? stream48=? power=? probe_tps=3831 cpu_quota=?/? net=? batch=4 wall=1389 seed=870128282
export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "produce_display_refrigerator";

  const cabinetW = 1.0;
  const cabinetH = 2.1;
  const cabinetD = 0.72;
  const bodyBottom = 0.1;
  const bodyTop = bodyBottom + cabinetH;
  const frontZ = cabinetD / 2;

  const brushed_steelMat = new THREE.MeshStandardMaterial({
    color: 0xc8c9c7,
    metalness: 0.5,
    roughness: 0.5
  });
  const silver_trimMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25
  });
  const dark_metalMat = new THREE.MeshStandardMaterial({
    color: 0x3a3a3a,
    metalness: 0.6,
    roughness: 0.5
  });
  const rubberMat = new THREE.MeshStandardMaterial({
    color: 0x171717,
    metalness: 0.0,
    roughness: 0.8
  });
  const interiorMat = new THREE.MeshStandardMaterial({
    color: 0xdce8e8,
    metalness: 0.0,
    roughness: 0.7
  });
  const shelfMat = new THREE.MeshStandardMaterial({
    color: 0xf2f5f5,
    metalness: 0.0,
    roughness: 0.4
  });
  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0xddeeff,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
    opacity: 0.32,
    side: THREE.DoubleSide,
    depthWrite: false
  });
  const glass_highlightMat = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.14,
    side: THREE.DoubleSide,
    depthWrite: false
  });
  const interior_lightMat = new THREE.MeshStandardMaterial({
    color: 0xf4ffff,
    metalness: 0.0,
    roughness: 0.5,
    emissive: 0xf4ffff,
    emissiveIntensity: 1.0
  });
  const red_produceMat = new THREE.MeshStandardMaterial({
    color: 0xd84a3f,
    metalness: 0.0,
    roughness: 0.8
  });
  const orange_produceMat = new THREE.MeshStandardMaterial({
    color: 0xf28a32,
    metalness: 0.0,
    roughness: 0.8
  });
  const yellow_produceMat = new THREE.MeshStandardMaterial({
    color: 0xf2c52b,
    metalness: 0.0,
    roughness: 0.8
  });
  const green_produceMat = new THREE.MeshStandardMaterial({
    color: 0x568b45,
    metalness: 0.0,
    roughness: 0.8
  });
  const dark_green_produceMat = new THREE.MeshStandardMaterial({
    color: 0x2f6b35,
    metalness: 0.0,
    roughness: 0.85
  });
  const light_green_produceMat = new THREE.MeshStandardMaterial({
    color: 0xa8c77b,
    metalness: 0.0,
    roughness: 0.8
  });
  const pale_cabbageMat = new THREE.MeshStandardMaterial({
    color: 0xd8df91,
    metalness: 0.0,
    roughness: 0.85
  });
  const tan_produceMat = new THREE.MeshStandardMaterial({
    color: 0xc9ad78,
    metalness: 0.0,
    roughness: 0.85
  });
  const stemMat = new THREE.MeshStandardMaterial({
    color: 0x3f7636,
    metalness: 0.0,
    roughness: 0.85
  });

  const cabinet_sideGeom = new THREE.BoxGeometry(0.055, cabinetH, cabinetD);
  const left_side_panel = new THREE.Mesh(cabinet_sideGeom, brushed_steelMat);
  left_side_panel.name = "left_side_panel";
  left_side_panel.position.set(-cabinetW / 2 + 0.0275, bodyBottom + cabinetH / 2, 0);
  root.add(left_side_panel);

  const right_side_panel = new THREE.Mesh(cabinet_sideGeom, brushed_steelMat);
  right_side_panel.name = "right_side_panel";
  right_side_panel.position.set(cabinetW / 2 - 0.0275, bodyBottom + cabinetH / 2, 0);
  root.add(right_side_panel);

  const cabinet_backGeom = new THREE.BoxGeometry(cabinetW - 0.055, cabinetH, 0.045);
  const cabinet_back_panel = new THREE.Mesh(cabinet_backGeom, brushed_steelMat);
  cabinet_back_panel.name = "cabinet_back_panel";
  cabinet_back_panel.position.set(0, bodyBottom + cabinetH / 2, -cabinetD / 2 + 0.0225);
  root.add(cabinet_back_panel);

  const cabinet_topGeom = new THREE.BoxGeometry(cabinetW, 0.06, cabinetD);
  const cabinet_top_panel = new THREE.Mesh(cabinet_topGeom, brushed_steelMat);
  cabinet_top_panel.name = "cabinet_top_panel";
  cabinet_top_panel.position.set(0, bodyTop - 0.03, 0);
  root.add(cabinet_top_panel);

  const cabinet_bottomGeom = new THREE.BoxGeometry(cabinetW, 0.065, cabinetD);
  const cabinet_bottom_panel = new THREE.Mesh(cabinet_bottomGeom, brushed_steelMat);
  cabinet_bottom_panel.name = "cabinet_bottom_panel";
  cabinet_bottom_panel.position.set(0, bodyBottom + 0.0325, 0);
  root.add(cabinet_bottom_panel);

  const interior_backGeom = new THREE.BoxGeometry(0.72, 1.48, 0.025);
  const interior_back_panel = new THREE.Mesh(interior_backGeom, interiorMat);
  interior_back_panel.name = "interior_back_panel";
  interior_back_panel.position.set(0.04, 1.23, -0.315);
  root.add(interior_back_panel);

  const interior_sideGeom = new THREE.BoxGeometry(0.025, 1.48, 0.62);
  const interior_left_wall = new THREE.Mesh(interior_sideGeom, interiorMat);
  interior_left_wall.name = "interior_left_wall";
  interior_left_wall.position.set(-0.32, 1.23, -0.005);
  root.add(interior_left_wall);

  const interior_right_wall = new THREE.Mesh(interior_sideGeom, interiorMat);
  interior_right_wall.name = "interior_right_wall";
  interior_right_wall.position.set(0.40, 1.23, -0.005);
  root.add(interior_right_wall);

  const interior_ceilingGeom = new THREE.BoxGeometry(0.72, 0.035, 0.62);
  const interior_ceiling = new THREE.Mesh(interior_ceilingGeom, interiorMat);
  interior_ceiling.name = "interior_ceiling";
  interior_ceiling.position.set(0.04, 1.965, -0.005);
  root.add(interior_ceiling);

  const interior_floorGeom = new THREE.BoxGeometry(0.72, 0.035, 0.62);
  const interior_floor = new THREE.Mesh(interior_floorGeom, interiorMat);
  interior_floor.name = "interior_floor";
  interior_floor.position.set(0.04, 0.50, -0.005);
  root.add(interior_floor);

  const interior_lightGeom = new THREE.BoxGeometry(0.025, 1.34, 0.014);
  const interior_light_strip = new THREE.Mesh(interior_lightGeom, interior_lightMat);
  interior_light_strip.name = "interior_light_strip";
  interior_light_strip.position.set(0.37, 1.23, 0.298);
  root.add(interior_light_strip);

  const shelfGeom = new THREE.BoxGeometry(0.68, 0.025, 0.58);
  const upper_shelf = new THREE.Mesh(shelfGeom, shelfMat);
  upper_shelf.name = "upper_shelf";
  upper_shelf.position.set(0.04, 1.405, 0.0);
  root.add(upper_shelf);

  const middle_shelf = new THREE.Mesh(shelfGeom, shelfMat);
  middle_shelf.name = "middle_shelf";
  middle_shelf.position.set(0.04, 1.035, 0.0);
  root.add(middle_shelf);

  const lower_shelf = new THREE.Mesh(shelfGeom, shelfMat);
  lower_shelf.name = "lower_shelf";
  lower_shelf.position.set(0.04, 0.665, 0.0);
  root.add(lower_shelf);

  const shelf_lipGeom = new THREE.BoxGeometry(0.68, 0.035, 0.025);
  const upper_shelf_lip = new THREE.Mesh(shelf_lipGeom, silver_trimMat);
  upper_shelf_lip.name = "upper_shelf_lip";
  upper_shelf_lip.position.set(0.04, 1.395, 0.302);
  root.add(upper_shelf_lip);

  const middle_shelf_lip = new THREE.Mesh(shelf_lipGeom, silver_trimMat);
  middle_shelf_lip.name = "middle_shelf_lip";
  middle_shelf_lip.position.set(0.04, 1.025, 0.302);
  root.add(middle_shelf_lip);

  const lower_shelf_lip = new THREE.Mesh(shelf_lipGeom, silver_trimMat);
  lower_shelf_lip.name = "lower_shelf_lip";
  lower_shelf_lip.position.set(0.04, 0.655, 0.302);
  root.add(lower_shelf_lip);

  const front_frameGeom = new THREE.BoxGeometry(0.075, 1.62, 0.06);
  const front_left_frame = new THREE.Mesh(front_frameGeom, brushed_steelMat);
  front_left_frame.name = "front_left_frame";
  front_left_frame.position.set(-0.4625, 1.23, frontZ + 0.015);
  root.add(front_left_frame);

  const front_right_frame = new THREE.Mesh(front_frameGeom, brushed_steelMat);
  front_right_frame.name = "front_right_frame";
  front_right_frame.position.set(0.4625, 1.23, frontZ + 0.015);
  root.add(front_right_frame);

  const top_front_panelGeom = new THREE.BoxGeometry(0.925, 0.25, 0.06);
  const top_front_panel = new THREE.Mesh(top_front_panelGeom, brushed_steelMat);
  top_front_panel.name = "top_front_panel";
  top_front_panel.position.set(0, 2.075, frontZ + 0.015);
  root.add(top_front_panel);

  const bottom_front_panelGeom = new THREE.BoxGeometry(0.925, 0.35, 0.06);
  const bottom_front_panel = new THREE.Mesh(bottom_front_panelGeom, brushed_steelMat);
  bottom_front_panel.name = "bottom_front_panel";
  bottom_front_panel.position.set(0, 0.275, frontZ + 0.015);
  root.add(bottom_front_panel);

  const window_glassGeom = new THREE.PlaneGeometry(0.75, 1.42);
  const window_glass = new THREE.Mesh(window_glassGeom, glassMat);
  window_glass.name = "window_glass";
  window_glass.position.set(0.04, 1.23, frontZ + 0.047);
  root.add(window_glass);

  const window_highlightGeom = new THREE.PlaneGeometry(0.035, 1.28);
  const window_highlight = new THREE.Mesh(window_highlightGeom, glass_highlightMat);
  window_highlight.name = "window_highlight";
  window_highlight.position.set(0.34, 1.25, frontZ + 0.051);
  root.add(window_highlight);

  const gasket_verticalGeom = new THREE.BoxGeometry(0.018, 1.47, 0.018);
  const window_left_gasket = new THREE.Mesh(gasket_verticalGeom, rubberMat);
  window_left_gasket.name = "window_left_gasket";
  window_left_gasket.position.set(-0.345, 1.23, frontZ + 0.055);
  root.add(window_left_gasket);

  const window_right_gasket = new THREE.Mesh(gasket_verticalGeom, rubberMat);
  window_right_gasket.name = "window_right_gasket";
  window_right_gasket.position.set(0.425, 1.23, frontZ + 0.055);
  root.add(window_right_gasket);

  const gasket_horizontalGeom = new THREE.BoxGeometry(0.788, 0.018, 0.018);
  const window_top_gasket = new THREE.Mesh(gasket_horizontalGeom, rubberMat);
  window_top_gasket.name = "window_top_gasket";
  window_top_gasket.position.set(0.04, 1.965, frontZ + 0.055);
  root.add(window_top_gasket);

  const window_bottom_gasket = new THREE.Mesh(gasket_horizontalGeom, rubberMat);
  window_bottom_gasket.name = "window_bottom_gasket";
  window_bottom_gasket.position.set(0.04, 0.495, frontZ + 0.055);
  root.add(window_bottom_gasket);

  const handleGeom = new THREE.BoxGeometry(0.055, 1.34, 0.055);
  const door_handle = new THREE.Mesh(handleGeom, silver_trimMat);
  door_handle.name = "door_handle";
  door_handle.position.set(-0.505, 1.23, frontZ + 0.095);
  root.add(door_handle);

  const handle_capGeom = new THREE.SphereGeometry(0.029, 16, 10);
  const handle_top_cap = new THREE.Mesh(handle_capGeom, silver_trimMat);
  handle_top_cap.name = "handle_top_cap";
  handle_top_cap.position.set(-0.505, 1.90, frontZ + 0.095);
  root.add(handle_top_cap);

  const handle_bottom_cap = new THREE.Mesh(handle_capGeom, silver_trimMat);
  handle_bottom_cap.name = "handle_bottom_cap";
  handle_bottom_cap.position.set(-0.505, 0.56, frontZ + 0.095);
  root.add(handle_bottom_cap);

  const handle_mountGeom = new THREE.BoxGeometry(0.045, 0.075, 0.07);
  const upper_handle_mount = new THREE.Mesh(handle_mountGeom, dark_metalMat);
  upper_handle_mount.name = "upper_handle_mount";
  upper_handle_mount.position.set(-0.477, 1.78, frontZ + 0.065);
  root.add(upper_handle_mount);

  const lower_handle_mount = new THREE.Mesh(handle_mountGeom, dark_metalMat);
  lower_handle_mount.name = "lower_handle_mount";
  lower_handle_mount.position.set(-0.477, 0.68, frontZ + 0.065);
  root.add(lower_handle_mount);

  const brand_markGeom = new THREE.BoxGeometry(0.018, 0.026, 0.008);
  const brand_marks = new THREE.InstancedMesh(brand_markGeom, dark_metalMat, 6);
  brand_marks.name = "brand_marks";
  const brand_dummy = new THREE.Object3D();
  for (let i = 0; i < 6; i++) {
    brand_dummy.position.set(-0.0475 + i * 0.019, 2.105 + (i % 2) * 0.003, frontZ + 0.049);
    brand_dummy.scale.set(0.65 + (i % 3) * 0.18, 0.75 + (i % 2) * 0.25, 1);
    brand_dummy.updateMatrix();
    brand_marks.setMatrixAt(i, brand_dummy.matrix);
  }
  brand_marks.instanceMatrix.needsUpdate = true;
  root.add(brand_marks);

  const control_markGeom = new THREE.BoxGeometry(0.035, 0.007, 0.008);
  const control_marks = new THREE.InstancedMesh(control_markGeom, dark_metalMat, 3);
  control_marks.name = "control_marks";
  for (let i = 0; i < 3; i++) {
    brand_dummy.position.set(-0.463, 1.53 - i * 0.025, frontZ + 0.05);
    brand_dummy.scale.set(1 - i * 0.18, 1, 1);
    brand_dummy.updateMatrix();
    control_marks.setMatrixAt(i, brand_dummy.matrix);
  }
  control_marks.instanceMatrix.needsUpdate = true;
  root.add(control_marks);

  const footGeom = new THREE.CylinderGeometry(0.052, 0.06, 0.075, 16);
  const feet = new THREE.InstancedMesh(footGeom, rubberMat, 4);
  feet.name = "feet";
  const foot_positions = [
    [-0.40, 0.055, 0.27],
    [0.40, 0.055, 0.27],
    [-0.40, 0.055, -0.27],
    [0.40, 0.055, -0.27]
  ];
  for (let i = 0; i < foot_positions.length; i++) {
    brand_dummy.position.set(foot_positions[i][0], foot_positions[i][1], foot_positions[i][2]);
    brand_dummy.scale.set(1, 1, 1);
    brand_dummy.updateMatrix();
    feet.setMatrixAt(i, brand_dummy.matrix);
  }
  feet.instanceMatrix.needsUpdate = true;
  root.add(feet);

  const produce_sphereGeom = new THREE.SphereGeometry(1, 18, 12);
  const produce_leafGeom = new THREE.IcosahedronGeometry(1, 1);
  const produce_stemGeom = new THREE.CylinderGeometry(1, 1, 1, 8);

  function addSphere(name, material, x, y, z, sx, sy, sz) {
    const mesh = new THREE.Mesh(produce_sphereGeom, material);
    mesh.name = name;
    mesh.position.set(x, y, z);
    mesh.scale.set(sx, sy, sz);
    root.add(mesh);
    return mesh;
  }

  function addStem(name, x, y, z, radius, height, tiltZ, tiltX) {
    const stem = new THREE.Mesh(produce_stemGeom, stemMat);
    stem.name = name;
    stem.position.set(x, y, z);
    stem.scale.set(radius, height, radius);
    stem.rotation.z = tiltZ;
    stem.rotation.x = tiltX;
    root.add(stem);
    return stem;
  }

  function addLeafCluster(name, material, x, y, z, size, count) {
    const cluster = new THREE.InstancedMesh(produce_leafGeom, material, count);
    cluster.name = name;
    const dummy = new THREE.Object3D();
    for (let i = 0; i < count; i++) {
      const angle = i / count * Math.PI * 2;
      const ring = 0.35 + (i % 3) * 0.18;
      dummy.position.set(
        x + Math.cos(angle) * size * ring,
        y + (i % 4 - 1.5) * size * 0.18,
        z + Math.sin(angle) * size * ring
      );
      dummy.rotation.set(angle * 0.35, angle, angle * 0.55);
      dummy.scale.set(size * (0.55 + (i % 2) * 0.15), size * 0.42, size * 0.72);
      dummy.updateMatrix();
      cluster.setMatrixAt(i, dummy.matrix);
    }
    cluster.instanceMatrix.needsUpdate = true;
    root.add(cluster);
    return cluster;
  }

  const top_cabbage = addSphere("top_cabbage", pale_cabbageMat, -0.13, 1.57, -0.02, 0.13, 0.13, 0.12);
  const top_cabbage_outer_leaf = addSphere("top_cabbage_outer_leaf", light_green_produceMat, -0.17, 1.57, 0.075, 0.105, 0.12, 0.035);
  const top_tomato = addSphere("top_tomato", red_produceMat, -0.27, 1.50, 0.19, 0.105, 0.105, 0.10);
  const top_tomato_stem = addStem("top_tomato_stem", -0.27, 1.605, 0.19, 0.009, 0.035, 0.15, 0);
  const top_center_tomato = addSphere("top_center_tomato", red_produceMat, 0.02, 1.50, 0.20, 0.115, 0.11, 0.105);
  const top_center_tomato_stem = addStem("top_center_tomato_stem", 0.02, 1.615, 0.20, 0.009, 0.035, -0.1, 0);
  const top_green_tomato = addSphere("top_green_tomato", green_produceMat, 0.29, 1.50, 0.18, 0.09, 0.095, 0.085);
  const top_green_tomato_stem = addStem("top_green_tomato_stem", 0.29, 1.595, 0.18, 0.008, 0.03, -0.2, 0);
  const top_broccoli = addLeafCluster("top_broccoli", dark_green_produceMat, 0.08, 1.72, -0.08, 0.105, 10);
  const top_broccoli_stem = addStem("top_broccoli_stem", 0.08, 1.64, -0.08, 0.025, 0.13, 0.05, 0);
  const top_carrot = addSphere("top_carrot", orange_produceMat, 0.23, 1.66, 0.02, 0.075, 0.115, 0.07);
  top_carrot.rotation.z = -0.45;
  const top_carrot_leaf_left = addStem("top_carrot_leaf_left", 0.205, 1.78, 0.02, 0.007, 0.10, -0.25, 0);
  const top_carrot_leaf_right = addStem("top_carrot_leaf_right", 0.245, 1.78, 0.02, 0.007, 0.10, 0.22, 0);

  const middle_cabbage = addSphere("middle_cabbage", dark_green_produceMat, -0.23, 1.17, -0.02, 0.14, 0.13, 0.12);
  const middle_cabbage_leaf = addSphere("middle_cabbage_leaf", green_produceMat, -0.28, 1.18, 0.075, 0.105, 0.115, 0.035);
  const middle_green_fruit = addSphere("middle_green_fruit", green_produceMat, -0.02, 1.16, 0.19, 0.11, 0.115, 0.105);
  const middle_green_fruit_stem = addStem("middle_green_fruit_stem", -0.02, 1.275, 0.19, 0.008, 0.03, 0.1, 0);
  const middle_red_tomato = addSphere("middle_red_tomato", red_produceMat, 0.25, 1.17, 0.18, 0.105, 0.105, 0.10);
  const middle_red_tomato_stem = addStem("middle_red_tomato_stem", 0.25, 1.28, 0.18, 0.009, 0.035, -0.15, 0);
  const middle_lower_tomato = addSphere("middle_lower_tomato", red_produceMat, 0.27, 1.065, 0.20, 0.095, 0.095, 0.09);
  const middle_lemon_left = addSphere("middle_lemon_left", yellow_produceMat, -0.29, 1.075, 0.20, 0.07, 0.085, 0.065);
  const middle_lemon_right = addSphere("middle_lemon_right", yellow_produceMat, -0.19, 1.07, 0.23, 0.065, 0.08, 0.06);

  const bottom_broccoli = addLeafCluster("bottom_broccoli", dark_green_produceMat, -0.24, 0.82, -0.04, 0.11, 10);
  const bottom_broccoli_stem = addStem("bottom_broccoli_stem", -0.24, 0.74, -0.04, 0.026, 0.12, 0.05, 0);
  const bottom_cabbage = addSphere("bottom_cabbage", pale_cabbageMat, 0.18, 0.83, -0.02, 0.14, 0.14, 0.13);
  const bottom_cabbage_leaf = addSphere("bottom_cabbage_leaf", light_green_produceMat, 0.25, 0.83, 0.075, 0.105, 0.12, 0.035);
  const bottom_orange = addSphere("bottom_orange", orange_produceMat, -0.16, 0.735, 0.20, 0.105, 0.105, 0.10);
  const bottom_orange_stem = addStem("bottom_orange_stem", -0.16, 0.84, 0.20, 0.008, 0.028, 0.1, 0);
  const bottom_tomato_left = addSphere("bottom_tomato_left", orange_produceMat, 0.12, 0.75, 0.20, 0.085, 0.09, 0.08);
  const bottom_tomato_right = addSphere("bottom_tomato_right", orange_produceMat, 0.26, 0.75, 0.19, 0.08, 0.085, 0.075);
  const bottom_red_pepper = addSphere("bottom_red_pepper", red_produceMat, 0.30, 0.635, 0.20, 0.075, 0.105, 0.07);
  const bottom_red_pepper_stem = addStem("bottom_red_pepper_stem", 0.30, 0.745, 0.20, 0.008, 0.035, -0.1, 0);
  const bottom_green_pepper = addSphere("bottom_green_pepper", green_produceMat, -0.30, 0.72, 0.17, 0.075, 0.105, 0.07);
  const bottom_green_pepper_stem = addStem("bottom_green_pepper_stem", -0.30, 0.825, 0.17, 0.008, 0.035, 0.15, 0);

  const zucchini_left = addSphere("zucchini_left", light_green_produceMat, 0.02, 0.625, 0.245, 0.045, 0.12, 0.045);
  zucchini_left.rotation.z = -0.28;
  const zucchini_center = addSphere("zucchini_center", light_green_produceMat, 0.09, 0.62, 0.25, 0.043, 0.115, 0.043);
  zucchini_center.rotation.z = 0.05;
  const zucchini_right = addSphere("zucchini_right", light_green_produceMat, 0.16, 0.625, 0.245, 0.043, 0.115, 0.043);
  zucchini_right.rotation.z = 0.30;
  const zucchini_flower = addSphere("zucchini_flower", yellow_produceMat, 0.10, 0.745, 0.245, 0.035, 0.025, 0.035);

  const lower_leafy_greens = addLeafCluster("lower_leafy_greens", dark_green_produceMat, -0.29, 0.61, 0.02, 0.085, 8);
  const lower_leafy_greens_stem = addStem("lower_leafy_greens_stem", -0.29, 0.58, 0.02, 0.018, 0.09, 0.1, 0);

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