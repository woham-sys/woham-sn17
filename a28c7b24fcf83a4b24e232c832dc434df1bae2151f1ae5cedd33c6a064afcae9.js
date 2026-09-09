function __sn17_user(THREE) {
  const root = new THREE.Group();
  const jar_assembly = new THREE.Group();
  const lid_assembly = new THREE.Group();
  root.add(jar_assembly, lid_assembly);

  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0xe8f2ea,
    transparent: true,
    opacity: 0.34,
    thickness: 0.06,
    side: THREE.DoubleSide,
    depthWrite: false
  });

  const glass_edgeMat = new THREE.MeshPhysicalMaterial({
    color: 0xb8cbb7,
    transparent: true,
    opacity: 0.48,
    thickness: 0.08,
    side: THREE.DoubleSide,
    depthWrite: false
  });

  const silverMat = new THREE.MeshStandardMaterial({
    color: 0xc8c8c3,
    metalness: true,
    roughness: 0.3
  });

  const polished_silverMat = new THREE.MeshStandardMaterial({
    color: 0xd8d8d3,
    metalness: true,
    roughness: 0.22
  });

  const dark_grooveMat = new THREE.MeshStandardMaterial({
    color: 0x6f706d,
    metalness: true,
    roughness: 0.5
  });

  const body_profile = [
    new THREE.Vector2(0.00, -0.580),
    new THREE.Vector2(0.18, -0.595),
    new THREE.Vector2(0.29, -0.580),
    new THREE.Vector2(0.35, -0.530),
    new THREE.Vector2(0.38, -0.430),
    new THREE.Vector2(0.39, -0.250),
    new THREE.Vector2(0.39, 0.220),
    new THREE.Vector2(0.38, 0.340),
    new THREE.Vector2(0.35, 0.430),
    new THREE.Vector2(0.33, 0.470),
    new THREE.Vector2(0.33, 0.510),
    new THREE.Vector2(0.29, 0.510),
    new THREE.Vector2(0.29, 0.470),
    new THREE.Vector2(0.31, 0.430),
    new THREE.Vector2(0.34, 0.340),
    new THREE.Vector2(0.35, 0.220),
    new THREE.Vector2(0.35, -0.250),
    new THREE.Vector2(0.34, -0.400),
    new THREE.Vector2(0.31, -0.480),
    new THREE.Vector2(0.25, -0.520),
    new THREE.Vector2(0.12, -0.535),
    new THREE.Vector2(0.00, -0.535)
  ];
  const jar_bodyGeom = new THREE.LatheGeometry(body_profile, 96);
  const jar_body = new THREE.Mesh(jar_bodyGeom, glassMat);
  jar_assembly.add(jar_body);

  const bottom_glassGeom = new THREE.CylinderGeometry(0.27, 0.31, 0.045, 96);
  const bottom_glass = new THREE.Mesh(bottom_glassGeom, glass_edgeMat);
  bottom_glass.position.y = -0.545;
  jar_assembly.add(bottom_glass);

  const bottom_outer_ringGeom = new THREE.TorusGeometry(0.315, 0.018, 12, 96);
  const bottom_outer_ring = new THREE.Mesh(bottom_outer_ringGeom, glass_edgeMat);
  bottom_outer_ring.rotation.x = Math.PI / 2;
  bottom_outer_ring.position.y = -0.555;
  jar_assembly.add(bottom_outer_ring);

  const bottom_inner_ringGeom = new THREE.TorusGeometry(0.235, 0.009, 10, 80);
  const bottom_inner_ring = new THREE.Mesh(bottom_inner_ringGeom, glass_edgeMat);
  bottom_inner_ring.rotation.x = Math.PI / 2;
  bottom_inner_ring.position.y = -0.515;
  jar_assembly.add(bottom_inner_ring);

  const neck_thread_lowerGeom = new THREE.TorusGeometry(0.347, 0.007, 8, 96);
  const neck_thread_lower = new THREE.Mesh(neck_thread_lowerGeom, glass_edgeMat);
  neck_thread_lower.rotation.x = Math.PI / 2;
  neck_thread_lower.position.y = 0.405;
  jar_assembly.add(neck_thread_lower);

  const neck_thread_middleGeom = new THREE.TorusGeometry(0.350, 0.007, 8, 96);
  const neck_thread_middle = new THREE.Mesh(neck_thread_middleGeom, glass_edgeMat);
  neck_thread_middle.rotation.x = Math.PI / 2;
  neck_thread_middle.position.y = 0.430;
  jar_assembly.add(neck_thread_middle);

  const neck_thread_upperGeom = new THREE.TorusGeometry(0.350, 0.008, 8, 96);
  const neck_thread_upper = new THREE.Mesh(neck_thread_upperGeom, glass_edgeMat);
  neck_thread_upper.rotation.x = Math.PI / 2;
  neck_thread_upper.position.y = 0.455;
  jar_assembly.add(neck_thread_upper);

  const mouth_lipGeom = new THREE.TorusGeometry(0.340, 0.025, 16, 96);
  const mouth_lip = new THREE.Mesh(mouth_lipGeom, glass_edgeMat);
  mouth_lip.rotation.x = Math.PI / 2;
  mouth_lip.position.y = 0.485;
  jar_assembly.add(mouth_lip);

  const handle_points = [
    new THREE.Vector3(0.350, 0.315, 0),
    new THREE.Vector3(0.475, 0.335, 0),
    new THREE.Vector3(0.610, 0.270, 0),
    new THREE.Vector3(0.690, 0.110, 0),
    new THREE.Vector3(0.690, -0.100, 0),
    new THREE.Vector3(0.610, -0.270, 0),
    new THREE.Vector3(0.480, -0.340, 0),
    new THREE.Vector3(0.355, -0.300, 0)
  ];
  const handle_curve = new THREE.CatmullRomCurve3(handle_points, false, "centripetal");
  const handleGeom = new THREE.TubeGeometry(handle_curve, 64, 0.047, 16, false);

  const right_handle = new THREE.Mesh(handleGeom, glassMat);
  jar_assembly.add(right_handle);

  const left_handle = new THREE.Mesh(handleGeom, glassMat);
  left_handle.rotation.y = Math.PI;
  jar_assembly.add(left_handle);

  const handle_mountGeom = new THREE.SphereGeometry(0.075, 24, 16);
  const handle_mounts = new THREE.InstancedMesh(handle_mountGeom, glass_edgeMat, 4);
  const mount_dummy = new THREE.Object3D();
  const mount_positions = [
    [0.365, 0.310, 0],
    [0.365, -0.295, 0],
    [-0.365, 0.310, 0],
    [-0.365, -0.295, 0]
  ];
  for (let i = 0; i < mount_positions.length; i++) {
    mount_dummy.position.set(mount_positions[i][0], mount_positions[i][1], mount_positions[i][2]);
    mount_dummy.scale.set(0.72, 1.18, 0.82);
    mount_dummy.updateMatrix();
    handle_mounts.setMatrixAt(i, mount_dummy.matrix);
  }
  handle_mounts.instanceMatrix.needsUpdate = true;
  jar_assembly.add(handle_mounts);

  const lower_lid_bandGeom = new THREE.CylinderGeometry(0.382, 0.370, 0.105, 96);
  const lower_lid_band = new THREE.Mesh(lower_lid_bandGeom, silverMat);
  lower_lid_band.position.y = 0.535;
  lid_assembly.add(lower_lid_band);

  const lower_lid_flangeGeom = new THREE.TorusGeometry(0.372, 0.020, 14, 96);
  const lower_lid_flange = new THREE.Mesh(lower_lid_flangeGeom, polished_silverMat);
  lower_lid_flange.rotation.x = Math.PI / 2;
  lower_lid_flange.position.y = 0.488;
  lid_assembly.add(lower_lid_flange);

  const lower_band_top_seamGeom = new THREE.TorusGeometry(0.374, 0.009, 10, 96);
  const lower_band_top_seam = new THREE.Mesh(lower_band_top_seamGeom, polished_silverMat);
  lower_band_top_seam.rotation.x = Math.PI / 2;
  lower_band_top_seam.position.y = 0.584;
  lid_assembly.add(lower_band_top_seam);

  const lid_shadow_gapGeom = new THREE.TorusGeometry(0.373, 0.006, 8, 96);
  const lid_shadow_gap = new THREE.Mesh(lid_shadow_gapGeom, dark_grooveMat);
  lid_shadow_gap.rotation.x = Math.PI / 2;
  lid_shadow_gap.position.y = 0.594;
  lid_assembly.add(lid_shadow_gap);

  const upper_lid_skirtGeom = new THREE.CylinderGeometry(0.390, 0.383, 0.112, 96);
  const upper_lid_skirt = new THREE.Mesh(upper_lid_skirtGeom, silverMat);
  upper_lid_skirt.position.y = 0.646;
  lid_assembly.add(upper_lid_skirt);

  const upper_lid_base_ringGeom = new THREE.TorusGeometry(0.382, 0.010, 10, 96);
  const upper_lid_base_ring = new THREE.Mesh(upper_lid_base_ringGeom, polished_silverMat);
  upper_lid_base_ring.rotation.x = Math.PI / 2;
  upper_lid_base_ring.position.y = 0.598;
  lid_assembly.add(upper_lid_base_ring);

  const knurl_ribGeom = new THREE.BoxGeometry(0.010, 0.074, 0.018);
  const knurl_ribs = new THREE.InstancedMesh(knurl_ribGeom, polished_silverMat, 72);
  const rib_dummy = new THREE.Object3D();
  for (let i = 0; i < 72; i++) {
    const angle = i / 72 * Math.PI * 2;
    const radius = 0.392;
    rib_dummy.position.set(Math.cos(angle) * radius, 0.646, Math.sin(angle) * radius);
    rib_dummy.rotation.set(0, Math.PI / 2 - angle, 0);
    rib_dummy.scale.set(1, 1, 1);
    rib_dummy.updateMatrix();
    knurl_ribs.setMatrixAt(i, rib_dummy.matrix);
  }
  knurl_ribs.instanceMatrix.needsUpdate = true;
  lid_assembly.add(knurl_ribs);

  const top_capGeom = new THREE.CylinderGeometry(0.350, 0.388, 0.052, 96);
  const top_cap = new THREE.Mesh(top_capGeom, polished_silverMat);
  top_cap.position.y = 0.720;
  lid_assembly.add(top_cap);

  const top_recessGeom = new THREE.CylinderGeometry(0.292, 0.292, 0.008, 96);
  const top_recess = new THREE.Mesh(top_recessGeom, silverMat);
  top_recess.position.y = 0.749;
  lid_assembly.add(top_recess);

  const top_outer_rimGeom = new THREE.TorusGeometry(0.348, 0.014, 12, 96);
  const top_outer_rim = new THREE.Mesh(top_outer_rimGeom, polished_silverMat);
  top_outer_rim.rotation.x = Math.PI / 2;
  top_outer_rim.position.y = 0.746;
  lid_assembly.add(top_outer_rim);

  const top_inner_grooveGeom = new THREE.TorusGeometry(0.286, 0.006, 8, 96);
  const top_inner_groove = new THREE.Mesh(top_inner_grooveGeom, dark_grooveMat);
  top_inner_groove.rotation.x = Math.PI / 2;
  top_inner_groove.position.y = 0.754;
  lid_assembly.add(top_inner_groove);

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
    const scale = 0.98 / maxDim;
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
