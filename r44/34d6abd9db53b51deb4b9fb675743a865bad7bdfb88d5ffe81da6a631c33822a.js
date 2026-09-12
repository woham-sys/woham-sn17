// miner-diag: gpus=? tflops=? stream48=? power=? probe_tps=3831 cpu_quota=?/? net=? batch=2 wall=1559 seed=870128282
export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "antique_lantern";

  const cast_ironMat = new THREE.MeshStandardMaterial({
    color: 0x292724,
    metalness: 0.45,
    roughness: 0.82,
  });
  const dark_ironMat = new THREE.MeshStandardMaterial({
    color: 0x20201e,
    metalness: 0.5,
    roughness: 0.72,
  });
  const rustMat = new THREE.MeshStandardMaterial({
    color: 0x6b3b24,
    metalness: 0.2,
    roughness: 0.9,
  });
  const woodMat = new THREE.MeshStandardMaterial({
    color: 0x7b4a2a,
    metalness: 0.0,
    roughness: 0.6,
  });
  const wood_grainMat = new THREE.MeshStandardMaterial({
    color: 0x382116,
    metalness: 0.0,
    roughness: 0.9,
  });
  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0xffe2bd,
    metalness: 0.0,
    roughness: 0.4,
    transmission: 0.7,
    ior: 1.5,
    transparent: true,
    opacity: 0.62,
    side: THREE.DoubleSide,
    depthWrite: false,
  });
  const brassMat = new THREE.MeshStandardMaterial({
    color: 0x9b6428,
    metalness: 0.5,
    roughness: 0.45,
  });
  const outer_flameMat = new THREE.MeshStandardMaterial({
    color: 0xff8a18,
    emissive: 0xff8a18,
    emissiveIntensity: 1.0,
    metalness: 0.0,
    roughness: 0.5,
    transparent: true,
    opacity: 0.72,
    depthWrite: false,
  });
  const inner_flameMat = new THREE.MeshStandardMaterial({
    color: 0xfff2a0,
    emissive: 0xffd34e,
    emissiveIntensity: 1.0,
    metalness: 0.0,
    roughness: 0.5,
  });
  const blue_flameMat = new THREE.MeshStandardMaterial({
    color: 0x6268ff,
    emissive: 0x6268ff,
    emissiveIntensity: 1.0,
    metalness: 0.0,
    roughness: 0.5,
    transparent: true,
    opacity: 0.75,
    depthWrite: false,
  });

  const base_reservoirProfile = [
    new THREE.Vector2(0.00, 0.00),
    new THREE.Vector2(0.38, 0.00),
    new THREE.Vector2(0.44, 0.025),
    new THREE.Vector2(0.47, 0.065),
    new THREE.Vector2(0.46, 0.11),
    new THREE.Vector2(0.41, 0.15),
    new THREE.Vector2(0.40, 0.34),
    new THREE.Vector2(0.37, 0.43),
    new THREE.Vector2(0.30, 0.50),
    new THREE.Vector2(0.18, 0.54),
    new THREE.Vector2(0.00, 0.55),
  ];
  const base_reservoirGeom = new THREE.LatheGeometry(base_reservoirProfile, 48);
  const base_reservoir = new THREE.Mesh(base_reservoirGeom, cast_ironMat);
  base_reservoir.name = "base_reservoir";
  root.add(base_reservoir);

  const base_bottom_rimGeom = new THREE.TorusGeometry(0.425, 0.025, 10, 48);
  const base_bottom_rim = new THREE.Mesh(base_bottom_rimGeom, rustMat);
  base_bottom_rim.name = "base_bottom_rim";
  base_bottom_rim.rotation.x = Math.PI / 2;
  base_bottom_rim.position.y = 0.065;
  root.add(base_bottom_rim);

  const base_upper_seamGeom = new THREE.TorusGeometry(0.395, 0.012, 8, 48);
  const base_upper_seam = new THREE.Mesh(base_upper_seamGeom, dark_ironMat);
  base_upper_seam.name = "base_upper_seam";
  base_upper_seam.rotation.x = Math.PI / 2;
  base_upper_seam.position.y = 0.15;
  root.add(base_upper_seam);

  const burner_collarGeom = new THREE.CylinderGeometry(0.15, 0.17, 0.12, 32);
  const burner_collar = new THREE.Mesh(burner_collarGeom, cast_ironMat);
  burner_collar.name = "burner_collar";
  burner_collar.position.y = 0.57;
  root.add(burner_collar);

  const burner_collar_ringGeom = new THREE.TorusGeometry(0.145, 0.018, 8, 32);
  const burner_collar_ring = new THREE.Mesh(burner_collar_ringGeom, rustMat);
  burner_collar_ring.name = "burner_collar_ring";
  burner_collar_ring.rotation.x = Math.PI / 2;
  burner_collar_ring.position.y = 0.625;
  root.add(burner_collar_ring);

  const wick_adjuster_shaftGeom = new THREE.CylinderGeometry(0.022, 0.022, 0.15, 16);
  const wick_adjuster_shaft = new THREE.Mesh(wick_adjuster_shaftGeom, dark_ironMat);
  wick_adjuster_shaft.name = "wick_adjuster_shaft";
  wick_adjuster_shaft.rotation.z = Math.PI / 2;
  wick_adjuster_shaft.position.set(0.18, 0.57, 0.02);
  root.add(wick_adjuster_shaft);

  const wick_adjuster_knobGeom = new THREE.CylinderGeometry(0.045, 0.045, 0.025, 18);
  const wick_adjuster_knob = new THREE.Mesh(wick_adjuster_knobGeom, rustMat);
  wick_adjuster_knob.name = "wick_adjuster_knob";
  wick_adjuster_knob.rotation.z = Math.PI / 2;
  wick_adjuster_knob.position.set(0.265, 0.57, 0.02);
  root.add(wick_adjuster_knob);

  const burner_dishGeom = new THREE.CylinderGeometry(0.20, 0.22, 0.055, 32);
  const burner_dish = new THREE.Mesh(burner_dishGeom, brassMat);
  burner_dish.name = "burner_dish";
  burner_dish.position.y = 0.65;
  root.add(burner_dish);

  const burner_rimGeom = new THREE.TorusGeometry(0.195, 0.018, 8, 32);
  const burner_rim = new THREE.Mesh(burner_rimGeom, rustMat);
  burner_rim.name = "burner_rim";
  burner_rim.rotation.x = Math.PI / 2;
  burner_rim.position.y = 0.68;
  root.add(burner_rim);

  const wick_tubeGeom = new THREE.CylinderGeometry(0.035, 0.045, 0.12, 20);
  const wick_tube = new THREE.Mesh(wick_tubeGeom, dark_ironMat);
  wick_tube.name = "wick_tube";
  wick_tube.position.y = 0.72;
  root.add(wick_tube);

  const glass_globeProfile = [
    new THREE.Vector2(0.00, 0.64),
    new THREE.Vector2(0.18, 0.64),
    new THREE.Vector2(0.25, 0.68),
    new THREE.Vector2(0.30, 0.76),
    new THREE.Vector2(0.33, 0.91),
    new THREE.Vector2(0.34, 1.10),
    new THREE.Vector2(0.32, 1.28),
    new THREE.Vector2(0.28, 1.40),
    new THREE.Vector2(0.22, 1.46),
    new THREE.Vector2(0.00, 1.46),
  ];
  const glass_globeGeom = new THREE.LatheGeometry(glass_globeProfile, 48);
  const glass_globe = new THREE.Mesh(glass_globeGeom, glassMat);
  glass_globe.name = "glass_globe";
  glass_globe.renderOrder = 2;
  root.add(glass_globe);

  const outer_flameProfile = [
    new THREE.Vector2(0.00, 0.70),
    new THREE.Vector2(0.055, 0.72),
    new THREE.Vector2(0.095, 0.80),
    new THREE.Vector2(0.105, 0.91),
    new THREE.Vector2(0.085, 1.02),
    new THREE.Vector2(0.060, 1.12),
    new THREE.Vector2(0.035, 1.22),
    new THREE.Vector2(0.014, 1.30),
    new THREE.Vector2(0.00, 1.34),
  ];
  const outer_flameGeom = new THREE.LatheGeometry(outer_flameProfile, 24);
  const outer_flame = new THREE.Mesh(outer_flameGeom, outer_flameMat);
  outer_flame.name = "outer_flame";
  outer_flame.position.z = 0.015;
  root.add(outer_flame);

  const inner_flameProfile = [
    new THREE.Vector2(0.00, 0.72),
    new THREE.Vector2(0.032, 0.74),
    new THREE.Vector2(0.052, 0.81),
    new THREE.Vector2(0.050, 0.90),
    new THREE.Vector2(0.036, 0.99),
    new THREE.Vector2(0.018, 1.08),
    new THREE.Vector2(0.00, 1.14),
  ];
  const inner_flameGeom = new THREE.LatheGeometry(inner_flameProfile, 20);
  const inner_flame = new THREE.Mesh(inner_flameGeom, inner_flameMat);
  inner_flame.name = "inner_flame";
  inner_flame.position.z = 0.045;
  root.add(inner_flame);

  const blue_flame_baseGeom = new THREE.SphereGeometry(0.09, 20, 12);
  const blue_flame_base = new THREE.Mesh(blue_flame_baseGeom, blue_flameMat);
  blue_flame_base.name = "blue_flame_base";
  blue_flame_base.scale.set(1.0, 0.45, 0.75);
  blue_flame_base.position.set(0, 0.72, 0.035);
  root.add(blue_flame_base);

  const upper_glass_bandGeom = new THREE.CylinderGeometry(0.25, 0.27, 0.07, 32);
  const upper_glass_band = new THREE.Mesh(upper_glass_bandGeom, brassMat);
  upper_glass_band.name = "upper_glass_band";
  upper_glass_band.position.y = 1.425;
  root.add(upper_glass_band);

  const hood_lower_lipGeom = new THREE.CylinderGeometry(0.39, 0.42, 0.045, 40);
  const hood_lower_lip = new THREE.Mesh(hood_lower_lipGeom, rustMat);
  hood_lower_lip.name = "hood_lower_lip";
  hood_lower_lip.position.y = 1.465;
  root.add(hood_lower_lip);

  const upper_hoodProfile = [
    new THREE.Vector2(0.00, 1.43),
    new THREE.Vector2(0.34, 1.43),
    new THREE.Vector2(0.40, 1.46),
    new THREE.Vector2(0.38, 1.50),
    new THREE.Vector2(0.35, 1.55),
    new THREE.Vector2(0.34, 1.82),
    new THREE.Vector2(0.32, 1.89),
    new THREE.Vector2(0.00, 1.90),
  ];
  const upper_hoodGeom = new THREE.LatheGeometry(upper_hoodProfile, 48);
  const upper_hood = new THREE.Mesh(upper_hoodGeom, cast_ironMat);
  upper_hood.name = "upper_hood";
  root.add(upper_hood);

  const hood_lower_seamGeom = new THREE.TorusGeometry(0.375, 0.014, 8, 40);
  const hood_lower_seam = new THREE.Mesh(hood_lower_seamGeom, dark_ironMat);
  hood_lower_seam.name = "hood_lower_seam";
  hood_lower_seam.rotation.x = Math.PI / 2;
  hood_lower_seam.position.y = 1.505;
  root.add(hood_lower_seam);

  const vent_shadowGeom = new THREE.CylinderGeometry(0.29, 0.30, 0.07, 32);
  const vent_shadow = new THREE.Mesh(vent_shadowGeom, dark_ironMat);
  vent_shadow.name = "vent_shadow";
  vent_shadow.position.y = 1.925;
  root.add(vent_shadow);

  const top_lidProfile = [
    new THREE.Vector2(0.00, 1.94),
    new THREE.Vector2(0.29, 1.94),
    new THREE.Vector2(0.36, 1.965),
    new THREE.Vector2(0.37, 1.99),
    new THREE.Vector2(0.31, 2.02),
    new THREE.Vector2(0.12, 2.055),
    new THREE.Vector2(0.00, 2.055),
  ];
  const top_lidGeom = new THREE.LatheGeometry(top_lidProfile, 48);
  const top_lid = new THREE.Mesh(top_lidGeom, cast_ironMat);
  top_lid.name = "top_lid";
  root.add(top_lid);

  const lid_edgeGeom = new THREE.TorusGeometry(0.345, 0.014, 8, 40);
  const lid_edge = new THREE.Mesh(lid_edgeGeom, rustMat);
  lid_edge.name = "lid_edge";
  lid_edge.rotation.x = Math.PI / 2;
  lid_edge.position.y = 1.975;
  root.add(lid_edge);

  const lid_knobProfile = [
    new THREE.Vector2(0.00, 2.045),
    new THREE.Vector2(0.055, 2.045),
    new THREE.Vector2(0.060, 2.105),
    new THREE.Vector2(0.105, 2.12),
    new THREE.Vector2(0.125, 2.155),
    new THREE.Vector2(0.105, 2.195),
    new THREE.Vector2(0.055, 2.215),
    new THREE.Vector2(0.00, 2.215),
  ];
  const lid_knobGeom = new THREE.LatheGeometry(lid_knobProfile, 32);
  const lid_knob = new THREE.Mesh(lid_knobGeom, dark_ironMat);
  lid_knob.name = "lid_knob";
  root.add(lid_knob);

  const side_framePath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.29, 0.47, -0.02),
    new THREE.Vector3(0.43, 0.49, -0.02),
    new THREE.Vector3(0.54, 0.66, -0.02),
    new THREE.Vector3(0.57, 0.91, -0.02),
    new THREE.Vector3(0.55, 1.20, -0.02),
    new THREE.Vector3(0.50, 1.48, -0.02),
    new THREE.Vector3(0.46, 1.62, -0.02),
  ], false, "centripetal");
  const side_frameGeom = new THREE.TubeGeometry(side_framePath, 48, 0.052, 10, false);

  const right_side_frame = new THREE.Mesh(side_frameGeom, cast_ironMat);
  right_side_frame.name = "right_side_frame";
  root.add(right_side_frame);

  const left_side_frame = new THREE.Mesh(side_frameGeom, cast_ironMat);
  left_side_frame.name = "left_side_frame";
  left_side_frame.scale.x = -1;
  root.add(left_side_frame);

  const side_frame_rustPath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.30, 0.49, 0.025),
    new THREE.Vector3(0.43, 0.52, 0.025),
    new THREE.Vector3(0.515, 0.68, 0.025),
    new THREE.Vector3(0.535, 0.92, 0.025),
    new THREE.Vector3(0.515, 1.19, 0.025),
    new THREE.Vector3(0.47, 1.45, 0.025),
    new THREE.Vector3(0.43, 1.58, 0.025),
  ], false, "centripetal");
  const side_frame_rustGeom = new THREE.TubeGeometry(side_frame_rustPath, 40, 0.012, 6, false);

  const right_side_frame_rust = new THREE.Mesh(side_frame_rustGeom, rustMat);
  right_side_frame_rust.name = "right_side_frame_rust";
  root.add(right_side_frame_rust);

  const left_side_frame_rust = new THREE.Mesh(side_frame_rustGeom, rustMat);
  left_side_frame_rust.name = "left_side_frame_rust";
  left_side_frame_rust.scale.x = -1;
  root.add(left_side_frame_rust);

  const pivot_housingsGeom = new THREE.CylinderGeometry(0.075, 0.075, 0.075, 20);
  const pivot_housings = new THREE.InstancedMesh(pivot_housingsGeom, cast_ironMat, 2);
  pivot_housings.name = "pivot_housings";
  const pivot_dummy = new THREE.Object3D();
  for (let i = 0; i < 2; i++) {
    const side = i === 0 ? -1 : 1;
    pivot_dummy.position.set(side * 0.49, 1.62, -0.015);
    pivot_dummy.rotation.set(0, 0, Math.PI / 2);
    pivot_dummy.scale.set(1, 1, 1);
    pivot_dummy.updateMatrix();
    pivot_housings.setMatrixAt(i, pivot_dummy.matrix);
  }
  pivot_housings.instanceMatrix.needsUpdate = true;
  root.add(pivot_housings);

  const pivot_capsGeom = new THREE.CylinderGeometry(0.047, 0.047, 0.025, 18);
  const pivot_caps = new THREE.InstancedMesh(pivot_capsGeom, rustMat, 2);
  pivot_caps.name = "pivot_caps";
  for (let i = 0; i < 2; i++) {
    const side = i === 0 ? -1 : 1;
    pivot_dummy.position.set(side * 0.535, 1.62, -0.005);
    pivot_dummy.rotation.set(0, 0, Math.PI / 2);
    pivot_dummy.scale.set(1, 1, 1);
    pivot_dummy.updateMatrix();
    pivot_caps.setMatrixAt(i, pivot_dummy.matrix);
  }
  pivot_caps.instanceMatrix.needsUpdate = true;
  root.add(pivot_caps);

  const carry_handlePath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.50, 1.61, -0.04),
    new THREE.Vector3(-0.56, 1.76, -0.04),
    new THREE.Vector3(-0.57, 2.08, -0.04),
    new THREE.Vector3(-0.56, 2.39, -0.04),
    new THREE.Vector3(-0.49, 2.53, -0.04),
    new THREE.Vector3(-0.39, 2.58, -0.04),
    new THREE.Vector3(0.39, 2.58, -0.04),
    new THREE.Vector3(0.49, 2.53, -0.04),
    new THREE.Vector3(0.56, 2.39, -0.04),
    new THREE.Vector3(0.57, 2.08, -0.04),
    new THREE.Vector3(0.56, 1.76, -0.04),
    new THREE.Vector3(0.50, 1.61, -0.04),
  ], false, "centripetal");
  const carry_handleGeom = new THREE.TubeGeometry(carry_handlePath, 80, 0.025, 9, false);
  const carry_handle = new THREE.Mesh(carry_handleGeom, dark_ironMat);
  carry_handle.name = "carry_handle";
  root.add(carry_handle);

  const wooden_gripShape = new THREE.Shape();
  wooden_gripShape.moveTo(-0.47, -0.085);
  wooden_gripShape.bezierCurveTo(-0.34, -0.105, -0.18, -0.075, 0.00, -0.09);
  wooden_gripShape.bezierCurveTo(0.18, -0.075, 0.34, -0.105, 0.47, -0.08);
  wooden_gripShape.bezierCurveTo(0.50, -0.04, 0.50, 0.05, 0.46, 0.095);
  wooden_gripShape.bezierCurveTo(0.28, 0.115, 0.15, 0.085, 0.00, 0.10);
  wooden_gripShape.bezierCurveTo(-0.16, 0.085, -0.30, 0.115, -0.45, 0.09);
  wooden_gripShape.bezierCurveTo(-0.49, 0.05, -0.50, -0.04, -0.47, -0.085);

  const wooden_gripGeom = new THREE.ExtrudeGeometry(wooden_gripShape, {
    depth: 0.13,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.015,
    bevelSize: 0.015,
    bevelSegments: 3,
  });
  const wooden_grip = new THREE.Mesh(wooden_gripGeom, woodMat);
  wooden_grip.name = "wooden_grip";
  wooden_grip.position.set(0, 2.66, -0.085);
  root.add(wooden_grip);

  const wood_grain_lines = new THREE.Group();
  wood_grain_lines.name = "wood_grain_lines";
  for (let i = 0; i < 5; i++) {
    const y = 2.605 + i * 0.032;
    const grainPath = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.42, y, 0.064),
      new THREE.Vector3(-0.22, y + (i % 2 === 0 ? 0.008 : -0.006), 0.064),
      new THREE.Vector3(0.00, y + (i % 3 === 0 ? -0.006 : 0.006), 0.064),
      new THREE.Vector3(0.22, y + (i % 2 === 0 ? -0.004 : 0.007), 0.064),
      new THREE.Vector3(0.42, y, 0.064),
    ], false, "centripetal");
    const grainGeom = new THREE.TubeGeometry(grainPath, 24, 0.003, 5, false);
    const grain = new THREE.Mesh(grainGeom, wood_grainMat);
    wood_grain_lines.add(grain);
  }
  root.add(wood_grain_lines);

  const wood_knotsGeom = new THREE.CircleGeometry(0.014, 14);
  const wood_knots = new THREE.InstancedMesh(wood_knotsGeom, wood_grainMat, 4);
  wood_knots.name = "wood_knots";
  const knot_positions = [
    [-0.31, 2.685, 0.066, 1.4, 0.65],
    [-0.08, 2.625, 0.066, 0.8, 0.55],
    [0.18, 2.705, 0.066, 1.2, 0.60],
    [0.35, 2.655, 0.066, 0.75, 0.50],
  ];
  for (let i = 0; i < knot_positions.length; i++) {
    const p = knot_positions[i];
    pivot_dummy.position.set(p[0], p[1], p[2]);
    pivot_dummy.rotation.set(0, 0, 0);
    pivot_dummy.scale.set(p[3], p[4], 1);
    pivot_dummy.updateMatrix();
    wood_knots.setMatrixAt(i, pivot_dummy.matrix);
  }
  wood_knots.instanceMatrix.needsUpdate = true;
  root.add(wood_knots);

  const front_guard_leftPath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.31, 1.43, 0.18),
    new THREE.Vector3(-0.20, 1.29, 0.29),
    new THREE.Vector3(0.00, 1.06, 0.35),
    new THREE.Vector3(0.19, 0.82, 0.29),
    new THREE.Vector3(0.31, 0.68, 0.17),
  ], false, "centripetal");
  const front_guard_leftGeom = new THREE.TubeGeometry(front_guard_leftPath, 36, 0.014, 7, false);
  const front_guard_left = new THREE.Mesh(front_guard_leftGeom, dark_ironMat);
  front_guard_left.name = "front_guard_left";
  root.add(front_guard_left);

  const front_guard_rightPath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.31, 1.43, 0.18),
    new THREE.Vector3(0.20, 1.29, 0.29),
    new THREE.Vector3(0.00, 1.06, 0.355),
    new THREE.Vector3(-0.19, 0.82, 0.29),
    new THREE.Vector3(-0.31, 0.68, 0.17),
  ], false, "centripetal");
  const front_guard_rightGeom = new THREE.TubeGeometry(front_guard_rightPath, 36, 0.014, 7, false);
  const front_guard_right = new THREE.Mesh(front_guard_rightGeom, dark_ironMat);
  front_guard_right.name = "front_guard_right";
  root.add(front_guard_right);

  const lower_guard_ringGeom = new THREE.TorusGeometry(0.305, 0.014, 7, 48);
  const lower_guard_ring = new THREE.Mesh(lower_guard_ringGeom, dark_ironMat);
  lower_guard_ring.name = "lower_guard_ring";
  lower_guard_ring.rotation.x = Math.PI / 2;
  lower_guard_ring.position.y = 0.68;
  root.add(lower_guard_ring);

  const guard_fastenersGeom = new THREE.SphereGeometry(0.027, 14, 8);
  const guard_fasteners = new THREE.InstancedMesh(guard_fastenersGeom, rustMat, 4);
  guard_fasteners.name = "guard_fasteners";
  const fastener_positions = [
    [-0.31, 1.43, 0.18],
    [0.31, 1.43, 0.18],
    [-0.31, 0.68, 0.17],
    [0.31, 0.68, 0.17],
  ];
  for (let i = 0; i < fastener_positions.length; i++) {
    const p = fastener_positions[i];
    pivot_dummy.position.set(p[0], p[1], p[2]);
    pivot_dummy.rotation.set(0, 0, 0);
    pivot_dummy.scale.set(1, 1, 1);
    pivot_dummy.updateMatrix();
    guard_fasteners.setMatrixAt(i, pivot_dummy.matrix);
  }
  guard_fasteners.instanceMatrix.needsUpdate = true;
  root.add(guard_fasteners);

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