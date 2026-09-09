function __sn17_user(THREE) {
  const root = new THREE.Group();

  const baseW = 1.36;
  const baseD = 0.82;
  const baseH = 0.055;
  const screenW = 1.18;
  const screenH = 0.76;
  const screenT = 0.035;

  const chassisMat = new THREE.MeshStandardMaterial({ color: 0x34345f, metalness: 0.35, roughness: 0.45 });
  const darkChassisMat = new THREE.MeshStandardMaterial({ color: 0x17191d, metalness: 0.25, roughness: 0.55 });
  const rubberMat = new THREE.MeshStandardMaterial({ color: 0x08090a, metalness: 0.0, roughness: 0.85 });
  const keycapMat = new THREE.MeshStandardMaterial({ color: 0x111219, metalness: 0.0, roughness: 0.7 });
  const cyanLedMat = new THREE.MeshStandardMaterial({ color: 0x24eaff, emissive: 0x24eaff, metalness: 0.0, roughness: 0.35 });
  const magentaLedMat = new THREE.MeshStandardMaterial({ color: 0xff35bd, emissive: 0xff35bd, metalness: 0.0, roughness: 0.35 });
  const violetLedMat = new THREE.MeshStandardMaterial({ color: 0x9b55ff, emissive: 0x9b55ff, metalness: 0.0, roughness: 0.35 });
  const labelMat = new THREE.MeshStandardMaterial({ color: 0xbfc4d2, metalness: 0.0, roughness: 0.5 });
  const portMat = new THREE.MeshStandardMaterial({ color: 0x020304, metalness: 0.0, roughness: 0.75 });

  function roundedRectShape(w, h, r) {
    const shape = new THREE.Shape();
    const x = -w / 2;
    const y = -h / 2;
    shape.moveTo(x + r, y);
    shape.lineTo(x + w - r, y);
    shape.quadraticCurveTo(x + w, y, x + w, y + r);
    shape.lineTo(x + w, y + h - r);
    shape.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    shape.lineTo(x + r, y + h);
    shape.quadraticCurveTo(x, y + h, x, y + h - r);
    shape.lineTo(x, y + r);
    shape.quadraticCurveTo(x, y, x + r, y);
    return shape;
  }

  function roundedExtrudeGeometry(w, h, d, r) {
    return new THREE.ExtrudeGeometry(roundedRectShape(w, h, r), {
      depth: d,
      steps: 1,
      curveSegments: 8,
      bevelEnabled: true,
      bevelThickness: Math.min(d * 0.22, 0.006),
      bevelSize: Math.min(r * 0.22, 0.006),
      bevelSegments: 2
    });
  }

  const baseGeom = roundedExtrudeGeometry(baseW, baseD, baseH, 0.055);
  const base_chassis = new THREE.Mesh(baseGeom, chassisMat);
  base_chassis.rotation.x = -Math.PI / 2;
  base_chassis.position.set(0, 0, 0.03);
  root.add(base_chassis);

  const front_lipGeom = new THREE.BoxGeometry(baseW * 0.92, 0.018, 0.035);
  const front_lip = new THREE.Mesh(front_lipGeom, darkChassisMat);
  front_lip.position.set(0, baseH * 0.72, baseD / 2 + 0.012);
  root.add(front_lip);

  const front_cyan_lightGeom = new THREE.BoxGeometry(0.52, 0.008, 0.012);
  const front_cyan_light = new THREE.Mesh(front_cyan_lightGeom, cyanLedMat);
  front_cyan_light.position.set(-0.18, baseH * 0.92, baseD / 2 + 0.034);
  root.add(front_cyan_light);

  const front_magenta_lightGeom = new THREE.BoxGeometry(0.34, 0.008, 0.012);
  const front_magenta_light = new THREE.Mesh(front_magenta_lightGeom, magentaLedMat);
  front_magenta_light.position.set(0.36, baseH * 0.92, baseD / 2 + 0.035);
  root.add(front_magenta_light);

  const left_side_glowGeom = new THREE.BoxGeometry(0.012, 0.01, 0.42);
  const left_side_glow = new THREE.Mesh(left_side_glowGeom, violetLedMat);
  left_side_glow.position.set(-baseW / 2 - 0.006, baseH * 0.78, 0.08);
  root.add(left_side_glow);

  const right_side_glowGeom = new THREE.BoxGeometry(0.012, 0.01, 0.34);
  const right_side_glow = new THREE.Mesh(right_side_glowGeom, magentaLedMat);
  right_side_glow.position.set(baseW / 2 + 0.006, baseH * 0.78, 0.12);
  root.add(right_side_glow);

  const keyboard_recessGeom = new THREE.BoxGeometry(1.02, 0.012, 0.34);
  const keyboard_recess = new THREE.Mesh(keyboard_recessGeom, darkChassisMat);
  keyboard_recess.position.set(0, baseH + 0.006, -0.13);
  root.add(keyboard_recess);

  const keyRows = 5;
  const keyCols = 14;
  const keyCount = keyRows * keyCols;
  const keycapGeom = new THREE.BoxGeometry(0.052, 0.014, 0.045);
  const keycaps = new THREE.InstancedMesh(keycapGeom, keycapMat, keyCount);
  const keyMatrix = new THREE.Matrix4();
  let keyIndex = 0;
  for (let row = 0; row < keyRows; row++) {
    for (let col = 0; col < keyCols; col++) {
      const x = (col - (keyCols - 1) / 2) * 0.068;
      const z = -0.245 + row * 0.057;
      keyMatrix.makeTranslation(x, baseH + 0.019, z);
      keycaps.setMatrixAt(keyIndex++, keyMatrix);
    }
  }
  root.add(keycaps);

  const keyGlowGeom = new THREE.BoxGeometry(0.058, 0.004, 0.051);
  const cyanKeyPositions = [];
  const magentaKeyPositions = [];
  for (let row = 0; row < keyRows; row++) {
    for (let col = 0; col < keyCols; col++) {
      const x = (col - (keyCols - 1) / 2) * 0.068;
      const z = -0.245 + row * 0.057;
      if ((row + col) % 2 === 0) cyanKeyPositions.push([x, z]);
      else magentaKeyPositions.push([x, z]);
    }
  }

  const cyan_key_glow = new THREE.InstancedMesh(keyGlowGeom, cyanLedMat, cyanKeyPositions.length);
  for (let i = 0; i < cyanKeyPositions.length; i++) {
    keyMatrix.makeTranslation(cyanKeyPositions[i][0], baseH + 0.028, cyanKeyPositions[i][1]);
    cyan_key_glow.setMatrixAt(i, keyMatrix);
  }
  root.add(cyan_key_glow);

  const magenta_key_glow = new THREE.InstancedMesh(keyGlowGeom, magentaLedMat, magentaKeyPositions.length);
  for (let i = 0; i < magentaKeyPositions.length; i++) {
    keyMatrix.makeTranslation(magentaKeyPositions[i][0], baseH + 0.028, magentaKeyPositions[i][1]);
    magenta_key_glow.setMatrixAt(i, keyMatrix);
  }
  root.add(magenta_key_glow);

  const spacebarGeom = new THREE.BoxGeometry(0.34, 0.014, 0.045);
  const spacebar = new THREE.Mesh(spacebarGeom, keycapMat);
  spacebar.position.set(0, baseH + 0.019, 0.005);
  root.add(spacebar);

  const spacebar_glowGeom = new THREE.BoxGeometry(0.35, 0.004, 0.051);
  const spacebar_glow = new THREE.Mesh(spacebar_glowGeom, magentaLedMat);
  spacebar_glow.position.set(0, baseH + 0.028, 0.005);
  root.add(spacebar_glow);

  const arrow_keysGeom = new THREE.BoxGeometry(0.05, 0.014, 0.045);
  const arrow_keys = new THREE.InstancedMesh(arrow_keysGeom, keycapMat, 4);
  const arrowPositions = [
    [0.43, 0.005],
    [0.49, 0.005],
    [0.46, 0.062],
    [0.49, -0.052]
  ];
  for (let i = 0; i < arrowPositions.length; i++) {
    keyMatrix.makeTranslation(arrowPositions[i][0], baseH + 0.019, arrowPositions[i][1]);
    arrow_keys.setMatrixAt(i, keyMatrix);
  }
  root.add(arrow_keys);

  const touchpad_outlineGeom = new THREE.BoxGeometry(0.42, 0.006, 0.22);
  const touchpad_outline = new THREE.Mesh(touchpad_outlineGeom, darkChassisMat);
  touchpad_outline.position.set(-0.28, baseH + 0.008, 0.255);
  root.add(touchpad_outline);

  const touchpad_surfaceGeom = new THREE.BoxGeometry(0.39, 0.004, 0.19);
  const touchpad_surface = new THREE.Mesh(touchpad_surfaceGeom, chassisMat);
  touchpad_surface.position.set(-0.28, baseH + 0.013, 0.255);
  root.add(touchpad_surface);

  const hinge_barGeom = new THREE.CylinderGeometry(0.025, 0.025, 0.92, 24);
  const hinge_bar = new THREE.Mesh(hinge_barGeom, darkChassisMat);
  hinge_bar.rotation.z = Math.PI / 2;
  hinge_bar.position.set(0, baseH + 0.025, -0.365);
  root.add(hinge_bar);

  const hinge_capGeom = new THREE.CylinderGeometry(0.032, 0.032, 0.075, 24);
  const left_hinge_cap = new THREE.Mesh(hinge_capGeom, darkChassisMat);
  left_hinge_cap.rotation.z = Math.PI / 2;
  left_hinge_cap.position.set(-0.49, baseH + 0.025, -0.365);
  root.add(left_hinge_cap);

  const right_hinge_cap = new THREE.Mesh(hinge_capGeom, darkChassisMat);
  right_hinge_cap.rotation.z = Math.PI / 2;
  right_hinge_cap.position.set(0.49, baseH + 0.025, -0.365);
  root.add(right_hinge_cap);

  const screen_group = new THREE.Group();
  screen_group.position.set(0, baseH + 0.015, -0.365);
  screen_group.rotation.x = -0.14;
  root.add(screen_group);

  const screen_shellGeom = roundedExtrudeGeometry(screenW, screenH, screenT, 0.035);
  const screen_shell = new THREE.Mesh(screen_shellGeom, darkChassisMat);
  screen_shell.position.set(0, screenH / 2, 0);
  screen_group.add(screen_shell);

  const displayW = 1.04;
  const displayH = 0.58;
  const displayY = 0.43;
  const displayMat = new THREE.MeshBasicMaterial({ color: 0x06122c });
  const display_panelGeom = new THREE.PlaneGeometry(displayW, displayH);
  const display_panel = new THREE.Mesh(display_panelGeom, displayMat);
  display_panel.position.set(0, displayY, screenT + 0.006);
  screen_group.add(display_panel);

  const screen_top_bezelGeom = new THREE.BoxGeometry(1.08, 0.055, 0.012);
  const screen_top_bezel = new THREE.Mesh(screen_top_bezelGeom, darkChassisMat);
  screen_top_bezel.position.set(0, 0.705, screenT + 0.008);
  screen_group.add(screen_top_bezel);

  const screen_bottom_bezelGeom = new THREE.BoxGeometry(1.08, 0.095, 0.012);
  const screen_bottom_bezel = new THREE.Mesh(screen_bottom_bezelGeom, darkChassisMat);
  screen_bottom_bezel.position.set(0, 0.095, screenT + 0.008);
  screen_group.add(screen_bottom_bezel);

  const screen_side_bezelGeom = new THREE.BoxGeometry(0.055, 0.61, 0.012);
  const screen_left_bezel = new THREE.Mesh(screen_side_bezelGeom, darkChassisMat);
  screen_left_bezel.position.set(-0.555, displayY, screenT + 0.008);
  screen_group.add(screen_left_bezel);

  const screen_right_bezel = new THREE.Mesh(screen_side_bezelGeom, darkChassisMat);
  screen_right_bezel.position.set(0.555, displayY, screenT + 0.008);
  screen_group.add(screen_right_bezel);

  const webcam_ringGeom = new THREE.CircleGeometry(0.014, 24);
  const webcam_ring = new THREE.Mesh(webcam_ringGeom, portMat);
  webcam_ring.position.set(0, 0.713, screenT + 0.016);
  screen_group.add(webcam_ring);

  const webcam_lensGeom = new THREE.CircleGeometry(0.006, 16);
  const webcam_lens = new THREE.Mesh(webcam_lensGeom, new THREE.MeshBasicMaterial({ color: 0x111b2b }));
  webcam_lens.position.set(0, 0.713, screenT + 0.018);
  screen_group.add(webcam_lens);

  const microphone_dotGeom = new THREE.CircleGeometry(0.0035, 10);
  const left_microphone_dot = new THREE.Mesh(microphone_dotGeom, portMat);
  left_microphone_dot.position.set(-0.055, 0.713, screenT + 0.017);
  screen_group.add(left_microphone_dot);

  const right_microphone_dot = new THREE.Mesh(microphone_dotGeom, portMat);
  right_microphone_dot.position.set(0.055, 0.713, screenT + 0.017);
  screen_group.add(right_microphone_dot);

  const logo_markGeom = new THREE.BoxGeometry(0.012, 0.026, 0.006);
  const logo_marks = new THREE.InstancedMesh(logo_markGeom, labelMat, 6);
  for (let i = 0; i < 6; i++) {
    const x = -0.032 + i * 0.014;
    const matrix = new THREE.Matrix4().makeRotationZ((i % 2 === 0 ? -1 : 1) * 0.22);
    matrix.setPosition(x, 0.095, screenT + 0.018);
    logo_marks.setMatrixAt(i, matrix);
  }
  screen_group.add(logo_marks);

  const taskbarMat = new THREE.MeshBasicMaterial({ color: 0x070b13 });
  const taskbarGeom = new THREE.PlaneGeometry(displayW, 0.026);
  const taskbar = new THREE.Mesh(taskbarGeom, taskbarMat);
  taskbar.position.set(0, 0.151, screenT + 0.014);
  screen_group.add(taskbar);

  const start_iconGeom = new THREE.PlaneGeometry(0.018, 0.018);
  const start_icon = new THREE.Mesh(start_iconGeom, cyanLedMat);
  start_icon.position.set(-0.49, 0.151, screenT + 0.017);
  screen_group.add(start_icon);

  const taskbar_iconsGeom = new THREE.PlaneGeometry(0.012, 0.012);
  const taskbar_icons = new THREE.InstancedMesh(taskbar_iconsGeom, labelMat, 8);
  for (let i = 0; i < 8; i++) {
    const matrix = new THREE.Matrix4().makeTranslation(0.34 + i * 0.026, 0.151, screenT + 0.017);
    taskbar_icons.setMatrixAt(i, matrix);
  }
  screen_group.add(taskbar_icons);

  const desktop_sidebarMat = new THREE.MeshBasicMaterial({ color: 0x111827, transparent: true, opacity: 0.82 });
  const desktop_sidebarGeom = new THREE.PlaneGeometry(0.095, 0.42);
  const desktop_sidebar = new THREE.Mesh(desktop_sidebarGeom, desktop_sidebarMat);
  desktop_sidebar.position.set(-0.47, 0.43, screenT + 0.016);
  screen_group.add(desktop_sidebar);

  const desktop_iconsGeom = new THREE.PlaneGeometry(0.022, 0.022);
  const desktop_icons_cyan = new THREE.InstancedMesh(desktop_iconsGeom, cyanLedMat, 3);
  const desktop_icons_magenta = new THREE.InstancedMesh(desktop_iconsGeom, magentaLedMat, 3);
  for (let i = 0; i < 3; i++) {
    const y = 0.59 - i * 0.075;
    const m1 = new THREE.Matrix4().makeTranslation(-0.47, y, screenT + 0.019);
    desktop_icons_cyan.setMatrixAt(i, m1);
    const m2 = new THREE.Matrix4().makeTranslation(-0.47, y - 0.038, screenT + 0.019);
    desktop_icons_magenta.setMatrixAt(i, m2);
  }
  screen_group.add(desktop_icons_cyan);
  screen_group.add(desktop_icons_magenta);

  const mountainShape = new THREE.Shape();
  mountainShape.moveTo(-0.48, 0.20);
  mountainShape.lineTo(-0.34, 0.34);
  mountainShape.lineTo(-0.25, 0.28);
  mountainShape.lineTo(-0.12, 0.43);
  mountainShape.lineTo(-0.02, 0.27);
  mountainShape.lineTo(0.12, 0.36);
  mountainShape.lineTo(0.25, 0.24);
  mountainShape.lineTo(0.48, 0.31);
  mountainShape.lineTo(0.48, 0.18);
  mountainShape.lineTo(-0.48, 0.18);
  mountainShape.closePath();
  const mountain_rangeGeom = new THREE.ShapeGeometry(mountainShape);
  const mountain_rangeMat = new THREE.MeshBasicMaterial({ color: 0x10233d });
  const mountain_range = new THREE.Mesh(mountain_rangeGeom, mountain_rangeMat);
  mountain_range.position.z = screenT + 0.018;
  screen_group.add(mountain_range);

  const roadShape = new THREE.Shape();
  roadShape.moveTo(-0.08, 0.20);
  roadShape.lineTo(0.08, 0.20);
  roadShape.lineTo(0.36, 0.34);
  roadShape.lineTo(-0.36, 0.34);
  roadShape.closePath();
  const road_panelGeom = new THREE.ShapeGeometry(roadShape);
  const road_panelMat = new THREE.MeshBasicMaterial({ color: 0x17203a });
  const road_panel = new THREE.Mesh(road_panelGeom, road_panelMat);
  road_panel.position.z = screenT + 0.02;
  screen_group.add(road_panel);

  const tree_trunkShape = new THREE.Shape();
  tree_trunkShape.moveTo(-0.39, 0.22);
  tree_trunkShape.lineTo(-0.31, 0.22);
  tree_trunkShape.lineTo(-0.33, 0.48);
  tree_trunkShape.lineTo(-0.37, 0.48);
  tree_trunkShape.closePath();
  const tree_trunkGeom = new THREE.ShapeGeometry(tree_trunkShape);
  const tree_trunkMat = new THREE.MeshBasicMaterial({ color: 0x2b1d18 });
  const tree_trunk = new THREE.Mesh(tree_trunkGeom, tree_trunkMat);
  tree_trunk.position.z = screenT + 0.022;
  screen_group.add(tree_trunk);

  const tree_branchesGeom = new THREE.BoxGeometry(0.09, 0.008, 0.004);
  const tree_branches = new THREE.InstancedMesh(tree_branchesGeom, tree_trunkMat, 7);
  const branchData = [
    [-0.35, 0.43, 0.75, 0.55],
    [-0.35, 0.45, -0.75, 0.55],
    [-0.35, 0.48, 0.35, 0.75],
    [-0.35, 0.49, -0.35, 0.75],
    [-0.38, 0.39, 1.15, 0.45],
    [-0.32, 0.39, -1.15, 0.45],
    [-0.35, 0.51, 0.05, 0.85]
  ];
  for (let i = 0; i < branchData.length; i++) {
    const matrix = new THREE.Matrix4().compose(
      new THREE.Vector3(branchData[i][0], branchData[i][1], screenT + 0.024),
      new THREE.Quaternion().setFromEuler(new THREE.Euler(0, 0, branchData[i][2])),
      new THREE.Vector3(branchData[i][3], 1, 1)
    );
    tree_branches.setMatrixAt(i, matrix);
  }
  screen_group.add(tree_branches);

  const screen_lineGeom = new THREE.BoxGeometry(0.006, 0.42, 0.004);
  function makeScreenLine(mat, x, y, length, angle, widthScale) {
    const line = new THREE.Mesh(screen_lineGeom, mat);
    line.position.set(x, y, screenT + 0.028);
    line.rotation.z = angle;
    line.scale.set(widthScale, length / 0.42, 1);
    screen_group.add(line);
    return line;
  }

  const cyan_screen_ray_1 = makeScreenLine(cyanLedMat, -0.18, 0.43, 0.58, -0.38, 1.0);
  const cyan_screen_ray_2 = makeScreenLine(cyanLedMat, 0.02, 0.39, 0.54, 0.28, 0.7);
  const magenta_screen_ray_1 = makeScreenLine(magentaLedMat, 0.18, 0.43, 0.62, -0.22, 1.0);
  const magenta_screen_ray_2 = makeScreenLine(magentaLedMat, 0.34, 0.31, 0.42, 0.95, 0.7);
  const violet_screen_ray = makeScreenLine(violetLedMat, -0.02, 0.31, 0.48, 1.18, 0.6);
  const blue_screen_ray = makeScreenLine(new THREE.MeshBasicMaterial({ color: 0x4b7dff }), 0.42, 0.55, 0.32, -0.75, 0.6);

  const star_dotsGeom = new THREE.CircleGeometry(0.003, 8);
  const star_dots = new THREE.InstancedMesh(star_dotsGeom, labelMat, 30);
  for (let i = 0; i < 30; i++) {
    const x = -0.46 + (((i * 37) % 97) / 97) * 0.92;
    const y = 0.22 + (((i * 53) % 89) / 89) * 0.48;
    const matrix = new THREE.Matrix4().makeTranslation(x, y, screenT + 0.03);
    star_dots.setMatrixAt(i, matrix);
  }
  screen_group.add(star_dots);

  const pc_tower_panelGeom = new THREE.PlaneGeometry(0.22, 0.34);
  const pc_tower_panelMat = new THREE.MeshBasicMaterial({ color: 0x0b0d18 });
  const pc_tower_panel = new THREE.Mesh(pc_tower_panelGeom, pc_tower_panelMat);
  pc_tower_panel.position.set(0.37, 0.43, screenT + 0.024);
  screen_group.add(pc_tower_panel);

  const pc_tower_frameGeom = new THREE.BoxGeometry(0.23, 0.35, 0.006);
  const pc_tower_frameMat = new THREE.MeshBasicMaterial({ color: 0x171222 });
  const pc_tower_frame = new THREE.Mesh(pc_tower_frameGeom, pc_tower_frameMat);
  pc_tower_frame.position.set(0.37, 0.43, screenT + 0.021);
  screen_group.add(pc_tower_frame);

  const fan_ringGeom = new THREE.TorusGeometry(0.045, 0.008, 12, 32);
  const upper_fan_ring = new THREE.Mesh(fan_ringGeom, magentaLedMat);
  upper_fan_ring.position.set(0.37, 0.50, screenT + 0.032);
  screen_group.add(upper_fan_ring);

  const lower_fan_ring = new THREE.Mesh(fan_ringGeom, cyanLedMat);
  lower_fan_ring.position.set(0.37, 0.36, screenT + 0.032);
  screen_group.add(lower_fan_ring);

  const fan_inner_ringGeom = new THREE.TorusGeometry(0.028, 0.006, 10, 28);
  const upper_fan_inner_ring = new THREE.Mesh(fan_inner_ringGeom, cyanLedMat);
  upper_fan_inner_ring.position.set(0.37, 0.50, screenT + 0.034);
  screen_group.add(upper_fan_inner_ring);

  const lower_fan_inner_ring = new THREE.Mesh(fan_inner_ringGeom, magentaLedMat);
  lower_fan_inner_ring.position.set(0.37, 0.36, screenT + 0.034);
  screen_group.add(lower_fan_inner_ring);

  const fan_hubGeom = new THREE.CircleGeometry(0.014, 20);
  const upper_fan_hub = new THREE.Mesh(fan_hubGeom, portMat);
  upper_fan_hub.position.set(0.37, 0.50, screenT + 0.036);
  screen_group.add(upper_fan_hub);

  const lower_fan_hub = new THREE.Mesh(fan_hubGeom, portMat);
  lower_fan_hub.position.set(0.37, 0.36, screenT + 0.036);
  screen_group.add(lower_fan_hub);

  const tower_vertical_lightGeom = new THREE.BoxGeometry(0.008, 0.31, 0.006);
  const tower_vertical_light = new THREE.Mesh(tower_vertical_lightGeom, violetLedMat);
  tower_vertical_light.position.set(0.265, 0.43, screenT + 0.034);
  screen_group.add(tower_vertical_light);

  const tower_accentGeom = new THREE.BoxGeometry(0.075, 0.008, 0.006);
  const tower_accent_top = new THREE.Mesh(tower_accentGeom, magentaLedMat);
  tower_accent_top.position.set(0.43, 0.585, screenT + 0.035);
  screen_group.add(tower_accent_top);

  const tower_accent_middle = new THREE.Mesh(tower_accentGeom, cyanLedMat);
  tower_accent_middle.position.set(0.43, 0.43, screenT + 0.035);
  screen_group.add(tower_accent_middle);

  const tower_accent_lower = new THREE.Mesh(tower_accentGeom, violetLedMat);
  tower_accent_lower.position.set(0.43, 0.285, screenT + 0.035);
  screen_group.add(tower_accent_lower);

  const right_port_1Geom = new THREE.BoxGeometry(0.012, 0.025, 0.055);
  const right_port_1 = new THREE.Mesh(right_port_1Geom, portMat);
  right_port_1.position.set(baseW / 2 + 0.006, baseH * 0.55, 0.18);
  root.add(right_port_1);

  const right_port_2 = new THREE.Mesh(right_port_1Geom, portMat);
  right_port_2.position.set(baseW / 2 + 0.006, baseH * 0.55, 0.25);
  root.add(right_port_2);

  const right_port_3 = new THREE.Mesh(right_port_1Geom, portMat);
  right_port_3.position.set(baseW / 2 + 0.006, baseH * 0.55, 0.32);
  root.add(right_port_3);

  const right_port_4 = new THREE.Mesh(right_port_1Geom, portMat);
  right_port_4.position.set(baseW / 2 + 0.006, baseH * 0.55, 0.39);
  root.add(right_port_4);

  const usb_insertGeom = new THREE.BoxGeometry(0.014, 0.006, 0.038);
  const usb_insert_1 = new THREE.Mesh(usb_insertGeom, cyanLedMat);
  usb_insert_1.position.set(baseW / 2 + 0.013, baseH * 0.57, 0.18);
  root.add(usb_insert_1);

  const usb_insert_2 = new THREE.Mesh(usb_insertGeom, magentaLedMat);
  usb_insert_2.position.set(baseW / 2 + 0.013, baseH * 0.57, 0.32);
  root.add(usb_insert_2);

  const footGeom = new THREE.BoxGeometry(0.16, 0.012, 0.04);
  const left_foot = new THREE.Mesh(footGeom, rubberMat);
  left_foot.position.set(-0.45, -0.006, 0.28);
  root.add(left_foot);

  const right_foot = new THREE.Mesh(footGeom, rubberMat);
  right_foot.position.set(0.45, -0.006, 0.28);
  root.add(right_foot);

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
