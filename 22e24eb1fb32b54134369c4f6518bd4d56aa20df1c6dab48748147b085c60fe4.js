function __sn17_user(THREE) {
  const root = new THREE.Group();
  root.name = "brass_scientific_instrument";

  const base_assembly = new THREE.Group();
  base_assembly.name = "base_assembly";
  root.add(base_assembly);

  const instrument_assembly = new THREE.Group();
  instrument_assembly.name = "instrument_assembly";
  root.add(instrument_assembly);

  const dial_assembly = new THREE.Group();
  dial_assembly.name = "dial_assembly";
  instrument_assembly.add(dial_assembly);

  const frame_assembly = new THREE.Group();
  frame_assembly.name = "frame_assembly";
  instrument_assembly.add(frame_assembly);

  const mechanism_assembly = new THREE.Group();
  mechanism_assembly.name = "mechanism_assembly";
  instrument_assembly.add(mechanism_assembly);

  const brass_material = new THREE.MeshStandardMaterial({
    color: 0xc9a454,
    metalness: 0.65,
    roughness: 0.24
  });
  const bright_brass_material = new THREE.MeshStandardMaterial({
    color: 0xe2c36d,
    metalness: 0.6,
    roughness: 0.2
  });
  const dark_brass_material = new THREE.MeshStandardMaterial({
    color: 0x8b6a2d,
    metalness: 0.55,
    roughness: 0.32
  });
  const glass_material = new THREE.MeshPhysicalMaterial({
    color: 0xddeeed,
    metalness: 0.0,
    roughness: 0.15,
    transparent: true,
    opacity: 0.32,
    side: THREE.DoubleSide,
    depthWrite: false
  });
  const ink_material = new THREE.MeshStandardMaterial({
    color: 0x171717,
    metalness: 0.0,
    roughness: 0.8
  });
  const screw_material = new THREE.MeshStandardMaterial({
    color: 0x2a2418,
    metalness: 0.45,
    roughness: 0.45
  });

  const base_profile = [
    new THREE.Vector2(0.00, 0.00),
    new THREE.Vector2(0.48, 0.00),
    new THREE.Vector2(0.55, 0.015),
    new THREE.Vector2(0.58, 0.045),
    new THREE.Vector2(0.58, 0.075),
    new THREE.Vector2(0.55, 0.105),
    new THREE.Vector2(0.49, 0.125),
    new THREE.Vector2(0.47, 0.165),
    new THREE.Vector2(0.47, 0.235),
    new THREE.Vector2(0.49, 0.265),
    new THREE.Vector2(0.49, 0.295),
    new THREE.Vector2(0.45, 0.325),
    new THREE.Vector2(0.00, 0.325)
  ];
  const base_pedestal_geometry = new THREE.LatheGeometry(base_profile, 64);
  const base_pedestal = new THREE.Mesh(base_pedestal_geometry, brass_material);
  base_pedestal.name = "base_pedestal";
  base_assembly.add(base_pedestal);

  const lower_base_groove_geometry = new THREE.TorusGeometry(0.535, 0.006, 8, 64);
  const lower_base_groove = new THREE.Mesh(lower_base_groove_geometry, dark_brass_material);
  lower_base_groove.name = "lower_base_groove";
  lower_base_groove.rotation.x = Math.PI / 2;
  lower_base_groove.position.y = 0.105;
  base_assembly.add(lower_base_groove);

  const upper_base_groove_geometry = new THREE.TorusGeometry(0.472, 0.005, 8, 64);
  const upper_base_groove = new THREE.Mesh(upper_base_groove_geometry, dark_brass_material);
  upper_base_groove.name = "upper_base_groove";
  upper_base_groove.rotation.x = Math.PI / 2;
  upper_base_groove.position.y = 0.245;
  base_assembly.add(upper_base_groove);

  const top_plate_groove_geometry = new THREE.TorusGeometry(0.405, 0.004, 8, 64);
  const top_plate_groove = new THREE.Mesh(top_plate_groove_geometry, dark_brass_material);
  top_plate_groove.name = "top_plate_groove";
  top_plate_groove.rotation.x = Math.PI / 2;
  top_plate_groove.position.y = 0.327;
  base_assembly.add(top_plate_groove);

  const support_shape = new THREE.Shape();
  support_shape.moveTo(-0.14, 0.00);
  support_shape.lineTo(0.14, 0.00);
  support_shape.lineTo(0.085, 0.285);
  support_shape.lineTo(-0.075, 0.285);
  support_shape.closePath();

  const support_footprint = new THREE.Shape();
  support_footprint.moveTo(-0.18, -0.12);
  support_footprint.lineTo(0.18, -0.12);
  support_footprint.lineTo(0.13, 0.12);
  support_footprint.lineTo(-0.13, 0.12);
  support_footprint.closePath();

  const support_bracket_geometry = new THREE.ExtrudeGeometry(support_shape, {
    curveSegments: 8,
    steps: 1,
    extrudeDepth: 0.24,
    bevelEnabled: true,
    bevelThickness: 0.012,
    bevelSize: 0.01,
    bevelSegments: 2
  });
  support_bracket_geometry.translate(0, 0, -0.12);
  const support_bracket = new THREE.Mesh(support_bracket_geometry, brass_material);
  support_bracket.name = "support_bracket";
  support_bracket.position.set(0, 0.30, -0.035);
  support_bracket.rotation.x = -0.12;
  base_assembly.add(support_bracket);

  const support_footprint_geometry = new THREE.ExtrudeGeometry(support_footprint, {
    curveSegments: 8,
    steps: 1,
    extrudeDepth: 0.035,
    bevelEnabled: true,
    bevelThickness: 0.008,
    bevelSize: 0.008,
    bevelSegments: 2
  });
  support_footprint_geometry.translate(0, 0, -0.0175);
  const support_footprint_plate = new THREE.Mesh(support_footprint_geometry, bright_brass_material);
  support_footprint_plate.name = "support_footprint_plate";
  support_footprint_plate.rotation.x = Math.PI / 2;
  support_footprint_plate.position.set(0, 0.345, -0.035);
  base_assembly.add(support_footprint_plate);

  const adjustment_knob_geometry = new THREE.CylinderGeometry(0.075, 0.075, 0.06, 32);
  const adjustment_knob = new THREE.Mesh(adjustment_knob_geometry, bright_brass_material);
  adjustment_knob.name = "adjustment_knob";
  adjustment_knob.position.set(0.035, 0.36, 0.19);
  base_assembly.add(adjustment_knob);

  const knob_top_geometry = new THREE.CylinderGeometry(0.061, 0.061, 0.012, 32);
  const knob_top = new THREE.Mesh(knob_top_geometry, brass_material);
  knob_top.name = "knob_top";
  knob_top.position.set(0.035, 0.396, 0.19);
  base_assembly.add(knob_top);

  const knob_hole_geometry = new THREE.CylinderGeometry(0.022, 0.022, 0.014, 24);
  const knob_hole = new THREE.Mesh(knob_hole_geometry, screw_material);
  knob_hole.name = "knob_hole";
  knob_hole.position.set(0.035, 0.405, 0.19);
  base_assembly.add(knob_hole);

  const knob_ridge_geometry = new THREE.BoxGeometry(0.012, 0.052, 0.021);
  const knob_ridges = new THREE.InstancedMesh(knob_ridge_geometry, dark_brass_material, 20);
  knob_ridges.name = "knob_ridges";
  const knob_dummy = new THREE.Object3D();
  for (let i = 0; i < 20; i++) {
    const angle = i / 20 * Math.PI * 2;
    knob_dummy.position.set(
      0.035 + Math.cos(angle) * 0.078,
      0.36,
      0.19 + Math.sin(angle) * 0.078
    );
    knob_dummy.rotation.set(0, Math.PI / 2 - angle, 0);
    knob_dummy.updateMatrix();
    knob_ridges.setMatrixAt(i, knob_dummy.matrix);
  }
  knob_ridges.instanceMatrix.needsUpdate = true;
  base_assembly.add(knob_ridges);

  const outer_radius = 0.72;
  const inner_radius = 0.625;
  const ring_start = -155 * Math.PI / 180;
  const ring_length = 290 * Math.PI / 180;

  const outer_scale_ring_shape = new THREE.Shape();
  outer_scale_ring_shape.moveTo(
    Math.cos(ring_start) * outer_radius,
    Math.sin(ring_start) * outer_radius
  );
  for (let i = 1; i <= 72; i++) {
    const angle = ring_start + ring_length * i / 72;
    outer_scale_ring_shape.lineTo(
      Math.cos(angle) * outer_radius,
      Math.sin(angle) * outer_radius
    );
  }
  for (let i = 72; i >= 0; i--) {
    const angle = ring_start + ring_length * i / 72;
    outer_scale_ring_shape.lineTo(
      Math.cos(angle) * inner_radius,
      Math.sin(angle) * inner_radius
    );
  }
  outer_scale_ring_shape.closePath();

  const outer_scale_ring_geometry = new THREE.ExtrudeGeometry(outer_scale_ring_shape, {
    curveSegments: 16,
    steps: 1,
    extrudeDepth: 0.055,
    bevelEnabled: true,
    bevelThickness: 0.008,
    bevelSize: 0.007,
    bevelSegments: 2
  });
  outer_scale_ring_geometry.translate(0, 0, -0.0275);
  const outer_scale_ring = new THREE.Mesh(outer_scale_ring_geometry, brass_material);
  outer_scale_ring.name = "outer_scale_ring";
  outer_scale_ring.position.set(0, 1.18, -0.025);
  dial_assembly.add(outer_scale_ring);

  const glass_face_geometry = new THREE.CircleGeometry(0.612, 96);
  const glass_face = new THREE.Mesh(glass_face_geometry, glass_material);
  glass_face.name = "glass_face";
  glass_face.position.set(0, 1.18, 0.012);
  dial_assembly.add(glass_face);

  const inner_bezel_geometry = new THREE.TorusGeometry(0.617, 0.012, 10, 96);
  const inner_bezel = new THREE.Mesh(inner_bezel_geometry, bright_brass_material);
  inner_bezel.name = "inner_bezel";
  inner_bezel.position.set(0, 1.18, 0.035);
  dial_assembly.add(inner_bezel);

  const outer_trim_geometry = new THREE.TorusGeometry(
    0.706,
    0.008,
    8,
    96,
    ring_length
  );
  const outer_trim = new THREE.Mesh(outer_trim_geometry, bright_brass_material);
  outer_trim.name = "outer_trim";
  outer_trim.position.set(0, 1.18, 0.032);
  outer_trim.rotation.z = ring_start;
  dial_assembly.add(outer_trim);

  const inner_trim_geometry = new THREE.TorusGeometry(
    0.635,
    0.006,
    8,
    96,
    ring_length
  );
  const inner_trim = new THREE.Mesh(inner_trim_geometry, dark_brass_material);
  inner_trim.name = "inner_trim";
  inner_trim.position.set(0, 1.18, 0.038);
  inner_trim.rotation.z = ring_start;
  dial_assembly.add(inner_trim);

  const scale_center_x = 0.10;
  const scale_center_y = 1.13;

  const outer_scale_arc_geometry = new THREE.TorusGeometry(
    0.535,
    0.0028,
    6,
    128
  );
  const outer_scale_arc = new THREE.Mesh(outer_scale_arc_geometry, ink_material);
  outer_scale_arc.name = "outer_scale_arc";
  outer_scale_arc.position.set(scale_center_x, scale_center_y, 0.052);
  dial_assembly.add(outer_scale_arc);

  const middle_scale_arc_geometry = new THREE.TorusGeometry(
    0.455,
    0.0022,
    6,
    112
  );
  const middle_scale_arc = new THREE.Mesh(middle_scale_arc_geometry, ink_material);
  middle_scale_arc.name = "middle_scale_arc";
  middle_scale_arc.position.set(scale_center_x, scale_center_y, 0.052);
  dial_assembly.add(middle_scale_arc);

  const inner_scale_arc_geometry = new THREE.TorusGeometry(
    0.385,
    0.002,
    6,
    96
  );
  const inner_scale_arc = new THREE.Mesh(inner_scale_arc_geometry, ink_material);
  inner_scale_arc.name = "inner_scale_arc";
  inner_scale_arc.position.set(scale_center_x, scale_center_y, 0.052);
  dial_assembly.add(inner_scale_arc);

  const minor_tick_geometry = new THREE.BoxGeometry(0.006, 0.035, 0.006);
  const medium_tick_geometry = new THREE.BoxGeometry(0.007, 0.052, 0.006);
  const major_tick_geometry = new THREE.BoxGeometry(0.009, 0.075, 0.007);

  const minor_tick_marks = new THREE.InstancedMesh(minor_tick_geometry, ink_material, 48);
  minor_tick_marks.name = "minor_tick_marks";
  const medium_tick_marks = new THREE.InstancedMesh(medium_tick_geometry, ink_material, 12);
  medium_tick_marks.name = "medium_tick_marks";
  const major_tick_marks = new THREE.InstancedMesh(major_tick_geometry, ink_material, 12);
  major_tick_marks.name = "major_tick_marks";

  const tick_dummy = new THREE.Object3D();
  let minor_index = 0;
  let medium_index = 0;
  let major_index = 0;
  for (let i = 0; i < 72; i++) {
    const angle = i / 72 * Math.PI * 2;
    let mesh;
    let index;
    if (i % 6 === 0) {
      mesh = major_tick_marks;
      index = major_index++;
    } else if (i % 3 === 0) {
      mesh = medium_tick_marks;
      index = medium_index++;
    } else {
      mesh = minor_tick_marks;
      index = minor_index++;
    }
    tick_dummy.position.set(
      scale_center_x + Math.sin(angle) * 0.505,
      scale_center_y + Math.cos(angle) * 0.505,
      0.058
    );
    tick_dummy.rotation.set(0, 0, -angle);
    tick_dummy.updateMatrix();
    mesh.setMatrixAt(index, tick_dummy.matrix);
  }
  minor_tick_marks.instanceMatrix.needsUpdate = true;
  medium_tick_marks.instanceMatrix.needsUpdate = true;
  major_tick_marks.instanceMatrix.needsUpdate = true;
  dial_assembly.add(minor_tick_marks, medium_tick_marks, major_tick_marks);

  const inner_tick_geometry = new THREE.BoxGeometry(0.005, 0.028, 0.005);
  const inner_tick_marks = new THREE.InstancedMesh(inner_tick_geometry, ink_material, 36);
  inner_tick_marks.name = "inner_tick_marks";
  for (let i = 0; i < 36; i++) {
    const angle = i / 36 * Math.PI * 2;
    tick_dummy.position.set(
      scale_center_x + Math.sin(angle) * 0.397,
      scale_center_y + Math.cos(angle) * 0.397,
      0.059
    );
    tick_dummy.rotation.set(0, 0, -angle);
    tick_dummy.updateMatrix();
    inner_tick_marks.setMatrixAt(i, tick_dummy.matrix);
  }
  inner_tick_marks.instanceMatrix.needsUpdate = true;
  dial_assembly.add(inner_tick_marks);

  const scale_label_geometry = new THREE.BoxGeometry(0.026, 0.007, 0.005);
  const scale_labels = new THREE.InstancedMesh(scale_label_geometry, ink_material, 18);
  scale_labels.name = "scale_labels";
  for (let i = 0; i < 18; i++) {
    const angle = i / 18 * Math.PI * 2;
    tick_dummy.position.set(
      scale_center_x + Math.sin(angle) * 0.425,
      scale_center_y + Math.cos(angle) * 0.425,
      0.061
    );
    tick_dummy.rotation.set(0, 0, -angle);
    tick_dummy.updateMatrix();
    scale_labels.setMatrixAt(i, tick_dummy.matrix);
  }
  scale_labels.instanceMatrix.needsUpdate = true;
  dial_assembly.add(scale_labels);

  const left_frame_arm_geometry = new THREE.BoxGeometry(0.105, 1.34, 0.065);
  const left_frame_arm = new THREE.Mesh(left_frame_arm_geometry, bright_brass_material);
  left_frame_arm.name = "left_frame_arm";
  left_frame_arm.position.set(-0.43, 1.285, 0.085);
  left_frame_arm.rotation.z = 0.43;
  frame_assembly.add(left_frame_arm);

  const top_frame_arm_geometry = new THREE.BoxGeometry(1.04, 0.10, 0.065);
  const top_frame_arm = new THREE.Mesh(top_frame_arm_geometry, bright_brass_material);
  top_frame_arm.name = "top_frame_arm";
  top_frame_arm.position.set(0.05, 1.94, 0.085);
  top_frame_arm.rotation.z = -0.14;
  frame_assembly.add(top_frame_arm);

  const right_frame_arm_geometry = new THREE.BoxGeometry(0.09, 0.48, 0.06);
  const right_frame_arm = new THREE.Mesh(right_frame_arm_geometry, brass_material);
  right_frame_arm.name = "right_frame_arm";
  right_frame_arm.position.set(0.49, 1.74, 0.075);
  right_frame_arm.rotation.z = 0.28;
  frame_assembly.add(right_frame_arm);

  const left_inner_edge_geometry = new THREE.BoxGeometry(0.012, 1.22, 0.012);
  const left_inner_edge = new THREE.Mesh(left_inner_edge_geometry, dark_brass_material);
  left_inner_edge.name = "left_inner_edge";
  left_inner_edge.position.set(-0.382, 1.285, 0.124);
  left_inner_edge.rotation.z = 0.43;
  frame_assembly.add(left_inner_edge);

  const top_inner_edge_geometry = new THREE.BoxGeometry(0.94, 0.012, 0.012);
  const top_inner_edge = new THREE.Mesh(top_inner_edge_geometry, dark_brass_material);
  top_inner_edge.name = "top_inner_edge";
  top_inner_edge.position.set(0.05, 1.895, 0.124);
  top_inner_edge.rotation.z = -0.14;
  frame_assembly.add(top_inner_edge);

  const top_frame_end_cap_geometry = new THREE.BoxGeometry(0.115, 0.115, 0.07);
  const top_frame_end_cap = new THREE.Mesh(top_frame_end_cap_geometry, brass_material);
  top_frame_end_cap.name = "top_frame_end_cap";
  top_frame_end_cap.position.set(-0.465, 1.93, 0.085);
  top_frame_end_cap.rotation.z = 0.43;
  frame_assembly.add(top_frame_end_cap);

  const lower_frame_joint_geometry = new THREE.CylinderGeometry(0.072, 0.072, 0.075, 32);
  const lower_frame_joint = new THREE.Mesh(lower_frame_joint_geometry, brass_material);
  lower_frame_joint.name = "lower_frame_joint";
  lower_frame_joint.rotation.x = Math.PI / 2;
  lower_frame_joint.position.set(-0.61, 0.64, 0.085);
  frame_assembly.add(lower_frame_joint);

  const upper_frame_joint_geometry = new THREE.CylinderGeometry(0.065, 0.065, 0.075, 32);
  const upper_frame_joint = new THREE.Mesh(upper_frame_joint_geometry, brass_material);
  upper_frame_joint.name = "upper_frame_joint";
  upper_frame_joint.rotation.x = Math.PI / 2;
  upper_frame_joint.position.set(0.55, 1.78, 0.085);
  frame_assembly.add(upper_frame_joint);

  const screw_head_geometry = new THREE.CylinderGeometry(0.032, 0.032, 0.018, 24);
  const screw_slot_geometry = new THREE.BoxGeometry(0.043, 0.006, 0.008);

  function createScrew(name, x, y, z, rotation) {
    const screw_group = new THREE.Group();
    screw_group.name = name;
    screw_group.position.set(x, y, z);
    screw_group.rotation.z = rotation;

    const head = new THREE.Mesh(screw_head_geometry, dark_brass_material);
    head.name = name + "_head";
    head.rotation.x = Math.PI / 2;
    head.position.z = 0.012;
    screw_group.add(head);

    const slot = new THREE.Mesh(screw_slot_geometry, screw_material);
    slot.name = name + "_slot";
    slot.position.z = 0.023;
    screw_group.add(slot);
    return screw_group;
  }

  const lower_left_screw = createScrew("lower_left_screw", -0.61, 0.64, 0.13, 0.35);
  frame_assembly.add(lower_left_screw);

  const upper_right_screw = createScrew("upper_right_screw", 0.55, 1.78, 0.13, -0.25);
  frame_assembly.add(upper_right_screw);

  const top_frame_screw = createScrew("top_frame_screw", -0.285, 1.865, 0.13, 0.15);
  frame_assembly.add(top_frame_screw);

  const lower_frame_screw = createScrew("lower_frame_screw", -0.455, 0.735, 0.13, -0.35);
  frame_assembly.add(lower_frame_screw);

  const outer_ring_screw = createScrew("outer_ring_screw", -0.58, 0.62, 0.035, 0.2);
  dial_assembly.add(outer_ring_screw);

  const outer_ring_lower_screw = createScrew("outer_ring_lower_screw", -0.49, 0.53, 0.035, -0.25);
  dial_assembly.add(outer_ring_lower_screw);

  const outer_ring_upper_screw = createScrew("outer_ring_upper_screw", 0.55, 1.76, 0.035, 0.25);
  dial_assembly.add(outer_ring_upper_screw);

  const pointer_angle = 0.72;
  const pointer_dx = Math.sin(pointer_angle);
  const pointer_dy = Math.cos(pointer_angle);

  const main_pointer_arm_geometry = new THREE.BoxGeometry(0.075, 0.96, 0.045);
  const main_pointer_arm = new THREE.Mesh(main_pointer_arm_geometry, bright_brass_material);
  main_pointer_arm.name = "main_pointer_arm";
  main_pointer_arm.position.set(
    0.02 + pointer_dx * 0.48,
    1.13 + pointer_dy * 0.48,
    0.105
  );
  main_pointer_arm.rotation.z = -pointer_angle;
  mechanism_assembly.add(main_pointer_arm);

  const counterweight_arm_geometry = new THREE.BoxGeometry(0.065, 0.78, 0.04);
  const counterweight_arm = new THREE.Mesh(counterweight_arm_geometry, brass_material);
  counterweight_arm.name = "counterweight_arm";
  counterweight_arm.position.set(
    0.02 - pointer_dx * 0.39,
    1.13 - pointer_dy * 0.39,
    0.10
  );
  counterweight_arm.rotation.z = Math.PI - pointer_angle;
  mechanism_assembly.add(counterweight_arm);

  const diagonal_link_angle = -0.93;
  const diagonal_link_dx = Math.sin(diagonal_link_angle);
  const diagonal_link_dy = Math.cos(diagonal_link_angle);
  const diagonal_link_geometry = new THREE.BoxGeometry(0.055, 0.72, 0.038);
  const diagonal_link = new THREE.Mesh(diagonal_link_geometry, bright_brass_material);
  diagonal_link.name = "diagonal_link";
  diagonal_link.position.set(
    0.02 + diagonal_link_dx * 0.36,
    1.13 + diagonal_link_dy * 0.36,
    0.095
  );
  diagonal_link.rotation.z = -diagonal_link_angle;
  mechanism_assembly.add(diagonal_link);

  const central_pivot_backplate_geometry = new THREE.CylinderGeometry(0.135, 0.135, 0.055, 40);
  const central_pivot_backplate = new THREE.Mesh(central_pivot_backplate_geometry, dark_brass_material);
  central_pivot_backplate.name = "central_pivot_backplate";
  central_pivot_backplate.rotation.x = Math.PI / 2;
  central_pivot_backplate.position.set(0.02, 1.13, 0.125);
  mechanism_assembly.add(central_pivot_backplate);

  const central_pivot_disc_geometry = new THREE.CylinderGeometry(0.118, 0.118, 0.07, 40);
  const central_pivot_disc = new THREE.Mesh(central_pivot_disc_geometry, brass_material);
  central_pivot_disc.name = "central_pivot_disc";
  central_pivot_disc.rotation.x = Math.PI / 2;
  central_pivot_disc.position.set(0.02, 1.13, 0.165);
  mechanism_assembly.add(central_pivot_disc);

  const central_pivot_ring_geometry = new THREE.TorusGeometry(0.105, 0.012, 10, 48);
  const central_pivot_ring = new THREE.Mesh(central_pivot_ring_geometry, bright_brass_material);
  central_pivot_ring.name = "central_pivot_ring";
  central_pivot_ring.position.set(0.02, 1.13, 0.205);
  mechanism_assembly.add(central_pivot_ring);

  const central_pivot_hub_geometry = new THREE.CylinderGeometry(0.067, 0.067, 0.09, 32);
  const central_pivot_hub = new THREE.Mesh(central_pivot_hub_geometry, bright_brass_material);
  central_pivot_hub.name = "central_pivot_hub";
  central_pivot_hub.rotation.x = Math.PI / 2;
  central_pivot_hub.position.set(0.02, 1.13, 0.225);
  mechanism_assembly.add(central_pivot_hub);

  const central_pivot_cap_geometry = new THREE.CylinderGeometry(0.043, 0.043, 0.018, 28);
  const central_pivot_cap = new THREE.Mesh(central_pivot_cap_geometry, brass_material);
  central_pivot_cap.name = "central_pivot_cap";
  central_pivot_cap.rotation.x = Math.PI / 2;
  central_pivot_cap.position.set(0.02, 1.13, 0.282);
  mechanism_assembly.add(central_pivot_cap);

  const central_pivot_screw = createScrew("central_pivot_screw", 0.02, 1.13, 0.295, 0.1);
  mechanism_assembly.add(central_pivot_screw);

  const pivot_block_geometry = new THREE.BoxGeometry(0.13, 0.13, 0.07);
  const pivot_block = new THREE.Mesh(pivot_block_geometry, brass_material);
  pivot_block.name = "pivot_block";
  pivot_block.position.set(-0.055, 1.205, 0.105);
  pivot_block.rotation.z = -pointer_angle;
  mechanism_assembly.add(pivot_block);

  const pointer_tip_joint_geometry = new THREE.CylinderGeometry(0.055, 0.055, 0.07, 28);
  const pointer_tip_joint = new THREE.Mesh(pointer_tip_joint_geometry, bright_brass_material);
  pointer_tip_joint.name = "pointer_tip_joint";
  pointer_tip_joint.rotation.x = Math.PI / 2;
  pointer_tip_joint.position.set(
    0.02 + pointer_dx * 0.96,
    1.13 + pointer_dy * 0.96,
    0.11
  );
  mechanism_assembly.add(pointer_tip_joint);

  const counterweight_tip_geometry = new THREE.SphereGeometry(0.065, 24, 16);
  const counterweight_tip = new THREE.Mesh(counterweight_tip_geometry, bright_brass_material);
  counterweight_tip.name = "counterweight_tip";
  counterweight_tip.position.set(
    0.02 - pointer_dx * 0.78,
    1.13 - pointer_dy * 0.78,
    0.11
  );
  mechanism_assembly.add(counterweight_tip);

  const linkage_endpoint_geometry = new THREE.CylinderGeometry(0.045, 0.045, 0.06, 24);
  const linkage_endpoint = new THREE.Mesh(linkage_endpoint_geometry, brass_material);
  linkage_endpoint.name = "linkage_endpoint";
  linkage_endpoint.rotation.x = Math.PI / 2;
  linkage_endpoint.position.set(
    0.02 + diagonal_link_dx * 0.72,
    1.13 + diagonal_link_dy * 0.72,
    0.105
  );
  mechanism_assembly.add(linkage_endpoint);

  const support_post_start = new THREE.Vector3(0.24, 0.34, 0.075);
  const support_post_end = new THREE.Vector3(0.34, 0.91, 0.105);
  const support_post_direction = new THREE.Vector3().subVectors(support_post_end, support_post_start);
  const support_post_length = support_post_direction.length();
  const support_post_quaternion = new THREE.Quaternion().setFromUnitVectors(
    new THREE.Vector3(0, 1, 0),
    support_post_direction.clone().normalize()
  );

  const support_post_base_geometry = new THREE.CylinderGeometry(0.075, 0.075, 0.045, 32);
  const support_post_base = new THREE.Mesh(support_post_base_geometry, bright_brass_material);
  support_post_base.name = "support_post_base";
  support_post_base.quaternion.copy(support_post_quaternion);
  support_post_base.position.copy(support_post_start);
  mechanism_assembly.add(support_post_base);

  const support_post_geometry = new THREE.CylinderGeometry(
    0.043,
    0.052,
    support_post_length,
    32
  );
  const support_post = new THREE.Mesh(support_post_geometry, bright_brass_material);
  support_post.name = "support_post";
  support_post.quaternion.copy(support_post_quaternion);
  support_post.position.copy(support_post_start).add(support_post_end).multiplyScalar(0.5);
  mechanism_assembly.add(support_post);

  const support_post_joint_geometry = new THREE.SphereGeometry(0.075, 28, 18);
  const support_post_joint = new THREE.Mesh(support_post_joint_geometry, bright_brass_material);
  support_post_joint.name = "support_post_joint";
  support_post_joint.position.copy(support_post_end);
  mechanism_assembly.add(support_post_joint);

  const support_post_joint_screw = createScrew(
    "support_post_joint_screw",
    support_post_end.x,
    support_post_end.y,
    0.18,
    -0.35
  );
  mechanism_assembly.add(support_post_joint_screw);

  const left_adjustment_shaft_geometry = new THREE.CylinderGeometry(0.018, 0.018, 0.15, 16);
  const left_adjustment_shaft = new THREE.Mesh(left_adjustment_shaft_geometry, dark_brass_material);
  left_adjustment_shaft.name = "left_adjustment_shaft";
  left_adjustment_shaft.rotation.z = Math.PI / 2;
  left_adjustment_shaft.position.set(-0.70, 0.66, 0.075);
  frame_assembly.add(left_adjustment_shaft);

  const left_adjustment_knob_geometry = new THREE.SphereGeometry(0.055, 24, 16);
  const left_adjustment_knob = new THREE.Mesh(left_adjustment_knob_geometry, bright_brass_material);
  left_adjustment_knob.name = "left_adjustment_knob";
  left_adjustment_knob.position.set(-0.79, 0.66, 0.075);
  frame_assembly.add(left_adjustment_knob);

  const right_adjustment_shaft_geometry = new THREE.CylinderGeometry(0.018, 0.018, 0.15, 16);
  const right_adjustment_shaft = new THREE.Mesh(right_adjustment_shaft_geometry, dark_brass_material);
  right_adjustment_shaft.name = "right_adjustment_shaft";
  right_adjustment_shaft.rotation.z = -0.75;
  right_adjustment_shaft.position.set(0.64, 1.86, 0.07);
  frame_assembly.add(right_adjustment_shaft);

  const right_adjustment_knob_geometry = new THREE.SphereGeometry(0.052, 24, 16);
  const right_adjustment_knob = new THREE.Mesh(right_adjustment_knob_geometry, bright_brass_material);
  right_adjustment_knob.name = "right_adjustment_knob";
  right_adjustment_knob.position.set(0.69, 1.92, 0.07);
  frame_assembly.add(right_adjustment_knob);

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
