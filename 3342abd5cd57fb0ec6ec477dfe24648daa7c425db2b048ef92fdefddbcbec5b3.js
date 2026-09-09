function __sn17_user(THREE) {
  const root = new THREE.Group();
  const wheel_assembly = new THREE.Group();
  root.add(wheel_assembly);

  const tireMat = new THREE.MeshStandardMaterial({
    color: 0x171717,
    roughness: 0.85,
  });
  const tread_blocksMat = new THREE.MeshStandardMaterial({
    color: 0x242424,
    roughness: 0.9,
  });
  const rimMat = new THREE.MeshStandardMaterial({
    color: 0xd8d8d8,
    metalness: 0.35,
    roughness: 0.28,
    side: THREE.DoubleSide,
  });
  const spokesMat = new THREE.MeshStandardMaterial({
    color: 0xbfc0bd,
    metalness: 0.35,
    roughness: 0.3,
  });
  const nipplesMat = new THREE.MeshStandardMaterial({
    color: 0x858585,
    metalness: 0.4,
    roughness: 0.32,
  });
  const hubMat = new THREE.MeshStandardMaterial({
    color: 0xc8c8c8,
    metalness: 0.35,
    roughness: 0.25,
  });
  const hub_bandMat = new THREE.MeshStandardMaterial({
    color: 0xa9aaa8,
    metalness: 0.4,
    roughness: 0.32,
  });
  const dark_metalMat = new THREE.MeshStandardMaterial({
    color: 0x3f4141,
    metalness: 0.35,
    roughness: 0.42,
  });
  const black_hardwareMat = new THREE.MeshStandardMaterial({
    color: 0x111111,
    roughness: 0.75,
  });

  const tireGeom = new THREE.TorusGeometry(0.955, 0.055, 16, 128);
  const tire = new THREE.Mesh(tireGeom, tireMat);
  wheel_assembly.add(tire);

  const tread_blocksGeom = new THREE.BoxGeometry(0.038, 0.009, 0.032);
  const tread_count = 72;
  const tread_blocks = new THREE.InstancedMesh(
    tread_blocksGeom,
    tread_blocksMat,
    tread_count
  );
  const dummy = new THREE.Object3D();
  for (let i = 0; i < tread_count; i++) {
    const angle = i / tread_count * Math.PI * 2;
    dummy.position.set(Math.cos(angle) * 1.013, Math.sin(angle) * 1.013, 0);
    dummy.rotation.set(0, 0, angle - Math.PI / 2);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    tread_blocks.setMatrixAt(i, dummy.matrix);
  }
  tread_blocks.instanceMatrix.needsUpdate = true;
  wheel_assembly.add(tread_blocks);

  const rim_sidewallGeom = new THREE.TorusGeometry(0.884, 0.024, 10, 128);
  const rim_sidewall = new THREE.Mesh(rim_sidewallGeom, rimMat);
  rim_sidewall.position.z = 0.018;
  wheel_assembly.add(rim_sidewall);

  const rim_inner_beadGeom = new THREE.TorusGeometry(0.848, 0.009, 8, 128);
  const rim_inner_bead = new THREE.Mesh(rim_inner_beadGeom, rimMat);
  rim_inner_bead.position.z = 0.026;
  wheel_assembly.add(rim_inner_bead);

  const rim_cross_sectionGeom = new THREE.RingGeometry(0.835, 0.91, 128);
  const front_rim_face = new THREE.Mesh(rim_cross_sectionGeom, rimMat);
  front_rim_face.position.z = 0.043;
  wheel_assembly.add(front_rim_face);

  const rear_rim_face = new THREE.Mesh(rim_cross_sectionGeom, rimMat);
  rear_rim_face.position.z = -0.043;
  rear_rim_face.rotation.y = Math.PI;
  wheel_assembly.add(rear_rim_face);

  const spoke_count = 32;
  const spokesGeom = new THREE.CylinderGeometry(0.0045, 0.0045, 1, 6);
  const spokes = new THREE.InstancedMesh(spokesGeom, spokesMat, spoke_count);
  const up = new THREE.Vector3(0, 1, 0);
  const midpoint = new THREE.Vector3();
  const direction = new THREE.Vector3();
  const quaternion = new THREE.Quaternion();

  for (let i = 0; i < spoke_count; i++) {
    const outer_angle = i / spoke_count * Math.PI * 2;
    const flange_side = i % 2 === 0 ? 1 : -1;
    const lace_sign = Math.floor(i / 2) % 2 === 0 ? 1 : -1;
    const inner_angle = outer_angle + lace_sign * 0.58;

    const inner_point = new THREE.Vector3(
      Math.cos(inner_angle) * 0.087,
      Math.sin(inner_angle) * 0.087,
      flange_side * 0.068
    );
    const outer_point = new THREE.Vector3(
      Math.cos(outer_angle) * 0.848,
      Math.sin(outer_angle) * 0.848,
      flange_side * 0.006
    );

    direction.subVectors(outer_point, inner_point);
    const length = direction.length();
    midpoint.addVectors(inner_point, outer_point).multiplyScalar(0.5);
    quaternion.setFromUnitVectors(up, direction.normalize());

    dummy.position.copy(midpoint);
    dummy.quaternion.copy(quaternion);
    dummy.scale.set(1, length, 1);
    dummy.updateMatrix();
    spokes.setMatrixAt(i, dummy.matrix);
  }
  spokes.instanceMatrix.needsUpdate = true;
  wheel_assembly.add(spokes);

  const nipplesGeom = new THREE.CylinderGeometry(0.008, 0.008, 0.034, 8);
  const nipples = new THREE.InstancedMesh(nipplesGeom, nipplesMat, spoke_count);
  for (let i = 0; i < spoke_count; i++) {
    const angle = i / spoke_count * Math.PI * 2;
    const radial = new THREE.Vector3(Math.cos(angle), Math.sin(angle), 0);
    dummy.position.set(radial.x * 0.852, radial.y * 0.852, 0);
    dummy.quaternion.setFromUnitVectors(up, radial);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    nipples.setMatrixAt(i, dummy.matrix);
  }
  nipples.instanceMatrix.needsUpdate = true;
  wheel_assembly.add(nipples);

  const hub_shellGeom = new THREE.CylinderGeometry(0.073, 0.073, 0.11, 32);
  const hub_shell = new THREE.Mesh(hub_shellGeom, hub_bandMat);
  hub_shell.rotation.x = Math.PI / 2;
  wheel_assembly.add(hub_shell);

  const hub_flangeGeom = new THREE.CylinderGeometry(0.105, 0.105, 0.018, 32);
  const front_hub_flange = new THREE.Mesh(hub_flangeGeom, hubMat);
  front_hub_flange.rotation.x = Math.PI / 2;
  front_hub_flange.position.z = 0.061;
  wheel_assembly.add(front_hub_flange);

  const rear_hub_flange = new THREE.Mesh(hub_flangeGeom, hubMat);
  rear_hub_flange.rotation.x = Math.PI / 2;
  rear_hub_flange.position.z = -0.061;
  wheel_assembly.add(rear_hub_flange);

  const hub_center_bandGeom = new THREE.CylinderGeometry(0.083, 0.083, 0.038, 32);
  const hub_center_band = new THREE.Mesh(hub_center_bandGeom, hub_bandMat);
  hub_center_band.rotation.x = Math.PI / 2;
  wheel_assembly.add(hub_center_band);

  const hub_coneGeom = new THREE.CylinderGeometry(0.047, 0.075, 0.075, 32);
  const front_hub_cone = new THREE.Mesh(hub_coneGeom, hubMat);
  front_hub_cone.rotation.x = Math.PI / 2;
  front_hub_cone.position.z = 0.091;
  wheel_assembly.add(front_hub_cone);

  const rear_hub_cone = new THREE.Mesh(hub_coneGeom, hubMat);
  rear_hub_cone.rotation.x = -Math.PI / 2;
  rear_hub_cone.position.z = -0.091;
  wheel_assembly.add(rear_hub_cone);

  const axleGeom = new THREE.CylinderGeometry(0.022, 0.022, 0.34, 20);
  const axle = new THREE.Mesh(axleGeom, dark_metalMat);
  axle.rotation.x = Math.PI / 2;
  wheel_assembly.add(axle);

  const axle_nutGeom = new THREE.CylinderGeometry(0.039, 0.039, 0.034, 6);
  const front_axle_nut = new THREE.Mesh(axle_nutGeom, hub_bandMat);
  front_axle_nut.rotation.x = Math.PI / 2;
  front_axle_nut.position.z = 0.185;
  wheel_assembly.add(front_axle_nut);

  const rear_axle_nut = new THREE.Mesh(axle_nutGeom, hub_bandMat);
  rear_axle_nut.rotation.x = Math.PI / 2;
  rear_axle_nut.position.z = -0.185;
  wheel_assembly.add(rear_axle_nut);

  const axle_endGeom = new THREE.CylinderGeometry(0.027, 0.027, 0.022, 16);
  const front_axle_end = new THREE.Mesh(axle_endGeom, dark_metalMat);
  front_axle_end.rotation.x = Math.PI / 2;
  front_axle_end.position.z = 0.207;
  wheel_assembly.add(front_axle_end);

  const rear_axle_end = new THREE.Mesh(axle_endGeom, dark_metalMat);
  rear_axle_end.rotation.x = Math.PI / 2;
  rear_axle_end.position.z = -0.207;
  wheel_assembly.add(rear_axle_end);

  const valve_stemGeom = new THREE.CylinderGeometry(0.007, 0.007, 0.075, 8);
  const valve_stem = new THREE.Mesh(valve_stemGeom, black_hardwareMat);
  valve_stem.position.set(0, 0.813, 0.052);
  wheel_assembly.add(valve_stem);

  const valve_baseGeom = new THREE.CylinderGeometry(0.014, 0.014, 0.012, 12);
  const valve_base = new THREE.Mesh(valve_baseGeom, black_hardwareMat);
  valve_base.position.set(0, 0.851, 0.052);
  wheel_assembly.add(valve_base);

  const valve_capGeom = new THREE.CylinderGeometry(0.011, 0.011, 0.018, 10);
  const valve_cap = new THREE.Mesh(valve_capGeom, black_hardwareMat);
  valve_cap.position.set(0, 0.864, 0.052);
  wheel_assembly.add(valve_cap);

  const valve_ringGeom = new THREE.TorusGeometry(0.014, 0.003, 6, 16);
  const valve_ring = new THREE.Mesh(valve_ringGeom, black_hardwareMat);
  valve_ring.rotation.x = Math.PI / 2;
  valve_ring.position.set(0, 0.849, 0.052);
  wheel_assembly.add(valve_ring);

  const brake_mountGeom = new THREE.BoxGeometry(0.055, 0.027, 0.035);
  const brake_mount = new THREE.Mesh(brake_mountGeom, black_hardwareMat);
  brake_mount.position.set(-0.285, 0.775, 0.055);
  brake_mount.rotation.z = -0.55;
  wheel_assembly.add(brake_mount);

  const brake_boltGeom = new THREE.CylinderGeometry(0.012, 0.012, 0.018, 12);
  const brake_bolt = new THREE.Mesh(brake_boltGeom, hub_bandMat);
  brake_bolt.rotation.x = Math.PI / 2;
  brake_bolt.position.set(-0.285, 0.775, 0.081);
  wheel_assembly.add(brake_bolt);

  const brake_clampGeom = new THREE.BoxGeometry(0.032, 0.052, 0.025);
  const brake_clamp = new THREE.Mesh(brake_clampGeom, black_hardwareMat);
  brake_clamp.position.set(-0.318, 0.748, 0.058);
  brake_clamp.rotation.z = -0.55;
  wheel_assembly.add(brake_clamp);

  wheel_assembly.rotation.y = -0.08;
  wheel_assembly.rotation.x = 0.018;

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
  const scale = 0.98 / maxDim;
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
