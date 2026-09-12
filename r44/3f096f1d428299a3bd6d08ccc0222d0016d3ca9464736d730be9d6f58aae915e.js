// miner-diag: gpus=? tflops=? stream48=? power=? probe_tps=3831 cpu_quota=?/? net=? batch=1 wall=1609 seed=870128282
export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "modern_glass_desk";

  const deskW = 1.60;
  const deskD = 0.80;
  const glassH = 0.026;
  const glassY = 0.82;
  const frameX = 0.68;
  const frameZ = 0.31;
  const frameTopY = 0.79;
  const frameBottomY = 0.035;

  const glass_topMat = new THREE.MeshPhysicalMaterial({
    color: 0xddebea,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true
  });

  const glass_edgeMat = new THREE.MeshStandardMaterial({
    color: 0x173b35,
    metalness: 0.0,
    roughness: 0.3
  });

  const frameMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25
  });

  const polished_metalMat = new THREE.MeshStandardMaterial({
    color: 0xd4d4d4,
    metalness: 0.6,
    roughness: 0.2
  });

  const dark_metalMat = new THREE.MeshStandardMaterial({
    color: 0x3a3a3a,
    metalness: 0.6,
    roughness: 0.5
  });

  const rubberMat = new THREE.MeshStandardMaterial({
    color: 0x151716,
    metalness: 0.0,
    roughness: 0.8
  });

  const black_plasticMat = new THREE.MeshStandardMaterial({
    color: 0x111313,
    metalness: 0.0,
    roughness: 0.8
  });

  const blue_plasticMat = new THREE.MeshStandardMaterial({
    color: 0x1769aa,
    metalness: 0.0,
    roughness: 0.3
  });

  const control_glassMat = new THREE.MeshPhysicalMaterial({
    color: 0xd7e3e1,
    metalness: 0.0,
    roughness: 0.4,
    transmission: 0.7,
    ior: 1.5,
    transparent: true
  });

  const glass_topGeom = new THREE.BoxGeometry(deskW, glassH, deskD);
  const glass_top = new THREE.Mesh(glass_topGeom, glass_topMat);
  glass_top.name = "glass_top";
  glass_top.position.y = glassY;
  root.add(glass_top);

  const long_glass_edgeGeom = new THREE.BoxGeometry(
    deskW + 0.012,
    glassH + 0.002,
    0.012
  );

  const front_glass_edge = new THREE.Mesh(long_glass_edgeGeom, glass_edgeMat);
  front_glass_edge.name = "front_glass_edge";
  front_glass_edge.position.set(0, glassY, deskD / 2 + 0.003);
  root.add(front_glass_edge);

  const rear_glass_edge = new THREE.Mesh(long_glass_edgeGeom, glass_edgeMat);
  rear_glass_edge.name = "rear_glass_edge";
  rear_glass_edge.position.set(0, glassY, -deskD / 2 - 0.003);
  root.add(rear_glass_edge);

  const side_glass_edgeGeom = new THREE.BoxGeometry(
    0.012,
    glassH + 0.002,
    deskD
  );

  const left_glass_edge = new THREE.Mesh(side_glass_edgeGeom, glass_edgeMat);
  left_glass_edge.name = "left_glass_edge";
  left_glass_edge.position.set(-deskW / 2 - 0.003, glassY, 0);
  root.add(left_glass_edge);

  const right_glass_edge = new THREE.Mesh(side_glass_edgeGeom, glass_edgeMat);
  right_glass_edge.name = "right_glass_edge";
  right_glass_edge.position.set(deskW / 2 + 0.003, glassY, 0);
  root.add(right_glass_edge);

  const side_frameShape = new THREE.Shape();
  side_frameShape.moveTo(-frameZ, frameBottomY);
  side_frameShape.lineTo(-frameZ, 0.735);
  side_frameShape.quadraticCurveTo(-frameZ, 0.785, -0.295, frameTopY);
  side_frameShape.lineTo(0.295, frameTopY);
  side_frameShape.quadraticCurveTo(frameZ, 0.785, frameZ, 0.735);
  side_frameShape.lineTo(frameZ, 0.085);
  side_frameShape.quadraticCurveTo(frameZ, 0.035, 0.285, 0.035);
  side_frameShape.lineTo(-0.285, 0.035);
  side_frameShape.quadraticCurveTo(-frameZ, 0.035, -frameZ, 0.085);
  side_frameShape.closePath();

  const side_frame_hole = new THREE.Path();
  side_frame_hole.moveTo(-0.285, 0.105);
  side_frame_hole.lineTo(0.285, 0.105);
  side_frame_hole.quadraticCurveTo(0.305, 0.105, 0.305, 0.125);
  side_frame_hole.lineTo(0.305, 0.675);
  side_frame_hole.quadraticCurveTo(0.305, 0.705, 0.275, 0.705);
  side_frame_hole.lineTo(-0.275, 0.705);
  side_frame_hole.quadraticCurveTo(-0.305, 0.705, -0.305, 0.675);
  side_frame_hole.closePath();
  side_frameShape.holes.push(side_frame_hole);

  const side_frameGeom = new THREE.ExtrudeGeometry(side_frameShape, {
    depth: 0.055,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.006,
    bevelSize: 0.006,
    bevelSegments: 2
  });
  side_frameGeom.translate(0, 0, -0.0275);

  const left_side_frame = new THREE.Mesh(side_frameGeom, frameMat);
  left_side_frame.name = "left_side_frame";
  left_side_frame.rotation.y = Math.PI / 2;
  left_side_frame.position.x = -frameX;
  root.add(left_side_frame);

  const right_side_frame = new THREE.Mesh(side_frameGeom, frameMat);
  right_side_frame.name = "right_side_frame";
  right_side_frame.rotation.y = Math.PI / 2;
  right_side_frame.position.x = frameX;
  root.add(right_side_frame);

  const upper_crossbarGeom = new THREE.BoxGeometry(1.36, 0.07, 0.06);

  const front_upper_crossbar = new THREE.Mesh(upper_crossbarGeom, frameMat);
  front_upper_crossbar.name = "front_upper_crossbar";
  front_upper_crossbar.position.set(0, 0.755, frameZ);
  root.add(front_upper_crossbar);

  const rear_upper_crossbar = new THREE.Mesh(upper_crossbarGeom, frameMat);
  rear_upper_crossbar.name = "rear_upper_crossbar";
  rear_upper_crossbar.position.set(0, 0.755, -frameZ);
  root.add(rear_upper_crossbar);

  const front_apronGeom = new THREE.BoxGeometry(1.36, 0.075, 0.045);
  const front_apron = new THREE.Mesh(front_apronGeom, frameMat);
  front_apron.name = "front_apron";
  front_apron.position.set(0, 0.735, 0.355);
  root.add(front_apron);

  const rear_apron = new THREE.Mesh(front_apronGeom, frameMat);
  rear_apron.name = "rear_apron";
  rear_apron.position.set(0, 0.735, -0.355);
  root.add(rear_apron);

  const corner_connectorShape = new THREE.Shape();
  corner_connectorShape.moveTo(-0.055, 0.025);
  corner_connectorShape.lineTo(0.055, 0.025);
  corner_connectorShape.lineTo(0.055, -0.025);
  corner_connectorShape.lineTo(-0.018, -0.025);
  corner_connectorShape.closePath();

  const corner_connectorGeom = new THREE.ExtrudeGeometry(
    corner_connectorShape,
    {
      depth: 0.075,
      steps: 1,
      bevelEnabled: false
    }
  );
  corner_connectorGeom.translate(0, 0, -0.0375);

  const corner_connectors = new THREE.InstancedMesh(
    corner_connectorGeom,
    polished_metalMat,
    4
  );
  corner_connectors.name = "corner_connectors";

  const connector_dummy = new THREE.Object3D();
  const connector_positions = [
    [-frameX, 0.785, frameZ],
    [frameX, 0.785, frameZ],
    [-frameX, 0.785, -frameZ],
    [frameX, 0.785, -frameZ]
  ];

  for (let i = 0; i < connector_positions.length; i++) {
    const position = connector_positions[i];
    connector_dummy.position.set(position[0], position[1], position[2]);
    connector_dummy.rotation.set(0, Math.PI / 2, 0);
    connector_dummy.updateMatrix();
    corner_connectors.setMatrixAt(i, connector_dummy.matrix);
  }
  corner_connectors.instanceMatrix.needsUpdate = true;
  root.add(corner_connectors);

  const foot_padGeom = new THREE.BoxGeometry(0.078, 0.018, 0.09);
  const foot_pads = new THREE.InstancedMesh(foot_padGeom, rubberMat, 4);
  foot_pads.name = "foot_pads";

  const foot_dummy = new THREE.Object3D();
  const foot_positions = [
    [-frameX, 0.019, 0.29],
    [-frameX, 0.019, -0.29],
    [frameX, 0.019, 0.29],
    [frameX, 0.019, -0.29]
  ];

  for (let i = 0; i < foot_positions.length; i++) {
    const position = foot_positions[i];
    foot_dummy.position.set(position[0], position[1], position[2]);
    foot_dummy.rotation.set(0, 0, 0);
    foot_dummy.updateMatrix();
    foot_pads.setMatrixAt(i, foot_dummy.matrix);
  }
  foot_pads.instanceMatrix.needsUpdate = true;
  root.add(foot_pads);

  const standoff_baseGeom = new THREE.CylinderGeometry(
    0.035,
    0.035,
    0.012,
    24
  );
  const standoff_stemGeom = new THREE.CylinderGeometry(
    0.012,
    0.012,
    0.034,
    16
  );
  const standoff_capGeom = new THREE.CylinderGeometry(
    0.025,
    0.025,
    0.008,
    24
  );

  const standoff_bases = new THREE.InstancedMesh(
    standoff_baseGeom,
    polished_metalMat,
    4
  );
  standoff_bases.name = "standoff_bases";

  const standoff_stems = new THREE.InstancedMesh(
    standoff_stemGeom,
    polished_metalMat,
    4
  );
  standoff_stems.name = "standoff_stems";

  const standoff_caps = new THREE.InstancedMesh(
    standoff_capGeom,
    control_glassMat,
    4
  );
  standoff_caps.name = "standoff_caps";

  const standoff_dummy = new THREE.Object3D();
  const standoff_positions = [
    [-0.62, -0.27],
    [0.62, -0.27],
    [-0.62, 0.27],
    [0.62, 0.27]
  ];

  for (let i = 0; i < standoff_positions.length; i++) {
    const position = standoff_positions[i];

    standoff_dummy.position.set(position[0], 0.796, position[1]);
    standoff_dummy.rotation.set(0, 0, 0);
    standoff_dummy.updateMatrix();
    standoff_bases.setMatrixAt(i, standoff_dummy.matrix);

    standoff_dummy.position.set(position[0], 0.808, position[1]);
    standoff_dummy.updateMatrix();
    standoff_stems.setMatrixAt(i, standoff_dummy.matrix);

    standoff_dummy.position.set(position[0], 0.827, position[1]);
    standoff_dummy.updateMatrix();
    standoff_caps.setMatrixAt(i, standoff_dummy.matrix);
  }

  standoff_bases.instanceMatrix.needsUpdate = true;
  standoff_stems.instanceMatrix.needsUpdate = true;
  standoff_caps.instanceMatrix.needsUpdate = true;
  root.add(standoff_bases, standoff_stems, standoff_caps);

  const control_panelGeom = new THREE.BoxGeometry(0.27, 0.012, 0.085);
  const control_panel = new THREE.Mesh(control_panelGeom, control_glassMat);
  control_panel.name = "control_panel";
  control_panel.position.set(0.58, 0.814, 0.27);
  root.add(control_panel);

  const control_buttonGeom = new THREE.CylinderGeometry(
    0.012,
    0.012,
    0.006,
    20
  );
  const control_buttons = new THREE.InstancedMesh(
    control_buttonGeom,
    black_plasticMat,
    2
  );
  control_buttons.name = "control_buttons";

  const control_dummy = new THREE.Object3D();
  const control_button_positions = [
    [0.515, 0.823, 0.27],
    [0.565, 0.823, 0.27]
  ];

  for (let i = 0; i < control_button_positions.length; i++) {
    const position = control_button_positions[i];
    control_dummy.position.set(position[0], position[1], position[2]);
    control_dummy.rotation.set(0, 0, 0);
    control_dummy.updateMatrix();
    control_buttons.setMatrixAt(i, control_dummy.matrix);
  }
  control_buttons.instanceMatrix.needsUpdate = true;
  root.add(control_buttons);

  const control_dialGeom = new THREE.CylinderGeometry(
    0.025,
    0.025,
    0.007,
    24
  );
  const control_dial = new THREE.Mesh(control_dialGeom, dark_metalMat);
  control_dial.name = "control_dial";
  control_dial.position.set(0.645, 0.823, 0.27);
  root.add(control_dial);

  const control_dial_centerGeom = new THREE.CylinderGeometry(
    0.011,
    0.011,
    0.009,
    20
  );
  const control_dial_center = new THREE.Mesh(
    control_dial_centerGeom,
    polished_metalMat
  );
  control_dial_center.name = "control_dial_center";
  control_dial_center.position.set(0.645, 0.825, 0.27);
  root.add(control_dial_center);

  const usb_panelGeom = new THREE.BoxGeometry(0.42, 0.055, 0.018);
  const usb_panel = new THREE.Mesh(usb_panelGeom, frameMat);
  usb_panel.name = "usb_panel";
  usb_panel.position.set(-0.43, 0.735, 0.382);
  root.add(usb_panel);

  const usb_portGeom = new THREE.BoxGeometry(0.046, 0.021, 0.009);
  const usb_ports = new THREE.InstancedMesh(
    usb_portGeom,
    black_plasticMat,
    5
  );
  usb_ports.name = "usb_ports";

  const usb_port_insertGeom = new THREE.BoxGeometry(0.031, 0.006, 0.004);
  const usb_port_inserts = new THREE.InstancedMesh(
    usb_port_insertGeom,
    blue_plasticMat,
    2
  );
  usb_port_inserts.name = "usb_port_inserts";

  const usb_dummy = new THREE.Object3D();
  const usb_x_positions = [-0.58, -0.515, -0.45, -0.385, -0.32];

  for (let i = 0; i < usb_x_positions.length; i++) {
    usb_dummy.position.set(usb_x_positions[i], 0.735, 0.394);
    usb_dummy.rotation.set(0, 0, 0);
    usb_dummy.updateMatrix();
    usb_ports.setMatrixAt(i, usb_dummy.matrix);
  }
  usb_ports.instanceMatrix.needsUpdate = true;

  const usb_insert_positions = [-0.385, -0.32];
  for (let i = 0; i < usb_insert_positions.length; i++) {
    usb_dummy.position.set(usb_insert_positions[i], 0.731, 0.399);
    usb_dummy.rotation.set(0, 0, 0);
    usb_dummy.updateMatrix();
    usb_port_inserts.setMatrixAt(i, usb_dummy.matrix);
  }
  usb_port_inserts.instanceMatrix.needsUpdate = true;
  root.add(usb_ports, usb_port_inserts);

  const power_switchGeom = new THREE.BoxGeometry(0.026, 0.019, 0.009);
  const power_switch = new THREE.Mesh(power_switchGeom, black_plasticMat);
  power_switch.name = "power_switch";
  power_switch.position.set(-0.635, 0.735, 0.394);
  root.add(power_switch);

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