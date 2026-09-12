// miner-diag: gpus=? tflops=? stream48=? power=? probe_tps=3831 cpu_quota=?/? net=? batch=4 wall=1389 seed=870128282
export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "antique_cylindrical_tool";

  const body_group = new THREE.Group();
  body_group.name = "body_group";
  root.add(body_group);

  const handle_group = new THREE.Group();
  handle_group.name = "handle_group";
  root.add(handle_group);

  const body_shellMat = new THREE.MeshStandardMaterial({
    color: 0x596667,
    metalness: 0.35,
    roughness: 0.78
  });
  const flangeMat = new THREE.MeshStandardMaterial({
    color: 0x554842,
    metalness: 0.3,
    roughness: 0.82
  });
  const dark_edgeMat = new THREE.MeshStandardMaterial({
    color: 0x302d29,
    metalness: 0.25,
    roughness: 0.88
  });
  const rustMat = new THREE.MeshStandardMaterial({
    color: 0x88432f,
    metalness: 0.0,
    roughness: 0.9,
    side: THREE.DoubleSide
  });
  const dark_rustMat = new THREE.MeshStandardMaterial({
    color: 0x542d25,
    metalness: 0.0,
    roughness: 0.95,
    side: THREE.DoubleSide
  });
  const patinaMat = new THREE.MeshStandardMaterial({
    color: 0x64776e,
    metalness: 0.0,
    roughness: 0.9,
    side: THREE.DoubleSide
  });
  const oxidationMat = new THREE.MeshStandardMaterial({
    color: 0x788079,
    metalness: 0.0,
    roughness: 0.95,
    side: THREE.DoubleSide
  });
  const woodMat = new THREE.MeshStandardMaterial({
    color: 0x9a6a3d,
    metalness: 0.0,
    roughness: 0.6
  });
  const wood_grainMat = new THREE.MeshStandardMaterial({
    color: 0x49301f,
    metalness: 0.0,
    roughness: 0.9
  });
  const copperMat = new THREE.MeshStandardMaterial({
    color: 0xb87333,
    metalness: 0.5,
    roughness: 0.3
  });
  const dark_copperMat = new THREE.MeshStandardMaterial({
    color: 0x713923,
    metalness: 0.4,
    roughness: 0.45
  });
  const boreMat = new THREE.MeshStandardMaterial({
    color: 0x1d120e,
    metalness: 0.0,
    roughness: 0.9,
    side: THREE.DoubleSide
  });
  const rivetMat = new THREE.MeshStandardMaterial({
    color: 0x3a3a3a,
    metalness: 0.6,
    roughness: 0.5
  });
  const labelMat = new THREE.MeshStandardMaterial({
    color: 0x7b6548,
    metalness: 0.0,
    roughness: 0.9,
    side: THREE.DoubleSide
  });
  const label_centerMat = new THREE.MeshStandardMaterial({
    color: 0xa05b35,
    metalness: 0.0,
    roughness: 0.9,
    side: THREE.DoubleSide
  });

  const body_shellProfile = [
    new THREE.Vector2(0.00, -1.08),
    new THREE.Vector2(0.28, -1.08),
    new THREE.Vector2(0.33, -1.03),
    new THREE.Vector2(0.35, -0.94),
    new THREE.Vector2(0.35, -0.25),
    new THREE.Vector2(0.34, -0.16),
    new THREE.Vector2(0.31, -0.08),
    new THREE.Vector2(0.00, -0.08)
  ];
  const body_shellGeom = new THREE.LatheGeometry(body_shellProfile, 48);
  const body_shell = new THREE.Mesh(body_shellGeom, body_shellMat);
  body_shell.name = "body_shell";
  body_shell.rotation.z = -Math.PI / 2;
  body_group.add(body_shell);

  const front_flangeGeom = new THREE.CylinderGeometry(0.43, 0.43, 0.12, 48);
  const front_flange = new THREE.Mesh(front_flangeGeom, flangeMat);
  front_flange.name = "front_flange";
  front_flange.rotation.z = -Math.PI / 2;
  front_flange.position.x = 0.02;
  body_group.add(front_flange);

  const front_flange_faceGeom = new THREE.CylinderGeometry(0.395, 0.395, 0.018, 48);
  const front_flange_face = new THREE.Mesh(front_flange_faceGeom, flangeMat);
  front_flange_face.name = "front_flange_face";
  front_flange_face.rotation.z = -Math.PI / 2;
  front_flange_face.position.x = 0.086;
  body_group.add(front_flange_face);

  const front_flange_rimGeom = new THREE.TorusGeometry(0.397, 0.026, 10, 48);
  const front_flange_rim = new THREE.Mesh(front_flange_rimGeom, dark_edgeMat);
  front_flange_rim.name = "front_flange_rim";
  front_flange_rim.rotation.y = Math.PI / 2;
  front_flange_rim.position.x = 0.092;
  body_group.add(front_flange_rim);

  const rear_flangeGeom = new THREE.CylinderGeometry(0.39, 0.39, 0.11, 48);
  const rear_flange = new THREE.Mesh(rear_flangeGeom, flangeMat);
  rear_flange.name = "rear_flange";
  rear_flange.rotation.z = -Math.PI / 2;
  rear_flange.position.x = -1.105;
  body_group.add(rear_flange);

  const rear_flange_faceGeom = new THREE.CylinderGeometry(0.355, 0.355, 0.018, 48);
  const rear_flange_face = new THREE.Mesh(rear_flange_faceGeom, flangeMat);
  rear_flange_face.name = "rear_flange_face";
  rear_flange_face.rotation.z = -Math.PI / 2;
  rear_flange_face.position.x = -1.166;
  body_group.add(rear_flange_face);

  const rear_flange_rimGeom = new THREE.TorusGeometry(0.358, 0.025, 10, 48);
  const rear_flange_rim = new THREE.Mesh(rear_flange_rimGeom, dark_edgeMat);
  rear_flange_rim.name = "rear_flange_rim";
  rear_flange_rim.rotation.y = Math.PI / 2;
  rear_flange_rim.position.x = -1.174;
  body_group.add(rear_flange_rim);

  const shoulder_bandGeom = new THREE.TorusGeometry(0.337, 0.018, 8, 48);
  const shoulder_band = new THREE.Mesh(shoulder_bandGeom, dark_rustMat);
  shoulder_band.name = "shoulder_band";
  shoulder_band.rotation.y = Math.PI / 2;
  shoulder_band.position.x = -0.105;
  body_group.add(shoulder_band);

  const rear_seam_bandGeom = new THREE.TorusGeometry(0.347, 0.014, 8, 48);
  const rear_seam_band = new THREE.Mesh(rear_seam_bandGeom, dark_rustMat);
  rear_seam_band.name = "rear_seam_band";
  rear_seam_band.rotation.y = Math.PI / 2;
  rear_seam_band.position.x = -0.985;
  body_group.add(rear_seam_band);

  const body_rust_patchesGeom = new THREE.CircleGeometry(1, 14);
  const body_rust_patches = new THREE.InstancedMesh(
    body_rust_patchesGeom,
    rustMat,
    30
  );
  body_rust_patches.name = "body_rust_patches";
  body_rust_patches.frustumCulled = false;

  const patchMatrix = new THREE.Matrix4();
  const patchPosition = new THREE.Vector3();
  const patchQuaternion = new THREE.Quaternion();
  const patchScale = new THREE.Vector3();
  const patchNormal = new THREE.Vector3();
  const patchForward = new THREE.Vector3(0, 0, 1);

  for (let i = 0; i < 30; i++) {
    const angle = i * 2.3999632297;
    const x = -1.015 + (((i * 17) % 31) / 30) * 0.88;
    const radius = 0.354;
    patchNormal.set(0, Math.cos(angle), Math.sin(angle));
    patchPosition.set(x, patchNormal.y * radius, patchNormal.z * radius);
    patchQuaternion.setFromUnitVectors(patchForward, patchNormal);
    patchScale.set(
      0.035 + ((i * 7) % 9) * 0.009,
      0.022 + ((i * 11) % 7) * 0.008,
      1
    );
    patchMatrix.compose(patchPosition, patchQuaternion, patchScale);
    body_rust_patches.setMatrixAt(i, patchMatrix);
  }
  body_rust_patches.instanceMatrix.needsUpdate = true;
  body_group.add(body_rust_patches);

  const body_patina_patchesGeom = new THREE.CircleGeometry(1, 14);
  const body_patina_patches = new THREE.InstancedMesh(
    body_patina_patchesGeom,
    patinaMat,
    18
  );
  body_patina_patches.name = "body_patina_patches";
  body_patina_patches.frustumCulled = false;

  for (let i = 0; i < 18; i++) {
    const angle = 0.7 + i * 2.173;
    const x = -1.0 + (((i * 13 + 5) % 19) / 18) * 0.84;
    const radius = 0.355;
    patchNormal.set(0, Math.cos(angle), Math.sin(angle));
    patchPosition.set(x, patchNormal.y * radius, patchNormal.z * radius);
    patchQuaternion.setFromUnitVectors(patchForward, patchNormal);
    patchScale.set(
      0.028 + ((i * 5) % 8) * 0.008,
      0.018 + ((i * 9) % 6) * 0.007,
      1
    );
    patchMatrix.compose(patchPosition, patchQuaternion, patchScale);
    body_patina_patches.setMatrixAt(i, patchMatrix);
  }
  body_patina_patches.instanceMatrix.needsUpdate = true;
  body_group.add(body_patina_patches);

  const body_oxidation_patchesGeom = new THREE.CircleGeometry(1, 12);
  const body_oxidation_patches = new THREE.InstancedMesh(
    body_oxidation_patchesGeom,
    oxidationMat,
    24
  );
  body_oxidation_patches.name = "body_oxidation_patches";
  body_oxidation_patches.frustumCulled = false;

  for (let i = 0; i < 24; i++) {
    const angle = 0.31 + i * 2.641;
    const x = -1.02 + (((i * 11 + 3) % 25) / 24) * 0.89;
    const radius = 0.356;
    patchNormal.set(0, Math.cos(angle), Math.sin(angle));
    patchPosition.set(x, patchNormal.y * radius, patchNormal.z * radius);
    patchQuaternion.setFromUnitVectors(patchForward, patchNormal);
    patchScale.set(
      0.012 + ((i * 7) % 8) * 0.005,
      0.009 + ((i * 5) % 7) * 0.004,
      1
    );
    patchMatrix.compose(patchPosition, patchQuaternion, patchScale);
    body_oxidation_patches.setMatrixAt(i, patchMatrix);
  }
  body_oxidation_patches.instanceMatrix.needsUpdate = true;
  body_group.add(body_oxidation_patches);

  const body_pittingGeom = new THREE.CircleGeometry(1, 8);
  const body_pitting = new THREE.InstancedMesh(body_pittingGeom, dark_rustMat, 34);
  body_pitting.name = "body_pitting";
  body_pitting.frustumCulled = false;

  for (let i = 0; i < 34; i++) {
    const angle = 1.1 + i * 1.731;
    const x = -1.01 + (((i * 19 + 2) % 35) / 34) * 0.87;
    const radius = 0.357;
    patchNormal.set(0, Math.cos(angle), Math.sin(angle));
    patchPosition.set(x, patchNormal.y * radius, patchNormal.z * radius);
    patchQuaternion.setFromUnitVectors(patchForward, patchNormal);
    const size = 0.006 + ((i * 3) % 6) * 0.002;
    patchScale.set(size * 1.3, size, 1);
    patchMatrix.compose(patchPosition, patchQuaternion, patchScale);
    body_pitting.setMatrixAt(i, patchMatrix);
  }
  body_pitting.instanceMatrix.needsUpdate = true;
  body_group.add(body_pitting);

  const front_face_rustGeom = new THREE.CircleGeometry(1, 12);
  const front_face_rust = new THREE.InstancedMesh(front_face_rustGeom, rustMat, 14);
  front_face_rust.name = "front_face_rust";
  front_face_rust.frustumCulled = false;
  const faceQuaternion = new THREE.Quaternion().setFromUnitVectors(
    new THREE.Vector3(0, 0, 1),
    new THREE.Vector3(1, 0, 0)
  );

  for (let i = 0; i < 14; i++) {
    const angle = i * 2.21;
    const radius = 0.075 + (((i * 7) % 13) / 12) * 0.27;
    patchPosition.set(
      0.098,
      Math.cos(angle) * radius,
      Math.sin(angle) * radius
    );
    patchScale.set(
      0.018 + ((i * 5) % 7) * 0.008,
      0.014 + ((i * 9) % 6) * 0.007,
      1
    );
    patchMatrix.compose(patchPosition, faceQuaternion, patchScale);
    front_face_rust.setMatrixAt(i, patchMatrix);
  }
  front_face_rust.instanceMatrix.needsUpdate = true;
  body_group.add(front_face_rust);

  const maker_labelGeom = new THREE.CircleGeometry(0.075, 24);
  const maker_label = new THREE.Mesh(maker_labelGeom, labelMat);
  maker_label.name = "maker_label";
  maker_label.rotation.x = -Math.PI / 2;
  maker_label.position.set(-0.63, 0.359, 0.025);
  maker_label.scale.set(1.45, 0.78, 1);
  body_group.add(maker_label);

  const maker_label_centerGeom = new THREE.CircleGeometry(0.038, 20);
  const maker_label_center = new THREE.Mesh(maker_label_centerGeom, label_centerMat);
  maker_label_center.name = "maker_label_center";
  maker_label_center.rotation.x = -Math.PI / 2;
  maker_label_center.position.set(-0.63, 0.361, 0.025);
  maker_label_center.scale.set(1.25, 0.72, 1);
  body_group.add(maker_label_center);

  const handle_socketGeom = new THREE.CylinderGeometry(0.18, 0.18, 0.13, 36);
  const handle_socket = new THREE.Mesh(handle_socketGeom, dark_rustMat);
  handle_socket.name = "handle_socket";
  handle_socket.rotation.z = -Math.PI / 2;
  handle_socket.position.x = 0.13;
  handle_group.add(handle_socket);

  const wooden_handleProfile = [
    new THREE.Vector2(0.00, 0.13),
    new THREE.Vector2(0.17, 0.13),
    new THREE.Vector2(0.17, 0.25),
    new THREE.Vector2(0.16, 0.50),
    new THREE.Vector2(0.145, 0.82),
    new THREE.Vector2(0.128, 1.12),
    new THREE.Vector2(0.112, 1.39),
    new THREE.Vector2(0.105, 1.49),
    new THREE.Vector2(0.00, 1.49)
  ];
  const wooden_handleGeom = new THREE.LatheGeometry(wooden_handleProfile, 40);
  const wooden_handle = new THREE.Mesh(wooden_handleGeom, woodMat);
  wooden_handle.name = "wooden_handle";
  wooden_handle.rotation.z = -Math.PI / 2;
  handle_group.add(wooden_handle);

  function handleRadiusAt(x) {
    const t = Math.max(0, Math.min(1, (x - 0.2) / 1.25));
    return 0.169 + (0.111 - 0.169) * t;
  }

  const wood_grain = new THREE.Group();
  wood_grain.name = "wood_grain";
  for (let i = 0; i < 12; i++) {
    const grainPoints = [];
    const baseAngle = i / 12 * Math.PI * 2;
    for (let j = 0; j <= 7; j++) {
      const t = j / 7;
      const x = 0.24 + t * 1.17;
      const angle = baseAngle + 0.025 * Math.sin(t * Math.PI * 3 + i * 0.7);
      const radius = handleRadiusAt(x) + 0.002;
      grainPoints.push(new THREE.Vector3(
        x,
        Math.cos(angle) * radius,
        Math.sin(angle) * radius
      ));
    }
    const grainCurve = new THREE.CatmullRomCurve3(grainPoints);
    const grainGeom = new THREE.TubeGeometry(grainCurve, 20, 0.0025, 5, false);
    const grain = new THREE.Mesh(grainGeom, wood_grainMat);
    wood_grain.add(grain);
  }
  handle_group.add(wood_grain);

  const copper_ferruleGeom = new THREE.CylinderGeometry(
    0.137,
    0.118,
    0.24,
    36,
    1,
    true
  );
  const copper_ferrule = new THREE.Mesh(copper_ferruleGeom, copperMat);
  copper_ferrule.name = "copper_ferrule";
  copper_ferrule.rotation.z = -Math.PI / 2;
  copper_ferrule.position.x = 1.56;
  handle_group.add(copper_ferrule);

  const ferrule_base_ringGeom = new THREE.TorusGeometry(0.119, 0.012, 8, 36);
  const ferrule_base_ring = new THREE.Mesh(ferrule_base_ringGeom, dark_copperMat);
  ferrule_base_ring.name = "ferrule_base_ring";
  ferrule_base_ring.rotation.y = Math.PI / 2;
  ferrule_base_ring.position.x = 1.445;
  handle_group.add(ferrule_base_ring);

  const ferrule_lipGeom = new THREE.TorusGeometry(0.124, 0.018, 10, 40);
  const ferrule_lip = new THREE.Mesh(ferrule_lipGeom, copperMat);
  ferrule_lip.name = "ferrule_lip";
  ferrule_lip.rotation.y = Math.PI / 2;
  ferrule_lip.position.x = 1.68;
  handle_group.add(ferrule_lip);

  const inner_boreGeom = new THREE.CylinderGeometry(
    0.106,
    0.096,
    0.105,
    32,
    1,
    true
  );
  const inner_bore = new THREE.Mesh(inner_boreGeom, dark_copperMat);
  inner_bore.name = "inner_bore";
  inner_bore.rotation.z = -Math.PI / 2;
  inner_bore.position.x = 1.627;
  handle_group.add(inner_bore);

  const bore_shadowGeom = new THREE.CircleGeometry(0.096, 32);
  const bore_shadow = new THREE.Mesh(bore_shadowGeom, boreMat);
  bore_shadow.name = "bore_shadow";
  bore_shadow.rotation.y = Math.PI / 2;
  bore_shadow.position.x = 1.573;
  handle_group.add(bore_shadow);

  const rivet_ringGeom = new THREE.CylinderGeometry(0.052, 0.052, 0.018, 24);
  const rivet_ring = new THREE.Mesh(rivet_ringGeom, dark_edgeMat);
  rivet_ring.name = "rivet_ring";
  rivet_ring.rotation.z = -Math.PI / 2;
  rivet_ring.position.set(0.105, 0.075, 0.045);
  body_group.add(rivet_ring);

  const rivet_headGeom = new THREE.CylinderGeometry(0.038, 0.038, 0.021, 24);
  const rivet_head = new THREE.Mesh(rivet_headGeom, rivetMat);
  rivet_head.name = "rivet_head";
  rivet_head.rotation.z = -Math.PI / 2;
  rivet_head.position.set(0.116, 0.075, 0.045);
  body_group.add(rivet_head);

  fitToUnitCube(root);
  return root;

  function fitToUnitCube(object) {
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