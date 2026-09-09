function __sn17_user(THREE) {
  const root = new THREE.Group();

  const bodyMat = new THREE.MeshStandardMaterial({ color: 0x4b4f50, metalness: 0.35, roughness: 0.5 });
  const panelMat = new THREE.MeshStandardMaterial({ color: 0x3d4142, metalness: 0.3, roughness: 0.55 });
  const darkPanelMat = new THREE.MeshStandardMaterial({ color: 0x202324, metalness: 0.2, roughness: 0.65 });
  const blackMat = new THREE.MeshStandardMaterial({ color: 0x111314, metalness: 0.0, roughness: 0.8 });
  const rubberMat = new THREE.MeshStandardMaterial({ color: 0x171819, metalness: 0.0, roughness: 0.9 });
  const whiteMat = new THREE.MeshStandardMaterial({ color: 0xe8e8e2, metalness: 0.0, roughness: 0.65 });
  const grayKeyMat = new THREE.MeshStandardMaterial({ color: 0xbfc3c1, metalness: 0.0, roughness: 0.55 });
  const redKeyMat = new THREE.MeshStandardMaterial({ color: 0xd84a45, metalness: 0.0, roughness: 0.5 });
  const greenKeyMat = new THREE.MeshStandardMaterial({ color: 0x55c878, metalness: 0.0, roughness: 0.5 });
  const blueKeyMat = new THREE.MeshStandardMaterial({ color: 0x5aa9c9, metalness: 0.0, roughness: 0.5 });
  const yellowMat = new THREE.MeshStandardMaterial({ color: 0xf0c62e, metalness: 0.0, roughness: 0.45 });
  const screenMat = new THREE.MeshStandardMaterial({ color: 0x17243d, metalness: 0.0, roughness: 0.25 });
  const screenBlueMat = new THREE.MeshStandardMaterial({ color: 0x33466d, metalness: 0.0, roughness: 0.3 });
  const screenIconMat = new THREE.MeshStandardMaterial({ color: 0x78b9ff, metalness: 0.0, roughness: 0.35 });
  const silverMat = new THREE.MeshStandardMaterial({ color: 0xaeb2b3, metalness: 0.5, roughness: 0.35 });

  function addBox(w, h, d, mat, x, y, z) {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
    mesh.position.set(x, y, z);
    root.add(mesh);
    return mesh;
  }

  function addCylinderX(radius, length, mat, x, y, z, segments) {
    const mesh = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius, length, segments || 48), mat);
    mesh.rotation.z = Math.PI / 2;
    mesh.position.set(x, y, z);
    root.add(mesh);
    return mesh;
  }

  function addCylinderZ(radius, length, mat, x, y, z, segments) {
    const mesh = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius, length, segments || 48), mat);
    mesh.rotation.x = Math.PI / 2;
    mesh.position.set(x, y, z);
    root.add(mesh);
    return mesh;
  }

  function addDiscY(radius, thickness, mat, x, y, z, segments) {
    const mesh = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius, thickness, segments || 48), mat);
    mesh.rotation.z = Math.PI / 2;
    mesh.position.set(x, y, z);
    root.add(mesh);
    return mesh;
  }

  const lower_chassis = addBox(1.36, 0.42, 0.78, bodyMat, 0, 0.25, 0);
  const upper_housing = addBox(1.24, 0.34, 0.68, bodyMat, 0, 0.58, -0.03);
  const front_access_panel = addBox(1.08, 0.31, 0.018, panelMat, -0.08, 0.31, 0.405);
  const right_side_upper_panel = addBox(0.018, 0.34, 0.66, panelMat, 0.635, 0.58, -0.03);
  const right_side_lower_panel = addBox(0.018, 0.34, 0.66, panelMat, 0.635, 0.25, -0.03);
  const left_side_panel = addBox(0.018, 0.48, 0.66, panelMat, -0.635, 0.43, -0.03);
  const top_lid = addBox(1.28, 0.055, 0.74, bodyMat, 0, 0.765, -0.02);
  const front_top_lip = addBox(1.36, 0.055, 0.08, darkPanelMat, 0, 0.465, 0.39);

  const console_group = new THREE.Group();
  console_group.position.set(-0.02, 0.61, 0.31);
  console_group.rotation.x = 0.18;
  root.add(console_group);

  const control_console_base = new THREE.Mesh(new THREE.BoxGeometry(1.22, 0.055, 0.36), darkPanelMat);
  console_group.add(control_console_base);

  const keyboard_well = new THREE.Mesh(new THREE.BoxGeometry(0.72, 0.012, 0.25), blackMat);
  keyboard_well.position.set(-0.10, 0.035, 0.015);
  console_group.add(keyboard_well);

  const keyGeom = new THREE.BoxGeometry(0.055, 0.018, 0.045);
  const gray_key_instances = new THREE.InstancedMesh(keyGeom, grayKeyMat, 24);
  const keyDummy = new THREE.Object3D();
  let keyIndex = 0;
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 6; col++) {
      keyDummy.position.set(-0.31 + col * 0.075, 0.052, -0.075 + row * 0.055);
      keyDummy.updateMatrix();
      gray_key_instances.setMatrixAt(keyIndex++, keyDummy.matrix);
    }
  }
  console_group.add(gray_key_instances);

  const red_function_key = new THREE.Mesh(new THREE.BoxGeometry(0.065, 0.02, 0.045), redKeyMat);
  red_function_key.position.set(0.18, 0.052, 0.105);
  console_group.add(red_function_key);

  const green_start_key = new THREE.Mesh(new THREE.BoxGeometry(0.065, 0.02, 0.045), greenKeyMat);
  green_start_key.position.set(0.36, 0.052, 0.105);
  console_group.add(green_start_key);

  const blue_shift_key = new THREE.Mesh(new THREE.BoxGeometry(0.065, 0.02, 0.045), blueKeyMat);
  blue_shift_key.position.set(-0.49, 0.052, -0.105);
  console_group.add(blue_shift_key);

  const green_stop_key = new THREE.Mesh(new THREE.BoxGeometry(0.065, 0.02, 0.045), greenKeyMat);
  green_stop_key.position.set(-0.39, 0.052, -0.105);
  console_group.add(green_stop_key);

  const red_alert_key = new THREE.Mesh(new THREE.BoxGeometry(0.075, 0.022, 0.05), redKeyMat);
  red_alert_key.position.set(-0.52, 0.052, 0.105);
  console_group.add(red_alert_key);

  const knob_base = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.055, 0.018, 32), blackMat);
  knob_base.position.set(0.31, 0.055, -0.02);
  console_group.add(knob_base);

  const knob_grip = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 0.055, 24), darkPanelMat);
  knob_grip.position.set(0.31, 0.088, -0.02);
  console_group.add(knob_grip);

  const emergency_ring = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.055, 0.014, 32), yellowMat);
  emergency_ring.position.set(0.47, 0.052, 0.035);
  console_group.add(emergency_ring);

  const emergency_button = new THREE.Mesh(new THREE.CylinderGeometry(0.038, 0.038, 0.035, 32), redKeyMat);
  emergency_button.position.set(0.47, 0.078, 0.035);
  console_group.add(emergency_button);

  const monitor_group = new THREE.Group();
  monitor_group.position.set(-0.03, 0.83, 0.10);
  monitor_group.rotation.x = -0.22;
  root.add(monitor_group);

  const monitor_frame = new THREE.Mesh(new THREE.BoxGeometry(1.08, 0.42, 0.055), darkPanelMat);
  monitor_group.add(monitor_frame);

  const monitor_screen = new THREE.Mesh(new THREE.BoxGeometry(0.86, 0.30, 0.012), screenMat);
  monitor_screen.position.set(0, 0, 0.035);
  monitor_group.add(monitor_screen);

  const screen_sidebar = new THREE.Mesh(new THREE.BoxGeometry(0.11, 0.27, 0.006), screenBlueMat);
  screen_sidebar.position.set(-0.36, 0, 0.044);
  monitor_group.add(screen_sidebar);

  const screen_right_bar = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.27, 0.006), new THREE.MeshStandardMaterial({ color: 0x0b0f17, metalness: 0.0, roughness: 0.4 }));
  screen_right_bar.position.set(0.35, 0, 0.044);
  monitor_group.add(screen_right_bar);

  const screen_icon_geom = new THREE.BoxGeometry(0.035, 0.035, 0.006);
  const screen_icons = new THREE.InstancedMesh(screen_icon_geom, screenIconMat, 5);
  const iconDummy = new THREE.Object3D();
  for (let i = 0; i < 5; i++) {
    iconDummy.position.set(-0.36, 0.105 - i * 0.052, 0.05);
    iconDummy.updateMatrix();
    screen_icons.setMatrixAt(i, iconDummy.matrix);
  }
  monitor_group.add(screen_icons);

  const screen_text_line_1 = new THREE.Mesh(new THREE.BoxGeometry(0.075, 0.008, 0.004), screenIconMat);
  screen_text_line_1.position.set(-0.28, 0.13, 0.051);
  monitor_group.add(screen_text_line_1);

  const screen_text_line_2 = new THREE.Mesh(new THREE.BoxGeometry(0.055, 0.006, 0.004), screenIconMat);
  screen_text_line_2.position.set(-0.28, 0.112, 0.051);
  monitor_group.add(screen_text_line_2);

  const front_logo_plate = addBox(0.22, 0.055, 0.008, blackMat, -0.43, 0.405, 0.419);
  const logo_mark_1 = addBox(0.055, 0.012, 0.006, whiteMat, -0.49, 0.415, 0.426);
  const logo_mark_2 = addBox(0.045, 0.012, 0.006, whiteMat, -0.425, 0.415, 0.426);
  const logo_mark_3 = addBox(0.055, 0.012, 0.006, whiteMat, -0.355, 0.415, 0.426);

  const instruction_label = addBox(0.18, 0.085, 0.007, whiteMat, -0.45, 0.285, 0.421);
  const instruction_line_1 = addBox(0.14, 0.006, 0.004, blackMat, -0.45, 0.31, 0.427);
  const instruction_line_2 = addBox(0.12, 0.006, 0.004, blackMat, -0.45, 0.297, 0.427);
  const instruction_line_3 = addBox(0.13, 0.006, 0.004, blackMat, -0.45, 0.284, 0.427);
  const instruction_line_4 = addBox(0.10, 0.006, 0.004, blackMat, -0.45, 0.271, 0.427);

  const circular_service_door = addCylinderZ(0.145, 0.018, panelMat, 0.28, 0.27, 0.425, 64);
  const service_door_outline = addCylinderZ(0.151, 0.021, blackMat, 0.28, 0.27, 0.418, 64);
  const service_door_inner = addCylinderZ(0.137, 0.022, bodyMat, 0.28, 0.27, 0.435, 64);

  const service_door_screw_geom = new THREE.CylinderGeometry(0.012, 0.012, 0.008, 16);
  const service_door_screws = new THREE.InstancedMesh(service_door_screw_geom, silverMat, 4);
  const screwDummy = new THREE.Object3D();
  const screwPositions = [
    [0.28, 0.415, 0.445],
    [0.28, 0.125, 0.445],
    [0.135, 0.27, 0.445],
    [0.425, 0.27, 0.445]
  ];
  for (let i = 0; i < screwPositions.length; i++) {
    screwDummy.position.set(screwPositions[i][0], screwPositions[i][1], screwPositions[i][2]);
    screwDummy.rotation.x = Math.PI / 2;
    screwDummy.updateMatrix();
    service_door_screws.setMatrixAt(i, screwDummy.matrix);
  }
  root.add(service_door_screws);

  const power_socket_frame = addBox(0.075, 0.075, 0.018, blackMat, 0.02, 0.26, 0.427);
  const power_socket_face = addBox(0.045, 0.045, 0.021, darkPanelMat, 0.02, 0.26, 0.439);
  const power_socket_slot = addBox(0.026, 0.008, 0.024, blackMat, 0.02, 0.255, 0.452);

  const lower_handle_recess = addBox(0.26, 0.095, 0.018, blackMat, -0.08, 0.105, 0.424);
  const lower_handle_grip = addBox(0.18, 0.025, 0.035, darkPanelMat, -0.08, 0.12, 0.45);
  const handle_left_mount = addBox(0.025, 0.055, 0.025, silverMat, -0.18, 0.105, 0.445);
  const handle_right_mount = addBox(0.025, 0.055, 0.025, silverMat, 0.02, 0.105, 0.445);

  const front_bottom_shadow = addBox(1.12, 0.035, 0.035, blackMat, 0, 0.055, 0.39);

  const right_upper_reel_core = addCylinderX(0.135, 0.075, blackMat, 0.68, 0.61, -0.18, 48);
  const right_upper_reel_disc = addDiscY(0.155, 0.035, panelMat, 0.725, 0.61, -0.18, 48);
  const right_upper_reel_hub = addCylinderX(0.045, 0.095, darkPanelMat, 0.755, 0.61, -0.18, 32);
  const right_upper_reel_center = addCylinderX(0.025, 0.105, blackMat, 0.765, 0.61, -0.18, 24);

  const right_lower_reel_core = addCylinderX(0.16, 0.08, blackMat, 0.68, 0.31, 0.16, 48);
  const right_lower_reel_disc = addDiscY(0.18, 0.04, panelMat, 0.73, 0.31, 0.16, 48);
  const right_lower_reel_hub = addCylinderX(0.055, 0.105, darkPanelMat, 0.76, 0.31, 0.16, 32);
  const right_lower_reel_center = addCylinderX(0.03, 0.115, blackMat, 0.77, 0.31, 0.16, 24);

  const front_white_reel_core = addCylinderX(0.13, 0.06, blackMat, 0.68, 0.34, 0.31, 48);
  const front_white_reel_disc = addDiscY(0.15, 0.035, whiteMat, 0.72, 0.34, 0.31, 48);
  const front_white_reel_hub = addCylinderX(0.045, 0.08, darkPanelMat, 0.75, 0.34, 0.31, 32);
  const front_white_reel_center = addCylinderX(0.025, 0.09, blackMat, 0.76, 0.34, 0.31, 24);

  const reel_hole_geom = new THREE.CylinderGeometry(0.022, 0.022, 0.012, 16);
  const reel_holes = new THREE.InstancedMesh(reel_hole_geom, blackMat, 18);
  const holeDummy = new THREE.Object3D();
  const reelData = [
    [0.765, 0.61, -0.18, 0.115, 5],
    [0.775, 0.31, 0.16, 0.14, 5],
    [0.765, 0.34, 0.31, 0.115, 5]
  ];
  let holeIndex = 0;
  for (let r = 0; r < reelData.length; r++) {
    const rx = reelData[r][0];
    const ry = reelData[r][1];
    const rz = reelData[r][2];
    const rad = reelData[r][3];
    const count = reelData[r][4];
    for (let i = 0; i < count; i++) {
      const a = i / count * Math.PI * 2;
      holeDummy.position.set(rx + 0.006, ry + Math.sin(a) * rad, rz + Math.cos(a) * rad);
      holeDummy.rotation.z = Math.PI / 2;
      holeDummy.updateMatrix();
      reel_holes.setMatrixAt(holeIndex++, holeDummy.matrix);
    }
  }
  root.add(reel_holes);

  const side_horizontal_seam = addBox(0.012, 0.01, 0.66, blackMat, 0.648, 0.455, -0.03);
  const side_vertical_seam = addBox(0.012, 0.34, 0.01, blackMat, 0.648, 0.58, 0.18);
  const side_front_seam = addBox(0.012, 0.62, 0.01, blackMat, 0.648, 0.43, 0.31);

  const side_vent_geom = new THREE.BoxGeometry(0.012, 0.012, 0.20);
  const side_vent_slats = new THREE.InstancedMesh(side_vent_geom, blackMat, 6);
  const ventDummy = new THREE.Object3D();
  for (let i = 0; i < 6; i++) {
    ventDummy.position.set(0.65, 0.12 + i * 0.025, -0.18);
    ventDummy.updateMatrix();
    side_vent_slats.setMatrixAt(i, ventDummy.matrix);
  }
  root.add(side_vent_slats);

  const side_panel_screw_geom = new THREE.CylinderGeometry(0.01, 0.01, 0.008, 16);
  const side_panel_screws = new THREE.InstancedMesh(side_panel_screw_geom, blackMat, 8);
  const sideScrewDummy = new THREE.Object3D();
  const sideScrewPositions = [
    [0.655, 0.70, 0.25], [0.655, 0.47, 0.25],
    [0.655, 0.70, -0.29], [0.655, 0.47, -0.29],
    [0.655, 0.25, 0.25], [0.655, 0.10, 0.25],
    [0.655, 0.25, -0.29], [0.655, 0.10, -0.29]
  ];
  for (let i = 0; i < sideScrewPositions.length; i++) {
    sideScrewDummy.position.set(sideScrewPositions[i][0], sideScrewPositions[i][1], sideScrewPositions[i][2]);
    sideScrewDummy.rotation.z = Math.PI / 2;
    sideScrewDummy.updateMatrix();
    side_panel_screws.setMatrixAt(i, sideScrewDummy.matrix);
  }
  root.add(side_panel_screws);

  const foot_geom = new THREE.BoxGeometry(0.16, 0.07, 0.13);
  const rubber_feet = new THREE.InstancedMesh(foot_geom, rubberMat, 4);
  const footDummy = new THREE.Object3D();
  const footPositions = [
    [-0.52, 0.015, 0.28],
    [0.52, 0.015, 0.28],
    [-0.52, 0.015, -0.28],
    [0.52, 0.015, -0.28]
  ];
  for (let i = 0; i < footPositions.length; i++) {
    footDummy.position.set(footPositions[i][0], footPositions[i][1], footPositions[i][2]);
    footDummy.updateMatrix();
    rubber_feet.setMatrixAt(i, footDummy.matrix);
  }
  root.add(rubber_feet);

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
    const scale = 0.95 / maxDim;
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
