function __sn17_user(THREE) {
  const root = new THREE.Group();
  root.name = "modern_blue_city_bus";

  const length = 4.65;
  const width = 1.02;
  const body_bottom = -0.24;
  const roof_height = 0.94;
  const wheel_y = -0.22;
  const front_axle_z = 1.35;
  const rear_axle_z = -1.35;

  const bodyMat = new THREE.MeshStandardMaterial({
    color: 0x1767d8,
    metalness: 0.25,
    roughness: 0.3
  });
  const darkBlueMat = new THREE.MeshStandardMaterial({
    color: 0x123f91,
    metalness: 0.15,
    roughness: 0.38
  });
  const blackTrimMat = new THREE.MeshStandardMaterial({
    color: 0x111416,
    metalness: 0,
    roughness: 0.55
  });
  const frameMat = new THREE.MeshStandardMaterial({
    color: 0x17191a,
    metalness: 0,
    roughness: 0.45
  });
  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0x52616b,
    transparent: true,
    opacity: 0.58,
    metalness: 0,
    roughness: 0.15
  });
  const tireMat = new THREE.MeshStandardMaterial({
    color: 0x151515,
    metalness: 0,
    roughness: 0.8
  });
  const silverMat = new THREE.MeshStandardMaterial({
    color: 0xc9cdd0,
    metalness: 0.45,
    roughness: 0.25
  });
  const cyanMat = new THREE.MeshStandardMaterial({
    color: 0x35efff,
    emissive: 0x35efff,
    metalness: 0,
    roughness: 0.25
  });
  const headlightMat = new THREE.MeshStandardMaterial({
    color: 0xeafcff,
    emissive: 0xbfefff,
    metalness: 0,
    roughness: 0.2
  });
  const amberMat = new THREE.MeshStandardMaterial({
    color: 0xff8a22,
    emissive: 0xff6a11,
    metalness: 0,
    roughness: 0.25
  });
  const redLightMat = new THREE.MeshStandardMaterial({
    color: 0xd51f2f,
    emissive: 0xa90f1d,
    metalness: 0,
    roughness: 0.25
  });
  const seatMat = new THREE.MeshStandardMaterial({
    color: 0x26323b,
    metalness: 0,
    roughness: 0.7
  });

  function addBox(name, w, h, d, mat, x, y, z) {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
    mesh.name = name;
    mesh.position.set(x, y, z);
    root.add(mesh);
    return mesh;
  }

  function addTube(name, p1, p2, radius, mat) {
    const curve = new THREE.LineCurve3(p1, p2);
    const mesh = new THREE.Mesh(
      new THREE.TubeGeometry(curve, 1, radius, 8, false),
      mat
    );
    mesh.name = name;
    root.add(mesh);
    return mesh;
  }

  const lower_body = addBox(
    "lower_body",
    width,
    0.52,
    length,
    bodyMat,
    0,
    -0.02,
    0
  );

  const lower_skirt = addBox(
    "lower_skirt",
    width * 0.96,
    0.1,
    length * 0.96,
    darkBlueMat,
    0,
    body_bottom + 0.03,
    -0.02
  );

  const upper_window_band = addBox(
    "upper_window_band",
    width * 0.98,
    0.48,
    3.82,
    bodyMat,
    0,
    0.5,
    -0.18
  );

  const roof_cap = addBox(
    "roof_cap",
    width * 0.9,
    0.13,
    4.18,
    bodyMat,
    0,
    0.81,
    -0.05
  );

  const roof_center_ridge = addBox(
    "roof_center_ridge",
    0.42,
    0.055,
    2.8,
    darkBlueMat,
    0,
    roof_height - 0.015,
    -0.12
  );

  const front_nose = addBox(
    "front_nose",
    width * 0.92,
    0.62,
    0.22,
    bodyMat,
    0,
    0.08,
    length / 2 + 0.03
  );

  const front_lower_bumper = addBox(
    "front_lower_bumper",
    width * 0.86,
    0.1,
    0.13,
    darkBlueMat,
    0,
    -0.18,
    length / 2 + 0.1
  );

  const rear_panel = addBox(
    "rear_panel",
    width * 0.94,
    0.72,
    0.14,
    bodyMat,
    0,
    0.22,
    -length / 2 - 0.02
  );

  const rear_black_strip = addBox(
    "rear_black_strip",
    width * 0.88,
    0.42,
    0.035,
    blackTrimMat,
    0,
    0.5,
    -length / 2 - 0.105
  );

  const left_side_black_window_band = addBox(
    "left_side_black_window_band",
    0.026,
    0.43,
    3.72,
    blackTrimMat,
    -width / 2 - 0.012,
    0.5,
    -0.18
  );

  const right_side_black_window_band = addBox(
    "right_side_black_window_band",
    0.026,
    0.43,
    3.72,
    blackTrimMat,
    width / 2 + 0.012,
    0.5,
    -0.18
  );

  const side_window_glass = new THREE.InstancedMesh(
    new THREE.BoxGeometry(0.014, 0.32, 0.4),
    glassMat,
    12
  );
  side_window_glass.name = "side_window_glass";
  const dummy = new THREE.Object3D();
  let instance_index = 0;
  for (const side of [-1, 1]) {
    for (let i = 0; i < 6; i++) {
      dummy.position.set(side * (width / 2 + 0.032), 0.51, -1.55 + i * 0.5);
      dummy.rotation.set(0, 0, 0);
      dummy.scale.set(1, 1, 1);
      dummy.updateMatrix();
      side_window_glass.setMatrixAt(instance_index++, dummy.matrix);
    }
  }
  root.add(side_window_glass);

  const side_window_mullions = new THREE.InstancedMesh(
    new THREE.BoxGeometry(0.035, 0.45, 0.045),
    frameMat,
    14
  );
  side_window_mullions.name = "side_window_mullions";
  instance_index = 0;
  for (const side of [-1, 1]) {
    for (let i = 0; i < 7; i++) {
      dummy.position.set(side * (width / 2 + 0.045), 0.5, -1.8 + i * 0.5);
      dummy.rotation.set(0, 0, 0);
      dummy.scale.set(1, 1, 1);
      dummy.updateMatrix();
      side_window_mullions.setMatrixAt(instance_index++, dummy.matrix);
    }
  }
  root.add(side_window_mullions);

  const interior_seat_backs = new THREE.InstancedMesh(
    new THREE.BoxGeometry(0.018, 0.2, 0.18),
    seatMat,
    12
  );
  interior_seat_backs.name = "interior_seat_backs";
  instance_index = 0;
  for (const side of [-1, 1]) {
    for (let i = 0; i < 6; i++) {
      dummy.position.set(side * (width / 2 + 0.052), 0.34, -1.45 + i * 0.52);
      dummy.rotation.set(-0.08, 0, 0);
      dummy.scale.set(1, 1, 1);
      dummy.updateMatrix();
      interior_seat_backs.setMatrixAt(instance_index++, dummy.matrix);
    }
  }
  root.add(interior_seat_backs);

  const interior_seat_cushions = new THREE.InstancedMesh(
    new THREE.BoxGeometry(0.02, 0.055, 0.19),
    seatMat,
    12
  );
  interior_seat_cushions.name = "interior_seat_cushions";
  instance_index = 0;
  for (const side of [-1, 1]) {
    for (let i = 0; i < 6; i++) {
      dummy.position.set(side * (width / 2 + 0.055), 0.235, -1.39 + i * 0.52);
      dummy.rotation.set(0, 0, 0);
      dummy.scale.set(1, 1, 1);
      dummy.updateMatrix();
      interior_seat_cushions.setMatrixAt(instance_index++, dummy.matrix);
    }
  }
  root.add(interior_seat_cushions);

  const driver_seat = new THREE.Mesh(
    new THREE.BoxGeometry(0.022, 0.24, 0.2),
    seatMat
  );
  driver_seat.name = "driver_seat";
  driver_seat.position.set(-width / 2 - 0.055, 0.34, 1.42);
  driver_seat.rotation.x = -0.12;
  root.add(driver_seat);

  const steering_wheel = new THREE.Mesh(
    new THREE.TorusGeometry(0.085, 0.012, 8, 24),
    blackTrimMat
  );
  steering_wheel.name = "steering_wheel";
  steering_wheel.position.set(-width / 2 - 0.07, 0.31, 1.68);
  steering_wheel.rotation.y = Math.PI / 2;
  steering_wheel.rotation.z = -0.25;
  root.add(steering_wheel);

  const windshield_group = new THREE.Group();
  windshield_group.name = "windshield_group";
  windshield_group.position.set(0, 0.5, length / 2 + 0.145);
  windshield_group.rotation.x = -0.18;
  root.add(windshield_group);

  const windshield_frame = new THREE.Mesh(
    new THREE.BoxGeometry(width * 0.86, 0.52, 0.035),
    frameMat
  );
  windshield_frame.name = "windshield_frame";
  windshield_group.add(windshield_frame);

  const windshield_glass = new THREE.Mesh(
    new THREE.BoxGeometry(width * 0.76, 0.42, 0.018),
    glassMat
  );
  windshield_glass.name = "windshield_glass";
  windshield_glass.position.z = 0.026;
  windshield_group.add(windshield_glass);

  const windshield_center_divider = new THREE.Mesh(
    new THREE.BoxGeometry(0.026, 0.44, 0.025),
    frameMat
  );
  windshield_center_divider.name = "windshield_center_divider";
  windshield_center_divider.position.z = 0.045;
  windshield_group.add(windshield_center_divider);

  const left_wiper = addTube(
    "left_wiper",
    new THREE.Vector3(-0.34, -0.15, length / 2 + 0.19),
    new THREE.Vector3(-0.08, -0.02, length / 2 + 0.195),
    0.012,
    blackTrimMat
  );

  const right_wiper = addTube(
    "right_wiper",
    new THREE.Vector3(0.34, -0.15, length / 2 + 0.19),
    new THREE.Vector3(0.08, -0.02, length / 2 + 0.195),
    0.012,
    blackTrimMat
  );

  const headlight_housing_left = addBox(
    "headlight_housing_left",
    0.28,
    0.11,
    0.045,
    silverMat,
    -0.31,
    0.02,
    length / 2 + 0.17
  );
  headlight_housing_left.rotation.z = -0.12;

  const headlight_housing_right = addBox(
    "headlight_housing_right",
    0.28,
    0.11,
    0.045,
    silverMat,
    0.31,
    0.02,
    length / 2 + 0.17
  );
  headlight_housing_right.rotation.z = 0.12;

  const headlight_lenses = new THREE.InstancedMesh(
    new THREE.CylinderGeometry(0.035, 0.035, 0.025, 16),
    headlightMat,
    6
  );
  headlight_lenses.name = "headlight_lenses";
  const lens_positions = [
    [-0.39, 0.025], [-0.31, 0.025], [-0.23, 0.025],
    [0.23, 0.025], [0.31, 0.025], [0.39, 0.025]
  ];
  for (let i = 0; i < lens_positions.length; i++) {
    dummy.position.set(lens_positions[i][0], lens_positions[i][1], length / 2 + 0.205);
    dummy.rotation.set(Math.PI / 2, 0, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    headlight_lenses.setMatrixAt(i, dummy.matrix);
  }
  root.add(headlight_lenses);

  const front_fog_lights = new THREE.InstancedMesh(
    new THREE.CylinderGeometry(0.04, 0.04, 0.025, 16),
    headlightMat,
    2
  );
  front_fog_lights.name = "front_fog_lights";
  for (let i = 0; i < 2; i++) {
    dummy.position.set(i === 0 ? -0.34 : 0.34, -0.12, length / 2 + 0.19);
    dummy.rotation.set(Math.PI / 2, 0, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    front_fog_lights.setMatrixAt(i, dummy.matrix);
  }
  root.add(front_fog_lights);

  const front_logo_ring = new THREE.Mesh(
    new THREE.TorusGeometry(0.055, 0.008, 8, 24),
    silverMat
  );
  front_logo_ring.name = "front_logo_ring";
  front_logo_ring.position.set(0, 0.12, length / 2 + 0.19);
  root.add(front_logo_ring);

  const front_logo_bar = addBox(
    "front_logo_bar",
    0.012,
    0.075,
    0.012,
    silverMat,
    0,
    0.12,
    length / 2 + 0.198
  );

  const left_mirror_arm = addTube(
    "left_mirror_arm",
    new THREE.Vector3(-width / 2, 0.66, 1.95),
    new THREE.Vector3(-width / 2 - 0.18, 0.58, 1.92),
    0.018,
    blackTrimMat
  );

  const right_mirror_arm = addTube(
    "right_mirror_arm",
    new THREE.Vector3(width / 2, 0.66, 1.95),
    new THREE.Vector3(width / 2 + 0.18, 0.58, 1.92),
    0.018,
    blackTrimMat
  );

  const mirror_pod_geom = new THREE.SphereGeometry(1, 20, 12);

  const left_mirror_pod = new THREE.Mesh(mirror_pod_geom, bodyMat);
  left_mirror_pod.name = "left_mirror_pod";
  left_mirror_pod.scale.set(0.075, 0.17, 0.055);
  left_mirror_pod.position.set(-width / 2 - 0.2, 0.55, 1.9);
  root.add(left_mirror_pod);

  const right_mirror_pod = new THREE.Mesh(mirror_pod_geom, bodyMat);
  right_mirror_pod.name = "right_mirror_pod";
  right_mirror_pod.scale.set(0.075, 0.17, 0.055);
  right_mirror_pod.position.set(width / 2 + 0.2, 0.55, 1.9);
  root.add(right_mirror_pod);

  const left_roof_led = addBox(
    "left_roof_led",
    0.035,
    0.025,
    4.05,
    cyanMat,
    -width / 2 - 0.035,
    0.76,
    -0.08
  );

  const right_roof_led = addBox(
    "right_roof_led",
    0.035,
    0.025,
    4.05,
    cyanMat,
    width / 2 + 0.035,
    0.76,
    -0.08
  );

  const left_belt_led = addBox(
    "left_belt_led",
    0.038,
    0.026,
    3.82,
    cyanMat,
    -width / 2 - 0.04,
    0.25,
    -0.18
  );

  const right_belt_led = addBox(
    "right_belt_led",
    0.038,
    0.026,
    3.82,
    cyanMat,
    width / 2 + 0.04,
    0.25,
    -0.18
  );

  const left_lower_led = addBox(
    "left_lower_led",
    0.038,
    0.022,
    2.75,
    cyanMat,
    -width / 2 - 0.042,
    -0.15,
    -0.35
  );

  const right_lower_led = addBox(
    "right_lower_led",
    0.038,
    0.022,
    2.75,
    cyanMat,
    width / 2 + 0.042,
    -0.15,
    -0.35
  );

  const left_front_vertical_led = addBox(
    "left_front_vertical_led",
    0.038,
    0.34,
    0.026,
    cyanMat,
    -width / 2 - 0.045,
    0.08,
    1.98
  );

  const right_front_vertical_led = addBox(
    "right_front_vertical_led",
    0.038,
    0.34,
    0.026,
    cyanMat,
    width / 2 + 0.045,
    0.08,
    1.98
  );

  const left_front_corner_led = addBox(
    "left_front_corner_led",
    0.038,
    0.026,
    0.3,
    cyanMat,
    -width / 2 - 0.045,
    0.25,
    1.82
  );

  const right_front_corner_led = addBox(
    "right_front_corner_led",
    0.038,
    0.026,
    0.3,
    cyanMat,
    width / 2 + 0.045,
    0.25,
    1.82
  );

  const left_underglow = addBox(
    "left_underglow",
    0.045,
    0.025,
    3.7,
    cyanMat,
    -width / 2 - 0.03,
    -0.285,
    -0.05
  );

  const right_underglow = addBox(
    "right_underglow",
    0.045,
    0.025,
    3.7,
    cyanMat,
    width / 2 + 0.03,
    -0.285,
    -0.05
  );

  const panel_seams = new THREE.InstancedMesh(
    new THREE.BoxGeometry(0.018, 0.46, 0.012),
    darkBlueMat,
    10
  );
  panel_seams.name = "panel_seams";
  const seam_z = [-1.7, -0.85, 0, 0.85, 1.7];
  instance_index = 0;
  for (const side of [-1, 1]) {
    for (const z of seam_z) {
      dummy.position.set(side * (width / 2 + 0.046), 0.0, z);
      dummy.rotation.set(0, 0, 0);
      dummy.scale.set(1, 1, 1);
      dummy.updateMatrix();
      panel_seams.setMatrixAt(instance_index++, dummy.matrix);
    }
  }
  root.add(panel_seams);

  const rear_vent_slats = new THREE.InstancedMesh(
    new THREE.BoxGeometry(0.025, 0.018, 0.34),
    blackTrimMat,
    12
  );
  rear_vent_slats.name = "rear_vent_slats";
  instance_index = 0;
  for (const side of [-1, 1]) {
    for (let i = 0; i < 6; i++) {
      dummy.position.set(side * (width / 2 + 0.052), -0.02 + i * 0.045, -2.05);
      dummy.rotation.set(0, 0, 0);
      dummy.scale.set(1, 1, 1);
      dummy.updateMatrix();
      rear_vent_slats.setMatrixAt(instance_index++, dummy.matrix);
    }
  }
  root.add(rear_vent_slats);

  const side_marker_lights = new THREE.InstancedMesh(
    new THREE.BoxGeometry(0.028, 0.055, 0.1),
    amberMat,
    4
  );
  side_marker_lights.name = "side_marker_lights";
  const marker_positions = [
    [-1, 0.95], [-1, -1.85], [1, 0.95], [1, -1.85]
  ];
  for (let i = 0; i < marker_positions.length; i++) {
    const side = marker_positions[i][0];
    dummy.position.set(side * (width / 2 + 0.055), 0.18, marker_positions[i][1]);
    dummy.rotation.set(0, 0, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    side_marker_lights.setMatrixAt(i, dummy.matrix);
  }
  root.add(side_marker_lights);

  const rear_red_lights = new THREE.InstancedMesh(
    new THREE.BoxGeometry(0.09, 0.22, 0.035),
    redLightMat,
    2
  );
  rear_red_lights.name = "rear_red_lights";
  for (let i = 0; i < 2; i++) {
    dummy.position.set(i === 0 ? -0.42 : 0.42, 0.12, -length / 2 - 0.13);
    dummy.rotation.set(0, 0, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    rear_red_lights.setMatrixAt(i, dummy.matrix);
  }
  root.add(rear_red_lights);

  const wheel_geom = new THREE.TorusGeometry(0.21, 0.075, 12, 32);
  const wheel_positions = [
    [-1, front_axle_z],
    [1, front_axle_z],
    [-1, rear_axle_z],
    [1, rear_axle_z]
  ];

  const wheels = new THREE.InstancedMesh(wheel_geom, tireMat, 4);
  wheels.name = "wheels";
  for (let i = 0; i < wheel_positions.length; i++) {
    const side = wheel_positions[i][0];
    dummy.position.set(side * (width / 2 + 0.035), wheel_y, wheel_positions[i][1]);
    dummy.rotation.set(0, Math.PI / 2, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    wheels.setMatrixAt(i, dummy.matrix);
  }
  root.add(wheels);

  const wheel_rims = new THREE.InstancedMesh(
    new THREE.CylinderGeometry(0.13, 0.13, 0.035, 24),
    silverMat,
    4
  );
  wheel_rims.name = "wheel_rims";
  for (let i = 0; i < wheel_positions.length; i++) {
    const side = wheel_positions[i][0];
    dummy.position.set(side * (width / 2 + 0.105), wheel_y, wheel_positions[i][1]);
    dummy.rotation.set(0, 0, Math.PI / 2);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    wheel_rims.setMatrixAt(i, dummy.matrix);
  }
  root.add(wheel_rims);

  const wheel_spokes = new THREE.InstancedMesh(
    new THREE.BoxGeometry(0.025, 0.025, 0.13),
    silverMat,
    32
  );
  wheel_spokes.name = "wheel_spokes";
  instance_index = 0;
  for (const wheel of wheel_positions) {
    const side = wheel[0];
    const wz = wheel[1];
    for (let i = 0; i < 8; i++) {
      const angle = i / 8 * Math.PI * 2;
      dummy.position.set(
        side * (width / 2 + 0.13),
        wheel_y + Math.sin(angle) * 0.075,
        wz + Math.cos(angle) * 0.075
      );
      dummy.rotation.set(-angle, 0, 0);
      dummy.scale.set(1, 1, 1);
      dummy.updateMatrix();
      wheel_spokes.setMatrixAt(instance_index++, dummy.matrix);
    }
  }
  root.add(wheel_spokes);

  const wheel_hub_caps = new THREE.InstancedMesh(
    new THREE.CylinderGeometry(0.045, 0.045, 0.045, 16),
    silverMat,
    4
  );
  wheel_hub_caps.name = "wheel_hub_caps";
  for (let i = 0; i < wheel_positions.length; i++) {
    const side = wheel_positions[i][0];
    dummy.position.set(side * (width / 2 + 0.15), wheel_y, wheel_positions[i][1]);
    dummy.rotation.set(0, 0, Math.PI / 2);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    wheel_hub_caps.setMatrixAt(i, dummy.matrix);
  }
  root.add(wheel_hub_caps);

  const wheel_arch_trim = new THREE.InstancedMesh(
    new THREE.TorusGeometry(0.29, 0.018, 8, 32, Math.PI),
    cyanMat,
    4
  );
  wheel_arch_trim.name = "wheel_arch_trim";
  for (let i = 0; i < wheel_positions.length; i++) {
    const side = wheel_positions[i][0];
    dummy.position.set(side * (width / 2 + 0.055), wheel_y, wheel_positions[i][1]);
    dummy.rotation.set(0, Math.PI / 2, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    wheel_arch_trim.setMatrixAt(i, dummy.matrix);
  }
  root.add(wheel_arch_trim);

  fitToUnitCube(root);
  return root;

  function fitToUnitCube(object) {
    object.updateMatrixWorld(true);
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
