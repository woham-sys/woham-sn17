// miner-diag: gpus=? tflops=? stream48=? power=? probe_tps=3831 cpu_quota=?/? net=? batch=4 wall=1389 seed=870128282
export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "vintage_wristwatch";

  const watch_assembly = new THREE.Group();
  watch_assembly.name = "watch_assembly";
  watch_assembly.rotation.set(0.08, -0.18, -0.08);
  root.add(watch_assembly);

  const goldMat = new THREE.MeshStandardMaterial({
    color: 0xd4af37,
    metalness: 0.6,
    roughness: 0.2,
  });
  const darkGoldMat = new THREE.MeshStandardMaterial({
    color: 0x8a641c,
    metalness: 0.5,
    roughness: 0.35,
  });
  const silverMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25,
  });
  const dialMat = new THREE.MeshStandardMaterial({
    color: 0x29323d,
    metalness: 0.0,
    roughness: 0.7,
  });
  const chapterMat = new THREE.MeshStandardMaterial({
    color: 0xe8e2cf,
    metalness: 0.0,
    roughness: 0.7,
  });
  const subdialMat = new THREE.MeshStandardMaterial({
    color: 0xc9b683,
    metalness: 0.2,
    roughness: 0.6,
  });
  const darkMat = new THREE.MeshStandardMaterial({
    color: 0x17202a,
    metalness: 0.0,
    roughness: 0.8,
  });
  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0xeaf2f4,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
    depthWrite: false,
  });

  const case_bodyProfile = [
    new THREE.Vector2(0.00, -0.20),
    new THREE.Vector2(0.86, -0.20),
    new THREE.Vector2(0.96, -0.17),
    new THREE.Vector2(1.02, -0.10),
    new THREE.Vector2(1.05, 0.00),
    new THREE.Vector2(1.04, 0.10),
    new THREE.Vector2(1.00, 0.17),
    new THREE.Vector2(0.94, 0.21),
    new THREE.Vector2(0.00, 0.21),
  ];
  const case_bodyGeom = new THREE.LatheGeometry(case_bodyProfile, 64);
  const case_body = new THREE.Mesh(case_bodyGeom, goldMat);
  case_body.name = "case_body";
  case_body.rotation.x = Math.PI / 2;
  watch_assembly.add(case_body);

  const case_backGeom = new THREE.CylinderGeometry(0.91, 0.91, 0.035, 64);
  const case_back = new THREE.Mesh(case_backGeom, darkGoldMat);
  case_back.name = "case_back";
  case_back.rotation.x = Math.PI / 2;
  case_back.position.z = -0.205;
  watch_assembly.add(case_back);

  const case_side_grooveGeom = new THREE.TorusGeometry(1.025, 0.012, 8, 64);
  const case_side_groove = new THREE.Mesh(case_side_grooveGeom, darkGoldMat);
  case_side_groove.name = "case_side_groove";
  case_side_groove.position.z = -0.085;
  watch_assembly.add(case_side_groove);

  const lugShape = new THREE.Shape();
  lugShape.moveTo(-0.13, -0.25);
  lugShape.lineTo(0.13, -0.25);
  lugShape.bezierCurveTo(0.13, -0.04, 0.105, 0.20, 0.075, 0.31);
  lugShape.bezierCurveTo(0.055, 0.37, -0.055, 0.37, -0.075, 0.31);
  lugShape.bezierCurveTo(-0.105, 0.20, -0.13, -0.04, -0.13, -0.25);
  lugShape.closePath();

  const lugGeom = new THREE.ExtrudeGeometry(lugShape, {
    depth: 0.18,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.025,
    bevelSize: 0.025,
    bevelSegments: 3,
  });

  const top_left_lug = new THREE.Mesh(lugGeom, goldMat);
  top_left_lug.name = "top_left_lug";
  top_left_lug.position.set(-0.56, 0.93, -0.14);
  top_left_lug.rotation.z = 0.18;
  watch_assembly.add(top_left_lug);

  const top_right_lug = new THREE.Mesh(lugGeom, goldMat);
  top_right_lug.name = "top_right_lug";
  top_right_lug.position.set(0.56, 0.93, -0.14);
  top_right_lug.rotation.z = -0.18;
  watch_assembly.add(top_right_lug);

  const bottom_left_lug = new THREE.Mesh(lugGeom, goldMat);
  bottom_left_lug.name = "bottom_left_lug";
  bottom_left_lug.position.set(-0.56, -0.93, -0.14);
  bottom_left_lug.rotation.z = Math.PI - 0.18;
  watch_assembly.add(bottom_left_lug);

  const bottom_right_lug = new THREE.Mesh(lugGeom, goldMat);
  bottom_right_lug.name = "bottom_right_lug";
  bottom_right_lug.position.set(0.56, -0.93, -0.14);
  bottom_right_lug.rotation.z = Math.PI + 0.18;
  watch_assembly.add(bottom_right_lug);

  const spring_barGeom = new THREE.CylinderGeometry(0.025, 0.025, 0.43, 16);

  const top_spring_bar = new THREE.Mesh(spring_barGeom, silverMat);
  top_spring_bar.name = "top_spring_bar";
  top_spring_bar.rotation.z = Math.PI / 2;
  top_spring_bar.position.set(0, 1.17, -0.035);
  watch_assembly.add(top_spring_bar);

  const bottom_spring_bar = new THREE.Mesh(spring_barGeom, silverMat);
  bottom_spring_bar.name = "bottom_spring_bar";
  bottom_spring_bar.rotation.z = Math.PI / 2;
  bottom_spring_bar.position.set(0, -1.17, -0.035);
  watch_assembly.add(bottom_spring_bar);

  const crown_stemGeom = new THREE.CylinderGeometry(0.075, 0.075, 0.18, 24);
  const crown_stem = new THREE.Mesh(crown_stemGeom, darkGoldMat);
  crown_stem.name = "crown_stem";
  crown_stem.rotation.z = Math.PI / 2;
  crown_stem.position.set(1.055, 0, 0.015);
  watch_assembly.add(crown_stem);

  const crown_bodyGeom = new THREE.CylinderGeometry(0.18, 0.18, 0.19, 32);
  const crown_body = new THREE.Mesh(crown_bodyGeom, goldMat);
  crown_body.name = "crown_body";
  crown_body.rotation.z = Math.PI / 2;
  crown_body.position.set(1.205, 0, 0.015);
  watch_assembly.add(crown_body);

  const crown_ridgeGeom = new THREE.BoxGeometry(0.19, 0.026, 0.045);
  const crown_ridges = new THREE.InstancedMesh(crown_ridgeGeom, goldMat, 24);
  crown_ridges.name = "crown_ridges";
  const crown_ridge_dummy = new THREE.Object3D();
  for (let i = 0; i < 24; i++) {
    const angle = i / 24 * Math.PI * 2;
    crown_ridge_dummy.position.set(
      1.205,
      Math.cos(angle) * 0.185,
      0.015 + Math.sin(angle) * 0.185
    );
    crown_ridge_dummy.rotation.set(angle, 0, 0);
    crown_ridge_dummy.updateMatrix();
    crown_ridges.setMatrixAt(i, crown_ridge_dummy.matrix);
  }
  crown_ridges.instanceMatrix.needsUpdate = true;
  watch_assembly.add(crown_ridges);

  const crown_end_capGeom = new THREE.CylinderGeometry(0.145, 0.145, 0.025, 32);
  const crown_end_cap = new THREE.Mesh(crown_end_capGeom, goldMat);
  crown_end_cap.name = "crown_end_cap";
  crown_end_cap.rotation.z = Math.PI / 2;
  crown_end_cap.position.set(1.307, 0, 0.015);
  watch_assembly.add(crown_end_cap);

  const crown_logo_verticalGeom = new THREE.BoxGeometry(0.012, 0.075, 0.014);
  const crown_logo_vertical = new THREE.Mesh(crown_logo_verticalGeom, darkGoldMat);
  crown_logo_vertical.name = "crown_logo_vertical";
  crown_logo_vertical.position.set(1.322, 0, 0.015);
  watch_assembly.add(crown_logo_vertical);

  const crown_logo_horizontalGeom = new THREE.BoxGeometry(0.012, 0.014, 0.075);
  const crown_logo_horizontal = new THREE.Mesh(crown_logo_horizontalGeom, darkGoldMat);
  crown_logo_horizontal.name = "crown_logo_horizontal";
  crown_logo_horizontal.position.set(1.322, 0, 0.015);
  watch_assembly.add(crown_logo_horizontal);

  const bezel_baseGeom = new THREE.CylinderGeometry(0.985, 0.985, 0.07, 64);
  const bezel_base = new THREE.Mesh(bezel_baseGeom, goldMat);
  bezel_base.name = "bezel_base";
  bezel_base.rotation.x = Math.PI / 2;
  bezel_base.position.z = 0.205;
  watch_assembly.add(bezel_base);

  const bezel_outerGeom = new THREE.TorusGeometry(0.955, 0.075, 16, 64);
  const bezel_outer = new THREE.Mesh(bezel_outerGeom, goldMat);
  bezel_outer.name = "bezel_outer";
  bezel_outer.position.z = 0.245;
  watch_assembly.add(bezel_outer);

  const bezel_innerGeom = new THREE.TorusGeometry(0.895, 0.025, 12, 64);
  const bezel_inner = new THREE.Mesh(bezel_innerGeom, silverMat);
  bezel_inner.name = "bezel_inner";
  bezel_inner.position.z = 0.275;
  watch_assembly.add(bezel_inner);

  const dialGeom = new THREE.CircleGeometry(0.875, 64);
  const dial = new THREE.Mesh(dialGeom, dialMat);
  dial.name = "dial";
  dial.position.z = 0.252;
  watch_assembly.add(dial);

  const chapter_ringGeom = new THREE.RingGeometry(0.785, 0.865, 64);
  const chapter_ring = new THREE.Mesh(chapter_ringGeom, chapterMat);
  chapter_ring.name = "chapter_ring";
  chapter_ring.position.z = 0.263;
  watch_assembly.add(chapter_ring);

  const chapter_inner_borderGeom = new THREE.TorusGeometry(0.785, 0.008, 8, 64);
  const chapter_inner_border = new THREE.Mesh(chapter_inner_borderGeom, silverMat);
  chapter_inner_border.name = "chapter_inner_border";
  chapter_inner_border.position.z = 0.271;
  watch_assembly.add(chapter_inner_border);

  const minute_tickGeom = new THREE.BoxGeometry(0.012, 0.045, 0.008);
  const minute_ticks = new THREE.InstancedMesh(minute_tickGeom, darkMat, 60);
  minute_ticks.name = "minute_ticks";
  const minute_tick_dummy = new THREE.Object3D();
  for (let i = 0; i < 60; i++) {
    const angle = i / 60 * Math.PI * 2;
    minute_tick_dummy.position.set(
      Math.sin(angle) * 0.825,
      Math.cos(angle) * 0.825,
      0.276
    );
    minute_tick_dummy.rotation.set(0, 0, -angle);
    minute_tick_dummy.updateMatrix();
    minute_ticks.setMatrixAt(i, minute_tick_dummy.matrix);
  }
  minute_ticks.instanceMatrix.needsUpdate = true;
  watch_assembly.add(minute_ticks);

  const hour_markerGeom = new THREE.BoxGeometry(0.045, 0.165, 0.018);
  const hour_markers = new THREE.InstancedMesh(hour_markerGeom, silverMat, 11);
  hour_markers.name = "hour_markers";
  const hour_marker_dummy = new THREE.Object3D();
  for (let i = 1; i < 12; i++) {
    const angle = i / 12 * Math.PI * 2;
    hour_marker_dummy.position.set(
      Math.sin(angle) * 0.685,
      Math.cos(angle) * 0.685,
      0.282
    );
    hour_marker_dummy.rotation.set(0, 0, -angle);
    hour_marker_dummy.updateMatrix();
    hour_markers.setMatrixAt(i - 1, hour_marker_dummy.matrix);
  }
  hour_markers.instanceMatrix.needsUpdate = true;
  watch_assembly.add(hour_markers);

  const twelve_markerGeom = new THREE.BoxGeometry(0.028, 0.18, 0.019);
  const twelve_markers = new THREE.InstancedMesh(twelve_markerGeom, silverMat, 2);
  twelve_markers.name = "twelve_markers";
  const twelve_marker_dummy = new THREE.Object3D();
  for (let i = 0; i < 2; i++) {
    twelve_marker_dummy.position.set(i === 0 ? -0.025 : 0.025, 0.685, 0.283);
    twelve_marker_dummy.rotation.set(0, 0, 0);
    twelve_marker_dummy.updateMatrix();
    twelve_markers.setMatrixAt(i, twelve_marker_dummy.matrix);
  }
  twelve_markers.instanceMatrix.needsUpdate = true;
  watch_assembly.add(twelve_markers);

  const subdial_x = -0.18;
  const subdial_y = -0.34;

  const subdial_faceGeom = new THREE.CircleGeometry(0.315, 48);
  const subdial_face = new THREE.Mesh(subdial_faceGeom, subdialMat);
  subdial_face.name = "subdial_face";
  subdial_face.position.set(subdial_x, subdial_y, 0.278);
  watch_assembly.add(subdial_face);

  const subdial_borderGeom = new THREE.TorusGeometry(0.315, 0.012, 8, 48);
  const subdial_border = new THREE.Mesh(subdial_borderGeom, darkGoldMat);
  subdial_border.name = "subdial_border";
  subdial_border.position.set(subdial_x, subdial_y, 0.286);
  watch_assembly.add(subdial_border);

  const subdial_tickGeom = new THREE.BoxGeometry(0.009, 0.042, 0.007);
  const subdial_ticks = new THREE.InstancedMesh(subdial_tickGeom, darkMat, 30);
  subdial_ticks.name = "subdial_ticks";
  const subdial_tick_dummy = new THREE.Object3D();
  for (let i = 0; i < 30; i++) {
    const angle = i / 30 * Math.PI * 2;
    subdial_tick_dummy.position.set(
      subdial_x + Math.sin(angle) * 0.275,
      subdial_y + Math.cos(angle) * 0.275,
      0.291
    );
    subdial_tick_dummy.rotation.set(0, 0, -angle);
    subdial_tick_dummy.updateMatrix();
    subdial_ticks.setMatrixAt(i, subdial_tick_dummy.matrix);
  }
  subdial_ticks.instanceMatrix.needsUpdate = true;
  watch_assembly.add(subdial_ticks);

  const subdial_hand_length = 0.22;
  const subdial_hand_angle = -0.72;
  const subdial_handGeom = new THREE.BoxGeometry(0.018, subdial_hand_length, 0.012);
  const subdial_hand = new THREE.Mesh(subdial_handGeom, darkMat);
  subdial_hand.name = "subdial_hand";
  subdial_hand.rotation.z = -subdial_hand_angle;
  subdial_hand.position.set(
    subdial_x + Math.sin(subdial_hand_angle) * subdial_hand_length * 0.5,
    subdial_y + Math.cos(subdial_hand_angle) * subdial_hand_length * 0.5,
    0.304
  );
  watch_assembly.add(subdial_hand);

  const subdial_pinGeom = new THREE.CylinderGeometry(0.045, 0.045, 0.025, 24);
  const subdial_pin = new THREE.Mesh(subdial_pinGeom, darkMat);
  subdial_pin.name = "subdial_pin";
  subdial_pin.rotation.x = Math.PI / 2;
  subdial_pin.position.set(subdial_x, subdial_y, 0.312);
  watch_assembly.add(subdial_pin);

  const subdial_pin_capGeom = new THREE.CylinderGeometry(0.018, 0.018, 0.029, 20);
  const subdial_pin_cap = new THREE.Mesh(subdial_pin_capGeom, silverMat);
  subdial_pin_cap.name = "subdial_pin_cap";
  subdial_pin_cap.rotation.x = Math.PI / 2;
  subdial_pin_cap.position.set(subdial_x, subdial_y, 0.318);
  watch_assembly.add(subdial_pin_cap);

  const moonphase_x = 0.34;
  const moonphase_y = 0.43;

  const moonphase_recessGeom = new THREE.CircleGeometry(0.19, 48);
  const moonphase_recess = new THREE.Mesh(moonphase_recessGeom, darkMat);
  moonphase_recess.name = "moonphase_recess";
  moonphase_recess.position.set(moonphase_x, moonphase_y, 0.279);
  watch_assembly.add(moonphase_recess);

  const moonphase_diskGeom = new THREE.CircleGeometry(0.165, 48);
  const moonphase_disk = new THREE.Mesh(moonphase_diskGeom, dialMat);
  moonphase_disk.name = "moonphase_disk";
  moonphase_disk.position.set(moonphase_x, moonphase_y, 0.284);
  watch_assembly.add(moonphase_disk);

  const moonphase_borderGeom = new THREE.TorusGeometry(0.177, 0.009, 8, 48);
  const moonphase_border = new THREE.Mesh(moonphase_borderGeom, silverMat);
  moonphase_border.name = "moonphase_border";
  moonphase_border.position.set(moonphase_x, moonphase_y, 0.291);
  watch_assembly.add(moonphase_border);

  const moon_fullGeom = new THREE.CircleGeometry(0.067, 28);
  const moon_full = new THREE.Mesh(moon_fullGeom, chapterMat);
  moon_full.name = "moon_full";
  moon_full.position.set(moonphase_x + 0.052, moonphase_y + 0.055, 0.294);
  watch_assembly.add(moon_full);

  const moon_crescentGeom = new THREE.CircleGeometry(0.065, 28);
  const moon_crescent = new THREE.Mesh(moon_crescentGeom, chapterMat);
  moon_crescent.name = "moon_crescent";
  moon_crescent.position.set(moonphase_x - 0.045, moonphase_y - 0.045, 0.294);
  watch_assembly.add(moon_crescent);

  const moon_maskGeom = new THREE.CircleGeometry(0.061, 28);
  const moon_mask = new THREE.Mesh(moon_maskGeom, dialMat);
  moon_mask.name = "moon_mask";
  moon_mask.position.set(moonphase_x - 0.022, moonphase_y - 0.032, 0.296);
  watch_assembly.add(moon_mask);

  const moonphase_tickGeom = new THREE.BoxGeometry(0.006, 0.022, 0.006);
  const moonphase_ticks = new THREE.InstancedMesh(moonphase_tickGeom, chapterMat, 16);
  moonphase_ticks.name = "moonphase_ticks";
  const moonphase_tick_dummy = new THREE.Object3D();
  for (let i = 0; i < 16; i++) {
    const angle = i / 16 * Math.PI * 2;
    moonphase_tick_dummy.position.set(
      moonphase_x + Math.sin(angle) * 0.145,
      moonphase_y + Math.cos(angle) * 0.145,
      0.298
    );
    moonphase_tick_dummy.rotation.set(0, 0, -angle);
    moonphase_tick_dummy.updateMatrix();
    moonphase_ticks.setMatrixAt(i, moonphase_tick_dummy.matrix);
  }
  moonphase_ticks.instanceMatrix.needsUpdate = true;
  watch_assembly.add(moonphase_ticks);

  const hour_hand_length = 0.43;
  const hour_hand_angle = -5.4;
  const hour_handGeom = new THREE.BoxGeometry(0.045, hour_hand_length, 0.018);
  const hour_hand = new THREE.Mesh(hour_handGeom, silverMat);
  hour_hand.name = "hour_hand";
  hour_hand.rotation.z = -hour_hand_angle;
  hour_hand.position.set(
    Math.sin(hour_hand_angle) * hour_hand_length * 0.5,
    Math.cos(hour_hand_angle) * hour_hand_length * 0.5,
    0.307
  );
  watch_assembly.add(hour_hand);

  const minute_hand_length = 0.68;
  const minute_hand_angle = -1.25;
  const minute_handGeom = new THREE.BoxGeometry(0.025, minute_hand_length, 0.014);
  const minute_hand = new THREE.Mesh(minute_handGeom, silverMat);
  minute_hand.name = "minute_hand";
  minute_hand.rotation.z = -minute_hand_angle;
  minute_hand.position.set(
    Math.sin(minute_hand_angle) * minute_hand_length * 0.5,
    Math.cos(minute_hand_angle) * minute_hand_length * 0.5,
    0.313
  );
  watch_assembly.add(minute_hand);

  const center_pinGeom = new THREE.CylinderGeometry(0.055, 0.055, 0.035, 28);
  const center_pin = new THREE.Mesh(center_pinGeom, darkMat);
  center_pin.name = "center_pin";
  center_pin.rotation.x = Math.PI / 2;
  center_pin.position.z = 0.321;
  watch_assembly.add(center_pin);

  const center_pin_capGeom = new THREE.CylinderGeometry(0.022, 0.022, 0.041, 24);
  const center_pin_cap = new THREE.Mesh(center_pin_capGeom, silverMat);
  center_pin_cap.name = "center_pin_cap";
  center_pin_cap.rotation.x = Math.PI / 2;
  center_pin_cap.position.z = 0.327;
  watch_assembly.add(center_pin_cap);

  const crystalGeom = new THREE.SphereGeometry(0.89, 64, 32);
  const crystal = new THREE.Mesh(crystalGeom, glassMat);
  crystal.name = "crystal";
  crystal.scale.set(1, 1, 0.075);
  crystal.position.z = 0.31;
  crystal.renderOrder = 2;
  watch_assembly.add(crystal);

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
    object.position.set(
      -center.x * scale,
      -center.y * scale,
      -center.z * scale
    );
  }
}