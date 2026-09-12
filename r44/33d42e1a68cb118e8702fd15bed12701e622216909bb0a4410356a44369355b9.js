// miner-diag: gpus=? tflops=? stream48=? power=? probe_tps=3831 cpu_quota=?/? net=? batch=2 wall=1559 seed=870128282
export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "cordless_drill";

  const black_plasticMat = new THREE.MeshStandardMaterial({
    color: 0x202225,
    metalness: 0.0,
    roughness: 0.8,
  });
  const dark_detailMat = new THREE.MeshStandardMaterial({
    color: 0x0d0e0f,
    metalness: 0.0,
    roughness: 0.8,
  });
  const rubberMat = new THREE.MeshStandardMaterial({
    color: 0x151617,
    metalness: 0.0,
    roughness: 0.8,
  });
  const yellow_plasticMat = new THREE.MeshStandardMaterial({
    color: 0xffd400,
    metalness: 0.0,
    roughness: 0.3,
  });
  const silverMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25,
  });
  const brushed_metalMat = new THREE.MeshStandardMaterial({
    color: 0x909090,
    metalness: 0.6,
    roughness: 0.5,
  });
  const white_printMat = new THREE.MeshStandardMaterial({
    color: 0xe8e8e8,
    metalness: 0.0,
    roughness: 0.7,
  });

  const main_housingProfile = [
    new THREE.Vector2(0.00, -1.18),
    new THREE.Vector2(0.22, -1.18),
    new THREE.Vector2(0.31, -1.10),
    new THREE.Vector2(0.36, -0.92),
    new THREE.Vector2(0.37, -0.45),
    new THREE.Vector2(0.39, 0.18),
    new THREE.Vector2(0.38, 0.50),
    new THREE.Vector2(0.34, 0.66),
    new THREE.Vector2(0.00, 0.66),
  ];
  const main_housingGeom = new THREE.LatheGeometry(main_housingProfile, 40);
  const main_housing = new THREE.Mesh(main_housingGeom, black_plasticMat);
  main_housing.name = "main_housing";
  main_housing.rotation.x = Math.PI / 2;
  main_housing.position.y = 0.35;
  root.add(main_housing);

  const motor_bandGeom = new THREE.CylinderGeometry(0.39, 0.39, 0.20, 40);
  const motor_band = new THREE.Mesh(motor_bandGeom, dark_detailMat);
  motor_band.name = "motor_band";
  motor_band.rotation.x = Math.PI / 2;
  motor_band.position.set(0, 0.35, 0.48);
  root.add(motor_band);

  const housing_seamGeom = new THREE.TorusGeometry(0.372, 0.012, 8, 40);
  const housing_seam = new THREE.Mesh(housing_seamGeom, rubberMat);
  housing_seam.name = "housing_seam";
  housing_seam.position.set(0, 0.35, 0.37);
  root.add(housing_seam);

  const rear_capGeom = new THREE.SphereGeometry(0.31, 28, 16);
  const rear_cap = new THREE.Mesh(rear_capGeom, black_plasticMat);
  rear_cap.name = "rear_cap";
  rear_cap.scale.set(1.0, 1.0, 0.55);
  rear_cap.position.set(0, 0.35, -1.17);
  root.add(rear_cap);

  const rear_cap_seamGeom = new THREE.TorusGeometry(0.305, 0.012, 8, 36);
  const rear_cap_seam = new THREE.Mesh(rear_cap_seamGeom, rubberMat);
  rear_cap_seam.name = "rear_cap_seam";
  rear_cap_seam.position.set(0, 0.35, -1.03);
  root.add(rear_cap_seam);

  const chuckProfile = [
    new THREE.Vector2(0.00, 0.55),
    new THREE.Vector2(0.34, 0.55),
    new THREE.Vector2(0.39, 0.66),
    new THREE.Vector2(0.39, 0.84),
    new THREE.Vector2(0.35, 1.04),
    new THREE.Vector2(0.29, 1.28),
    new THREE.Vector2(0.21, 1.48),
    new THREE.Vector2(0.17, 1.55),
    new THREE.Vector2(0.00, 1.55),
  ];
  const chuckGeom = new THREE.LatheGeometry(chuckProfile, 40);
  const chuck = new THREE.Mesh(chuckGeom, black_plasticMat);
  chuck.name = "chuck";
  chuck.rotation.x = Math.PI / 2;
  chuck.position.y = 0.35;
  root.add(chuck);

  const chuck_ribsGeom = new THREE.BoxGeometry(0.026, 0.018, 0.48);
  const chuck_ribs = new THREE.InstancedMesh(chuck_ribsGeom, dark_detailMat, 8);
  chuck_ribs.name = "chuck_ribs";
  const chuck_rib_dummy = new THREE.Object3D();
  for (let i = 0; i < 8; i++) {
    const angle = i / 8 * Math.PI * 2;
    chuck_rib_dummy.position.set(
      Math.cos(angle) * 0.345,
      0.35 + Math.sin(angle) * 0.345,
      1.02
    );
    chuck_rib_dummy.rotation.set(0, 0, angle - Math.PI / 2);
    chuck_rib_dummy.updateMatrix();
    chuck_ribs.setMatrixAt(i, chuck_rib_dummy.matrix);
  }
  chuck_ribs.instanceMatrix.needsUpdate = true;
  root.add(chuck_ribs);

  const chuck_front_ringGeom = new THREE.TorusGeometry(0.165, 0.018, 10, 36);
  const chuck_front_ring = new THREE.Mesh(chuck_front_ringGeom, dark_detailMat);
  chuck_front_ring.name = "chuck_front_ring";
  chuck_front_ring.position.set(0, 0.35, 1.50);
  root.add(chuck_front_ring);

  const chuck_metal_collarGeom = new THREE.CylinderGeometry(0.145, 0.16, 0.12, 32);
  const chuck_metal_collar = new THREE.Mesh(chuck_metal_collarGeom, silverMat);
  chuck_metal_collar.name = "chuck_metal_collar";
  chuck_metal_collar.rotation.x = Math.PI / 2;
  chuck_metal_collar.position.set(0, 0.35, 1.56);
  root.add(chuck_metal_collar);

  const bit_shankGeom = new THREE.CylinderGeometry(0.072, 0.072, 0.25, 24);
  const bit_shank = new THREE.Mesh(bit_shankGeom, brushed_metalMat);
  bit_shank.name = "bit_shank";
  bit_shank.rotation.x = Math.PI / 2;
  bit_shank.position.set(0, 0.35, 1.72);
  root.add(bit_shank);

  const drill_bit_coreGeom = new THREE.CylinderGeometry(0.052, 0.052, 0.43, 20);
  const drill_bit_core = new THREE.Mesh(drill_bit_coreGeom, brushed_metalMat);
  drill_bit_core.name = "drill_bit_core";
  drill_bit_core.rotation.x = Math.PI / 2;
  drill_bit_core.position.set(0, 0.35, 1.99);
  root.add(drill_bit_core);

  const drill_flute_aPoints = [];
  const drill_flute_bPoints = [];
  for (let i = 0; i <= 36; i++) {
    const t = i / 36;
    const angle = t * Math.PI * 4.5;
    const z = 1.78 + t * 0.43;
    drill_flute_aPoints.push(new THREE.Vector3(
      Math.cos(angle) * 0.052,
      0.35 + Math.sin(angle) * 0.052,
      z
    ));
    drill_flute_bPoints.push(new THREE.Vector3(
      Math.cos(angle + Math.PI) * 0.052,
      0.35 + Math.sin(angle + Math.PI) * 0.052,
      z
    ));
  }

  const drill_flute_aGeom = new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3(drill_flute_aPoints),
    72,
    0.017,
    7,
    false
  );
  const drill_flute_a = new THREE.Mesh(drill_flute_aGeom, silverMat);
  drill_flute_a.name = "drill_flute_a";
  root.add(drill_flute_a);

  const drill_flute_bGeom = new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3(drill_flute_bPoints),
    72,
    0.017,
    7,
    false
  );
  const drill_flute_b = new THREE.Mesh(drill_flute_bGeom, silverMat);
  drill_flute_b.name = "drill_flute_b";
  root.add(drill_flute_b);

  const drill_bit_tipGeom = new THREE.ConeGeometry(0.075, 0.16, 20);
  const drill_bit_tip = new THREE.Mesh(drill_bit_tipGeom, brushed_metalMat);
  drill_bit_tip.name = "drill_bit_tip";
  drill_bit_tip.rotation.x = Math.PI / 2;
  drill_bit_tip.position.set(0, 0.35, 2.27);
  root.add(drill_bit_tip);

  const top_railGeom = new THREE.BoxGeometry(0.50, 0.10, 1.30);
  const top_rail = new THREE.Mesh(top_railGeom, black_plasticMat);
  top_rail.name = "top_rail";
  top_rail.position.set(0, 0.70, -0.30);
  root.add(top_rail);

  const top_grip_padGeom = new THREE.BoxGeometry(0.42, 0.035, 0.52);
  const top_grip_pad = new THREE.Mesh(top_grip_padGeom, rubberMat);
  top_grip_pad.name = "top_grip_pad";
  top_grip_pad.position.set(0, 0.765, 0.08);
  root.add(top_grip_pad);

  const top_pad_studsGeom = new THREE.CylinderGeometry(0.012, 0.012, 0.014, 8);
  const top_pad_studs = new THREE.InstancedMesh(top_pad_studsGeom, dark_detailMat, 24);
  top_pad_studs.name = "top_pad_studs";
  const top_stud_dummy = new THREE.Object3D();
  let top_stud_index = 0;
  for (let row = 0; row < 4; row++) {
    for (let column = 0; column < 6; column++) {
      top_stud_dummy.position.set(
        -0.15 + column * 0.06,
        0.790,
        -0.08 + row * 0.075
      );
      top_stud_dummy.rotation.set(0, 0, 0);
      top_stud_dummy.updateMatrix();
      top_pad_studs.setMatrixAt(top_stud_index++, top_stud_dummy.matrix);
    }
  }
  top_pad_studs.instanceMatrix.needsUpdate = true;
  root.add(top_pad_studs);

  const rear_selector_baseGeom = new THREE.BoxGeometry(0.42, 0.075, 0.58);
  const rear_selector_base = new THREE.Mesh(rear_selector_baseGeom, yellow_plasticMat);
  rear_selector_base.name = "rear_selector_base";
  rear_selector_base.position.set(0, 0.775, -0.82);
  root.add(rear_selector_base);

  const rear_selector_ribsGeom = new THREE.BoxGeometry(0.34, 0.035, 0.075);
  const rear_selector_ribs = new THREE.InstancedMesh(
    rear_selector_ribsGeom,
    yellow_plasticMat,
    4
  );
  rear_selector_ribs.name = "rear_selector_ribs";
  const selector_dummy = new THREE.Object3D();
  for (let i = 0; i < 4; i++) {
    selector_dummy.position.set(0, 0.835, -1.00 + i * 0.13);
    selector_dummy.rotation.set(0, 0, 0);
    selector_dummy.updateMatrix();
    rear_selector_ribs.setMatrixAt(i, selector_dummy.matrix);
  }
  rear_selector_ribs.instanceMatrix.needsUpdate = true;
  root.add(rear_selector_ribs);

  const side_panelGeom = new THREE.BoxGeometry(0.026, 0.34, 1.08);
  const side_panels = new THREE.InstancedMesh(side_panelGeom, yellow_plasticMat, 2);
  side_panels.name = "side_panels";
  const side_panel_dummy = new THREE.Object3D();
  for (let i = 0; i < 2; i++) {
    const side = i === 0 ? -1 : 1;
    side_panel_dummy.position.set(side * 0.371, 0.40, -0.34);
    side_panel_dummy.rotation.set(0, 0, 0);
    side_panel_dummy.updateMatrix();
    side_panel_dummy.scale.set(1, 1, 1);
    side_panels.setMatrixAt(i, side_panel_dummy.matrix);
  }
  side_panels.instanceMatrix.needsUpdate = true;
  root.add(side_panels);

  const side_labelGeom = new THREE.BoxGeometry(0.018, 0.245, 0.82);
  const side_labels = new THREE.InstancedMesh(side_labelGeom, dark_detailMat, 2);
  side_labels.name = "side_labels";
  const side_label_dummy = new THREE.Object3D();
  for (let i = 0; i < 2; i++) {
    const side = i === 0 ? -1 : 1;
    side_label_dummy.position.set(side * 0.391, 0.405, -0.31);
    side_label_dummy.rotation.set(0, 0, 0);
    side_label_dummy.updateMatrix();
    side_labels.setMatrixAt(i, side_label_dummy.matrix);
  }
  side_labels.instanceMatrix.needsUpdate = true;
  root.add(side_labels);

  const logo_barsGeom = new THREE.BoxGeometry(0.014, 0.026, 0.17);
  const logo_bars = new THREE.InstancedMesh(logo_barsGeom, yellow_plasticMat, 6);
  logo_bars.name = "logo_bars";
  const logo_dummy = new THREE.Object3D();
  let logo_index = 0;
  for (const side of [-1, 1]) {
    for (let i = 0; i < 3; i++) {
      logo_dummy.position.set(side * 0.405, 0.355 + i * 0.055, -0.65);
      logo_dummy.rotation.set(0, 0, 0);
      logo_dummy.updateMatrix();
      logo_bars.setMatrixAt(logo_index++, logo_dummy.matrix);
    }
  }
  logo_bars.instanceMatrix.needsUpdate = true;
  root.add(logo_bars);

  const brand_lettersGeom = new THREE.BoxGeometry(0.014, 0.075, 0.034);
  const brand_letters = new THREE.InstancedMesh(brand_lettersGeom, yellow_plasticMat, 14);
  brand_letters.name = "brand_letters";
  const brand_dummy = new THREE.Object3D();
  let brand_index = 0;
  for (const side of [-1, 1]) {
    for (let i = 0; i < 7; i++) {
      brand_dummy.position.set(side * 0.405, 0.425, -0.47 + i * 0.085);
      brand_dummy.rotation.set(0, 0, i % 2 === 0 ? 0.08 : -0.08);
      brand_dummy.updateMatrix();
      brand_letters.setMatrixAt(brand_index++, brand_dummy.matrix);
    }
  }
  brand_letters.instanceMatrix.needsUpdate = true;
  root.add(brand_letters);

  const brand_underlineGeom = new THREE.BoxGeometry(0.014, 0.018, 0.56);
  const brand_underlines = new THREE.InstancedMesh(
    brand_underlineGeom,
    yellow_plasticMat,
    2
  );
  brand_underlines.name = "brand_underlines";
  const underline_dummy = new THREE.Object3D();
  for (let i = 0; i < 2; i++) {
    const side = i === 0 ? -1 : 1;
    underline_dummy.position.set(side * 0.405, 0.355, -0.31);
    underline_dummy.rotation.set(0, 0, 0);
    underline_dummy.updateMatrix();
    brand_underlines.setMatrixAt(i, underline_dummy.matrix);
  }
  brand_underlines.instanceMatrix.needsUpdate = true;
  root.add(brand_underlines);

  const rear_vent_backingGeom = new THREE.BoxGeometry(0.024, 0.25, 0.36);
  const rear_vent_backing = new THREE.InstancedMesh(
    rear_vent_backingGeom,
    yellow_plasticMat,
    2
  );
  rear_vent_backing.name = "rear_vent_backing";
  const vent_backing_dummy = new THREE.Object3D();
  for (let i = 0; i < 2; i++) {
    const side = i === 0 ? -1 : 1;
    vent_backing_dummy.position.set(side * 0.365, 0.43, -0.98);
    vent_backing_dummy.rotation.set(0, 0, 0);
    vent_backing_dummy.updateMatrix();
    rear_vent_backing.setMatrixAt(i, vent_backing_dummy.matrix);
  }
  rear_vent_backing.instanceMatrix.needsUpdate = true;
  root.add(rear_vent_backing);

  const rear_ventsGeom = new THREE.BoxGeometry(0.018, 0.19, 0.045);
  const rear_vents = new THREE.InstancedMesh(rear_ventsGeom, dark_detailMat, 6);
  rear_vents.name = "rear_vents";
  const rear_vent_dummy = new THREE.Object3D();
  let rear_vent_index = 0;
  for (const side of [-1, 1]) {
    for (let i = 0; i < 3; i++) {
      rear_vent_dummy.position.set(side * 0.383, 0.43, -1.09 + i * 0.11);
      rear_vent_dummy.rotation.set(0, 0, -0.12);
      rear_vent_dummy.updateMatrix();
      rear_vents.setMatrixAt(rear_vent_index++, rear_vent_dummy.matrix);
    }
  }
  rear_vents.instanceMatrix.needsUpdate = true;
  root.add(rear_vents);

  const torque_ringGeom = new THREE.CylinderGeometry(0.395, 0.395, 0.17, 40);
  const torque_ring = new THREE.Mesh(torque_ringGeom, rubberMat);
  torque_ring.name = "torque_ring";
  torque_ring.rotation.x = Math.PI / 2;
  torque_ring.position.set(0, 0.35, 0.57);
  root.add(torque_ring);

  const torque_markersGeom = new THREE.BoxGeometry(0.014, 0.025, 0.075);
  const torque_markers = new THREE.InstancedMesh(torque_markersGeom, white_printMat, 8);
  torque_markers.name = "torque_markers";
  const marker_dummy = new THREE.Object3D();
  let marker_index = 0;
  for (const side of [-1, 1]) {
    for (let i = 0; i < 4; i++) {
      marker_dummy.position.set(side * 0.402, 0.20 + i * 0.09, 0.58);
      marker_dummy.rotation.set(0, 0, 0);
      marker_dummy.updateMatrix();
      torque_markers.setMatrixAt(marker_index++, marker_dummy.matrix);
    }
  }
  torque_markers.instanceMatrix.needsUpdate = true;
  root.add(torque_markers);

  const direction_switch_frameGeom = new THREE.BoxGeometry(0.030, 0.31, 0.19);
  const direction_switch_frames = new THREE.InstancedMesh(
    direction_switch_frameGeom,
    yellow_plasticMat,
    2
  );
  direction_switch_frames.name = "direction_switch_frames";
  const switch_frame_dummy = new THREE.Object3D();
  for (let i = 0; i < 2; i++) {
    const side = i === 0 ? -1 : 1;
    switch_frame_dummy.position.set(side * 0.392, 0.34, 0.43);
    switch_frame_dummy.rotation.set(0, 0, 0);
    switch_frame_dummy.updateMatrix();
    direction_switch_frames.setMatrixAt(i, switch_frame_dummy.matrix);
  }
  direction_switch_frames.instanceMatrix.needsUpdate = true;
  root.add(direction_switch_frames);

  const direction_switchGeom = new THREE.BoxGeometry(0.020, 0.25, 0.135);
  const direction_switches = new THREE.InstancedMesh(
    direction_switchGeom,
    dark_detailMat,
    2
  );
  direction_switches.name = "direction_switches";
  const direction_dummy = new THREE.Object3D();
  for (let i = 0; i < 2; i++) {
    const side = i === 0 ? -1 : 1;
    direction_dummy.position.set(side * 0.412, 0.34, 0.43);
    direction_dummy.rotation.set(0, 0, 0);
    direction_dummy.updateMatrix();
    direction_switches.setMatrixAt(i, direction_dummy.matrix);
  }
  direction_switches.instanceMatrix.needsUpdate = true;
  root.add(direction_switches);

  const switch_ridgesGeom = new THREE.BoxGeometry(0.014, 0.018, 0.105);
  const switch_ridges = new THREE.InstancedMesh(switch_ridgesGeom, rubberMat, 6);
  switch_ridges.name = "switch_ridges";
  const ridge_dummy = new THREE.Object3D();
  let ridge_index = 0;
  for (const side of [-1, 1]) {
    for (let i = 0; i < 3; i++) {
      ridge_dummy.position.set(side * 0.425, 0.285 + i * 0.055, 0.43);
      ridge_dummy.rotation.set(0, 0, 0);
      ridge_dummy.updateMatrix();
      switch_ridges.setMatrixAt(ridge_index++, ridge_dummy.matrix);
    }
  }
  switch_ridges.instanceMatrix.needsUpdate = true;
  root.add(switch_ridges);

  const handleShape = new THREE.Shape();
  handleShape.moveTo(0.18, 0.20);
  handleShape.lineTo(-0.78, 0.20);
  handleShape.bezierCurveTo(-0.90, 0.18, -0.96, 0.04, -0.96, -0.12);
  handleShape.lineTo(-0.88, -0.72);
  handleShape.bezierCurveTo(-0.86, -0.91, -0.98, -1.04, -1.12, -1.10);
  handleShape.bezierCurveTo(-1.23, -1.15, -1.35, -1.12, -1.39, -1.02);
  handleShape.bezierCurveTo(-1.43, -0.91, -1.34, -0.82, -1.24, -0.78);
  handleShape.lineTo(-1.17, -0.69);
  handleShape.bezierCurveTo(-1.08, -0.55, -1.02, -0.25, -0.98, 0.02);
  handleShape.bezierCurveTo(-0.96, 0.14, -0.88, 0.20, -0.75, 0.22);
  handleShape.lineTo(0.18, 0.20);

  const handleGeom = new THREE.ExtrudeGeometry(handleShape, {
    depth: 0.48,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.035,
    bevelSize: 0.035,
    bevelSegments: 3,
  });
  handleGeom.translate(0, 0, -0.24);
  const handle = new THREE.Mesh(handleGeom, black_plasticMat);
  handle.name = "handle";
  handle.rotation.y = -Math.PI / 2;
  root.add(handle);

  const triggerShape = new THREE.Shape();
  triggerShape.moveTo(0.22, 0.08);
  triggerShape.lineTo(-0.18, 0.08);
  triggerShape.bezierCurveTo(-0.28, 0.06, -0.31, -0.04, -0.29, -0.13);
  triggerShape.lineTo(-0.22, -0.30);
  triggerShape.bezierCurveTo(-0.18, -0.39, -0.05, -0.41, 0.04, -0.35);
  triggerShape.lineTo(0.17, -0.18);
  triggerShape.bezierCurveTo(0.23, -0.10, 0.25, 0.00, 0.22, 0.08);

  const triggerGeom = new THREE.ExtrudeGeometry(triggerShape, {
    depth: 0.34,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.025,
    bevelSize: 0.025,
    bevelSegments: 3,
  });
  triggerGeom.translate(0, 0, -0.17);
  const trigger = new THREE.Mesh(triggerGeom, yellow_plasticMat);
  trigger.name = "trigger";
  trigger.rotation.y = -Math.PI / 2;
  root.add(trigger);

  const trigger_pivotGeom = new THREE.CylinderGeometry(0.065, 0.065, 0.42, 20);
  const trigger_pivot = new THREE.Mesh(trigger_pivotGeom, yellow_plasticMat);
  trigger_pivot.name = "trigger_pivot";
  trigger_pivot.rotation.z = Math.PI / 2;
  trigger_pivot.position.set(0, 0.08, -0.10);
  root.add(trigger_pivot);

  const grip_insertGeom = new THREE.SphereGeometry(0.20, 24, 16);
  const grip_inserts = new THREE.InstancedMesh(grip_insertGeom, rubberMat, 2);
  grip_inserts.name = "grip_inserts";
  const grip_insert_dummy = new THREE.Object3D();
  for (let i = 0; i < 2; i++) {
    const side = i === 0 ? -1 : 1;
    grip_insert_dummy.position.set(side * 0.274, -0.55, -0.92);
    grip_insert_dummy.rotation.set(0, 0, 0);
    grip_insert_dummy.scale.set(0.08, 1.25, 0.72);
    grip_insert_dummy.updateMatrix();
    grip_inserts.setMatrixAt(i, grip_insert_dummy.matrix);
  }
  grip_inserts.instanceMatrix.needsUpdate = true;
  root.add(grip_inserts);

  const grip_dotsGeom = new THREE.CylinderGeometry(0.012, 0.012, 0.012, 8);
  const grip_dots = new THREE.InstancedMesh(grip_dotsGeom, dark_detailMat, 48);
  grip_dots.name = "grip_dots";
  const grip_dot_dummy = new THREE.Object3D();
  let grip_dot_index = 0;
  for (const side of [-1, 1]) {
    for (let row = 0; row < 6; row++) {
      for (let column = 0; column < 4; column++) {
        grip_dot_dummy.position.set(
          side * 0.292,
          -0.31 - row * 0.095,
          -0.76 - column * 0.105
        );
        grip_dot_dummy.rotation.set(0, 0, Math.PI / 2);
        grip_dot_dummy.scale.set(1, 1, 1);
        grip_dot_dummy.updateMatrix();
        grip_dots.setMatrixAt(grip_dot_index++, grip_dot_dummy.matrix);
      }
    }
  }
  grip_dots.instanceMatrix.needsUpdate = true;
  root.add(grip_dots);

  const grip_accentGeom = new THREE.BoxGeometry(0.020, 0.075, 0.17);
  const grip_accents = new THREE.InstancedMesh(grip_accentGeom, yellow_plasticMat, 2);
  grip_accents.name = "grip_accents";
  const grip_accent_dummy = new THREE.Object3D();
  for (let i = 0; i < 2; i++) {
    const side = i === 0 ? -1 : 1;
    grip_accent_dummy.position.set(side * 0.292, -0.25, -1.02);
    grip_accent_dummy.rotation.set(0, 0, 0);
    grip_accent_dummy.updateMatrix();
    grip_accents.setMatrixAt(i, grip_accent_dummy.matrix);
  }
  grip_accents.instanceMatrix.needsUpdate = true;
  root.add(grip_accents);

  const bottom_footGeom = new THREE.SphereGeometry(0.25, 28, 16);
  const bottom_foot = new THREE.Mesh(bottom_footGeom, rubberMat);
  bottom_foot.name = "bottom_foot";
  bottom_foot.scale.set(1.0, 0.42, 1.35);
  bottom_foot.position.set(0, -1.12, -1.15);
  root.add(bottom_foot);

  const bottom_foot_padGeom = new THREE.BoxGeometry(0.42, 0.055, 0.34);
  const bottom_foot_pad = new THREE.Mesh(bottom_foot_padGeom, dark_detailMat);
  bottom_foot_pad.name = "bottom_foot_pad";
  bottom_foot_pad.position.set(0, -1.245, -1.18);
  root.add(bottom_foot_pad);

  function fitToUnitCube(object) {
    object.updateMatrixWorld(true);
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