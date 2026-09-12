// miner-diag: gpus=? tflops=? stream48=? power=? probe_tps=3831 cpu_quota=?/? net=? batch=1 wall=1609 seed=870128282
export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "vintage_electronic_music_box";

  const woodMat = new THREE.MeshStandardMaterial({
    color: 0x8a4f2c,
    metalness: 0.0,
    roughness: 0.6,
  });
  const darkWoodMat = new THREE.MeshStandardMaterial({
    color: 0x542b18,
    metalness: 0.0,
    roughness: 0.6,
  });
  const grainMat = new THREE.MeshStandardMaterial({
    color: 0x321b12,
    metalness: 0.0,
    roughness: 0.9,
  });
  const brassMat = new THREE.MeshStandardMaterial({
    color: 0xb08a45,
    metalness: 0.6,
    roughness: 0.2,
  });
  const agedBrassMat = new THREE.MeshStandardMaterial({
    color: 0x80652f,
    metalness: 0.5,
    roughness: 0.35,
  });
  const copperMat = new THREE.MeshStandardMaterial({
    color: 0xb87333,
    metalness: 0.5,
    roughness: 0.25,
  });
  const darkMetalMat = new THREE.MeshStandardMaterial({
    color: 0x3a3a3a,
    metalness: 0.6,
    roughness: 0.5,
  });
  const blackMat = new THREE.MeshStandardMaterial({
    color: 0x171717,
    metalness: 0.0,
    roughness: 0.8,
  });
  const panelMat = new THREE.MeshStandardMaterial({
    color: 0x25282a,
    metalness: 0.0,
    roughness: 0.7,
  });
  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0x718087,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
    opacity: 0.48,
    depthWrite: false,
    side: THREE.DoubleSide,
  });
  const reflectionMat = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.09,
    depthWrite: false,
    side: THREE.DoubleSide,
  });

  function roundedRectShape(width, height, radius) {
    const x0 = -width / 2;
    const x1 = width / 2;
    const y0 = -height / 2;
    const y1 = height / 2;
    const shape = new THREE.Shape();
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

  function roundedExtrudeGeometry(width, height, radius, depth, bevel) {
    return new THREE.ExtrudeGeometry(
      roundedRectShape(width, height, radius),
      {
        depth,
        steps: 1,
        bevelEnabled: bevel > 0,
        bevelThickness: bevel,
        bevelSize: bevel,
        bevelSegments: 3,
        curveSegments: 8,
      }
    );
  }

  const cabinet_bodyGeom = roundedExtrudeGeometry(2.4, 2.2, 0.16, 1.18, 0.04);
  const cabinet_body = new THREE.Mesh(cabinet_bodyGeom, woodMat);
  cabinet_body.name = "cabinet_body";
  cabinet_body.position.set(0, 1.1, -0.59);
  root.add(cabinet_body);

  const top_panelGeom = new THREE.BoxGeometry(2.12, 0.045, 1.02);
  const top_panel = new THREE.Mesh(top_panelGeom, woodMat);
  top_panel.name = "top_panel";
  top_panel.position.set(0, 2.225, -0.01);
  root.add(top_panel);

  const top_front_moldingGeom = new THREE.CylinderGeometry(0.055, 0.055, 2.16, 16);
  const top_front_molding = new THREE.Mesh(top_front_moldingGeom, darkWoodMat);
  top_front_molding.name = "top_front_molding";
  top_front_molding.rotation.z = Math.PI / 2;
  top_front_molding.position.set(0, 2.17, 0.53);
  root.add(top_front_molding);

  const top_side_moldingsGeom = new THREE.CylinderGeometry(0.045, 0.045, 1.02, 12);
  const top_side_moldings = new THREE.InstancedMesh(top_side_moldingsGeom, darkWoodMat, 2);
  top_side_moldings.name = "top_side_moldings";
  const topSideQuat = new THREE.Quaternion().setFromAxisAngle(
    new THREE.Vector3(1, 0, 0),
    Math.PI / 2
  );
  for (let i = 0; i < 2; i++) {
    const x = i === 0 ? -1.12 : 1.12;
    const matrix = new THREE.Matrix4().compose(
      new THREE.Vector3(x, 2.2, -0.01),
      topSideQuat,
      new THREE.Vector3(1, 1, 1)
    );
    top_side_moldings.setMatrixAt(i, matrix);
  }
  top_side_moldings.instanceMatrix.needsUpdate = true;
  root.add(top_side_moldings);

  const display_group = new THREE.Group();
  display_group.name = "display_group";
  root.add(display_group);

  const display_backingGeom = roundedExtrudeGeometry(1.94, 1.03, 0.07, 0.025, 0.008);
  const display_backing = new THREE.Mesh(display_backingGeom, panelMat);
  display_backing.name = "display_backing";
  display_backing.position.set(0, 1.56, 0.625);
  display_group.add(display_backing);

  const display_glassGeom = new THREE.PlaneGeometry(1.82, 0.91);
  const display_glass = new THREE.Mesh(display_glassGeom, glassMat);
  display_glass.name = "display_glass";
  display_glass.position.set(0, 1.56, 0.666);
  display_group.add(display_glass);

  const display_reflectionShape = new THREE.Shape();
  display_reflectionShape.moveTo(-0.84, 0.4);
  display_reflectionShape.lineTo(-0.58, 0.4);
  display_reflectionShape.lineTo(0.78, -0.4);
  display_reflectionShape.lineTo(0.52, -0.4);
  display_reflectionShape.closePath();
  const display_reflectionGeom = new THREE.ShapeGeometry(display_reflectionShape);
  const display_reflection = new THREE.Mesh(display_reflectionGeom, reflectionMat);
  display_reflection.name = "display_reflection";
  display_reflection.position.set(0, 1.56, 0.674);
  display_group.add(display_reflection);

  const frameHorizontalGeom = new THREE.BoxGeometry(2.04, 0.075, 0.055);
  const frameVerticalGeom = new THREE.BoxGeometry(0.075, 1.03, 0.055);

  const display_frame_top = new THREE.Mesh(frameHorizontalGeom, brassMat);
  display_frame_top.name = "display_frame_top";
  display_frame_top.position.set(0, 2.075, 0.684);
  display_group.add(display_frame_top);

  const display_frame_bottom = new THREE.Mesh(frameHorizontalGeom, brassMat);
  display_frame_bottom.name = "display_frame_bottom";
  display_frame_bottom.position.set(0, 1.045, 0.684);
  display_group.add(display_frame_bottom);

  const display_frame_left = new THREE.Mesh(frameVerticalGeom, brassMat);
  display_frame_left.name = "display_frame_left";
  display_frame_left.position.set(-1.0, 1.56, 0.684);
  display_group.add(display_frame_left);

  const display_frame_right = new THREE.Mesh(frameVerticalGeom, brassMat);
  display_frame_right.name = "display_frame_right";
  display_frame_right.position.set(1.0, 1.56, 0.684);
  display_group.add(display_frame_right);

  const innerHorizontalGeom = new THREE.BoxGeometry(1.86, 0.018, 0.025);
  const innerVerticalGeom = new THREE.BoxGeometry(0.018, 0.88, 0.025);

  const display_inner_top = new THREE.Mesh(innerHorizontalGeom, agedBrassMat);
  display_inner_top.name = "display_inner_top";
  display_inner_top.position.set(0, 2.005, 0.714);
  display_group.add(display_inner_top);

  const display_inner_bottom = new THREE.Mesh(innerHorizontalGeom, agedBrassMat);
  display_inner_bottom.name = "display_inner_bottom";
  display_inner_bottom.position.set(0, 1.115, 0.714);
  display_group.add(display_inner_bottom);

  const display_inner_left = new THREE.Mesh(innerVerticalGeom, agedBrassMat);
  display_inner_left.name = "display_inner_left";
  display_inner_left.position.set(-0.925, 1.56, 0.714);
  display_group.add(display_inner_left);

  const display_inner_right = new THREE.Mesh(innerVerticalGeom, agedBrassMat);
  display_inner_right.name = "display_inner_right";
  display_inner_right.position.set(0.925, 1.56, 0.714);
  display_group.add(display_inner_right);

  const display_supportsGeom = new THREE.BoxGeometry(0.018, 0.72, 0.018);
  const display_supports = new THREE.InstancedMesh(display_supportsGeom, agedBrassMat, 6);
  display_supports.name = "display_supports";
  const supportXs = [-0.78, -0.47, -0.16, 0.16, 0.47, 0.78];
  for (let i = 0; i < supportXs.length; i++) {
    const matrix = new THREE.Matrix4().makeTranslation(supportXs[i], 1.56, 0.682);
    display_supports.setMatrixAt(i, matrix);
  }
  display_supports.instanceMatrix.needsUpdate = true;
  display_group.add(display_supports);

  const oscillatorData = [
    [-0.72, 1.31, 0.13, 0.28],
    [-0.43, 1.39, 0.12, 0.34],
    [-0.12, 1.34, 0.14, 0.31],
    [0.22, 1.36, 0.14, 0.34],
    [0.53, 1.38, 0.12, 0.32],
    [0.77, 1.42, 0.105, 0.27],
  ];

  const oscillator_basesGeom = new THREE.CylinderGeometry(0.15, 0.15, 0.035, 20);
  const oscillator_bases = new THREE.InstancedMesh(
    oscillator_basesGeom,
    agedBrassMat,
    oscillatorData.length
  );
  oscillator_bases.name = "oscillator_bases";

  const oscillator_bodiesGeom = new THREE.CylinderGeometry(1, 1, 1, 20);
  const oscillator_bodies = new THREE.InstancedMesh(
    oscillator_bodiesGeom,
    brassMat,
    oscillatorData.length
  );
  oscillator_bodies.name = "oscillator_bodies";

  const oscillator_capsGeom = new THREE.CylinderGeometry(1, 1, 1, 20);
  const oscillator_caps = new THREE.InstancedMesh(
    oscillator_capsGeom,
    agedBrassMat,
    oscillatorData.length
  );
  oscillator_caps.name = "oscillator_caps";

  const oscillator_top_pinsGeom = new THREE.CylinderGeometry(1, 1, 1, 14);
  const oscillator_top_pins = new THREE.InstancedMesh(
    oscillator_top_pinsGeom,
    copperMat,
    oscillatorData.length
  );
  oscillator_top_pins.name = "oscillator_top_pins";

  const oscillator_collarsGeom = new THREE.TorusGeometry(1, 0.1, 8, 20);
  const oscillator_collars = new THREE.InstancedMesh(
    oscillator_collarsGeom,
    darkMetalMat,
    oscillatorData.length
  );
  oscillator_collars.name = "oscillator_collars";

  const oscillator_labelsGeom = new THREE.BoxGeometry(1, 1, 1);
  const oscillator_labels = new THREE.InstancedMesh(
    oscillator_labelsGeom,
    darkMetalMat,
    oscillatorData.length
  );
  oscillator_labels.name = "oscillator_labels";

  const identityQuat = new THREE.Quaternion();
  const horizontalQuat = new THREE.Quaternion().setFromAxisAngle(
    new THREE.Vector3(1, 0, 0),
    Math.PI / 2
  );

  for (let i = 0; i < oscillatorData.length; i++) {
    const x = oscillatorData[i][0];
    const y = oscillatorData[i][1];
    const r = oscillatorData[i][2];
    const h = oscillatorData[i][3];

    oscillator_bases.setMatrixAt(
      i,
      new THREE.Matrix4().compose(
        new THREE.Vector3(x, 1.13, 0.69),
        identityQuat,
        new THREE.Vector3(1, 1, 1)
      )
    );
    oscillator_bodies.setMatrixAt(
      i,
      new THREE.Matrix4().compose(
        new THREE.Vector3(x, y, 0.69),
        identityQuat,
        new THREE.Vector3(r, h, r)
      )
    );
    oscillator_caps.setMatrixAt(
      i,
      new THREE.Matrix4().compose(
        new THREE.Vector3(x, y + h / 2 + 0.018, 0.69),
        identityQuat,
        new THREE.Vector3(r * 1.04, 0.036, r * 1.04)
      )
    );
    oscillator_top_pins.setMatrixAt(
      i,
      new THREE.Matrix4().compose(
        new THREE.Vector3(x, y + h / 2 + 0.06, 0.69),
        identityQuat,
        new THREE.Vector3(r * 0.22, 0.09, r * 0.22)
      )
    );
    oscillator_collars.setMatrixAt(
      i,
      new THREE.Matrix4().compose(
        new THREE.Vector3(x, y + h * 0.18, 0.69),
        horizontalQuat,
        new THREE.Vector3(r * 1.01, r * 1.01, r * 1.01)
      )
    );
    oscillator_labels.setMatrixAt(
      i,
      new THREE.Matrix4().compose(
        new THREE.Vector3(x, y - h * 0.08, 0.792),
        identityQuat,
        new THREE.Vector3(r * 0.72, 0.055, 0.008)
      )
    );
  }

  oscillator_bases.instanceMatrix.needsUpdate = true;
  oscillator_bodies.instanceMatrix.needsUpdate = true;
  oscillator_caps.instanceMatrix.needsUpdate = true;
  oscillator_top_pins.instanceMatrix.needsUpdate = true;
  oscillator_collars.instanceMatrix.needsUpdate = true;
  oscillator_labels.instanceMatrix.needsUpdate = true;
  display_group.add(
    oscillator_bases,
    oscillator_bodies,
    oscillator_caps,
    oscillator_top_pins,
    oscillator_collars,
    oscillator_labels
  );

  const display_screwsGeom = new THREE.CylinderGeometry(0.025, 0.025, 0.012, 12);
  const display_screws = new THREE.InstancedMesh(display_screwsGeom, darkMetalMat, 4);
  display_screws.name = "display_screws";
  const screwPositions = [
    [-0.88, 1.18],
    [0.88, 1.18],
    [-0.88, 1.94],
    [0.88, 1.94],
  ];
  for (let i = 0; i < screwPositions.length; i++) {
    display_screws.setMatrixAt(
      i,
      new THREE.Matrix4().compose(
        new THREE.Vector3(screwPositions[i][0], screwPositions[i][1], 0.72),
        horizontalQuat,
        new THREE.Vector3(1, 1, 1)
      )
    );
  }
  display_screws.instanceMatrix.needsUpdate = true;
  display_group.add(display_screws);

  const brand_mark = new THREE.Group();
  brand_mark.name = "brand_mark";
  brand_mark.position.set(0, 1.17, 0.724);
  display_group.add(brand_mark);

  function addBrandStroke(x1, y1, x2, y2) {
    const path = new THREE.LineCurve3(
      new THREE.Vector3(x1, y1, 0),
      new THREE.Vector3(x2, y2, 0)
    );
    const strokeGeom = new THREE.TubeGeometry(path, 1, 0.008, 6, false);
    const stroke = new THREE.Mesh(strokeGeom, brassMat);
    brand_mark.add(stroke);
  }

  const brandSegments = [
    [-0.62, -0.04, -0.62, 0.04],
    [-0.62, 0.04, -0.55, 0.04],
    [-0.59, 0.04, -0.59, -0.04],
    [-0.52, -0.04, -0.48, 0.04],
    [-0.48, 0.04, -0.44, -0.04],
    [-0.44, -0.04, -0.40, 0.04],
    [-0.36, -0.04, -0.36, 0.04],
    [-0.36, 0.04, -0.30, 0.04],
    [-0.30, 0.04, -0.30, -0.04],
    [-0.30, -0.04, -0.24, -0.04],
    [-0.21, -0.04, -0.21, 0.04],
    [-0.21, 0.04, -0.14, -0.04],
    [-0.14, -0.04, -0.14, 0.04],
    [-0.09, -0.04, -0.09, 0.04],
    [-0.09, 0.04, -0.02, 0.04],
    [-0.02, 0.04, -0.02, -0.04],
    [-0.02, -0.04, 0.05, -0.04],
    [0.08, -0.04, 0.08, 0.04],
    [0.08, 0.04, 0.15, 0.04],
    [0.15, 0.04, 0.15, -0.04],
    [0.15, -0.04, 0.08, -0.04],
    [0.19, -0.04, 0.25, 0.04],
    [0.25, 0.04, 0.31, -0.04],
    [0.20, -0.01, 0.30, -0.01],
    [0.35, -0.04, 0.35, 0.04],
    [0.35, 0.04, 0.42, 0.04],
    [0.35, 0.0, 0.40, 0.0],
    [0.35, -0.04, 0.42, -0.04],
    [0.46, -0.04, 0.46, 0.04],
    [0.46, 0.04, 0.53, 0.04],
    [0.46, 0.0, 0.51, 0.0],
    [0.46, -0.04, 0.53, -0.04],
    [0.57, -0.04, 0.57, 0.04],
    [0.57, 0.04, 0.64, 0.04],
    [0.64, 0.04, 0.64, -0.04],
    [0.64, -0.04, 0.57, -0.04],
  ];
  for (const segment of brandSegments) {
    addBrandStroke(segment[0], segment[1], segment[2], segment[3]);
  }

  const keyboard_group = new THREE.Group();
  keyboard_group.name = "keyboard_group";
  root.add(keyboard_group);

  const keyboard_deckGeom = new THREE.BoxGeometry(2.08, 0.1, 0.62);
  const keyboard_deck = new THREE.Mesh(keyboard_deckGeom, darkWoodMat);
  keyboard_deck.name = "keyboard_deck";
  keyboard_deck.position.set(0, 0.82, 0.69);
  keyboard_group.add(keyboard_deck);

  const keyboard_front_railGeom = new THREE.BoxGeometry(2.08, 0.09, 0.08);
  const keyboard_front_rail = new THREE.Mesh(keyboard_front_railGeom, woodMat);
  keyboard_front_rail.name = "keyboard_front_rail";
  keyboard_front_rail.position.set(0, 0.78, 0.99);
  keyboard_group.add(keyboard_front_rail);

  const whiteKeyCount = 12;
  const whiteKeyPitch = 0.158;
  const white_keysGeom = new THREE.BoxGeometry(0.145, 0.055, 0.48);
  const white_keys = new THREE.InstancedMesh(white_keysGeom, brassMat, whiteKeyCount);
  white_keys.name = "white_keys";
  for (let i = 0; i < whiteKeyCount; i++) {
    const x = (i - (whiteKeyCount - 1) / 2) * whiteKeyPitch;
    white_keys.setMatrixAt(i, new THREE.Matrix4().makeTranslation(x, 0.89, 0.72));
  }
  white_keys.instanceMatrix.needsUpdate = true;
  keyboard_group.add(white_keys);

  const blackKeyBoundaries = [1, 2, 4, 5, 6, 8, 9, 11];
  const black_keysGeom = new THREE.BoxGeometry(0.082, 0.075, 0.27);
  const black_keys = new THREE.InstancedMesh(
    black_keysGeom,
    agedBrassMat,
    blackKeyBoundaries.length
  );
  black_keys.name = "black_keys";
  for (let i = 0; i < blackKeyBoundaries.length; i++) {
    const x = -whiteKeyCount * whiteKeyPitch / 2 + blackKeyBoundaries[i] * whiteKeyPitch;
    black_keys.setMatrixAt(i, new THREE.Matrix4().makeTranslation(x, 0.94, 0.59));
  }
  black_keys.instanceMatrix.needsUpdate = true;
  keyboard_group.add(black_keys);

  const control_group = new THREE.Group();
  control_group.name = "control_group";
  root.add(control_group);

  const controlConsoleShape = new THREE.Shape();
  controlConsoleShape.moveTo(-1.03, -0.2);
  controlConsoleShape.lineTo(1.03, -0.2);
  controlConsoleShape.lineTo(0.88, 0.2);
  controlConsoleShape.lineTo(-0.88, 0.2);
  controlConsoleShape.closePath();
  const control_consoleGeom = new THREE.ExtrudeGeometry(controlConsoleShape, {
    depth: 0.34,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.018,
    bevelSize: 0.018,
    bevelSegments: 2,
  });
  const control_console = new THREE.Mesh(control_consoleGeom, woodMat);
  control_console.name = "control_console";
  control_console.position.set(0, 0.54, 0.72);
  control_group.add(control_console);

  const control_knobsGeom = new THREE.CylinderGeometry(0.075, 0.075, 0.09, 20);
  const control_knobs = new THREE.InstancedMesh(control_knobsGeom, brassMat, 4);
  control_knobs.name = "control_knobs";

  const control_knob_collarsGeom = new THREE.TorusGeometry(0.078, 0.012, 8, 20);
  const control_knob_collars = new THREE.InstancedMesh(
    control_knob_collarsGeom,
    agedBrassMat,
    4
  );
  control_knob_collars.name = "control_knob_collars";

  const control_knob_markersGeom = new THREE.BoxGeometry(0.012, 0.04, 0.008);
  const control_knob_markers = new THREE.InstancedMesh(
    control_knob_markersGeom,
    blackMat,
    4
  );
  control_knob_markers.name = "control_knob_markers";

  const knobXs = [0.34, 0.55, 0.76, 0.97];
  for (let i = 0; i < knobXs.length; i++) {
    control_knobs.setMatrixAt(
      i,
      new THREE.Matrix4().compose(
        new THREE.Vector3(knobXs[i], 0.57, 1.075),
        horizontalQuat,
        new THREE.Vector3(1, 1, 1)
      )
    );
    control_knob_collars.setMatrixAt(
      i,
      new THREE.Matrix4().makeTranslation(knobXs[i], 0.57, 1.028)
    );
    control_knob_markers.setMatrixAt(
      i,
      new THREE.Matrix4().makeTranslation(knobXs[i], 0.605, 1.123)
    );
  }
  control_knobs.instanceMatrix.needsUpdate = true;
  control_knob_collars.instanceMatrix.needsUpdate = true;
  control_knob_markers.instanceMatrix.needsUpdate = true;
  control_group.add(control_knob_collars, control_knobs, control_knob_markers);

  const control_nameplateGeom = new THREE.BoxGeometry(0.78, 0.13, 0.018);
  const control_nameplate = new THREE.Mesh(control_nameplateGeom, agedBrassMat);
  control_nameplate.name = "control_nameplate";
  control_nameplate.position.set(-0.08, 0.43, 1.075);
  control_group.add(control_nameplate);

  const nameplate_marksGeom = new THREE.BoxGeometry(1, 1, 1);
  const nameplate_marks = new THREE.InstancedMesh(nameplate_marksGeom, blackMat, 8);
  nameplate_marks.name = "nameplate_marks";
  for (let i = 0; i < 8; i++) {
    const width = i % 3 === 0 ? 0.038 : 0.024;
    const height = i % 2 === 0 ? 0.055 : 0.04;
    nameplate_marks.setMatrixAt(
      i,
      new THREE.Matrix4().compose(
        new THREE.Vector3(-0.34 + i * 0.075, 0.43, 1.087),
        identityQuat,
        new THREE.Vector3(width, height, 0.006)
      )
    );
  }
  nameplate_marks.instanceMatrix.needsUpdate = true;
  control_group.add(nameplate_marks);

  const power_socketGeom = new THREE.CylinderGeometry(0.065, 0.065, 0.035, 18);
  const power_socket = new THREE.Mesh(power_socketGeom, blackMat);
  power_socket.name = "power_socket";
  power_socket.rotation.x = Math.PI / 2;
  power_socket.position.set(1.0, 0.47, 1.075);
  control_group.add(power_socket);

  const power_socket_centerGeom = new THREE.CylinderGeometry(0.026, 0.026, 0.042, 14);
  const power_socket_center = new THREE.Mesh(power_socket_centerGeom, darkMetalMat);
  power_socket_center.name = "power_socket_center";
  power_socket_center.rotation.x = Math.PI / 2;
  power_socket_center.position.set(1.0, 0.47, 1.095);
  control_group.add(power_socket_center);

  const feetGeom = new THREE.CylinderGeometry(0.09, 0.1, 0.08, 16);
  const feet = new THREE.InstancedMesh(feetGeom, blackMat, 4);
  feet.name = "feet";
  const footPositions = [
    [-0.95, -0.02, 0.42],
    [0.95, -0.02, 0.42],
    [-0.95, -0.02, -0.42],
    [0.95, -0.02, -0.42],
  ];
  for (let i = 0; i < footPositions.length; i++) {
    feet.setMatrixAt(
      i,
      new THREE.Matrix4().makeTranslation(
        footPositions[i][0],
        footPositions[i][1],
        footPositions[i][2]
      )
    );
  }
  feet.instanceMatrix.needsUpdate = true;
  root.add(feet);

  const front_wood_grainGeom = new THREE.BoxGeometry(1, 1, 1);
  const front_wood_grain = new THREE.InstancedMesh(front_wood_grainGeom, grainMat, 18);
  front_wood_grain.name = "front_wood_grain";
  for (let i = 0; i < 18; i++) {
    const row = Math.floor(i / 6);
    const col = i % 6;
    const x = -0.92 + col * 0.36 + row * 0.025;
    const y = 0.13 + row * 0.14 + (col % 2) * 0.018;
    const length = 0.11 + (i % 4) * 0.045;
    front_wood_grain.setMatrixAt(
      i,
      new THREE.Matrix4().compose(
        new THREE.Vector3(x, y, 1.071),
        identityQuat,
        new THREE.Vector3(length, 0.007, 0.006)
      )
    );
  }
  front_wood_grain.instanceMatrix.needsUpdate = true;
  root.add(front_wood_grain);

  const side_wood_grainGeom = new THREE.BoxGeometry(1, 1, 1);
  const side_wood_grain = new THREE.InstancedMesh(side_wood_grainGeom, grainMat, 24);
  side_wood_grain.name = "side_wood_grain";
  let sideGrainIndex = 0;
  for (const side of [-1, 1]) {
    for (let i = 0; i < 12; i++) {
      const z = -0.45 + (i % 6) * 0.18;
      const y = 0.25 + Math.floor(i / 6) * 0.82 + (i % 3) * 0.08;
      const height = 0.16 + (i % 4) * 0.055;
      side_wood_grain.setMatrixAt(
        sideGrainIndex++,
        new THREE.Matrix4().compose(
          new THREE.Vector3(side * 1.247, y, z),
          identityQuat,
          new THREE.Vector3(0.007, height, 0.012)
        )
      );
    }
  }
  side_wood_grain.instanceMatrix.needsUpdate = true;
  root.add(side_wood_grain);

  const top_wood_grainGeom = new THREE.BoxGeometry(1, 1, 1);
  const top_wood_grain = new THREE.InstancedMesh(top_wood_grainGeom, grainMat, 14);
  top_wood_grain.name = "top_wood_grain";
  for (let i = 0; i < 14; i++) {
    const x = -0.88 + (i % 7) * 0.29;
    const z = -0.39 + Math.floor(i / 7) * 0.62 + (i % 2) * 0.04;
    const length = 0.22 + (i % 3) * 0.08;
    top_wood_grain.setMatrixAt(
      i,
      new THREE.Matrix4().compose(
        new THREE.Vector3(x, 2.251, z),
        identityQuat,
        new THREE.Vector3(length, 0.005, 0.012)
      )
    );
  }
  top_wood_grain.instanceMatrix.needsUpdate = true;
  root.add(top_wood_grain);

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