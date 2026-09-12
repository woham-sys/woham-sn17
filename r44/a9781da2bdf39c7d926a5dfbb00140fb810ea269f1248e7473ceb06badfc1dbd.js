// miner-diag: gpus=? tflops=? stream48=? power=? probe_tps=3831 cpu_quota=?/? net=? batch=4 wall=1389 seed=870128282
export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "vintage_box_truck";

  const body_group = new THREE.Group();
  body_group.name = "body_group";
  const cab_group = new THREE.Group();
  cab_group.name = "cab_group";
  const wheel_group = new THREE.Group();
  wheel_group.name = "wheel_group";
  const detail_group = new THREE.Group();
  detail_group.name = "detail_group";
  root.add(body_group, cab_group, wheel_group, detail_group);

  const bodyMat = new THREE.MeshStandardMaterial({
    color: 0xffd900,
    metalness: 0.0,
    roughness: 0.3
  });
  const bodyShadowMat = new THREE.MeshStandardMaterial({
    color: 0xe6c400,
    metalness: 0.0,
    roughness: 0.3
  });
  const redStripeMat = new THREE.MeshStandardMaterial({
    color: 0xd20b18,
    metalness: 0.0,
    roughness: 0.3
  });
  const whiteStripeMat = new THREE.MeshStandardMaterial({
    color: 0xf2f2ed,
    metalness: 0.0,
    roughness: 0.3
  });
  const rubberMat = new THREE.MeshStandardMaterial({
    color: 0x17191b,
    metalness: 0.0,
    roughness: 0.8
  });
  const darkMat = new THREE.MeshStandardMaterial({
    color: 0x202326,
    metalness: 0.0,
    roughness: 0.8
  });
  const glassMat = new THREE.MeshStandardMaterial({
    color: 0x172329,
    metalness: 0.0,
    roughness: 0.3,
    side: THREE.DoubleSide
  });
  const silverMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25
  });
  const chromeMat = new THREE.MeshStandardMaterial({
    color: 0xd4d4d4,
    metalness: 0.6,
    roughness: 0.2
  });
  const headlightMat = new THREE.MeshStandardMaterial({
    color: 0xfff4c8,
    metalness: 0.0,
    roughness: 0.3,
    emissive: 0xfff4c8,
    emissiveIntensity: 1.0
  });
  const amberMat = new THREE.MeshStandardMaterial({
    color: 0xff8c18,
    metalness: 0.0,
    roughness: 0.3,
    emissive: 0xff8c18,
    emissiveIntensity: 1.0
  });
  const tailLightMat = new THREE.MeshStandardMaterial({
    color: 0xc91420,
    metalness: 0.0,
    roughness: 0.3,
    emissive: 0xc91420,
    emissiveIntensity: 1.0
  });

  const dummy = new THREE.Object3D();

  function setInstance(mesh, index, x, y, z, rx, ry, rz, sx, sy, sz) {
    dummy.position.set(x, y, z);
    dummy.rotation.set(rx || 0, ry || 0, rz || 0);
    dummy.scale.set(
      sx === undefined ? 1 : sx,
      sy === undefined ? 1 : sy,
      sz === undefined ? 1 : sz
    );
    dummy.updateMatrix();
    mesh.setMatrixAt(index, dummy.matrix);
  }

  function addSidePair(group, geometry, material, x, y, z, name) {
    for (const side of [-1, 1]) {
      const mesh = new THREE.Mesh(geometry, material);
      mesh.name = name + (side < 0 ? "_left" : "_right");
      mesh.position.set(side * x, y, z);
      mesh.rotation.y = side < 0 ? -Math.PI / 2 : Math.PI / 2;
      if (side > 0) mesh.scale.x = -1;
      group.add(mesh);
    }
  }

  const cargoW = 1.42;
  const cargoL = 2.35;
  const cargoH = 1.28;
  const cargoZ = -0.82;
  const cargoBottom = 0.61;
  const cargoTop = cargoBottom + cargoH;
  const cabW = 1.34;
  const wheelR = 0.42;
  const wheelY = 0.42;
  const wheelX = 0.75;
  const frontAxleZ = 1.08;
  const rearAxleZ = -1.18;

  const cargo_bodyGeom = new THREE.BoxGeometry(cargoW, cargoH, cargoL);
  const cargo_body = new THREE.Mesh(cargo_bodyGeom, bodyMat);
  cargo_body.name = "cargo_body";
  cargo_body.position.set(0, cargoBottom + cargoH / 2, cargoZ);
  body_group.add(cargo_body);

  const cargo_roofGeom = new THREE.BoxGeometry(cargoW + 0.12, 0.10, cargoL + 0.10);
  const cargo_roof = new THREE.Mesh(cargo_roofGeom, bodyMat);
  cargo_roof.name = "cargo_roof";
  cargo_roof.position.set(0, cargoTop + 0.05, cargoZ);
  body_group.add(cargo_roof);

  const cargo_top_railsGeom = new THREE.BoxGeometry(0.06, 0.06, cargoL + 0.08);
  const cargo_top_rails = new THREE.InstancedMesh(cargo_top_railsGeom, bodyShadowMat, 2);
  cargo_top_rails.name = "cargo_top_rails";
  setInstance(cargo_top_rails, 0, -cargoW / 2 - 0.025, cargoTop + 0.025, cargoZ, 0, 0, 0);
  setInstance(cargo_top_rails, 1, cargoW / 2 + 0.025, cargoTop + 0.025, cargoZ, 0, 0, 0);
  cargo_top_rails.instanceMatrix.needsUpdate = true;
  body_group.add(cargo_top_rails);

  const cargo_lower_railsGeom = new THREE.BoxGeometry(0.055, 0.075, cargoL - 0.04);
  const cargo_lower_rails = new THREE.InstancedMesh(cargo_lower_railsGeom, bodyShadowMat, 2);
  cargo_lower_rails.name = "cargo_lower_rails";
  setInstance(cargo_lower_rails, 0, -cargoW / 2 - 0.022, cargoBottom + 0.035, cargoZ, 0, 0, 0);
  setInstance(cargo_lower_rails, 1, cargoW / 2 + 0.022, cargoBottom + 0.035, cargoZ, 0, 0, 0);
  cargo_lower_rails.instanceMatrix.needsUpdate = true;
  body_group.add(cargo_lower_rails);

  const cargo_corner_postsGeom = new THREE.BoxGeometry(0.06, cargoH + 0.04, 0.06);
  const cargo_corner_posts = new THREE.InstancedMesh(cargo_corner_postsGeom, bodyShadowMat, 4);
  cargo_corner_posts.name = "cargo_corner_posts";
  let cornerIndex = 0;
  for (const side of [-1, 1]) {
    for (const z of [cargoZ - cargoL / 2, cargoZ + cargoL / 2]) {
      setInstance(cargo_corner_posts, cornerIndex++, side * (cargoW / 2 + 0.025), cargoBottom + cargoH / 2, z, 0, 0, 0);
    }
  }
  cargo_corner_posts.instanceMatrix.needsUpdate = true;
  body_group.add(cargo_corner_posts);

  const cargo_red_stripesGeom = new THREE.BoxGeometry(0.018, 0.14, cargoL - 0.10);
  const cargo_red_stripes = new THREE.InstancedMesh(cargo_red_stripesGeom, redStripeMat, 4);
  cargo_red_stripes.name = "cargo_red_stripes";
  let redStripeIndex = 0;
  for (const side of [-1, 1]) {
    for (const y of [1.56, 1.19]) {
      setInstance(cargo_red_stripes, redStripeIndex++, side * (cargoW / 2 + 0.012), y, cargoZ, 0, 0, 0);
    }
  }
  cargo_red_stripes.instanceMatrix.needsUpdate = true;
  body_group.add(cargo_red_stripes);

  const cargo_white_stripesGeom = new THREE.BoxGeometry(0.019, 0.13, cargoL - 0.10);
  const cargo_white_stripes = new THREE.InstancedMesh(cargo_white_stripesGeom, whiteStripeMat, 4);
  cargo_white_stripes.name = "cargo_white_stripes";
  let whiteStripeIndex = 0;
  for (const side of [-1, 1]) {
    for (const y of [1.375, 0.995]) {
      setInstance(cargo_white_stripes, whiteStripeIndex++, side * (cargoW / 2 + 0.013), y, cargoZ, 0, 0, 0);
    }
  }
  cargo_white_stripes.instanceMatrix.needsUpdate = true;
  body_group.add(cargo_white_stripes);

  const cargo_ribsGeom = new THREE.BoxGeometry(0.022, 0.018, cargoL - 0.16);
  const cargo_ribs = new THREE.InstancedMesh(cargo_ribsGeom, bodyShadowMat, 10);
  cargo_ribs.name = "cargo_ribs";
  let ribIndex = 0;
  for (const side of [-1, 1]) {
    for (let i = 0; i < 5; i++) {
      setInstance(cargo_ribs, ribIndex++, side * (cargoW / 2 + 0.014), 0.73 + i * 0.045, cargoZ, 0, 0, 0);
    }
  }
  cargo_ribs.instanceMatrix.needsUpdate = true;
  body_group.add(cargo_ribs);

  const rear_door_seamsGeom = new THREE.BoxGeometry(0.022, cargoH - 0.12, 0.018);
  const rear_door_seams = new THREE.InstancedMesh(rear_door_seamsGeom, bodyShadowMat, 2);
  rear_door_seams.name = "rear_door_seams";
  setInstance(rear_door_seams, 0, -cargoW / 2 - 0.014, cargoBottom + cargoH / 2, cargoZ - cargoL / 2 - 0.012, 0, 0, 0);
  setInstance(rear_door_seams, 1, cargoW / 2 + 0.014, cargoBottom + cargoH / 2, cargoZ - cargoL / 2 - 0.012, 0, 0, 0);
  rear_door_seams.instanceMatrix.needsUpdate = true;
  body_group.add(rear_door_seams);

  const cabShape = new THREE.Shape();
  cabShape.moveTo(0.55, 0.48);
  cabShape.lineTo(0.55, 1.78);
  cabShape.bezierCurveTo(0.55, 1.91, 0.66, 1.98, 0.82, 1.99);
  cabShape.lineTo(1.18, 1.99);
  cabShape.bezierCurveTo(1.30, 1.98, 1.38, 1.90, 1.44, 1.78);
  cabShape.lineTo(1.67, 1.34);
  cabShape.lineTo(1.82, 1.25);
  cabShape.lineTo(2.00, 1.14);
  cabShape.lineTo(2.08, 0.98);
  cabShape.lineTo(2.08, 0.52);
  cabShape.lineTo(1.92, 0.48);
  cabShape.closePath();

  const cab_bodyGeom = new THREE.ExtrudeGeometry(cabShape, {
    depth: cabW,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.025,
    bevelSize: 0.025,
    bevelSegments: 2
  });
  const cab_body = new THREE.Mesh(cab_bodyGeom, bodyMat);
  cab_body.name = "cab_body";
  cab_body.rotation.y = -Math.PI / 2;
  cab_body.position.x = cabW / 2;
  cab_group.add(cab_body);

  const cab_roofGeom = new THREE.BoxGeometry(cabW + 0.08, 0.10, 0.78);
  const cab_roof = new THREE.Mesh(cab_roofGeom, bodyMat);
  cab_roof.name = "cab_roof";
  cab_roof.position.set(0, 1.985, 0.96);
  cab_group.add(cab_roof);

  const hoodGeom = new THREE.BoxGeometry(cabW - 0.04, 0.13, 0.55);
  const hood = new THREE.Mesh(hoodGeom, bodyMat);
  hood.name = "hood";
  hood.position.set(0, 1.20, 1.78);
  hood.rotation.x = 0.14;
  cab_group.add(hood);

  const hood_center_ridgeGeom = new THREE.BoxGeometry(0.045, 0.025, 0.48);
  const hood_center_ridge = new THREE.Mesh(hood_center_ridgeGeom, bodyShadowMat);
  hood_center_ridge.name = "hood_center_ridge";
  hood_center_ridge.position.set(0, 1.275, 1.77);
  hood_center_ridge.rotation.x = 0.14;
  cab_group.add(hood_center_ridge);

  const side_window_framesGeom = new THREE.BoxGeometry(0.026, 0.59, 0.68);
  const side_window_frames = new THREE.InstancedMesh(side_window_framesGeom, darkMat, 2);
  side_window_frames.name = "side_window_frames";
  setInstance(side_window_frames, 0, -cabW / 2 - 0.012, 1.61, 1.00, 0, 0, 0);
  setInstance(side_window_frames, 1, cabW / 2 + 0.012, 1.61, 1.00, 0, 0, 0);
  side_window_frames.instanceMatrix.needsUpdate = true;
  cab_group.add(side_window_frames);

  const side_windowsGeom = new THREE.BoxGeometry(0.018, 0.49, 0.58);
  const side_windows = new THREE.InstancedMesh(side_windowsGeom, glassMat, 2);
  side_windows.name = "side_windows";
  setInstance(side_windows, 0, -cabW / 2 - 0.030, 1.61, 1.00, 0, 0, 0);
  setInstance(side_windows, 1, cabW / 2 + 0.030, 1.61, 1.00, 0, 0, 0);
  side_windows.instanceMatrix.needsUpdate = true;
  cab_group.add(side_windows);

  const windshield_frameGeom = new THREE.BoxGeometry(cabW - 0.12, 0.61, 0.030);
  const windshield_frame = new THREE.Mesh(windshield_frameGeom, darkMat);
  windshield_frame.name = "windshield_frame";
  windshield_frame.position.set(0, 1.61, 1.505);
  windshield_frame.rotation.x = -0.48;
  cab_group.add(windshield_frame);

  const windshieldGeom = new THREE.BoxGeometry(cabW - 0.22, 0.51, 0.018);
  const windshield = new THREE.Mesh(windshieldGeom, glassMat);
  windshield.name = "windshield";
  windshield.position.set(0, 1.617, 1.522);
  windshield.rotation.x = -0.48;
  cab_group.add(windshield);

  const windshield_dividerGeom = new THREE.BoxGeometry(0.026, 0.53, 0.024);
  const windshield_divider = new THREE.Mesh(windshield_dividerGeom, darkMat);
  windshield_divider.name = "windshield_divider";
  windshield_divider.position.set(0, 1.617, 1.535);
  windshield_divider.rotation.x = -0.48;
  cab_group.add(windshield_divider);

  const door_seamsGeom = new THREE.BoxGeometry(0.020, 0.68, 0.018);
  const door_seams = new THREE.InstancedMesh(door_seamsGeom, darkMat, 4);
  door_seams.name = "door_seams";
  let doorSeamIndex = 0;
  for (const side of [-1, 1]) {
    for (const z of [0.61, 1.39]) {
      setInstance(door_seams, doorSeamIndex++, side * (cabW / 2 + 0.026), 0.91, z, 0, 0, 0);
    }
  }
  door_seams.instanceMatrix.needsUpdate = true;
  cab_group.add(door_seams);

  const door_handlesGeom = new THREE.BoxGeometry(0.035, 0.055, 0.17);
  const door_handles = new THREE.InstancedMesh(door_handlesGeom, darkMat, 2);
  door_handles.name = "door_handles";
  setInstance(door_handles, 0, -cabW / 2 - 0.043, 1.17, 0.72, 0, 0, 0);
  setInstance(door_handles, 1, cabW / 2 + 0.043, 1.17, 0.72, 0, 0, 0);
  door_handles.instanceMatrix.needsUpdate = true;
  cab_group.add(door_handles);

  const side_stepsGeom = new THREE.BoxGeometry(0.20, 0.10, 0.68);
  const side_steps = new THREE.InstancedMesh(side_stepsGeom, darkMat, 2);
  side_steps.name = "side_steps";
  setInstance(side_steps, 0, -cabW / 2 - 0.10, 0.43, 0.91, 0, 0, 0);
  setInstance(side_steps, 1, cabW / 2 + 0.10, 0.43, 0.91, 0, 0, 0);
  side_steps.instanceMatrix.needsUpdate = true;
  cab_group.add(side_steps);

  const step_treadsGeom = new THREE.BoxGeometry(0.17, 0.018, 0.56);
  const step_treads = new THREE.InstancedMesh(step_treadsGeom, rubberMat, 2);
  step_treads.name = "step_treads";
  setInstance(step_treads, 0, -cabW / 2 - 0.10, 0.487, 0.91, 0, 0, 0);
  setInstance(step_treads, 1, cabW / 2 + 0.10, 0.487, 0.91, 0, 0, 0);
  step_treads.instanceMatrix.needsUpdate = true;
  cab_group.add(step_treads);

  const mirror_stemsGeom = new THREE.CylinderGeometry(0.018, 0.018, 0.22, 8);
  const mirror_stems = new THREE.InstancedMesh(mirror_stemsGeom, darkMat, 2);
  mirror_stems.name = "mirror_stems";
  setInstance(mirror_stems, 0, -0.80, 1.48, 1.38, 0, 0, Math.PI / 2);
  setInstance(mirror_stems, 1, 0.80, 1.48, 1.38, 0, 0, Math.PI / 2);
  mirror_stems.instanceMatrix.needsUpdate = true;
  cab_group.add(mirror_stems);

  const side_mirrorsGeom = new THREE.BoxGeometry(0.075, 0.22, 0.14);
  const side_mirrors = new THREE.InstancedMesh(side_mirrorsGeom, darkMat, 2);
  side_mirrors.name = "side_mirrors";
  setInstance(side_mirrors, 0, -0.92, 1.48, 1.38, 0, 0, 0);
  setInstance(side_mirrors, 1, 0.92, 1.48, 1.38, 0, 0, 0);
  side_mirrors.instanceMatrix.needsUpdate = true;
  cab_group.add(side_mirrors);

  const mirror_glassGeom = new THREE.BoxGeometry(0.012, 0.17, 0.105);
  const mirror_glass = new THREE.InstancedMesh(mirror_glassGeom, silverMat, 2);
  mirror_glass.name = "mirror_glass";
  setInstance(mirror_glass, 0, -0.962, 1.48, 1.38, 0, 0, 0);
  setInstance(mirror_glass, 1, 0.962, 1.48, 1.38, 0, 0, 0);
  mirror_glass.instanceMatrix.needsUpdate = true;
  cab_group.add(mirror_glass);

  const windshield_wipers = new THREE.Group();
  windshield_wipers.name = "windshield_wipers";
  for (const x of [-0.27, 0.27]) {
    const p1 = new THREE.Vector3(x, 1.39, 1.625);
    const p2 = new THREE.Vector3(x * 0.72, 1.57, 1.555);
    const wiperGeom = new THREE.TubeGeometry(new THREE.LineCurve3(p1, p2), 1, 0.012, 6, false);
    const wiper = new THREE.Mesh(wiperGeom, darkMat);
    windshield_wipers.add(wiper);
  }
  cab_group.add(windshield_wipers);

  const chassisGeom = new THREE.BoxGeometry(1.08, 0.16, 3.35);
  const chassis = new THREE.Mesh(chassisGeom, darkMat);
  chassis.name = "chassis";
  chassis.position.set(0, 0.50, 0.12);
  body_group.add(chassis);

  const underbody_toolboxGeom = new THREE.BoxGeometry(1.20, 0.43, 0.78);
  const underbody_toolbox = new THREE.Mesh(underbody_toolboxGeom, bodyMat);
  underbody_toolbox.name = "underbody_toolbox";
  underbody_toolbox.position.set(0, 0.55, -0.05);
  body_group.add(underbody_toolbox);

  const toolbox_latchesGeom = new THREE.BoxGeometry(0.025, 0.09, 0.10);
  const toolbox_latches = new THREE.InstancedMesh(toolbox_latchesGeom, darkMat, 2);
  toolbox_latches.name = "toolbox_latches";
  setInstance(toolbox_latches, 0, -0.615, 0.60, -0.05, 0, 0, 0);
  setInstance(toolbox_latches, 1, 0.615, 0.60, -0.05, 0, 0, 0);
  toolbox_latches.instanceMatrix.needsUpdate = true;
  body_group.add(toolbox_latches);

  const rear_mud_flapsGeom = new THREE.BoxGeometry(0.07, 0.34, 0.18);
  const rear_mud_flaps = new THREE.InstancedMesh(rear_mud_flapsGeom, rubberMat, 2);
  rear_mud_flaps.name = "rear_mud_flaps";
  setInstance(rear_mud_flaps, 0, -0.68, 0.29, rearAxleZ - 0.48, 0, 0, 0);
  setInstance(rear_mud_flaps, 1, 0.68, 0.29, rearAxleZ - 0.48, 0, 0, 0);
  rear_mud_flaps.instanceMatrix.needsUpdate = true;
  body_group.add(rear_mud_flaps);

  const rear_bumperGeom = new THREE.BoxGeometry(1.52, 0.16, 0.16);
  const rear_bumper = new THREE.Mesh(rear_bumperGeom, darkMat);
  rear_bumper.name = "rear_bumper";
  rear_bumper.position.set(0, 0.43, -2.08);
  body_group.add(rear_bumper);

  const front_bumperGeom = new THREE.BoxGeometry(1.52, 0.18, 0.17);
  const front_bumper = new THREE.Mesh(front_bumperGeom, chromeMat);
  front_bumper.name = "front_bumper";
  front_bumper.position.set(0, 0.43, 2.16);
  cab_group.add(front_bumper);

  const front_grilleGeom = new THREE.BoxGeometry(0.78, 0.34, 0.035);
  const front_grille = new THREE.Mesh(front_grilleGeom, darkMat);
  front_grille.name = "front_grille";
  front_grille.position.set(0, 0.82, 2.095);
  cab_group.add(front_grille);

  const grille_slatsGeom = new THREE.BoxGeometry(0.68, 0.025, 0.020);
  const grille_slats = new THREE.InstancedMesh(grille_slatsGeom, chromeMat, 5);
  grille_slats.name = "grille_slats";
  for (let i = 0; i < 5; i++) {
    setInstance(grille_slats, i, 0, 0.70 + i * 0.06, 2.12, 0, 0, 0);
  }
  grille_slats.instanceMatrix.needsUpdate = true;
  cab_group.add(grille_slats);

  const headlight_rimsGeom = new THREE.CylinderGeometry(0.12, 0.12, 0.045, 20);
  const headlight_rims = new THREE.InstancedMesh(headlight_rimsGeom, chromeMat, 2);
  headlight_rims.name = "headlight_rims";
  setInstance(headlight_rims, 0, -0.49, 1.00, 2.105, Math.PI / 2, 0, 0);
  setInstance(headlight_rims, 1, 0.49, 1.00, 2.105, Math.PI / 2, 0, 0);
  headlight_rims.instanceMatrix.needsUpdate = true;
  cab_group.add(headlight_rims);

  const headlightsGeom = new THREE.CylinderGeometry(0.095, 0.095, 0.052, 20);
  const headlights = new THREE.InstancedMesh(headlightsGeom, headlightMat, 2);
  headlights.name = "headlights";
  setInstance(headlights, 0, -0.49, 1.00, 2.135, Math.PI / 2, 0, 0);
  setInstance(headlights, 1, 0.49, 1.00, 2.135, Math.PI / 2, 0, 0);
  headlights.instanceMatrix.needsUpdate = true;
  cab_group.add(headlights);

  const side_markersGeom = new THREE.BoxGeometry(0.025, 0.075, 0.16);
  const side_markers = new THREE.InstancedMesh(side_markersGeom, amberMat, 2);
  side_markers.name = "side_markers";
  setInstance(side_markers, 0, -cabW / 2 - 0.035, 1.16, 1.70, 0, 0, 0);
  setInstance(side_markers, 1, cabW / 2 + 0.035, 1.16, 1.70, 0, 0, 0);
  side_markers.instanceMatrix.needsUpdate = true;
  cab_group.add(side_markers);

  const hood_ventsGeom = new THREE.BoxGeometry(0.022, 0.022, 0.18);
  const hood_vents = new THREE.InstancedMesh(hood_ventsGeom, darkMat, 6);
  hood_vents.name = "hood_vents";
  let ventIndex = 0;
  for (const side of [-1, 1]) {
    for (let i = 0; i < 3; i++) {
      setInstance(hood_vents, ventIndex++, side * (cabW / 2 + 0.027), 1.02 + i * 0.055, 1.77, 0, 0, 0);
    }
  }
  hood_vents.instanceMatrix.needsUpdate = true;
  cab_group.add(hood_vents);

  const rear_lightsGeom = new THREE.BoxGeometry(0.16, 0.13, 0.035);
  const rear_lights = new THREE.InstancedMesh(rear_lightsGeom, tailLightMat, 2);
  rear_lights.name = "rear_lights";
  setInstance(rear_lights, 0, -0.52, 0.78, -2.005, 0, 0, 0);
  setInstance(rear_lights, 1, 0.52, 0.78, -2.005, 0, 0, 0);
  rear_lights.instanceMatrix.needsUpdate = true;
  body_group.add(rear_lights);

  const wheelPositions = [
    [-wheelX, frontAxleZ],
    [wheelX, frontAxleZ],
    [-wheelX, rearAxleZ],
    [wheelX, rearAxleZ]
  ];

  const wheel_tiresGeom = new THREE.TorusGeometry(wheelR - 0.11, 0.11, 12, 32);
  const wheel_tires = new THREE.InstancedMesh(wheel_tiresGeom, rubberMat, 4);
  wheel_tires.name = "wheel_tires";
  for (let i = 0; i < wheelPositions.length; i++) {
    setInstance(wheel_tires, i, wheelPositions[i][0], wheelY, wheelPositions[i][1], 0, Math.PI / 2, 0);
  }
  wheel_tires.instanceMatrix.needsUpdate = true;
  wheel_group.add(wheel_tires);

  const wheel_treadsGeom = new THREE.BoxGeometry(0.23, 0.045, 0.085);
  const treadCount = 14;
  const wheel_treads = new THREE.InstancedMesh(wheel_treadsGeom, rubberMat, treadCount * 4);
  wheel_treads.name = "wheel_treads";
  let treadIndex = 0;
  for (const wheel of wheelPositions) {
    for (let i = 0; i < treadCount; i++) {
      const angle = i / treadCount * Math.PI * 2;
      setInstance(
        wheel_treads,
        treadIndex++,
        wheel[0],
        wheelY + Math.cos(angle) * 0.405,
        wheel[1] + Math.sin(angle) * 0.405,
        angle,
        0,
        0
      );
    }
  }
  wheel_treads.instanceMatrix.needsUpdate = true;
  wheel_group.add(wheel_treads);

  const wheel_rimsGeom = new THREE.CylinderGeometry(0.235, 0.235, 0.17, 24);
  const wheel_rims = new THREE.InstancedMesh(wheel_rimsGeom, silverMat, 4);
  wheel_rims.name = "wheel_rims";
  for (let i = 0; i < wheelPositions.length; i++) {
    setInstance(wheel_rims, i, wheelPositions[i][0], wheelY, wheelPositions[i][1], 0, 0, Math.PI / 2);
  }
  wheel_rims.instanceMatrix.needsUpdate = true;
  wheel_group.add(wheel_rims);

  const wheel_trim_ringsGeom = new THREE.TorusGeometry(0.185, 0.024, 8, 24);
  const wheel_trim_rings = new THREE.InstancedMesh(wheel_trim_ringsGeom, chromeMat, 4);
  wheel_trim_rings.name = "wheel_trim_rings";
  for (let i = 0; i < wheelPositions.length; i++) {
    const side = wheelPositions[i][0] < 0 ? -1 : 1;
    setInstance(
      wheel_trim_rings,
      i,
      side * (wheelX + 0.105),
      wheelY,
      wheelPositions[i][1],
      0,
      Math.PI / 2,
      0
    );
  }
  wheel_trim_rings.instanceMatrix.needsUpdate = true;
  wheel_group.add(wheel_trim_rings);

  const wheel_hubsGeom = new THREE.CylinderGeometry(0.095, 0.095, 0.20, 18);
  const wheel_hubs = new THREE.InstancedMesh(wheel_hubsGeom, chromeMat, 4);
  wheel_hubs.name = "wheel_hubs";
  for (let i = 0; i < wheelPositions.length; i++) {
    setInstance(wheel_hubs, i, wheelPositions[i][0], wheelY, wheelPositions[i][1], 0, 0, Math.PI / 2);
  }
  wheel_hubs.instanceMatrix.needsUpdate = true;
  wheel_group.add(wheel_hubs);

  const wheel_lugsGeom = new THREE.CylinderGeometry(0.022, 0.022, 0.035, 10);
  const wheel_lugs = new THREE.InstancedMesh(wheel_lugsGeom, darkMat, 20);
  wheel_lugs.name = "wheel_lugs";
  let lugIndex = 0;
  for (const wheel of wheelPositions) {
    const side = wheel[0] < 0 ? -1 : 1;
    for (let i = 0; i < 5; i++) {
      const angle = i / 5 * Math.PI * 2;
      setInstance(
        wheel_lugs,
        lugIndex++,
        side * (wheelX + 0.115),
        wheelY + Math.cos(angle) * 0.125,
        wheel[1] + Math.sin(angle) * 0.125,
        0,
        0,
        Math.PI / 2
      );
    }
  }
  wheel_lugs.instanceMatrix.needsUpdate = true;
  wheel_group.add(wheel_lugs);

  const wheel_archesGeom = new THREE.TorusGeometry(0.47, 0.065, 8, 28, Math.PI);
  const wheel_arches = new THREE.InstancedMesh(wheel_archesGeom, bodyMat, 4);
  wheel_arches.name = "wheel_arches";
  for (let i = 0; i < wheelPositions.length; i++) {
    const side = wheelPositions[i][0] < 0 ? -1 : 1;
    setInstance(
      wheel_arches,
      i,
      side * (cabW / 2 + 0.035),
      wheelY,
      wheelPositions[i][1],
      0,
      Math.PI / 2,
      0
    );
  }
  wheel_arches.instanceMatrix.needsUpdate = true;
  wheel_group.add(wheel_arches);

  const rear_fender_panelsGeom = new THREE.BoxGeometry(0.055, 0.18, 0.78);
  const rear_fender_panels = new THREE.InstancedMesh(rear_fender_panelsGeom, bodyMat, 2);
  rear_fender_panels.name = "rear_fender_panels";
  setInstance(rear_fender_panels, 0, -cargoW / 2 - 0.035, 0.68, rearAxleZ, 0, 0, 0);
  setInstance(rear_fender_panels, 1, cargoW / 2 + 0.035, 0.68, rearAxleZ, 0, 0, 0);
  rear_fender_panels.instanceMatrix.needsUpdate = true;
  wheel_group.add(rear_fender_panels);

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