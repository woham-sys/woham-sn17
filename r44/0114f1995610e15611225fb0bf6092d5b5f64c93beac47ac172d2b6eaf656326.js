// miner-diag: gpus=? tflops=? stream48=? power=? probe_tps=3831 cpu_quota=?/? net=? batch=2 wall=1559 seed=870128282
export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "ornate_oval_locket";

  const goldMat = new THREE.MeshStandardMaterial({
    color: 0xd8b66a,
    metalness: 0.6,
    roughness: 0.2,
  });
  const highlightGoldMat = new THREE.MeshStandardMaterial({
    color: 0xf0d58d,
    metalness: 0.6,
    roughness: 0.2,
  });
  const recessedGoldMat = new THREE.MeshStandardMaterial({
    color: 0x98713a,
    metalness: 0.5,
    roughness: 0.35,
  });
  const engravingMat = new THREE.MeshStandardMaterial({
    color: 0xf5e4b7,
    metalness: 0.45,
    roughness: 0.25,
  });

  function createOvalTube(rx, ry, z, radius, material, tubularSegments = 72) {
    const points = [];
    for (let i = 0; i < 64; i++) {
      const angle = i / 64 * Math.PI * 2;
      points.push(new THREE.Vector3(
        Math.cos(angle) * rx,
        Math.sin(angle) * ry,
        z
      ));
    }
    const curve = new THREE.CatmullRomCurve3(points, true, "centripetal");
    return new THREE.Mesh(
      new THREE.TubeGeometry(curve, tubularSegments, radius, 10, true),
      material
    );
  }

  function createTube(points, radius, material, tubularSegments = 32) {
    const curve = new THREE.CatmullRomCurve3(points, false, "centripetal");
    return new THREE.Mesh(
      new THREE.TubeGeometry(curve, tubularSegments, radius, 8, false),
      material
    );
  }

  const body_group = new THREE.Group();
  body_group.name = "body_group";
  root.add(body_group);

  const outer_caseGeom = new THREE.CylinderGeometry(1, 1, 0.14, 96);
  const outer_case = new THREE.Mesh(outer_caseGeom, goldMat);
  outer_case.name = "outer_case";
  outer_case.rotation.x = Math.PI / 2;
  outer_case.scale.set(0.72, 1, 1.0);
  body_group.add(outer_case);

  const rear_case_rim = createOvalTube(0.70, 0.98, -0.055, 0.025, recessedGoldMat, 80);
  rear_case_rim.name = "rear_case_rim";
  body_group.add(rear_case_rim);

  const front_inlayGeom = new THREE.CylinderGeometry(1, 1, 0.025, 96);
  const front_inlay = new THREE.Mesh(front_inlayGeom, recessedGoldMat);
  front_inlay.name = "front_inlay";
  front_inlay.rotation.x = Math.PI / 2;
  front_inlay.scale.set(0.675, 0.025, 0.955);
  front_inlay.position.z = 0.073;
  body_group.add(front_inlay);

  const outer_front_rim = createOvalTube(0.695, 0.975, 0.105, 0.026, highlightGoldMat, 88);
  outer_front_rim.name = "outer_front_rim";
  body_group.add(outer_front_rim);

  const outer_shadow_groove = createOvalTube(0.655, 0.925, 0.112, 0.009, recessedGoldMat, 80);
  outer_shadow_groove.name = "outer_shadow_groove";
  body_group.add(outer_shadow_groove);

  const filigree_outer_rail = createOvalTube(0.625, 0.895, 0.128, 0.018, goldMat, 88);
  filigree_outer_rail.name = "filigree_outer_rail";
  body_group.add(filigree_outer_rail);

  const central_medallionGeom = new THREE.CylinderGeometry(1, 1, 0.035, 96);
  const central_medallion = new THREE.Mesh(central_medallionGeom, highlightGoldMat);
  central_medallion.name = "central_medallion";
  central_medallion.rotation.x = Math.PI / 2;
  central_medallion.scale.set(0.455, 0.035, 0.705);
  central_medallion.position.z = 0.105;
  body_group.add(central_medallion);

  const central_bezel_outer = createOvalTube(0.495, 0.755, 0.132, 0.024, goldMat, 88);
  central_bezel_outer.name = "central_bezel_outer";
  body_group.add(central_bezel_outer);

  const central_bezel_inner = createOvalTube(0.455, 0.705, 0.145, 0.010, recessedGoldMat, 80);
  central_bezel_inner.name = "central_bezel_inner";
  body_group.add(central_bezel_inner);

  const central_highlight_rim = createOvalTube(0.438, 0.686, 0.149, 0.006, highlightGoldMat, 80);
  central_highlight_rim.name = "central_highlight_rim";
  body_group.add(central_highlight_rim);

  const filigree_group = new THREE.Group();
  filigree_group.name = "filigree_group";
  body_group.add(filigree_group);

  const scrollPath = [
    new THREE.Vector3(-0.105, -0.105, 0),
    new THREE.Vector3(-0.125, -0.045, 0),
    new THREE.Vector3(-0.105, 0.030, 0),
    new THREE.Vector3(-0.045, 0.090, 0),
    new THREE.Vector3(0.035, 0.105, 0),
    new THREE.Vector3(0.100, 0.070, 0),
    new THREE.Vector3(0.118, 0.010, 0),
    new THREE.Vector3(0.085, -0.045, 0),
    new THREE.Vector3(0.030, -0.055, 0),
    new THREE.Vector3(0.005, -0.018, 0),
    new THREE.Vector3(0.030, 0.018, 0),
    new THREE.Vector3(0.070, 0.015, 0),
  ];
  const filigree_scrollGeom = new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3(scrollPath, false, "centripetal"),
    36,
    0.012,
    8,
    false
  );
  const filigree_scrolls = new THREE.InstancedMesh(filigree_scrollGeom, goldMat, 12);
  filigree_scrolls.name = "filigree_scrolls";

  const scrollDummy = new THREE.Object3D();
  for (let i = 0; i < 12; i++) {
    const angle = i / 12 * Math.PI * 2;
    scrollDummy.position.set(
      Math.cos(angle) * 0.555,
      Math.sin(angle) * 0.825,
      0.143
    );
    scrollDummy.rotation.set(0, 0, angle - Math.PI / 2);
    scrollDummy.scale.set(0.92, 0.92, 1);
    scrollDummy.updateMatrix();
    filigree_scrolls.setMatrixAt(i, scrollDummy.matrix);
  }
  filigree_scrolls.instanceMatrix.needsUpdate = true;
  filigree_group.add(filigree_scrolls);

  const scrollCurlPath = [
    new THREE.Vector3(-0.055, -0.085, 0),
    new THREE.Vector3(-0.085, -0.020, 0),
    new THREE.Vector3(-0.055, 0.055, 0),
    new THREE.Vector3(0.015, 0.080, 0),
    new THREE.Vector3(0.065, 0.045, 0),
    new THREE.Vector3(0.060, -0.010, 0),
    new THREE.Vector3(0.020, -0.030, 0),
  ];
  const filigree_curlGeom = new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3(scrollCurlPath, false, "centripetal"),
    24,
    0.009,
    7,
    false
  );
  const filigree_curls = new THREE.InstancedMesh(filigree_curlGeom, highlightGoldMat, 12);
  filigree_curls.name = "filigree_curls";

  for (let i = 0; i < 12; i++) {
    const angle = i / 12 * Math.PI * 2 + Math.PI / 12;
    scrollDummy.position.set(
      Math.cos(angle) * 0.505,
      Math.sin(angle) * 0.765,
      0.146
    );
    scrollDummy.rotation.set(0, 0, angle - Math.PI / 2);
    scrollDummy.scale.set(0.82, 0.82, 1);
    scrollDummy.updateMatrix();
    filigree_curls.setMatrixAt(i, scrollDummy.matrix);
  }
  filigree_curls.instanceMatrix.needsUpdate = true;
  filigree_group.add(filigree_curls);

  const leafShape = new THREE.Shape();
  leafShape.moveTo(0, 0.095);
  leafShape.bezierCurveTo(0.050, 0.055, 0.055, -0.035, 0, -0.095);
  leafShape.bezierCurveTo(-0.055, -0.035, -0.050, 0.055, 0, 0.095);

  const filigree_leafGeom = new THREE.ExtrudeGeometry(leafShape, {
    depth: 0.012,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.004,
    bevelSize: 0.003,
    bevelSegments: 2,
  });
  const filigree_leaves = new THREE.InstancedMesh(filigree_leafGeom, goldMat, 24);
  filigree_leaves.name = "filigree_leaves";

  const leafDummy = new THREE.Object3D();
  let leafIndex = 0;
  for (let i = 0; i < 12; i++) {
    const angle = i / 12 * Math.PI * 2;
    const nx = Math.cos(angle);
    const ny = Math.sin(angle);
    const tx = -ny;
    const ty = nx;
    const baseX = nx * 0.535;
    const baseY = ny * 0.805;

    for (const side of [-1, 1]) {
      leafDummy.position.set(
        baseX + tx * side * 0.038,
        baseY + ty * side * 0.038,
        0.139
      );
      leafDummy.rotation.set(0, 0, angle - Math.PI / 2 + side * 0.58);
      leafDummy.scale.set(0.82, 0.82, 1);
      leafDummy.updateMatrix();
      filigree_leaves.setMatrixAt(leafIndex++, leafDummy.matrix);
    }
  }
  filigree_leaves.instanceMatrix.needsUpdate = true;
  filigree_group.add(filigree_leaves);

  const cardinalLeafShape = new THREE.Shape();
  cardinalLeafShape.moveTo(0, 0.145);
  cardinalLeafShape.bezierCurveTo(0.025, 0.085, 0.070, 0.035, 0.055, -0.020);
  cardinalLeafShape.bezierCurveTo(0.040, -0.070, 0.015, -0.100, 0, -0.125);
  cardinalLeafShape.bezierCurveTo(-0.015, -0.100, -0.040, -0.070, -0.055, -0.020);
  cardinalLeafShape.bezierCurveTo(-0.070, 0.035, -0.025, 0.085, 0, 0.145);

  const cardinal_leafGeom = new THREE.ExtrudeGeometry(cardinalLeafShape, {
    depth: 0.014,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.004,
    bevelSize: 0.003,
    bevelSegments: 2,
  });
  const cardinal_leaves = new THREE.InstancedMesh(cardinal_leafGeom, highlightGoldMat, 12);
  cardinal_leaves.name = "cardinal_leaves";

  let cardinalIndex = 0;
  for (const cardinalAngle of [0, Math.PI / 2, Math.PI, Math.PI * 1.5]) {
    const nx = Math.cos(cardinalAngle);
    const ny = Math.sin(cardinalAngle);
    const tx = -ny;
    const ty = nx;
    const baseX = nx * 0.535;
    const baseY = ny * 0.805;

    for (let j = -1; j <= 1; j++) {
      leafDummy.position.set(
        baseX + tx * j * 0.038,
        baseY + ty * j * 0.038,
        0.142
      );
      leafDummy.rotation.set(0, 0, cardinalAngle - Math.PI / 2 - j * 0.30);
      leafDummy.scale.set(j === 0 ? 1.0 : 0.72, j === 0 ? 1.0 : 0.78, 1);
      leafDummy.updateMatrix();
      cardinal_leaves.setMatrixAt(cardinalIndex++, leafDummy.matrix);
    }
  }
  cardinal_leaves.instanceMatrix.needsUpdate = true;
  filigree_group.add(cardinal_leaves);

  const filigree_beadGeom = new THREE.SphereGeometry(0.018, 12, 8);
  const filigree_beads = new THREE.InstancedMesh(filigree_beadGeom, highlightGoldMat, 12);
  filigree_beads.name = "filigree_beads";

  const beadDummy = new THREE.Object3D();
  for (let i = 0; i < 12; i++) {
    const angle = (i + 0.5) / 12 * Math.PI * 2;
    beadDummy.position.set(
      Math.cos(angle) * 0.585,
      Math.sin(angle) * 0.855,
      0.151
    );
    beadDummy.rotation.set(0, 0, 0);
    beadDummy.scale.set(1, 1, 0.55);
    beadDummy.updateMatrix();
    filigree_beads.setMatrixAt(i, beadDummy.matrix);
  }
  filigree_beads.instanceMatrix.needsUpdate = true;
  filigree_group.add(filigree_beads);

  const engraving_group = new THREE.Group();
  engraving_group.name = "engraving_group";
  body_group.add(engraving_group);

  const snowflakeData = [
    [0.00, 0.02, 0.085, 0.10],
    [-0.22, 0.34, 0.060, 0.35],
    [0.23, 0.36, 0.055, -0.20],
    [-0.29, 0.10, 0.050, 0.15],
    [0.29, 0.08, 0.055, 0.45],
    [-0.23, -0.27, 0.065, -0.15],
    [0.22, -0.30, 0.070, 0.25],
    [0.00, -0.50, 0.075, 0.05],
    [-0.34, -0.08, 0.040, 0.30],
    [0.34, -0.12, 0.040, -0.25],
    [-0.12, 0.50, 0.045, 0.10],
    [0.13, 0.50, 0.043, -0.10],
    [-0.32, 0.27, 0.038, 0.40],
    [0.32, 0.25, 0.038, -0.35],
    [-0.10, -0.16, 0.040, 0.20],
    [0.11, -0.17, 0.038, -0.20],
    [-0.31, -0.36, 0.035, 0.10],
    [0.31, -0.39, 0.035, 0.40],
  ];

  const snowflake_armGeom = new THREE.CylinderGeometry(0.0038, 0.0038, 1, 6);
  const snowflake_arms = new THREE.InstancedMesh(
    snowflake_armGeom,
    engravingMat,
    snowflakeData.length * 6
  );
  snowflake_arms.name = "snowflake_arms";

  const snowflakeDummy = new THREE.Object3D();
  let snowflakeArmIndex = 0;
  for (const flake of snowflakeData) {
    const x = flake[0];
    const y = flake[1];
    const size = flake[2];
    const rotation = flake[3];

    for (let i = 0; i < 6; i++) {
      const angle = rotation + i / 6 * Math.PI * 2;
      snowflakeDummy.position.set(
        x + Math.cos(angle) * size * 0.5,
        y + Math.sin(angle) * size * 0.5,
        0.151
      );
      snowflakeDummy.rotation.set(0, 0, angle - Math.PI / 2);
      snowflakeDummy.scale.set(1, size, 1);
      snowflakeDummy.updateMatrix();
      snowflake_arms.setMatrixAt(snowflakeArmIndex++, snowflakeDummy.matrix);
    }
  }
  snowflake_arms.instanceMatrix.needsUpdate = true;
  engraving_group.add(snowflake_arms);

  const snowflake_branchGeom = new THREE.CylinderGeometry(0.0028, 0.0028, 1, 6);
  const snowflake_branches = new THREE.InstancedMesh(
    snowflake_branchGeom,
    engravingMat,
    snowflakeData.length * 12
  );
  snowflake_branches.name = "snowflake_branches";

  let branchIndex = 0;
  for (const flake of snowflakeData) {
    const x = flake[0];
    const y = flake[1];
    const size = flake[2];
    const rotation = flake[3];

    for (let i = 0; i < 6; i++) {
      const angle = rotation + i / 6 * Math.PI * 2;
      const dx = Math.cos(angle);
      const dy = Math.sin(angle);
      const px = -dy;
      const py = dx;
      const baseX = x + dx * size * 0.62;
      const baseY = y + dy * size * 0.62;

      for (const side of [-1, 1]) {
        snowflakeDummy.position.set(
          baseX + px * side * size * 0.075,
          baseY + py * side * size * 0.075,
          0.152
        );
        snowflakeDummy.rotation.set(
          0,
          0,
          angle - Math.PI / 2 + side * Math.PI / 4
        );
        snowflakeDummy.scale.set(1, size * 0.28, 1);
        snowflakeDummy.updateMatrix();
        snowflake_branches.setMatrixAt(branchIndex++, snowflakeDummy.matrix);
      }
    }
  }
  snowflake_branches.instanceMatrix.needsUpdate = true;
  engraving_group.add(snowflake_branches);

  const snowflake_centerGeom = new THREE.CircleGeometry(0.009, 12);
  const snowflake_centers = new THREE.InstancedMesh(
    snowflake_centerGeom,
    engravingMat,
    snowflakeData.length
  );
  snowflake_centers.name = "snowflake_centers";

  for (let i = 0; i < snowflakeData.length; i++) {
    const flake = snowflakeData[i];
    snowflakeDummy.position.set(flake[0], flake[1], 0.153);
    snowflakeDummy.rotation.set(0, 0, 0);
    snowflakeDummy.scale.setScalar(flake[2] / 0.06);
    snowflakeDummy.updateMatrix();
    snowflake_centers.setMatrixAt(i, snowflakeDummy.matrix);
  }
  snowflake_centers.instanceMatrix.needsUpdate = true;
  engraving_group.add(snowflake_centers);

  const engraved_vines = new THREE.Group();
  engraved_vines.name = "engraved_vines";
  engraving_group.add(engraved_vines);

  const vinePaths = [
    [
      new THREE.Vector3(-0.34, 0.43, 0.151),
      new THREE.Vector3(-0.27, 0.48, 0.151),
      new THREE.Vector3(-0.18, 0.46, 0.151),
      new THREE.Vector3(-0.12, 0.40, 0.151),
    ],
    [
      new THREE.Vector3(0.12, 0.43, 0.151),
      new THREE.Vector3(0.20, 0.49, 0.151),
      new THREE.Vector3(0.29, 0.45, 0.151),
      new THREE.Vector3(0.34, 0.37, 0.151),
    ],
    [
      new THREE.Vector3(-0.36, -0.28, 0.151),
      new THREE.Vector3(-0.29, -0.39, 0.151),
      new THREE.Vector3(-0.18, -0.43, 0.151),
      new THREE.Vector3(-0.08, -0.39, 0.151),
    ],
    [
      new THREE.Vector3(0.08, -0.40, 0.151),
      new THREE.Vector3(0.17, -0.46, 0.151),
      new THREE.Vector3(0.28, -0.42, 0.151),
      new THREE.Vector3(0.34, -0.33, 0.151),
    ],
    [
      new THREE.Vector3(-0.06, 0.54, 0.151),
      new THREE.Vector3(-0.02, 0.47, 0.151),
      new THREE.Vector3(0.04, 0.43, 0.151),
      new THREE.Vector3(0.08, 0.47, 0.151),
    ],
    [
      new THREE.Vector3(-0.35, 0.02, 0.151),
      new THREE.Vector3(-0.31, 0.08, 0.151),
      new THREE.Vector3(-0.27, 0.04, 0.151),
      new THREE.Vector3(-0.24, -0.03, 0.151),
    ],
    [
      new THREE.Vector3(0.30, -0.05, 0.151),
      new THREE.Vector3(0.35, 0.01, 0.151),
      new THREE.Vector3(0.32, 0.08, 0.151),
      new THREE.Vector3(0.27, 0.10, 0.151),
    ],
  ];

  for (let i = 0; i < vinePaths.length; i++) {
    const engraved_vine = createTube(vinePaths[i], 0.0032, engravingMat, 20);
    engraved_vine.name = "engraved_vine_" + i;
    engraved_vines.add(engraved_vine);
  }

  const engraved_leafGeom = new THREE.CircleGeometry(0.018, 12);
  const engraved_leaves = new THREE.InstancedMesh(engraved_leafGeom, engravingMat, 18);
  engraved_leaves.name = "engraved_leaves";

  const engravedLeafData = [
    [-0.29, 0.46, -0.7], [-0.22, 0.47, 0.8],
    [0.18, 0.47, -0.8], [0.27, 0.44, 0.7],
    [-0.30, -0.36, 0.7], [-0.21, -0.42, -0.8],
    [0.16, -0.44, 0.8], [0.27, -0.40, -0.7],
    [-0.04, 0.49, -0.5], [0.05, 0.45, 0.6],
    [-0.32, 0.06, 0.5], [-0.27, 0.02, -0.6],
    [0.33, 0.02, -0.5], [0.30, 0.08, 0.6],
    [-0.35, 0.31, 0.4], [-0.33, -0.18, -0.4],
    [0.34, 0.18, -0.4], [0.32, -0.22, 0.4],
  ];

  for (let i = 0; i < engravedLeafData.length; i++) {
    const data = engravedLeafData[i];
    snowflakeDummy.position.set(data[0], data[1], 0.153);
    snowflakeDummy.rotation.set(0, 0, data[2]);
    snowflakeDummy.scale.set(1.45, 0.52, 1);
    snowflakeDummy.updateMatrix();
    engraved_leaves.setMatrixAt(i, snowflakeDummy.matrix);
  }
  engraved_leaves.instanceMatrix.needsUpdate = true;
  engraving_group.add(engraved_leaves);

  const side_hardware_group = new THREE.Group();
  side_hardware_group.name = "side_hardware_group";
  root.add(side_hardware_group);

  const side_hingeGeom = new THREE.CylinderGeometry(0.072, 0.072, 0.25, 24);
  const side_hinges = new THREE.InstancedMesh(side_hingeGeom, goldMat, 2);
  side_hinges.name = "side_hinges";

  const hardwareDummy = new THREE.Object3D();
  for (let i = 0; i < 2; i++) {
    const side = i === 0 ? -1 : 1;
    hardwareDummy.position.set(side * 0.745, -0.015, 0);
    hardwareDummy.rotation.set(0, 0, 0);
    hardwareDummy.scale.set(1, 1, 1);
    hardwareDummy.updateMatrix();
    side_hinges.setMatrixAt(i, hardwareDummy.matrix);
  }
  side_hinges.instanceMatrix.needsUpdate = true;
  side_hardware_group.add(side_hinges);

  const side_hinge_capGeom = new THREE.CylinderGeometry(0.082, 0.082, 0.025, 24);
  const side_hinge_caps = new THREE.InstancedMesh(side_hinge_capGeom, highlightGoldMat, 4);
  side_hinge_caps.name = "side_hinge_caps";

  let capIndex = 0;
  for (const side of [-1, 1]) {
    for (const y of [-0.142, 0.112]) {
      hardwareDummy.position.set(side * 0.745, y, 0);
      hardwareDummy.rotation.set(0, 0, 0);
      hardwareDummy.scale.set(1, 1, 1);
      hardwareDummy.updateMatrix();
      side_hinge_caps.setMatrixAt(capIndex++, hardwareDummy.matrix);
    }
  }
  side_hinge_caps.instanceMatrix.needsUpdate = true;
  side_hardware_group.add(side_hinge_caps);

  const side_hinge_ridgeGeom = new THREE.TorusGeometry(0.073, 0.006, 6, 24);
  const side_hinge_ridges = new THREE.InstancedMesh(side_hinge_ridgeGeom, recessedGoldMat, 10);
  side_hinge_ridges.name = "side_hinge_ridges";

  let ridgeIndex = 0;
  for (const side of [-1, 1]) {
    for (let i = 0; i < 5; i++) {
      hardwareDummy.position.set(side * 0.745, -0.105 + i * 0.047, 0);
      hardwareDummy.rotation.set(Math.PI / 2, 0, 0);
      hardwareDummy.scale.set(1, 1, 1);
      hardwareDummy.updateMatrix();
      side_hinge_ridges.setMatrixAt(ridgeIndex++, hardwareDummy.matrix);
    }
  }
  side_hinge_ridges.instanceMatrix.needsUpdate = true;
  side_hardware_group.add(side_hinge_ridges);

  const bail_group = new THREE.Group();
  bail_group.name = "bail_group";
  root.add(bail_group);

  const bailConnectorShape = new THREE.Shape();
  bailConnectorShape.moveTo(-0.105, 0);
  bailConnectorShape.bezierCurveTo(-0.095, 0.055, -0.075, 0.105, -0.050, 0.135);
  bailConnectorShape.lineTo(0.050, 0.135);
  bailConnectorShape.bezierCurveTo(0.075, 0.105, 0.095, 0.055, 0.105, 0);
  bailConnectorShape.lineTo(0.055, -0.018);
  bailConnectorShape.lineTo(-0.055, -0.018);
  bailConnectorShape.closePath();

  const bail_connectorGeom = new THREE.ExtrudeGeometry(bailConnectorShape, {
    depth: 0.10,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.012,
    bevelSize: 0.008,
    bevelSegments: 3,
  });
  const bail_connector = new THREE.Mesh(bail_connectorGeom, goldMat);
  bail_connector.name = "bail_connector";
  bail_connector.position.set(0, 1.0, -0.03);
  bail_group.add(bail_connector);

  const bailOuterPath = [
    new THREE.Vector3(0, 1.045, 0.075),
    new THREE.Vector3(-0.075, 1.105, 0.075),
    new THREE.Vector3(-0.145, 1.245, 0.075),
    new THREE.Vector3(-0.165, 1.390, 0.075),
    new THREE.Vector3(-0.125, 1.515, 0.075),
    new THREE.Vector3(-0.055, 1.585, 0.075),
    new THREE.Vector3(0, 1.605, 0.075),
    new THREE.Vector3(0.055, 1.585, 0.075),
    new THREE.Vector3(0.125, 1.515, 0.075),
    new THREE.Vector3(0.165, 1.390, 0.075),
    new THREE.Vector3(0.145, 1.245, 0.075),
    new THREE.Vector3(0.075, 1.105, 0.075),
  ];
  const bail_outer = createTube(bailOuterPath, 0.043, highlightGoldMat, 64);
  bail_outer.name = "bail_outer";
  bail_group.add(bail_outer);

  const bailInnerPath = [
    new THREE.Vector3(0, 1.125, 0.078),
    new THREE.Vector3(-0.050, 1.175, 0.078),
    new THREE.Vector3(-0.095, 1.285, 0.078),
    new THREE.Vector3(-0.105, 1.390, 0.078),
    new THREE.Vector3(-0.075, 1.470, 0.078),
    new THREE.Vector3(0, 1.515, 0.078),
    new THREE.Vector3(0.075, 1.470, 0.078),
    new THREE.Vector3(0.105, 1.390, 0.078),
    new THREE.Vector3(0.095, 1.285, 0.078),
    new THREE.Vector3(0.050, 1.175, 0.078),
  ];
  const bail_inner_shadow = createTube(bailInnerPath, 0.012, recessedGoldMat, 48);
  bail_inner_shadow.name = "bail_inner_shadow";
  bail_group.add(bail_inner_shadow);

  const bail_jump_ringGeom = new THREE.TorusGeometry(0.055, 0.014, 10, 32);
  const bail_jump_ring = new THREE.Mesh(bail_jump_ringGeom, goldMat);
  bail_jump_ring.name = "bail_jump_ring";
  bail_jump_ring.position.set(0, 1.145, 0.092);
  bail_group.add(bail_jump_ring);

  const bail_jump_ring_highlightGeom = new THREE.TorusGeometry(0.055, 0.006, 8, 32);
  const bail_jump_ring_highlight = new THREE.Mesh(bail_jump_ring_highlightGeom, highlightGoldMat);
  bail_jump_ring_highlight.name = "bail_jump_ring_highlight";
  bail_jump_ring_highlight.position.set(0, 1.145, 0.108);
  bail_group.add(bail_jump_ring_highlight);

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