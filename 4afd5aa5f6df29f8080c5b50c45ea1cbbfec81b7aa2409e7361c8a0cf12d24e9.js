function __sn17_user(THREE) {
  const root = new THREE.Group();
  root.name = "cylindrical_device";

  const body_assembly = new THREE.Group();
  body_assembly.name = "body_assembly";
  root.add(body_assembly);

  const front_assembly = new THREE.Group();
  front_assembly.name = "front_assembly";
  root.add(front_assembly);

  const rear_assembly = new THREE.Group();
  rear_assembly.name = "rear_assembly";
  root.add(rear_assembly);

  const main_bodyMat = new THREE.MeshStandardMaterial({
    color: 0x17191b,
    metalness: 0.35,
    roughness: 0.55
  });

  const rear_end_capMat = new THREE.MeshStandardMaterial({
    color: 0x141618,
    metalness: 0.3,
    roughness: 0.58
  });

  const seamMat = new THREE.MeshStandardMaterial({
    color: 0x070809,
    metalness: 0.2,
    roughness: 0.72
  });

  const front_silver_capMat = new THREE.MeshStandardMaterial({
    color: 0xcfd2d2,
    metalness: 0.55,
    roughness: 0.32
  });

  const front_lensMat = new THREE.MeshPhysicalMaterial({
    color: 0xe7eeee,
    metalness: 0.0,
    roughness: 0.15,
    transparent: true,
    opacity: 0.5,
    depthWrite: false
  });

  const lens_highlightMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    metalness: 0.0,
    roughness: 0.25,
    transparent: true,
    opacity: 0.34,
    depthWrite: false
  });

  const screw_headMat = new THREE.MeshStandardMaterial({
    color: 0xd8d8d2,
    metalness: 0.6,
    roughness: 0.28
  });

  const screw_slotMat = new THREE.MeshStandardMaterial({
    color: 0x343638,
    metalness: 0.2,
    roughness: 0.75
  });

  const main_bodyProfile = [
    new THREE.Vector2(0.000, -0.610),
    new THREE.Vector2(0.318, -0.610),
    new THREE.Vector2(0.329, -0.585),
    new THREE.Vector2(0.333, -0.530),
    new THREE.Vector2(0.333, 0.380),
    new THREE.Vector2(0.331, 0.430),
    new THREE.Vector2(0.322, 0.465),
    new THREE.Vector2(0.000, 0.465)
  ];
  const main_bodyGeom = new THREE.LatheGeometry(main_bodyProfile, 64);
  const main_body = new THREE.Mesh(main_bodyGeom, main_bodyMat);
  main_body.name = "main_body";
  main_body.rotation.x = Math.PI / 2;
  body_assembly.add(main_body);

  const rear_end_capProfile = [
    new THREE.Vector2(0.000, -0.820),
    new THREE.Vector2(0.245, -0.820),
    new THREE.Vector2(0.292, -0.807),
    new THREE.Vector2(0.322, -0.775),
    new THREE.Vector2(0.340, -0.720),
    new THREE.Vector2(0.346, -0.660),
    new THREE.Vector2(0.343, -0.615),
    new THREE.Vector2(0.334, -0.585),
    new THREE.Vector2(0.000, -0.585)
  ];
  const rear_end_capGeom = new THREE.LatheGeometry(rear_end_capProfile, 64);
  const rear_end_cap = new THREE.Mesh(rear_end_capGeom, rear_end_capMat);
  rear_end_cap.name = "rear_end_cap";
  rear_end_cap.rotation.x = Math.PI / 2;
  rear_assembly.add(rear_end_cap);

  const rear_seamGeom = new THREE.TorusGeometry(0.333, 0.006, 10, 64);
  const rear_seam = new THREE.Mesh(rear_seamGeom, seamMat);
  rear_seam.name = "rear_seam";
  rear_seam.position.z = -0.585;
  rear_assembly.add(rear_seam);

  const front_silver_capProfile = [
    new THREE.Vector2(0.000, 0.430),
    new THREE.Vector2(0.318, 0.430),
    new THREE.Vector2(0.334, 0.455),
    new THREE.Vector2(0.344, 0.500),
    new THREE.Vector2(0.347, 0.560),
    new THREE.Vector2(0.347, 0.880),
    new THREE.Vector2(0.342, 0.940),
    new THREE.Vector2(0.329, 0.985),
    new THREE.Vector2(0.305, 1.020),
    new THREE.Vector2(0.270, 1.043),
    new THREE.Vector2(0.225, 1.055),
    new THREE.Vector2(0.000, 1.055)
  ];
  const front_silver_capGeom = new THREE.LatheGeometry(front_silver_capProfile, 64);
  const front_silver_cap = new THREE.Mesh(front_silver_capGeom, front_silver_capMat);
  front_silver_cap.name = "front_silver_cap";
  front_silver_cap.rotation.x = Math.PI / 2;
  front_assembly.add(front_silver_cap);

  const front_seamGeom = new THREE.TorusGeometry(0.329, 0.006, 10, 64);
  const front_seam = new THREE.Mesh(front_seamGeom, seamMat);
  front_seam.name = "front_seam";
  front_seam.position.z = 0.452;
  front_assembly.add(front_seam);

  const front_lensGeom = new THREE.SphereGeometry(0.245, 48, 24);
  const front_lens = new THREE.Mesh(front_lensGeom, front_lensMat);
  front_lens.name = "front_lens";
  front_lens.scale.set(1, 1, 0.13);
  front_lens.position.z = 1.052;
  front_assembly.add(front_lens);

  const lens_outer_ringGeom = new THREE.TorusGeometry(0.211, 0.007, 10, 48);
  const lens_outer_ring = new THREE.Mesh(lens_outer_ringGeom, lens_highlightMat);
  lens_outer_ring.name = "lens_outer_ring";
  lens_outer_ring.position.z = 1.073;
  front_assembly.add(lens_outer_ring);

  const lens_inner_ringGeom = new THREE.TorusGeometry(0.078, 0.006, 10, 32);
  const lens_inner_ring = new THREE.Mesh(lens_inner_ringGeom, lens_highlightMat);
  lens_inner_ring.name = "lens_inner_ring";
  lens_inner_ring.position.z = 1.084;
  front_assembly.add(lens_inner_ring);

  const lens_centerGeom = new THREE.CylinderGeometry(0.043, 0.043, 0.012, 32);
  const lens_center = new THREE.Mesh(lens_centerGeom, front_lensMat);
  lens_center.name = "lens_center";
  lens_center.rotation.x = Math.PI / 2;
  lens_center.position.z = 1.086;
  front_assembly.add(lens_center);

  const screw_angle = 0.72;
  const screw_normal = new THREE.Vector3(
    Math.cos(screw_angle),
    Math.sin(screw_angle),
    0
  );
  const screw_quaternion = new THREE.Quaternion().setFromUnitVectors(
    new THREE.Vector3(0, 1, 0),
    screw_normal
  );

  const screw_recessGeom = new THREE.CylinderGeometry(0.043, 0.043, 0.008, 24);
  const screw_recess = new THREE.Mesh(screw_recessGeom, seamMat);
  screw_recess.name = "screw_recess";
  screw_recess.quaternion.copy(screw_quaternion);
  screw_recess.position.copy(screw_normal).multiplyScalar(0.334);
  screw_recess.position.z = -0.435;
  body_assembly.add(screw_recess);

  const screw_headGeom = new THREE.CylinderGeometry(0.034, 0.034, 0.012, 24);
  const screw_head = new THREE.Mesh(screw_headGeom, screw_headMat);
  screw_head.name = "screw_head";
  screw_head.quaternion.copy(screw_quaternion);
  screw_head.position.copy(screw_normal).multiplyScalar(0.340);
  screw_head.position.z = -0.435;
  body_assembly.add(screw_head);

  const screw_slot_horizontalGeom = new THREE.BoxGeometry(0.045, 0.004, 0.008);
  const screw_slot_horizontal = new THREE.Mesh(
    screw_slot_horizontalGeom,
    screw_slotMat
  );
  screw_slot_horizontal.name = "screw_slot_horizontal";
  screw_slot_horizontal.quaternion.copy(screw_quaternion);
  screw_slot_horizontal.position.copy(screw_normal).multiplyScalar(0.347);
  screw_slot_horizontal.position.z = -0.435;
  body_assembly.add(screw_slot_horizontal);

  const screw_slot_verticalGeom = new THREE.BoxGeometry(0.008, 0.004, 0.045);
  const screw_slot_vertical = new THREE.Mesh(
    screw_slot_verticalGeom,
    screw_slotMat
  );
  screw_slot_vertical.name = "screw_slot_vertical";
  screw_slot_vertical.quaternion.copy(screw_quaternion);
  screw_slot_vertical.position.copy(screw_normal).multiplyScalar(0.347);
  screw_slot_vertical.position.z = -0.435;
  body_assembly.add(screw_slot_vertical);

  fitToUnitCube(THREE, root);
  return root;

  function fitToUnitCube(THREE, object) {
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
