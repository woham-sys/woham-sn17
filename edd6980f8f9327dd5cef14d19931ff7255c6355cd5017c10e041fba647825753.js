function __sn17_user(THREE) {
  const root = new THREE.Group();
  root.name = "miniature_cottage";

  const base_group = new THREE.Group();
  base_group.name = "base_group";
  const house_group = new THREE.Group();
  house_group.name = "house_group";
  const roof_group = new THREE.Group();
  roof_group.name = "roof_group";
  const fence_group = new THREE.Group();
  fence_group.name = "fence_group";
  const garden_group = new THREE.Group();
  garden_group.name = "garden_group";

  root.add(base_group, house_group, roof_group, fence_group, garden_group);

  const wallMat = new THREE.MeshStandardMaterial({ color: 0x8fd3f2, metalness: 0.0, roughness: 0.8 });
  const whiteTrimMat = new THREE.MeshStandardMaterial({ color: 0xf4f5ef, metalness: 0.0, roughness: 0.65 });
  const redDoorMat = new THREE.MeshStandardMaterial({ color: 0xd9232e, metalness: 0.0, roughness: 0.55 });
  const darkRedMat = new THREE.MeshStandardMaterial({ color: 0x8f111b, metalness: 0.0, roughness: 0.65 });
  const roofMat = new THREE.MeshStandardMaterial({ color: 0x3d4b5c, metalness: 0.0, roughness: 0.9 });
  const shingleMat = new THREE.MeshStandardMaterial({ color: 0x536274, metalness: 0.0, roughness: 0.9 });
  const slateLineMat = new THREE.MeshStandardMaterial({ color: 0x202936, metalness: 0.0, roughness: 0.95 });
  const blackMetalMat = new THREE.MeshStandardMaterial({ color: 0x11161b, metalness: 0.35, roughness: 0.5 });
  const brickMat = new THREE.MeshStandardMaterial({ color: 0x9b6548, metalness: 0.0, roughness: 0.9 });
  const darkBrickMat = new THREE.MeshStandardMaterial({ color: 0x654536, metalness: 0.0, roughness: 0.95 });
  const windowGlassMat = new THREE.MeshPhysicalMaterial({
    color: 0xb8c8c8,
    metalness: 0.0,
    roughness: 0.15,
    transparent: true,
    opacity: 0.5
  });
  const interiorMat = new THREE.MeshStandardMaterial({ color: 0x526064, metalness: 0.0, roughness: 0.85 });
  const grassMat = new THREE.MeshStandardMaterial({ color: 0x6f963d, metalness: 0.0, roughness: 0.95 });
  const grassDarkMat = new THREE.MeshStandardMaterial({ color: 0x3f6f2f, metalness: 0.0, roughness: 0.95 });
  const baseBoardMat = new THREE.MeshStandardMaterial({ color: 0xc9ad78, metalness: 0.0, roughness: 0.8 });
  const pathMat = new THREE.MeshStandardMaterial({ color: 0x9aa09a, metalness: 0.0, roughness: 0.9 });
  const leafMat = new THREE.MeshStandardMaterial({ color: 0x2f7134, metalness: 0.0, roughness: 0.85 });
  const purpleFlowerMat = new THREE.MeshStandardMaterial({ color: 0x5f4fc9, metalness: 0.0, roughness: 0.75 });
  const whiteFlowerMat = new THREE.MeshStandardMaterial({ color: 0xffffff, metalness: 0.0, roughness: 0.75 });
  const yellowFlowerMat = new THREE.MeshStandardMaterial({ color: 0xe7d84a, metalness: 0.0, roughness: 0.75 });

  function addBox(parent, name, w, h, d, mat, x, y, z) {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
    mesh.name = name;
    mesh.position.set(x, y, z);
    parent.add(mesh);
    return mesh;
  }

  function addCylinderX(parent, name, radius, length, mat, x, y, z) {
    const mesh = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius, length, 16), mat);
    mesh.name = name;
    mesh.rotation.z = Math.PI / 2;
    mesh.position.set(x, y, z);
    parent.add(mesh);
    return mesh;
  }

  function addCylinderY(parent, name, radius, height, mat, x, y, z) {
    const mesh = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius, height, 16), mat);
    mesh.name = name;
    mesh.position.set(x, y, z);
    parent.add(mesh);
    return mesh;
  }

  const base_board = addBox(base_group, "base_board", 3.4, 0.08, 2.55, baseBoardMat, 0, 0.04, 0);
  const grass_layer = addBox(base_group, "grass_layer", 3.34, 0.045, 2.49, grassMat, 0, 0.105, 0);

  const house_w = 2.15;
  const house_d = 1.35;
  const wall_h = 1.05;
  const wall_y = 0.64;
  const front_z = house_d / 2;
  const back_z = -house_d / 2;
  const eave_y = 1.16;
  const ridge_y = 1.72;
  const roof_run = 0.82;
  const roof_rise = ridge_y - eave_y;
  const roof_angle = Math.atan2(roof_rise, roof_run);
  const roof_slope_len = Math.sqrt(roof_run * roof_run + roof_rise * roof_rise);

  const front_wall = addBox(house_group, "front_wall", house_w, wall_h, 0.06, wallMat, 0, wall_y, front_z);
  const back_wall = addBox(house_group, "back_wall", house_w, wall_h, 0.06, wallMat, 0, wall_y, back_z);
  const left_wall = addBox(house_group, "left_wall", 0.06, wall_h, house_d, wallMat, -house_w / 2, wall_y, 0);
  const right_wall = addBox(house_group, "right_wall", 0.06, wall_h, house_d, wallMat, house_w / 2, wall_y, 0);

  const gableShape = new THREE.Shape();
  gableShape.moveTo(-house_w / 2, 0);
  gableShape.lineTo(house_w / 2, 0);
  gableShape.lineTo(0, ridge_y - eave_y);
  gableShape.lineTo(-house_w / 2, 0);
  const gableGeom = new THREE.ExtrudeGeometry(gableShape, { depth: 0.055, steps: 1 });

  const front_gable = new THREE.Mesh(gableGeom, wallMat);
  front_gable.name = "front_gable";
  front_gable.position.set(0, eave_y, front_z + 0.005);
  house_group.add(front_gable);

  const back_gable = new THREE.Mesh(gableGeom, wallMat);
  back_gable.name = "back_gable";
  back_gable.position.set(0, eave_y, back_z - 0.005);
  back_gable.rotation.y = Math.PI;
  house_group.add(back_gable);

  const roof_panel_geom = new THREE.BoxGeometry(2.42, 0.055, roof_slope_len);
  const front_roof = new THREE.Mesh(roof_panel_geom, roofMat);
  front_roof.name = "front_roof";
  front_roof.rotation.x = roof_angle;
  front_roof.position.set(0, (ridge_y + eave_y) / 2, roof_run / 2);
  roof_group.add(front_roof);

  const back_roof = new THREE.Mesh(roof_panel_geom, roofMat);
  back_roof.name = "back_roof";
  back_roof.rotation.x = -roof_angle;
  back_roof.position.set(0, (ridge_y + eave_y) / 2, -roof_run / 2);
  roof_group.add(back_roof);

  const ridge_cap = addCylinderX(roof_group, "ridge_cap", 0.045, 2.44, slateLineMat, 0, ridge_y + 0.035, 0);
  const front_eave_fascia = addBox(roof_group, "front_eave_fascia", 2.44, 0.06, 0.055, slateLineMat, 0, eave_y, roof_run + 0.015);
  const back_eave_fascia = addBox(roof_group, "back_eave_fascia", 2.44, 0.06, 0.055, slateLineMat, 0, eave_y, -roof_run - 0.015);

  const shingle_rows = 7;
  const shingle_cols = 12;
  const shingle_step_x = 2.34 / shingle_cols;
  const shingle_step_z = roof_slope_len / shingle_rows;
  const roof_shingles = new THREE.InstancedMesh(
    new THREE.BoxGeometry(shingle_step_x * 0.92, 0.018, shingle_step_z * 0.92),
    shingleMat,
    shingle_rows * shingle_cols * 2
  );
  roof_shingles.name = "roof_shingles";
  const dummy = new THREE.Object3D();
  let instance_index = 0;
  for (const side of [1, -1]) {
    for (let row = 0; row < shingle_rows; row++) {
      const t = (row + 0.5) / shingle_rows;
      const normal_y = Math.cos(roof_angle);
      const normal_z = side * Math.sin(roof_angle);
      const y = ridge_y - roof_rise * t + normal_y * 0.04;
      const z = side * roof_run * t + normal_z * 0.04;
      for (let col = 0; col < shingle_cols; col++) {
        const x = -1.17 + (col + 0.5) * shingle_step_x;
        dummy.position.set(x, y, z);
        dummy.rotation.set(side * roof_angle, 0, 0);
        dummy.updateMatrix();
        roof_shingles.setMatrixAt(instance_index++, dummy.matrix);
      }
    }
  }
  roof_shingles.instanceMatrix.needsUpdate = true;
  roof_group.add(roof_shingles);

  const roof_course_lines = new THREE.InstancedMesh(
    new THREE.BoxGeometry(2.34, 0.012, 0.012),
    slateLineMat,
    (shingle_rows - 1) * 2
  );
  roof_course_lines.name = "roof_course_lines";
  instance_index = 0;
  for (const side of [1, -1]) {
    for (let row = 1; row < shingle_rows; row++) {
      const t = row / shingle_rows;
      const normal_y = Math.cos(roof_angle);
      const normal_z = side * Math.sin(roof_angle);
      dummy.position.set(
        0,
        ridge_y - roof_rise * t + normal_y * 0.052,
        side * roof_run * t + normal_z * 0.052
      );
      dummy.rotation.set(side * roof_angle, 0, 0);
      dummy.updateMatrix();
      roof_course_lines.setMatrixAt(instance_index++, dummy.matrix);
    }
  }
  roof_course_lines.instanceMatrix.needsUpdate = true;
  roof_group.add(roof_course_lines);

  const roof_vertical_seams = new THREE.InstancedMesh(
    new THREE.BoxGeometry(0.012, 0.012, shingle_step_z * 0.82),
    slateLineMat,
    shingle_cols * 2
  );
  roof_vertical_seams.name = "roof_vertical_seams";
  instance_index = 0;
  for (const side of [1, -1]) {
    for (let col = 1; col < shingle_cols; col++) {
      const x = -1.17 + col * shingle_step_x;
      const t = 0.5;
      const normal_y = Math.cos(roof_angle);
      const normal_z = side * Math.sin(roof_angle);
      dummy.position.set(
        x,
        ridge_y - roof_rise * t + normal_y * 0.055,
        side * roof_run * t + normal_z * 0.055
      );
      dummy.rotation.set(side * roof_angle, 0, 0);
      dummy.updateMatrix();
      roof_vertical_seams.setMatrixAt(instance_index++, dummy.matrix);
    }
  }
  roof_vertical_seams.instanceMatrix.needsUpdate = true;
  roof_group.add(roof_vertical_seams);

  const front_trim_left = addBox(house_group, "front_trim_left", 0.055, 1.0, 0.045, whiteTrimMat, -1.08, 1.43, front_z + 0.075);
  front_trim_left.rotation.z = -0.72;
  const front_trim_right = addBox(house_group, "front_trim_right", 0.055, 1.0, 0.045, whiteTrimMat, 1.08, 1.43, front_z + 0.075);
  front_trim_right.rotation.z = 0.72;
  const back_trim_left = addBox(house_group, "back_trim_left", 0.055, 1.0, 0.045, whiteTrimMat, -1.08, 1.43, back_z - 0.075);
  back_trim_left.rotation.z = -0.72;
  const back_trim_right = addBox(house_group, "back_trim_right", 0.055, 1.0, 0.045, whiteTrimMat, 1.08, 1.43, back_z - 0.075);
  back_trim_right.rotation.z = 0.72;

  function createWindow(name, w, h) {
    const window_group = new THREE.Group();
    window_group.name = name;

    const window_interior = addBox(window_group, name + "_interior", w, h, 0.025, interiorMat, 0, 0, 0);
    const window_glass = addBox(window_group, name + "_glass", w * 0.92, h * 0.92, 0.018, windowGlassMat, 0, 0, 0.025);
    const window_top_frame = addBox(window_group, name + "_top_frame", w + 0.13, 0.055, 0.055, whiteTrimMat, 0, h / 2 + 0.035, 0.055);
    const window_bottom_frame = addBox(window_group, name + "_bottom_frame", w + 0.13, 0.055, 0.055, whiteTrimMat, 0, -h / 2 - 0.035, 0.055);
    const window_left_frame = addBox(window_group, name + "_left_frame", 0.055, h + 0.12, 0.055, whiteTrimMat, -w / 2 - 0.035, 0, 0.055);
    const window_right_frame = addBox(window_group, name + "_right_frame", 0.055, h + 0.12, 0.055, whiteTrimMat, w / 2 + 0.035, 0, 0.055);
    const window_center_mullion = addBox(window_group, name + "_center_mullion", 0.035, h, 0.045, whiteTrimMat, 0, 0, 0.075);
    const window_upper_mullion = addBox(window_group, name + "_upper_mullion", w, 0.035, 0.045, whiteTrimMat, 0, h / 6, 0.075);
    const window_lower_mullion = addBox(window_group, name + "_lower_mullion", w, 0.035, 0.045, whiteTrimMat, 0, -h / 6, 0.075);
    const window_sill = addBox(window_group, name + "_sill", w + 0.22, 0.06, 0.11, whiteTrimMat, 0, -h / 2 - 0.09, 0.075);

    return window_group;
  }

  const front_upper_window = createWindow("front_upper_window", 0.28, 0.38);
  front_upper_window.position.set(-0.48, 1.42, front_z + 0.085);
  house_group.add(front_upper_window);

  const front_lower_window = createWindow("front_lower_window", 0.30, 0.42);
  front_lower_window.position.set(-0.78, 0.73, front_z + 0.085);
  house_group.add(front_lower_window);

  const right_front_window = createWindow("right_front_window", 0.29, 0.42);
  right_front_window.position.set(house_w / 2 + 0.085, 0.74, 0.34);
  right_front_window.rotation.y = Math.PI / 2;
  house_group.add(right_front_window);

  const right_back_window = createWindow("right_back_window", 0.29, 0.42);
  right_back_window.position.set(house_w / 2 + 0.085, 0.74, -0.36);
  right_back_window.rotation.y = Math.PI / 2;
  house_group.add(right_back_window);

  const door_x = 0.22;
  const door_w = 0.36;
  const door_h = 0.86;
  const door_y = 0.58;

  const front_door = addBox(house_group, "front_door", door_w, door_h, 0.055, redDoorMat, door_x, door_y, front_z + 0.075);
  const door_left_frame = addBox(house_group, "door_left_frame", 0.06, 0.94, 0.07, whiteTrimMat, door_x - door_w / 2 - 0.045, door_y, front_z + 0.105);
  const door_right_frame = addBox(house_group, "door_right_frame", 0.06, 0.94, 0.07, whiteTrimMat, door_x + door_w / 2 + 0.045, door_y, front_z + 0.105);
  const door_top_frame = addBox(house_group, "door_top_frame", door_w + 0.15, 0.065, 0.07, whiteTrimMat, door_x, door_y + door_h / 2 + 0.045, front_z + 0.105);
  const door_threshold = addBox(house_group, "door_threshold", door_w + 0.12, 0.055, 0.12, whiteTrimMat, door_x, 0.145, front_z + 0.105);

  const door_upper_panel = addBox(house_group, "door_upper_panel", 0.22, 0.20, 0.025, darkRedMat, door_x, 0.83, front_z + 0.115);
  const door_middle_panel = addBox(house_group, "door_middle_panel", 0.22, 0.18, 0.025, darkRedMat, door_x, 0.58, front_z + 0.115);
  const door_lower_panel = addBox(house_group, "door_lower_panel", 0.22, 0.20, 0.025, darkRedMat, door_x, 0.33, front_z + 0.115);
  const door_handle_ring = new THREE.Mesh(new THREE.TorusGeometry(0.035, 0.008, 8, 18), blackMetalMat);
  door_handle_ring.name = "door_handle_ring";
  door_handle_ring.position.set(door_x, 0.66, front_z + 0.145);
  house_group.add(door_handle_ring);

  const door_knob = new THREE.Mesh(new THREE.SphereGeometry(0.025, 12, 8), blackMetalMat);
  door_knob.name = "door_knob";
  door_knob.position.set(door_x + door_w / 2 - 0.035, 0.58, front_z + 0.15);
  house_group.add(door_knob);

  const left_hinge = addBox(house_group, "left_hinge", 0.035, 0.075, 0.025, blackMetalMat, door_x - door_w / 2 + 0.015, 0.78, front_z + 0.14);
  const lower_hinge = addBox(house_group, "lower_hinge", 0.035, 0.075, 0.025, blackMetalMat, door_x - door_w / 2 + 0.015, 0.36, front_z + 0.14);

  const downspout_curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(1.13, 1.12, front_z + 0.03),
    new THREE.Vector3(1.18, 1.03, front_z + 0.12),
    new THREE.Vector3(1.18, 0.82, front_z + 0.14),
    new THREE.Vector3(1.18, 0.20, front_z + 0.14)
  ]);
  const downspout = new THREE.Mesh(new THREE.TubeGeometry(downspout_curve, 24, 0.025, 10), blackMetalMat);
  downspout.name = "downspout";
  house_group.add(downspout);

  const gutter_curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-1.18, 1.13, front_z + 0.08),
    new THREE.Vector3(-0.6, 1.12, front_z + 0.11),
    new THREE.Vector3(0.0, 1.12, front_z + 0.11),
    new THREE.Vector3(0.6, 1.12, front_z + 0.11),
    new THREE.Vector3(1.13, 1.12, front_z + 0.08)
  ]);
  const front_gutter = new THREE.Mesh(new THREE.TubeGeometry(gutter_curve, 32, 0.022, 10), blackMetalMat);
  front_gutter.name = "front_gutter";
  house_group.add(front_gutter);

  const chimney_stack = addBox(house_group, "chimney_stack", 0.28, 0.58, 0.28, brickMat, 0.55, 1.72, -0.18);
  const chimney_cap = addBox(house_group, "chimney_cap", 0.36, 0.10, 0.36, brickMat, 0.55, 2.04, -0.18);
  const chimney_top_round = new THREE.Mesh(new THREE.SphereGeometry(0.13, 16, 8), brickMat);
  chimney_top_round.name = "chimney_top_round";
  chimney_top_round.scale.set(1.0, 0.35, 1.0);
  chimney_top_round.position.set(0.55, 2.105, -0.18);
  house_group.add(chimney_top_round);

  const chimney_brick_lines = new THREE.InstancedMesh(
    new THREE.BoxGeometry(0.27, 0.012, 0.012),
    darkBrickMat,
    5
  );
  chimney_brick_lines.name = "chimney_brick_lines";
  for (let i = 0; i < 5; i++) {
    dummy.position.set(0.55, 1.50 + i * 0.105, -0.035);
    dummy.rotation.set(0, 0, 0);
    dummy.updateMatrix();
    chimney_brick_lines.setMatrixAt(i, dummy.matrix);
  }
  chimney_brick_lines.instanceMatrix.needsUpdate = true;
  house_group.add(chimney_brick_lines);

  const porch_step = addBox(house_group, "porch_step", 0.52, 0.07, 0.20, pathMat, door_x, 0.16, front_z + 0.23);
  const porch_support_left = addBox(house_group, "porch_support_left", 0.055, 0.30, 0.055, whiteTrimMat, door_x - 0.24, 0.31, front_z + 0.16);
  const porch_support_right = addBox(house_group, "porch_support_right", 0.055, 0.30, 0.055, whiteTrimMat, door_x + 0.24, 0.31, front_z + 0.16);
  const porch_header = addBox(house_group, "porch_header", 0.55, 0.055, 0.07, whiteTrimMat, door_x, 0.48, front_z + 0.16);

  const picket_shape = new THREE.Shape();
  picket_shape.moveTo(-0.045, 0);
  picket_shape.lineTo(0.045, 0);
  picket_shape.lineTo(0.045, 0.38);
  picket_shape.bezierCurveTo(0.045, 0.45, -0.045, 0.45, -0.045, 0.38);
  picket_shape.lineTo(-0.045, 0);
  const picketGeom = new THREE.ExtrudeGeometry(picket_shape, { depth: 0.035, steps: 1 });

  const front_picket_count = 24;
  const side_picket_count = 14;
  const white_pickets = new THREE.InstancedMesh(picketGeom, whiteTrimMat, front_picket_count + side_picket_count * 2);
  white_pickets.name = "white_pickets";
  instance_index = 0;
  for (let i = 0; i < front_picket_count; i++) {
    const x = -1.55 + i * (3.10 / (front_picket_count - 1));
    dummy.position.set(x, 0.13, 1.18);
    dummy.rotation.set(0, 0, 0);
    dummy.updateMatrix();
    white_pickets.setMatrixAt(instance_index++, dummy.matrix);
  }
  for (const side of [-1, 1]) {
    for (let i = 0; i < side_picket_count; i++) {
      const z = -1.05 + i * (2.10 / (side_picket_count - 1));
      dummy.position.set(side * 1.58, 0.13, z);
      dummy.rotation.set(0, Math.PI / 2, 0);
      dummy.updateMatrix();
      white_pickets.setMatrixAt(instance_index++, dummy.matrix);
    }
  }
  white_pickets.instanceMatrix.needsUpdate = true;
  fence_group.add(white_pickets);

  const front_fence_rail_lower = addBox(fence_group, "front_fence_rail_lower", 3.18, 0.045, 0.045, whiteTrimMat, 0, 0.28, 1.145);
  const front_fence_rail_upper = addBox(fence_group, "front_fence_rail_upper", 3.18, 0.045, 0.045, whiteTrimMat, 0, 0.43, 1.145);
  const left_fence_rail_lower = addBox(fence_group, "left_fence_rail_lower", 0.045, 0.045, 2.22, whiteTrimMat, -1.545, 0.28, 0.05);
  const left_fence_rail_upper = addBox(fence_group, "left_fence_rail_upper", 0.045, 0.045, 2.22, whiteTrimMat, -1.545, 0.43, 0.05);
  const right_fence_rail_lower = addBox(fence_group, "right_fence_rail_lower", 0.045, 0.045, 2.22, whiteTrimMat, 1.545, 0.28, 0.05);
  const right_fence_rail_upper = addBox(fence_group, "right_fence_rail_upper", 0.045, 0.045, 2.22, whiteTrimMat, 1.545, 0.43, 0.05);

  const gate_left_post = addBox(fence_group, "gate_left_post", 0.07, 0.48, 0.07, whiteTrimMat, door_x - 0.31, 0.36, 1.18);
  const gate_right_post = addBox(fence_group, "gate_right_post", 0.07, 0.48, 0.07, whiteTrimMat, door_x + 0.31, 0.36, 1.18);
  const gate_top_rail = addBox(fence_group, "gate_top_rail", 0.62, 0.045, 0.055, whiteTrimMat, door_x, 0.45, 1.18);
  const gate_bottom_rail = addBox(fence_group, "gate_bottom_rail", 0.62, 0.045, 0.055, whiteTrimMat, door_x, 0.27, 1.18);
  const gate_center_slats = new THREE.InstancedMesh(new THREE.BoxGeometry(0.035, 0.22, 0.035), whiteTrimMat, 3);
  gate_center_slats.name = "gate_center_slats";
  for (let i = 0; i < 3; i++) {
    dummy.position.set(door_x - 0.16 + i * 0.16, 0.36, 1.18);
    dummy.rotation.set(0, 0, 0);
    dummy.updateMatrix();
    gate_center_slats.setMatrixAt(i, dummy.matrix);
  }
  gate_center_slats.instanceMatrix.needsUpdate = true;
  fence_group.add(gate_center_slats);

  const grass_blade_geom = new THREE.ConeGeometry(0.012, 0.10, 5);
  const grass_blades = new THREE.InstancedMesh(grass_blade_geom, grassDarkMat, 96);
  grass_blades.name = "grass_blades";
  for (let i = 0; i < 96; i++) {
    const edge = i % 4;
    const u = ((i * 37) % 100) / 100;
    let x = 0;
    let z = 0;
    if (edge === 0) {
      x = -1.55 + u * 3.10;
      z = 1.23;
    } else if (edge === 1) {
      x = -1.55 + u * 3.10;
      z = -1.20;
    } else if (edge === 2) {
      x = -1.59;
      z = -1.05 + u * 2.10;
    } else {
      x = 1.59;
      z = -1.05 + u * 2.10;
    }
    dummy.position.set(x, 0.18, z);
    dummy.rotation.set((i % 5 - 2) * 0.08, (i % 9) * 0.35, (i % 3 - 1) * 0.08);
    dummy.updateMatrix();
    grass_blades.setMatrixAt(i, dummy.matrix);
  }
  grass_blades.instanceMatrix.needsUpdate = true;
  garden_group.add(grass_blades);

  const flower_positions = [
    [-1.35, 0.17, 0.92, 0],
    [-1.18, 0.17, 0.84, 2],
    [-0.95, 0.17, 1.02, 1],
    [-0.62, 0.17, 1.08, 0],
    [0.72, 0.17, 1.02, 0],
    [0.95, 0.17, 0.92, 1],
    [1.25, 0.17, 0.72, 0],
    [1.38, 0.17, 0.35, 1],
    [1.40, 0.17, -0.15, 0],
    [1.36, 0.17, -0.62, 1],
    [-1.38, 0.17, 0.45, 2],
    [-1.30, 0.17, -0.20, 1]
  ];

  const flower_stems = new THREE.InstancedMesh(new THREE.CylinderGeometry(0.008, 0.008, 0.22, 8), leafMat, flower_positions.length);
  flower_stems.name = "flower_stems";
  const flower_leaves = new THREE.InstancedMesh(new THREE.SphereGeometry(0.045, 10, 6), leafMat, flower_positions.length * 2);
  flower_leaves.name = "flower_leaves";
  const purple_flowers = new THREE.InstancedMesh(new THREE.SphereGeometry(0.045, 12, 8), purpleFlowerMat, 8);
  purple_flowers.name = "purple_flowers";
  const white_flowers = new THREE.InstancedMesh(new THREE.SphereGeometry(0.035, 12, 8), whiteFlowerMat, 3);
  white_flowers.name = "white_flowers";
  const yellow_flowers = new THREE.InstancedMesh(new THREE.SphereGeometry(0.035, 12, 8), yellowFlowerMat, 1);
  yellow_flowers.name = "yellow_flowers";

  let purple_index = 0;
  let white_index = 0;
  let yellow_index = 0;
  for (let i = 0; i < flower_positions.length; i++) {
    const p = flower_positions[i];
    const x = p[0];
    const y = p[1];
    const z = p[2];
    const type = p[3];

    dummy.position.set(x, y + 0.11, z);
    dummy.rotation.set(0, 0, 0);
    dummy.updateMatrix();
    flower_stems.setMatrixAt(i, dummy.matrix);

    dummy.position.set(x - 0.035, y + 0.10, z + 0.01);
    dummy.rotation.set(0.2, i * 0.4, 0.2);
    dummy.updateMatrix();
    flower_leaves.setMatrixAt(i * 2, dummy.matrix);
    dummy.position.set(x + 0.035, y + 0.11, z - 0.01);
    dummy.rotation.set(-0.2, i * 0.4 + 0.8, -0.2);
    dummy.updateMatrix();
    flower_leaves.setMatrixAt(i * 2 + 1, dummy.matrix);

    dummy.position.set(x, y + 0.24, z);
    dummy.rotation.set(0, 0, 0);
    dummy.updateMatrix();
    if (type === 0) {
      purple_flowers.setMatrixAt(purple_index++, dummy.matrix);
    } else if (type === 1) {
      white_flowers.setMatrixAt(white_index++, dummy.matrix);
    } else {
      yellow_flowers.setMatrixAt(yellow_index++, dummy.matrix);
    }
  }
  flower_stems.instanceMatrix.needsUpdate = true;
  flower_leaves.instanceMatrix.needsUpdate = true;
  purple_flowers.instanceMatrix.needsUpdate = true;
  white_flowers.instanceMatrix.needsUpdate = true;
  yellow_flowers.instanceMatrix.needsUpdate = true;
  garden_group.add(flower_stems, flower_leaves, purple_flowers, white_flowers, yellow_flowers);

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
