function __sn17_user(THREE) {
  const root = new THREE.Group();
  root.name = "walk_behind_lawn_mower";

  const body_group = new THREE.Group();
  body_group.name = "body_group";
  const engine_group = new THREE.Group();
  engine_group.name = "engine_group";
  const wheel_group = new THREE.Group();
  wheel_group.name = "wheel_group";
  const handle_group = new THREE.Group();
  handle_group.name = "handle_group";
  root.add(body_group, engine_group, wheel_group, handle_group);

  const blue_paintMat = new THREE.MeshStandardMaterial({
    color: 0x087dcc,
    metalness: 0.2,
    roughness: 0.22
  });
  const dark_blueMat = new THREE.MeshStandardMaterial({
    color: 0x075da6,
    metalness: 0.15,
    roughness: 0.28
  });
  const seat_blackMat = new THREE.MeshStandardMaterial({
    color: 0x111214,
    metalness: 0.0,
    roughness: 0.8
  });
  const tire_blackMat = new THREE.MeshStandardMaterial({
    color: 0x171819,
    metalness: 0.0,
    roughness: 0.9
  });
  const frame_blackMat = new THREE.MeshStandardMaterial({
    color: 0x202224,
    metalness: 0.25,
    roughness: 0.45
  });
  const silver_metalMat = new THREE.MeshStandardMaterial({
    color: 0xbfc3c4,
    metalness: 0.45,
    roughness: 0.22
  });
  const brushed_metalMat = new THREE.MeshStandardMaterial({
    color: 0x85898a,
    metalness: 0.5,
    roughness: 0.35
  });
  const label_whiteMat = new THREE.MeshStandardMaterial({
    color: 0xe8e8e3,
    metalness: 0.0,
    roughness: 0.55
  });
  const red_accentMat = new THREE.MeshStandardMaterial({
    color: 0xc83b32,
    metalness: 0.0,
    roughness: 0.5
  });

  function createDeckGeometry() {
    const halfW = 0.82;
    const frontZ = 0.92;
    const rearZ = -0.72;
    const shape = new THREE.Shape();
    shape.moveTo(-halfW * 0.82, frontZ);
    shape.bezierCurveTo(
      -halfW * 0.96,
      frontZ * 0.98,
      -halfW,
      frontZ * 0.72,
      -halfW,
      frontZ * 0.42
    );
    shape.lineTo(-halfW, rearZ * 0.78);
    shape.bezierCurveTo(
      -halfW,
      rearZ * 0.94,
      -halfW * 0.78,
      rearZ,
      -halfW * 0.52,
      rearZ
    );
    shape.lineTo(halfW * 0.52, rearZ);
    shape.bezierCurveTo(
      halfW * 0.78,
      rearZ,
      halfW,
      rearZ * 0.94,
      halfW,
      rearZ * 0.78
    );
    shape.lineTo(halfW, frontZ * 0.42);
    shape.bezierCurveTo(
      halfW,
      frontZ * 0.72,
      halfW * 0.96,
      frontZ * 0.98,
      halfW * 0.82,
      frontZ
    );
    shape.closePath();

    const thickness = 0.11;
    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth: thickness,
      steps: 1,
      curveSegments: 16
    });
    geometry.translate(0, 0, -thickness / 2);
    geometry.rotateX(Math.PI / 2);
    geometry.computeVertexNormals();
    return geometry;
  }

  function createTube(points, radius, material, closed) {
    const curve = points.length === 2
      ? new THREE.LineCurve3(points[0], points[1])
      : new THREE.CatmullRomCurve3(points, closed, "centripetal");
    const geometry = new THREE.TubeGeometry(
      curve,
      Math.max(8, points.length * 8),
      radius,
      10,
      closed
    );
    return new THREE.Mesh(geometry, material);
  }

  const deck_shellGeom = createDeckGeometry();
  const deck_shell = new THREE.Mesh(deck_shellGeom, blue_paintMat);
  deck_shell.name = "deck_shell";
  deck_shell.position.y = 0.35;
  body_group.add(deck_shell);

  const deck_edge_points = [
    new THREE.Vector3(-0.67, 0.34, 0.89),
    new THREE.Vector3(-0.81, 0.34, 0.70),
    new THREE.Vector3(-0.82, 0.34, -0.55),
    new THREE.Vector3(-0.48, 0.34, -0.70),
    new THREE.Vector3(0.48, 0.34, -0.70),
    new THREE.Vector3(0.82, 0.34, -0.55),
    new THREE.Vector3(0.81, 0.34, 0.70),
    new THREE.Vector3(0.67, 0.34, 0.89)
  ];
  const deck_edge_trim = createTube(
    deck_edge_points,
    0.018,
    dark_blueMat,
    true
  );
  deck_edge_trim.name = "deck_edge_trim";
  body_group.add(deck_edge_trim);

  const engine_mount_plateGeom = new THREE.BoxGeometry(0.92, 0.08, 0.78);
  const engine_mount_plate = new THREE.Mesh(
    engine_mount_plateGeom,
    brushed_metalMat
  );
  engine_mount_plate.name = "engine_mount_plate";
  engine_mount_plate.position.set(0, 0.49, 0.28);
  body_group.add(engine_mount_plate);

  const seat_pedestalGeom = new THREE.BoxGeometry(0.62, 0.42, 0.55);
  const seat_pedestal = new THREE.Mesh(seat_pedestalGeom, blue_paintMat);
  seat_pedestal.name = "seat_pedestal";
  seat_pedestal.position.set(0, 0.61, -0.35);
  body_group.add(seat_pedestal);

  const seat_baseGeom = new THREE.SphereGeometry(1, 32, 16);
  const seat_base = new THREE.Mesh(seat_baseGeom, seat_blackMat);
  seat_base.name = "seat_base";
  seat_base.scale.set(0.43, 0.09, 0.37);
  seat_base.position.set(0, 0.84, -0.31);
  body_group.add(seat_base);

  const seat_backrestGeom = new THREE.SphereGeometry(1, 32, 16);
  const seat_backrest = new THREE.Mesh(seat_backrestGeom, seat_blackMat);
  seat_backrest.name = "seat_backrest";
  seat_backrest.scale.set(0.43, 0.36, 0.105);
  seat_backrest.rotation.x = -0.16;
  seat_backrest.position.set(0, 1.13, -0.61);
  body_group.add(seat_backrest);

  const seat_side_bolsterGeom = new THREE.CapsuleGeometry(
    0.075,
    0.36,
    8,
    16
  );
  const left_seat_bolster = new THREE.Mesh(
    seat_side_bolsterGeom,
    seat_blackMat
  );
  left_seat_bolster.name = "left_seat_bolster";
  left_seat_bolster.rotation.x = Math.PI / 2;
  left_seat_bolster.position.set(-0.39, 0.88, -0.35);
  body_group.add(left_seat_bolster);

  const right_seat_bolster = new THREE.Mesh(
    seat_side_bolsterGeom,
    seat_blackMat
  );
  right_seat_bolster.name = "right_seat_bolster";
  right_seat_bolster.rotation.x = Math.PI / 2;
  right_seat_bolster.position.set(0.39, 0.88, -0.35);
  body_group.add(right_seat_bolster);

  const seat_labelGeom = new THREE.PlaneGeometry(0.18, 0.075);
  const seat_label = new THREE.Mesh(seat_labelGeom, label_whiteMat);
  seat_label.name = "seat_label";
  seat_label.rotation.x = -0.16;
  seat_label.position.set(0, 1.285, -0.505);
  body_group.add(seat_label);

  const seat_label_red_markGeom = new THREE.PlaneGeometry(0.055, 0.014);
  const seat_label_red_mark = new THREE.Mesh(
    seat_label_red_markGeom,
    red_accentMat
  );
  seat_label_red_mark.name = "seat_label_red_mark";
  seat_label_red_mark.rotation.x = -0.16;
  seat_label_red_mark.position.set(0.045, 1.287, -0.499);
  body_group.add(seat_label_red_mark);

  const engine_blockGeom = new THREE.BoxGeometry(0.72, 0.34, 0.58);
  const engine_block = new THREE.Mesh(engine_blockGeom, frame_blackMat);
  engine_block.name = "engine_block";
  engine_block.position.set(0, 0.69, 0.31);
  engine_group.add(engine_block);

  const cylinder_headGeom = new THREE.BoxGeometry(0.62, 0.25, 0.20);
  const cylinder_head = new THREE.Mesh(cylinder_headGeom, brushed_metalMat);
  cylinder_head.name = "cylinder_head";
  cylinder_head.position.set(0, 0.73, 0.65);
  engine_group.add(cylinder_head);

  const cylinder_finsGeom = new THREE.BoxGeometry(0.68, 0.025, 0.035);
  const cylinder_fins = new THREE.InstancedMesh(
    cylinder_finsGeom,
    brushed_metalMat,
    6
  );
  cylinder_fins.name = "cylinder_fins";
  const fin_dummy = new THREE.Object3D();
  for (let i = 0; i < 6; i++) {
    fin_dummy.position.set(0, 0.62 + i * 0.045, 0.77);
    fin_dummy.rotation.set(0, 0, 0);
    fin_dummy.updateMatrix();
    cylinder_fins.setMatrixAt(i, fin_dummy.matrix);
  }
  cylinder_fins.instanceMatrix.needsUpdate = true;
  engine_group.add(cylinder_fins);

  const air_filterGeom = new THREE.BoxGeometry(0.23, 0.34, 0.42);
  const air_filter = new THREE.Mesh(air_filterGeom, frame_blackMat);
  air_filter.name = "air_filter";
  air_filter.position.set(-0.49, 0.70, 0.39);
  engine_group.add(air_filter);

  const air_filter_ventsGeom = new THREE.BoxGeometry(0.014, 0.19, 0.028);
  const air_filter_vents = new THREE.InstancedMesh(
    air_filter_ventsGeom,
    seat_blackMat,
    3
  );
  air_filter_vents.name = "air_filter_vents";
  const vent_dummy = new THREE.Object3D();
  for (let i = 0; i < 3; i++) {
    vent_dummy.position.set(-0.612, 0.70, 0.30 + i * 0.075);
    vent_dummy.rotation.set(0, 0, 0);
    vent_dummy.updateMatrix();
    air_filter_vents.setMatrixAt(i, vent_dummy.matrix);
  }
  air_filter_vents.instanceMatrix.needsUpdate = true;
  engine_group.add(air_filter_vents);

  const crankcaseGeom = new THREE.CylinderGeometry(0.235, 0.235, 0.18, 32);
  const crankcase = new THREE.Mesh(crankcaseGeom, brushed_metalMat);
  crankcase.name = "crankcase";
  crankcase.rotation.z = Math.PI / 2;
  crankcase.position.set(0.45, 0.70, 0.31);
  engine_group.add(crankcase);

  const crankcase_coverGeom = new THREE.CylinderGeometry(
    0.195,
    0.195,
    0.035,
    32
  );
  const crankcase_cover = new THREE.Mesh(
    crankcase_coverGeom,
    silver_metalMat
  );
  crankcase_cover.name = "crankcase_cover";
  crankcase_cover.rotation.z = Math.PI / 2;
  crankcase_cover.position.set(0.56, 0.70, 0.31);
  engine_group.add(crankcase_cover);

  const crankcase_ringGeom = new THREE.TorusGeometry(0.205, 0.014, 10, 32);
  const crankcase_ring = new THREE.Mesh(crankcase_ringGeom, silver_metalMat);
  crankcase_ring.name = "crankcase_ring";
  crankcase_ring.rotation.y = Math.PI / 2;
  crankcase_ring.position.set(0.58, 0.70, 0.31);
  engine_group.add(crankcase_ring);

  const fuel_lineGeom = new THREE.CylinderGeometry(0.018, 0.018, 0.20, 12);
  const fuel_line = new THREE.Mesh(fuel_lineGeom, silver_metalMat);
  fuel_line.name = "fuel_line";
  fuel_line.position.set(0.25, 0.91, 0.48);
  engine_group.add(fuel_line);

  const engine_shroudGeom = new THREE.BufferGeometry();
  const shroud_positions = [];
  const shroud_indices = [];
  const shroud_segments = 24;

  for (let i = 0; i <= shroud_segments; i++) {
    const angle = i / shroud_segments * Math.PI * 2;
    const sideAmount = Math.abs(Math.sin(angle));
    const lowerY = 0.56 - sideAmount * 0.025;
    const upperY = 1.04 - sideAmount * 0.16;
    const lowerRadius = 0.50 - sideAmount * 0.055;
    const upperRadius = 0.43 - sideAmount * 0.075;
    const sinA = Math.sin(angle);
    const cosA = Math.cos(angle);

    shroud_positions.push(
      sinA * lowerRadius,
      lowerY,
      cosA * lowerRadius
    );
    shroud_positions.push(
      sinA * upperRadius,
      upperY,
      cosA * upperRadius
    );
  }

  for (let i = 0; i < shroud_segments; i++) {
    const lower0 = i * 2;
    const upper0 = lower0 + 1;
    const lower1 = lower0 + 2;
    const upper1 = lower0 + 3;
    shroud_indices.push(lower0, lower1, upper0);
    shroud_indices.push(lower1, upper1, upper0);
  }

  engine_shroudGeom.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(shroud_positions, 3)
  );
  engine_shroudGeom.setIndex(shroud_indices);
  engine_shroudGeom.computeVertexNormals();

  const engine_shroud = new THREE.Mesh(engine_shroudGeom, blue_paintMat);
  engine_shroud.name = "engine_shroud";
  engine_shroud.position.set(0, 0, 0.30);
  engine_group.add(engine_shroud);

  const shroud_lower_rimGeom = new THREE.TorusGeometry(0.47, 0.025, 10, 40);
  const shroud_lower_rim = new THREE.Mesh(
    shroud_lower_rimGeom,
    blue_paintMat
  );
  shroud_lower_rim.name = "shroud_lower_rim";
  shroud_lower_rim.rotation.x = Math.PI / 2;
  shroud_lower_rim.scale.set(1.06, 1.0, 0.92);
  shroud_lower_rim.position.set(0, 0.56, 0.30);
  engine_group.add(shroud_lower_rim);

  const fuel_cap_baseGeom = new THREE.CylinderGeometry(
    0.19,
    0.21,
    0.075,
    32
  );
  const fuel_cap_base = new THREE.Mesh(fuel_cap_baseGeom, blue_paintMat);
  fuel_cap_base.name = "fuel_cap_base";
  fuel_cap_base.position.set(0, 1.075, 0.30);
  engine_group.add(fuel_cap_base);

  const fuel_capGeom = new THREE.CylinderGeometry(0.16, 0.17, 0.09, 32);
  const fuel_cap = new THREE.Mesh(fuel_capGeom, frame_blackMat);
  fuel_cap.name = "fuel_cap";
  fuel_cap.position.set(0, 1.145, 0.30);
  engine_group.add(fuel_cap);

  const fuel_cap_topGeom = new THREE.CylinderGeometry(
    0.135,
    0.145,
    0.018,
    32
  );
  const fuel_cap_top = new THREE.Mesh(fuel_cap_topGeom, frame_blackMat);
  fuel_cap_top.name = "fuel_cap_top";
  fuel_cap_top.position.set(0, 1.198, 0.30);
  engine_group.add(fuel_cap_top);

  const fuel_cap_ribsGeom = new THREE.BoxGeometry(0.025, 0.075, 0.052);
  const fuel_cap_ribs = new THREE.InstancedMesh(
    fuel_cap_ribsGeom,
    frame_blackMat,
    20
  );
  fuel_cap_ribs.name = "fuel_cap_ribs";
  const rib_dummy = new THREE.Object3D();
  for (let i = 0; i < 20; i++) {
    const angle = i / 20 * Math.PI * 2;
    rib_dummy.position.set(
      Math.sin(angle) * 0.168,
      1.145,
      0.30 + Math.cos(angle) * 0.168
    );
    rib_dummy.rotation.set(0, angle, 0);
    rib_dummy.updateMatrix();
    fuel_cap_ribs.setMatrixAt(i, rib_dummy.matrix);
  }
  fuel_cap_ribs.instanceMatrix.needsUpdate = true;
  engine_group.add(fuel_cap_ribs);

  const deck_boltsGeom = new THREE.CylinderGeometry(
    0.022,
    0.022,
    0.018,
    12
  );
  const deck_bolts = new THREE.InstancedMesh(
    deck_boltsGeom,
    silver_metalMat,
    8
  );
  deck_bolts.name = "deck_bolts";
  const deck_bolt_positions = [
    [-0.67, 0.47, 0.62],
    [0.67, 0.47, 0.62],
    [-0.72, 0.47, -0.47],
    [0.72, 0.47, -0.47],
    [-0.45, 0.47, -0.65],
    [0.45, 0.47, -0.65],
    [-0.50, 0.47, 0.78],
    [0.50, 0.47, 0.78]
  ];
  const bolt_dummy = new THREE.Object3D();
  for (let i = 0; i < deck_bolt_positions.length; i++) {
    const position = deck_bolt_positions[i];
    bolt_dummy.position.set(position[0], position[1], position[2]);
    bolt_dummy.rotation.set(0, 0, 0);
    bolt_dummy.updateMatrix();
    deck_bolts.setMatrixAt(i, bolt_dummy.matrix);
  }
  deck_bolts.instanceMatrix.needsUpdate = true;
  body_group.add(deck_bolts);

  const front_axleGeom = new THREE.CylinderGeometry(0.035, 0.035, 1.68, 16);
  const front_axle = new THREE.Mesh(front_axleGeom, frame_blackMat);
  front_axle.name = "front_axle";
  front_axle.rotation.z = Math.PI / 2;
  front_axle.position.set(0, 0.31, 0.69);
  wheel_group.add(front_axle);

  const rear_axleGeom = new THREE.CylinderGeometry(0.045, 0.045, 1.82, 16);
  const rear_axle = new THREE.Mesh(rear_axleGeom, frame_blackMat);
  rear_axle.name = "rear_axle";
  rear_axle.rotation.z = Math.PI / 2;
  rear_axle.position.set(0, 0.40, -0.58);
  wheel_group.add(rear_axle);

  const front_wheel_tiresGeom = new THREE.TorusGeometry(
    0.215,
    0.095,
    14,
    32
  );
  const front_wheel_tires = new THREE.InstancedMesh(
    front_wheel_tiresGeom,
    tire_blackMat,
    2
  );
  front_wheel_tires.name = "front_wheel_tires";

  const rear_wheel_tiresGeom = new THREE.TorusGeometry(
    0.255,
    0.115,
    14,
    36
  );
  const rear_wheel_tires = new THREE.InstancedMesh(
    rear_wheel_tiresGeom,
    tire_blackMat,
    2
  );
  rear_wheel_tires.name = "rear_wheel_tires";

  const front_wheel_rimsGeom = new THREE.CylinderGeometry(
    0.145,
    0.145,
    0.17,
    28
  );
  const front_wheel_rims = new THREE.InstancedMesh(
    front_wheel_rimsGeom,
    silver_metalMat,
    2
  );
  front_wheel_rims.name = "front_wheel_rims";

  const rear_wheel_rimsGeom = new THREE.CylinderGeometry(
    0.175,
    0.175,
    0.20,
    30
  );
  const rear_wheel_rims = new THREE.InstancedMesh(
    rear_wheel_rimsGeom,
    silver_metalMat,
    2
  );
  rear_wheel_rims.name = "rear_wheel_rims";

  const wheel_dummy = new THREE.Object3D();
  for (let i = 0; i < 2; i++) {
    const side = i === 0 ? -1 : 1;

    wheel_dummy.position.set(side * 0.86, 0.31, 0.69);
    wheel_dummy.rotation.set(0, Math.PI / 2, 0);
    wheel_dummy.updateMatrix();
    front_wheel_tires.setMatrixAt(i, wheel_dummy.matrix);

    wheel_dummy.position.set(side * 0.86, 0.31, 0.69);
    wheel_dummy.rotation.set(0, 0, Math.PI / 2);
    wheel_dummy.updateMatrix();
    front_wheel_rims.setMatrixAt(i, wheel_dummy.matrix);

    wheel_dummy.position.set(side * 0.94, 0.40, -0.58);
    wheel_dummy.rotation.set(0, Math.PI / 2, 0);
    wheel_dummy.updateMatrix();
    rear_wheel_tires.setMatrixAt(i, wheel_dummy.matrix);

    wheel_dummy.position.set(side * 0.94, 0.40, -0.58);
    wheel_dummy.rotation.set(0, 0, Math.PI / 2);
    wheel_dummy.updateMatrix();
    rear_wheel_rims.setMatrixAt(i, wheel_dummy.matrix);
  }
  front_wheel_tires.instanceMatrix.needsUpdate = true;
  front_wheel_rims.instanceMatrix.needsUpdate = true;
  rear_wheel_tires.instanceMatrix.needsUpdate = true;
  rear_wheel_rims.instanceMatrix.needsUpdate = true;
  wheel_group.add(
    front_wheel_tires,
    front_wheel_rims,
    rear_wheel_tires,
    rear_wheel_rims
  );

  const front_wheel_spokesGeom = new THREE.BoxGeometry(0.025, 0.13, 0.035);
  const front_wheel_spokes = new THREE.InstancedMesh(
    front_wheel_spokesGeom,
    silver_metalMat,
    10
  );
  front_wheel_spokes.name = "front_wheel_spokes";

  const rear_wheel_spokesGeom = new THREE.BoxGeometry(0.025, 0.16, 0.042);
  const rear_wheel_spokes = new THREE.InstancedMesh(
    rear_wheel_spokesGeom,
    silver_metalMat,
    10
  );
  rear_wheel_spokes.name = "rear_wheel_spokes";

  const spoke_dummy = new THREE.Object3D();
  let spoke_index = 0;
  for (let sideIndex = 0; sideIndex < 2; sideIndex++) {
    const side = sideIndex === 0 ? -1 : 1;
    for (let i = 0; i < 5; i++) {
      const angle = i / 5 * Math.PI * 2;
      spoke_dummy.position.set(
        side * 0.955,
        0.31 + Math.cos(angle) * 0.07,
        0.69 + Math.sin(angle) * 0.07
      );
      spoke_dummy.rotation.set(angle, 0, 0);
      spoke_dummy.updateMatrix();
      front_wheel_spokes.setMatrixAt(spoke_index, spoke_dummy.matrix);

      spoke_dummy.position.set(
        side * 1.055,
        0.40 + Math.cos(angle) * 0.085,
        -0.58 + Math.sin(angle) * 0.085
      );
      spoke_dummy.rotation.set(angle, 0, 0);
      spoke_dummy.updateMatrix();
      rear_wheel_spokes.setMatrixAt(spoke_index, spoke_dummy.matrix);
      spoke_index++;
    }
  }
  front_wheel_spokes.instanceMatrix.needsUpdate = true;
  rear_wheel_spokes.instanceMatrix.needsUpdate = true;
  wheel_group.add(front_wheel_spokes, rear_wheel_spokes);

  const front_hub_capsGeom = new THREE.CylinderGeometry(
    0.045,
    0.045,
    0.025,
    18
  );
  const front_hub_caps = new THREE.InstancedMesh(
    front_hub_capsGeom,
    silver_metalMat,
    2
  );
  front_hub_caps.name = "front_hub_caps";

  const rear_hub_capsGeom = new THREE.CylinderGeometry(
    0.052,
    0.052,
    0.025,
    18
  );
  const rear_hub_caps = new THREE.InstancedMesh(
    rear_hub_capsGeom,
    silver_metalMat,
    2
  );
  rear_hub_caps.name = "rear_hub_caps";

  const hub_dummy = new THREE.Object3D();
  for (let i = 0; i < 2; i++) {
    const side = i === 0 ? -1 : 1;

    hub_dummy.position.set(side * 0.965, 0.31, 0.69);
    hub_dummy.rotation.set(0, 0, Math.PI / 2);
    hub_dummy.updateMatrix();
    front_hub_caps.setMatrixAt(i, hub_dummy.matrix);

    hub_dummy.position.set(side * 1.065, 0.40, -0.58);
    hub_dummy.rotation.set(0, 0, Math.PI / 2);
    hub_dummy.updateMatrix();
    rear_hub_caps.setMatrixAt(i, hub_dummy.matrix);
  }
  front_hub_caps.instanceMatrix.needsUpdate = true;
  rear_hub_caps.instanceMatrix.needsUpdate = true;
  wheel_group.add(front_hub_caps, rear_hub_caps);

  const tire_treadsGeom = new THREE.BoxGeometry(0.055, 0.032, 0.075);
  const tread_count_per_wheel = 24;
  const tire_treads = new THREE.InstancedMesh(
    tire_treadsGeom,
    tire_blackMat,
    tread_count_per_wheel * 4
  );
  tire_treads.name = "tire_treads";

  const tread_dummy = new THREE.Object3D();
  let tread_index = 0;
  const wheel_specs = [
    [-0.86, 0.31, 0.69, 0.310, 0.040],
    [0.86, 0.31, 0.69, 0.310, 0.040],
    [-0.94, 0.40, -0.58, 0.370, 0.045],
    [0.94, 0.40, -0.58, 0.370, 0.045]
  ];

  for (let wheelIndex = 0; wheelIndex < wheel_specs.length; wheelIndex++) {
    const spec = wheel_specs[wheelIndex];
    for (let i = 0; i < tread_count_per_wheel; i++) {
      const angle = i / tread_count_per_wheel * Math.PI * 2;
      tread_dummy.position.set(
        spec[0],
        spec[1] + Math.cos(angle) * spec[3],
        spec[2] + Math.sin(angle) * spec[3]
      );
      tread_dummy.rotation.set(angle, 0, 0);
      tread_dummy.updateMatrix();
      tire_treads.setMatrixAt(tread_index, tread_dummy.matrix);
      tread_index++;
    }
  }
  tire_treads.instanceMatrix.needsUpdate = true;
  wheel_group.add(tire_treads);

  const left_handle_rail = createTube(
    [
      new THREE.Vector3(-0.58, 0.48, -0.62),
      new THREE.Vector3(-0.64, 0.82, -0.78),
      new THREE.Vector3(-0.70, 1.28, -0.98),
      new THREE.Vector3(-0.72, 1.66, -1.16),
      new THREE.Vector3(-0.64, 1.82, -1.25)
    ],
    0.045,
    frame_blackMat,
    false
  );
  left_handle_rail.name = "left_handle_rail";
  handle_group.add(left_handle_rail);

  const right_handle_rail = createTube(
    [
      new THREE.Vector3(0.58, 0.48, -0.62),
      new THREE.Vector3(0.64, 0.82, -0.78),
      new THREE.Vector3(0.70, 1.28, -0.98),
      new THREE.Vector3(0.72, 1.66, -1.16),
      new THREE.Vector3(0.64, 1.82, -1.25)
    ],
    0.045,
    frame_blackMat,
    false
  );
  right_handle_rail.name = "right_handle_rail";
  handle_group.add(right_handle_rail);

  const top_handle_grip = createTube(
    [
      new THREE.Vector3(-0.64, 1.82, -1.25),
      new THREE.Vector3(-0.48, 1.87, -1.31),
      new THREE.Vector3(0.48, 1.87, -1.31),
      new THREE.Vector3(0.64, 1.82, -1.25)
    ],
    0.052,
    frame_blackMat,
    false
  );
  top_handle_grip.name = "top_handle_grip";
  handle_group.add(top_handle_grip);

  const control_bar = createTube(
    [
      new THREE.Vector3(-0.61, 1.48, -1.08),
      new THREE.Vector3(-0.36, 1.55, -1.12),
      new THREE.Vector3(0.36, 1.55, -1.12),
      new THREE.Vector3(0.61, 1.48, -1.08)
    ],
    0.022,
    frame_blackMat,
    false
  );
  control_bar.name = "control_bar";
  handle_group.add(control_bar);

  const control_cable = createTube(
    [
      new THREE.Vector3(-0.57, 1.43, -1.04),
      new THREE.Vector3(-0.48, 1.18, -0.88),
      new THREE.Vector3(-0.37, 0.91, -0.67),
      new THREE.Vector3(-0.28, 0.78, -0.48)
    ],
    0.009,
    seat_blackMat,
    false
  );
  control_cable.name = "control_cable";
  handle_group.add(control_cable);

  const safety_lever = createTube(
    [
      new THREE.Vector3(0.57, 1.49, -1.08),
      new THREE.Vector3(0.68, 1.51, -1.10),
      new THREE.Vector3(0.75, 1.46, -1.07)
    ],
    0.018,
    frame_blackMat,
    false
  );
  safety_lever.name = "safety_lever";
  handle_group.add(safety_lever);

  const left_handle_pivotGeom = new THREE.CylinderGeometry(
    0.075,
    0.075,
    0.045,
    20
  );
  const left_handle_pivot = new THREE.Mesh(
    left_handle_pivotGeom,
    frame_blackMat
  );
  left_handle_pivot.name = "left_handle_pivot";
  left_handle_pivot.rotation.z = Math.PI / 2;
  left_handle_pivot.position.set(-0.62, 0.72, -0.72);
  handle_group.add(left_handle_pivot);

  const right_handle_pivot = new THREE.Mesh(
    left_handle_pivotGeom,
    frame_blackMat
  );
  right_handle_pivot.name = "right_handle_pivot";
  right_handle_pivot.rotation.z = Math.PI / 2;
  right_handle_pivot.position.set(0.62, 0.72, -0.72);
  handle_group.add(right_handle_pivot);

  const handle_pivot_boltsGeom = new THREE.CylinderGeometry(
    0.025,
    0.025,
    0.052,
    14
  );
  const handle_pivot_bolts = new THREE.InstancedMesh(
    handle_pivot_boltsGeom,
    silver_metalMat,
    2
  );
  handle_pivot_bolts.name = "handle_pivot_bolts";
  const handle_bolt_dummy = new THREE.Object3D();
  for (let i = 0; i < 2; i++) {
    const side = i === 0 ? -1 : 1;
    handle_bolt_dummy.position.set(side * 0.65, 0.72, -0.72);
    handle_bolt_dummy.rotation.set(0, 0, Math.PI / 2);
    handle_bolt_dummy.updateMatrix();
    handle_pivot_bolts.setMatrixAt(i, handle_bolt_dummy.matrix);
  }
  handle_pivot_bolts.instanceMatrix.needsUpdate = true;
  handle_group.add(handle_pivot_bolts);

  fitToUnitCube(THREE, root);
  return root;

  function fitToUnitCube(THREE, object) {
    const box = new THREE.Box3().setFromObject(object);
    const size = new THREE.Vector3();
    box.getSize(size);
    const center = new THREE.Vector3();
    box.getCenter(center);
    object.position.sub(center);
    const maxDim = Math.max(size.x, size.y, size.z);
    if (maxDim > 0) {
      const scale = 0.95 / maxDim;
      object.scale.setScalar(scale);
    }
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
