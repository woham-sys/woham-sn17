function __sn17_user(THREE) {
  const root = new THREE.Group();

  const tankMat = new THREE.MeshStandardMaterial({ color: 0x0d62c4, metalness: 0.35, roughness: 0.28 });
  const tankDarkMat = new THREE.MeshStandardMaterial({ color: 0x074b9a, metalness: 0.3, roughness: 0.32 });
  const frameMat = new THREE.MeshStandardMaterial({ color: 0x111111, metalness: 0.2, roughness: 0.75 });
  const rubberMat = new THREE.MeshStandardMaterial({ color: 0x151515, metalness: 0.0, roughness: 0.9 });
  const hubMat = new THREE.MeshStandardMaterial({ color: 0x2a2a2a, metalness: 0.45, roughness: 0.55 });
  const reflectorMat = new THREE.MeshStandardMaterial({ color: 0xd94b35, metalness: 0.0, roughness: 0.45 });
  const silverMat = new THREE.MeshStandardMaterial({ color: 0xb8b8b8, metalness: 0.5, roughness: 0.35 });

  const tankRadius = 0.48;
  const tankLength = 2.45;
  const tankY = 0.72;
  const tankZ = 0.0;

  const main_tank_body = new THREE.Mesh(new THREE.CylinderGeometry(tankRadius, tankRadius, tankLength, 64, 1, false), tankMat);
  main_tank_body.rotation.x = Math.PI / 2;
  main_tank_body.position.set(0, tankY, tankZ);
  root.add(main_tank_body);

  const front_dome_cap = new THREE.Mesh(new THREE.SphereGeometry(tankRadius, 48, 24), tankMat);
  front_dome_cap.scale.set(1, 1, 0.55);
  front_dome_cap.position.set(0, tankY, tankLength / 2);
  root.add(front_dome_cap);

  const rear_dome_cap = new THREE.Mesh(new THREE.SphereGeometry(tankRadius, 48, 24), tankMat);
  rear_dome_cap.scale.set(1, 1, 0.55);
  rear_dome_cap.position.set(0, tankY, -tankLength / 2);
  root.add(rear_dome_cap);

  const top_center_rail = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.035, tankLength * 0.96), tankDarkMat);
  top_center_rail.position.set(0, tankY + tankRadius + 0.018, 0);
  root.add(top_center_rail);

  const left_top_side_rail = new THREE.Mesh(new THREE.BoxGeometry(0.055, 0.03, tankLength * 0.9), tankDarkMat);
  left_top_side_rail.position.set(-0.25, tankY + Math.sqrt(tankRadius * tankRadius - 0.25 * 0.25) + 0.018, 0);
  root.add(left_top_side_rail);

  const right_top_side_rail = new THREE.Mesh(new THREE.BoxGeometry(0.055, 0.03, tankLength * 0.9), tankDarkMat);
  right_top_side_rail.position.set(0.25, tankY + Math.sqrt(tankRadius * tankRadius - 0.25 * 0.25) + 0.018, 0);
  root.add(right_top_side_rail);

  const dummy = new THREE.Object3D();

  const hoop_positions = [-0.82, 0.0, 0.82];
  const reinforcement_hoops = new THREE.InstancedMesh(new THREE.TorusGeometry(tankRadius + 0.018, 0.026, 12, 64), tankDarkMat);
  for (let i = 0; i < hoop_positions.length; i++) {
    dummy.position.set(0, tankY, hoop_positions[i]);
    dummy.rotation.set(0, 0, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    reinforcement_hoops.setMatrixAt(i, dummy.matrix);
  }
  root.add(reinforcement_hoops);

  const side_vertical_straps = new THREE.InstancedMesh(new THREE.BoxGeometry(0.045, 0.78, 0.055), tankDarkMat);
  let strapIndex = 0;
  for (const side of [-1, 1]) {
    for (const z of hoop_positions) {
      dummy.position.set(side * (tankRadius + 0.012), tankY - 0.02, z);
      dummy.rotation.set(0, 0, 0);
      dummy.scale.set(1, 1, 1);
      dummy.updateMatrix();
      side_vertical_straps.setMatrixAt(strapIndex++, dummy.matrix);
    }
  }
  root.add(side_vertical_straps);

  const strap_bolts = new THREE.InstancedMesh(new THREE.CylinderGeometry(0.018, 0.018, 0.018, 12), silverMat);
  let boltIndex = 0;
  for (const side of [-1, 1]) {
    for (const z of hoop_positions) {
      for (const y of [tankY - 0.3, tankY + 0.3]) {
        dummy.position.set(side * (tankRadius + 0.04), y, z);
        dummy.rotation.set(0, 0, Math.PI / 2);
        dummy.scale.set(1, 1, 1);
        dummy.updateMatrix();
        strap_bolts.setMatrixAt(boltIndex++, dummy.matrix);
      }
    }
  }
  root.add(strap_bolts);

  const side_lower_rails = new THREE.InstancedMesh(new THREE.BoxGeometry(0.06, 0.07, tankLength + 0.18), tankDarkMat);
  for (let i = 0; i < 2; i++) {
    const side = i === 0 ? -1 : 1;
    dummy.position.set(side * (tankRadius + 0.01), tankY - tankRadius - 0.015, 0);
    dummy.rotation.set(0, 0, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    side_lower_rails.setMatrixAt(i, dummy.matrix);
  }
  root.add(side_lower_rails);

  const chassis_deck = new THREE.Mesh(new THREE.BoxGeometry(1.08, 0.08, 2.9), frameMat);
  chassis_deck.position.set(0, 0.25, 0);
  root.add(chassis_deck);

  const left_chassis_rail = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.14, 2.82), frameMat);
  left_chassis_rail.position.set(-0.43, 0.17, 0);
  root.add(left_chassis_rail);

  const right_chassis_rail = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.14, 2.82), frameMat);
  right_chassis_rail.position.set(0.43, 0.17, 0);
  root.add(right_chassis_rail);

  const underbody_box = new THREE.Mesh(new THREE.BoxGeometry(0.82, 0.18, 1.35), frameMat);
  underbody_box.position.set(0, 0.12, -0.1);
  root.add(underbody_box);

  const axle_positions = [-0.98, -0.68, 0.98];
  const axles = new THREE.InstancedMesh(new THREE.CylinderGeometry(0.035, 0.035, 1.18, 16), frameMat);
  for (let i = 0; i < axle_positions.length; i++) {
    dummy.position.set(0, 0.08, axle_positions[i]);
    dummy.rotation.set(0, 0, Math.PI / 2);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    axles.setMatrixAt(i, dummy.matrix);
  }
  root.add(axles);

  const wheel_positions = [];
  for (const z of axle_positions) {
    wheel_positions.push([-0.56, 0.08, z], [0.56, 0.08, z]);
  }

  const tire_meshes = new THREE.InstancedMesh(new THREE.TorusGeometry(0.16, 0.055, 14, 32), rubberMat);
  for (let i = 0; i < wheel_positions.length; i++) {
    const p = wheel_positions[i];
    dummy.position.set(p[0], p[1], p[2]);
    dummy.rotation.set(0, Math.PI / 2, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    tire_meshes.setMatrixAt(i, dummy.matrix);
  }
  root.add(tire_meshes);

  const wheel_hubs = new THREE.InstancedMesh(new THREE.CylinderGeometry(0.095, 0.095, 0.075, 24), hubMat);
  for (let i = 0; i < wheel_positions.length; i++) {
    const p = wheel_positions[i];
    dummy.position.set(p[0], p[1], p[2]);
    dummy.rotation.set(0, 0, Math.PI / 2);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    wheel_hubs.setMatrixAt(i, dummy.matrix);
  }
  root.add(wheel_hubs);

  const hub_caps = new THREE.InstancedMesh(new THREE.CylinderGeometry(0.045, 0.045, 0.082, 16), frameMat);
  for (let i = 0; i < wheel_positions.length; i++) {
    const p = wheel_positions[i];
    dummy.position.set(p[0], p[1], p[2]);
    dummy.rotation.set(0, 0, Math.PI / 2);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    hub_caps.setMatrixAt(i, dummy.matrix);
  }
  root.add(hub_caps);

  const tread_blocks = new THREE.InstancedMesh(new THREE.BoxGeometry(0.13, 0.026, 0.052), rubberMat);
  let treadIndex = 0;
  for (const p of wheel_positions) {
    for (let i = 0; i < 14; i++) {
      const angle = i / 14 * Math.PI * 2;
      dummy.position.set(p[0], p[1] + Math.cos(angle) * 0.205, p[2] + Math.sin(angle) * 0.205);
      dummy.rotation.set(angle, 0, 0);
      dummy.scale.set(1, 1, 1);
      dummy.updateMatrix();
      tread_blocks.setMatrixAt(treadIndex++, dummy.matrix);
    }
  }
  root.add(tread_blocks);

  const mud_flaps = new THREE.InstancedMesh(new THREE.BoxGeometry(0.055, 0.24, 0.22), rubberMat);
  for (let i = 0; i < 4; i++) {
    const side = i % 2 === 0 ? -1 : 1;
    const z = i < 2 ? -1.18 : 1.18;
    dummy.position.set(side * 0.58, 0.02, z);
    dummy.rotation.set(-0.15, 0, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    mud_flaps.setMatrixAt(i, dummy.matrix);
  }
  root.add(mud_flaps);

  const front_bumper = new THREE.Mesh(new THREE.BoxGeometry(1.18, 0.1, 0.13), tankDarkMat);
  front_bumper.position.set(0, 0.27, 1.5);
  root.add(front_bumper);

  const rear_bumper = new THREE.Mesh(new THREE.BoxGeometry(1.18, 0.1, 0.13), tankDarkMat);
  rear_bumper.position.set(0, 0.27, -1.5);
  root.add(rear_bumper);

  const rear_tow_bar = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.07, 0.32), frameMat);
  rear_tow_bar.position.set(0, 0.18, -1.68);
  root.add(rear_tow_bar);

  const tow_eye = new THREE.Mesh(new THREE.TorusGeometry(0.055, 0.012, 10, 24), frameMat);
  tow_eye.rotation.y = Math.PI / 2;
  tow_eye.position.set(0, 0.18, -1.84);
  root.add(tow_eye);

  const rear_reflectors = new THREE.InstancedMesh(new THREE.BoxGeometry(0.18, 0.075, 0.018), reflectorMat);
  for (let i = 0; i < 2; i++) {
    dummy.position.set(i === 0 ? -0.4 : 0.4, 0.29, -1.57);
    dummy.rotation.set(0, 0, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    rear_reflectors.setMatrixAt(i, dummy.matrix);
  }
  root.add(rear_reflectors);

  const front_reflectors = new THREE.InstancedMesh(new THREE.BoxGeometry(0.14, 0.06, 0.018), reflectorMat);
  for (let i = 0; i < 2; i++) {
    dummy.position.set(i === 0 ? -0.42 : 0.42, 0.29, 1.57);
    dummy.rotation.set(0, 0, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    front_reflectors.setMatrixAt(i, dummy.matrix);
  }
  root.add(front_reflectors);

  const deck_bolts = new THREE.InstancedMesh(new THREE.CylinderGeometry(0.018, 0.018, 0.018, 12), silverMat);
  let deckBoltIndex = 0;
  for (const side of [-1, 1]) {
    for (const z of [-1.25, -0.45, 0.45, 1.25]) {
      dummy.position.set(side * 0.48, 0.305, z);
      dummy.rotation.set(0, 0, 0);
      dummy.scale.set(1, 1, 1);
      dummy.updateMatrix();
      deck_bolts.setMatrixAt(deckBoltIndex++, dummy.matrix);
    }
  }
  root.add(deck_bolts);

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
    root.position.multiplyScalar(scale);
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
