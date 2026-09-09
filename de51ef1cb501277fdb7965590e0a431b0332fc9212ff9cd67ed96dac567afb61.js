function __sn17_user(THREE) {
  const root = new THREE.Group();

  const bodyMat = new THREE.MeshStandardMaterial({ color: 0xb51f24, metalness: 0.25, roughness: 0.3 });
  const darkRedMat = new THREE.MeshStandardMaterial({ color: 0x7d1118, metalness: 0.15, roughness: 0.45 });
  const chromeMat = new THREE.MeshStandardMaterial({ color: 0xd8d8d8, metalness: 0.55, roughness: 0.18 });
  const blackMat = new THREE.MeshStandardMaterial({ color: 0x111111, metalness: 0.0, roughness: 0.8 });
  const tireMat = new THREE.MeshStandardMaterial({ color: 0x080808, metalness: 0.0, roughness: 0.9 });
  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0x7f9fa8,
    metalness: 0.0,
    roughness: 0.15,
    transparent: true,
    opacity: 0.55,
    side: THREE.DoubleSide
  });
  const headlightMat = new THREE.MeshStandardMaterial({ color: 0xf4f7ef, metalness: 0.0, roughness: 0.15 });
  const amberMat = new THREE.MeshStandardMaterial({ color: 0xe58a16, metalness: 0.0, roughness: 0.3 });
  const plateMat = new THREE.MeshStandardMaterial({ color: 0xe8e8e8, metalness: 0.0, roughness: 0.5 });
  const leatherMat = new THREE.MeshStandardMaterial({ color: 0x222222, metalness: 0.0, roughness: 0.75 });

  const width = 1.72;
  const wheelR = 0.43;
  const wheelY = 0.43;
  const frontAxleZ = 1.34;
  const rearAxleZ = -1.34;

  function addBox(w, h, d, mat, x, y, z) {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
    mesh.position.set(x, y, z);
    root.add(mesh);
    return mesh;
  }

  function addTube(p1, p2, radius, mat) {
    const tube = new THREE.Mesh(
      new THREE.TubeGeometry(new THREE.LineCurve3(p1, p2), 1, radius, 8, false),
      mat
    );
    root.add(tube);
    return tube;
  }

  const lower_body = addBox(width, 0.42, 3.72, bodyMat, 0, 0.55, 0);
  const upper_body = addBox(1.58, 0.34, 3.42, bodyMat, 0, 0.82, -0.05);
  const hood = addBox(1.55, 0.13, 1.28, bodyMat, 0, 0.91, 1.18);
  hood.rotation.x = 0.035;
  const trunk_lid = addBox(1.52, 0.13, 0.82, bodyMat, 0, 0.90, -1.48);
  trunk_lid.rotation.x = -0.025;

  const nose_roundover = addBox(1.62, 0.30, 0.16, bodyMat, 0, 0.68, 1.88);
  const tail_roundover = addBox(1.58, 0.28, 0.14, bodyMat, 0, 0.66, -1.88);

  const roof = addBox(1.42, 0.16, 1.72, bodyMat, 0, 1.43, -0.28);
  const left_a_pillar = addTube(
    new THREE.Vector3(-0.73, 0.92, 0.62),
    new THREE.Vector3(-0.66, 1.42, 0.42),
    0.045,
    bodyMat
  );
  const right_a_pillar = addTube(
    new THREE.Vector3(0.73, 0.92, 0.62),
    new THREE.Vector3(0.66, 1.42, 0.42),
    0.045,
    bodyMat
  );
  const left_c_pillar = addTube(
    new THREE.Vector3(-0.73, 0.92, -1.20),
    new THREE.Vector3(-0.66, 1.42, -1.02),
    0.055,
    bodyMat
  );
  const right_c_pillar = addTube(
    new THREE.Vector3(0.73, 0.92, -1.20),
    new THREE.Vector3(0.66, 1.42, -1.02),
    0.055,
    bodyMat
  );
  const left_roof_rail = addTube(
    new THREE.Vector3(-0.67, 1.43, 0.42),
    new THREE.Vector3(-0.67, 1.43, -1.02),
    0.055,
    bodyMat
  );
  const right_roof_rail = addTube(
    new THREE.Vector3(0.67, 1.43, 0.42),
    new THREE.Vector3(0.67, 1.43, -1.02),
    0.055,
    bodyMat
  );

  const windshield = addBox(1.30, 0.56, 0.025, glassMat, 0, 1.18, 0.53);
  windshield.rotation.x = -0.34;
  const rear_window = addBox(1.22, 0.48, 0.025, glassMat, 0, 1.18, -1.10);
  rear_window.rotation.x = 0.28;

  const front_left_window = addBox(0.025, 0.48, 0.62, glassMat, -0.775, 1.18, 0.02);
  const front_right_window = addBox(0.025, 0.48, 0.62, glassMat, 0.775, 1.18, 0.02);
  const rear_left_window = addBox(0.025, 0.46, 0.55, glassMat, -0.775, 1.17, -0.66);
  const rear_right_window = addBox(0.025, 0.46, 0.55, glassMat, 0.775, 1.17, -0.66);

  const b_pillar_left = addBox(0.045, 0.54, 0.075, bodyMat, -0.79, 1.17, -0.31);
  const b_pillar_right = addBox(0.045, 0.54, 0.075, bodyMat, 0.79, 1.17, -0.31);

  const left_window_chrome_top = addBox(0.035, 0.025, 1.38, chromeMat, -0.805, 1.43, -0.29);
  const right_window_chrome_top = addBox(0.035, 0.025, 1.38, chromeMat, 0.805, 1.43, -0.29);
  const left_window_chrome_bottom = addBox(0.035, 0.025, 1.38, chromeMat, -0.805, 0.94, -0.29);
  const right_window_chrome_bottom = addBox(0.035, 0.025, 1.38, chromeMat, 0.805, 0.94, -0.29);
  const left_windshield_chrome = addBox(1.36, 0.035, 0.035, chromeMat, 0, 1.43, 0.43);
  left_windshield_chrome.rotation.x = -0.34;
  const right_windshield_chrome_side = addBox(0.035, 0.55, 0.035, chromeMat, 0.72, 1.18, 0.53);
  right_windshield_chrome_side.rotation.x = -0.34;

  const grille = addBox(1.18, 0.34, 0.045, blackMat, 0, 0.68, 1.985);
  const grille_top_frame = addBox(1.24, 0.035, 0.055, chromeMat, 0, 0.865, 2.01);
  const grille_bottom_frame = addBox(1.24, 0.035, 0.055, chromeMat, 0, 0.495, 2.01);
  const grille_left_frame = addBox(0.035, 0.37, 0.055, chromeMat, -0.62, 0.68, 2.01);
  const grille_right_frame = addBox(0.035, 0.37, 0.055, chromeMat, 0.62, 0.68, 2.01);

  const vertical_grille_slats = new THREE.InstancedMesh(new THREE.BoxGeometry(0.012, 0.29, 0.025), chromeMat);
  for (let i = 0; i < 18; i++) {
    const x = -0.52 + i * (1.04 / 17);
    vertical_grille_slats.setMatrixAt(i, new THREE.Matrix4().makeTranslation(x, 0.68, 2.025));
  }
  root.add(vertical_grille_slats);

  const horizontal_grille_slats = new THREE.InstancedMesh(new THREE.BoxGeometry(1.08, 0.012, 0.028), chromeMat);
  for (let i = 0; i < 6; i++) {
    horizontal_grille_slats.setMatrixAt(i, new THREE.Matrix4().makeTranslation(0, 0.55 + i * 0.055, 2.03));
  }
  root.add(horizontal_grille_slats);

  const headlight_rim_geo = new THREE.CylinderGeometry(0.145, 0.145, 0.045, 32);
  const headlight_lens_geo = new THREE.CylinderGeometry(0.115, 0.115, 0.052, 32);
  for (const sx of [-1, 1]) {
    for (const ox of [-0.13, 0.13]) {
      const headlight_rim = new THREE.Mesh(headlight_rim_geo, chromeMat);
      headlight_rim.rotation.x = Math.PI / 2;
      headlight_rim.position.set(sx * 0.55 + ox, 0.68, 2.035);
      root.add(headlight_rim);

      const headlight_lens = new THREE.Mesh(headlight_lens_geo, headlightMat);
      headlight_lens.rotation.x = Math.PI / 2;
      headlight_lens.position.set(sx * 0.55 + ox, 0.68, 2.065);
      root.add(headlight_lens);
    }
  }

  const left_turn_signal = addBox(0.12, 0.22, 0.055, amberMat, -0.75, 0.66, 2.02);
  const right_turn_signal = addBox(0.12, 0.22, 0.055, amberMat, 0.75, 0.66, 2.02);

  const emblem_center = addBox(0.055, 0.22, 0.04, chromeMat, 0, 0.68, 2.06);
  const emblem_left_diagonal = addBox(0.035, 0.26, 0.04, chromeMat, -0.055, 0.68, 2.065);
  emblem_left_diagonal.rotation.z = -0.55;
  const emblem_right_diagonal = addBox(0.035, 0.26, 0.04, chromeMat, 0.055, 0.68, 2.065);
  emblem_right_diagonal.rotation.z = 0.55;

  const front_bumper = addBox(1.72, 0.12, 0.16, chromeMat, 0, 0.34, 2.08);
  const front_bumper_black_strip = addBox(1.52, 0.045, 0.175, blackMat, 0, 0.39, 2.105);
  const left_bumper_guard = addBox(0.10, 0.28, 0.13, blackMat, -0.55, 0.37, 2.13);
  const right_bumper_guard = addBox(0.10, 0.28, 0.13, blackMat, 0.55, 0.37, 2.13);
  const license_plate = addBox(0.48, 0.20, 0.035, plateMat, 0, 0.28, 2.17);

  const rear_bumper = addBox(1.62, 0.11, 0.14, chromeMat, 0, 0.34, -2.00);
  const rear_bumper_black_strip = addBox(1.42, 0.04, 0.15, blackMat, 0, 0.39, -2.02);
  const left_tail_light = addBox(0.16, 0.22, 0.055, blackMat, -0.67, 0.65, -1.97);
  const right_tail_light = addBox(0.16, 0.22, 0.055, blackMat, 0.67, 0.65, -1.97);

  const left_side_trim = addBox(0.035, 0.035, 3.30, chromeMat, -0.885, 0.78, -0.05);
  const right_side_trim = addBox(0.035, 0.035, 3.30, chromeMat, 0.885, 0.78, -0.05);
  const left_rocker_trim = addBox(0.035, 0.035, 2.85, chromeMat, -0.885, 0.36, -0.12);
  const right_rocker_trim = addBox(0.035, 0.035, 2.85, chromeMat, 0.885, 0.36, -0.12);

  const left_front_door_seam = addBox(0.025, 0.55, 0.018, darkRedMat, -0.89, 0.67, 0.48);
  const right_front_door_seam = addBox(0.025, 0.55, 0.018, darkRedMat, 0.89, 0.67, 0.48);
  const left_rear_door_seam = addBox(0.025, 0.55, 0.018, darkRedMat, -0.89, 0.67, -0.35);
  const right_rear_door_seam = addBox(0.025, 0.55, 0.018, darkRedMat, 0.89, 0.67, -0.35);
  const left_quarter_seam = addBox(0.025, 0.52, 0.018, darkRedMat, -0.89, 0.67, -1.18);
  const right_quarter_seam = addBox(0.025, 0.52, 0.018, darkRedMat, 0.89, 0.67, -1.18);

  const left_front_handle = addBox(0.045, 0.045, 0.22, chromeMat, -0.91, 0.91, 0.18);
  const right_front_handle = addBox(0.045, 0.045, 0.22, chromeMat, 0.91, 0.91, 0.18);
  const left_rear_handle = addBox(0.045, 0.045, 0.22, chromeMat, -0.91, 0.91, -0.68);
  const right_rear_handle = addBox(0.045, 0.045, 0.22, chromeMat, 0.91, 0.91, -0.68);

  const left_mirror_stem = addTube(
    new THREE.Vector3(-0.78, 1.00, 0.50),
    new THREE.Vector3(-0.94, 1.08, 0.55),
    0.025,
    chromeMat
  );
  const right_mirror_stem = addTube(
    new THREE.Vector3(0.78, 1.00, 0.50),
    new THREE.Vector3(0.94, 1.08, 0.55),
    0.025,
    chromeMat
  );
  const left_side_mirror = addBox(0.10, 0.16, 0.22, chromeMat, -0.98, 1.10, 0.56);
  const right_side_mirror = addBox(0.10, 0.16, 0.22, chromeMat, 0.98, 1.10, 0.56);
  const left_mirror_glass = addBox(0.015, 0.12, 0.17, glassMat, -1.035, 1.10, 0.56);
  const right_mirror_glass = addBox(0.015, 0.12, 0.17, glassMat, 1.035, 1.10, 0.56);

  const left_wiper = addTube(
    new THREE.Vector3(-0.48, 0.96, 0.64),
    new THREE.Vector3(-0.05, 1.08, 0.58),
    0.012,
    blackMat
  );
  const right_wiper = addTube(
    new THREE.Vector3(0.48, 0.96, 0.64),
    new THREE.Vector3(0.05, 1.08, 0.58),
    0.012,
    blackMat
  );

  const hood_center_ridge = addBox(0.025, 0.025, 1.05, darkRedMat, 0, 0.99, 1.20);
  const left_hood_crease = addBox(0.018, 0.018, 0.92, darkRedMat, -0.38, 0.985, 1.22);
  const right_hood_crease = addBox(0.018, 0.018, 0.92, darkRedMat, 0.38, 0.985, 1.22);
  const hood_ornament_base = addBox(0.08, 0.025, 0.08, chromeMat, 0, 1.00, 1.62);
  const hood_ornament = new THREE.Mesh(new THREE.ConeGeometry(0.035, 0.10, 12), chromeMat);
  hood_ornament.position.set(0, 1.06, 1.62);
  root.add(hood_ornament);

  const tire_geom = new THREE.TorusGeometry(0.30, 0.13, 16, 40);
  const rim_geom = new THREE.CylinderGeometry(0.225, 0.225, 0.10, 32);
  const hub_geom = new THREE.CylinderGeometry(0.075, 0.075, 0.125, 24);
  const wheel_positions = [
    [-0.91, wheelY, frontAxleZ],
    [0.91, wheelY, frontAxleZ],
    [-0.91, wheelY, rearAxleZ],
    [0.91, wheelY, rearAxleZ]
  ];

  for (const wp of wheel_positions) {
    const tire = new THREE.Mesh(tire_geom, tireMat);
    tire.rotation.y = Math.PI / 2;
    tire.position.set(wp[0], wp[1], wp[2]);
    root.add(tire);

    const rim = new THREE.Mesh(rim_geom, chromeMat);
    rim.rotation.z = Math.PI / 2;
    rim.position.set(wp[0] < 0 ? -0.965 : 0.965, wp[1], wp[2]);
    root.add(rim);

    const hub = new THREE.Mesh(hub_geom, chromeMat);
    hub.rotation.z = Math.PI / 2;
    hub.position.set(wp[0] < 0 ? -0.985 : 0.985, wp[1], wp[2]);
    root.add(hub);
  }

  const tread_geom = new THREE.BoxGeometry(0.22, 0.035, 0.075);
  const tire_treads = new THREE.InstancedMesh(tread_geom, tireMat, 72);
  let treadIndex = 0;
  for (const wp of wheel_positions) {
    for (let i = 0; i < 18; i++) {
      const a = i / 18 * Math.PI * 2;
      const y = wp[1] + Math.cos(a) * 0.405;
      const z = wp[2] + Math.sin(a) * 0.405;
      const quat = new THREE.Quaternion().setFromEuler(new THREE.Euler(a, 0, 0));
      const matrix = new THREE.Matrix4();
      matrix.compose(new THREE.Vector3(wp[0], y, z), quat, new THREE.Vector3(1, 1, 1));
      tire_treads.setMatrixAt(treadIndex++, matrix);
    }
  }
  root.add(tire_treads);

  const vent_geom = new THREE.BoxGeometry(0.018, 0.012, 0.34);
  const side_vents = new THREE.InstancedMesh(vent_geom, blackMat, 24);
  let ventIndex = 0;
  for (const side of [-1, 1]) {
    for (let row = 0; row < 2; row++) {
      for (let i = 0; i < 6; i++) {
        const z = 0.70 + i * 0.055;
        const y = 0.965 - row * 0.025;
        side_vents.setMatrixAt(ventIndex++, new THREE.Matrix4().makeTranslation(side * 0.89, y, z));
      }
    }
  }
  root.add(side_vents);

  const dashboard = addBox(1.30, 0.12, 0.22, leatherMat, 0, 0.98, 0.48);
  const driver_seat_back = addBox(0.42, 0.48, 0.16, leatherMat, -0.34, 1.08, -0.10);
  const passenger_seat_back = addBox(0.42, 0.48, 0.16, leatherMat, 0.34, 1.08, -0.10);
  const driver_headrest = addBox(0.26, 0.18, 0.13, leatherMat, -0.34, 1.38, -0.12);
  const passenger_headrest = addBox(0.26, 0.18, 0.13, leatherMat, 0.34, 1.38, -0.12);
  const steering_wheel = new THREE.Mesh(new THREE.TorusGeometry(0.16, 0.025, 12, 32), leatherMat);
  steering_wheel.position.set(-0.38, 1.08, 0.38);
  steering_wheel.rotation.x = -0.25;
  root.add(steering_wheel);
  const steering_column = addTube(
    new THREE.Vector3(-0.38, 1.06, 0.36),
    new THREE.Vector3(-0.38, 0.96, 0.50),
    0.025,
    blackMat
  );

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
  const maxDim = Math.max(size.x, size.y, size.z) || 1;
  const scale = 0.98 / maxDim;
  root.scale.setScalar(scale);
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
