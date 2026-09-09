function __sn17_user(THREE) {
  const root = new THREE.Group();
  root.name = "vintage_table_radio";

  const cabinet_group = new THREE.Group();
  cabinet_group.name = "cabinet_group";
  root.add(cabinet_group);

  const front_group = new THREE.Group();
  front_group.name = "front_group";
  root.add(front_group);

  const controls_group = new THREE.Group();
  controls_group.name = "controls_group";
  root.add(controls_group);

  const woodMat = new THREE.MeshStandardMaterial({
    color: 0x754526,
    metalness: 0.0,
    roughness: 0.55
  });
  const darkWoodMat = new THREE.MeshStandardMaterial({
    color: 0x4b2918,
    metalness: 0.0,
    roughness: 0.6
  });
  const grainMat = new THREE.MeshStandardMaterial({
    color: 0x2f1b12,
    metalness: 0.0,
    roughness: 0.75
  });
  const chromeMat = new THREE.MeshStandardMaterial({
    color: 0xd8d8d2,
    metalness: 0.45,
    roughness: 0.2
  });
  const brushedMetalMat = new THREE.MeshStandardMaterial({
    color: 0xb8b8ae,
    metalness: 0.35,
    roughness: 0.45
  });
  const grilleMat = new THREE.MeshStandardMaterial({
    color: 0x30271f,
    metalness: 0.0,
    roughness: 0.8
  });
  const grilleRibMat = new THREE.MeshStandardMaterial({
    color: 0x514438,
    metalness: 0.0,
    roughness: 0.75
  });
  const dialScaleMat = new THREE.MeshStandardMaterial({
    color: 0xc9c19a,
    metalness: 0.0,
    roughness: 0.55
  });
  const controlPanelMat = new THREE.MeshStandardMaterial({
    color: 0xd2c9a6,
    metalness: 0.0,
    roughness: 0.5
  });
  const inkMat = new THREE.MeshStandardMaterial({
    color: 0x171512,
    metalness: 0.0,
    roughness: 0.8
  });
  const rubberMat = new THREE.MeshStandardMaterial({
    color: 0x151515,
    metalness: 0.0,
    roughness: 0.85
  });
  const jackMetalMat = new THREE.MeshStandardMaterial({
    color: 0x6b6252,
    metalness: 0.35,
    roughness: 0.45
  });

  function roundedRectShape(width, height, radius) {
    const shape = new THREE.Shape();
    const left = -width / 2;
    const right = width / 2;
    const bottom = -height / 2;
    const top = height / 2;

    shape.moveTo(left + radius, bottom);
    shape.lineTo(right - radius, bottom);
    shape.quadraticCurveTo(right, bottom, right, bottom + radius);
    shape.lineTo(right, top - radius);
    shape.quadraticCurveTo(right, top, right - radius, top);
    shape.lineTo(left + radius, top);
    shape.quadraticCurveTo(left, top, left, top - radius);
    shape.lineTo(left, bottom + radius);
    shape.quadraticCurveTo(left, bottom, left + radius, bottom);
    shape.closePath();
    return shape;
  }

  function roundedExtrudeGeometry(width, height, radius, depth, bevelSize, bevelThickness) {
    const geometry = new THREE.ExtrudeGeometry(
      roundedRectShape(width, height, radius),
      {
        curveSegments: 10,
        steps: 1,
        depth,
        bevelEnabled: true,
        bevelSegments: 4,
        bevelSize,
        bevelThickness
      }
    );
    geometry.translate(0, 0, -depth / 2);
    return geometry;
  }

  function roundedRectLoop(width, height, radius, z) {
    const points = [];
    const corners = [
      [width / 2 - radius, height / 2 - radius, 0],
      [-width / 2 + radius, height / 2 - radius, Math.PI / 2],
      [-width / 2 + radius, -height / 2 + radius, Math.PI],
      [width / 2 - radius, -height / 2 + radius, Math.PI * 1.5]
    ];

    for (let cornerIndex = 0; cornerIndex < corners.length; cornerIndex++) {
      const corner = corners[cornerIndex];
      for (let step = 0; step <= 5; step++) {
        const angle = corner[2] + step / 5 * Math.PI / 2;
        points.push(new THREE.Vector3(
          corner[0] + Math.cos(angle) * radius,
          corner[1] + Math.sin(angle) * radius,
          z
        ));
      }
    }
    return points;
  }

  const cabinet_bodyGeom = roundedExtrudeGeometry(1.12, 1.02, 0.095, 0.78, 0.025, 0.025);
  const cabinet_body = new THREE.Mesh(cabinet_bodyGeom, woodMat);
  cabinet_body.name = "cabinet_body";
  cabinet_group.add(cabinet_body);

  const front_wood_frameGeom = roundedExtrudeGeometry(1.04, 0.94, 0.075, 0.04, 0.012, 0.012);
  const front_wood_frame = new THREE.Mesh(front_wood_frameGeom, woodMat);
  front_wood_frame.name = "front_wood_frame";
  front_wood_frame.position.z = 0.425;
  front_group.add(front_wood_frame);

  const front_chrome_bezelGeom = roundedExtrudeGeometry(0.96, 0.86, 0.06, 0.026, 0.009, 0.009);
  const front_chrome_bezel = new THREE.Mesh(front_chrome_bezelGeom, chromeMat);
  front_chrome_bezel.name = "front_chrome_bezel";
  front_chrome_bezel.position.z = 0.462;
  front_group.add(front_chrome_bezel);

  const front_black_gasketGeom = roundedExtrudeGeometry(0.89, 0.79, 0.045, 0.014, 0.004, 0.004);
  const front_black_gasket = new THREE.Mesh(front_black_gasketGeom, grilleMat);
  front_black_gasket.name = "front_black_gasket";
  front_black_gasket.position.z = 0.482;
  front_group.add(front_black_gasket);

  const chrome_bezel_lipPoints = roundedRectLoop(0.925, 0.825, 0.052, 0.493);
  const chrome_bezel_lipCurve = new THREE.CatmullRomCurve3(
    chrome_bezel_lipPoints,
    true,
    "centripetal"
  );
  const chrome_bezel_lipGeom = new THREE.TubeGeometry(
    chrome_bezel_lipCurve,
    96,
    0.008,
    8,
    true
  );
  const chrome_bezel_lip = new THREE.Mesh(chrome_bezel_lipGeom, chromeMat);
  chrome_bezel_lip.name = "chrome_bezel_lip";
  front_group.add(chrome_bezel_lip);

  const upper_speaker_grilleGeom = roundedExtrudeGeometry(0.82, 0.245, 0.025, 0.012, 0.003, 0.003);
  const upper_speaker_grille = new THREE.Mesh(upper_speaker_grilleGeom, grilleMat);
  upper_speaker_grille.name = "upper_speaker_grille";
  upper_speaker_grille.position.set(0, 0.235, 0.494);
  front_group.add(upper_speaker_grille);

  const lower_speaker_grilleGeom = roundedExtrudeGeometry(0.82, 0.235, 0.025, 0.012, 0.003, 0.003);
  const lower_speaker_grille = new THREE.Mesh(lower_speaker_grilleGeom, grilleMat);
  lower_speaker_grille.name = "lower_speaker_grille";
  lower_speaker_grille.position.set(0, -0.075, 0.494);
  front_group.add(lower_speaker_grille);

  const speaker_grille_horizontal_ribsGeom = new THREE.BoxGeometry(0.79, 0.006, 0.008);
  const speaker_grille_horizontal_ribs = new THREE.InstancedMesh(
    speaker_grille_horizontal_ribsGeom,
    grilleRibMat,
    28
  );
  speaker_grille_horizontal_ribs.name = "speaker_grille_horizontal_ribs";
  const rib_dummy = new THREE.Object3D();
  let rib_index = 0;
  const grille_centers = [0.235, -0.075];
  for (let panelIndex = 0; panelIndex < grille_centers.length; panelIndex++) {
    for (let row = 0; row < 14; row++) {
      rib_dummy.position.set(
        0,
        grille_centers[panelIndex] - 0.105 + row * 0.016,
        0.507
      );
      rib_dummy.rotation.set(0, 0, 0);
      rib_dummy.updateMatrix();
      speaker_grille_horizontal_ribs.setMatrixAt(rib_index++, rib_dummy.matrix);
    }
  }
  speaker_grille_horizontal_ribs.instanceMatrix.needsUpdate = true;
  front_group.add(speaker_grille_horizontal_ribs);

  const speaker_grille_vertical_weaveGeom = new THREE.BoxGeometry(0.0035, 0.205, 0.006);
  const speaker_grille_vertical_weave = new THREE.InstancedMesh(
    speaker_grille_vertical_weaveGeom,
    grilleRibMat,
    24
  );
  speaker_grille_vertical_weave.name = "speaker_grille_vertical_weave";
  let weave_index = 0;
  for (let panelIndex = 0; panelIndex < grille_centers.length; panelIndex++) {
    for (let column = 0; column < 12; column++) {
      rib_dummy.position.set(
        -0.36 + column * 0.065,
        grille_centers[panelIndex],
        0.505
      );
      rib_dummy.rotation.set(0, 0, 0);
      rib_dummy.updateMatrix();
      speaker_grille_vertical_weave.setMatrixAt(weave_index++, rib_dummy.matrix);
    }
  }
  speaker_grille_vertical_weave.instanceMatrix.needsUpdate = true;
  front_group.add(speaker_grille_vertical_weave);

  const tuning_dial_scaleGeom = new THREE.BoxGeometry(0.82, 0.078, 0.014);
  const tuning_dial_scale = new THREE.Mesh(tuning_dial_scaleGeom, dialScaleMat);
  tuning_dial_scale.name = "tuning_dial_scale";
  tuning_dial_scale.position.set(0, 0.075, 0.501);
  front_group.add(tuning_dial_scale);

  const tuning_dial_baselineGeom = new THREE.BoxGeometry(0.77, 0.0035, 0.006);
  const tuning_dial_baseline = new THREE.Mesh(tuning_dial_baselineGeom, inkMat);
  tuning_dial_baseline.name = "tuning_dial_baseline";
  tuning_dial_baseline.position.set(0, 0.073, 0.512);
  front_group.add(tuning_dial_baseline);

  const tuning_dial_ticksGeom = new THREE.BoxGeometry(0.003, 0.018, 0.006);
  const tuning_dial_ticks = new THREE.InstancedMesh(tuning_dial_ticksGeom, inkMat, 33);
  tuning_dial_ticks.name = "tuning_dial_ticks";
  const tick_dummy = new THREE.Object3D();
  for (let index = 0; index < 33; index++) {
    const major = index % 8 === 0;
    tick_dummy.position.set(-0.375 + index * 0.023, 0.077, 0.513);
    tick_dummy.rotation.set(0, 0, 0);
    tick_dummy.scale.set(1, major ? 1.45 : 0.72, 1);
    tick_dummy.updateMatrix();
    tuning_dial_ticks.setMatrixAt(index, tick_dummy.matrix);
  }
  tuning_dial_ticks.instanceMatrix.needsUpdate = true;
  front_group.add(tuning_dial_ticks);

  const tuning_dial_needleGeom = new THREE.BoxGeometry(0.006, 0.066, 0.007);
  const tuning_dial_needle = new THREE.Mesh(tuning_dial_needleGeom, inkMat);
  tuning_dial_needle.name = "tuning_dial_needle";
  tuning_dial_needle.position.set(0.015, 0.075, 0.516);
  front_group.add(tuning_dial_needle);

  const horizontal_chrome_railsGeom = new THREE.CylinderGeometry(0.008, 0.008, 0.84, 12);
  const horizontal_chrome_rails = new THREE.InstancedMesh(
    horizontal_chrome_railsGeom,
    chromeMat,
    3
  );
  horizontal_chrome_rails.name = "horizontal_chrome_rails";
  const rail_dummy = new THREE.Object3D();
  const rail_heights = [0.126, 0.024, -0.205];
  for (let index = 0; index < rail_heights.length; index++) {
    rail_dummy.position.set(0, rail_heights[index], 0.516);
    rail_dummy.rotation.set(0, 0, Math.PI / 2);
    rail_dummy.updateMatrix();
    horizontal_chrome_rails.setMatrixAt(index, rail_dummy.matrix);
  }
  horizontal_chrome_rails.instanceMatrix.needsUpdate = true;
  front_group.add(horizontal_chrome_rails);

  const wood_grain_stripGeom = new THREE.BoxGeometry(0.82, 0.048, 0.014);
  const wood_grain_strip = new THREE.Mesh(wood_grain_stripGeom, darkWoodMat);
  wood_grain_strip.name = "wood_grain_strip";
  wood_grain_strip.position.set(0, -0.235, 0.501);
  front_group.add(wood_grain_strip);

  const control_panelGeom = roundedExtrudeGeometry(0.82, 0.18, 0.025, 0.014, 0.003, 0.003);
  const control_panel = new THREE.Mesh(control_panelGeom, controlPanelMat);
  control_panel.name = "control_panel";
  control_panel.position.set(0, -0.345, 0.501);
  front_group.add(control_panel);

  const control_panel_top_trimGeom = new THREE.BoxGeometry(0.80, 0.009, 0.009);
  const control_panel_top_trim = new THREE.Mesh(control_panel_top_trimGeom, chromeMat);
  control_panel_top_trim.name = "control_panel_top_trim";
  control_panel_top_trim.position.set(0, -0.252, 0.516);
  front_group.add(control_panel_top_trim);

  const small_tuning_knobGeom = new THREE.CylinderGeometry(0.052, 0.052, 0.046, 28);
  const small_tuning_knob = new THREE.Mesh(small_tuning_knobGeom, brushedMetalMat);
  small_tuning_knob.name = "small_tuning_knob";
  small_tuning_knob.rotation.x = Math.PI / 2;
  small_tuning_knob.position.set(-0.315, -0.345, 0.535);
  controls_group.add(small_tuning_knob);

  const small_tuning_knob_ringGeom = new THREE.TorusGeometry(0.052, 0.006, 8, 28);
  const small_tuning_knob_ring = new THREE.Mesh(small_tuning_knob_ringGeom, chromeMat);
  small_tuning_knob_ring.name = "small_tuning_knob_ring";
  small_tuning_knob_ring.position.set(-0.315, -0.345, 0.561);
  controls_group.add(small_tuning_knob_ring);

  const small_tuning_knob_faceGeom = new THREE.CylinderGeometry(0.038, 0.038, 0.012, 28);
  const small_tuning_knob_face = new THREE.Mesh(small_tuning_knob_faceGeom, chromeMat);
  small_tuning_knob_face.name = "small_tuning_knob_face";
  small_tuning_knob_face.rotation.x = Math.PI / 2;
  small_tuning_knob_face.position.set(-0.315, -0.345, 0.565);
  controls_group.add(small_tuning_knob_face);

  const small_tuning_knob_ridgesGeom = new THREE.BoxGeometry(0.004, 0.014, 0.006);
  const small_tuning_knob_ridges = new THREE.InstancedMesh(
    small_tuning_knob_ridgesGeom,
    brushedMetalMat,
    18
  );
  small_tuning_knob_ridges.name = "small_tuning_knob_ridges";
  const knob_dummy = new THREE.Object3D();
  for (let index = 0; index < 18; index++) {
    const angle = index / 18 * Math.PI * 2;
    knob_dummy.position.set(
      -0.315 + Math.cos(angle) * 0.052,
      -0.345 + Math.sin(angle) * 0.052,
      0.568
    );
    knob_dummy.rotation.set(0, 0, angle - Math.PI / 2);
    knob_dummy.scale.set(1, 1, 1);
    knob_dummy.updateMatrix();
    small_tuning_knob_ridges.setMatrixAt(index, knob_dummy.matrix);
  }
  small_tuning_knob_ridges.instanceMatrix.needsUpdate = true;
  controls_group.add(small_tuning_knob_ridges);

  const volume_knobGeom = new THREE.CylinderGeometry(0.084, 0.084, 0.058, 36);
  const volume_knob = new THREE.Mesh(volume_knobGeom, brushedMetalMat);
  volume_knob.name = "volume_knob";
  volume_knob.rotation.x = Math.PI / 2;
  volume_knob.position.set(-0.105, -0.345, 0.537);
  controls_group.add(volume_knob);

  const volume_knob_ringGeom = new THREE.TorusGeometry(0.084, 0.007, 10, 36);
  const volume_knob_ring = new THREE.Mesh(volume_knob_ringGeom, chromeMat);
  volume_knob_ring.name = "volume_knob_ring";
  volume_knob_ring.position.set(-0.105, -0.345, 0.57);
  controls_group.add(volume_knob_ring);

  const volume_knob_faceGeom = new THREE.CylinderGeometry(0.064, 0.064, 0.014, 36);
  const volume_knob_face = new THREE.Mesh(volume_knob_faceGeom, chromeMat);
  volume_knob_face.name = "volume_knob_face";
  volume_knob_face.rotation.x = Math.PI / 2;
  volume_knob_face.position.set(-0.105, -0.345, 0.574);
  controls_group.add(volume_knob_face);

  const volume_knob_ridgesGeom = new THREE.BoxGeometry(0.0045, 0.019, 0.007);
  const volume_knob_ridges = new THREE.InstancedMesh(
    volume_knob_ridgesGeom,
    brushedMetalMat,
    28
  );
  volume_knob_ridges.name = "volume_knob_ridges";
  for (let index = 0; index < 28; index++) {
    const angle = index / 28 * Math.PI * 2;
    knob_dummy.position.set(
      -0.105 + Math.cos(angle) * 0.084,
      -0.345 + Math.sin(angle) * 0.084,
      0.577
    );
    knob_dummy.rotation.set(0, 0, angle - Math.PI / 2);
    knob_dummy.scale.set(1, 1, 1);
    knob_dummy.updateMatrix();
    volume_knob_ridges.setMatrixAt(index, knob_dummy.matrix);
  }
  volume_knob_ridges.instanceMatrix.needsUpdate = true;
  controls_group.add(volume_knob_ridges);

  const volume_knob_markersGeom = new THREE.BoxGeometry(0.003, 0.011, 0.005);
  const volume_knob_markers = new THREE.InstancedMesh(
    volume_knob_markersGeom,
    inkMat,
    15
  );
  volume_knob_markers.name = "volume_knob_markers";
  for (let index = 0; index < 15; index++) {
    const angle = -2.5 + index / 14 * 5.0;
    knob_dummy.position.set(
      -0.105 + Math.cos(angle) * 0.105,
      -0.345 + Math.sin(angle) * 0.105,
      0.516
    );
    knob_dummy.rotation.set(0, 0, angle - Math.PI / 2);
    knob_dummy.scale.set(1, index % 5 === 0 ? 1.45 : 0.8, 1);
    knob_dummy.updateMatrix();
    volume_knob_markers.setMatrixAt(index, knob_dummy.matrix);
  }
  volume_knob_markers.instanceMatrix.needsUpdate = true;
  controls_group.add(volume_knob_markers);

  const selector_knobGeom = new THREE.CylinderGeometry(0.086, 0.086, 0.058, 36);
  const selector_knob = new THREE.Mesh(selector_knobGeom, brushedMetalMat);
  selector_knob.name = "selector_knob";
  selector_knob.rotation.x = Math.PI / 2;
  selector_knob.position.set(0.205, -0.345, 0.537);
  controls_group.add(selector_knob);

  const selector_knob_ringGeom = new THREE.TorusGeometry(0.086, 0.007, 10, 36);
  const selector_knob_ring = new THREE.Mesh(selector_knob_ringGeom, chromeMat);
  selector_knob_ring.name = "selector_knob_ring";
  selector_knob_ring.position.set(0.205, -0.345, 0.57);
  controls_group.add(selector_knob_ring);

  const selector_knob_faceGeom = new THREE.CylinderGeometry(0.066, 0.066, 0.014, 36);
  const selector_knob_face = new THREE.Mesh(selector_knob_faceGeom, chromeMat);
  selector_knob_face.name = "selector_knob_face";
  selector_knob_face.rotation.x = Math.PI / 2;
  selector_knob_face.position.set(0.205, -0.345, 0.574);
  controls_group.add(selector_knob_face);

  const selector_knob_ridgesGeom = new THREE.BoxGeometry(0.0045, 0.019, 0.007);
  const selector_knob_ridges = new THREE.InstancedMesh(
    selector_knob_ridgesGeom,
    brushedMetalMat,
    28
  );
  selector_knob_ridges.name = "selector_knob_ridges";
  for (let index = 0; index < 28; index++) {
    const angle = index / 28 * Math.PI * 2;
    knob_dummy.position.set(
      0.205 + Math.cos(angle) * 0.086,
      -0.345 + Math.sin(angle) * 0.086,
      0.577
    );
    knob_dummy.rotation.set(0, 0, angle - Math.PI / 2);
    knob_dummy.scale.set(1, 1, 1);
    knob_dummy.updateMatrix();
    selector_knob_ridges.setMatrixAt(index, knob_dummy.matrix);
  }
  selector_knob_ridges.instanceMatrix.needsUpdate = true;
  controls_group.add(selector_knob_ridges);

  const selector_knob_markersGeom = new THREE.BoxGeometry(0.003, 0.011, 0.005);
  const selector_knob_markers = new THREE.InstancedMesh(
    selector_knob_markersGeom,
    inkMat,
    15
  );
  selector_knob_markers.name = "selector_knob_markers";
  for (let index = 0; index < 15; index++) {
    const angle = -2.5 + index / 14 * 5.0;
    knob_dummy.position.set(
      0.205 + Math.cos(angle) * 0.108,
      -0.345 + Math.sin(angle) * 0.108,
      0.516
    );
    knob_dummy.rotation.set(0, 0, angle - Math.PI / 2);
    knob_dummy.scale.set(1, index % 5 === 0 ? 1.45 : 0.8, 1);
    knob_dummy.updateMatrix();
    selector_knob_markers.setMatrixAt(index, knob_dummy.matrix);
  }
  selector_knob_markers.instanceMatrix.needsUpdate = true;
  controls_group.add(selector_knob_markers);

  const center_socketGeom = new THREE.CylinderGeometry(0.017, 0.017, 0.014, 20);
  const center_socket = new THREE.Mesh(center_socketGeom, inkMat);
  center_socket.name = "center_socket";
  center_socket.rotation.x = Math.PI / 2;
  center_socket.position.set(0.025, -0.345, 0.519);
  controls_group.add(center_socket);

  const center_socket_rimGeom = new THREE.TorusGeometry(0.018, 0.003, 8, 20);
  const center_socket_rim = new THREE.Mesh(center_socket_rimGeom, jackMetalMat);
  center_socket_rim.name = "center_socket_rim";
  center_socket_rim.position.set(0.025, -0.345, 0.528);
  controls_group.add(center_socket_rim);

  const headphone_jackGeom = new THREE.CylinderGeometry(0.031, 0.031, 0.018, 24);
  const headphone_jack = new THREE.Mesh(headphone_jackGeom, inkMat);
  headphone_jack.name = "headphone_jack";
  headphone_jack.rotation.x = Math.PI / 2;
  headphone_jack.position.set(0.355, -0.355, 0.521);
  controls_group.add(headphone_jack);

  const headphone_jack_rimGeom = new THREE.TorusGeometry(0.034, 0.006, 10, 24);
  const headphone_jack_rim = new THREE.Mesh(headphone_jack_rimGeom, jackMetalMat);
  headphone_jack_rim.name = "headphone_jack_rim";
  headphone_jack_rim.position.set(0.355, -0.355, 0.532);
  controls_group.add(headphone_jack_rim);

  const headphone_jack_innerGeom = new THREE.CylinderGeometry(0.016, 0.016, 0.02, 20);
  const headphone_jack_inner = new THREE.Mesh(headphone_jack_innerGeom, rubberMat);
  headphone_jack_inner.name = "headphone_jack_inner";
  headphone_jack_inner.rotation.x = Math.PI / 2;
  headphone_jack_inner.position.set(0.355, -0.355, 0.538);
  controls_group.add(headphone_jack_inner);

  const control_label_marksGeom = new THREE.BoxGeometry(0.003, 0.014, 0.005);
  const control_label_marks = new THREE.InstancedMesh(
    control_label_marksGeom,
    inkMat,
    18
  );
  control_label_marks.name = "control_label_marks";
  const label_positions = [
    [-0.35, -0.285], [-0.325, -0.285], [-0.30, -0.285], [-0.275, -0.285],
    [-0.155, -0.278], [-0.13, -0.278], [-0.105, -0.278], [-0.08, -0.278], [-0.055, -0.278],
    [0.145, -0.278], [0.17, -0.278], [0.195, -0.278], [0.22, -0.278], [0.245, -0.278],
    [0.335, -0.292], [0.36, -0.292], [0.335, -0.405], [0.36, -0.405]
  ];
  for (let index = 0; index < label_positions.length; index++) {
    knob_dummy.position.set(label_positions[index][0], label_positions[index][1], 0.516);
    knob_dummy.rotation.set(0, 0, 0);
    knob_dummy.scale.set(1, index % 6 === 0 ? 1.35 : 0.75, 1);
    knob_dummy.updateMatrix();
    control_label_marks.setMatrixAt(index, knob_dummy.matrix);
  }
  control_label_marks.instanceMatrix.needsUpdate = true;
  controls_group.add(control_label_marks);

  const rubber_feetGeom = new THREE.CylinderGeometry(0.055, 0.06, 0.045, 20);
  const rubber_feet = new THREE.InstancedMesh(rubber_feetGeom, rubberMat, 4);
  rubber_feet.name = "rubber_feet";
  const foot_dummy = new THREE.Object3D();
  const foot_positions = [
    [-0.42, -0.545, 0.28],
    [0.42, -0.545, 0.28],
    [-0.42, -0.545, -0.28],
    [0.42, -0.545, -0.28]
  ];
  for (let index = 0; index < foot_positions.length; index++) {
    foot_dummy.position.set(
      foot_positions[index][0],
      foot_positions[index][1],
      foot_positions[index][2]
    );
    foot_dummy.rotation.set(0, 0, 0);
    foot_dummy.scale.set(1, 1, 1);
    foot_dummy.updateMatrix();
    rubber_feet.setMatrixAt(index, foot_dummy.matrix);
  }
  rubber_feet.instanceMatrix.needsUpdate = true;
  cabinet_group.add(rubber_feet);

  const side_wood_grainGeom = new THREE.BoxGeometry(0.006, 0.18, 0.006);
  const side_wood_grain = new THREE.InstancedMesh(side_wood_grainGeom, grainMat, 30);
  side_wood_grain.name = "side_wood_grain";
  const grain_dummy = new THREE.Object3D();
  let side_grain_index = 0;
  for (const side of [-1, 1]) {
    for (let index = 0; index < 15; index++) {
      grain_dummy.position.set(
        side * 0.588,
        -0.39 + (index % 5) * 0.19,
        -0.32 + index * 0.046
      );
      grain_dummy.rotation.set(0, 0, 0);
      grain_dummy.scale.set(1, 0.65 + (index % 4) * 0.16, 1);
      grain_dummy.updateMatrix();
      side_wood_grain.setMatrixAt(side_grain_index++, grain_dummy.matrix);
    }
  }
  side_wood_grain.instanceMatrix.needsUpdate = true;
  cabinet_group.add(side_wood_grain);

  const top_wood_grainGeom = new THREE.BoxGeometry(0.006, 0.005, 0.24);
  const top_wood_grain = new THREE.InstancedMesh(top_wood_grainGeom, grainMat, 18);
  top_wood_grain.name = "top_wood_grain";
  for (let index = 0; index < 18; index++) {
    grain_dummy.position.set(
      -0.47 + index * 0.055,
      0.539,
      -0.08 + (index % 4) * 0.055
    );
    grain_dummy.rotation.set(0, 0, 0);
    grain_dummy.scale.set(1, 1, 0.65 + (index % 5) * 0.12);
    grain_dummy.updateMatrix();
    top_wood_grain.setMatrixAt(index, grain_dummy.matrix);
  }
  top_wood_grain.instanceMatrix.needsUpdate = true;
  cabinet_group.add(top_wood_grain);

  fitToUnitCube(THREE, root);
  return root;

  function fitToUnitCube(THREE, object) {
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
