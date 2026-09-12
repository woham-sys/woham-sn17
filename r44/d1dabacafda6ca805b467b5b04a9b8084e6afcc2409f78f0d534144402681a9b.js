// miner-diag: gpus=? tflops=? stream48=? power=? probe_tps=3831 cpu_quota=?/? net=? batch=2 wall=1559 seed=870128282
export default function generate(THREE) {
  const root = new THREE.Group();
  const watch_group = new THREE.Group();
  watch_group.rotation.z = -0.58;
  root.add(watch_group);

  const brassMat = new THREE.MeshStandardMaterial({
    color: 0xb89445,
    metalness: 0.6,
    roughness: 0.28,
  });
  const polishedBrassMat = new THREE.MeshStandardMaterial({
    color: 0xd4b45f,
    metalness: 0.6,
    roughness: 0.22,
  });
  const darkBrassMat = new THREE.MeshStandardMaterial({
    color: 0x765626,
    metalness: 0.5,
    roughness: 0.45,
  });
  const dialMat = new THREE.MeshStandardMaterial({
    color: 0x747b7d,
    metalness: 0.15,
    roughness: 0.55,
  });
  const dialDarkMat = new THREE.MeshStandardMaterial({
    color: 0x30383b,
    metalness: 0.0,
    roughness: 0.75,
  });
  const blackMat = new THREE.MeshStandardMaterial({
    color: 0x111617,
    metalness: 0.0,
    roughness: 0.8,
  });
  const silverMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25,
  });
  const redMat = new THREE.MeshStandardMaterial({
    color: 0xd84a43,
    metalness: 0.0,
    roughness: 0.45,
    emissive: 0x5a0805,
    emissiveIntensity: 0.25,
  });
  const greenMat = new THREE.MeshStandardMaterial({
    color: 0x35e866,
    metalness: 0.0,
    roughness: 0.4,
    emissive: 0x12a83c,
    emissiveIntensity: 0.8,
  });
  const amberMat = new THREE.MeshStandardMaterial({
    color: 0xffc85a,
    metalness: 0.0,
    roughness: 0.4,
    emissive: 0x8d4e0a,
    emissiveIntensity: 0.45,
  });
  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0xddeedd,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
    opacity: 0.32,
    depthWrite: false,
  });

  const case_bodyProfile = [
    new THREE.Vector2(0.00, -0.17),
    new THREE.Vector2(0.78, -0.17),
    new THREE.Vector2(0.91, -0.145),
    new THREE.Vector2(0.985, -0.075),
    new THREE.Vector2(1.00, 0.015),
    new THREE.Vector2(0.965, 0.095),
    new THREE.Vector2(0.89, 0.145),
    new THREE.Vector2(0.00, 0.145),
  ];
  const case_bodyGeom = new THREE.LatheGeometry(case_bodyProfile, 64);
  const case_body = new THREE.Mesh(case_bodyGeom, brassMat);
  case_body.rotation.x = Math.PI / 2;
  watch_group.add(case_body);

  const case_backGeom = new THREE.CylinderGeometry(0.82, 0.86, 0.025, 64);
  const case_back = new THREE.Mesh(case_backGeom, darkBrassMat);
  case_back.rotation.x = Math.PI / 2;
  case_back.position.z = -0.178;
  watch_group.add(case_back);

  const case_side_grooveGeom = new THREE.TorusGeometry(0.982, 0.009, 8, 64);
  const case_side_groove = new THREE.Mesh(case_side_grooveGeom, darkBrassMat);
  case_side_groove.position.z = -0.075;
  watch_group.add(case_side_groove);

  const case_lugsGeom = new THREE.BoxGeometry(0.15, 0.13, 0.18);
  const case_lugs = new THREE.InstancedMesh(case_lugsGeom, brassMat, 2);
  const lugDummy = new THREE.Object3D();
  for (let i = 0; i < 2; i++) {
    lugDummy.position.set(i === 0 ? -0.22 : 0.22, 0.965, -0.035);
    lugDummy.rotation.set(0, 0, 0);
    lugDummy.updateMatrix();
    case_lugs.setMatrixAt(i, lugDummy.matrix);
  }
  case_lugs.instanceMatrix.needsUpdate = true;
  watch_group.add(case_lugs);

  const crown_stemGeom = new THREE.CylinderGeometry(0.075, 0.075, 0.22, 24);
  const crown_stem = new THREE.Mesh(crown_stemGeom, darkBrassMat);
  crown_stem.position.set(0, 1.015, -0.015);
  watch_group.add(crown_stem);

  const crownGeom = new THREE.CylinderGeometry(0.15, 0.15, 0.14, 32);
  const crown = new THREE.Mesh(crownGeom, brassMat);
  crown.position.set(0, 1.145, -0.015);
  watch_group.add(crown);

  const crown_ridgesGeom = new THREE.BoxGeometry(0.025, 0.145, 0.045);
  const crown_ridges = new THREE.InstancedMesh(crown_ridgesGeom, polishedBrassMat, 20);
  const ridgeDummy = new THREE.Object3D();
  for (let i = 0; i < 20; i++) {
    const angle = i / 20 * Math.PI * 2;
    ridgeDummy.position.set(
      Math.cos(angle) * 0.153,
      1.145,
      -0.015 + Math.sin(angle) * 0.153
    );
    ridgeDummy.rotation.set(0, Math.PI / 2 - angle, 0);
    ridgeDummy.updateMatrix();
    crown_ridges.setMatrixAt(i, ridgeDummy.matrix);
  }
  crown_ridges.instanceMatrix.needsUpdate = true;
  watch_group.add(crown_ridges);

  const crown_capGeom = new THREE.CylinderGeometry(0.12, 0.13, 0.025, 32);
  const crown_cap = new THREE.Mesh(crown_capGeom, polishedBrassMat);
  crown_cap.position.set(0, 1.225, -0.015);
  watch_group.add(crown_cap);

  const bow_loopGeom = new THREE.TorusGeometry(0.25, 0.043, 12, 64);
  const bow_loop = new THREE.Mesh(bow_loopGeom, polishedBrassMat);
  bow_loop.position.set(0, 1.405, -0.055);
  bow_loop.scale.set(1.0, 1.12, 1.0);
  watch_group.add(bow_loop);

  const dialGeom = new THREE.CylinderGeometry(0.835, 0.835, 0.025, 64);
  const dial = new THREE.Mesh(dialGeom, dialMat);
  dial.rotation.x = Math.PI / 2;
  dial.position.z = 0.158;
  watch_group.add(dial);

  const dial_inner_fieldGeom = new THREE.CircleGeometry(0.59, 64);
  const dial_inner_field = new THREE.Mesh(dial_inner_fieldGeom, new THREE.MeshStandardMaterial({
    color: 0x596164,
    metalness: 0.0,
    roughness: 0.7,
  }));
  dial_inner_field.position.z = 0.174;
  watch_group.add(dial_inner_field);

  const dial_scale_ringGeom = new THREE.TorusGeometry(0.705, 0.006, 6, 64);
  const dial_scale_ring = new THREE.Mesh(dial_scale_ringGeom, dialDarkMat);
  dial_scale_ring.position.z = 0.181;
  watch_group.add(dial_scale_ring);

  const minute_ticksGeom = new THREE.BoxGeometry(0.012, 0.055, 0.008);
  const minute_ticks = new THREE.InstancedMesh(minute_ticksGeom, blackMat, 60);
  const tickDummy = new THREE.Object3D();
  for (let i = 0; i < 60; i++) {
    const angle = i / 60 * Math.PI * 2;
    tickDummy.position.set(Math.sin(angle) * 0.765, Math.cos(angle) * 0.765, 0.184);
    tickDummy.rotation.set(0, 0, -angle);
    tickDummy.scale.set(1, 1, 1);
    tickDummy.updateMatrix();
    minute_ticks.setMatrixAt(i, tickDummy.matrix);
  }
  minute_ticks.instanceMatrix.needsUpdate = true;
  watch_group.add(minute_ticks);

  const hour_ticksGeom = new THREE.BoxGeometry(0.025, 0.115, 0.01);
  const hour_ticks = new THREE.InstancedMesh(hour_ticksGeom, blackMat, 12);
  for (let i = 0; i < 12; i++) {
    const angle = i / 12 * Math.PI * 2;
    tickDummy.position.set(Math.sin(angle) * 0.735, Math.cos(angle) * 0.735, 0.188);
    tickDummy.rotation.set(0, 0, -angle);
    tickDummy.scale.set(1, 1, 1);
    tickDummy.updateMatrix();
    hour_ticks.setMatrixAt(i, tickDummy.matrix);
  }
  hour_ticks.instanceMatrix.needsUpdate = true;
  watch_group.add(hour_ticks);

  const numeralMarks = [];
  const digitSegments = {
    "0": ["a", "b", "c", "d", "e", "f"],
    "1": ["b", "c"],
    "2": ["a", "b", "g", "e", "d"],
    "3": ["a", "b", "g", "c", "d"],
    "4": ["f", "g", "b", "c"],
    "5": ["a", "f", "g", "c", "d"],
    "6": ["a", "f", "g", "e", "c", "d"],
    "7": ["a", "b", "c"],
    "8": ["a", "b", "c", "d", "e", "f", "g"],
    "9": ["a", "b", "c", "d", "f", "g"],
  };

  function addDigitMarks(digit, cx, cy, scale) {
    const w = 0.052 * scale;
    const h = 0.09 * scale;
    const t = 0.011 * scale;
    const segments = {
      a: [cx, cy + h / 2, w, t],
      b: [cx + w / 2, cy + h / 4, t, h / 2],
      c: [cx + w / 2, cy - h / 4, t, h / 2],
      d: [cx, cy - h / 2, w, t],
      e: [cx - w / 2, cy - h / 4, t, h / 2],
      f: [cx - w / 2, cy + h / 4, t, h / 2],
      g: [cx, cy, w, t],
    };
    for (const key of digitSegments[digit]) {
      numeralMarks.push(segments[key]);
    }
  }

  for (let hour = 1; hour <= 12; hour++) {
    const angle = hour === 12 ? 0 : hour / 12 * Math.PI * 2;
    const rx = Math.sin(angle) * 0.565;
    const ry = Math.cos(angle) * 0.565;
    const text = String(hour);
    const spacing = 0.067;
    for (let d = 0; d < text.length; d++) {
      addDigitMarks(text[d], rx + (d - (text.length - 1) / 2) * spacing, ry, 0.82);
    }
  }

  const numeral_barsGeom = new THREE.BoxGeometry(1, 1, 1);
  const numeral_bars = new THREE.InstancedMesh(numeral_barsGeom, blackMat, numeralMarks.length);
  const numeralDummy = new THREE.Object3D();
  for (let i = 0; i < numeralMarks.length; i++) {
    const mark = numeralMarks[i];
    numeralDummy.position.set(mark[0], mark[1], 0.191);
    numeralDummy.rotation.set(0, 0, 0);
    numeralDummy.scale.set(mark[2], mark[3], 0.008);
    numeralDummy.updateMatrix();
    numeral_bars.setMatrixAt(i, numeralDummy.matrix);
  }
  numeral_bars.instanceMatrix.needsUpdate = true;
  watch_group.add(numeral_bars);

  const red_indexShape = new THREE.Shape();
  red_indexShape.moveTo(-0.055, -0.035);
  red_indexShape.lineTo(0.055, -0.035);
  red_indexShape.lineTo(0, 0.065);
  red_indexShape.closePath();
  const red_indexGeom = new THREE.ShapeGeometry(red_indexShape);
  const red_index = new THREE.Mesh(red_indexGeom, redMat);
  red_index.position.set(0.29, 0.36, 0.198);
  red_index.rotation.z = -0.45;
  watch_group.add(red_index);

  const green_logo_ringGeom = new THREE.TorusGeometry(0.052, 0.012, 8, 28);
  const green_logo_ring = new THREE.Mesh(green_logo_ringGeom, greenMat);
  green_logo_ring.position.set(0.37, -0.27, 0.2);
  green_logo_ring.scale.set(0.82, 1.0, 1.0);
  watch_group.add(green_logo_ring);

  const green_logo_stemGeom = new THREE.BoxGeometry(0.018, 0.075, 0.009);
  const green_logo_stem = new THREE.Mesh(green_logo_stemGeom, greenMat);
  green_logo_stem.position.set(0.355, -0.27, 0.201);
  green_logo_stem.rotation.z = -0.25;
  watch_group.add(green_logo_stem);

  const amber_logoGeom = new THREE.BoxGeometry(0.09, 0.055, 0.009);
  const amber_logo = new THREE.Mesh(amber_logoGeom, amberMat);
  amber_logo.position.set(-0.23, -0.39, 0.2);
  amber_logo.rotation.z = -0.55;
  watch_group.add(amber_logo);

  const amber_logo_cutoutGeom = new THREE.BoxGeometry(0.045, 0.018, 0.011);
  const amber_logo_cutout = new THREE.Mesh(amber_logo_cutoutGeom, blackMat);
  amber_logo_cutout.position.set(-0.23, -0.39, 0.206);
  amber_logo_cutout.rotation.z = -0.55;
  watch_group.add(amber_logo_cutout);

  const hour_handShape = new THREE.Shape();
  hour_handShape.moveTo(-0.045, -0.12);
  hour_handShape.lineTo(-0.06, 0.08);
  hour_handShape.lineTo(-0.032, 0.36);
  hour_handShape.lineTo(0, 0.47);
  hour_handShape.lineTo(0.032, 0.36);
  hour_handShape.lineTo(0.06, 0.08);
  hour_handShape.lineTo(0.045, -0.12);
  hour_handShape.closePath();
  const hour_handGeom = new THREE.ShapeGeometry(hour_handShape);
  const hour_hand = new THREE.Mesh(hour_handGeom, blackMat);
  hour_hand.position.z = 0.207;
  hour_hand.rotation.z = 0.72;
  watch_group.add(hour_hand);

  const minute_handShape = new THREE.Shape();
  minute_handShape.moveTo(-0.032, -0.13);
  minute_handShape.lineTo(-0.045, 0.10);
  minute_handShape.lineTo(-0.021, 0.57);
  minute_handShape.lineTo(0, 0.69);
  minute_handShape.lineTo(0.021, 0.57);
  minute_handShape.lineTo(0.045, 0.10);
  minute_handShape.lineTo(0.032, -0.13);
  minute_handShape.closePath();
  const minute_handGeom = new THREE.ShapeGeometry(minute_handShape);
  const minute_hand = new THREE.Mesh(minute_handGeom, silverMat);
  minute_hand.position.z = 0.214;
  minute_hand.rotation.z = -0.92;
  watch_group.add(minute_hand);

  const second_handShape = new THREE.Shape();
  second_handShape.moveTo(-0.012, -0.20);
  second_handShape.lineTo(-0.014, 0.51);
  second_handShape.lineTo(0, 0.63);
  second_handShape.lineTo(0.014, 0.51);
  second_handShape.lineTo(0.012, -0.20);
  second_handShape.closePath();
  const second_handGeom = new THREE.ShapeGeometry(second_handShape);
  const second_hand = new THREE.Mesh(second_handGeom, redMat);
  second_hand.position.z = 0.221;
  second_hand.rotation.z = 2.55;
  watch_group.add(second_hand);

  const center_shadowGeom = new THREE.CylinderGeometry(0.105, 0.105, 0.025, 32);
  const center_shadow = new THREE.Mesh(center_shadowGeom, blackMat);
  center_shadow.rotation.x = Math.PI / 2;
  center_shadow.position.z = 0.218;
  watch_group.add(center_shadow);

  const center_brass_ringGeom = new THREE.TorusGeometry(0.083, 0.014, 8, 32);
  const center_brass_ring = new THREE.Mesh(center_brass_ringGeom, polishedBrassMat);
  center_brass_ring.position.z = 0.232;
  watch_group.add(center_brass_ring);

  const center_hubGeom = new THREE.CylinderGeometry(0.071, 0.078, 0.045, 32);
  const center_hub = new THREE.Mesh(center_hubGeom, silverMat);
  center_hub.rotation.x = Math.PI / 2;
  center_hub.position.z = 0.242;
  watch_group.add(center_hub);

  const center_screwGeom = new THREE.CylinderGeometry(0.027, 0.027, 0.012, 20);
  const center_screw = new THREE.Mesh(center_screwGeom, darkBrassMat);
  center_screw.rotation.x = Math.PI / 2;
  center_screw.position.z = 0.271;
  watch_group.add(center_screw);

  const center_screw_slotGeom = new THREE.BoxGeometry(0.038, 0.007, 0.006);
  const center_screw_slot = new THREE.Mesh(center_screw_slotGeom, blackMat);
  center_screw_slot.position.z = 0.279;
  center_screw_slot.rotation.z = 0.35;
  watch_group.add(center_screw_slot);

  const crystalGeom = new THREE.CylinderGeometry(0.84, 0.84, 0.018, 64);
  const crystal = new THREE.Mesh(crystalGeom, glassMat);
  crystal.rotation.x = Math.PI / 2;
  crystal.position.z = 0.286;
  watch_group.add(crystal);

  const outer_bezelGeom = new THREE.TorusGeometry(0.91, 0.075, 16, 72);
  const outer_bezel = new THREE.Mesh(outer_bezelGeom, polishedBrassMat);
  outer_bezel.position.z = 0.205;
  watch_group.add(outer_bezel);

  const inner_bezelGeom = new THREE.TorusGeometry(0.842, 0.021, 10, 64);
  const inner_bezel = new THREE.Mesh(inner_bezelGeom, darkBrassMat);
  inner_bezel.position.z = 0.269;
  watch_group.add(inner_bezel);

  const crystal_edgeGeom = new THREE.TorusGeometry(0.824, 0.011, 8, 64);
  const crystal_edge = new THREE.Mesh(crystal_edgeGeom, silverMat);
  crystal_edge.position.z = 0.285;
  watch_group.add(crystal_edge);

  const case_screwGeom = new THREE.CylinderGeometry(0.025, 0.025, 0.014, 16);
  const case_screw = new THREE.Mesh(case_screwGeom, blackMat);
  const screwAngle = -2.35;
  const screwNormal = new THREE.Vector3(Math.cos(screwAngle), Math.sin(screwAngle), 0).normalize();
  case_screw.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), screwNormal);
  case_screw.position.set(Math.cos(screwAngle) * 0.997, Math.sin(screwAngle) * 0.997, -0.035);
  watch_group.add(case_screw);

  fitToUnitCube(THREE, root);
  return root;
}

function fitToUnitCube(THREE, root) {
  const box = new THREE.Box3().setFromObject(root);
  const size = new THREE.Vector3();
  const center = new THREE.Vector3();
  box.getSize(size);
  box.getCenter(center);
  const maxDim = Math.max(size.x, size.y, size.z) || 1;
  const scale = 0.95 / maxDim;
  root.scale.setScalar(scale);
  root.position.set(-center.x * scale, -center.y * scale, -center.z * scale);
}