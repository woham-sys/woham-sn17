// miner-diag: gpus=? tflops=? stream48=? power=? probe_tps=3831 cpu_quota=?/? net=? batch=2 wall=1559 seed=870128282
export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "countertop_dispenser";

  const base_group = new THREE.Group();
  base_group.name = "base_group";
  root.add(base_group);

  const lower_chamber_group = new THREE.Group();
  lower_chamber_group.name = "lower_chamber_group";
  root.add(lower_chamber_group);

  const upper_housing_group = new THREE.Group();
  upper_housing_group.name = "upper_housing_group";
  root.add(upper_housing_group);

  const brushed_metalMat = new THREE.MeshStandardMaterial({
    color: 0x909090,
    metalness: 0.6,
    roughness: 0.5
  });
  const polished_metalMat = new THREE.MeshStandardMaterial({
    color: 0xd4d4d4,
    metalness: 0.6,
    roughness: 0.2
  });
  const black_plasticMat = new THREE.MeshStandardMaterial({
    color: 0x111111,
    metalness: 0.0,
    roughness: 0.3
  });
  const panel_plasticMat = new THREE.MeshStandardMaterial({
    color: 0x181818,
    metalness: 0.0,
    roughness: 0.3
  });
  const rubberMat = new THREE.MeshStandardMaterial({
    color: 0x080808,
    metalness: 0.0,
    roughness: 0.8
  });
  const dark_interiorMat = new THREE.MeshStandardMaterial({
    color: 0x090909,
    metalness: 0.0,
    roughness: 0.8
  });
  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0x687070,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
    opacity: 0.58,
    side: THREE.DoubleSide,
    depthWrite: false
  });
  const glass_edgeMat = new THREE.MeshPhysicalMaterial({
    color: 0x9aa3a3,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
    opacity: 0.72,
    depthWrite: false
  });
  const graphicMat = new THREE.MeshBasicMaterial({
    color: 0xe8e8e8
  });
  const indicatorMat = new THREE.MeshStandardMaterial({
    color: 0xdcecf2,
    metalness: 0.0,
    roughness: 0.5,
    emissive: 0xdcecf2,
    emissiveIntensity: 1.0
  });

  function roundedRectShape(width, height, radius) {
    const shape = new THREE.Shape();
    const x0 = -width / 2;
    const x1 = width / 2;
    const y0 = -height / 2;
    const y1 = height / 2;
    shape.moveTo(x0 + radius, y0);
    shape.lineTo(x1 - radius, y0);
    shape.quadraticCurveTo(x1, y0, x1, y0 + radius);
    shape.lineTo(x1, y1 - radius);
    shape.quadraticCurveTo(x1, y1, x1 - radius, y1);
    shape.lineTo(x0 + radius, y1);
    shape.quadraticCurveTo(x0, y1, x0, y1 - radius);
    shape.lineTo(x0, y0 + radius);
    shape.quadraticCurveTo(x0, y0, x0 + radius, y0);
    return shape;
  }

  const base_footGeom = new THREE.CylinderGeometry(0.43, 0.43, 0.035, 64);
  const base_foot = new THREE.Mesh(base_footGeom, rubberMat);
  base_foot.name = "base_foot";
  base_foot.position.y = 0.0175;
  base_group.add(base_foot);

  const base_lower_bandGeom = new THREE.CylinderGeometry(0.48, 0.46, 0.075, 64);
  const base_lower_band = new THREE.Mesh(base_lower_bandGeom, black_plasticMat);
  base_lower_band.name = "base_lower_band";
  base_lower_band.position.y = 0.067;
  base_group.add(base_lower_band);

  const base_metal_bandGeom = new THREE.CylinderGeometry(0.49, 0.49, 0.115, 64);
  const base_metal_band = new THREE.Mesh(base_metal_bandGeom, brushed_metalMat);
  base_metal_band.name = "base_metal_band";
  base_metal_band.position.y = 0.145;
  base_group.add(base_metal_band);

  const base_top_plateGeom = new THREE.CylinderGeometry(0.46, 0.49, 0.075, 64);
  const base_top_plate = new THREE.Mesh(base_top_plateGeom, black_plasticMat);
  base_top_plate.name = "base_top_plate";
  base_top_plate.position.y = 0.225;
  base_group.add(base_top_plate);

  const base_trim_ringGeom = new THREE.TorusGeometry(0.455, 0.012, 10, 64);
  const base_trim_ring = new THREE.Mesh(base_trim_ringGeom, polished_metalMat);
  base_trim_ring.name = "base_trim_ring";
  base_trim_ring.rotation.x = Math.PI / 2;
  base_trim_ring.position.y = 0.205;
  base_group.add(base_trim_ring);

  const support_columnsGeom = new THREE.BoxGeometry(0.105, 0.57, 0.14);
  const support_columns = new THREE.InstancedMesh(
    support_columnsGeom,
    black_plasticMat,
    2
  );
  support_columns.name = "support_columns";
  const support_dummy = new THREE.Object3D();
  for (let i = 0; i < 2; i++) {
    support_dummy.position.set(i === 0 ? -0.39 : 0.39, 0.515, -0.045);
    support_dummy.updateMatrix();
    support_columns.setMatrixAt(i, support_dummy.matrix);
  }
  support_columns.instanceMatrix.needsUpdate = true;
  lower_chamber_group.add(support_columns);

  const rear_supportGeom = new THREE.BoxGeometry(0.68, 0.55, 0.08);
  const rear_support = new THREE.Mesh(rear_supportGeom, dark_interiorMat);
  rear_support.name = "rear_support";
  rear_support.position.set(0, 0.515, -0.275);
  lower_chamber_group.add(rear_support);

  const lower_chamber_ceilingGeom = new THREE.CylinderGeometry(0.405, 0.405, 0.055, 64);
  const lower_chamber_ceiling = new THREE.Mesh(lower_chamber_ceilingGeom, black_plasticMat);
  lower_chamber_ceiling.name = "lower_chamber_ceiling";
  lower_chamber_ceiling.position.y = 0.79;
  lower_chamber_group.add(lower_chamber_ceiling);

  const drip_trayGeom = new THREE.CylinderGeometry(0.35, 0.36, 0.025, 64);
  const drip_tray = new THREE.Mesh(drip_trayGeom, black_plasticMat);
  drip_tray.name = "drip_tray";
  drip_tray.position.y = 0.275;
  lower_chamber_group.add(drip_tray);

  const drip_tray_ringGeom = new THREE.TorusGeometry(0.29, 0.012, 10, 64);
  const drip_tray_ring = new THREE.Mesh(drip_tray_ringGeom, rubberMat);
  drip_tray_ring.name = "drip_tray_ring";
  drip_tray_ring.rotation.x = Math.PI / 2;
  drip_tray_ring.position.y = 0.292;
  lower_chamber_group.add(drip_tray_ring);

  const drip_slotsGeom = new THREE.BoxGeometry(0.105, 0.006, 0.014);
  const drip_slots = new THREE.InstancedMesh(drip_slotsGeom, rubberMat, 12);
  drip_slots.name = "drip_slots";
  const slot_dummy = new THREE.Object3D();
  for (let i = 0; i < 12; i++) {
    const angle = i / 12 * Math.PI * 2;
    slot_dummy.position.set(
      Math.sin(angle) * 0.295,
      0.291,
      Math.cos(angle) * 0.295
    );
    slot_dummy.rotation.set(0, angle, 0);
    slot_dummy.updateMatrix();
    drip_slots.setMatrixAt(i, slot_dummy.matrix);
  }
  drip_slots.instanceMatrix.needsUpdate = true;
  lower_chamber_group.add(drip_slots);

  const reservoir_profile = [
    new THREE.Vector2(0.00, 0.295),
    new THREE.Vector2(0.195, 0.295),
    new THREE.Vector2(0.235, 0.315),
    new THREE.Vector2(0.250, 0.365),
    new THREE.Vector2(0.252, 0.665),
    new THREE.Vector2(0.240, 0.715),
    new THREE.Vector2(0.205, 0.750),
    new THREE.Vector2(0.00, 0.750)
  ];
  const reservoirGeom = new THREE.LatheGeometry(reservoir_profile, 64);
  const reservoir = new THREE.Mesh(reservoirGeom, glassMat);
  reservoir.name = "reservoir";
  lower_chamber_group.add(reservoir);

  const reservoir_bottom_ringGeom = new THREE.TorusGeometry(0.222, 0.011, 10, 64);
  const reservoir_bottom_ring = new THREE.Mesh(reservoir_bottom_ringGeom, glass_edgeMat);
  reservoir_bottom_ring.name = "reservoir_bottom_ring";
  reservoir_bottom_ring.rotation.x = Math.PI / 2;
  reservoir_bottom_ring.position.y = 0.315;
  lower_chamber_group.add(reservoir_bottom_ring);

  const reservoir_top_ringGeom = new THREE.TorusGeometry(0.222, 0.01, 10, 64);
  const reservoir_top_ring = new THREE.Mesh(reservoir_top_ringGeom, glass_edgeMat);
  reservoir_top_ring.name = "reservoir_top_ring";
  reservoir_top_ring.rotation.x = Math.PI / 2;
  reservoir_top_ring.position.y = 0.724;
  lower_chamber_group.add(reservoir_top_ring);

  const reservoir_inner_floorGeom = new THREE.CylinderGeometry(0.19, 0.19, 0.012, 48);
  const reservoir_inner_floor = new THREE.Mesh(reservoir_inner_floorGeom, glass_edgeMat);
  reservoir_inner_floor.name = "reservoir_inner_floor";
  reservoir_inner_floor.position.y = 0.315;
  lower_chamber_group.add(reservoir_inner_floor);

  const nozzle_mountGeom = new THREE.CylinderGeometry(0.205, 0.205, 0.09, 48);
  const nozzle_mount = new THREE.Mesh(nozzle_mountGeom, black_plasticMat);
  nozzle_mount.name = "nozzle_mount";
  nozzle_mount.position.y = 0.765;
  lower_chamber_group.add(nozzle_mount);

  const nozzle_collarGeom = new THREE.TorusGeometry(0.19, 0.012, 10, 48);
  const nozzle_collar = new THREE.Mesh(nozzle_collarGeom, polished_metalMat);
  nozzle_collar.name = "nozzle_collar";
  nozzle_collar.rotation.x = Math.PI / 2;
  nozzle_collar.position.y = 0.735;
  lower_chamber_group.add(nozzle_collar);

  const dispensing_nozzleGeom = new THREE.CylinderGeometry(0.052, 0.065, 0.14, 32);
  const dispensing_nozzle = new THREE.Mesh(dispensing_nozzleGeom, black_plasticMat);
  dispensing_nozzle.name = "dispensing_nozzle";
  dispensing_nozzle.position.y = 0.675;
  lower_chamber_group.add(dispensing_nozzle);

  const nozzle_tipGeom = new THREE.CylinderGeometry(0.042, 0.048, 0.045, 32);
  const nozzle_tip = new THREE.Mesh(nozzle_tipGeom, dark_interiorMat);
  nozzle_tip.name = "nozzle_tip";
  nozzle_tip.position.y = 0.59;
  lower_chamber_group.add(nozzle_tip);

  const upper_lower_seamGeom = new THREE.CylinderGeometry(0.455, 0.47, 0.065, 64);
  const upper_lower_seam = new THREE.Mesh(upper_lower_seamGeom, black_plasticMat);
  upper_lower_seam.name = "upper_lower_seam";
  upper_lower_seam.position.y = 0.815;
  upper_housing_group.add(upper_lower_seam);

  const upper_body_profile = [
    new THREE.Vector2(0.00, 0.825),
    new THREE.Vector2(0.405, 0.825),
    new THREE.Vector2(0.445, 0.845),
    new THREE.Vector2(0.460, 0.885),
    new THREE.Vector2(0.460, 1.315),
    new THREE.Vector2(0.452, 1.355),
    new THREE.Vector2(0.415, 1.382),
    new THREE.Vector2(0.00, 1.382)
  ];
  const upper_bodyGeom = new THREE.LatheGeometry(upper_body_profile, 64);
  const upper_body = new THREE.Mesh(upper_bodyGeom, brushed_metalMat);
  upper_body.name = "upper_body";
  upper_housing_group.add(upper_body);

  const upper_bottom_trimGeom = new THREE.TorusGeometry(0.438, 0.012, 10, 64);
  const upper_bottom_trim = new THREE.Mesh(upper_bottom_trimGeom, polished_metalMat);
  upper_bottom_trim.name = "upper_bottom_trim";
  upper_bottom_trim.rotation.x = Math.PI / 2;
  upper_bottom_trim.position.y = 0.842;
  upper_housing_group.add(upper_bottom_trim);

  const top_lidGeom = new THREE.CylinderGeometry(0.468, 0.468, 0.055, 64);
  const top_lid = new THREE.Mesh(top_lidGeom, black_plasticMat);
  top_lid.name = "top_lid";
  top_lid.position.y = 1.385;
  upper_housing_group.add(top_lid);

  const top_insertGeom = new THREE.CylinderGeometry(0.405, 0.405, 0.012, 64);
  const top_insert = new THREE.Mesh(top_insertGeom, brushed_metalMat);
  top_insert.name = "top_insert";
  top_insert.position.y = 1.416;
  upper_housing_group.add(top_insert);

  const top_grooveGeom = new THREE.TorusGeometry(0.365, 0.006, 8, 64);
  const top_groove = new THREE.Mesh(top_grooveGeom, black_plasticMat);
  top_groove.name = "top_groove";
  top_groove.rotation.x = Math.PI / 2;
  top_groove.position.y = 1.423;
  upper_housing_group.add(top_groove);

  const top_buttonGeom = new THREE.CylinderGeometry(0.072, 0.072, 0.008, 40);
  const top_button = new THREE.Mesh(top_buttonGeom, black_plasticMat);
  top_button.name = "top_button";
  top_button.position.y = 1.427;
  upper_housing_group.add(top_button);

  const top_button_highlightGeom = new THREE.TorusGeometry(0.058, 0.0025, 6, 40);
  const top_button_highlight = new THREE.Mesh(top_button_highlightGeom, rubberMat);
  top_button_highlight.name = "top_button_highlight";
  top_button_highlight.rotation.x = Math.PI / 2;
  top_button_highlight.position.y = 1.432;
  upper_housing_group.add(top_button_highlight);

  const control_panelShape = roundedRectShape(0.30, 0.44, 0.045);
  const control_panelGeom = new THREE.ExtrudeGeometry(control_panelShape, {
    depth: 0.018,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.004,
    bevelSize: 0.004,
    bevelSegments: 2
  });
  const control_panel = new THREE.Mesh(control_panelGeom, panel_plasticMat);
  control_panel.name = "control_panel";
  control_panel.position.set(0, 1.105, 0.454);
  upper_housing_group.add(control_panel);

  const glyphs = {
    Z: [[0, 1, 1, 1], [1, 1, 0, 0], [0, 0, 1, 0]],
    E: [[0, 0, 0, 1], [0, 1, 1, 1], [0, 0.5, 0.82, 0.5], [0, 0, 1, 0]],
    N: [[0, 0, 0, 1], [0, 1, 1, 0], [1, 0, 1, 1]],
    I: [[0, 1, 1, 1], [0.5, 1, 0.5, 0], [0, 0, 1, 0]],
    S: [[1, 1, 0, 1], [0, 1, 0, 0.5], [0, 0.5, 1, 0.5], [1, 0.5, 1, 0], [1, 0, 0, 0]],
    T: [[0, 1, 1, 1], [0.5, 1, 0.5, 0]]
  };
  const brand_word = "ZENIZEST";
  let brand_stroke_count = 0;
  for (let i = 0; i < brand_word.length; i++) {
    brand_stroke_count += glyphs[brand_word[i]].length;
  }

  const brand_strokesGeom = new THREE.BoxGeometry(1, 1, 1);
  const brand_strokes = new THREE.InstancedMesh(
    brand_strokesGeom,
    graphicMat,
    brand_stroke_count
  );
  brand_strokes.name = "brand_strokes";
  const brand_dummy = new THREE.Object3D();
  const brand_advance = 0.027;
  const brand_width = 0.020;
  const brand_height = 0.034;
  const brand_start_x = -(brand_word.length - 1) * brand_advance / 2;
  let brand_index = 0;
  for (let i = 0; i < brand_word.length; i++) {
    const segments = glyphs[brand_word[i]];
    for (let j = 0; j < segments.length; j++) {
      const segment = segments[j];
      const x1 = brand_start_x + i * brand_advance + segment[0] * brand_width;
      const y1 = 1.245 + segment[1] * brand_height;
      const x2 = brand_start_x + i * brand_advance + segment[2] * brand_width;
      const y2 = 1.245 + segment[3] * brand_height;
      const dx = x2 - x1;
      const dy = y2 - y1;
      const length = Math.sqrt(dx * dx + dy * dy);
      brand_dummy.position.set((x1 + x2) / 2, (y1 + y2) / 2, 0.480);
      brand_dummy.rotation.set(0, 0, Math.atan2(dy, dx));
      brand_dummy.scale.set(length, 0.0032, 0.0025);
      brand_dummy.updateMatrix();
      brand_strokes.setMatrixAt(brand_index++, brand_dummy.matrix);
    }
  }
  brand_strokes.instanceMatrix.needsUpdate = true;
  upper_housing_group.add(brand_strokes);

  const upper_dial_ringGeom = new THREE.TorusGeometry(0.058, 0.008, 10, 40);
  const upper_dial_ring = new THREE.Mesh(upper_dial_ringGeom, rubberMat);
  upper_dial_ring.name = "upper_dial_ring";
  upper_dial_ring.position.set(0, 1.105, 0.486);
  upper_housing_group.add(upper_dial_ring);

  const upper_dialGeom = new THREE.CylinderGeometry(0.052, 0.052, 0.028, 40);
  const upper_dial = new THREE.Mesh(upper_dialGeom, black_plasticMat);
  upper_dial.name = "upper_dial";
  upper_dial.rotation.x = Math.PI / 2;
  upper_dial.position.set(0, 1.105, 0.493);
  upper_housing_group.add(upper_dial);

  const upper_dial_faceGeom = new THREE.CylinderGeometry(0.043, 0.043, 0.006, 40);
  const upper_dial_face = new THREE.Mesh(upper_dial_faceGeom, panel_plasticMat);
  upper_dial_face.name = "upper_dial_face";
  upper_dial_face.rotation.x = Math.PI / 2;
  upper_dial_face.position.set(0, 1.105, 0.509);
  upper_housing_group.add(upper_dial_face);

  const upper_dial_indicatorGeom = new THREE.BoxGeometry(0.005, 0.021, 0.004);
  const upper_dial_indicator = new THREE.Mesh(upper_dial_indicatorGeom, graphicMat);
  upper_dial_indicator.name = "upper_dial_indicator";
  upper_dial_indicator.position.set(0, 1.139, 0.514);
  upper_housing_group.add(upper_dial_indicator);

  const lower_dial_ringGeom = new THREE.TorusGeometry(0.055, 0.008, 10, 40);
  const lower_dial_ring = new THREE.Mesh(lower_dial_ringGeom, rubberMat);
  lower_dial_ring.name = "lower_dial_ring";
  lower_dial_ring.position.set(0, 0.925, 0.486);
  upper_housing_group.add(lower_dial_ring);

  const lower_dialGeom = new THREE.CylinderGeometry(0.050, 0.050, 0.028, 40);
  const lower_dial = new THREE.Mesh(lower_dialGeom, black_plasticMat);
  lower_dial.name = "lower_dial";
  lower_dial.rotation.x = Math.PI / 2;
  lower_dial.position.set(0, 0.925, 0.493);
  upper_housing_group.add(lower_dial);

  const lower_dial_faceGeom = new THREE.CylinderGeometry(0.041, 0.041, 0.006, 40);
  const lower_dial_face = new THREE.Mesh(lower_dial_faceGeom, panel_plasticMat);
  lower_dial_face.name = "lower_dial_face";
  lower_dial_face.rotation.x = Math.PI / 2;
  lower_dial_face.position.set(0, 0.925, 0.509);
  upper_housing_group.add(lower_dial_face);

  const lower_dial_indicatorGeom = new THREE.BoxGeometry(0.072, 0.006, 0.004);
  const lower_dial_indicator = new THREE.Mesh(lower_dial_indicatorGeom, polished_metalMat);
  lower_dial_indicator.name = "lower_dial_indicator";
  lower_dial_indicator.rotation.z = -0.65;
  lower_dial_indicator.position.set(0, 0.925, 0.514);
  upper_housing_group.add(lower_dial_indicator);

  const panel_tick_marksGeom = new THREE.BoxGeometry(1, 1, 1);
  const panel_tick_marks = new THREE.InstancedMesh(
    panel_tick_marksGeom,
    graphicMat,
    12
  );
  panel_tick_marks.name = "panel_tick_marks";
  const tick_dummy = new THREE.Object3D();
  let tick_index = 0;
  for (let i = 0; i < 6; i++) {
    const angle = i / 6 * Math.PI * 2;
    tick_dummy.position.set(
      Math.sin(angle) * 0.083,
      1.105 + Math.cos(angle) * 0.083,
      0.480
    );
    tick_dummy.rotation.set(0, 0, -angle);
    tick_dummy.scale.set(0.003, 0.010, 0.002);
    tick_dummy.updateMatrix();
    panel_tick_marks.setMatrixAt(tick_index++, tick_dummy.matrix);
  }
  for (let i = 0; i < 6; i++) {
    const angle = i / 6 * Math.PI * 2;
    tick_dummy.position.set(
      Math.sin(angle) * 0.079,
      0.925 + Math.cos(angle) * 0.079,
      0.480
    );
    tick_dummy.rotation.set(0, 0, -angle);
    tick_dummy.scale.set(0.003, 0.009, 0.002);
    tick_dummy.updateMatrix();
    panel_tick_marks.setMatrixAt(tick_index++, tick_dummy.matrix);
  }
  panel_tick_marks.instanceMatrix.needsUpdate = true;
  upper_housing_group.add(panel_tick_marks);

  const panel_labelsGeom = new THREE.BoxGeometry(1, 1, 1);
  const panel_labels = new THREE.InstancedMesh(panel_labelsGeom, graphicMat, 12);
  panel_labels.name = "panel_labels";
  const label_dummy = new THREE.Object3D();
  const label_data = [
    [-0.095, 1.020, 0.030, 0.003],
    [-0.095, 1.010, 0.022, 0.003],
    [0.095, 1.020, 0.030, 0.003],
    [0.095, 1.010, 0.022, 0.003],
    [-0.105, 0.975, 0.004, 0.014],
    [0.105, 0.975, 0.004, 0.014],
    [-0.080, 0.885, 0.026, 0.003],
    [-0.080, 0.875, 0.018, 0.003],
    [0.080, 0.885, 0.026, 0.003],
    [0.080, 0.875, 0.018, 0.003],
    [-0.115, 1.080, 0.018, 0.003],
    [0.115, 1.080, 0.018, 0.003]
  ];
  for (let i = 0; i < label_data.length; i++) {
    const data = label_data[i];
    label_dummy.position.set(data[0], data[1], 0.480);
    label_dummy.rotation.set(0, 0, 0);
    label_dummy.scale.set(data[2], data[3], 0.002);
    label_dummy.updateMatrix();
    panel_labels.setMatrixAt(i, label_dummy.matrix);
  }
  panel_labels.instanceMatrix.needsUpdate = true;
  upper_housing_group.add(panel_labels);

  const status_ledsGeom = new THREE.SphereGeometry(0.006, 12, 8);
  const status_leds = new THREE.InstancedMesh(status_ledsGeom, indicatorMat, 4);
  status_leds.name = "status_leds";
  const led_dummy = new THREE.Object3D();
  const led_positions = [
    [-0.112, 1.105],
    [0.112, 1.105],
    [-0.108, 0.925],
    [0.108, 0.925]
  ];
  for (let i = 0; i < led_positions.length; i++) {
    led_dummy.position.set(led_positions[i][0], led_positions[i][1], 0.486);
    led_dummy.updateMatrix();
    status_leds.setMatrixAt(i, led_dummy.matrix);
  }
  status_leds.instanceMatrix.needsUpdate = true;
  upper_housing_group.add(status_leds);

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