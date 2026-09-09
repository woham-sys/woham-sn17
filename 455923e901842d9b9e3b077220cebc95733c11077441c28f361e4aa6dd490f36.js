function __sn17_user(THREE) {
  const root = new THREE.Group();
  root.name = "speckled_blender";

  const blue_plastic_mat = new THREE.MeshStandardMaterial({
    color: 0x075fcf,
    metalness: 0.0,
    roughness: 0.18,
  });
  const dark_blue_mat = new THREE.MeshStandardMaterial({
    color: 0x063c91,
    metalness: 0.0,
    roughness: 0.22,
  });
  const black_plastic_mat = new THREE.MeshStandardMaterial({
    color: 0x17191b,
    metalness: 0.0,
    roughness: 0.35,
  });
  const rubber_mat = new THREE.MeshStandardMaterial({
    color: 0x111111,
    metalness: 0.0,
    roughness: 0.55,
  });
  const orange_speckle_mat = new THREE.MeshStandardMaterial({
    color: 0xf06a05,
    metalness: 0.0,
    roughness: 0.28,
    side: THREE.DoubleSide,
  });
  const yellow_speckle_mat = new THREE.MeshStandardMaterial({
    color: 0xffb21a,
    metalness: 0.0,
    roughness: 0.28,
    side: THREE.DoubleSide,
  });
  const cream_speckle_mat = new THREE.MeshStandardMaterial({
    color: 0xe8dfc7,
    metalness: 0.0,
    roughness: 0.3,
    side: THREE.DoubleSide,
  });
  const glass_mat = new THREE.MeshPhysicalMaterial({
    color: 0xddeeff,
    transparent: true,
    opacity: 0.42,
    thickness: 0.025,
    side: THREE.DoubleSide,
    depthWrite: false,
  });
  const glass_edge_mat = new THREE.MeshPhysicalMaterial({
    color: 0xb8c7d8,
    transparent: true,
    opacity: 0.62,
    thickness: 0.018,
    side: THREE.DoubleSide,
    depthWrite: false,
  });
  const marking_mat = new THREE.MeshStandardMaterial({
    color: 0x667582,
    metalness: 0.0,
    roughness: 0.5,
  });
  const silver_mat = new THREE.MeshStandardMaterial({
    color: 0xaeb8bd,
    metalness: 0.35,
    roughness: 0.25,
  });

  const base_foot_geom = new THREE.CylinderGeometry(0.56, 0.56, 0.045, 64);
  const base_foot = new THREE.Mesh(base_foot_geom, rubber_mat);
  base_foot.name = "base_foot";
  base_foot.position.y = 0.025;
  root.add(base_foot);

  const lower_base_profile = [
    new THREE.Vector2(0.00, 0.04),
    new THREE.Vector2(0.48, 0.04),
    new THREE.Vector2(0.57, 0.055),
    new THREE.Vector2(0.61, 0.09),
    new THREE.Vector2(0.61, 0.17),
    new THREE.Vector2(0.58, 0.22),
    new THREE.Vector2(0.52, 0.25),
    new THREE.Vector2(0.00, 0.25),
  ];
  const lower_base_geom = new THREE.LatheGeometry(lower_base_profile, 64);
  const lower_base = new THREE.Mesh(lower_base_geom, blue_plastic_mat);
  lower_base.name = "lower_base";
  root.add(lower_base);

  const base_trim_ring_geom = new THREE.TorusGeometry(0.545, 0.014, 10, 64);
  const base_trim_ring = new THREE.Mesh(base_trim_ring_geom, dark_blue_mat);
  base_trim_ring.name = "base_trim_ring";
  base_trim_ring.rotation.x = Math.PI / 2;
  base_trim_ring.position.y = 0.235;
  root.add(base_trim_ring);

  const pedestal_profile = [
    new THREE.Vector2(0.00, 0.20),
    new THREE.Vector2(0.50, 0.20),
    new THREE.Vector2(0.53, 0.25),
    new THREE.Vector2(0.51, 0.32),
    new THREE.Vector2(0.47, 0.50),
    new THREE.Vector2(0.42, 0.68),
    new THREE.Vector2(0.35, 0.79),
    new THREE.Vector2(0.27, 0.84),
    new THREE.Vector2(0.00, 0.84),
  ];
  const pedestal_geom = new THREE.LatheGeometry(pedestal_profile, 64);
  const pedestal = new THREE.Mesh(pedestal_geom, blue_plastic_mat);
  pedestal.name = "pedestal";
  root.add(pedestal);

  const column_profile = [
    new THREE.Vector2(0.00, 0.72),
    new THREE.Vector2(0.27, 0.72),
    new THREE.Vector2(0.29, 0.82),
    new THREE.Vector2(0.29, 1.34),
    new THREE.Vector2(0.30, 1.40),
    new THREE.Vector2(0.30, 1.88),
    new THREE.Vector2(0.29, 1.95),
    new THREE.Vector2(0.00, 1.95),
  ];
  const column_geom = new THREE.LatheGeometry(column_profile, 64);
  const column = new THREE.Mesh(column_geom, blue_plastic_mat);
  column.name = "column";
  root.add(column);

  const lower_column_seam_geom = new THREE.TorusGeometry(0.292, 0.006, 8, 64);
  const lower_column_seam = new THREE.Mesh(lower_column_seam_geom, black_plastic_mat);
  lower_column_seam.name = "lower_column_seam";
  lower_column_seam.rotation.x = Math.PI / 2;
  lower_column_seam.position.y = 1.385;
  root.add(lower_column_seam);

  const upper_column_seam_geom = new THREE.TorusGeometry(0.296, 0.006, 8, 64);
  const upper_column_seam = new THREE.Mesh(upper_column_seam_geom, black_plastic_mat);
  upper_column_seam.name = "upper_column_seam";
  upper_column_seam.rotation.x = Math.PI / 2;
  upper_column_seam.position.y = 1.945;
  root.add(upper_column_seam);

  const top_lid_geom = new THREE.CylinderGeometry(0.285, 0.285, 0.035, 64);
  const top_lid = new THREE.Mesh(top_lid_geom, black_plastic_mat);
  top_lid.name = "top_lid";
  top_lid.position.y = 1.973;
  root.add(top_lid);

  const lid_recess_geom = new THREE.CylinderGeometry(0.145, 0.145, 0.009, 48);
  const lid_recess = new THREE.Mesh(lid_recess_geom, new THREE.MeshStandardMaterial({
    color: 0x292c2e,
    metalness: 0.0,
    roughness: 0.4,
  }));
  lid_recess.name = "lid_recess";
  lid_recess.position.y = 1.995;
  root.add(lid_recess);

  const lid_recess_ring_geom = new THREE.TorusGeometry(0.145, 0.004, 8, 48);
  const lid_recess_ring = new THREE.Mesh(lid_recess_ring_geom, black_plastic_mat);
  lid_recess_ring.name = "lid_recess_ring";
  lid_recess_ring.rotation.x = Math.PI / 2;
  lid_recess_ring.position.y = 1.999;
  root.add(lid_recess_ring);

  const handle_shape = new THREE.Shape();
  handle_shape.moveTo(0.23, 1.80);
  handle_shape.lineTo(0.57, 1.79);
  handle_shape.bezierCurveTo(0.72, 1.78, 0.80, 1.66, 0.81, 1.50);
  handle_shape.lineTo(0.82, 1.20);
  handle_shape.bezierCurveTo(0.82, 1.03, 0.75, 0.91, 0.66, 0.82);
  handle_shape.lineTo(0.34, 0.55);
  handle_shape.lineTo(0.23, 0.65);
  handle_shape.lineTo(0.53, 0.92);
  handle_shape.bezierCurveTo(0.61, 1.00, 0.66, 1.10, 0.66, 1.23);
  handle_shape.lineTo(0.66, 1.47);
  handle_shape.bezierCurveTo(0.66, 1.57, 0.61, 1.63, 0.52, 1.64);
  handle_shape.lineTo(0.23, 1.64);
  handle_shape.closePath();

  const handle_geom = new THREE.ExtrudeGeometry(handle_shape, {
    steps: 1,
    curveSegments: 16,
    bevelEnabled: true,
    bevelThickness: 0.018,
    bevelSize: 0.018,
    bevelSegments: 3,
  });
  const handle = new THREE.Mesh(handle_geom, blue_plastic_mat);
  handle.name = "handle";
  handle.position.z = -0.13;
  root.add(handle);

  const handle_inner_shadow_curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.28, 1.635, -0.105),
    new THREE.Vector3(0.53, 1.625, -0.105),
    new THREE.Vector3(0.65, 1.49, -0.105),
    new THREE.Vector3(0.66, 1.20, -0.105),
    new THREE.Vector3(0.61, 0.99, -0.105),
    new THREE.Vector3(0.31, 0.69, -0.105),
  ]);
  const handle_inner_shadow_geom = new THREE.TubeGeometry(
    handle_inner_shadow_curve,
    48,
    0.012,
    8,
    false
  );
  const handle_inner_shadow = new THREE.Mesh(handle_inner_shadow_geom, dark_blue_mat);
  handle_inner_shadow.name = "handle_inner_shadow";
  root.add(handle_inner_shadow);

  const switch_mount_geom = new THREE.SphereGeometry(1, 24, 12);
  const switch_mount = new THREE.Mesh(switch_mount_geom, blue_plastic_mat);
  switch_mount.name = "switch_mount";
  switch_mount.scale.set(0.13, 0.055, 0.085);
  switch_mount.position.set(0.57, 1.805, -0.04);
  root.add(switch_mount);

  const power_switch_geom = new THREE.SphereGeometry(1, 24, 12);
  const power_switch = new THREE.Mesh(power_switch_geom, black_plastic_mat);
  power_switch.name = "power_switch";
  power_switch.scale.set(0.085, 0.035, 0.055);
  power_switch.position.set(0.59, 1.845, -0.035);
  root.add(power_switch);

  const jar_assembly = new THREE.Group();
  jar_assembly.name = "jar_assembly";
  jar_assembly.position.set(-0.31, 0, 0.18);
  root.add(jar_assembly);

  const jar_profile = [
    new THREE.Vector2(0.205, 0.79),
    new THREE.Vector2(0.235, 0.77),
    new THREE.Vector2(0.285, 0.80),
    new THREE.Vector2(0.315, 0.88),
    new THREE.Vector2(0.335, 1.22),
    new THREE.Vector2(0.345, 1.35),
    new THREE.Vector2(0.355, 1.38),
  ];
  const jar_body_geom = new THREE.LatheGeometry(jar_profile, 64);
  const jar_body = new THREE.Mesh(jar_body_geom, glass_mat);
  jar_body.name = "jar_body";
  jar_assembly.add(jar_body);

  const jar_bottom_geom = new THREE.CylinderGeometry(0.235, 0.215, 0.035, 48);
  const jar_bottom = new THREE.Mesh(jar_bottom_geom, glass_edge_mat);
  jar_bottom.name = "jar_bottom";
  jar_bottom.position.y = 0.785;
  jar_assembly.add(jar_bottom);

  const jar_rim_geom = new THREE.TorusGeometry(0.348, 0.012, 10, 64);
  const jar_rim = new THREE.Mesh(jar_rim_geom, glass_edge_mat);
  jar_rim.name = "jar_rim";
  jar_rim.rotation.x = Math.PI / 2;
  jar_rim.position.y = 1.38;
  jar_assembly.add(jar_rim);

  const jar_base_ring_geom = new THREE.TorusGeometry(0.225, 0.012, 10, 48);
  const jar_base_ring = new THREE.Mesh(jar_base_ring_geom, glass_edge_mat);
  jar_base_ring.name = "jar_base_ring";
  jar_base_ring.rotation.x = Math.PI / 2;
  jar_base_ring.position.y = 0.79;
  jar_assembly.add(jar_base_ring);

  const jar_handle_curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.315, 1.31, 0.02),
    new THREE.Vector3(-0.385, 1.27, 0.04),
    new THREE.Vector3(-0.405, 1.04, 0.04),
    new THREE.Vector3(-0.385, 0.86, 0.04),
    new THREE.Vector3(-0.315, 0.82, 0.02),
  ]);
  const jar_handle_geom = new THREE.TubeGeometry(jar_handle_curve, 32, 0.018, 10, false);
  const jar_handle = new THREE.Mesh(jar_handle_geom, glass_edge_mat);
  jar_handle.name = "jar_handle";
  jar_assembly.add(jar_handle);

  const jar_handle_mount_geom = new THREE.SphereGeometry(1, 16, 8);
  const jar_handle_upper_mount = new THREE.Mesh(jar_handle_mount_geom, glass_edge_mat);
  jar_handle_upper_mount.name = "jar_handle_upper_mount";
  jar_handle_upper_mount.scale.set(0.035, 0.055, 0.025);
  jar_handle_upper_mount.position.set(-0.315, 1.31, 0.02);
  jar_assembly.add(jar_handle_upper_mount);

  const jar_handle_lower_mount = new THREE.Mesh(jar_handle_mount_geom, glass_edge_mat);
  jar_handle_lower_mount.name = "jar_handle_lower_mount";
  jar_handle_lower_mount.scale.set(0.035, 0.05, 0.025);
  jar_handle_lower_mount.position.set(-0.315, 0.82, 0.02);
  jar_assembly.add(jar_handle_lower_mount);

  const measurement_panel_geom = new THREE.PlaneGeometry(0.075, 0.42);
  const measurement_panel = new THREE.Mesh(measurement_panel_geom, glass_edge_mat);
  measurement_panel.name = "measurement_panel";
  measurement_panel.position.set(0.17, 1.08, 0.302);
  jar_assembly.add(measurement_panel);

  const measurement_tick_geom = new THREE.BoxGeometry(0.045, 0.004, 0.004);
  const measurement_ticks = new THREE.InstancedMesh(measurement_tick_geom, marking_mat, 7);
  measurement_ticks.name = "measurement_ticks";
  const tick_dummy = new THREE.Object3D();
  for (let i = 0; i < 7; i++) {
    const t = i / 6;
    const length_scale = i % 2 === 0 ? 1.0 : 0.62;
    tick_dummy.position.set(0.185, 0.90 + t * 0.34, 0.307);
    tick_dummy.rotation.set(0, 0, 0);
    tick_dummy.scale.set(length_scale, 1, 1);
    tick_dummy.updateMatrix();
    measurement_ticks.setMatrixAt(i, tick_dummy.matrix);
  }
  measurement_ticks.instanceMatrix.needsUpdate = true;
  jar_assembly.add(measurement_ticks);

  const measurement_zero_geom = new THREE.RingGeometry(0.006, 0.010, 12);
  const measurement_zeros = new THREE.InstancedMesh(measurement_zero_geom, marking_mat, 3);
  measurement_zeros.name = "measurement_zeros";
  const zero_dummy = new THREE.Object3D();
  for (let i = 0; i < 3; i++) {
    zero_dummy.position.set(0.125, 0.94 + i * 0.13, 0.308);
    zero_dummy.updateMatrix();
    measurement_zeros.setMatrixAt(i, zero_dummy.matrix);
  }
  measurement_zeros.instanceMatrix.needsUpdate = true;
  jar_assembly.add(measurement_zeros);

  const blade_hub_geom = new THREE.CylinderGeometry(0.055, 0.06, 0.045, 24);
  const blade_hub = new THREE.Mesh(blade_hub_geom, silver_mat);
  blade_hub.name = "blade_hub";
  blade_hub.position.y = 0.825;
  jar_assembly.add(blade_hub);

  const blade_cap_geom = new THREE.SphereGeometry(0.028, 16, 8);
  const blade_cap = new THREE.Mesh(blade_cap_geom, silver_mat);
  blade_cap.name = "blade_cap";
  blade_cap.scale.set(1, 0.55, 1);
  blade_cap.position.y = 0.855;
  jar_assembly.add(blade_cap);

  const blade_geom = new THREE.BoxGeometry(0.15, 0.009, 0.026);
  const blade_left = new THREE.Mesh(blade_geom, silver_mat);
  blade_left.name = "blade_left";
  blade_left.position.y = 0.84;
  blade_left.rotation.y = Math.PI / 4;
  jar_assembly.add(blade_left);

  const blade_right = new THREE.Mesh(blade_geom, silver_mat);
  blade_right.name = "blade_right";
  blade_right.position.y = 0.84;
  blade_right.rotation.y = -Math.PI / 4;
  jar_assembly.add(blade_right);

  const speckle_geom = new THREE.CircleGeometry(1, 7);

  function pedestalRadiusAt(y) {
    if (y <= 0.25) return 0.52;
    if (y >= 0.80) return 0.34;
    return 0.52 - (y - 0.25) / 0.55 * 0.18;
  }

  function columnRadiusAt(y) {
    if (y <= 0.82) return 0.28;
    if (y >= 1.90) return 0.295;
    return 0.29;
  }

  function lowerBaseRadiusAt(y) {
    if (y <= 0.08) return 0.56;
    if (y >= 0.22) return 0.56;
    return 0.60;
  }

  function createSpeckles(count, material, radius_function, y_min, y_max, phase, size_factor) {
    const instances = new THREE.InstancedMesh(speckle_geom, material, count);
    const dummy = new THREE.Object3D();
    const normal = new THREE.Vector3();
    const front_axis = new THREE.Vector3(0, 0, 1);
    const quaternion = new THREE.Quaternion();

    for (let i = 0; i < count; i++) {
      const u = ((i * 37 + phase * 19) % 101) / 100;
      const v = ((i * 61 + phase * 23) % 103) / 102;
      const angle = u * Math.PI * 2;
      const y = y_min + (y_max - y_min) * v;
      const radius = radius_function(y) + 0.006;
      const size_x = (0.006 + ((i * 17 + phase) % 9) * 0.0022) * size_factor;
      const size_y = (0.004 + ((i * 29 + phase * 3) % 8) * 0.0017) * size_factor;

      normal.set(Math.cos(angle), 0, Math.sin(angle)).normalize();
      quaternion.setFromUnitVectors(front_axis, normal);

      dummy.position.set(normal.x * radius, y, normal.z * radius);
      dummy.quaternion.copy(quaternion);
      dummy.rotateZ(((i * 43 + phase * 11) % 360) * Math.PI / 180);
      dummy.scale.set(size_x, size_y, 1);
      dummy.updateMatrix();
      instances.setMatrixAt(i, dummy.matrix);
    }

    instances.instanceMatrix.needsUpdate = true;
    return instances;
  }

  const pedestal_orange_speckles = createSpeckles(
    82,
    orange_speckle_mat,
    pedestalRadiusAt,
    0.27,
    0.78,
    2,
    1.0
  );
  pedestal_orange_speckles.name = "pedestal_orange_speckles";
  root.add(pedestal_orange_speckles);

  const pedestal_yellow_speckles = createSpeckles(
    34,
    yellow_speckle_mat,
    pedestalRadiusAt,
    0.28,
    0.77,
    5,
    0.75
  );
  pedestal_yellow_speckles.name = "pedestal_yellow_speckles";
  root.add(pedestal_yellow_speckles);

  const pedestal_cream_speckles = createSpeckles(
    18,
    cream_speckle_mat,
    pedestalRadiusAt,
    0.30,
    0.76,
    8,
    0.55
  );
  pedestal_cream_speckles.name = "pedestal_cream_speckles";
  root.add(pedestal_cream_speckles);

  const column_orange_speckles = createSpeckles(
    92,
    orange_speckle_mat,
    columnRadiusAt,
    0.82,
    1.90,
    3,
    0.9
  );
  column_orange_speckles.name = "column_orange_speckles";
  root.add(column_orange_speckles);

  const column_yellow_speckles = createSpeckles(
    38,
    yellow_speckle_mat,
    columnRadiusAt,
    0.84,
    1.89,
    6,
    0.68
  );
  column_yellow_speckles.name = "column_yellow_speckles";
  root.add(column_yellow_speckles);

  const column_cream_speckles = createSpeckles(
    20,
    cream_speckle_mat,
    columnRadiusAt,
    0.86,
    1.87,
    9,
    0.5
  );
  column_cream_speckles.name = "column_cream_speckles";
  root.add(column_cream_speckles);

  const lower_base_orange_speckles = createSpeckles(
    52,
    orange_speckle_mat,
    lowerBaseRadiusAt,
    0.075,
    0.215,
    4,
    0.95
  );
  lower_base_orange_speckles.name = "lower_base_orange_speckles";
  root.add(lower_base_orange_speckles);

  const lower_base_yellow_speckles = createSpeckles(
    20,
    yellow_speckle_mat,
    lowerBaseRadiusAt,
    0.08,
    0.21,
    7,
    0.7
  );
  lower_base_yellow_speckles.name = "lower_base_yellow_speckles";
  root.add(lower_base_yellow_speckles);

  const handle_orange_speckles = new THREE.InstancedMesh(speckle_geom, orange_speckle_mat, 38);
  handle_orange_speckles.name = "handle_orange_speckles";
  const handle_dot_dummy = new THREE.Object3D();
  for (let i = 0; i < 38; i++) {
    const t = ((i * 23 + 5) % 41) / 40;
    const across = ((i * 31 + 7) % 17) / 16;
    const y = 0.67 + t * 1.08;
    const center_x = 0.30 + 0.48 * Math.sin(t * Math.PI * 0.82);
    const width = 0.07 + 0.05 * Math.sin(t * Math.PI);
    const x = center_x + (across - 0.5) * width * 1.35;
    const size_x = 0.007 + ((i * 13) % 7) * 0.002;
    const size_y = 0.005 + ((i * 19) % 6) * 0.0017;

    handle_dot_dummy.position.set(x, y, -0.087);
    handle_dot_dummy.rotation.set(0, 0, ((i * 47) % 360) * Math.PI / 180);
    handle_dot_dummy.scale.set(size_x, size_y, 1);
    handle_dot_dummy.updateMatrix();
    handle_orange_speckles.setMatrixAt(i, handle_dot_dummy.matrix);
  }
  handle_orange_speckles.instanceMatrix.needsUpdate = true;
  root.add(handle_orange_speckles);

  const handle_yellow_speckles = new THREE.InstancedMesh(speckle_geom, yellow_speckle_mat, 14);
  handle_yellow_speckles.name = "handle_yellow_speckles";
  const handle_yellow_dummy = new THREE.Object3D();
  for (let i = 0; i < 14; i++) {
    const t = ((i * 17 + 3) % 19) / 18;
    const across = ((i * 11 + 2) % 13) / 12;
    const y = 0.72 + t * 0.98;
    const center_x = 0.30 + 0.48 * Math.sin(t * Math.PI * 0.82);
    const width = 0.07 + 0.05 * Math.sin(t * Math.PI);
    const x = center_x + (across - 0.5) * width * 1.2;

    handle_yellow_dummy.position.set(x, y, -0.086);
    handle_yellow_dummy.rotation.set(0, 0, ((i * 59) % 360) * Math.PI / 180);
    handle_yellow_dummy.scale.set(
      0.006 + (i % 5) * 0.0018,
      0.004 + ((i * 3) % 5) * 0.0014,
      1
    );
    handle_yellow_dummy.updateMatrix();
    handle_yellow_speckles.setMatrixAt(i, handle_yellow_dummy.matrix);
  }
  handle_yellow_speckles.instanceMatrix.needsUpdate = true;
  root.add(handle_yellow_speckles);

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
