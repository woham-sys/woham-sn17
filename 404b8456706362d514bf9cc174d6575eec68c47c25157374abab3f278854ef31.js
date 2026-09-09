function __sn17_user(THREE) {
  const root = new THREE.Group();

  const woodMat = new THREE.MeshStandardMaterial({ color: 0x8a4f2c, roughness: 0.5 });
  const darkWoodMat = new THREE.MeshStandardMaterial({ color: 0x5a2d18, roughness: 0.55 });
  const grainMat = new THREE.MeshStandardMaterial({ color: 0x2b160d, roughness: 0.8 });
  const brassMat = new THREE.MeshStandardMaterial({ color: 0xc5a34a, roughness: 0.35 });
  const agedBrassMat = new THREE.MeshStandardMaterial({ color: 0x9b7a32, roughness: 0.45 });
  const copperMat = new THREE.MeshStandardMaterial({ color: 0xb8735d, roughness: 0.4 });
  const blackMat = new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.8 });
  const panelMat = new THREE.MeshStandardMaterial({ color: 0x181512, roughness: 0.65 });
  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0x9aa6a8,
    transparent: true,
    opacity: 0.32,
    roughness: 0.15,
    side: THREE.DoubleSide
  });

  function addBox(w, h, d, mat, x, y, z) {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
    mesh.position.set(x, y, z);
    root.add(mesh);
    return mesh;
  }

  const bodyW = 1.32;
  const bodyH = 0.92;
  const bodyD = 0.58;

  const left_side_panel = addBox(0.12, bodyH, bodyD, woodMat, -bodyW / 2 + 0.06, bodyH / 2, 0);
  const right_side_panel = addBox(0.12, bodyH, bodyD, woodMat, bodyW / 2 - 0.06, bodyH / 2, 0);
  const top_panel = addBox(bodyW, 0.12, bodyD, woodMat, 0, bodyH - 0.06, 0);
  const bottom_panel = addBox(bodyW, 0.10, bodyD, woodMat, 0, 0.05, 0);
  const rear_panel = addBox(bodyW * 0.82, bodyH * 0.78, 0.055, darkWoodMat, 0, bodyH * 0.52, -bodyD / 2 + 0.03);

  const front_lower_rail = addBox(bodyW * 0.92, 0.12, 0.08, woodMat, 0, 0.12, bodyD / 2 - 0.02);
  const front_upper_rail = addBox(bodyW * 0.92, 0.09, 0.07, woodMat, 0, bodyH - 0.12, bodyD / 2 - 0.02);
  const front_left_post = addBox(0.09, bodyH * 0.72, 0.08, woodMat, -bodyW / 2 + 0.08, bodyH * 0.50, bodyD / 2 - 0.02);
  const front_right_post = addBox(0.09, bodyH * 0.72, 0.08, woodMat, bodyW / 2 - 0.08, bodyH * 0.50, bodyD / 2 - 0.02);

  const keyboard_bed = addBox(1.08, 0.12, 0.34, woodMat, 0, 0.25, 0.18);
  const keyboard_front_lip = addBox(1.10, 0.08, 0.055, darkWoodMat, 0, 0.22, 0.365);

  const display_frame_back = addBox(0.96, 0.43, 0.035, panelMat, 0, 0.66, 0.285);
  const display_glass = addBox(0.86, 0.34, 0.012, glassMat, 0, 0.66, 0.307);

  const display_top_brass_trim = addBox(0.94, 0.025, 0.026, brassMat, 0, 0.875, 0.318);
  const display_bottom_brass_trim = addBox(0.94, 0.025, 0.026, brassMat, 0, 0.445, 0.318);
  const display_left_brass_trim = addBox(0.025, 0.43, 0.026, brassMat, -0.47, 0.66, 0.318);
  const display_right_brass_trim = addBox(0.025, 0.43, 0.026, brassMat, 0.47, 0.66, 0.318);

  const brand_name_plate = addBox(0.52, 0.055, 0.012, panelMat, 0, 0.475, 0.326);
  const brand_left_gold_marker = addBox(0.055, 0.055, 0.014, brassMat, -0.235, 0.475, 0.335);
  brand_left_gold_marker.rotation.z = -0.25;

  const keyCount = 12;
  const keyPitch = 0.075;
  const keyStartX = -(keyCount - 1) * keyPitch / 2;
  const white_keys = new THREE.InstancedMesh(new THREE.BoxGeometry(0.064, 0.035, 0.24), brassMat, keyCount);
  const black_key_shadows = new THREE.InstancedMesh(new THREE.BoxGeometry(0.043, 0.012, 0.13), blackMat, keyCount - 1);
  const dummy = new THREE.Object3D();

  for (let i = 0; i < keyCount; i++) {
    dummy.position.set(keyStartX + i * keyPitch, 0.325, 0.18);
    dummy.rotation.set(0, 0, 0);
    dummy.updateMatrix();
    white_keys.setMatrixAt(i, dummy.matrix);
  }
  root.add(white_keys);

  for (let i = 0; i < keyCount - 1; i++) {
    const gapIndex = i % 7 === 2 || i % 7 === 5 ? 1 : 0;
    dummy.position.set(keyStartX + (i + 0.5) * keyPitch, 0.351, 0.105 + gapIndex * 0.01);
    dummy.rotation.set(0, 0, 0);
    dummy.updateMatrix();
    black_key_shadows.setMatrixAt(i, dummy.matrix);
  }
  root.add(black_key_shadows);

  const control_knob_bases = new THREE.InstancedMesh(new THREE.CylinderGeometry(0.038, 0.038, 0.014, 24), agedBrassMat, 4);
  const control_knobs = new THREE.InstancedMesh(new THREE.CylinderGeometry(0.026, 0.031, 0.055, 24), brassMat, 4);
  const knobXs = [0.18, 0.30, 0.42, 0.54];
  for (let i = 0; i < knobXs.length; i++) {
    dummy.position.set(knobXs[i], 0.286, 0.342);
    dummy.rotation.set(Math.PI / 2, 0, 0);
    dummy.updateMatrix();
    control_knob_bases.setMatrixAt(i, dummy.matrix);

    dummy.position.set(knobXs[i], 0.315, 0.365);
    dummy.rotation.set(Math.PI / 2, 0, 0);
    dummy.updateMatrix();
    control_knobs.setMatrixAt(i, dummy.matrix);
  }
  root.add(control_knob_bases);
  root.add(control_knobs);

  const power_socket_ring = new THREE.Mesh(new THREE.TorusGeometry(0.026, 0.008, 12, 24), blackMat);
  power_socket_ring.position.set(0.59, 0.205, 0.338);
  root.add(power_socket_ring);

  const power_socket_center = new THREE.Mesh(new THREE.CircleGeometry(0.018, 24), blackMat);
  power_socket_center.position.set(0.59, 0.205, 0.34);
  root.add(power_socket_center);

  const label_plate = addBox(0.34, 0.055, 0.012, brassMat, 0.10, 0.19, 0.338);
  const label_marks = new THREE.InstancedMesh(new THREE.BoxGeometry(0.012, 0.030, 0.006), blackMat, 7);
  for (let i = 0; i < 7; i++) {
    dummy.position.set(-0.015 + i * 0.038, 0.19 + (i % 2 === 0 ? 0.004 : -0.004), 0.347);
    dummy.rotation.set(0, 0, i % 3 === 0 ? 0.25 : 0);
    dummy.updateMatrix();
    label_marks.setMatrixAt(i, dummy.matrix);
  }
  root.add(label_marks);

  const internal_vacuum_tubes = new THREE.InstancedMesh(new THREE.CylinderGeometry(0.035, 0.035, 0.20, 24), agedBrassMat, 5);
  const tubeData = [
    [-0.34, 0.58, 0.02, 1.00],
    [-0.18, 0.62, 0.02, 0.85],
    [0.00, 0.60, 0.02, 1.10],
    [0.18, 0.61, 0.02, 0.95],
    [0.34, 0.63, 0.02, 0.80]
  ];
  for (let i = 0; i < tubeData.length; i++) {
    const t = tubeData[i];
    dummy.position.set(t[0], t[1], t[2]);
    dummy.rotation.set(0, 0, 0);
    dummy.scale.set(t[3], 1, t[3]);
    dummy.updateMatrix();
    internal_vacuum_tubes.setMatrixAt(i, dummy.matrix);
  }
  root.add(internal_vacuum_tubes);

  const vacuum_tube_caps = new THREE.InstancedMesh(new THREE.CylinderGeometry(0.040, 0.040, 0.018, 24), brassMat, 5);
  const vacuum_tube_bottoms = new THREE.InstancedMesh(new THREE.CylinderGeometry(0.040, 0.040, 0.018, 24), agedBrassMat, 5);
  for (let i = 0; i < tubeData.length; i++) {
    const t = tubeData[i];
    const h = 0.20 * t[3];

    dummy.position.set(t[0], t[1] + h / 2 + 0.006, t[2]);
    dummy.rotation.set(0, 0, 0);
    dummy.scale.set(t[3], 1, t[3]);
    dummy.updateMatrix();
    vacuum_tube_caps.setMatrixAt(i, dummy.matrix);

    dummy.position.set(t[0], t[1] - h / 2 - 0.006, t[2]);
    dummy.rotation.set(0, 0, 0);
    dummy.scale.set(t[3], 1, t[3]);
    dummy.updateMatrix();
    vacuum_tube_bottoms.setMatrixAt(i, dummy.matrix);
  }
  root.add(vacuum_tube_caps);
  root.add(vacuum_tube_bottoms);

  const copper_electrode_rods = new THREE.InstancedMesh(new THREE.CylinderGeometry(0.010, 0.010, 0.26, 12), copperMat, 4);
  const rodXs = [-0.28, -0.08, 0.10, 0.28];
  for (let i = 0; i < rodXs.length; i++) {
    dummy.position.set(rodXs[i], 0.69, -0.02);
    dummy.rotation.set(0, 0, 0);
    dummy.updateMatrix();
    copper_electrode_rods.setMatrixAt(i, dummy.matrix);
  }
  root.add(copper_electrode_rods);

  const support_wires = new THREE.InstancedMesh(new THREE.CylinderGeometry(0.004, 0.004, 0.30, 8), agedBrassMat, 6);
  for (let i = 0; i < 6; i++) {
    dummy.position.set(-0.38 + i * 0.15, 0.66, 0.08);
    dummy.rotation.set(0, 0, 0);
    dummy.updateMatrix();
    support_wires.setMatrixAt(i, dummy.matrix);
  }
  root.add(support_wires);

  const crossbar_wire_left = addBox(0.22, 0.008, 0.008, agedBrassMat, -0.18, 0.58, 0.08);
  const crossbar_wire_right = addBox(0.22, 0.008, 0.008, agedBrassMat, 0.18, 0.67, 0.08);

  const top_wood_grain = new THREE.InstancedMesh(new THREE.BoxGeometry(0.006, 0.004, 0.42), grainMat, 18);
  for (let i = 0; i < 18; i++) {
    const x = -0.55 + i * 0.064;
    const z = ((i % 5) - 2) * 0.025;
    dummy.position.set(x, bodyH + 0.004, z);
    dummy.rotation.set(0, ((i % 4) - 1.5) * 0.035, 0);
    dummy.updateMatrix();
    top_wood_grain.setMatrixAt(i, dummy.matrix);
  }
  root.add(top_wood_grain);

  const side_wood_grain = new THREE.InstancedMesh(new THREE.BoxGeometry(0.006, 0.55, 0.006), grainMat, 24);
  for (let i = 0; i < 24; i++) {
    const side = i < 12 ? -1 : 1;
    const j = i % 12;
    const z = -0.22 + (j % 6) * 0.085;
    const y = 0.20 + Math.floor(j / 6) * 0.32;
    dummy.position.set(side * (bodyW / 2 + 0.004), y, z);
    dummy.rotation.set(0, 0, ((j % 3) - 1) * 0.025);
    dummy.updateMatrix();
    side_wood_grain.setMatrixAt(i, dummy.matrix);
  }
  root.add(side_wood_grain);

  const front_wood_grain = new THREE.InstancedMesh(new THREE.BoxGeometry(0.78, 0.005, 0.006), grainMat, 8);
  for (let i = 0; i < 8; i++) {
    dummy.position.set(((i % 3) - 1) * 0.05, 0.08 + i * 0.035, bodyD / 2 + 0.024);
    dummy.rotation.set(0, 0, ((i % 2) - 0.5) * 0.03);
    dummy.updateMatrix();
    front_wood_grain.setMatrixAt(i, dummy.matrix);
  }
  root.add(front_wood_grain);

  const rounded_edge_geom = new THREE.CylinderGeometry(0.035, 0.035, bodyH * 0.88, 16);
  const left_rounded_corner = new THREE.Mesh(rounded_edge_geom, woodMat);
  left_rounded_corner.position.set(-bodyW / 2 + 0.015, bodyH / 2, bodyD / 2 - 0.015);
  root.add(left_rounded_corner);

  const right_rounded_corner = new THREE.Mesh(rounded_edge_geom, woodMat);
  right_rounded_corner.position.set(bodyW / 2 - 0.015, bodyH / 2, bodyD / 2 - 0.015);
  root.add(right_rounded_corner);

  const top_front_roundover = new THREE.Mesh(new THREE.CylinderGeometry(0.030, 0.030, bodyW * 0.92, 16), woodMat);
  top_front_roundover.rotation.z = Math.PI / 2;
  top_front_roundover.position.set(0, bodyH - 0.035, bodyD / 2 - 0.015);
  root.add(top_front_roundover);

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
  const maxDim = Math.max(size.x, size.y, size.z) || 1;
  const scale = 0.98 / maxDim;
  root.scale.setScalar(scale);
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
