function __sn17_user(THREE) {
  const root = new THREE.Group();
  root.name = "quadcopter_drone";

  const airframe = new THREE.Group();
  airframe.name = "airframe";
  root.add(airframe);

  const propulsion = new THREE.Group();
  propulsion.name = "propulsion";
  root.add(propulsion);

  const landing_gear = new THREE.Group();
  landing_gear.name = "landing_gear";
  root.add(landing_gear);

  const payload = new THREE.Group();
  payload.name = "payload";
  root.add(payload);

  const bodyMat = new THREE.MeshStandardMaterial({ color: "#202326", roughness: 0.8 });
  const armMat = new THREE.MeshStandardMaterial({ color: "#34383b", roughness: 0.8 });
  const propellerMat = new THREE.MeshStandardMaterial({ color: "#17191b", roughness: 0.85 });
  const rubberMat = new THREE.MeshStandardMaterial({ color: "#111314", roughness: 0.9 });
  const darkMetalMat = new THREE.MeshStandardMaterial({ color: "#3b4043", roughness: 0.65 });
  const copperMat = new THREE.MeshStandardMaterial({ color: "#b8735c", roughness: 0.55 });
  const silverMat = new THREE.MeshStandardMaterial({ color: "#d8d8d2", roughness: 0.5 });
  const lensMat = new THREE.MeshStandardMaterial({ color: "#050607", roughness: 0.25 });
  const labelMat = new THREE.MeshStandardMaterial({ color: "#6f3035", roughness: 0.7 });
  const redLedMat = new THREE.MeshStandardMaterial({ color: "#8d2024", roughness: 0.5 });
  const greenLedMat = new THREE.MeshStandardMaterial({ color: "#2f8f68", roughness: 0.5 });

  function roundedRectShape(width, height, radius) {
    const shape = new THREE.Shape();
    const hw = width / 2;
    const hh = height / 2;
    shape.moveTo(-hw + radius, -hh);
    shape.lineTo(hw - radius, -hh);
    shape.quadraticCurveTo(hw, -hh, hw, -hh + radius);
    shape.lineTo(hw, hh - radius);
    shape.quadraticCurveTo(hw, hh, hw - radius, hh);
    shape.lineTo(-hw + radius, hh);
    shape.quadraticCurveTo(-hw, hh, -hw, hh - radius);
    shape.lineTo(-hw, -hh + radius);
    shape.quadraticCurveTo(-hw, -hh, -hw + radius, -hh);
    return shape;
  }

  function makeRoundedBoxGeometry(width, height, depth, radius) {
    const shape = roundedRectShape(width, height, radius);
    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth: depth,
      steps: 1,
      curveSegments: 6,
      bevelEnabled: true,
      bevelThickness: Math.min(height * 0.12, radius * 0.25),
      bevelSize: Math.min(depth * 0.08, radius * 0.25),
      bevelSegments: 2
    });
    geometry.translate(0, 0, -depth / 2);
    return geometry;
  }

  function makeArmGeometry(length, width, height) {
    const shape = new THREE.Shape();
    shape.moveTo(-length / 2, -width * 0.42);
    shape.lineTo(length / 2, -width * 0.58);
    shape.lineTo(length / 2, width * 0.58);
    shape.lineTo(-length / 2, width * 0.42);
    shape.closePath();

    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth: height,
      steps: 1,
      bevelEnabled: true,
      bevelThickness: height * 0.1,
      bevelSize: height * 0.12,
      bevelSegments: 2
    });
    geometry.translate(0, 0, -height / 2);
    return geometry;
  }

  function makePropellerBladeGeometry() {
    const shape = new THREE.Shape();
    shape.moveTo(0.055, -0.026);
    shape.bezierCurveTo(0.14, -0.035, 0.27, -0.105, 0.39, -0.088);
    shape.bezierCurveTo(0.43, -0.082, 0.445, -0.055, 0.425, -0.035);
    shape.bezierCurveTo(0.31, 0.025, 0.17, 0.075, 0.065, 0.048);
    shape.quadraticCurveTo(0.045, 0.025, 0.055, -0.026);
    return new THREE.ExtrudeGeometry(shape, {
      depth: 0.018,
      steps: 1,
      curveSegments: 8,
      bevelEnabled: true,
      bevelThickness: 0.004,
      bevelSize: 0.004,
      bevelSegments: 1
    });
  }

  function makePropellerHubGeometry() {
    const profile = [
      new THREE.Vector2(0.0, -0.035),
      new THREE.Vector2(0.052, -0.035),
      new THREE.Vector2(0.064, -0.018),
      new THREE.Vector2(0.058, 0.006),
      new THREE.Vector2(0.038, 0.024),
      new THREE.Vector2(0.028, 0.043),
      new THREE.Vector2(0.0, 0.043)
    ];
    return new THREE.LatheGeometry(profile, 24);
  }

  function setInstance(mesh, index, x, y, z, rx, ry, rz) {
    const dummy = new THREE.Object3D();
    dummy.position.set(x, y, z);
    dummy.rotation.set(rx, ry, rz);
    dummy.updateMatrix();
    mesh.setMatrixAt(index, dummy.matrix);
  }

  const motorX = 0.58;
  const motorZ = 0.47;
  const motorPositions = [
    [-motorX, motorZ],
    [motorX, motorZ],
    [-motorX, -motorZ],
    [motorX, -motorZ]
  ];

  const central_bodyGeom = makeRoundedBoxGeometry(0.58, 0.22, 0.46, 0.075);
  const central_body = new THREE.Mesh(central_bodyGeom, bodyMat);
  central_body.name = "central_body";
  central_body.position.y = 0.18;
  airframe.add(central_body);

  const upper_shellGeom = makeRoundedBoxGeometry(0.54, 0.075, 0.42, 0.06);
  const upper_shell = new THREE.Mesh(upper_shellGeom, armMat);
  upper_shell.name = "upper_shell";
  upper_shell.position.y = 0.315;
  airframe.add(upper_shell);

  const lower_bodyGeom = makeRoundedBoxGeometry(0.50, 0.13, 0.39, 0.045);
  const lower_body = new THREE.Mesh(lower_bodyGeom, bodyMat);
  lower_body.name = "lower_body";
  lower_body.position.y = 0.075;
  airframe.add(lower_body);

  const armLength = 0.68;
  const armGeom = makeArmGeometry(armLength, 0.15, 0.075);
  const arms = new THREE.InstancedMesh(armGeom, armMat, 4);
  arms.name = "arms";
  for (let i = 0; i < motorPositions.length; i++) {
    const x = motorPositions[i][0];
    const z = motorPositions[i][1];
    const angle = Math.atan2(z, x);
    setInstance(arms, i, x * 0.5, 0.235, z * 0.5, -Math.PI / 2, -angle, 0);
  }
  arms.instanceMatrix.needsUpdate = true;
  airframe.add(arms);

  const arm_root_fairingsGeom = makeRoundedBoxGeometry(0.15, 0.105, 0.22, 0.035);
  const arm_root_fairings = new THREE.InstancedMesh(arm_root_fairingsGeom, bodyMat, 4);
  arm_root_fairings.name = "arm_root_fairings";
  for (let i = 0; i < motorPositions.length; i++) {
    const x = motorPositions[i][0];
    const z = motorPositions[i][1];
    const angle = Math.atan2(z, x);
    setInstance(arm_root_fairings, i, x * 0.31, 0.205, z * 0.31, 0, -angle, 0);
  }
  arm_root_fairings.instanceMatrix.needsUpdate = true;
  airframe.add(arm_root_fairings);

  const arm_side_railsGeom = new THREE.BoxGeometry(0.48, 0.018, 0.018);
  const arm_side_rails = new THREE.InstancedMesh(arm_side_railsGeom, bodyMat, 8);
  arm_side_rails.name = "arm_side_rails";
  let railIndex = 0;
  for (let i = 0; i < motorPositions.length; i++) {
    const x = motorPositions[i][0];
    const z = motorPositions[i][1];
    const angle = Math.atan2(z, x);
    const tangentX = -Math.sin(angle);
    const tangentZ = Math.cos(angle);
    for (const side of [-1, 1]) {
      setInstance(
        arm_side_rails,
        railIndex++,
        x * 0.54 + tangentX * side * 0.052,
        0.284,
        z * 0.54 + tangentZ * side * 0.052,
        0,
        -angle,
        0
      );
    }
  }
  arm_side_rails.instanceMatrix.needsUpdate = true;
  airframe.add(arm_side_rails);

  const motor_lower_bodiesGeom = new THREE.CylinderGeometry(0.078, 0.082, 0.13, 24);
  const motor_lower_bodies = new THREE.InstancedMesh(motor_lower_bodiesGeom, bodyMat, 4);
  motor_lower_bodies.name = "motor_lower_bodies";

  const motor_upper_housingsGeom = new THREE.CylinderGeometry(0.088, 0.084, 0.12, 24);
  const motor_upper_housings = new THREE.InstancedMesh(motor_upper_housingsGeom, bodyMat, 4);
  motor_upper_housings.name = "motor_upper_housings";

  const motor_top_capsGeom = new THREE.CylinderGeometry(0.066, 0.075, 0.035, 24);
  const motor_top_caps = new THREE.InstancedMesh(motor_top_capsGeom, armMat, 4);
  motor_top_caps.name = "motor_top_caps";

  const motor_shaftsGeom = new THREE.CylinderGeometry(0.025, 0.025, 0.075, 16);
  const motor_shafts = new THREE.InstancedMesh(motor_shaftsGeom, darkMetalMat, 4);
  motor_shafts.name = "motor_shafts";

  const motor_lower_collarsGeom = new THREE.TorusGeometry(0.074, 0.012, 8, 24);
  const motor_lower_collars = new THREE.InstancedMesh(motor_lower_collarsGeom, copperMat, 4);
  motor_lower_collars.name = "motor_lower_collars";

  const motor_top_collarsGeom = new THREE.TorusGeometry(0.073, 0.011, 8, 24);
  const motor_top_collars = new THREE.InstancedMesh(motor_top_collarsGeom, darkMetalMat, 4);
  motor_top_collars.name = "motor_top_collars";

  for (let i = 0; i < motorPositions.length; i++) {
    const x = motorPositions[i][0];
    const z = motorPositions[i][1];
    setInstance(motor_lower_bodies, i, x, 0.165, z, 0, 0, 0);
    setInstance(motor_upper_housings, i, x, 0.275, z, 0, 0, 0);
    setInstance(motor_top_caps, i, x, 0.345, z, 0, 0, 0);
    setInstance(motor_shafts, i, x, 0.395, z, 0, 0, 0);
    setInstance(motor_lower_collars, i, x, 0.105, z, Math.PI / 2, 0, 0);
    setInstance(motor_top_collars, i, x, 0.326, z, Math.PI / 2, 0, 0);
  }
  motor_lower_bodies.instanceMatrix.needsUpdate = true;
  motor_upper_housings.instanceMatrix.needsUpdate = true;
  motor_top_caps.instanceMatrix.needsUpdate = true;
  motor_shafts.instanceMatrix.needsUpdate = true;
  motor_lower_collars.instanceMatrix.needsUpdate = true;
  motor_top_collars.instanceMatrix.needsUpdate = true;
  propulsion.add(
    motor_lower_bodies,
    motor_upper_housings,
    motor_top_caps,
    motor_shafts,
    motor_lower_collars,
    motor_top_collars
  );

  const propeller_bladesGeom = makePropellerBladeGeometry();
  const propeller_blades = new THREE.InstancedMesh(propeller_bladesGeom, propellerMat, 8);
  propeller_blades.name = "propeller_blades";

  const propeller_hubsGeom = makePropellerHubGeometry();
  const propeller_hubs = new THREE.InstancedMesh(propeller_hubsGeom, propellerMat, 4);
  propeller_hubs.name = "propeller_hubs";

  let bladeIndex = 0;
  for (let i = 0; i < motorPositions.length; i++) {
    const x = motorPositions[i][0];
    const z = motorPositions[i][1];
    const phase = i % 2 === 0 ? 0.18 : 0.82;
    setInstance(propeller_blades, bladeIndex++, x, 0.43, z, -Math.PI / 2, phase, 0);
    setInstance(propeller_blades, bladeIndex++, x, 0.43, z, -Math.PI / 2, phase + Math.PI, 0);
    setInstance(propeller_hubs, i, x, 0.43, z, 0, 0, 0);
  }
  propeller_blades.instanceMatrix.needsUpdate = true;
  propeller_hubs.instanceMatrix.needsUpdate = true;
  propulsion.add(propeller_blades, propeller_hubs);

  const top_screw_headsGeom = new THREE.CylinderGeometry(0.025, 0.025, 0.009, 16);
  const top_screw_heads = new THREE.InstancedMesh(top_screw_headsGeom, rubberMat, 4);
  top_screw_heads.name = "top_screw_heads";
  const screwPositions = [
    [-0.18, 0.12],
    [0.18, 0.12],
    [-0.18, -0.12],
    [0.18, -0.12]
  ];
  for (let i = 0; i < screwPositions.length; i++) {
    setInstance(top_screw_heads, i, screwPositions[i][0], 0.365, screwPositions[i][1], 0, 0, 0);
  }
  top_screw_heads.instanceMatrix.needsUpdate = true;
  airframe.add(top_screw_heads);

  const top_screw_slotsGeom = new THREE.BoxGeometry(0.034, 0.004, 0.006);
  const top_screw_slots = new THREE.InstancedMesh(top_screw_slotsGeom, darkMetalMat, 4);
  top_screw_slots.name = "top_screw_slots";
  for (let i = 0; i < screwPositions.length; i++) {
    setInstance(
      top_screw_slots,
      i,
      screwPositions[i][0],
      0.371,
      screwPositions[i][1],
      0,
      i % 2 === 0 ? 0.35 : -0.35,
      0
    );
  }
  top_screw_slots.instanceMatrix.needsUpdate = true;
  airframe.add(top_screw_slots);

  const top_ventsGeom = new THREE.CylinderGeometry(0.012, 0.012, 0.006, 12);
  const top_vents = new THREE.InstancedMesh(top_ventsGeom, rubberMat, 3);
  top_vents.name = "top_vents";
  setInstance(top_vents, 0, -0.095, 0.367, 0.015, 0, 0, 0);
  setInstance(top_vents, 1, 0.0, 0.367, 0.035, 0, 0, 0);
  setInstance(top_vents, 2, 0.095, 0.367, 0.015, 0, 0, 0);
  top_vents.instanceMatrix.needsUpdate = true;
  airframe.add(top_vents);

  const warning_labelGeom = new THREE.BoxGeometry(0.13, 0.006, 0.055);
  const warning_label = new THREE.Mesh(warning_labelGeom, labelMat);
  warning_label.name = "warning_label";
  warning_label.position.set(0, 0.369, 0);
  airframe.add(warning_label);

  const warning_label_barsGeom = new THREE.BoxGeometry(0.018, 0.004, 0.006);
  const warning_label_bars = new THREE.InstancedMesh(warning_label_barsGeom, bodyMat, 5);
  warning_label_bars.name = "warning_label_bars";
  for (let i = 0; i < 5; i++) {
    setInstance(warning_label_bars, i, -0.04 + i * 0.02, 0.374, 0, 0, 0, 0);
  }
  warning_label_bars.instanceMatrix.needsUpdate = true;
  airframe.add(warning_label_bars);

  const status_led_leftGeom = new THREE.SphereGeometry(0.012, 12, 8);
  const status_led_left = new THREE.Mesh(status_led_leftGeom, greenLedMat);
  status_led_left.name = "status_led_left";
  status_led_left.position.set(-0.245, 0.365, 0.03);
  airframe.add(status_led_left);

  const status_led_rightGeom = new THREE.SphereGeometry(0.012, 12, 8);
  const status_led_right = new THREE.Mesh(status_led_rightGeom, redLedMat);
  status_led_right.name = "status_led_right";
  status_led_right.position.set(0.245, 0.365, 0.03);
  airframe.add(status_led_right);

  const legStartRadius = 0.23;
  const legEndRadius = 0.34;
  const legStartY = 0.08;
  const legEndY = -0.39;
  const legPoints = [];
  for (let i = 0; i < motorPositions.length; i++) {
    const x = motorPositions[i][0];
    const z = motorPositions[i][1];
    const angle = Math.atan2(z, x);
    const dx = Math.cos(angle);
    const dz = Math.sin(angle);
    legPoints.push(
      new THREE.Vector3(dx * legStartRadius, legStartY, dz * legStartRadius),
      new THREE.Vector3(dx * legEndRadius, legEndY, dz * legEndRadius)
    );
  }

  const landing_legsGeom = new THREE.BufferGeometry().setFromPoints(legPoints);
  const landing_legsMat = new THREE.LineBasicMaterial({ color: "#17191b" });
  const landing_legs = new THREE.LineSegments(landing_legsGeom, landing_legsMat);
  landing_legs.name = "landing_legs";
  landing_gear.add(landing_legs);

  const landing_feetGeom = new THREE.SphereGeometry(0.045, 16, 10);
  const landing_feet = new THREE.InstancedMesh(landing_feetGeom, rubberMat, 4);
  landing_feet.name = "landing_feet";
  for (let i = 0; i < motorPositions.length; i++) {
    const x = motorPositions[i][0];
    const z = motorPositions[i][1];
    const angle = Math.atan2(z, x);
    setInstance(
      landing_feet,
      i,
      Math.cos(angle) * legEndRadius,
      -0.405,
      Math.sin(angle) * legEndRadius,
      0,
      0,
      0
    );
  }
  landing_feet.instanceMatrix.needsUpdate = true;
  landing_gear.add(landing_feet);

  const camera_mountGeom = makeRoundedBoxGeometry(0.28, 0.13, 0.16, 0.025);
  const camera_mount = new THREE.Mesh(camera_mountGeom, bodyMat);
  camera_mount.name = "camera_mount";
  camera_mount.position.set(0, 0.045, 0.25);
  payload.add(camera_mount);

  const gimbal_pivotGeom = new THREE.CylinderGeometry(0.035, 0.035, 0.30, 16);
  const gimbal_pivot = new THREE.Mesh(gimbal_pivotGeom, darkMetalMat);
  gimbal_pivot.name = "gimbal_pivot";
  gimbal_pivot.rotation.z = Math.PI / 2;
  gimbal_pivot.position.set(0, -0.005, 0.31);
  payload.add(gimbal_pivot);

  const camera_housingGeom = makeRoundedBoxGeometry(0.27, 0.17, 0.18, 0.025);
  const camera_housing = new THREE.Mesh(camera_housingGeom, bodyMat);
  camera_housing.name = "camera_housing";
  camera_housing.position.set(0, -0.055, 0.38);
  payload.add(camera_housing);

  const camera_lens_barrelGeom = new THREE.CylinderGeometry(0.075, 0.075, 0.075, 24);
  const camera_lens_barrel = new THREE.Mesh(camera_lens_barrelGeom, darkMetalMat);
  camera_lens_barrel.name = "camera_lens_barrel";
  camera_lens_barrel.rotation.x = Math.PI / 2;
  camera_lens_barrel.position.set(0, -0.055, 0.49);
  payload.add(camera_lens_barrel);

  const camera_lens_ringGeom = new THREE.TorusGeometry(0.055, 0.012, 10, 28);
  const camera_lens_ring = new THREE.Mesh(camera_lens_ringGeom, darkMetalMat);
  camera_lens_ring.name = "camera_lens_ring";
  camera_lens_ring.position.set(0, -0.055, 0.53);
  payload.add(camera_lens_ring);

  const camera_lens_glassGeom = new THREE.CircleGeometry(0.043, 28);
  const camera_lens_glass = new THREE.Mesh(camera_lens_glassGeom, lensMat);
  camera_lens_glass.name = "camera_lens_glass";
  camera_lens_glass.position.set(0, -0.055, 0.532);
  payload.add(camera_lens_glass);

  const camera_sensorGeom = new THREE.BoxGeometry(0.055, 0.035, 0.012);
  const camera_sensor = new THREE.Mesh(camera_sensorGeom, silverMat);
  camera_sensor.name = "camera_sensor";
  camera_sensor.position.set(0, 0.015, 0.482);
  payload.add(camera_sensor);

  const camera_sensor_windowGeom = new THREE.BoxGeometry(0.032, 0.018, 0.006);
  const camera_sensor_window = new THREE.Mesh(camera_sensor_windowGeom, lensMat);
  camera_sensor_window.name = "camera_sensor_window";
  camera_sensor_window.position.set(0, 0.015, 0.49);
  payload.add(camera_sensor_window);

  const underside_portsGeom = new THREE.CylinderGeometry(0.018, 0.018, 0.012, 14);
  const underside_ports = new THREE.InstancedMesh(underside_portsGeom, copperMat, 2);
  underside_ports.name = "underside_ports";
  setInstance(underside_ports, 0, -0.16, 0.018, 0.17, 0, 0, 0);
  setInstance(underside_ports, 1, -0.11, 0.018, 0.205, 0, 0, 0);
  underside_ports.instanceMatrix.needsUpdate = true;
  payload.add(underside_ports);

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
    const scale = 0.95 / maxDim;
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
