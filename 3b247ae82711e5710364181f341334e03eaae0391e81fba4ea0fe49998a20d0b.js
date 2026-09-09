function __sn17_user(THREE) {
  const root = new THREE.Group();

  const bodyMat = new THREE.MeshStandardMaterial({ color: 0x18a85b, metalness: 0.15, roughness: 0.3 });
  const yellowMat = new THREE.MeshStandardMaterial({ color: 0xffdf00, metalness: 0.1, roughness: 0.3 });
  const blackMat = new THREE.MeshStandardMaterial({ color: 0x111111, metalness: 0.1, roughness: 0.55 });
  const tireMat = new THREE.MeshStandardMaterial({ color: 0x050505, metalness: 0.0, roughness: 0.85 });
  const darkGreenMat = new THREE.MeshStandardMaterial({ color: 0x075d32, metalness: 0.1, roughness: 0.45 });
  const glassMat = new THREE.MeshPhysicalMaterial({ color: 0xddeeff, metalness: 0.0, roughness: 0.15, transparent: true, opacity: 0.45 });
  const headlightMat = new THREE.MeshStandardMaterial({ color: 0xf4f8ff, metalness: 0.0, roughness: 0.25 });
  const amberMat = new THREE.MeshStandardMaterial({ color: 0xff9a18, metalness: 0.0, roughness: 0.35 });
  const badgeMat = new THREE.MeshStandardMaterial({ color: 0xffffff, metalness: 0.0, roughness: 0.35 });

  function addBox(w, h, d, mat, x, y, z) {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
    mesh.position.set(x, y, z);
    root.add(mesh);
    return mesh;
  }

  function addTube(p1, p2, radius, mat, segments) {
    const tube = new THREE.Mesh(new THREE.TubeGeometry(new THREE.LineCurve3(p1, p2), segments || 1, radius, 12, false), mat);
    root.add(tube);
    return tube;
  }

  function addCurvedTube(points, radius, mat) {
    const curve = new THREE.CatmullRomCurve3(points);
    const tube = new THREE.Mesh(new THREE.TubeGeometry(curve, 24, radius, 10, false), mat);
    root.add(tube);
    return tube;
  }

  const chassis = addBox(1.18, 0.18, 2.25, blackMat, 0, 0.43, -0.02);
  const lower_body = addBox(1.25, 0.34, 2.18, bodyMat, 0, 0.66, -0.02);
  const front_nose = addBox(1.28, 0.42, 0.34, bodyMat, 0, 0.78, 1.18);
  front_nose.rotation.x = -0.12;

  const hood = new THREE.Mesh(new THREE.SphereGeometry(1, 32, 16), bodyMat);
  hood.scale.set(0.66, 0.22, 0.48);
  hood.position.set(0, 0.96, 0.82);
  root.add(hood);

  const rear_deck = new THREE.Mesh(new THREE.SphereGeometry(1, 28, 14), bodyMat);
  rear_deck.scale.set(0.62, 0.18, 0.42);
  rear_deck.position.set(0, 0.91, -0.93);
  root.add(rear_deck);

  const left_side_panel = addBox(0.12, 0.48, 1.55, bodyMat, -0.64, 0.72, -0.25);
  const right_side_panel = addBox(0.12, 0.48, 1.55, bodyMat, 0.64, 0.72, -0.25);
  const floor_mat = addBox(0.92, 0.055, 0.72, blackMat, 0, 0.86, 0.18);
  floor_mat.rotation.x = -0.08;

  const seat_base = new THREE.Mesh(new THREE.SphereGeometry(1, 28, 14), yellowMat);
  seat_base.scale.set(0.55, 0.16, 0.34);
  seat_base.position.set(0, 1.02, -0.38);
  root.add(seat_base);

  const seat_back = new THREE.Mesh(new THREE.SphereGeometry(1, 32, 16), yellowMat);
  seat_back.scale.set(0.58, 0.34, 0.13);
  seat_back.position.set(0, 1.35, -0.66);
  root.add(seat_back);

  const seat_center_dip = new THREE.Mesh(new THREE.SphereGeometry(1, 20, 10), darkGreenMat);
  seat_center_dip.scale.set(0.18, 0.035, 0.11);
  seat_center_dip.position.set(0, 1.61, -0.57);
  root.add(seat_center_dip);

  const backrest_black_band = addBox(1.08, 0.075, 0.055, blackMat, 0, 1.15, -0.53);
  backrest_black_band.rotation.x = -0.08;

  const dashboard = addBox(0.92, 0.12, 0.18, blackMat, 0, 1.02, 0.55);
  dashboard.rotation.x = -0.18;

  const gauge_left = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.055, 0.025, 24), blackMat);
  gauge_left.rotation.x = Math.PI / 2;
  gauge_left.position.set(-0.22, 1.08, 0.44);
  root.add(gauge_left);

  const gauge_right = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.045, 0.025, 24), blackMat);
  gauge_right.rotation.x = Math.PI / 2;
  gauge_right.position.set(0.22, 1.08, 0.44);
  root.add(gauge_right);

  const steering_column = addTube(
    new THREE.Vector3(0, 0.92, 0.48),
    new THREE.Vector3(0, 1.28, 0.32),
    0.035,
    blackMat,
    1
  );

  const steering_wheel = new THREE.Mesh(new THREE.TorusGeometry(0.22, 0.035, 12, 36), blackMat);
  steering_wheel.rotation.x = -0.35;
  steering_wheel.position.set(0, 1.31, 0.31);
  root.add(steering_wheel);

  const steering_hub = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.055, 0.04, 20), blackMat);
  steering_hub.rotation.x = Math.PI / 2 - 0.35;
  steering_hub.position.set(0, 1.31, 0.31);
  root.add(steering_hub);

  const left_front_support = addTube(
    new THREE.Vector3(-0.55, 0.86, 0.62),
    new THREE.Vector3(-0.62, 2.18, 0.78),
    0.045,
    blackMat,
    1
  );
  const right_front_support = addTube(
    new THREE.Vector3(0.55, 0.86, 0.62),
    new THREE.Vector3(0.62, 2.18, 0.78),
    0.045,
    blackMat,
    1
  );
  const left_rear_support = addTube(
    new THREE.Vector3(-0.58, 0.88, -0.92),
    new THREE.Vector3(-0.62, 2.18, -0.82),
    0.045,
    blackMat,
    1
  );
  const right_rear_support = addTube(
    new THREE.Vector3(0.58, 0.88, -0.92),
    new THREE.Vector3(0.62, 2.18, -0.82),
    0.045,
    blackMat,
    1
  );

  const left_roof_rail = addTube(
    new THREE.Vector3(-0.62, 2.18, -0.82),
    new THREE.Vector3(-0.62, 2.18, 0.78),
    0.035,
    blackMat,
    1
  );
  const right_roof_rail = addTube(
    new THREE.Vector3(0.62, 2.18, -0.82),
    new THREE.Vector3(0.62, 2.18, 0.78),
    0.035,
    blackMat,
    1
  );

  const roof_canopy = new THREE.Mesh(new THREE.SphereGeometry(1, 40, 18), yellowMat);
  roof_canopy.scale.set(0.88, 0.13, 1.22);
  roof_canopy.position.set(0, 2.28, -0.02);
  root.add(roof_canopy);

  const roof_front_lip = addBox(1.72, 0.055, 0.12, yellowMat, 0, 2.19, 1.18);
  const roof_rear_lip = addBox(1.72, 0.055, 0.12, yellowMat, 0, 2.19, -1.18);
  const roof_left_edge = addBox(0.08, 0.055, 2.34, yellowMat, -0.86, 2.19, -0.02);
  const roof_right_edge = addBox(0.08, 0.055, 2.34, yellowMat, 0.86, 2.19, -0.02);

  const roof_rib_left = addCurvedTube([
    new THREE.Vector3(-0.36, 2.36, -0.82),
    new THREE.Vector3(-0.36, 2.40, -0.25),
    new THREE.Vector3(-0.36, 2.40, 0.35),
    new THREE.Vector3(-0.36, 2.36, 0.88)
  ], 0.018, yellowMat);

  const roof_rib_right = addCurvedTube([
    new THREE.Vector3(0.36, 2.36, -0.82),
    new THREE.Vector3(0.36, 2.40, -0.25),
    new THREE.Vector3(0.36, 2.40, 0.35),
    new THREE.Vector3(0.36, 2.36, 0.88)
  ], 0.018, yellowMat);

  const windshield = addBox(1.02, 0.34, 0.025, glassMat, 0, 1.48, 0.72);
  windshield.rotation.x = -0.28;

  const grille = addBox(0.58, 0.18, 0.035, blackMat, 0, 0.72, 1.37);
  const grille_top_bar = addBox(0.62, 0.025, 0.045, yellowMat, 0, 0.83, 1.39);
  const grille_bottom_bar = addBox(0.62, 0.025, 0.045, yellowMat, 0, 0.61, 1.39);
  for (let i = 0; i < 5; i++) {
    const grille_slats = addBox(0.52, 0.012, 0.045, blackMat, 0, 0.65 + i * 0.035, 1.405);
  }

  const front_bumper = addBox(0.92, 0.22, 0.16, blackMat, 0, 0.43, 1.42);
  const bumper_highlight = addBox(0.72, 0.035, 0.02, darkGreenMat, 0, 0.55, 1.51);

  const left_headlight = addBox(0.28, 0.16, 0.045, headlightMat, -0.42, 0.82, 1.38);
  const right_headlight = addBox(0.28, 0.16, 0.045, headlightMat, 0.42, 0.82, 1.38);
  const left_amber_light = addBox(0.08, 0.14, 0.052, amberMat, -0.58, 0.82, 1.38);
  const right_amber_light = addBox(0.08, 0.14, 0.052, amberMat, 0.58, 0.82, 1.38);

  const hood_badge = addBox(0.12, 0.09, 0.018, badgeMat, 0, 0.98, 1.25);
  hood_badge.rotation.x = -0.25;
  const badge_mark = addBox(0.055, 0.018, 0.021, blackMat, 0, 0.99, 1.26);
  badge_mark.rotation.x = -0.25;

  const wheelR = 0.31;
  const wheelY = 0.34;
  const wheelX = 0.72;
  const frontWheelZ = 0.92;
  const rearWheelZ = -0.92;
  const wheelPositions = [
    [-wheelX, wheelY, frontWheelZ],
    [wheelX, wheelY, frontWheelZ],
    [-wheelX, wheelY, rearWheelZ],
    [wheelX, wheelY, rearWheelZ]
  ];

  const dummy = new THREE.Object3D();

  const tires = new THREE.InstancedMesh(new THREE.TorusGeometry(0.22, 0.09, 16, 40), tireMat);
  for (let i = 0; i < wheelPositions.length; i++) {
    dummy.position.set(wheelPositions[i][0], wheelPositions[i][1], wheelPositions[i][2]);
    dummy.rotation.set(0, 0, 0);
    dummy.updateMatrix();
    tires.instanceMatrix.needsUpdate = true;
  }
  root.add(tires);

  const tire_treads = new THREE.InstancedMesh(new THREE.BoxGeometry(0.22, 0.045, 0.075), tireMat);
  let treadIndex = 0;
  for (let w = 0; w < wheelPositions.length; w++) {
    for (let i = 0; i < 18; i++) {
      const a = i / 18 * Math.PI * 2;
      dummy.position.set(wheelPositions[w][0], wheelY + Math.cos(a) * 0.305, wheelPositions[w][2] + Math.sin(a) * 0.305);
      dummy.rotation.set(a, 0, 0);
      dummy.updateMatrix();
      tire_treads.instanceMatrix.needsUpdate = true;
      treadIndex++;
    }
  }
  root.add(tire_treads);

  const rims = new THREE.InstancedMesh(new THREE.CylinderGeometry(0.16, 0.16, 0.16, 32), yellowMat);
  for (let i = 0; i < wheelPositions.length; i++) {
    dummy.position.set(wheelPositions[i][0], wheelY, wheelPositions[i][2]);
    dummy.rotation.set(0, 0, Math.PI / 2);
    dummy.updateMatrix();
    rims.instanceMatrix.needsUpdate = true;
  }
  root.add(rims);

  const rim_spokes = new THREE.InstancedMesh(new THREE.BoxGeometry(0.045, 0.13, 0.035), yellowMat);
  let spokeIndex = 0;
  for (let w = 0; w < wheelPositions.length; w++) {
    for (let i = 0; i < 8; i++) {
      const a = i / 8 * Math.PI * 2;
      dummy.position.set(wheelPositions[w][0], wheelY + Math.cos(a) * 0.075, wheelPositions[w][2] + Math.sin(a) * 0.075);
      dummy.rotation.set(a, 0, 0);
      dummy.updateMatrix();
      rim_spokes.instanceMatrix.needsUpdate = true;
      spokeIndex++;
    }
  }
  root.add(rim_spokes);

  const hub_caps = new THREE.InstancedMesh(new THREE.CylinderGeometry(0.055, 0.055, 0.18, 20), yellowMat);
  for (let i = 0; i < wheelPositions.length; i++) {
    dummy.position.set(wheelPositions[i][0], wheelY, wheelPositions[i][2]);
    dummy.rotation.set(0, 0, Math.PI / 2);
    dummy.updateMatrix();
    hub_caps.instanceMatrix.needsUpdate = true;
  }
  root.add(hub_caps);

  const fender_arches = new THREE.InstancedMesh(new THREE.TorusGeometry(0.34, 0.055, 10, 32, Math.PI), bodyMat);
  for (let i = 0; i < wheelPositions.length; i++) {
    dummy.position.set(wheelPositions[i][0] < 0 ? -0.66 : 0.66, wheelY, wheelPositions[i][2]);
    dummy.rotation.set(0, Math.PI / 2, 0);
    dummy.updateMatrix();
    fender_arches.instanceMatrix.needsUpdate = true;
  }
  root.add(fender_arches);

  const left_step = addBox(0.16, 0.08, 0.82, blackMat, -0.70, 0.52, -0.18);
  const right_step = addBox(0.16, 0.08, 0.82, blackMat, 0.70, 0.52, -0.18);

  const left_foot_pedal = addBox(0.16, 0.035, 0.22, blackMat, -0.22, 0.92, 0.32);
  const right_foot_pedal = addBox(0.16, 0.035, 0.22, blackMat, 0.22, 0.92, 0.32);

  const mirror_housing = addBox(0.24, 0.14, 0.08, blackMat, 0, 2.08, 0.88);
  const mirror_glass = addBox(0.18, 0.09, 0.012, glassMat, 0, 2.08, 0.83);

  const rear_bumper = addBox(1.05, 0.16, 0.12, blackMat, 0, 0.52, -1.20);

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
  const scale = 0.95 / maxDim;
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
