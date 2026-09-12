// miner-diag: gpus=? tflops=? stream48=? power=? probe_tps=3831 cpu_quota=?/? net=? batch=2 wall=1559 seed=870128282
export default function generate(THREE) {
  const root = new THREE.Group();
  const bottle_group = new THREE.Group();
  const closure_group = new THREE.Group();
  root.add(bottle_group, closure_group);

  const bottle_bodyMat = new THREE.MeshPhysicalMaterial({
    color: 0x8a6b08,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
    side: THREE.DoubleSide,
  });

  const dark_glassMat = new THREE.MeshPhysicalMaterial({
    color: 0x241c05,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
    side: THREE.DoubleSide,
  });

  const cap_bodyMat = new THREE.MeshStandardMaterial({
    color: 0x111111,
    metalness: 0.0,
    roughness: 0.3,
  });

  const cap_ribsMat = new THREE.MeshStandardMaterial({
    color: 0x292929,
    metalness: 0.0,
    roughness: 0.3,
  });

  const bottle_bodyProfile = [
    new THREE.Vector2(0.000, 0.000),
    new THREE.Vector2(0.270, 0.000),
    new THREE.Vector2(0.315, 0.012),
    new THREE.Vector2(0.350, 0.040),
    new THREE.Vector2(0.382, 0.095),
    new THREE.Vector2(0.408, 0.180),
    new THREE.Vector2(0.425, 0.290),
    new THREE.Vector2(0.430, 0.410),
    new THREE.Vector2(0.423, 0.535),
    new THREE.Vector2(0.402, 0.650),
    new THREE.Vector2(0.365, 0.755),
    new THREE.Vector2(0.315, 0.845),
    new THREE.Vector2(0.255, 0.925),
    new THREE.Vector2(0.190, 0.990),
    new THREE.Vector2(0.145, 1.045),
    new THREE.Vector2(0.125, 1.105),
    new THREE.Vector2(0.122, 1.280),
    new THREE.Vector2(0.128, 1.320),
    new THREE.Vector2(0.000, 1.320),
  ];
  const bottle_bodyGeom = new THREE.LatheGeometry(bottle_bodyProfile, 64);
  const bottle_body = new THREE.Mesh(bottle_bodyGeom, bottle_bodyMat);
  bottle_group.add(bottle_body);

  const thick_glass_baseGeom = new THREE.TorusGeometry(0.300, 0.027, 12, 64);
  const thick_glass_base = new THREE.Mesh(thick_glass_baseGeom, dark_glassMat);
  thick_glass_base.rotation.x = Math.PI / 2;
  thick_glass_base.position.y = 0.030;
  bottle_group.add(thick_glass_base);

  const punt_ringGeom = new THREE.TorusGeometry(0.145, 0.014, 10, 48);
  const punt_ring = new THREE.Mesh(punt_ringGeom, dark_glassMat);
  punt_ring.rotation.x = Math.PI / 2;
  punt_ring.position.y = 0.047;
  bottle_group.add(punt_ring);

  const neck_finishGeom = new THREE.TorusGeometry(0.124, 0.011, 10, 48);
  const neck_finish = new THREE.Mesh(neck_finishGeom, dark_glassMat);
  neck_finish.rotation.x = Math.PI / 2;
  neck_finish.position.y = 1.278;
  bottle_group.add(neck_finish);

  const closure_baseGeom = new THREE.CylinderGeometry(0.165, 0.158, 0.055, 48);
  const closure_base = new THREE.Mesh(closure_baseGeom, cap_bodyMat);
  closure_base.position.y = 1.302;
  closure_group.add(closure_base);

  const closure_base_ringGeom = new THREE.TorusGeometry(0.148, 0.018, 12, 48);
  const closure_base_ring = new THREE.Mesh(closure_base_ringGeom, cap_bodyMat);
  closure_base_ring.rotation.x = Math.PI / 2;
  closure_base_ring.position.y = 1.318;
  closure_group.add(closure_base_ring);

  const closure_bodyProfile = [
    new THREE.Vector2(0.000, 0.000),
    new THREE.Vector2(0.145, 0.000),
    new THREE.Vector2(0.165, 0.012),
    new THREE.Vector2(0.170, 0.035),
    new THREE.Vector2(0.158, 0.055),
    new THREE.Vector2(0.143, 0.072),
    new THREE.Vector2(0.140, 0.095),
    new THREE.Vector2(0.151, 0.115),
    new THREE.Vector2(0.158, 0.140),
    new THREE.Vector2(0.150, 0.165),
    new THREE.Vector2(0.132, 0.184),
    new THREE.Vector2(0.000, 0.190),
  ];
  const closure_bodyGeom = new THREE.LatheGeometry(closure_bodyProfile, 48);
  const closure_body = new THREE.Mesh(closure_bodyGeom, cap_bodyMat);
  closure_body.position.y = 1.310;
  closure_group.add(closure_body);

  const closure_ringGeom = new THREE.TorusGeometry(0.145, 0.011, 10, 48);
  const closure_rings = new THREE.InstancedMesh(closure_ringGeom, cap_bodyMat, 3);
  const closure_ring_dummy = new THREE.Object3D();
  const closure_ring_heights = [1.382, 1.444, 1.486];
  for (let i = 0; i < closure_ring_heights.length; i++) {
    closure_ring_dummy.position.set(0, closure_ring_heights[i], 0);
    closure_ring_dummy.rotation.set(Math.PI / 2, 0, 0);
    closure_ring_dummy.updateMatrix();
    closure_rings.setMatrixAt(i, closure_ring_dummy.matrix);
  }
  closure_rings.instanceMatrix.needsUpdate = true;
  closure_group.add(closure_rings);

  const cap_bodyProfile = [
    new THREE.Vector2(0.000, 0.000),
    new THREE.Vector2(0.145, 0.000),
    new THREE.Vector2(0.168, 0.010),
    new THREE.Vector2(0.177, 0.027),
    new THREE.Vector2(0.177, 0.104),
    new THREE.Vector2(0.171, 0.128),
    new THREE.Vector2(0.154, 0.145),
    new THREE.Vector2(0.000, 0.150),
  ];
  const cap_bodyGeom = new THREE.LatheGeometry(cap_bodyProfile, 64);
  const cap_body = new THREE.Mesh(cap_bodyGeom, cap_bodyMat);
  cap_body.position.y = 1.490;
  closure_group.add(cap_body);

  const cap_lower_bandGeom = new THREE.TorusGeometry(0.164, 0.012, 10, 64);
  const cap_lower_band = new THREE.Mesh(cap_lower_bandGeom, cap_bodyMat);
  cap_lower_band.rotation.x = Math.PI / 2;
  cap_lower_band.position.y = 1.505;
  closure_group.add(cap_lower_band);

  const cap_ribsGeom = new THREE.BoxGeometry(0.008, 0.078, 0.014);
  const cap_ribs = new THREE.InstancedMesh(cap_ribsGeom, cap_ribsMat, 40);
  const cap_rib_dummy = new THREE.Object3D();
  for (let i = 0; i < 40; i++) {
    const angle = i / 40 * Math.PI * 2;
    cap_rib_dummy.position.set(
      Math.cos(angle) * 0.178,
      1.558,
      Math.sin(angle) * 0.178
    );
    cap_rib_dummy.rotation.set(0, Math.PI / 2 - angle, 0);
    cap_rib_dummy.updateMatrix();
    cap_ribs.setMatrixAt(i, cap_rib_dummy.matrix);
  }
  cap_ribs.instanceMatrix.needsUpdate = true;
  closure_group.add(cap_ribs);

  const cap_topGeom = new THREE.CylinderGeometry(0.153, 0.169, 0.018, 64);
  const cap_top = new THREE.Mesh(cap_topGeom, cap_bodyMat);
  cap_top.position.y = 1.640;
  closure_group.add(cap_top);

  const cap_top_rimGeom = new THREE.TorusGeometry(0.153, 0.008, 10, 64);
  const cap_top_rim = new THREE.Mesh(cap_top_rimGeom, cap_bodyMat);
  cap_top_rim.rotation.x = Math.PI / 2;
  cap_top_rim.position.y = 1.646;
  closure_group.add(cap_top_rim);

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

  fitToUnitCube(root);
  return root;
}