// miner-diag: gpus=? tflops=? stream48=? power=? probe_tps=3831 cpu_quota=?/? net=? batch=3 wall=1521 seed=870128282
export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "antique_wooden_lantern";

  const woodMat = new THREE.MeshStandardMaterial({
    color: 0x75401f,
    metalness: 0.0,
    roughness: 0.6,
  });
  const darkWoodMat = new THREE.MeshStandardMaterial({
    color: 0x432719,
    metalness: 0.0,
    roughness: 0.9,
  });
  const agedBrassMat = new THREE.MeshStandardMaterial({
    color: 0x8a7345,
    metalness: 0.6,
    roughness: 0.5,
  });
  const darkBrassMat = new THREE.MeshStandardMaterial({
    color: 0x4b402c,
    metalness: 0.6,
    roughness: 0.5,
  });
  const blackMetalMat = new THREE.MeshStandardMaterial({
    color: 0x252525,
    metalness: 0.6,
    roughness: 0.5,
  });
  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0xdde5df,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
    opacity: 0.38,
    side: THREE.DoubleSide,
    depthWrite: false,
  });
  const frostedGlassMat = new THREE.MeshPhysicalMaterial({
    color: 0xe5e4d8,
    metalness: 0.0,
    roughness: 0.4,
    transmission: 0.7,
    ior: 1.5,
    transparent: true,
    opacity: 0.72,
    side: THREE.DoubleSide,
    depthWrite: false,
  });
  const ventHoleMat = new THREE.MeshBasicMaterial({
    color: 0x11100d,
    side: THREE.DoubleSide,
  });

  const base_group = new THREE.Group();
  base_group.name = "base_group";
  root.add(base_group);

  const base_feetGeom = new THREE.BoxGeometry(0.18, 0.07, 0.13);
  const base_feet = new THREE.InstancedMesh(base_feetGeom, darkWoodMat, 4);
  base_feet.name = "base_feet";
  const footPositions = [
    [-0.43, 0.035, 0.34],
    [0.43, 0.035, 0.34],
    [-0.43, 0.035, -0.34],
    [0.43, 0.035, -0.34],
  ];
  const instanceMatrix = new THREE.Matrix4();
  for (let i = 0; i < footPositions.length; i++) {
    const p = footPositions[i];
    instanceMatrix.makeTranslation(p[0], p[1], p[2]);
    base_feet.setMatrixAt(i, instanceMatrix);
  }
  base_feet.instanceMatrix.needsUpdate = true;
  base_group.add(base_feet);

  const wooden_baseGeom = new THREE.BoxGeometry(1.0, 0.16, 0.82);
  const wooden_base = new THREE.Mesh(wooden_baseGeom, woodMat);
  wooden_base.name = "wooden_base";
  wooden_base.position.y = 0.13;
  base_group.add(wooden_base);

  const base_upper_stepGeom = new THREE.BoxGeometry(0.88, 0.08, 0.70);
  const base_upper_step = new THREE.Mesh(base_upper_stepGeom, woodMat);
  base_upper_step.name = "base_upper_step";
  base_upper_step.position.y = 0.24;
  base_group.add(base_upper_step);

  const base_front_trimGeom = new THREE.BoxGeometry(0.92, 0.055, 0.045);
  const base_front_trim = new THREE.Mesh(base_front_trimGeom, darkWoodMat);
  base_front_trim.name = "base_front_trim";
  base_front_trim.position.set(0, 0.18, 0.415);
  base_group.add(base_front_trim);

  const base_back_trim = new THREE.Mesh(base_front_trimGeom, darkWoodMat);
  base_back_trim.name = "base_back_trim";
  base_back_trim.position.set(0, 0.18, -0.415);
  base_group.add(base_back_trim);

  const base_side_trimGeom = new THREE.BoxGeometry(0.045, 0.055, 0.75);
  const base_left_trim = new THREE.Mesh(base_side_trimGeom, darkWoodMat);
  base_left_trim.name = "base_left_trim";
  base_left_trim.position.set(-0.47, 0.18, 0);
  base_group.add(base_left_trim);

  const base_right_trim = new THREE.Mesh(base_side_trimGeom, darkWoodMat);
  base_right_trim.name = "base_right_trim";
  base_right_trim.position.set(0.47, 0.18, 0);
  base_group.add(base_right_trim);

  const pedestalProfile = [
    new THREE.Vector2(0.00, 0.25),
    new THREE.Vector2(0.34, 0.25),
    new THREE.Vector2(0.39, 0.28),
    new THREE.Vector2(0.37, 0.32),
    new THREE.Vector2(0.31, 0.36),
    new THREE.Vector2(0.27, 0.43),
    new THREE.Vector2(0.23, 0.50),
    new THREE.Vector2(0.20, 0.54),
    new THREE.Vector2(0.00, 0.54),
  ];
  const brass_pedestalGeom = new THREE.LatheGeometry(pedestalProfile, 32);
  const brass_pedestal = new THREE.Mesh(brass_pedestalGeom, agedBrassMat);
  brass_pedestal.name = "brass_pedestal";
  base_group.add(brass_pedestal);

  const pedestal_top_ringGeom = new THREE.TorusGeometry(0.205, 0.018, 10, 32);
  const pedestal_top_ring = new THREE.Mesh(pedestal_top_ringGeom, darkBrassMat);
  pedestal_top_ring.name = "pedestal_top_ring";
  pedestal_top_ring.rotation.x = Math.PI / 2;
  pedestal_top_ring.position.y = 0.525;
  base_group.add(pedestal_top_ring);

  const base_screwsGeom = new THREE.CylinderGeometry(0.012, 0.012, 0.008, 12);
  const base_screws = new THREE.InstancedMesh(base_screwsGeom, darkBrassMat, 4);
  base_screws.name = "base_screws";
  const baseScrewPositions = [
    [-0.34, 0.286, 0.27],
    [0.34, 0.286, 0.27],
    [-0.34, 0.286, -0.27],
    [0.34, 0.286, -0.27],
  ];
  for (let i = 0; i < baseScrewPositions.length; i++) {
    const p = baseScrewPositions[i];
    instanceMatrix.makeTranslation(p[0], p[1], p[2]);
    base_screws.setMatrixAt(i, instanceMatrix);
  }
  base_screws.instanceMatrix.needsUpdate = true;
  base_group.add(base_screws);

  const enclosure_group = new THREE.Group();
  enclosure_group.name = "enclosure_group";
  root.add(enclosure_group);

  const lower_front_railGeom = new THREE.BoxGeometry(0.84, 0.13, 0.09);
  const lower_front_rail = new THREE.Mesh(lower_front_railGeom, woodMat);
  lower_front_rail.name = "lower_front_rail";
  lower_front_rail.position.set(0, 0.57, 0.34);
  enclosure_group.add(lower_front_rail);

  const lower_back_rail = new THREE.Mesh(lower_front_railGeom, woodMat);
  lower_back_rail.name = "lower_back_rail";
  lower_back_rail.position.set(0, 0.57, -0.34);
  enclosure_group.add(lower_back_rail);

  const lower_side_railGeom = new THREE.BoxGeometry(0.09, 0.13, 0.59);
  const lower_left_rail = new THREE.Mesh(lower_side_railGeom, woodMat);
  lower_left_rail.name = "lower_left_rail";
  lower_left_rail.position.set(-0.40, 0.57, 0);
  enclosure_group.add(lower_left_rail);

  const lower_right_rail = new THREE.Mesh(lower_side_railGeom, woodMat);
  lower_right_rail.name = "lower_right_rail";
  lower_right_rail.position.set(0.40, 0.57, 0);
  enclosure_group.add(lower_right_rail);

  const upper_front_railGeom = new THREE.BoxGeometry(0.80, 0.13, 0.09);
  const upper_front_rail = new THREE.Mesh(upper_front_railGeom, woodMat);
  upper_front_rail.name = "upper_front_rail";
  upper_front_rail.position.set(0, 1.57, 0.31);
  enclosure_group.add(upper_front_rail);

  const upper_back_rail = new THREE.Mesh(upper_front_railGeom, woodMat);
  upper_back_rail.name = "upper_back_rail";
  upper_back_rail.position.set(0, 1.57, -0.31);
  enclosure_group.add(upper_back_rail);

  const upper_side_railGeom = new THREE.BoxGeometry(0.09, 0.13, 0.53);
  const upper_left_rail = new THREE.Mesh(upper_side_railGeom, woodMat);
  upper_left_rail.name = "upper_left_rail";
  upper_left_rail.position.set(-0.36, 1.57, 0);
  enclosure_group.add(upper_left_rail);

  const upper_right_rail = new THREE.Mesh(upper_side_railGeom, woodMat);
  upper_right_rail.name = "upper_right_rail";
  upper_right_rail.position.set(0.36, 1.57, 0);
  enclosure_group.add(upper_right_rail);

  const corner_postsGeom = new THREE.BoxGeometry(0.09, 1.0, 0.09);
  const corner_posts = new THREE.InstancedMesh(corner_postsGeom, woodMat, 4);
  corner_posts.name = "corner_posts";
  const postCorners = [
    [-1, 1],
    [1, 1],
    [-1, -1],
    [1, -1],
  ];
  const upAxis = new THREE.Vector3(0, 1, 0);
  for (let i = 0; i < postCorners.length; i++) {
    const sx = postCorners[i][0];
    const sz = postCorners[i][1];
    const bottom = new THREE.Vector3(sx * 0.40, 0.55, sz * 0.34);
    const top = new THREE.Vector3(sx * 0.36, 1.62, sz * 0.31);
    const direction = new THREE.Vector3().subVectors(top, bottom);
    const length = direction.length();
    const midpoint = new THREE.Vector3().addVectors(bottom, top).multiplyScalar(0.5);
    const quaternion = new THREE.Quaternion().setFromUnitVectors(
      upAxis,
      direction.clone().normalize()
    );
    const matrix = new THREE.Matrix4().compose(
      midpoint,
      quaternion,
      new THREE.Vector3(1, length, 1)
    );
    corner_posts.setMatrixAt(i, matrix);
  }
  corner_posts.instanceMatrix.needsUpdate = true;
  enclosure_group.add(corner_posts);

  const glassShape = new THREE.Shape();
  glassShape.moveTo(-0.31, -0.45);
  glassShape.lineTo(0.31, -0.45);
  glassShape.lineTo(0.275, 0.45);
  glassShape.lineTo(-0.275, 0.45);
  glassShape.closePath();
  const glass_panelGeom = new THREE.ShapeGeometry(glassShape);

  const front_glass = new THREE.Mesh(glass_panelGeom, glassMat);
  front_glass.name = "front_glass";
  front_glass.position.set(0, 1.07, 0.326);
  enclosure_group.add(front_glass);

  const back_glass = new THREE.Mesh(glass_panelGeom, glassMat);
  back_glass.name = "back_glass";
  back_glass.position.set(0, 1.07, -0.326);
  back_glass.rotation.y = Math.PI;
  enclosure_group.add(back_glass);

  const sideGlassShape = new THREE.Shape();
  sideGlassShape.moveTo(-0.245, -0.45);
  sideGlassShape.lineTo(0.245, -0.45);
  sideGlassShape.lineTo(0.215, 0.45);
  sideGlassShape.lineTo(-0.215, 0.45);
  sideGlassShape.closePath();
  const side_glassGeom = new THREE.ShapeGeometry(sideGlassShape);

  const left_glass = new THREE.Mesh(side_glassGeom, glassMat);
  left_glass.name = "left_glass";
  left_glass.position.set(-0.376, 1.07, 0);
  left_glass.rotation.y = -Math.PI / 2;
  enclosure_group.add(left_glass);

  const right_glass = new THREE.Mesh(side_glassGeom, glassMat);
  right_glass.name = "right_glass";
  right_glass.position.set(0.376, 1.07, 0);
  right_glass.rotation.y = Math.PI / 2;
  enclosure_group.add(right_glass);

  const interior_group = new THREE.Group();
  interior_group.name = "interior_group";
  root.add(interior_group);

  const burner_baseGeom = new THREE.CylinderGeometry(0.18, 0.20, 0.10, 24);
  const burner_base = new THREE.Mesh(burner_baseGeom, blackMetalMat);
  burner_base.name = "burner_base";
  burner_base.position.y = 0.59;
  interior_group.add(burner_base);

  const burner_collarGeom = new THREE.CylinderGeometry(0.15, 0.17, 0.13, 24);
  const burner_collar = new THREE.Mesh(burner_collarGeom, darkBrassMat);
  burner_collar.name = "burner_collar";
  burner_collar.position.y = 0.68;
  interior_group.add(burner_collar);

  const burner_ringGeom = new THREE.TorusGeometry(0.145, 0.018, 8, 28);
  const burner_ring = new THREE.Mesh(burner_ringGeom, blackMetalMat);
  burner_ring.name = "burner_ring";
  burner_ring.rotation.x = Math.PI / 2;
  burner_ring.position.y = 0.735;
  interior_group.add(burner_ring);

  const chimney_stemGeom = new THREE.CylinderGeometry(0.065, 0.075, 0.58, 20);
  const chimney_stem = new THREE.Mesh(chimney_stemGeom, blackMetalMat);
  chimney_stem.name = "chimney_stem";
  chimney_stem.position.y = 1.02;
  interior_group.add(chimney_stem);

  const chimney_capGeom = new THREE.CylinderGeometry(0.11, 0.075, 0.12, 20);
  const chimney_cap = new THREE.Mesh(chimney_capGeom, blackMetalMat);
  chimney_cap.name = "chimney_cap";
  chimney_cap.position.y = 1.32;
  interior_group.add(chimney_cap);

  const glass_globeProfile = [
    new THREE.Vector2(0.00, 0.68),
    new THREE.Vector2(0.10, 0.68),
    new THREE.Vector2(0.14, 0.72),
    new THREE.Vector2(0.18, 0.80),
    new THREE.Vector2(0.205, 0.94),
    new THREE.Vector2(0.205, 1.06),
    new THREE.Vector2(0.18, 1.18),
    new THREE.Vector2(0.13, 1.27),
    new THREE.Vector2(0.075, 1.32),
    new THREE.Vector2(0.00, 1.32),
  ];
  const glass_globeGeom = new THREE.LatheGeometry(glass_globeProfile, 32);
  const glass_globe = new THREE.Mesh(glass_globeGeom, frostedGlassMat);
  glass_globe.name = "glass_globe";
  interior_group.add(glass_globe);

  const globe_lower_ringGeom = new THREE.TorusGeometry(0.135, 0.014, 8, 28);
  const globe_lower_ring = new THREE.Mesh(globe_lower_ringGeom, darkBrassMat);
  globe_lower_ring.name = "globe_lower_ring";
  globe_lower_ring.rotation.x = Math.PI / 2;
  globe_lower_ring.position.y = 0.715;
  interior_group.add(globe_lower_ring);

  const globe_upper_ringGeom = new THREE.TorusGeometry(0.085, 0.012, 8, 28);
  const globe_upper_ring = new THREE.Mesh(globe_upper_ringGeom, darkBrassMat);
  globe_upper_ring.name = "globe_upper_ring";
  globe_upper_ring.rotation.x = Math.PI / 2;
  globe_upper_ring.position.y = 1.30;
  interior_group.add(globe_upper_ring);

  const left_guardCurve = new THREE.CatmullRomCurve3(
    [
      new THREE.Vector3(-0.29, 0.58, 0.39),
      new THREE.Vector3(-0.27, 0.76, 0.39),
      new THREE.Vector3(-0.18, 0.99, 0.39),
      new THREE.Vector3(-0.03, 1.17, 0.39),
    ],
    false,
    "centripetal"
  );
  const left_guard_wireGeom = new THREE.TubeGeometry(left_guardCurve, 28, 0.012, 8, false);
  const left_guard_wire = new THREE.Mesh(left_guard_wireGeom, agedBrassMat);
  left_guard_wire.name = "left_guard_wire";
  interior_group.add(left_guard_wire);

  const right_guardCurve = new THREE.CatmullRomCurve3(
    [
      new THREE.Vector3(0.29, 0.58, 0.39),
      new THREE.Vector3(0.27, 0.76, 0.39),
      new THREE.Vector3(0.18, 0.99, 0.39),
      new THREE.Vector3(0.03, 1.17, 0.39),
    ],
    false,
    "centripetal"
  );
  const right_guard_wireGeom = new THREE.TubeGeometry(right_guardCurve, 28, 0.012, 8, false);
  const right_guard_wire = new THREE.Mesh(right_guard_wireGeom, agedBrassMat);
  right_guard_wire.name = "right_guard_wire";
  interior_group.add(right_guard_wire);

  const guard_anchorsGeom = new THREE.SphereGeometry(0.025, 14, 8);
  const guard_anchors = new THREE.InstancedMesh(guard_anchorsGeom, darkBrassMat, 4);
  guard_anchors.name = "guard_anchors";
  const guardAnchorPositions = [
    [-0.29, 0.58, 0.39],
    [0.29, 0.58, 0.39],
    [-0.03, 1.17, 0.39],
    [0.03, 1.17, 0.39],
  ];
  for (let i = 0; i < guardAnchorPositions.length; i++) {
    const p = guardAnchorPositions[i];
    instanceMatrix.makeTranslation(p[0], p[1], p[2]);
    guard_anchors.setMatrixAt(i, instanceMatrix);
  }
  guard_anchors.instanceMatrix.needsUpdate = true;
  interior_group.add(guard_anchors);

  const hardware_group = new THREE.Group();
  hardware_group.name = "hardware_group";
  root.add(hardware_group);

  const front_door_strapGeom = new THREE.BoxGeometry(0.035, 0.25, 0.018);
  const front_door_strap = new THREE.Mesh(front_door_strapGeom, darkBrassMat);
  front_door_strap.name = "front_door_strap";
  front_door_strap.position.set(0.055, 1.42, 0.365);
  hardware_group.add(front_door_strap);

  const front_hinge_knucklesGeom = new THREE.CylinderGeometry(0.014, 0.014, 0.065, 12);
  const front_hinge_knuckles = new THREE.InstancedMesh(
    front_hinge_knucklesGeom,
    darkBrassMat,
    3
  );
  front_hinge_knuckles.name = "front_hinge_knuckles";
  for (let i = 0; i < 3; i++) {
    instanceMatrix.makeTranslation(0.055, 1.33 + i * 0.075, 0.382);
    front_hinge_knuckles.setMatrixAt(i, instanceMatrix);
  }
  front_hinge_knuckles.instanceMatrix.needsUpdate = true;
  hardware_group.add(front_hinge_knuckles);

  const front_latch_plateGeom = new THREE.BoxGeometry(0.045, 0.17, 0.018);
  const front_latch_plate = new THREE.Mesh(front_latch_plateGeom, darkBrassMat);
  front_latch_plate.name = "front_latch_plate";
  front_latch_plate.position.set(0.12, 0.91, 0.385);
  hardware_group.add(front_latch_plate);

  const front_latch_pivotGeom = new THREE.SphereGeometry(0.035, 16, 10);
  const front_latch_pivot = new THREE.Mesh(front_latch_pivotGeom, agedBrassMat);
  front_latch_pivot.name = "front_latch_pivot";
  front_latch_pivot.position.set(0.12, 0.96, 0.41);
  hardware_group.add(front_latch_pivot);

  const front_latch_leverCurve = new THREE.CatmullRomCurve3(
    [
      new THREE.Vector3(0.12, 0.96, 0.415),
      new THREE.Vector3(0.16, 1.01, 0.42),
      new THREE.Vector3(0.22, 1.09, 0.405),
    ],
    false,
    "centripetal"
  );
  const front_latch_leverGeom = new THREE.TubeGeometry(
    front_latch_leverCurve,
    16,
    0.011,
    8,
    false
  );
  const front_latch_lever = new THREE.Mesh(front_latch_leverGeom, agedBrassMat);
  front_latch_lever.name = "front_latch_lever";
  hardware_group.add(front_latch_lever);

  const front_latch_gripGeom = new THREE.CylinderGeometry(0.017, 0.017, 0.12, 12);
  const front_latch_grip = new THREE.Mesh(front_latch_gripGeom, darkBrassMat);
  front_latch_grip.name = "front_latch_grip";
  front_latch_grip.position.set(0.235, 1.075, 0.405);
  front_latch_grip.rotation.z = -0.18;
  hardware_group.add(front_latch_grip);

  const lower_left_knob_stemGeom = new THREE.CylinderGeometry(0.014, 0.014, 0.065, 12);
  const lower_left_knob_stem = new THREE.Mesh(lower_left_knob_stemGeom, darkBrassMat);
  lower_left_knob_stem.name = "lower_left_knob_stem";
  lower_left_knob_stem.rotation.x = Math.PI / 2;
  lower_left_knob_stem.position.set(-0.29, 0.58, 0.405);
  hardware_group.add(lower_left_knob_stem);

  const lower_left_knobGeom = new THREE.SphereGeometry(0.035, 14, 8);
  const lower_left_knob = new THREE.Mesh(lower_left_knobGeom, agedBrassMat);
  lower_left_knob.name = "lower_left_knob";
  lower_left_knob.position.set(-0.29, 0.58, 0.445);
  hardware_group.add(lower_left_knob);

  const lower_right_knob_stem = new THREE.Mesh(lower_left_knob_stemGeom, darkBrassMat);
  lower_right_knob_stem.name = "lower_right_knob_stem";
  lower_right_knob_stem.rotation.x = Math.PI / 2;
  lower_right_knob_stem.position.set(0.29, 0.58, 0.405);
  hardware_group.add(lower_right_knob_stem);

  const lower_right_knob = new THREE.Mesh(lower_left_knobGeom, agedBrassMat);
  lower_right_knob.name = "lower_right_knob";
  lower_right_knob.position.set(0.29, 0.58, 0.445);
  hardware_group.add(lower_right_knob);

  const side_latch_plateGeom = new THREE.BoxGeometry(0.018, 0.15, 0.045);
  const left_side_latch_plate = new THREE.Mesh(side_latch_plateGeom, darkBrassMat);
  left_side_latch_plate.name = "left_side_latch_plate";
  left_side_latch_plate.position.set(-0.425, 1.02, 0.18);
  hardware_group.add(left_side_latch_plate);

  const left_side_knob_stemGeom = new THREE.CylinderGeometry(0.013, 0.013, 0.06, 12);
  const left_side_knob_stem = new THREE.Mesh(left_side_knob_stemGeom, darkBrassMat);
  left_side_knob_stem.name = "left_side_knob_stem";
  left_side_knob_stem.rotation.z = Math.PI / 2;
  left_side_knob_stem.position.set(-0.455, 1.02, 0.18);
  hardware_group.add(left_side_knob_stem);

  const left_side_knob = new THREE.Mesh(lower_left_knobGeom, agedBrassMat);
  left_side_knob.name = "left_side_knob";
  left_side_knob.position.set(-0.49, 1.02, 0.18);
  hardware_group.add(left_side_knob);

  const roof_group = new THREE.Group();
  roof_group.name = "roof_group";
  root.add(roof_group);

  const roof_eaveGeom = new THREE.BoxGeometry(1.0, 0.065, 0.82);
  const roof_eave = new THREE.Mesh(roof_eaveGeom, agedBrassMat);
  roof_eave.name = "roof_eave";
  roof_eave.position.y = 1.67;
  roof_group.add(roof_eave);

  const roof_front_lipGeom = new THREE.BoxGeometry(1.03, 0.055, 0.035);
  const roof_front_lip = new THREE.Mesh(roof_front_lipGeom, darkBrassMat);
  roof_front_lip.name = "roof_front_lip";
  roof_front_lip.position.set(0, 1.665, 0.425);
  roof_group.add(roof_front_lip);

  const roof_back_lip = new THREE.Mesh(roof_front_lipGeom, darkBrassMat);
  roof_back_lip.name = "roof_back_lip";
  roof_back_lip.position.set(0, 1.665, -0.425);
  roof_group.add(roof_back_lip);

  const roof_side_lipGeom = new THREE.BoxGeometry(0.035, 0.055, 0.79);
  const roof_left_lip = new THREE.Mesh(roof_side_lipGeom, darkBrassMat);
  roof_left_lip.name = "roof_left_lip";
  roof_left_lip.position.set(-0.515, 1.665, 0);
  roof_group.add(roof_left_lip);

  const roof_right_lip = new THREE.Mesh(roof_side_lipGeom, darkBrassMat);
  roof_right_lip.name = "roof_right_lip";
  roof_right_lip.position.set(0.515, 1.665, 0);
  roof_group.add(roof_right_lip);

  const roof_shellGeom = new THREE.CylinderGeometry(0.29, 0.50, 0.30, 4);
  const roof_shell = new THREE.Mesh(roof_shellGeom, agedBrassMat);
  roof_shell.name = "roof_shell";
  roof_shell.position.y = 1.84;
  roof_shell.rotation.y = Math.PI / 4;
  roof_shell.scale.z = 0.82;
  roof_group.add(roof_shell);

  const roof_ribCurve = new THREE.CatmullRomCurve3(
    [
      new THREE.Vector3(0.353, 1.70, 0.353),
      new THREE.Vector3(0.295, 1.82, 0.295),
      new THREE.Vector3(0.205, 1.985, 0.205),
    ],
    false,
    "centripetal"
  );
  const roof_corner_ribsGeom = new THREE.TubeGeometry(
    roof_ribCurve,
    16,
    0.009,
    6,
    false
  );
  const roof_corner_ribs = new THREE.InstancedMesh(
    roof_corner_ribsGeom,
    darkBrassMat,
    4
  );
  roof_corner_ribs.name = "roof_corner_ribs";
  for (let i = 0; i < 4; i++) {
    instanceMatrix.makeRotationY(i * Math.PI / 2);
    roof_corner_ribs.setMatrixAt(i, instanceMatrix);
  }
  roof_corner_ribs.instanceMatrix.needsUpdate = true;
  roof_group.add(roof_corner_ribs);

  const roof_vent_holesGeom = new THREE.CircleGeometry(0.026, 12);
  const roof_vent_holes = new THREE.InstancedMesh(
    roof_vent_holesGeom,
    ventHoleMat,
    28
  );
  roof_vent_holes.name = "roof_vent_holes";
  const baseNormal = new THREE.Vector3(0, 0, 1);
  let ventIndex = 0;
  for (let face = 0; face < 4; face++) {
    const angle = face * Math.PI / 2;
    const normal = new THREE.Vector3(Math.sin(angle), 0, Math.cos(angle));
    const tangent = new THREE.Vector3(Math.cos(angle), 0, -Math.sin(angle));
    const faceQuaternion = new THREE.Quaternion().setFromUnitVectors(baseNormal, normal);

    for (let row = 0; row < 2; row++) {
      const y = 1.77 + row * 0.075;
      const t = (y - 1.69) / 0.30;
      const halfWidth = 0.353 * (1 - t) + 0.205 * t;

      for (let column = 0; column < 4; column++) {
        const lateral = (column - 1.5) * 0.075;
        const position = normal.clone().multiplyScalar(halfWidth + 0.006);
        position.addScaledVector(tangent, lateral);
        position.y = y;

        const twist = new THREE.Quaternion().setFromAxisAngle(
          baseNormal,
          (column + row) % 2 === 0 ? -0.42 : 0.42
        );
        const quaternion = faceQuaternion.clone().multiply(twist);
        const scale = new THREE.Vector3(
          1.0 + ((column + row) % 3) * 0.18,
          0.58,
          1
        );
        const matrix = new THREE.Matrix4().compose(position, quaternion, scale);
        roof_vent_holes.setMatrixAt(ventIndex, matrix);
        ventIndex++;
      }
    }
  }
  roof_vent_holes.instanceMatrix.needsUpdate = true;
  roof_group.add(roof_vent_holes);

  const roof_top_collarGeom = new THREE.CylinderGeometry(0.18, 0.20, 0.10, 28);
  const roof_top_collar = new THREE.Mesh(roof_top_collarGeom, agedBrassMat);
  roof_top_collar.name = "roof_top_collar";
  roof_top_collar.position.y = 2.015;
  roof_group.add(roof_top_collar);

  const collar_lower_ringGeom = new THREE.TorusGeometry(0.185, 0.018, 8, 28);
  const collar_lower_ring = new THREE.Mesh(collar_lower_ringGeom, darkBrassMat);
  collar_lower_ring.name = "collar_lower_ring";
  collar_lower_ring.rotation.x = Math.PI / 2;
  collar_lower_ring.position.y = 1.985;
  roof_group.add(collar_lower_ring);

  const collar_upper_ringGeom = new THREE.TorusGeometry(0.165, 0.015, 8, 28);
  const collar_upper_ring = new THREE.Mesh(collar_upper_ringGeom, darkBrassMat);
  collar_upper_ring.name = "collar_upper_ring";
  collar_upper_ring.rotation.x = Math.PI / 2;
  collar_upper_ring.position.y = 2.06;
  roof_group.add(collar_upper_ring);

  const vent_stackGeom = new THREE.CylinderGeometry(0.13, 0.14, 0.13, 28);
  const vent_stack = new THREE.Mesh(vent_stackGeom, blackMetalMat);
  vent_stack.name = "vent_stack";
  vent_stack.position.y = 2.105;
  roof_group.add(vent_stack);

  const vent_stack_holesGeom = new THREE.CircleGeometry(0.025, 12);
  const vent_stack_holes = new THREE.InstancedMesh(
    vent_stack_holesGeom,
    ventHoleMat,
    8
  );
  vent_stack_holes.name = "vent_stack_holes";
  for (let i = 0; i < 8; i++) {
    const angle = i / 8 * Math.PI * 2;
    const normal = new THREE.Vector3(Math.sin(angle), 0, Math.cos(angle));
    const position = normal.clone().multiplyScalar(0.137);
    position.y = 2.105;
    const quaternion = new THREE.Quaternion().setFromUnitVectors(baseNormal, normal);
    const matrix = new THREE.Matrix4().compose(
      position,
      quaternion,
      new THREE.Vector3(0.72, 1.15, 1)
    );
    vent_stack_holes.setMatrixAt(i, matrix);
  }
  vent_stack_holes.instanceMatrix.needsUpdate = true;
  roof_group.add(vent_stack_holes);

  const top_capProfile = [
    new THREE.Vector2(0.00, 2.14),
    new THREE.Vector2(0.20, 2.14),
    new THREE.Vector2(0.245, 2.16),
    new THREE.Vector2(0.235, 2.185),
    new THREE.Vector2(0.19, 2.21),
    new THREE.Vector2(0.15, 2.255),
    new THREE.Vector2(0.08, 2.285),
    new THREE.Vector2(0.00, 2.29),
  ];
  const top_capGeom = new THREE.LatheGeometry(top_capProfile, 32);
  const top_cap = new THREE.Mesh(top_capGeom, agedBrassMat);
  top_cap.name = "top_cap";
  roof_group.add(top_cap);

  const top_cap_brimGeom = new THREE.TorusGeometry(0.225, 0.014, 8, 32);
  const top_cap_brim = new THREE.Mesh(top_cap_brimGeom, darkBrassMat);
  top_cap_brim.name = "top_cap_brim";
  top_cap_brim.rotation.x = Math.PI / 2;
  top_cap_brim.position.y = 2.16;
  roof_group.add(top_cap_brim);

  const handle_pivotsGeom = new THREE.SphereGeometry(0.035, 16, 10);
  const handle_pivots = new THREE.InstancedMesh(handle_pivotsGeom, darkBrassMat, 2);
  handle_pivots.name = "handle_pivots";
  instanceMatrix.makeTranslation(-0.22, 2.18, 0);
  handle_pivots.setMatrixAt(0, instanceMatrix);
  instanceMatrix.makeTranslation(0.22, 2.18, 0);
  handle_pivots.setMatrixAt(1, instanceMatrix);
  handle_pivots.instanceMatrix.needsUpdate = true;
  roof_group.add(handle_pivots);

  const carrying_handleCurve = new THREE.CatmullRomCurve3(
    [
      new THREE.Vector3(-0.22, 2.18, 0),
      new THREE.Vector3(-0.28, 2.31, 0),
      new THREE.Vector3(-0.25, 2.48, 0),
      new THREE.Vector3(-0.13, 2.59, 0),
      new THREE.Vector3(0.00, 2.62, 0),
      new THREE.Vector3(0.13, 2.59, 0),
      new THREE.Vector3(0.25, 2.48, 0),
      new THREE.Vector3(0.28, 2.31, 0),
      new THREE.Vector3(0.22, 2.18, 0),
    ],
    false,
    "centripetal"
  );
  const carrying_handleGeom = new THREE.TubeGeometry(
    carrying_handleCurve,
    48,
    0.022,
    10,
    false
  );
  const carrying_handle = new THREE.Mesh(carrying_handleGeom, agedBrassMat);
  carrying_handle.name = "carrying_handle";
  roof_group.add(carrying_handle);

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