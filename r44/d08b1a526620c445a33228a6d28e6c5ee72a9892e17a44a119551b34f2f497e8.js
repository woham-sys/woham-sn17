// miner-diag: gpus=? tflops=? stream48=? power=? probe_tps=3831 cpu_quota=?/? net=? batch=2 wall=1559 seed=870128282
export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "cane_armchair";

  const woodMat = new THREE.MeshStandardMaterial({
    color: 0x7b421f,
    metalness: 0.0,
    roughness: 0.6,
  });
  const darkWoodMat = new THREE.MeshStandardMaterial({
    color: 0x4b2414,
    metalness: 0.0,
    roughness: 0.6,
  });
  const fabricMat = new THREE.MeshStandardMaterial({
    color: 0xe8e0d1,
    metalness: 0.0,
    roughness: 0.95,
  });
  const seamMat = new THREE.MeshStandardMaterial({
    color: 0xcfc5b4,
    metalness: 0.0,
    roughness: 0.95,
  });
  const caneMat = new THREE.MeshStandardMaterial({
    color: 0xd9b777,
    metalness: 0.0,
    roughness: 0.9,
    side: THREE.DoubleSide,
  });
  const caneDarkMat = new THREE.MeshStandardMaterial({
    color: 0xb98c4f,
    metalness: 0.0,
    roughness: 0.9,
    side: THREE.DoubleSide,
  });

  function makeRoundedRectShape(width, height, radius) {
    const shape = new THREE.Shape();
    const x0 = -width / 2;
    const x1 = width / 2;
    const y0 = -height / 2;
    const y1 = height / 2;
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

  function makeRoundedRectTube(width, depth, radius, y, tubeRadius, material) {
    const points = [];
    const corners = [
      [width / 2 - radius, depth / 2 - radius, 0],
      [-width / 2 + radius, depth / 2 - radius, Math.PI / 2],
      [-width / 2 + radius, -depth / 2 + radius, Math.PI],
      [width / 2 - radius, -depth / 2 + radius, Math.PI * 1.5],
    ];
    for (const corner of corners) {
      for (let i = 0; i <= 4; i++) {
        const angle = corner[2] + i / 4 * Math.PI / 2;
        points.push(new THREE.Vector3(
          corner[0] + Math.cos(angle) * radius,
          y,
          corner[1] + Math.sin(angle) * radius
        ));
      }
    }
    const curve = new THREE.CatmullRomCurve3(points, true, "centripetal");
    return new THREE.Mesh(
      new THREE.TubeGeometry(curve, 64, tubeRadius, 8, true),
      material
    );
  }

  function makeCurvedTube(points, radius, material, segments) {
    const curve = new THREE.CatmullRomCurve3(points, false, "centripetal");
    return new THREE.Mesh(
      new THREE.TubeGeometry(curve, segments, radius, 10, false),
      material
    );
  }

  const pedestalProfile = [
    new THREE.Vector2(0.00, 0.025),
    new THREE.Vector2(0.48, 0.025),
    new THREE.Vector2(0.59, 0.045),
    new THREE.Vector2(0.64, 0.080),
    new THREE.Vector2(0.62, 0.115),
    new THREE.Vector2(0.54, 0.155),
    new THREE.Vector2(0.40, 0.205),
    new THREE.Vector2(0.27, 0.275),
    new THREE.Vector2(0.18, 0.365),
    new THREE.Vector2(0.145, 0.500),
    new THREE.Vector2(0.140, 0.675),
    new THREE.Vector2(0.175, 0.790),
    new THREE.Vector2(0.235, 0.875),
    new THREE.Vector2(0.00, 0.875),
  ];
  const pedestalGeom = new THREE.LatheGeometry(pedestalProfile, 48);
  const pedestal = new THREE.Mesh(pedestalGeom, woodMat);
  pedestal.name = "pedestal";
  root.add(pedestal);

  const pedestal_base_rimGeom = new THREE.TorusGeometry(0.595, 0.018, 10, 48);
  const pedestal_base_rim = new THREE.Mesh(pedestal_base_rimGeom, darkWoodMat);
  pedestal_base_rim.name = "pedestal_base_rim";
  pedestal_base_rim.rotation.x = Math.PI / 2;
  pedestal_base_rim.position.y = 0.075;
  root.add(pedestal_base_rim);

  const pedestal_top_collarGeom = new THREE.TorusGeometry(0.215, 0.018, 10, 32);
  const pedestal_top_collar = new THREE.Mesh(pedestal_top_collarGeom, darkWoodMat);
  pedestal_top_collar.name = "pedestal_top_collar";
  pedestal_top_collar.rotation.x = Math.PI / 2;
  pedestal_top_collar.position.y = 0.855;
  root.add(pedestal_top_collar);

  const seat_platformGeom = new THREE.BoxGeometry(1.36, 0.08, 1.08);
  const seat_platform = new THREE.Mesh(seat_platformGeom, darkWoodMat);
  seat_platform.name = "seat_platform";
  seat_platform.position.set(0, 0.91, 0.02);
  root.add(seat_platform);

  const front_apronGeom = new THREE.BoxGeometry(1.36, 0.20, 0.10);
  const front_apron = new THREE.Mesh(front_apronGeom, woodMat);
  front_apron.name = "front_apron";
  front_apron.position.set(0, 0.82, 0.54);
  root.add(front_apron);

  const rear_apronGeom = new THREE.BoxGeometry(1.30, 0.18, 0.10);
  const rear_apron = new THREE.Mesh(rear_apronGeom, woodMat);
  rear_apron.name = "rear_apron";
  rear_apron.position.set(0, 0.83, -0.50);
  root.add(rear_apron);

  const side_apronGeom = new THREE.BoxGeometry(0.10, 0.19, 1.02);
  const left_side_apron = new THREE.Mesh(side_apronGeom, woodMat);
  left_side_apron.name = "left_side_apron";
  left_side_apron.position.set(-0.65, 0.825, 0.02);
  root.add(left_side_apron);

  const right_side_apron = new THREE.Mesh(side_apronGeom, woodMat);
  right_side_apron.name = "right_side_apron";
  right_side_apron.position.set(0.65, 0.825, 0.02);
  root.add(right_side_apron);

  const front_apron_trimGeom = new THREE.BoxGeometry(1.30, 0.025, 0.018);
  const front_apron_trim = new THREE.Mesh(front_apron_trimGeom, darkWoodMat);
  front_apron_trim.name = "front_apron_trim";
  front_apron_trim.position.set(0, 0.895, 0.596);
  root.add(front_apron_trim);

  const seat_cushionShape = makeRoundedRectShape(1.30, 1.00, 0.11);
  const seat_cushionGeom = new THREE.ExtrudeGeometry(seat_cushionShape, {
    depth: 0.16,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.025,
    bevelSize: 0.025,
    bevelSegments: 3,
    curveSegments: 8,
  });
  const seat_cushion = new THREE.Mesh(seat_cushionGeom, fabricMat);
  seat_cushion.name = "seat_cushion";
  seat_cushion.rotation.x = Math.PI / 2;
  seat_cushion.position.set(0, 1.10, 0.02);
  root.add(seat_cushion);

  const seat_cushion_piping = makeRoundedRectTube(
    1.29, 0.99, 0.105, 1.105, 0.011, seamMat
  );
  seat_cushion_piping.name = "seat_cushion_piping";
  seat_cushion_piping.position.z = 0.02;
  root.add(seat_cushion_piping);

  const seat_cushion_lower_seam = makeRoundedRectTube(
    1.27, 0.97, 0.10, 0.925, 0.008, seamMat
  );
  seat_cushion_lower_seam.name = "seat_cushion_lower_seam";
  seat_cushion_lower_seam.position.z = 0.02;
  root.add(seat_cushion_lower_seam);

  const front_left_leg = makeCurvedTube([
    new THREE.Vector3(-0.59, 0.86, 0.45),
    new THREE.Vector3(-0.60, 0.58, 0.47),
    new THREE.Vector3(-0.64, 0.28, 0.53),
    new THREE.Vector3(-0.70, 0.055, 0.61),
  ], 0.060, woodMat, 24);
  front_left_leg.name = "front_left_leg";
  root.add(front_left_leg);

  const front_right_leg = makeCurvedTube([
    new THREE.Vector3(0.59, 0.86, 0.45),
    new THREE.Vector3(0.60, 0.58, 0.47),
    new THREE.Vector3(0.64, 0.28, 0.53),
    new THREE.Vector3(0.70, 0.055, 0.61),
  ], 0.060, woodMat, 24);
  front_right_leg.name = "front_right_leg";
  root.add(front_right_leg);

  const rear_left_leg = makeCurvedTube([
    new THREE.Vector3(-0.59, 0.86, -0.45),
    new THREE.Vector3(-0.60, 0.58, -0.47),
    new THREE.Vector3(-0.64, 0.28, -0.53),
    new THREE.Vector3(-0.70, 0.055, -0.61),
  ], 0.060, woodMat, 24);
  rear_left_leg.name = "rear_left_leg";
  root.add(rear_left_leg);

  const rear_right_leg = makeCurvedTube([
    new THREE.Vector3(0.59, 0.86, -0.45),
    new THREE.Vector3(0.60, 0.58, -0.47),
    new THREE.Vector3(0.64, 0.28, -0.53),
    new THREE.Vector3(0.70, 0.055, -0.61),
  ], 0.060, woodMat, 24);
  rear_right_leg.name = "rear_right_leg";
  root.add(rear_right_leg);

  const footGeom = new THREE.SphereGeometry(1, 16, 8);
  const feet = new THREE.InstancedMesh(footGeom, darkWoodMat, 4);
  feet.name = "feet";
  const footMatrix = new THREE.Matrix4();
  const footQuat = new THREE.Quaternion();
  const footScale = new THREE.Vector3(0.072, 0.026, 0.082);
  const footPositions = [
    new THREE.Vector3(-0.70, 0.025, 0.61),
    new THREE.Vector3(0.70, 0.025, 0.61),
    new THREE.Vector3(-0.70, 0.025, -0.61),
    new THREE.Vector3(0.70, 0.025, -0.61),
  ];
  for (let i = 0; i < footPositions.length; i++) {
    footMatrix.compose(footPositions[i], footQuat, footScale);
    feet.setMatrixAt(i, footMatrix);
  }
  feet.instanceMatrix.needsUpdate = true;
  root.add(feet);

  const backrest_group = new THREE.Group();
  backrest_group.name = "backrest_group";
  backrest_group.position.set(0, 0.90, -0.50);
  backrest_group.rotation.x = -0.12;
  root.add(backrest_group);

  const back_left_upright = makeCurvedTube([
    new THREE.Vector3(-0.62, 0.00, 0.00),
    new THREE.Vector3(-0.64, 0.48, 0.00),
    new THREE.Vector3(-0.67, 1.02, 0.00),
    new THREE.Vector3(-0.70, 1.50, 0.00),
  ], 0.068, woodMat, 32);
  back_left_upright.name = "back_left_upright";
  backrest_group.add(back_left_upright);

  const back_right_upright = makeCurvedTube([
    new THREE.Vector3(0.62, 0.00, 0.00),
    new THREE.Vector3(0.64, 0.48, 0.00),
    new THREE.Vector3(0.67, 1.02, 0.00),
    new THREE.Vector3(0.70, 1.50, 0.00),
  ], 0.068, woodMat, 32);
  back_right_upright.name = "back_right_upright";
  backrest_group.add(back_right_upright);

  const back_top_rail = makeCurvedTube([
    new THREE.Vector3(-0.66, 1.43, 0.00),
    new THREE.Vector3(-0.34, 1.50, 0.00),
    new THREE.Vector3(0.00, 1.525, 0.00),
    new THREE.Vector3(0.34, 1.50, 0.00),
    new THREE.Vector3(0.66, 1.43, 0.00),
  ], 0.075, woodMat, 32);
  back_top_rail.name = "back_top_rail";
  backrest_group.add(back_top_rail);

  const back_bottom_rail = makeCurvedTube([
    new THREE.Vector3(-0.59, 0.13, 0.00),
    new THREE.Vector3(0.00, 0.105, 0.00),
    new THREE.Vector3(0.59, 0.13, 0.00),
  ], 0.065, woodMat, 24);
  back_bottom_rail.name = "back_bottom_rail";
  backrest_group.add(back_bottom_rail);

  const back_inner_left_trim = makeCurvedTube([
    new THREE.Vector3(-0.515, 0.19, 0.025),
    new THREE.Vector3(-0.535, 0.65, 0.025),
    new THREE.Vector3(-0.555, 1.10, 0.025),
    new THREE.Vector3(-0.575, 1.37, 0.025),
  ], 0.022, darkWoodMat, 24);
  back_inner_left_trim.name = "back_inner_left_trim";
  backrest_group.add(back_inner_left_trim);

  const back_inner_right_trim = makeCurvedTube([
    new THREE.Vector3(0.515, 0.19, 0.025),
    new THREE.Vector3(0.535, 0.65, 0.025),
    new THREE.Vector3(0.555, 1.10, 0.025),
    new THREE.Vector3(0.575, 1.37, 0.025),
  ], 0.022, darkWoodMat, 24);
  back_inner_right_trim.name = "back_inner_right_trim";
  backrest_group.add(back_inner_right_trim);

  const back_inner_top_trim = makeCurvedTube([
    new THREE.Vector3(-0.56, 1.38, 0.025),
    new THREE.Vector3(0.00, 1.425, 0.025),
    new THREE.Vector3(0.56, 1.38, 0.025),
  ], 0.022, darkWoodMat, 20);
  back_inner_top_trim.name = "back_inner_top_trim";
  backrest_group.add(back_inner_top_trim);

  const back_inner_bottom_trim = makeCurvedTube([
    new THREE.Vector3(-0.50, 0.18, 0.025),
    new THREE.Vector3(0.00, 0.16, 0.025),
    new THREE.Vector3(0.50, 0.18, 0.025),
  ], 0.022, darkWoodMat, 20);
  back_inner_bottom_trim.name = "back_inner_bottom_trim";
  backrest_group.add(back_inner_bottom_trim);

  const cane_panelShape = new THREE.Shape();
  cane_panelShape.moveTo(-0.48, 0.20);
  cane_panelShape.lineTo(0.48, 0.20);
  cane_panelShape.lineTo(0.54, 1.36);
  cane_panelShape.quadraticCurveTo(0.00, 1.42, -0.54, 1.36);
  cane_panelShape.lineTo(-0.48, 0.20);

  const cane_panelGeom = new THREE.ShapeGeometry(cane_panelShape, 16);
  const cane_panel = new THREE.Mesh(cane_panelGeom, caneMat);
  cane_panel.name = "cane_panel";
  cane_panel.position.z = 0.012;
  backrest_group.add(cane_panel);

  const cane_strandGeom = new THREE.BoxGeometry(1, 1, 1);
  const strandMatrix = new THREE.Matrix4();
  const strandQuat = new THREE.Quaternion();
  const strandScale = new THREE.Vector3();
  const strandPosition = new THREE.Vector3();
  const zAxis = new THREE.Vector3(0, 0, 1);

  function setStrandInstance(mesh, index, x1, y1, x2, y2, thickness, z) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const length = Math.sqrt(dx * dx + dy * dy);
    strandPosition.set((x1 + x2) / 2, (y1 + y2) / 2, z);
    strandQuat.setFromAxisAngle(zAxis, Math.atan2(dy, dx));
    strandScale.set(length, thickness, 0.008);
    strandMatrix.compose(strandPosition, strandQuat, strandScale);
    mesh.setMatrixAt(index, strandMatrix);
  }

  const verticalCount = 19;
  const cane_vertical_weave = new THREE.InstancedMesh(
    cane_strandGeom, caneDarkMat, verticalCount
  );
  cane_vertical_weave.name = "cane_vertical_weave";
  for (let i = 0; i < verticalCount; i++) {
    const t = i / (verticalCount - 1);
    const x = -0.455 + t * 0.91;
    setStrandInstance(
      cane_vertical_weave, i,
      x, 0.225, x, 1.345, 0.008, 0.026
    );
  }
  cane_vertical_weave.instanceMatrix.needsUpdate = true;
  backrest_group.add(cane_vertical_weave);

  const horizontalCount = 23;
  const cane_horizontal_weave = new THREE.InstancedMesh(
    cane_strandGeom, caneDarkMat, horizontalCount
  );
  cane_horizontal_weave.name = "cane_horizontal_weave";
  for (let i = 0; i < horizontalCount; i++) {
    const t = i / (horizontalCount - 1);
    const y = 0.225 + t * 1.12;
    const halfWidth = 0.465 + t * 0.055;
    setStrandInstance(
      cane_horizontal_weave, i,
      -halfWidth, y, halfWidth, y, 0.007, 0.030
    );
  }
  cane_horizontal_weave.instanceMatrix.needsUpdate = true;
  backrest_group.add(cane_horizontal_weave);

  const diagonalPerDirection = 18;
  const cane_diagonal_weave = new THREE.InstancedMesh(
    cane_strandGeom,
    caneDarkMat,
    diagonalPerDirection * 2
  );
  cane_diagonal_weave.name = "cane_diagonal_weave";
  let diagonalIndex = 0;
  for (const direction of [-1, 1]) {
    for (let i = 0; i < diagonalPerDirection; i++) {
      const t = i / (diagonalPerDirection - 1);
      const x0 = -0.46 + t * 0.34;
      const x1 = x0 + direction * 0.34;
      const y0 = 0.23 + t * 0.34;
      const y1 = y0 + 0.96;
      setStrandInstance(
        cane_diagonal_weave, diagonalIndex++,
        x0, y0, x1, y1, 0.006, 0.034
      );
    }
  }
  cane_diagonal_weave.instanceMatrix.needsUpdate = true;
  backrest_group.add(cane_diagonal_weave);

  const left_armrest = makeCurvedTube([
    new THREE.Vector3(-0.70, 1.47, -0.47),
    new THREE.Vector3(-0.73, 1.46, -0.18),
    new THREE.Vector3(-0.75, 1.43, 0.22),
    new THREE.Vector3(-0.72, 1.40, 0.54),
  ], 0.065, woodMat, 32);
  left_armrest.name = "left_armrest";
  root.add(left_armrest);

  const right_armrest = makeCurvedTube([
    new THREE.Vector3(0.70, 1.47, -0.47),
    new THREE.Vector3(0.73, 1.46, -0.18),
    new THREE.Vector3(0.75, 1.43, 0.22),
    new THREE.Vector3(0.72, 1.40, 0.54),
  ], 0.065, woodMat, 32);
  right_armrest.name = "right_armrest";
  root.add(right_armrest);

  const left_arm_support = makeCurvedTube([
    new THREE.Vector3(-0.64, 0.88, 0.43),
    new THREE.Vector3(-0.68, 1.02, 0.46),
    new THREE.Vector3(-0.71, 1.20, 0.49),
    new THREE.Vector3(-0.72, 1.39, 0.53),
  ], 0.055, woodMat, 24);
  left_arm_support.name = "left_arm_support";
  root.add(left_arm_support);

  const right_arm_support = makeCurvedTube([
    new THREE.Vector3(0.64, 0.88, 0.43),
    new THREE.Vector3(0.68, 1.02, 0.46),
    new THREE.Vector3(0.71, 1.20, 0.49),
    new THREE.Vector3(0.72, 1.39, 0.53),
  ], 0.055, woodMat, 24);
  right_arm_support.name = "right_arm_support";
  root.add(right_arm_support);

  const arm_capGeom = new THREE.SphereGeometry(1, 20, 12);

  const left_arm_front_cap = new THREE.Mesh(arm_capGeom, woodMat);
  left_arm_front_cap.name = "left_arm_front_cap";
  left_arm_front_cap.position.set(-0.72, 1.40, 0.545);
  left_arm_front_cap.scale.set(0.085, 0.070, 0.105);
  root.add(left_arm_front_cap);

  const right_arm_front_cap = new THREE.Mesh(arm_capGeom, woodMat);
  right_arm_front_cap.name = "right_arm_front_cap";
  right_arm_front_cap.position.set(0.72, 1.40, 0.545);
  right_arm_front_cap.scale.set(0.085, 0.070, 0.105);
  root.add(right_arm_front_cap);

  const left_arm_rear_cap = new THREE.Mesh(arm_capGeom, woodMat);
  left_arm_rear_cap.name = "left_arm_rear_cap";
  left_arm_rear_cap.position.set(-0.70, 1.47, -0.47);
  left_arm_rear_cap.scale.set(0.075, 0.065, 0.085);
  root.add(left_arm_rear_cap);

  const right_arm_rear_cap = new THREE.Mesh(arm_capGeom, woodMat);
  right_arm_rear_cap.name = "right_arm_rear_cap";
  right_arm_rear_cap.position.set(0.70, 1.47, -0.47);
  right_arm_rear_cap.scale.set(0.075, 0.065, 0.085);
  root.add(right_arm_rear_cap);

  const arm_inlayGeom = new THREE.SphereGeometry(1, 24, 12);

  const left_arm_inlay = new THREE.Mesh(arm_inlayGeom, caneMat);
  left_arm_inlay.name = "left_arm_inlay";
  left_arm_inlay.position.set(-0.735, 1.515, 0.03);
  left_arm_inlay.scale.set(0.030, 0.009, 0.205);
  root.add(left_arm_inlay);

  const right_arm_inlay = new THREE.Mesh(arm_inlayGeom, caneMat);
  right_arm_inlay.name = "right_arm_inlay";
  right_arm_inlay.position.set(0.735, 1.515, 0.03);
  right_arm_inlay.scale.set(0.030, 0.009, 0.205);
  root.add(right_arm_inlay);

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

  fitToUnitCube(root);
  return root;
}