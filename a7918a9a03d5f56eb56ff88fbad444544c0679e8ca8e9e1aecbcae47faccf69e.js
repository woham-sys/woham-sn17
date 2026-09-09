function __sn17_user(THREE) {
  const root = new THREE.Group();
  const jewelry_case_group = new THREE.Group();
  root.add(jewelry_case_group);

  const polished_silverMat = new THREE.MeshStandardMaterial({
    color: 0xf4f5f6,
    metalness: 0.45,
    roughness: 0.18
  });
  const dark_panelMat = new THREE.MeshStandardMaterial({
    color: 0x292d30,
    metalness: 0.25,
    roughness: 0.48
  });
  const black_channelMat = new THREE.MeshStandardMaterial({
    color: 0x080909,
    metalness: 0.0,
    roughness: 0.8
  });
  const diamondMat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    metalness: 0.0,
    roughness: 0.08,
    transparent: true,
    opacity: 0.92,
    clearcoat: 1.0,
    clearcoatRoughness: 0.04
  });
  const diamond_facetMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    metalness: 0.0,
    roughness: 0.12,
    transparent: true,
    opacity: 0.82
  });
  const diamond_tableMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    metalness: 0.0,
    roughness: 0.06,
    transparent: true,
    opacity: 0.94
  });
  const diamond_shadowMat = new THREE.MeshStandardMaterial({
    color: 0x9aa5ad,
    metalness: 0.0,
    roughness: 0.22,
    transparent: true,
    opacity: 0.55
  });

  function roundedRectShape(width, length, radius) {
    const shape = new THREE.Shape();
    const halfW = width * 0.5;
    const halfL = length * 0.5;
    const r = Math.min(radius, halfW, halfL);

    shape.moveTo(-halfW + r, -halfL);
    shape.lineTo(halfW - r, -halfL);
    shape.quadraticCurveTo(halfW, -halfL, halfW, -halfL + r);
    shape.lineTo(halfW, halfL - r);
    shape.quadraticCurveTo(halfW, halfL, halfW - r, halfL);
    shape.lineTo(-halfW + r, halfL);
    shape.quadraticCurveTo(-halfW, halfL, -halfW, halfL - r);
    shape.lineTo(-halfW, -halfL + r);
    shape.quadraticCurveTo(-halfW, -halfL, -halfW + r, -halfL);
    shape.closePath();
    return shape;
  }

  function roundedExtrudeGeometry(width, length, depth, radius, bevelSize, bevelThickness) {
    const shape = roundedRectShape(width, length, radius);
    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth,
      steps: 1,
      curveSegments: 16,
      bevelEnabled: true,
      bevelSegments: 5,
      bevelSize,
      bevelThickness
    });
    geometry.translate(0, 0, -depth * 0.5);
    return geometry;
  }

  function createGemstoneGeometry(segments) {
    const positions = [];
    const indices = [];

    positions.push(0, 0, 0.18);
    for (let i = 0; i < segments; i++) {
      const angle = i / segments * Math.PI * 2;
      positions.push(Math.cos(angle) * 0.42, Math.sin(angle) * 0.42, 0.18);
    }
    for (let i = 0; i < segments; i++) {
      const angle = i / segments * Math.PI * 2;
      positions.push(Math.cos(angle), Math.sin(angle), 0.02);
    }
    const bottomIndex = 1 + segments * 2;
    positions.push(0, 0, -0.12);

    for (let i = 0; i < segments; i++) {
      const next = (i + 1) % segments;
      const tableA = 1 + i;
      const tableB = 1 + next;
      const girdleA = 1 + segments + i;
      const girdleB = 1 + segments + next;

      indices.push(0, tableA, tableB);
      indices.push(tableA, girdleA, girdleB);
      indices.push(tableA, girdleB, tableB);
      indices.push(bottomIndex, girdleB, girdleA);
    }

    const indexedGeometry = new THREE.BufferGeometry();
    indexedGeometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    );
    indexedGeometry.setIndex(indices);

    const facetedGeometry = indexedGeometry.toNonIndexed();
    facetedGeometry.computeVertexNormals();
    return facetedGeometry;
  }

  const case_shellGeom = roundedExtrudeGeometry(0.62, 2.72, 0.28, 0.27, 0.045, 0.045);
  const case_shell = new THREE.Mesh(case_shellGeom, polished_silverMat);
  case_shell.name = "case_shell";
  jewelry_case_group.add(case_shell);

  const front_lidGeom = roundedExtrudeGeometry(0.54, 2.46, 0.075, 0.20, 0.025, 0.025);
  const front_lid = new THREE.Mesh(front_lidGeom, polished_silverMat);
  front_lid.name = "front_lid";
  front_lid.position.z = 0.145;
  jewelry_case_group.add(front_lid);

  const recessed_panelGeom = roundedExtrudeGeometry(0.39, 2.16, 0.018, 0.075, 0.006, 0.006);
  const recessed_panel = new THREE.Mesh(recessed_panelGeom, dark_panelMat);
  recessed_panel.name = "recessed_panel";
  recessed_panel.position.z = 0.205;
  jewelry_case_group.add(recessed_panel);

  const panel_side_railGeom = new THREE.CylinderGeometry(0.018, 0.018, 2.08, 16);
  const left_panel_rail = new THREE.Mesh(panel_side_railGeom, polished_silverMat);
  left_panel_rail.name = "left_panel_rail";
  left_panel_rail.rotation.x = Math.PI / 2;
  left_panel_rail.position.set(-0.205, 0, 0.228);
  jewelry_case_group.add(left_panel_rail);

  const right_panel_rail = new THREE.Mesh(panel_side_railGeom, polished_silverMat);
  right_panel_rail.name = "right_panel_rail";
  right_panel_rail.rotation.x = Math.PI / 2;
  right_panel_rail.position.set(0.205, 0, 0.228);
  jewelry_case_group.add(right_panel_rail);

  const panel_end_railGeom = new THREE.CylinderGeometry(0.018, 0.018, 0.34, 16);
  const near_panel_rail = new THREE.Mesh(panel_end_railGeom, polished_silverMat);
  near_panel_rail.name = "near_panel_rail";
  near_panel_rail.rotation.z = Math.PI / 2;
  near_panel_rail.position.set(0, -1.045, 0.228);
  jewelry_case_group.add(near_panel_rail);

  const far_panel_rail = new THREE.Mesh(panel_end_railGeom, polished_silverMat);
  far_panel_rail.name = "far_panel_rail";
  far_panel_rail.rotation.z = Math.PI / 2;
  far_panel_rail.position.set(0, 1.045, 0.228);
  jewelry_case_group.add(far_panel_rail);

  const side_channelGeom = new THREE.CylinderGeometry(0.012, 0.012, 2.18, 12);
  const left_side_channel = new THREE.Mesh(side_channelGeom, black_channelMat);
  left_side_channel.name = "left_side_channel";
  left_side_channel.rotation.x = Math.PI / 2;
  left_side_channel.position.set(-0.315, 0, -0.025);
  jewelry_case_group.add(left_side_channel);

  const right_side_channel = new THREE.Mesh(side_channelGeom, black_channelMat);
  right_side_channel.name = "right_side_channel";
  right_side_channel.rotation.x = Math.PI / 2;
  right_side_channel.position.set(0.315, 0, -0.025);
  jewelry_case_group.add(right_side_channel);

  const top_edge_highlightGeom = new THREE.CylinderGeometry(0.011, 0.011, 2.24, 12);
  const left_top_edge_highlight = new THREE.Mesh(top_edge_highlightGeom, polished_silverMat);
  left_top_edge_highlight.name = "left_top_edge_highlight";
  left_top_edge_highlight.rotation.x = Math.PI / 2;
  left_top_edge_highlight.position.set(-0.265, 0, 0.192);
  jewelry_case_group.add(left_top_edge_highlight);

  const right_top_edge_highlight = new THREE.Mesh(top_edge_highlightGeom, polished_silverMat);
  right_top_edge_highlight.name = "right_top_edge_highlight";
  right_top_edge_highlight.rotation.x = Math.PI / 2;
  right_top_edge_highlight.position.set(0.265, 0, 0.192);
  jewelry_case_group.add(right_top_edge_highlight);

  const gemstonePositions = [-0.82, -0.41, 0, 0.41, 0.82];

  const gemstone_settingsGeom = new THREE.TorusGeometry(0.158, 0.012, 8, 32);
  const gemstone_settings = new THREE.InstancedMesh(
    gemstone_settingsGeom,
    polished_silverMat,
    gemstonePositions.length
  );
  gemstone_settings.name = "gemstone_settings";

  const instance_dummy = new THREE.Object3D();
  for (let i = 0; i < gemstonePositions.length; i++) {
    instance_dummy.position.set(0, gemstonePositions[i], 0.232);
    instance_dummy.rotation.set(0, 0, 0);
    instance_dummy.scale.set(1, 1, 1);
    instance_dummy.updateMatrix();
    gemstone_settings.setMatrixAt(i, instance_dummy.matrix);
  }
  gemstone_settings.instanceMatrix.needsUpdate = true;
  jewelry_case_group.add(gemstone_settings);

  const main_gemstonesGeom = createGemstoneGeometry(16);
  const main_gemstones = new THREE.InstancedMesh(
    main_gemstonesGeom,
    diamondMat,
    gemstonePositions.length
  );
  main_gemstones.name = "main_gemstones";

  for (let i = 0; i < gemstonePositions.length; i++) {
    instance_dummy.position.set(0, gemstonePositions[i], 0.245);
    instance_dummy.rotation.set(0, 0, i * Math.PI / 16);
    instance_dummy.scale.set(0.15, 0.15, 0.10);
    instance_dummy.updateMatrix();
    main_gemstones.setMatrixAt(i, instance_dummy.matrix);
  }
  main_gemstones.instanceMatrix.needsUpdate = true;
  jewelry_case_group.add(main_gemstones);

  const gemstone_tablesGeom = new THREE.CircleGeometry(0.063, 16);
  const gemstone_tables = new THREE.InstancedMesh(
    gemstone_tablesGeom,
    diamond_tableMat,
    gemstonePositions.length
  );
  gemstone_tables.name = "gemstone_tables";

  for (let i = 0; i < gemstonePositions.length; i++) {
    instance_dummy.position.set(0, gemstonePositions[i], 0.264);
    instance_dummy.rotation.set(0, 0, i * Math.PI / 16);
    instance_dummy.scale.set(1, 1, 1);
    instance_dummy.updateMatrix();
    gemstone_tables.setMatrixAt(i, instance_dummy.matrix);
  }
  gemstone_tables.instanceMatrix.needsUpdate = true;
  jewelry_case_group.add(gemstone_tables);

  const facetCount = 8;
  const gemstone_facetsGeom = new THREE.BoxGeometry(0.006, 0.095, 0.003);
  const gemstone_facets = new THREE.InstancedMesh(
    gemstone_facetsGeom,
    diamond_facetMat,
    gemstonePositions.length * facetCount
  );
  gemstone_facets.name = "gemstone_facets";

  let facetIndex = 0;
  for (let i = 0; i < gemstonePositions.length; i++) {
    for (let j = 0; j < facetCount; j++) {
      const angle = j / facetCount * Math.PI * 2 + i * Math.PI / 32;
      instance_dummy.position.set(
        Math.cos(angle) * 0.047,
        gemstonePositions[i] + Math.sin(angle) * 0.047,
        0.266
      );
      instance_dummy.rotation.set(0, 0, angle - Math.PI / 2);
      instance_dummy.scale.set(1, 1, 1);
      instance_dummy.updateMatrix();
      gemstone_facets.setMatrixAt(facetIndex++, instance_dummy.matrix);
    }
  }
  gemstone_facets.instanceMatrix.needsUpdate = true;
  jewelry_case_group.add(gemstone_facets);

  const gemstone_shadow_facetsGeom = new THREE.BoxGeometry(0.004, 0.075, 0.002);
  const gemstone_shadow_facets = new THREE.InstancedMesh(
    gemstone_shadow_facetsGeom,
    diamond_shadowMat,
    gemstonePositions.length * facetCount
  );
  gemstone_shadow_facets.name = "gemstone_shadow_facets";

  facetIndex = 0;
  for (let i = 0; i < gemstonePositions.length; i++) {
    for (let j = 0; j < facetCount; j++) {
      const angle = (j + 0.5) / facetCount * Math.PI * 2 + i * Math.PI / 32;
      instance_dummy.position.set(
        Math.cos(angle) * 0.055,
        gemstonePositions[i] + Math.sin(angle) * 0.055,
        0.265
      );
      instance_dummy.rotation.set(0, 0, angle - Math.PI / 2);
      instance_dummy.scale.set(1, 1, 1);
      instance_dummy.updateMatrix();
      gemstone_shadow_facets.setMatrixAt(facetIndex++, instance_dummy.matrix);
    }
  }
  gemstone_shadow_facets.instanceMatrix.needsUpdate = true;
  jewelry_case_group.add(gemstone_shadow_facets);

  const accentPositions = [-0.615, -0.205, 0.205, 0.615];

  const accent_bezelsGeom = new THREE.TorusGeometry(0.043, 0.006, 8, 20);
  const accent_bezels = new THREE.InstancedMesh(
    accent_bezelsGeom,
    polished_silverMat,
    accentPositions.length
  );
  accent_bezels.name = "accent_bezels";

  for (let i = 0; i < accentPositions.length; i++) {
    instance_dummy.position.set(0, accentPositions[i], 0.235);
    instance_dummy.rotation.set(0, 0, 0);
    instance_dummy.scale.set(1, 1, 1);
    instance_dummy.updateMatrix();
    accent_bezels.setMatrixAt(i, instance_dummy.matrix);
  }
  accent_bezels.instanceMatrix.needsUpdate = true;
  jewelry_case_group.add(accent_bezels);

  const accent_stonesGeom = createGemstoneGeometry(12);
  const accent_stones = new THREE.InstancedMesh(
    accent_stonesGeom,
    diamondMat,
    accentPositions.length
  );
  accent_stones.name = "accent_stones";

  for (let i = 0; i < accentPositions.length; i++) {
    instance_dummy.position.set(0, accentPositions[i], 0.245);
    instance_dummy.rotation.set(0, 0, i * Math.PI / 12);
    instance_dummy.scale.set(0.04, 0.04, 0.04);
    instance_dummy.updateMatrix();
    accent_stones.setMatrixAt(i, instance_dummy.matrix);
  }
  accent_stones.instanceMatrix.needsUpdate = true;
  jewelry_case_group.add(accent_stones);

  const micro_pave_count = 32;
  const micro_pave_stonesGeom = new THREE.IcosahedronGeometry(0.012, 0);
  const micro_pave_stones = new THREE.InstancedMesh(
    micro_pave_stonesGeom,
    diamondMat,
    micro_pave_count
  );
  micro_pave_stones.name = "micro_pave_stones";

  let paveIndex = 0;
  for (const side of [-1, 1]) {
    for (let i = 0; i < 16; i++) {
      const y = -0.94 + i * (1.88 / 15);
      const x = side * (0.145 + (i % 2) * 0.012);
      instance_dummy.position.set(x, y, 0.239);
      instance_dummy.rotation.set(0, 0, i * Math.PI / 9);
      instance_dummy.scale.set(1, 1, 0.65);
      instance_dummy.updateMatrix();
      micro_pave_stones.setMatrixAt(paveIndex++, instance_dummy.matrix);
    }
  }
  micro_pave_stones.instanceMatrix.needsUpdate = true;
  jewelry_case_group.add(micro_pave_stones);

  const end_holeGeom = new THREE.CircleGeometry(0.052, 24);
  const end_hole = new THREE.Mesh(end_holeGeom, black_channelMat);
  end_hole.name = "end_hole";
  end_hole.rotation.x = Math.PI / 2;
  end_hole.position.set(0, -1.365, 0);
  jewelry_case_group.add(end_hole);

  const end_hole_rimGeom = new THREE.TorusGeometry(0.055, 0.009, 8, 24);
  const end_hole_rim = new THREE.Mesh(end_hole_rimGeom, polished_silverMat);
  end_hole_rim.name = "end_hole_rim";
  end_hole_rim.rotation.x = Math.PI / 2;
  end_hole_rim.position.set(0, -1.367, 0);
  jewelry_case_group.add(end_hole_rim);

  const hinge_pinGeom = new THREE.CylinderGeometry(0.025, 0.025, 0.36, 16);
  const hinge_pin = new THREE.Mesh(hinge_pinGeom, polished_silverMat);
  hinge_pin.name = "hinge_pin";
  hinge_pin.rotation.z = Math.PI / 2;
  hinge_pin.position.set(0, 1.305, -0.035);
  jewelry_case_group.add(hinge_pin);

  jewelry_case_group.rotation.set(-Math.PI / 2, 0, Math.PI / 4);

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
    const scale = 0.98 / maxDim;
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
