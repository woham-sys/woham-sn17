function __sn17_user(THREE) {
  const root = new THREE.Group();
  root.name = "airliner";

  const aircraft_group = new THREE.Group();
  aircraft_group.name = "aircraft_group";
  root.add(aircraft_group);

  const fuselageMat = new THREE.MeshStandardMaterial({ color: "#f4f4ef", metalness: 0.0, roughness: 0.3 });
  const wingMat = new THREE.MeshStandardMaterial({ color: "#d8d9d5", metalness: 0.0, roughness: 0.45 });
  const tailMat = new THREE.MeshStandardMaterial({ color: "#b8c8cf", metalness: 0.0, roughness: 0.4 });
  const seamMat = new THREE.MeshStandardMaterial({ color: "#777b7c", metalness: 0.0, roughness: 0.7 });
  const windowMat = new THREE.MeshStandardMaterial({ color: "#26343d", metalness: 0.0, roughness: 0.25 });
  const engineMat = new THREE.MeshStandardMaterial({ color: "#d1d3d2", metalness: 0.0, roughness: 0.4 });
  const engineInteriorMat = new THREE.MeshStandardMaterial({ color: "#111416", metalness: 0.0, roughness: 0.85 });
  const fanMat = new THREE.MeshStandardMaterial({ color: "#3b4144", metalness: 0.2, roughness: 0.55 });
  const logoMat = new THREE.MeshStandardMaterial({ color: "#d94336", metalness: 0.0, roughness: 0.55, side: THREE.DoubleSide });
  const darkRedLogoMat = new THREE.MeshStandardMaterial({ color: "#8f2a2d", metalness: 0.0, roughness: 0.6, side: THREE.DoubleSide });
  const gearMat = new THREE.MeshStandardMaterial({ color: "#202326", metalness: 0.25, roughness: 0.65 });
  const strutMat = new THREE.MeshStandardMaterial({ color: "#8a8d8e", metalness: 0.35, roughness: 0.5 });
  const markingMat = new THREE.MeshStandardMaterial({ color: "#5f6466", metalness: 0.0, roughness: 0.75 });

  const fuselageProfile = [
    new THREE.Vector2(0.00, -4.55),
    new THREE.Vector2(0.13, -4.45),
    new THREE.Vector2(0.28, -4.22),
    new THREE.Vector2(0.38, -3.85),
    new THREE.Vector2(0.43, -3.25),
    new THREE.Vector2(0.43, 2.85),
    new THREE.Vector2(0.41, 3.35),
    new THREE.Vector2(0.35, 3.75),
    new THREE.Vector2(0.24, 4.08),
    new THREE.Vector2(0.10, 4.30),
    new THREE.Vector2(0.00, 4.38)
  ];
  const fuselageGeom = new THREE.LatheGeometry(fuselageProfile, 64);
  const fuselage = new THREE.Mesh(fuselageGeom, fuselageMat);
  fuselage.name = "fuselage";
  fuselage.rotation.x = Math.PI / 2;
  aircraft_group.add(fuselage);

  const main_wingShape = new THREE.Shape();
  main_wingShape.moveTo(-0.42, -0.72);
  main_wingShape.lineTo(-3.45, -1.55);
  main_wingShape.lineTo(-3.62, -1.34);
  main_wingShape.lineTo(-0.55, 0.55);
  main_wingShape.lineTo(0.55, 0.55);
  main_wingShape.lineTo(3.62, -1.34);
  main_wingShape.lineTo(3.45, -1.55);
  main_wingShape.lineTo(0.42, -0.72);
  main_wingShape.closePath();
  const main_wingGeom = new THREE.ExtrudeGeometry(main_wingShape, {
    depth: 0.08,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.015,
    bevelSize: 0.018,
    bevelSegments: 2
  });
  const main_wing = new THREE.Mesh(main_wingGeom, wingMat);
  main_wing.name = "main_wing";
  main_wing.rotation.x = Math.PI / 2;
  main_wing.position.y = -0.12;
  aircraft_group.add(main_wing);

  const horizontal_stabilizerShape = new THREE.Shape();
  horizontal_stabilizerShape.moveTo(-0.22, -4.28);
  horizontal_stabilizerShape.lineTo(-1.45, -4.48);
  horizontal_stabilizerShape.lineTo(-1.52, -4.28);
  horizontal_stabilizerShape.lineTo(-0.28, -3.72);
  horizontal_stabilizerShape.lineTo(0.28, -3.72);
  horizontal_stabilizerShape.lineTo(1.52, -4.28);
  horizontal_stabilizerShape.lineTo(1.45, -4.48);
  horizontal_stabilizerShape.lineTo(0.22, -4.28);
  horizontal_stabilizerShape.closePath();
  const horizontal_stabilizerGeom = new THREE.ExtrudeGeometry(horizontal_stabilizerShape, {
    depth: 0.055,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.01,
    bevelSize: 0.012,
    bevelSegments: 2
  });
  const horizontal_stabilizer = new THREE.Mesh(horizontal_stabilizerGeom, wingMat);
  horizontal_stabilizer.name = "horizontal_stabilizer";
  horizontal_stabilizer.rotation.x = Math.PI / 2;
  horizontal_stabilizer.position.y = 0.12;
  aircraft_group.add(horizontal_stabilizer);

  const vertical_stabilizerShape = new THREE.Shape();
  vertical_stabilizerShape.moveTo(-4.45, 0.05);
  vertical_stabilizerShape.lineTo(-3.65, 0.10);
  vertical_stabilizerShape.lineTo(-2.82, 1.72);
  vertical_stabilizerShape.lineTo(-3.12, 1.82);
  vertical_stabilizerShape.lineTo(-3.52, 1.72);
  vertical_stabilizerShape.lineTo(-4.12, 0.22);
  vertical_stabilizerShape.closePath();
  const vertical_stabilizerGeom = new THREE.ExtrudeGeometry(vertical_stabilizerShape, {
    depth: 0.12,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.012,
    bevelSize: 0.015,
    bevelSegments: 2
  });
  const vertical_stabilizer = new THREE.Mesh(vertical_stabilizerGeom, tailMat);
  vertical_stabilizer.name = "vertical_stabilizer";
  vertical_stabilizer.rotation.y = -Math.PI / 2;
  vertical_stabilizer.position.x = 0.06;
  aircraft_group.add(vertical_stabilizer);

  const wingtipShape = new THREE.Shape();
  wingtipShape.moveTo(-3.55, -1.45);
  wingtipShape.lineTo(-3.92, -1.66);
  wingtipShape.lineTo(-4.05, -1.42);
  wingtipShape.lineTo(-3.72, -1.25);
  wingtipShape.closePath();
  const wingtipGeom = new THREE.ExtrudeGeometry(wingtipShape, {
    depth: 0.06,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.008,
    bevelSize: 0.01,
    bevelSegments: 1
  });
  const left_wingtip = new THREE.Mesh(wingtipGeom, tailMat);
  left_wingtip.name = "left_wingtip";
  left_wingtip.rotation.x = Math.PI / 2;
  left_wingtip.position.y = -0.08;
  aircraft_group.add(left_wingtip);

  const right_wingtip = new THREE.Mesh(wingtipGeom, tailMat);
  right_wingtip.name = "right_wingtip";
  right_wingtip.rotation.x = Math.PI / 2;
  right_wingtip.position.y = -0.08;
  right_wingtip.scale.x = -1;
  aircraft_group.add(right_wingtip);

  const engine_nacelleGeom = new THREE.CylinderGeometry(0.28, 0.22, 0.82, 40, 1, false);
  const engine_intakeGeom = new THREE.CircleGeometry(0.235, 40);
  const engine_lipGeom = new THREE.TorusGeometry(0.255, 0.035, 12, 40);
  const engine_fan_hubGeom = new THREE.SphereGeometry(0.065, 20, 12);
  const engine_pylonGeom = new THREE.BoxGeometry(0.18, 0.22, 0.52);

  function createEngine(name, x, y, z) {
    const engine = new THREE.Group();
    engine.name = name;
    engine.position.set(x, y, z);

    const nacelle = new THREE.Mesh(engine_nacelleGeom, engineMat);
    nacelle.name = name + "_nacelle";
    nacelle.rotation.x = Math.PI / 2;
    engine.add(nacelle);

    const intake = new THREE.Mesh(engine_intakeGeom, engineInteriorMat);
    intake.name = name + "_intake";
    intake.position.z = 0.425;
    engine.add(intake);

    const lip = new THREE.Mesh(engine_lipGeom, engineMat);
    lip.name = name + "_lip";
    lip.position.z = 0.43;
    engine.add(lip);

    const fan_hub = new THREE.Mesh(engine_fan_hubGeom, fanMat);
    fan_hub.name = name + "_fan_hub";
    fan_hub.position.z = 0.455;
    engine.add(fan_hub);

    const pylon = new THREE.Mesh(engine_pylonGeom, wingMat);
    pylon.name = name + "_pylon";
    pylon.position.set(0, 0.28, -0.12);
    engine.add(pylon);

    const fan_blades = new THREE.InstancedMesh(new THREE.BoxGeometry(0.035, 0.15, 0.018), fanMat, 10);
    fan_blades.name = name + "_fan_blades";
    const bladeDummy = new THREE.Object3D();
    for (let i = 0; i < 10; i++) {
      const a = (i / 10) * Math.PI * 2;
      bladeDummy.position.set(Math.cos(a) * 0.105, Math.sin(a) * 0.105, 0.46);
      bladeDummy.rotation.set(0, 0, a - Math.PI / 2);
      bladeDummy.updateMatrix();
      fan_blades.setMatrixAt(i, bladeDummy.matrix);
    }
    fan_blades.instanceMatrix.needsUpdate = true;
    engine.add(fan_blades);

    return engine;
  }

  const left_engine = createEngine("left_engine", -1.55, -0.55, 0.15);
  const right_engine = createEngine("right_engine", 1.55, -0.55, 0.15);
  aircraft_group.add(left_engine, right_engine);

  const cabin_windowGeom = new THREE.BoxGeometry(0.018, 0.075, 0.075);
  const cabin_windows = new THREE.InstancedMesh(cabin_windowGeom, windowMat, 44);
  cabin_windows.name = "cabin_windows";
  const windowDummy = new THREE.Object3D();
  let windowIndex = 0;
  for (const side of [-1, 1]) {
    for (let i = 0; i < 22; i++) {
      windowDummy.position.set(side * 0.435, 0.075, -2.55 + i * 0.24);
      windowDummy.rotation.set(0, 0, 0);
      windowDummy.updateMatrix();
      cabin_windows.setMatrixAt(windowIndex++, windowDummy.matrix);
    }
  }
  cabin_windows.instanceMatrix.needsUpdate = true;
  aircraft_group.add(cabin_windows);

  const cockpit_windowGeom = new THREE.BoxGeometry(0.022, 0.105, 0.18);
  const cockpit_windows = new THREE.InstancedMesh(cockpit_windowGeom, windowMat, 4);
  cockpit_windows.name = "cockpit_windows";
  const cockpitDummy = new THREE.Object3D();
  const cockpitPositions = [
    [-0.31, 0.17, 3.55, -0.22],
    [-0.18, 0.18, 3.68, -0.12],
    [0.18, 0.18, 3.68, 0.12],
    [0.31, 0.17, 3.55, 0.22]
  ];
  for (let i = 0; i < cockpitPositions.length; i++) {
    const p = cockpitPositions[i];
    cockpitDummy.position.set(p[0], p[1], p[2]);
    cockpitDummy.rotation.set(0, p[3], 0);
    cockpitDummy.updateMatrix();
    cockpit_windows.setMatrixAt(i, cockpitDummy.matrix);
  }
  cockpit_windows.instanceMatrix.needsUpdate = true;
  aircraft_group.add(cockpit_windows);

  const doorGeom = new THREE.BoxGeometry(0.022, 0.34, 0.18);
  const passenger_doors = new THREE.InstancedMesh(doorGeom, fuselageMat, 4);
  passenger_doors.name = "passenger_doors";
  const doorDummy = new THREE.Object3D();
  const doorPositions = [
    [-0.445, 0.02, -2.05],
    [0.445, 0.02, -2.05],
    [-0.445, 0.02, 2.35],
    [0.445, 0.02, 2.35]
  ];
  for (let i = 0; i < doorPositions.length; i++) {
    doorDummy.position.set(doorPositions[i][0], doorPositions[i][1], doorPositions[i][2]);
    doorDummy.rotation.set(0, 0, 0);
    doorDummy.updateMatrix();
    passenger_doors.setMatrixAt(i, doorDummy.matrix);
  }
  passenger_doors.instanceMatrix.needsUpdate = true;
  aircraft_group.add(passenger_doors);

  const door_outlineGeom = new THREE.BoxGeometry(0.026, 0.36, 0.20);
  const door_outlines = new THREE.InstancedMesh(door_outlineGeom, seamMat, 4);
  door_outlines.name = "door_outlines";
  const outlineDummy = new THREE.Object3D();
  for (let i = 0; i < doorPositions.length; i++) {
    const side = doorPositions[i][0] < 0 ? -1 : 1;
    outlineDummy.position.set(doorPositions[i][0] + side * 0.006, doorPositions[i][1], doorPositions[i][2]);
    outlineDummy.rotation.set(0, 0, 0);
    outlineDummy.updateMatrix();
    door_outlines.setMatrixAt(i, outlineDummy.matrix);
  }
  door_outlines.instanceMatrix.needsUpdate = true;
  aircraft_group.add(door_outlines);

  const fuselage_seamGeom = new THREE.TorusGeometry(0.432, 0.006, 6, 64);
  const fuselage_panel_lines = new THREE.InstancedMesh(fuselage_seamGeom, seamMat, 5);
  fuselage_panel_lines.name = "fuselage_panel_lines";
  const seamDummy = new THREE.Object3D();
  const seamZ = [-3.55, -1.25, 1.15, 2.85, 3.82];
  for (let i = 0; i < seamZ.length; i++) {
    seamDummy.position.set(0, 0, seamZ[i]);
    seamDummy.rotation.set(0, 0, 0);
    seamDummy.updateMatrix();
    fuselage_panel_lines.setMatrixAt(i, seamDummy.matrix);
  }
  fuselage_panel_lines.instanceMatrix.needsUpdate = true;
  aircraft_group.add(fuselage_panel_lines);

  const wing_root_fairingGeom = new THREE.SphereGeometry(1, 28, 14);
  const wing_root_fairings = new THREE.InstancedMesh(wing_root_fairingGeom, wingMat, 2);
  wing_root_fairings.name = "wing_root_fairings";
  const fairingDummy = new THREE.Object3D();
  for (let i = 0; i < 2; i++) {
    const side = i === 0 ? -1 : 1;
    fairingDummy.position.set(side * 0.48, -0.22, -0.12);
    fairingDummy.rotation.set(0, 0, 0);
    fairingDummy.scale.set(0.38, 0.13, 0.72);
    fairingDummy.updateMatrix();
    wing_root_fairings.setMatrixAt(i, fairingDummy.matrix);
  }
  wing_root_fairings.instanceMatrix.needsUpdate = true;
  aircraft_group.add(wing_root_fairings);

  const flapGeom = new THREE.BoxGeometry(0.72, 0.018, 0.12);
  const wing_flaps = new THREE.InstancedMesh(flapGeom, seamMat, 6);
  wing_flaps.name = "wing_flaps";
  const flapDummy = new THREE.Object3D();
  let flapIndex = 0;
  for (const side of [-1, 1]) {
    for (let i = 0; i < 3; i++) {
      flapDummy.position.set(side * (0.85 + i * 0.78), -0.165, -0.72 - i * 0.12);
      flapDummy.rotation.set(0, side * 0.08, 0);
      flapDummy.updateMatrix();
      wing_flaps.setMatrixAt(flapIndex++, flapDummy.matrix);
    }
  }
  wing_flaps.instanceMatrix.needsUpdate = true;
  aircraft_group.add(wing_flaps);

  const tail_logoShape = new THREE.Shape();
  tail_logoShape.moveTo(-0.18, 0.10);
  tail_logoShape.lineTo(0.02, 0.28);
  tail_logoShape.lineTo(0.18, 0.08);
  tail_logoShape.lineTo(0.05, -0.02);
  tail_logoShape.lineTo(0.16, -0.25);
  tail_logoShape.lineTo(-0.02, -0.12);
  tail_logoShape.lineTo(-0.18, -0.24);
  tail_logoShape.lineTo(-0.10, -0.02);
  tail_logoShape.closePath();
  const tail_logoGeom = new THREE.ShapeGeometry(tail_logoShape);

  const left_tail_logo = new THREE.Mesh(tail_logoGeom, logoMat);
  left_tail_logo.name = "left_tail_logo";
  left_tail_logo.rotation.y = -Math.PI / 2;
  left_tail_logo.position.set(-0.071, 1.02, -3.62);
  aircraft_group.add(left_tail_logo);

  const right_tail_logo = new THREE.Mesh(tail_logoGeom, logoMat);
  right_tail_logo.name = "right_tail_logo";
  right_tail_logo.rotation.y = Math.PI / 2;
  right_tail_logo.position.set(0.071, 1.02, -3.62);
  aircraft_group.add(right_tail_logo);

  const logo_centerShape = new THREE.Shape();
  logo_centerShape.moveTo(-0.055, 0.12);
  logo_centerShape.lineTo(0.055, 0.02);
  logo_centerShape.lineTo(-0.02, -0.13);
  logo_centerShape.lineTo(-0.10, -0.03);
  logo_centerShape.closePath();
  const logo_centerGeom = new THREE.ShapeGeometry(logo_centerShape);
  const tail_logo_centers = new THREE.InstancedMesh(logo_centerGeom, darkRedLogoMat, 2);
  tail_logo_centers.name = "tail_logo_centers";
  const logoDummy = new THREE.Object3D();
  logoDummy.position.set(-0.075, 1.02, -3.62);
  logoDummy.rotation.y = -Math.PI / 2;
  logoDummy.updateMatrix();
  tail_logo_centers.setMatrixAt(0, logoDummy.matrix);
  logoDummy.position.set(0.075, 1.02, -3.62);
  logoDummy.rotation.y = Math.PI / 2;
  logoDummy.updateMatrix();
  tail_logo_centers.setMatrixAt(1, logoDummy.matrix);
  tail_logo_centers.instanceMatrix.needsUpdate = true;
  aircraft_group.add(tail_logo_centers);

  const nose_radome_seamGeom = new THREE.TorusGeometry(0.34, 0.007, 6, 64);
  const nose_radome_seam = new THREE.Mesh(nose_radome_seamGeom, seamMat);
  nose_radome_seam.name = "nose_radome_seam";
  nose_radome_seam.position.z = 3.78;
  aircraft_group.add(nose_radome_seam);

  const belly_antennaGeom = new THREE.ConeGeometry(0.045, 0.16, 12);
  const belly_antennas = new THREE.InstancedMesh(belly_antennaGeom, wingMat, 3);
  belly_antennas.name = "belly_antennas";
  const antennaDummy = new THREE.Object3D();
  const antennaZ = [-1.15, 0.75, 2.05];
  for (let i = 0; i < antennaZ.length; i++) {
    antennaDummy.position.set(0, -0.47, antennaZ[i]);
    antennaDummy.rotation.set(0, 0, Math.PI);
    antennaDummy.updateMatrix();
    belly_antennas.setMatrixAt(i, antennaDummy.matrix);
  }
  belly_antennas.instanceMatrix.needsUpdate = true;
  aircraft_group.add(belly_antennas);

  const main_gear_strutGeom = new THREE.CylinderGeometry(0.025, 0.025, 0.42, 12);
  const main_gear_struts = new THREE.InstancedMesh(main_gear_strutGeom, strutMat, 2);
  main_gear_struts.name = "main_gear_struts";
  const gearDummy = new THREE.Object3D();
  for (let i = 0; i < 2; i++) {
    const side = i === 0 ? -1 : 1;
    gearDummy.position.set(side * 0.62, -0.62, 0.18);
    gearDummy.rotation.set(0, 0, 0);
    gearDummy.updateMatrix();
    main_gear_struts.setMatrixAt(i, gearDummy.matrix);
  }
  main_gear_struts.instanceMatrix.needsUpdate = true;
  aircraft_group.add(main_gear_struts);

  const main_gear_wheelGeom = new THREE.TorusGeometry(0.075, 0.025, 8, 20);
  const main_gear_wheels = new THREE.InstancedMesh(main_gear_wheelGeom, gearMat, 4);
  main_gear_wheels.name = "main_gear_wheels";
  let wheelIndex = 0;
  for (const side of [-1, 1]) {
    for (const zOffset of [-0.11, 0.11]) {
      gearDummy.position.set(side * 0.62, -0.86, 0.18 + zOffset);
      gearDummy.rotation.set(0, Math.PI / 2, 0);
      gearDummy.updateMatrix();
      main_gear_wheels.setMatrixAt(wheelIndex++, gearDummy.matrix);
    }
  }
  main_gear_wheels.instanceMatrix.needsUpdate = true;
  aircraft_group.add(main_gear_wheels);

  const nose_gear_strutGeom = new THREE.CylinderGeometry(0.018, 0.018, 0.34, 10);
  const nose_gear_strut = new THREE.Mesh(nose_gear_strutGeom, strutMat);
  nose_gear_strut.name = "nose_gear_strut";
  nose_gear_strut.position.set(0, -0.58, 3.05);
  aircraft_group.add(nose_gear_strut);

  const nose_gear_wheelGeom = new THREE.TorusGeometry(0.055, 0.018, 8, 18);
  const nose_gear_wheels = new THREE.InstancedMesh(nose_gear_wheelGeom, gearMat, 2);
  nose_gear_wheels.name = "nose_gear_wheels";
  for (let i = 0; i < 2; i++) {
    gearDummy.position.set(i === 0 ? -0.055 : 0.055, -0.78, 3.05);
    gearDummy.rotation.set(0, Math.PI / 2, 0);
    gearDummy.updateMatrix();
    nose_gear_wheels.setMatrixAt(i, gearDummy.matrix);
  }
  nose_gear_wheels.instanceMatrix.needsUpdate = true;
  aircraft_group.add(nose_gear_wheels);

  const registration_markGeom = new THREE.BoxGeometry(0.018, 0.025, 0.055);
  const registration_marks = new THREE.InstancedMesh(registration_markGeom, markingMat, 12);
  registration_marks.name = "registration_marks";
  const markDummy = new THREE.Object3D();
  let markIndex = 0;
  for (const side of [-1, 1]) {
    for (let i = 0; i < 6; i++) {
      markDummy.position.set(side * 0.438, 0.015, -3.18 + i * 0.075);
      markDummy.rotation.set(0, 0, 0);
      markDummy.updateMatrix();
      registration_marks.setMatrixAt(markIndex++, markDummy.matrix);
    }
  }
  registration_marks.instanceMatrix.needsUpdate = true;
  aircraft_group.add(registration_marks);

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
