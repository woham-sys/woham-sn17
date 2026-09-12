// miner-diag: gpus=? tflops=? stream48=? power=? probe_tps=3831 cpu_quota=?/? net=? batch=1 wall=1609 seed=870128282
export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "bookcase";

  const cabinet_group = new THREE.Group();
  cabinet_group.name = "cabinet_group";
  root.add(cabinet_group);

  const books_group = new THREE.Group();
  books_group.name = "books_group";
  root.add(books_group);

  const caseW = 1.18;
  const caseD = 0.36;
  const caseTop = 1.82;
  const bayW = 0.455;
  const bayCenters = [-0.27, 0.27];
  const shelfZ = 0.015;
  const shelfDepth = 0.30;
  const shelfThickness = 0.028;
  const shelfLevels = [0.18, 0.43, 0.68, 0.93, 1.18, 1.43];

  const woodMat = new THREE.MeshStandardMaterial({
    color: 0xa97d55,
    metalness: 0.0,
    roughness: 0.6
  });
  const woodEdgeMat = new THREE.MeshStandardMaterial({
    color: 0xb98d63,
    metalness: 0.0,
    roughness: 0.6
  });
  const woodDarkMat = new THREE.MeshStandardMaterial({
    color: 0x60412b,
    metalness: 0.0,
    roughness: 0.6
  });
  const woodGrainMat = new THREE.MeshStandardMaterial({
    color: 0x79543a,
    metalness: 0.0,
    roughness: 0.9
  });
  const pinHoleMat = new THREE.MeshStandardMaterial({
    color: 0x2b2119,
    metalness: 0.0,
    roughness: 0.8
  });

  const bookMats = [
    new THREE.MeshStandardMaterial({ color: 0x8f352d, metalness: 0.0, roughness: 0.7 }),
    new THREE.MeshStandardMaterial({ color: 0x263b4b, metalness: 0.0, roughness: 0.7 }),
    new THREE.MeshStandardMaterial({ color: 0x355540, metalness: 0.0, roughness: 0.7 }),
    new THREE.MeshStandardMaterial({ color: 0xb99b68, metalness: 0.0, roughness: 0.7 }),
    new THREE.MeshStandardMaterial({ color: 0x292724, metalness: 0.0, roughness: 0.7 }),
    new THREE.MeshStandardMaterial({ color: 0xc7b79d, metalness: 0.0, roughness: 0.7 }),
    new THREE.MeshStandardMaterial({ color: 0x596675, metalness: 0.0, roughness: 0.7 }),
    new THREE.MeshStandardMaterial({ color: 0x9b5148, metalness: 0.0, roughness: 0.7 }),
    new THREE.MeshStandardMaterial({ color: 0x425640, metalness: 0.0, roughness: 0.7 }),
    new THREE.MeshStandardMaterial({ color: 0x6b4638, metalness: 0.0, roughness: 0.7 }),
    new THREE.MeshStandardMaterial({ color: 0xd0c7b3, metalness: 0.0, roughness: 0.7 }),
    new THREE.MeshStandardMaterial({ color: 0x1f303c, metalness: 0.0, roughness: 0.7 })
  ];
  const bookBandMat = new THREE.MeshStandardMaterial({
    color: 0xd8cfb8,
    metalness: 0.0,
    roughness: 0.7
  });
  const bookDarkBandMat = new THREE.MeshStandardMaterial({
    color: 0x252321,
    metalness: 0.0,
    roughness: 0.7
  });

  const left_side_panelGeom = new THREE.BoxGeometry(0.07, 1.60, caseD);
  const left_side_panel = new THREE.Mesh(left_side_panelGeom, woodMat);
  left_side_panel.name = "left_side_panel";
  left_side_panel.position.set(-0.555, 0.99, 0);
  cabinet_group.add(left_side_panel);

  const right_side_panelGeom = new THREE.BoxGeometry(0.07, 1.60, caseD);
  const right_side_panel = new THREE.Mesh(right_side_panelGeom, woodMat);
  right_side_panel.name = "right_side_panel";
  right_side_panel.position.set(0.555, 0.99, 0);
  cabinet_group.add(right_side_panel);

  const back_panelGeom = new THREE.BoxGeometry(1.04, 1.56, 0.025);
  const back_panel = new THREE.Mesh(back_panelGeom, woodDarkMat);
  back_panel.name = "back_panel";
  back_panel.position.set(0, 0.98, -0.168);
  cabinet_group.add(back_panel);

  const front_stileGeom = new THREE.BoxGeometry(0.055, 1.58, 0.045);
  const left_front_stile = new THREE.Mesh(front_stileGeom, woodEdgeMat);
  left_front_stile.name = "left_front_stile";
  left_front_stile.position.set(-0.557, 0.99, 0.182);
  cabinet_group.add(left_front_stile);

  const right_front_stile = new THREE.Mesh(front_stileGeom, woodEdgeMat);
  right_front_stile.name = "right_front_stile";
  right_front_stile.position.set(0.557, 0.99, 0.182);
  cabinet_group.add(right_front_stile);

  const center_dividerGeom = new THREE.BoxGeometry(0.045, 1.56, 0.295);
  const center_divider = new THREE.Mesh(center_dividerGeom, woodMat);
  center_divider.name = "center_divider";
  center_divider.position.set(0, 0.98, 0.005);
  cabinet_group.add(center_divider);

  const center_front_trimGeom = new THREE.BoxGeometry(0.052, 1.57, 0.035);
  const center_front_trim = new THREE.Mesh(center_front_trimGeom, woodEdgeMat);
  center_front_trim.name = "center_front_trim";
  center_front_trim.position.set(0, 0.985, 0.174);
  cabinet_group.add(center_front_trim);

  const top_panelGeom = new THREE.BoxGeometry(1.10, 0.06, 0.34);
  const top_panel = new THREE.Mesh(top_panelGeom, woodMat);
  top_panel.name = "top_panel";
  top_panel.position.set(0, 1.775, 0);
  cabinet_group.add(top_panel);

  const bottom_panelGeom = new THREE.BoxGeometry(1.08, 0.055, 0.33);
  const bottom_panel = new THREE.Mesh(bottom_panelGeom, woodMat);
  bottom_panel.name = "bottom_panel";
  bottom_panel.position.set(0, 0.165, 0);
  cabinet_group.add(bottom_panel);

  const shelfGeom = new THREE.BoxGeometry(bayW, shelfThickness, shelfDepth);
  const shelves = new THREE.InstancedMesh(shelfGeom, woodMat, bayCenters.length * shelfLevels.length);
  shelves.name = "shelves";
  const shelfDummy = new THREE.Object3D();
  let shelfIndex = 0;
  for (let b = 0; b < bayCenters.length; b++) {
    for (let s = 0; s < shelfLevels.length; s++) {
      shelfDummy.position.set(bayCenters[b], shelfLevels[s], shelfZ);
      shelfDummy.rotation.set(0, 0, 0);
      shelfDummy.scale.set(1, 1, 1);
      shelfDummy.updateMatrix();
      shelves.setMatrixAt(shelfIndex++, shelfDummy.matrix);
    }
  }
  shelves.instanceMatrix.needsUpdate = true;
  cabinet_group.add(shelves);

  const shelf_front_edgeGeom = new THREE.BoxGeometry(bayW, 0.036, 0.035);
  const shelf_front_edges = new THREE.InstancedMesh(
    shelf_front_edgeGeom,
    woodEdgeMat,
    bayCenters.length * shelfLevels.length
  );
  shelf_front_edges.name = "shelf_front_edges";
  let shelfEdgeIndex = 0;
  for (let b = 0; b < bayCenters.length; b++) {
    for (let s = 0; s < shelfLevels.length; s++) {
      shelfDummy.position.set(bayCenters[b], shelfLevels[s] - 0.002, 0.174);
      shelfDummy.rotation.set(0, 0, 0);
      shelfDummy.scale.set(1, 1, 1);
      shelfDummy.updateMatrix();
      shelf_front_edges.setMatrixAt(shelfEdgeIndex++, shelfDummy.matrix);
    }
  }
  shelf_front_edges.instanceMatrix.needsUpdate = true;
  cabinet_group.add(shelf_front_edges);

  const base_plinthGeom = new THREE.BoxGeometry(1.24, 0.09, 0.40);
  const base_plinth = new THREE.Mesh(base_plinthGeom, woodMat);
  base_plinth.name = "base_plinth";
  base_plinth.position.set(0, 0.045, 0.005);
  cabinet_group.add(base_plinth);

  const base_upper_moldingGeom = new THREE.BoxGeometry(1.20, 0.055, 0.375);
  const base_upper_molding = new THREE.Mesh(base_upper_moldingGeom, woodEdgeMat);
  base_upper_molding.name = "base_upper_molding";
  base_upper_molding.position.set(0, 0.108, 0.002);
  cabinet_group.add(base_upper_molding);

  const base_front_trimGeom = new THREE.BoxGeometry(1.22, 0.035, 0.035);
  const base_front_trim = new THREE.Mesh(base_front_trimGeom, woodEdgeMat);
  base_front_trim.name = "base_front_trim";
  base_front_trim.position.set(0, 0.116, 0.198);
  cabinet_group.add(base_front_trim);

  const crown_lowerGeom = new THREE.BoxGeometry(1.19, 0.055, 0.37);
  const crown_lower = new THREE.Mesh(crown_lowerGeom, woodMat);
  crown_lower.name = "crown_lower";
  crown_lower.position.set(0, 1.805, 0);
  cabinet_group.add(crown_lower);

  const crown_middleGeom = new THREE.BoxGeometry(1.24, 0.055, 0.40);
  const crown_middle = new THREE.Mesh(crown_middleGeom, woodEdgeMat);
  crown_middle.name = "crown_middle";
  crown_middle.position.set(0, 1.852, 0.003);
  cabinet_group.add(crown_middle);

  const crown_topGeom = new THREE.BoxGeometry(1.29, 0.05, 0.43);
  const crown_top = new THREE.Mesh(crown_topGeom, woodMat);
  crown_top.name = "crown_top";
  crown_top.position.set(0, 1.902, 0.004);
  cabinet_group.add(crown_top);

  const crown_front_bandGeom = new THREE.BoxGeometry(1.23, 0.032, 0.035);
  const crown_front_band = new THREE.Mesh(crown_front_bandGeom, woodEdgeMat);
  crown_front_band.name = "crown_front_band";
  crown_front_band.position.set(0, 1.854, 0.207);
  cabinet_group.add(crown_front_band);

  const side_inset_panelGeom = new THREE.BoxGeometry(0.008, 1.34, 0.235);
  const right_side_inset_panel = new THREE.Mesh(side_inset_panelGeom, woodMat);
  right_side_inset_panel.name = "right_side_inset_panel";
  right_side_inset_panel.position.set(0.594, 0.98, -0.005);
  cabinet_group.add(right_side_inset_panel);

  const left_side_inset_panel = new THREE.Mesh(side_inset_panelGeom, woodMat);
  left_side_inset_panel.name = "left_side_inset_panel";
  left_side_inset_panel.position.set(-0.594, 0.98, -0.005);
  cabinet_group.add(left_side_inset_panel);

  const side_vertical_railGeom = new THREE.BoxGeometry(0.014, 1.49, 0.045);
  const right_side_front_rail = new THREE.Mesh(side_vertical_railGeom, woodEdgeMat);
  right_side_front_rail.name = "right_side_front_rail";
  right_side_front_rail.position.set(0.600, 0.98, 0.135);
  cabinet_group.add(right_side_front_rail);

  const right_side_rear_rail = new THREE.Mesh(side_vertical_railGeom, woodEdgeMat);
  right_side_rear_rail.name = "right_side_rear_rail";
  right_side_rear_rail.position.set(0.600, 0.98, -0.135);
  cabinet_group.add(right_side_rear_rail);

  const left_side_front_rail = new THREE.Mesh(side_vertical_railGeom, woodEdgeMat);
  left_side_front_rail.name = "left_side_front_rail";
  left_side_front_rail.position.set(-0.600, 0.98, 0.135);
  cabinet_group.add(left_side_front_rail);

  const left_side_rear_rail = new THREE.Mesh(side_vertical_railGeom, woodEdgeMat);
  left_side_rear_rail.name = "left_side_rear_rail";
  left_side_rear_rail.position.set(-0.600, 0.98, -0.135);
  cabinet_group.add(left_side_rear_rail);

  const side_horizontal_railGeom = new THREE.BoxGeometry(0.014, 0.05, 0.285);
  const right_side_top_rail = new THREE.Mesh(side_horizontal_railGeom, woodEdgeMat);
  right_side_top_rail.name = "right_side_top_rail";
  right_side_top_rail.position.set(0.600, 1.715, 0);
  cabinet_group.add(right_side_top_rail);

  const right_side_bottom_rail = new THREE.Mesh(side_horizontal_railGeom, woodEdgeMat);
  right_side_bottom_rail.name = "right_side_bottom_rail";
  right_side_bottom_rail.position.set(0.600, 0.245, 0);
  cabinet_group.add(right_side_bottom_rail);

  const left_side_top_rail = new THREE.Mesh(side_horizontal_railGeom, woodEdgeMat);
  left_side_top_rail.name = "left_side_top_rail";
  left_side_top_rail.position.set(-0.600, 1.715, 0);
  cabinet_group.add(left_side_top_rail);

  const left_side_bottom_rail = new THREE.Mesh(side_horizontal_railGeom, woodEdgeMat);
  left_side_bottom_rail.name = "left_side_bottom_rail";
  left_side_bottom_rail.position.set(-0.600, 0.245, 0);
  cabinet_group.add(left_side_bottom_rail);

  const pin_holeGeom = new THREE.CylinderGeometry(0.0042, 0.0042, 0.004, 8);
  const pin_holes = new THREE.InstancedMesh(pin_holeGeom, pinHoleMat, 36);
  pin_holes.name = "pin_holes";
  const pinDummy = new THREE.Object3D();
  let pinIndex = 0;
  for (let st = 0; st < 3; st++) {
    const x = st === 0 ? -0.535 : st === 1 ? 0.535 : 0.018;
    for (let i = 0; i < 12; i++) {
      pinDummy.position.set(x, 0.29 + i * 0.12, 0.205);
      pinDummy.rotation.set(Math.PI / 2, 0, 0);
      pinDummy.scale.set(1, 1, 1);
      pinDummy.updateMatrix();
      pin_holes.setMatrixAt(pinIndex++, pinDummy.matrix);
    }
  }
  pin_holes.instanceMatrix.needsUpdate = true;
  cabinet_group.add(pin_holes);

  const back_grainGeom = new THREE.BoxGeometry(0.003, 1.42, 0.002);
  const back_grain = new THREE.InstancedMesh(back_grainGeom, woodGrainMat, 9);
  back_grain.name = "back_grain";
  const grainDummy = new THREE.Object3D();
  for (let i = 0; i < 9; i++) {
    grainDummy.position.set(-0.45 + i * 0.112, 0.98, -0.1535);
    grainDummy.rotation.set(0, 0, 0);
    grainDummy.scale.set(1, 0.88 + (i % 3) * 0.06, 1);
    grainDummy.updateMatrix();
    back_grain.setMatrixAt(i, grainDummy.matrix);
  }
  back_grain.instanceMatrix.needsUpdate = true;
  cabinet_group.add(back_grain);

  const side_grainGeom = new THREE.BoxGeometry(0.002, 1.20, 0.003);
  const side_grain = new THREE.InstancedMesh(side_grainGeom, woodGrainMat, 10);
  side_grain.name = "side_grain";
  for (let i = 0; i < 10; i++) {
    const side = i < 5 ? -1 : 1;
    const j = i % 5;
    grainDummy.position.set(side * 0.599, 0.98, -0.095 + j * 0.047);
    grainDummy.rotation.set(0, 0, 0);
    grainDummy.scale.set(1, 0.88 + (j % 3) * 0.07, 1);
    grainDummy.updateMatrix();
    side_grain.setMatrixAt(i, grainDummy.matrix);
  }
  side_grain.instanceMatrix.needsUpdate = true;
  cabinet_group.add(side_grain);

  const bookRecords = [];
  const bandRecords = [];
  const darkBandRecords = [];

  function addBookRecord(bay, baseY, x, w, h, d, color, rotZ, rotY, rotX) {
    bookRecords.push({
      bay,
      baseY,
      x,
      y: baseY + h / 2,
      w,
      h,
      d,
      color,
      rotZ,
      rotY,
      rotX,
      z: 0.015 + d / 2
    });
  }

  function addBandRecord(record, localY, bandH, dark) {
    const c = Math.cos(record.rotZ);
    const s = Math.sin(record.rotZ);
    const recordPosition = {
      x: record.x + c * localY - s * record.d / 2,
      y: record.y + s * localY + c * record.d / 2,
      z: record.z + 0.004
    };
    const target = dark ? darkBandRecords : bandRecords;
    target.push({
      x: recordPosition.x,
      y: recordPosition.y,
      z: recordPosition.z,
      w: record.w * 0.78,
      h: bandH,
      d: 0.006,
      rotZ: record.rotZ
    });
  }

  function addUprightRun(bay, baseY, startX, count, totalWidth, colorOffset, tilt) {
    const gap = 0.0035;
    const weights = [];
    let weightSum = 0;
    for (let i = 0; i < count; i++) {
      const weight = 0.78 + ((i * 5 + colorOffset) % 7) * 0.085;
      weights.push(weight);
      weightSum += weight;
    }
    const available = totalWidth - gap * (count - 1);
    let cursor = startX;
    for (let i = 0; i < count; i++) {
      const w = available * weights[i] / weightSum;
      const h = 0.185 + ((i * 7 + colorOffset) % 6) * 0.012;
      const d = 0.215 + ((i * 3 + colorOffset) % 4) * 0.010;
      const rotZ = tilt === 0 ? 0 : tilt * (((i + colorOffset) % 3) - 1) * 0.16;
      addBookRecord(bay, baseY, cursor + w / 2, w, h, d, (i * 3 + colorOffset) % bookMats.length, rotZ, 0, 0);
      cursor += w + gap;
    }
  }

  function addHorizontalStack(bay, baseY, x, stackW, count, colorOffset) {
    let cursor = baseY;
    for (let i = 0; i < count; i++) {
      const h = 0.026 + ((i + colorOffset) % 3) * 0.004;
      const d = 0.218 + ((i * 2 + colorOffset) % 3) * 0.009;
      const w = stackW * (0.91 + ((i + colorOffset) % 3) * 0.035);
      addBookRecord(bay, cursor, x, w, h, d, (i * 5 + colorOffset) % bookMats.length, 0, 0, 0);
      cursor += h + 0.002;
    }
  }

  for (let b = 0; b < bayCenters.length; b++) {
    const bay = bayCenters[b];

    addUprightRun(bay, 0.202, -0.420, 12, 0.300, b * 5, 0);
    addUprightRun(bay, 0.452, -0.420, 11, 0.300, b * 7 + 2, 0);
    addUprightRun(bay, 0.702, -0.420, 10, 0.300, b * 9 + 1, 0);
    addUprightRun(bay, 0.952, -0.420, 10, 0.300, b * 11 + 3, 0);
    addUprightRun(bay, 1.202, -0.420, 10, 0.300, b * 13 + 4, 0);
    addUprightRun(bay, 1.452, -0.420, 10, 0.300, b * 15 + 5, 0);

    addUprightRun(bay, 0.202, 0.070, 11, 0.275, b * 4 + 1, 0);
    addUprightRun(bay, 0.452, 0.070, 11, 0.275, b * 6 + 3, 0);
    addUprightRun(bay, 0.702, 0.070, 10, 0.275, b * 8 + 5, 0);
    addUprightRun(bay, 0.952, 0.070, 10, 0.275, b * 10 + 6, 0);
    addUprightRun(bay, 1.202, 0.070, 10, 0.275, b * 12 + 7, 0);
    addUprightRun(bay, 1.452, 0.070, 10, 0.275, b * 14 + 8, 0);

    addHorizontalStack(bay, 0.686, -0.270, 0.285, 5, b * 3 + 1);
    addHorizontalStack(bay, 0.436, -0.270, 0.285, 4, b * 3 + 4);
    addHorizontalStack(bay, 0.936, -0.270, 0.285, 5, b * 3 + 6);
    addHorizontalStack(bay, 0.686, 0.270, 0.265, 4, b * 3 + 2);
    addHorizontalStack(bay, 0.436, 0.270, 0.265, 4, b * 3 + 5);
    addHorizontalStack(bay, 0.936, 0.270, 0.265, 4, b * 3 + 8);
  }

  for (let i = 0; i < bookRecords.length; i++) {
    const record = bookRecords[i];
    if ((i + record.bay) % 3 === 0) {
      addBandRecord(record, -record.h * 0.28, 0.007, false);
    }
    if ((i + record.bay) % 5 === 1) {
      addBandRecord(record, record.h * 0.27, 0.006, false);
    }
    if ((i + record.bay) % 7 === 3) {
      addBandRecord(record, 0, 0.005, true);
    }
  }

  const bookGeom = new THREE.BoxGeometry(1, 1, 1);

  function createBookInstances(records, material, name) {
    const mesh = new THREE.InstancedMesh(bookGeom, material, records.length);
    mesh.name = name;
    const dummy = new THREE.Object3D();
    for (let i = 0; i < records.length; i++) {
      const record = records[i];
      dummy.position.set(record.x, record.y, record.z);
      dummy.rotation.set(record.rotX, record.rotY, record.rotZ);
      dummy.scale.set(record.w, record.h, record.d);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
    return mesh;
  }

  const books_red = createBookInstances(bookRecords.filter(r => r.color === 0), bookMats[0], "books_red");
  const books_navy = createBookInstances(bookRecords.filter(r => r.color === 1), bookMats[1], "books_navy");
  const books_green = createBookInstances(bookRecords.filter(r => r.color === 2), bookMats[2], "books_green");
  const books_tan = createBookInstances(bookRecords.filter(r => r.color === 3), bookMats[3], "books_tan");
  const books_black = createBookInstances(bookRecords.filter(r => r.color === 4), bookMats[4], "books_black");
  const books_cream = createBookInstances(bookRecords.filter(r => r.color === 5), bookMats[5], "books_cream");
  const books_gray = createBookInstances(bookRecords.filter(r => r.color === 6), bookMats[6], "books_gray");
  const books_rust = createBookInstances(bookRecords.filter(r => r.color === 7), bookMats[7], "books_rust");
  const books_olive = createBookInstances(bookRecords.filter(r => r.color === 8), bookMats[8], "books_olive");
  const books_brown = createBookInstances(bookRecords.filter(r => r.color === 9), bookMats[9], "books_brown");
  const books_white = createBookInstances(bookRecords.filter(r => r.color === 10), bookMats[10], "books_white");
  const books_charcoal = createBookInstances(bookRecords.filter(r => r.color === 11), bookMats[11], "books_charcoal");

  books_group.add(
    books_red,
    books_navy,
    books_green,
    books_tan,
    books_black,
    books_cream,
    books_gray,
    books_rust,
    books_olive,
    books_brown,
    books_white,
    books_charcoal
  );

  function createBandInstances(records, material, name) {
    const mesh = new THREE.InstancedMesh(bookGeom, material, records.length);
    mesh.name = name;
    const dummy = new THREE.Object3D();
    for (let i = 0; i < records.length; i++) {
      const record = records[i];
      dummy.position.set(record.x, record.y, record.z);
      dummy.rotation.set(0, 0, record.rotZ);
      dummy.scale.set(record.w, record.h, record.d);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
    return mesh;
  }

  const book_spine_bands = createBandInstances(bandRecords, bookBandMat, "book_spine_bands");
  const book_spine_dark_bands = createBandInstances(darkBandRecords, bookDarkBandMat, "book_spine_dark_bands");
  books_group.add(book_spine_bands, book_spine_dark_bands);

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

  fitToUnitCube(root);
  return root;
}