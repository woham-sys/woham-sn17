function __sn17_user(THREE) {
  const root = new THREE.Group();

  const housingMat = new THREE.MeshStandardMaterial({ color: 0x1f3655, metalness: 0.0, roughness: 0.55 });
  const darkBlueMat = new THREE.MeshStandardMaterial({ color: 0x14263d, metalness: 0.0, roughness: 0.65 });
  const blackMat = new THREE.MeshStandardMaterial({ color: 0x080a0c, metalness: 0.0, roughness: 0.75 });
  const bezelMat = new THREE.MeshStandardMaterial({ color: 0x20252a, metalness: 0.0, roughness: 0.55 });
  const lcdMat = new THREE.MeshStandardMaterial({ color: 0xb8c8bd, metalness: 0.0, roughness: 0.45 });
  const digitMat = new THREE.MeshStandardMaterial({ color: 0x66757b, metalness: 0.0, roughness: 0.65 });
  const greenButtonMat = new THREE.MeshStandardMaterial({ color: 0x29a85a, metalness: 0.0, roughness: 0.35 });
  const redButtonMat = new THREE.MeshStandardMaterial({ color: 0xe94a4a, metalness: 0.0, roughness: 0.35 });
  const orangeButtonMat = new THREE.MeshStandardMaterial({ color: 0xf05a24, metalness: 0.0, roughness: 0.35 });
  const silverMat = new THREE.MeshStandardMaterial({ color: 0xd8d8d2, metalness: 0.35, roughness: 0.35 });
  const brushedMat = new THREE.MeshStandardMaterial({ color: 0xaeb2b0, metalness: 0.45, roughness: 0.55 });
  const inkMat = new THREE.MeshStandardMaterial({ color: 0x202326, metalness: 0.0, roughness: 0.85 });
  const whiteMarkMat = new THREE.MeshStandardMaterial({ color: 0xe8eeee, metalness: 0.0, roughness: 0.55 });

  const bodyW = 0.50;
  const bodyL = 1.05;
  const bodyH = 0.18;
  const frontZ = bodyL / 2;
  const rearZ = -bodyL / 2;

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
    const geom = new THREE.ExtrudeGeometry(roundedRectShape(w, h, r), {
      depth: d,
      steps: 1,
      curveSegments: 8
    });
    geom.translate(0, 0, -d / 2);
    return geom;
  }

  const main_housing_geom = roundedExtrudeGeometry(bodyW, bodyL, bodyH, 0.085);
  const main_housing = new THREE.Mesh(main_housing_geom, housingMat);
  main_housing.rotation.x = Math.PI / 2;
  root.add(main_housing);

  const lower_shell_seam_geom = roundedExtrudeGeometry(bodyW * 0.98, bodyL * 0.96, 0.018, 0.075);
  const lower_shell_seam = new THREE.Mesh(lower_shell_seam_geom, darkBlueMat);
  lower_shell_seam.rotation.x = Math.PI / 2;
  lower_shell_seam.position.y = -bodyH / 2 - 0.004;
  root.add(lower_shell_seam);

  const top_panel_recess_geom = roundedExtrudeGeometry(0.36, 0.34, 0.008, 0.045);
  const top_panel_recess = new THREE.Mesh(top_panel_recess_geom, darkBlueMat);
  top_panel_recess.rotation.x = Math.PI / 2;
  top_panel_recess.position.set(0.02, bodyH / 2 + 0.003, -0.31);
  root.add(top_panel_recess);

  const display_bezel_geom = roundedExtrudeGeometry(0.38, 0.42, 0.022, 0.035);
  const display_bezel = new THREE.Mesh(display_bezel_geom, bezelMat);
  display_bezel.rotation.x = Math.PI / 2;
  display_bezel.position.set(-0.015, bodyH / 2 + 0.012, 0.035);
  root.add(display_bezel);

  const lcd_screen_geom = roundedExtrudeGeometry(0.285, 0.305, 0.006, 0.018);
  const lcd_screen = new THREE.Mesh(lcd_screen_geom, lcdMat);
  lcd_screen.rotation.x = Math.PI / 2;
  lcd_screen.position.set(-0.015, bodyH / 2 + 0.026, 0.045);
  root.add(lcd_screen);

  const battery_cover_geom = roundedExtrudeGeometry(0.155, 0.105, 0.014, 0.018);
  const battery_cover = new THREE.Mesh(battery_cover_geom, darkBlueMat);
  battery_cover.rotation.x = Math.PI / 2;
  battery_cover.position.set(0.075, bodyH / 2 + 0.012, -0.365);
  root.add(battery_cover);

  const battery_latch_geom = new THREE.BoxGeometry(0.105, 0.012, 0.035);
  const battery_latch = new THREE.Mesh(battery_latch_geom, blackMat);
  battery_latch.position.set(0.075, bodyH / 2 + 0.024, -0.365);
  root.add(battery_latch);

  const green_button_base_geom = roundedExtrudeGeometry(0.145, 0.105, 0.012, 0.025);
  const green_button_base = new THREE.Mesh(green_button_base_geom, blackMat);
  green_button_base.rotation.x = Math.PI / 2;
  green_button_base.position.set(-0.165, bodyH / 2 + 0.008, 0.365);
  root.add(green_button_base);

  const green_button_geom = roundedExtrudeGeometry(0.115, 0.078, 0.026, 0.018);
  const green_button = new THREE.Mesh(green_button_geom, greenButtonMat);
  green_button.rotation.x = Math.PI / 2;
  green_button.position.set(-0.165, bodyH / 2 + 0.025, 0.365);
  root.add(green_button);

  const red_button_base_geom = roundedExtrudeGeometry(0.145, 0.105, 0.012, 0.025);
  const red_button_base = new THREE.Mesh(red_button_base_geom, blackMat);
  red_button_base.rotation.x = Math.PI / 2;
  red_button_base.position.set(0.145, bodyH / 2 + 0.008, 0.365);
  root.add(red_button_base);

  const red_button_geom = roundedExtrudeGeometry(0.115, 0.078, 0.026, 0.018);
  const red_button = new THREE.Mesh(red_button_geom, redButtonMat);
  red_button.rotation.x = Math.PI / 2;
  red_button.position.set(0.145, bodyH / 2 + 0.025, 0.365);
  root.add(red_button);

  const side_orange_button_geom = roundedExtrudeGeometry(0.075, 0.105, 0.026, 0.018);
  const side_orange_button = new THREE.Mesh(side_orange_button_geom, orangeButtonMat);
  side_orange_button.rotation.y = Math.PI / 2;
  side_orange_button.position.set(bodyW / 2 + 0.012, 0.0, 0.12);
  root.add(side_orange_button);

  const side_rib_geom = new THREE.BoxGeometry(0.025, 0.075, 0.018);
  const side_grip_ribs = new THREE.InstancedMesh(side_rib_geom, darkBlueMat, 14);
  const rib_dummy = new THREE.Object3D();
  let rib_index = 0;
  for (const side of [-1, 1]) {
    for (let i = 0; i < 7; i++) {
      rib_dummy.position.set(side * (bodyW / 2 + 0.006), -0.025, 0.10 + i * 0.045);
      rib_dummy.rotation.set(0, 0, 0);
      rib_dummy.updateMatrix();
      side_grip_ribs.setMatrixAt(rib_index++, rib_dummy.matrix);
    }
  }
  root.add(side_grip_ribs);

  const front_sensor_slot_geom = new THREE.BoxGeometry(0.20, 0.055, 0.025);
  const front_sensor_slot = new THREE.Mesh(front_sensor_slot_geom, blackMat);
  front_sensor_slot.position.set(0, -0.015, frontZ + 0.006);
  root.add(front_sensor_slot);

  const probe_shaft_geom = new THREE.CylinderGeometry(0.018, 0.018, 0.48, 24);
  const probe_shaft = new THREE.Mesh(probe_shaft_geom, silverMat);
  probe_shaft.rotation.x = Math.PI / 2;
  probe_shaft.position.set(0, 0.0, rearZ - 0.22);
  root.add(probe_shaft);

  const probe_tip_geom = new THREE.SphereGeometry(0.022, 20, 10);
  const probe_tip = new THREE.Mesh(probe_tip_geom, silverMat);
  probe_tip.position.set(0, 0.0, rearZ - 0.47);
  root.add(probe_tip);

  const ruler_group = new THREE.Group();
  ruler_group.position.set(-0.035, 0, frontZ - 0.02);
  ruler_group.rotation.x = 0.045;
  root.add(ruler_group);

  const ruler_plate_geom = new THREE.BoxGeometry(0.30, 0.018, 0.95);
  const ruler_plate = new THREE.Mesh(ruler_plate_geom, silverMat);
  ruler_plate.position.set(0, 0, 0.475);
  ruler_group.add(ruler_plate);

  const ruler_brush_line_geom = new THREE.BoxGeometry(0.003, 0.003, 0.82);
  const ruler_brush_lines = new THREE.InstancedMesh(ruler_brush_line_geom, brushedMat, 7);
  const brush_dummy = new THREE.Object3D();
  for (let i = 0; i < 7; i++) {
    brush_dummy.position.set(-0.105 + i * 0.035, 0.012, 0.48);
    brush_dummy.rotation.set(0, 0, 0);
    brush_dummy.updateMatrix();
    ruler_brush_lines.setMatrixAt(i, brush_dummy.matrix);
  }
  ruler_group.add(ruler_brush_lines);

  const ruler_tick_geom = new THREE.BoxGeometry(0.006, 0.005, 0.055);
  const ruler_ticks = new THREE.InstancedMesh(ruler_tick_geom, inkMat, 42);
  const tick_dummy = new THREE.Object3D();
  let tick_index = 0;
  for (let i = 0; i <= 20; i++) {
    const z = 0.07 + i * 0.038;
    const len = i % 5 === 0 ? 0.105 : (i % 2 === 0 ? 0.075 : 0.052);
    tick_dummy.position.set(-0.145, 0.018, z);
    tick_dummy.rotation.set(0, 0, 0);
    tick_dummy.scale.set(1, 1, len / 0.055);
    tick_dummy.updateMatrix();
    ruler_ticks.setMatrixAt(tick_index++, tick_dummy.matrix);

    tick_dummy.position.set(0.145, 0.018, z);
    tick_dummy.scale.set(1, 1, len / 0.055);
    tick_dummy.updateMatrix();
    ruler_ticks.setMatrixAt(tick_index++, tick_dummy.matrix);
  }
  ruler_group.add(ruler_ticks);

  const ruler_number_geom = new THREE.BoxGeometry(0.038, 0.005, 0.006);
  const ruler_numbers = new THREE.InstancedMesh(ruler_number_geom, inkMat, 10);
  const number_dummy = new THREE.Object3D();
  for (let i = 0; i < 10; i++) {
    const z = 0.12 + i * 0.082;
    number_dummy.position.set(0.035, 0.020, z);
    number_dummy.rotation.set(0, i % 2 === 0 ? 0 : Math.PI / 2, 0);
    number_dummy.updateMatrix();
    ruler_numbers.setMatrixAt(i, number_dummy.matrix);
  }
  ruler_group.add(ruler_numbers);

  const left_end_tab_geom = new THREE.BoxGeometry(0.105, 0.022, 0.115);
  const left_end_tab = new THREE.Mesh(left_end_tab_geom, brushedMat);
  left_end_tab.position.set(-0.185, 0.0, 0.94);
  left_end_tab.rotation.y = -0.25;
  ruler_group.add(left_end_tab);

  const right_end_tab_geom = new THREE.BoxGeometry(0.105, 0.022, 0.115);
  const right_end_tab = new THREE.Mesh(right_end_tab_geom, brushedMat);
  right_end_tab.position.set(0.185, 0.0, 0.94);
  right_end_tab.rotation.y = 0.25;
  ruler_group.add(right_end_tab);

  const left_notch_shape = new THREE.Shape();
  left_notch_shape.moveTo(-0.07, 0.0);
  left_notch_shape.lineTo(0.07, 0.0);
  left_notch_shape.lineTo(0.0, 0.105);
  left_notch_shape.lineTo(-0.07, 0.0);
  const left_notch_geom = new THREE.ExtrudeGeometry(left_notch_shape, { depth: 0.018, steps: 1 });
  left_notch_geom.translate(0, 0, -0.009);
  const left_notch = new THREE.Mesh(left_notch_geom, brushedMat);
  left_notch.rotation.x = Math.PI / 2;
  left_notch.position.set(-0.075, 0.0, 0.94);
  ruler_group.add(left_notch);

  const right_notch_shape = new THREE.Shape();
  right_notch_shape.moveTo(-0.07, 0.0);
  right_notch_shape.lineTo(0.07, 0.0);
  right_notch_shape.lineTo(0.0, 0.105);
  right_notch_shape.lineTo(-0.07, 0.0);
  const right_notch_geom = new THREE.ExtrudeGeometry(right_notch_shape, { depth: 0.018, steps: 1 });
  right_notch_geom.translate(0, 0, -0.009);
  const right_notch = new THREE.Mesh(right_notch_geom, brushedMat);
  right_notch.rotation.x = Math.PI / 2;
  right_notch.position.set(0.075, 0.0, 0.94);
  ruler_group.add(right_notch);

  const lcd_digit_segment_geom = new THREE.BoxGeometry(0.052, 0.005, 0.009);
  const lcd_digits = new THREE.InstancedMesh(lcd_digit_segment_geom, digitMat, 14);
  const segment_dummy = new THREE.Object3D();
  const digit_centers = [-0.065, 0.035];
  let segment_index = 0;
  for (let d = 0; d < 2; d++) {
    const cx = digit_centers[d];
    const cz = 0.055;
    const segments = [
      [cx, cz + 0.055, 0],
      [cx, cz, 0],
      [cx, cz - 0.055, 0],
      [cx - 0.032, cz + 0.028, Math.PI / 2],
      [cx + 0.032, cz + 0.028, Math.PI / 2],
      [cx - 0.032, cz - 0.028, Math.PI / 2],
      [cx + 0.032, cz - 0.028, Math.PI / 2]
    ];
    for (let i = 0; i < 7; i++) {
      if (d === 0 && i === 6) continue;
      if (d === 1 && (i === 3 || i === 5)) continue;
      segment_dummy.position.set(segments[i][0], bodyH / 2 + 0.032, segments[i][1]);
      segment_dummy.rotation.set(0, segments[i][2], 0);
      segment_dummy.updateMatrix();
      lcd_digits.setMatrixAt(segment_index++, segment_dummy.matrix);
    }
  }
  root.add(lcd_digits);

  const brand_logo_geom = new THREE.BoxGeometry(0.055, 0.005, 0.008);
  const brand_logo_marks = new THREE.InstancedMesh(brand_logo_geom, whiteMarkMat, 12);
  const logo_dummy = new THREE.Object3D();
  const logo_data = [
    [-0.105, -0.205, 0.0, 1.0],
    [-0.045, -0.205, 0.0, 0.8],
    [0.015, -0.205, 0.0, 0.9],
    [0.075, -0.205, 0.0, 0.7],
    [-0.075, -0.165, Math.PI / 2, 0.75],
    [-0.015, -0.165, Math.PI / 2, 0.9],
    [0.045, -0.165, Math.PI / 2, 0.7],
    [-0.095, -0.125, 0.0, 0.55],
    [-0.035, -0.125, 0.0, 0.65],
    [0.025, -0.125, 0.0, 0.55],
    [0.085, -0.125, 0.0, 0.45],
    [0.000, -0.245, 0.0, 1.35]
  ];
  for (let i = 0; i < logo_data.length; i++) {
    logo_dummy.position.set(logo_data[i][0], bodyH / 2 + 0.031, logo_data[i][1]);
    logo_dummy.rotation.set(0, logo_data[i][2], 0);
    logo_dummy.scale.set(logo_data[i][3], 1, 1);
    logo_dummy.updateMatrix();
    brand_logo_marks.setMatrixAt(i, logo_dummy.matrix);
  }
  root.add(brand_logo_marks);

  const button_label_geom = new THREE.BoxGeometry(0.035, 0.004, 0.006);
  const button_labels = new THREE.InstancedMesh(button_label_geom, whiteMarkMat, 6);
  const label_dummy = new THREE.Object3D();
  const label_positions = [
    [-0.165, 0.445, 0],
    [-0.135, 0.445, Math.PI / 2],
    [0.145, 0.445, 0],
    [0.175, 0.445, Math.PI / 2],
    [-0.055, 0.315, 0],
    [0.025, 0.315, Math.PI / 2]
  ];
  for (let i = 0; i < label_positions.length; i++) {
    label_dummy.position.set(label_positions[i][0], bodyH / 2 + 0.031, label_positions[i][1]);
    label_dummy.rotation.set(0, label_positions[i][2], 0);
    label_dummy.updateMatrix();
    button_labels.setMatrixAt(i, label_dummy.matrix);
  }
  root.add(button_labels);

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
