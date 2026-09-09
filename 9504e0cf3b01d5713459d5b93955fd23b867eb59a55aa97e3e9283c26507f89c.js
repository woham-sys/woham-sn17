function __sn17_user(THREE) {
  const root = new THREE.Group();
  root.name = "countertop_blender";

  const base_group = new THREE.Group();
  base_group.name = "base_group";
  root.add(base_group);

  const jar_group = new THREE.Group();
  jar_group.name = "jar_group";
  root.add(jar_group);

  const lid_group = new THREE.Group();
  lid_group.name = "lid_group";
  root.add(lid_group);

  const black_plastic_mat = new THREE.MeshStandardMaterial({
    color: 0x171819,
    roughness: 0.3
  });
  const glossy_black_mat = new THREE.MeshStandardMaterial({
    color: 0x111214,
    roughness: 0.2
  });
  const rubber_mat = new THREE.MeshStandardMaterial({
    color: 0x0d0e0f,
    roughness: 0.8
  });
  const brushed_metal_mat = new THREE.MeshStandardMaterial({
    color: 0xb8b8b5,
    roughness: 0.45
  });
  const blade_mat = new THREE.MeshStandardMaterial({
    color: 0xd5d7d8,
    metalness: true,
    roughness: 0.25
  });
  const glass_mat = new THREE.MeshPhysicalMaterial({
    color: 0xeaf2f2,
    transparent: true,
    opacity: 0.5,
    roughness: 0.15,
    side: THREE.DoubleSide
  });
  const glass_edge_mat = new THREE.MeshPhysicalMaterial({
    color: 0xf0f5f5,
    transparent: true,
    opacity: 0.72,
    roughness: 0.15
  });
  const marking_mat = new THREE.MeshStandardMaterial({
    color: 0xcfd4d4,
    transparent: true,
    opacity: 0.55
  });
  const screen_mat = new THREE.MeshStandardMaterial({
    color: 0x071019,
    roughness: 0.25
  });
  const cyan_led_mat = new THREE.MeshStandardMaterial({
    color: 0x8ffcff,
    emissive: 0x8ffcff,
    metalness: false,
    roughness: 0.3
  });
  const violet_led_mat = new THREE.MeshStandardMaterial({
    color: 0x9a8fff,
    emissive: 0x9a8fff,
    metalness: false,
    roughness: 0.3
  });

  function createFrustumGeometry(bottomW, bottomD, topW, topD, height) {
    const y0 = -height / 2;
    const y1 = height / 2;
    const positions = [
      -bottomW / 2, y0, -bottomD / 2,
       bottomW / 2, y0, -bottomD / 2,
       bottomW / 2, y0,  bottomD / 2,
      -bottomW / 2, y0,  bottomD / 2,
      -topW / 2, y1, -topD / 2,
       topW / 2, y1, -topD / 2,
       topW / 2, y1,  topD / 2,
      -topW / 2, y1,  topD / 2
    ];
    const indices = [
      0, 2, 1, 0, 3, 2,
      4, 5, 6, 4, 6, 7,
      0, 1, 5, 0, 5, 4,
      1, 2, 6, 1, 6, 5,
      2, 3, 7, 2, 7, 6,
      3, 0, 4, 3, 4, 7
    ];
    const geom = new THREE.BufferGeometry();
    geom.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    geom.setIndex(indices);
    geom.computeVertexNormals();
    return geom;
  }

  function createJarGeometry() {
    const segments = 64;
    const heights = [1.24, 1.34, 1.78, 2.20];
    const radii = [0.30, 0.33, 0.37, 0.40];
    const positions = [];
    const indices = [];

    for (let h = 0; h < heights.length; h++) {
      for (let i = 0; i < segments; i++) {
        const angle = i / segments * Math.PI * 2;
        positions.push(
          Math.cos(angle) * radii[h],
          heights[h],
          Math.sin(angle) * radii[h]
        );
      }
    }

    for (let h = 0; h < heights.length - 1; h++) {
      for (let i = 0; i < segments; i++) {
        const next = (i + 1) % segments;
        const a = h * segments + i;
        const b = h * segments + next;
        const c = (h + 1) * segments + next;
        const d = (h + 1) * segments + i;
        indices.push(a, d, b, b, d, c);
      }
    }

    const geom = new THREE.BufferGeometry();
    geom.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    geom.setIndex(indices);
    geom.computeVertexNormals();
    return geom;
  }

  function createRib(points, radius) {
    const curve = new THREE.CatmullRomCurve3(points, false, "centripetal");
    return new THREE.Mesh(
      new THREE.TubeGeometry(curve, 32, radius, 8, false),
      glass_edge_mat
    );
  }

  const lower_base_geom = createFrustumGeometry(1.00, 0.70, 1.03, 0.72, 0.18);
  const lower_base = new THREE.Mesh(lower_base_geom, black_plastic_mat);
  lower_base.name = "lower_base";
  lower_base.position.set(0, 0.13, 0);
  base_group.add(lower_base);

  const stainless_body_geom = createFrustumGeometry(1.02, 0.72, 0.84, 0.62, 0.78);
  const stainless_body = new THREE.Mesh(stainless_body_geom, brushed_metal_mat);
  stainless_body.name = "stainless_body";
  stainless_body.position.set(0, 0.54, 0);
  base_group.add(stainless_body);

  const upper_shoulder_geom = new THREE.CylinderGeometry(0.43, 0.50, 0.30, 64);
  const upper_shoulder = new THREE.Mesh(upper_shoulder_geom, black_plastic_mat);
  upper_shoulder.name = "upper_shoulder";
  upper_shoulder.position.set(0, 0.99, 0);
  upper_shoulder.scale.set(1, 1, 0.78);
  base_group.add(upper_shoulder);

  const motor_housing_geom = new THREE.CylinderGeometry(0.36, 0.43, 0.38, 64);
  const motor_housing = new THREE.Mesh(motor_housing_geom, black_plastic_mat);
  motor_housing.name = "motor_housing";
  motor_housing.position.set(0, 1.23, 0);
  motor_housing.scale.set(1, 1, 0.78);
  base_group.add(motor_housing);

  const jar_support_ring_geom = new THREE.TorusGeometry(0.335, 0.035, 12, 64);
  const jar_support_ring = new THREE.Mesh(jar_support_ring_geom, glossy_black_mat);
  jar_support_ring.name = "jar_support_ring";
  jar_support_ring.rotation.x = Math.PI / 2;
  jar_support_ring.position.set(0, 1.405, 0);
  base_group.add(jar_support_ring);

  const feet_geom = new THREE.BoxGeometry(0.17, 0.10, 0.18);
  const feet = new THREE.InstancedMesh(feet_geom, rubber_mat, 4);
  feet.name = "feet";
  const foot_positions = [
    [-0.39, 0.035, 0.25],
    [0.39, 0.035, 0.25],
    [-0.39, 0.035, -0.25],
    [0.39, 0.035, -0.25]
  ];
  const instance_dummy = new THREE.Object3D();
  for (let i = 0; i < foot_positions.length; i++) {
    instance_dummy.position.set(
      foot_positions[i][0],
      foot_positions[i][1],
      foot_positions[i][2]
    );
    instance_dummy.rotation.set(0, 0, 0);
    instance_dummy.scale.set(1, 1, 1);
    instance_dummy.updateMatrix();
    feet.setMatrixAt(i, instance_dummy.matrix);
  }
  feet.instanceMatrix.needsUpdate = true;
  base_group.add(feet);

  const control_panel_group = new THREE.Group();
  control_panel_group.name = "control_panel_group";
  control_panel_group.position.set(0, 0.58, 0.347);
  control_panel_group.rotation.x = -0.10;
  base_group.add(control_panel_group);

  const control_panel_shape = new THREE.Shape();
  control_panel_shape.moveTo(-0.27, -0.36);
  control_panel_shape.lineTo(0.27, -0.36);
  control_panel_shape.quadraticCurveTo(0.34, -0.36, 0.35, -0.28);
  control_panel_shape.lineTo(0.31, 0.31);
  control_panel_shape.quadraticCurveTo(0.30, 0.37, 0.23, 0.38);
  control_panel_shape.lineTo(-0.23, 0.38);
  control_panel_shape.quadraticCurveTo(-0.30, 0.37, -0.31, 0.31);
  control_panel_shape.lineTo(-0.35, -0.28);
  control_panel_shape.quadraticCurveTo(-0.34, -0.36, -0.27, -0.36);
  control_panel_shape.closePath();

  const control_panel_geom = new THREE.ExtrudeGeometry(control_panel_shape, {
    depth: 0.025,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.008,
    bevelSize: 0.012,
    bevelSegments: 3
  });
  const control_panel = new THREE.Mesh(control_panel_geom, glossy_black_mat);
  control_panel.name = "control_panel";
  control_panel_group.add(control_panel);

  const display_screen_geom = new THREE.BoxGeometry(0.43, 0.22, 0.012);
  const display_screen = new THREE.Mesh(display_screen_geom, screen_mat);
  display_screen.name = "display_screen";
  display_screen.position.set(0, 0.16, 0.037);
  control_panel_group.add(display_screen);

  const display_segment_geom = new THREE.BoxGeometry(0.055, 0.011, 0.006);
  const display_segments = new THREE.InstancedMesh(display_segment_geom, cyan_led_mat, 12);
  display_segments.name = "display_segments";
  const digit_centers = [-0.075, 0.075];
  let segment_index = 0;
  for (let d = 0; d < digit_centers.length; d++) {
    const cx = digit_centers[d];
    const segments = [
      [cx, 0.205, 0],
      [cx, 0.135, 0],
      [cx - 0.034, 0.184, Math.PI / 2],
      [cx + 0.034, 0.184, Math.PI / 2],
      [cx - 0.034, 0.156, Math.PI / 2],
      [cx + 0.034, 0.156, Math.PI / 2]
    ];
    for (let s = 0; s < segments.length; s++) {
      instance_dummy.position.set(segments[s][0], segments[s][1], 0.047);
      instance_dummy.rotation.set(0, 0, segments[s][2]);
      instance_dummy.scale.set(1, 1, 1);
      instance_dummy.updateMatrix();
      display_segments.setMatrixAt(segment_index++, instance_dummy.matrix);
    }
  }
  display_segments.instanceMatrix.needsUpdate = true;
  control_panel_group.add(display_segments);

  const status_light_geom = new THREE.CircleGeometry(0.012, 16);
  const status_light = new THREE.Mesh(status_light_geom, cyan_led_mat);
  status_light.name = "status_light";
  status_light.position.set(0.17, 0.225, 0.051);
  control_panel_group.add(status_light);

  const mode_button_geom = new THREE.CircleGeometry(0.026, 24);
  const mode_buttons = new THREE.InstancedMesh(mode_button_geom, glossy_black_mat, 5);
  mode_buttons.name = "mode_buttons";
  for (let i = 0; i < 5; i++) {
    instance_dummy.position.set(-0.18 + i * 0.09, 0.015, 0.050);
    instance_dummy.rotation.set(0, 0, 0);
    instance_dummy.scale.set(1, 1, 1);
    instance_dummy.updateMatrix();
    mode_buttons.setMatrixAt(i, instance_dummy.matrix);
  }
  mode_buttons.instanceMatrix.needsUpdate = true;
  control_panel_group.add(mode_buttons);

  const button_ring_geom = new THREE.RingGeometry(0.026, 0.030, 24);
  const button_rings = new THREE.InstancedMesh(button_ring_geom, marking_mat, 5);
  button_rings.name = "button_rings";
  for (let i = 0; i < 5; i++) {
    instance_dummy.position.set(-0.18 + i * 0.09, 0.015, 0.052);
    instance_dummy.rotation.set(0, 0, 0);
    instance_dummy.scale.set(1, 1, 1);
    instance_dummy.updateMatrix();
    button_rings.setMatrixAt(i, instance_dummy.matrix);
  }
  button_rings.instanceMatrix.needsUpdate = true;
  control_panel_group.add(button_rings);

  const dial_ring_geom = new THREE.TorusGeometry(0.112, 0.012, 12, 48);
  const dial_ring = new THREE.Mesh(dial_ring_geom, blade_mat);
  dial_ring.name = "dial_ring";
  dial_ring.position.set(0, -0.205, 0.054);
  control_panel_group.add(dial_ring);

  const dial_knob_geom = new THREE.CylinderGeometry(0.085, 0.095, 0.065, 48);
  const dial_knob = new THREE.Mesh(dial_knob_geom, glossy_black_mat);
  dial_knob.name = "dial_knob";
  dial_knob.rotation.x = Math.PI / 2;
  dial_knob.position.set(0, -0.205, 0.075);
  control_panel_group.add(dial_knob);

  const dial_indicator_geom = new THREE.BoxGeometry(0.012, 0.045, 0.008);
  const dial_indicator = new THREE.Mesh(dial_indicator_geom, marking_mat);
  dial_indicator.name = "dial_indicator";
  dial_indicator.position.set(0, -0.135, 0.111);
  control_panel_group.add(dial_indicator);

  const brand_mark_geom = new THREE.BoxGeometry(0.018, 0.007, 0.005);
  const brand_marks = new THREE.InstancedMesh(brand_mark_geom, glossy_black_mat, 7);
  brand_marks.name = "brand_marks";
  for (let i = 0; i < 7; i++) {
    instance_dummy.position.set(-0.054 + i * 0.018, 0.245, 0.049);
    instance_dummy.rotation.set(0, 0, i === 0 || i === 6 ? 0.25 : 0);
    instance_dummy.scale.set(i === 3 ? 1.3 : 1, 1, 1);
    instance_dummy.updateMatrix();
    brand_marks.setMatrixAt(i, instance_dummy.matrix);
  }
  brand_marks.instanceMatrix.needsUpdate = true;
  control_panel_group.add(brand_marks);

  const jar_bottom_geom = new THREE.CylinderGeometry(0.30, 0.285, 0.075, 64);
  const jar_bottom = new THREE.Mesh(jar_bottom_geom, glass_mat);
  jar_bottom.name = "jar_bottom";
  jar_bottom.position.set(0, 1.285, 0);
  jar_group.add(jar_bottom);

  const jar_wall_geom = createJarGeometry();
  const jar_wall = new THREE.Mesh(jar_wall_geom, glass_mat);
  jar_wall.name = "jar_wall";
  jar_group.add(jar_wall);

  const left_glass_rib = createRib([
    new THREE.Vector3(-0.205, 1.35, 0.245),
    new THREE.Vector3(-0.235, 1.55, 0.285),
    new THREE.Vector3(-0.255, 1.86, 0.315),
    new THREE.Vector3(-0.270, 2.10, 0.330)
  ], 0.012);
  left_glass_rib.name = "left_glass_rib";
  jar_group.add(left_glass_rib);

  const right_glass_rib = createRib([
    new THREE.Vector3(0.205, 1.35, 0.245),
    new THREE.Vector3(0.235, 1.55, 0.285),
    new THREE.Vector3(0.255, 1.86, 0.315),
    new THREE.Vector3(0.270, 2.10, 0.330)
  ], 0.012);
  right_glass_rib.name = "right_glass_rib";
  jar_group.add(right_glass_rib);

  const measurement_line_geom = new THREE.BoxGeometry(0.105, 0.006, 0.004);
  const measurement_lines = new THREE.InstancedMesh(measurement_line_geom, marking_mat, 8);
  measurement_lines.name = "measurement_lines";
  for (let i = 0; i < 8; i++) {
    instance_dummy.position.set(0.035, 1.48 + i * 0.105, 0.374);
    instance_dummy.rotation.set(0, 0, 0);
    instance_dummy.scale.set(i % 2 === 0 ? 1 : 0.62, 1, 1);
    instance_dummy.updateMatrix();
    measurement_lines.setMatrixAt(i, instance_dummy.matrix);
  }
  measurement_lines.instanceMatrix.needsUpdate = true;
  jar_group.add(measurement_lines);

  const measurement_tick_geom = new THREE.BoxGeometry(0.035, 0.005, 0.004);
  const measurement_ticks = new THREE.InstancedMesh(measurement_tick_geom, marking_mat, 12);
  measurement_ticks.name = "measurement_ticks";
  for (let i = 0; i < 12; i++) {
    instance_dummy.position.set(-0.075, 1.43 + i * 0.075, 0.372);
    instance_dummy.rotation.set(0, 0, 0);
    instance_dummy.scale.set(i % 3 === 0 ? 1.2 : 0.65, 1, 1);
    instance_dummy.updateMatrix();
    measurement_ticks.setMatrixAt(i, instance_dummy.matrix);
  }
  measurement_ticks.instanceMatrix.needsUpdate = true;
  jar_group.add(measurement_ticks);

  const spout_shape = new THREE.Shape();
  spout_shape.moveTo(-0.35, 2.12);
  spout_shape.lineTo(-0.52, 2.15);
  spout_shape.lineTo(-0.47, 2.07);
  spout_shape.lineTo(-0.39, 1.96);
  spout_shape.lineTo(-0.34, 1.99);
  spout_shape.closePath();

  const pouring_spout_geom = new THREE.ExtrudeGeometry(spout_shape, {
    depth: 0.10,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.006,
    bevelSize: 0.006,
    bevelSegments: 2
  });
  const pouring_spout = new THREE.Mesh(pouring_spout_geom, glass_mat);
  pouring_spout.name = "pouring_spout";
  pouring_spout.position.z = -0.05;
  jar_group.add(pouring_spout);

  const spout_lip_curve = new THREE.LineCurve3(
    new THREE.Vector3(-0.515, 2.15, 0.055),
    new THREE.Vector3(-0.35, 2.12, 0.055)
  );
  const spout_lip_geom = new THREE.TubeGeometry(spout_lip_curve, 1, 0.010, 8, false);
  const spout_lip = new THREE.Mesh(spout_lip_geom, glass_edge_mat);
  spout_lip.name = "spout_lip";
  jar_group.add(spout_lip);

  const handle_curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.38, 2.10, -0.03),
    new THREE.Vector3(0.57, 2.08, -0.03),
    new THREE.Vector3(0.72, 1.94, -0.03),
    new THREE.Vector3(0.76, 1.70, -0.03),
    new THREE.Vector3(0.73, 1.45, -0.03),
    new THREE.Vector3(0.59, 1.28, -0.03),
    new THREE.Vector3(0.38, 1.18, -0.03)
  ], false, "centripetal");
  const handle_geom = new THREE.TubeGeometry(handle_curve, 48, 0.075, 16, false);
  const handle = new THREE.Mesh(handle_geom, glossy_black_mat);
  handle.name = "handle";
  jar_group.add(handle);

  const upper_handle_mount_geom = new THREE.BoxGeometry(0.15, 0.16, 0.18);
  const upper_handle_mount = new THREE.Mesh(upper_handle_mount_geom, glossy_black_mat);
  upper_handle_mount.name = "upper_handle_mount";
  upper_handle_mount.position.set(0.39, 2.04, -0.03);
  upper_handle_mount.rotation.z = -0.12;
  jar_group.add(upper_handle_mount);

  const lower_handle_mount_geom = new THREE.BoxGeometry(0.14, 0.18, 0.17);
  const lower_handle_mount = new THREE.Mesh(lower_handle_mount_geom, glossy_black_mat);
  lower_handle_mount.name = "lower_handle_mount";
  lower_handle_mount.position.set(0.36, 1.22, -0.03);
  lower_handle_mount.rotation.z = 0.22;
  jar_group.add(lower_handle_mount);

  const blade_shape = new THREE.Shape();
  blade_shape.moveTo(0.025, -0.025);
  blade_shape.lineTo(0.225, -0.045);
  blade_shape.lineTo(0.185, 0.035);
  blade_shape.lineTo(0.025, 0.025);
  blade_shape.closePath();

  const blade_geom = new THREE.ExtrudeGeometry(blade_shape, {
    depth: 0.012,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.004,
    bevelSize: 0.004,
    bevelSegments: 2
  });
  const cutting_blades = new THREE.InstancedMesh(blade_geom, blade_mat, 4);
  cutting_blades.name = "cutting_blades";
  for (let i = 0; i < 4; i++) {
    instance_dummy.position.set(0, 1.34, 0);
    instance_dummy.rotation.set(Math.PI / 2, i * Math.PI / 2, 0);
    instance_dummy.scale.set(1, 1, 1);
    instance_dummy.updateMatrix();
    cutting_blades.setMatrixAt(i, instance_dummy.matrix);
  }
  cutting_blades.instanceMatrix.needsUpdate = true;
  jar_group.add(cutting_blades);

  const blade_hub_geom = new THREE.CylinderGeometry(0.055, 0.075, 0.09, 32);
  const blade_hub = new THREE.Mesh(blade_hub_geom, blade_mat);
  blade_hub.name = "blade_hub";
  blade_hub.position.set(0, 1.34, 0);
  jar_group.add(blade_hub);

  const blade_cap_geom = new THREE.SphereGeometry(0.045, 24, 12);
  const blade_cap = new THREE.Mesh(blade_cap_geom, glossy_black_mat);
  blade_cap.name = "blade_cap";
  blade_cap.position.set(0, 1.395, 0);
  blade_cap.scale.set(1, 0.55, 1);
  jar_group.add(blade_cap);

  const jar_top_band_geom = new THREE.CylinderGeometry(0.405, 0.395, 0.105, 64);
  const jar_top_band = new THREE.Mesh(jar_top_band_geom, glossy_black_mat);
  jar_top_band.name = "jar_top_band";
  jar_top_band.position.set(0, 2.17, 0);
  jar_group.add(jar_top_band);

  const jar_seal_ring_geom = new THREE.TorusGeometry(0.385, 0.018, 10, 64);
  const jar_seal_ring = new THREE.Mesh(jar_seal_ring_geom, rubber_mat);
  jar_seal_ring.name = "jar_seal_ring";
  jar_seal_ring.rotation.x = Math.PI / 2;
  jar_seal_ring.position.set(0, 2.115, 0);
  jar_group.add(jar_seal_ring);

  const lid_profile = [
    new THREE.Vector2(0.00, 2.205),
    new THREE.Vector2(0.39, 2.205),
    new THREE.Vector2(0.455, 2.225),
    new THREE.Vector2(0.435, 2.255),
    new THREE.Vector2(0.355, 2.305),
    new THREE.Vector2(0.245, 2.345),
    new THREE.Vector2(0.125, 2.365),
    new THREE.Vector2(0.00, 2.365)
  ];
  const lid_dome_geom = new THREE.LatheGeometry(lid_profile, 64);
  const lid_dome = new THREE.Mesh(lid_dome_geom, glossy_black_mat);
  lid_dome.name = "lid_dome";
  lid_group.add(lid_dome);

  const lid_rim_geom = new THREE.TorusGeometry(0.435, 0.020, 12, 64);
  const lid_rim = new THREE.Mesh(lid_rim_geom, glossy_black_mat);
  lid_rim.name = "lid_rim";
  lid_rim.rotation.x = Math.PI / 2;
  lid_rim.position.set(0, 2.225, 0);
  lid_group.add(lid_rim);

  const lid_tab_geom = new THREE.BoxGeometry(0.16, 0.045, 0.11);
  const lid_tab = new THREE.Mesh(lid_tab_geom, glossy_black_mat);
  lid_tab.name = "lid_tab";
  lid_tab.position.set(0.49, 2.225, 0);
  lid_group.add(lid_tab);

  const lid_knob_base_geom = new THREE.CylinderGeometry(0.16, 0.17, 0.055, 48);
  const lid_knob_base = new THREE.Mesh(lid_knob_base_geom, glossy_black_mat);
  lid_knob_base.name = "lid_knob_base";
  lid_knob_base.position.set(0, 2.385, 0);
  lid_group.add(lid_knob_base);

  const lid_knob_geom = new THREE.CylinderGeometry(0.14, 0.15, 0.12, 48);
  const lid_knob = new THREE.Mesh(lid_knob_geom, glossy_black_mat);
  lid_knob.name = "lid_knob";
  lid_knob.position.set(0, 2.455, 0);
  lid_group.add(lid_knob);

  const knob_top_geom = new THREE.CylinderGeometry(0.125, 0.14, 0.025, 48);
  const knob_top = new THREE.Mesh(knob_top_geom, black_plastic_mat);
  knob_top.name = "knob_top";
  knob_top.position.set(0, 2.525, 0);
  lid_group.add(knob_top);

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
