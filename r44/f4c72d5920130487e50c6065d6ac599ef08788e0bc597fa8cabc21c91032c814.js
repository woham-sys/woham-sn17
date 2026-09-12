// miner-diag: gpus=? tflops=? stream48=? power=? probe_tps=3831 cpu_quota=?/? net=? batch=3 wall=1521 seed=870128282
export default function generate(THREE) {
  const root = new THREE.Group();

  const chromeMat = new THREE.MeshStandardMaterial({
    color: 0xd4d4d4,
    metalness: 0.6,
    roughness: 0.2,
  });
  const silverMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25,
  });
  const darkMetalMat = new THREE.MeshStandardMaterial({
    color: 0x3a3a3a,
    metalness: 0.6,
    roughness: 0.5,
  });
  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0xe8f2f0,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
    side: THREE.DoubleSide,
    depthWrite: false,
  });
  const glassEdgeMat = new THREE.MeshPhysicalMaterial({
    color: 0xb9d2cc,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
    side: THREE.DoubleSide,
    depthWrite: false,
  });

  const globeRadius = 0.9;
  const globeCenter = new THREE.Vector3(0, 1.28, 0);

  const base_bottomGeom = new THREE.CylinderGeometry(0.68, 0.68, 0.06, 64);
  const base_bottom = new THREE.Mesh(base_bottomGeom, chromeMat);
  base_bottom.position.y = 0.03;
  root.add(base_bottom);

  const base_mainGeom = new THREE.CylinderGeometry(0.64, 0.66, 0.08, 64);
  const base_main = new THREE.Mesh(base_mainGeom, chromeMat);
  base_main.position.y = 0.09;
  root.add(base_main);

  const base_top_plateGeom = new THREE.CylinderGeometry(0.59, 0.62, 0.035, 64);
  const base_top_plate = new THREE.Mesh(base_top_plateGeom, silverMat);
  base_top_plate.position.y = 0.145;
  root.add(base_top_plate);

  const base_lower_trimGeom = new THREE.TorusGeometry(0.64, 0.018, 10, 64);
  const base_lower_trim = new THREE.Mesh(base_lower_trimGeom, chromeMat);
  base_lower_trim.rotation.x = Math.PI / 2;
  base_lower_trim.position.y = 0.065;
  root.add(base_lower_trim);

  const base_upper_trimGeom = new THREE.TorusGeometry(0.605, 0.014, 10, 64);
  const base_upper_trim = new THREE.Mesh(base_upper_trimGeom, chromeMat);
  base_upper_trim.rotation.x = Math.PI / 2;
  base_upper_trim.position.y = 0.137;
  root.add(base_upper_trim);

  const base_shadow_grooveGeom = new THREE.TorusGeometry(0.625, 0.006, 8, 64);
  const base_shadow_groove = new THREE.Mesh(base_shadow_grooveGeom, darkMetalMat);
  base_shadow_groove.rotation.x = Math.PI / 2;
  base_shadow_groove.position.y = 0.078;
  root.add(base_shadow_groove);

  const pedestalProfile = [
    new THREE.Vector2(0.00, 0.00),
    new THREE.Vector2(0.18, 0.00),
    new THREE.Vector2(0.20, 0.025),
    new THREE.Vector2(0.17, 0.060),
    new THREE.Vector2(0.11, 0.105),
    new THREE.Vector2(0.075, 0.180),
    new THREE.Vector2(0.075, 0.255),
    new THREE.Vector2(0.105, 0.300),
    new THREE.Vector2(0.105, 0.320),
    new THREE.Vector2(0.00, 0.320),
  ];
  const pedestalGeom = new THREE.LatheGeometry(pedestalProfile, 48);
  const pedestal = new THREE.Mesh(pedestalGeom, chromeMat);
  pedestal.position.y = 0.145;
  root.add(pedestal);

  const pedestal_collarGeom = new THREE.TorusGeometry(0.165, 0.018, 10, 48);
  const pedestal_collar = new THREE.Mesh(pedestal_collarGeom, chromeMat);
  pedestal_collar.rotation.x = Math.PI / 2;
  pedestal_collar.position.y = 0.19;
  root.add(pedestal_collar);

  const pedestal_neck_ringGeom = new THREE.TorusGeometry(0.083, 0.012, 10, 40);
  const pedestal_neck_ring = new THREE.Mesh(pedestal_neck_ringGeom, chromeMat);
  pedestal_neck_ring.rotation.x = Math.PI / 2;
  pedestal_neck_ring.position.y = 0.445;
  root.add(pedestal_neck_ring);

  const globe_mountGeom = new THREE.CylinderGeometry(0.09, 0.11, 0.12, 40);
  const globe_mount = new THREE.Mesh(globe_mountGeom, chromeMat);
  globe_mount.position.y = 0.34;
  root.add(globe_mount);

  const glass_globeGeom = new THREE.SphereGeometry(globeRadius, 64, 32);
  const glass_globe = new THREE.Mesh(glass_globeGeom, glassMat);
  glass_globe.position.copy(globeCenter);
  root.add(glass_globe);

  const glass_equator_rimGeom = new THREE.TorusGeometry(0.89, 0.012, 10, 96);
  const glass_equator_rim = new THREE.Mesh(glass_equator_rimGeom, glassEdgeMat);
  glass_equator_rim.rotation.x = Math.PI / 2;
  glass_equator_rim.position.copy(globeCenter);
  root.add(glass_equator_rim);

  const meridianPoints = [];
  const meridianRadius = 0.94;
  const meridianStart = -2.25;
  const meridianEnd = 2.25;
  for (let i = 0; i <= 48; i++) {
    const t = i / 48;
    const angle = meridianStart + (meridianEnd - meridianStart) * t;
    meridianPoints.push(new THREE.Vector3(
      Math.cos(angle) * meridianRadius,
      globeCenter.y + Math.sin(angle) * meridianRadius,
      -0.025
    ));
  }
  const meridianCurve = new THREE.CatmullRomCurve3(
    meridianPoints,
    false,
    "centripetal"
  );
  const meridian_ringGeom = new THREE.TubeGeometry(
    meridianCurve,
    96,
    0.035,
    12,
    false
  );
  const meridian_ring = new THREE.Mesh(meridian_ringGeom, chromeMat);
  root.add(meridian_ring);

  const meridian_inlayGeom = new THREE.TubeGeometry(
    meridianCurve,
    96,
    0.014,
    8,
    false
  );
  const meridian_inlay = new THREE.Mesh(meridian_inlayGeom, darkMetalMat);
  meridian_inlay.position.z = 0.025;
  root.add(meridian_inlay);

  const meridian_finialGeom = new THREE.SphereGeometry(0.068, 24, 16);

  const left_finial = new THREE.Mesh(meridian_finialGeom, chromeMat);
  left_finial.position.copy(meridianPoints[0]);
  root.add(left_finial);

  const right_finial = new THREE.Mesh(meridian_finialGeom, chromeMat);
  right_finial.position.copy(meridianPoints[meridianPoints.length - 1]);
  root.add(right_finial);

  const internalAxisStart = new THREE.Vector3(-0.52, 0.69, 0.20);
  const internalAxisEnd = new THREE.Vector3(0.58, 1.57, 0.20);
  const internalAxisDirection = new THREE.Vector3()
    .subVectors(internalAxisEnd, internalAxisStart)
    .normalize();
  const internalAxisMidpoint = new THREE.Vector3()
    .addVectors(internalAxisStart, internalAxisEnd)
    .multiplyScalar(0.5);

  const internal_axis_rodGeom = new THREE.TubeGeometry(
    new THREE.LineCurve3(internalAxisStart, internalAxisEnd),
    24,
    0.022,
    12,
    false
  );
  const internal_axis_rod = new THREE.Mesh(internal_axis_rodGeom, chromeMat);
  root.add(internal_axis_rod);

  const axis_collarGeom = new THREE.CylinderGeometry(0.052, 0.052, 0.035, 24);

  const axis_lower_collar = new THREE.Mesh(axis_collarGeom, silverMat);
  axis_lower_collar.position.copy(internalAxisStart).lerp(internalAxisMidpoint, 0.18);
  axis_lower_collar.quaternion.setFromUnitVectors(
    new THREE.Vector3(0, 1, 0),
    internalAxisDirection
  );
  root.add(axis_lower_collar);

  const axis_upper_collar = new THREE.Mesh(axis_collarGeom, silverMat);
  axis_upper_collar.position.copy(internalAxisStart).lerp(internalAxisMidpoint, 0.82);
  axis_upper_collar.quaternion.setFromUnitVectors(
    new THREE.Vector3(0, 1, 0),
    internalAxisDirection
  );
  root.add(axis_upper_collar);

  const axis_end_capGeom = new THREE.CylinderGeometry(0.034, 0.034, 0.045, 20);

  const axis_start_cap = new THREE.Mesh(axis_end_capGeom, chromeMat);
  axis_start_cap.position.copy(internalAxisStart);
  axis_start_cap.quaternion.setFromUnitVectors(
    new THREE.Vector3(0, 1, 0),
    internalAxisDirection
  );
  root.add(axis_start_cap);

  const axis_end_cap = new THREE.Mesh(axis_end_capGeom, chromeMat);
  axis_end_cap.position.copy(internalAxisEnd);
  axis_end_cap.quaternion.setFromUnitVectors(
    new THREE.Vector3(0, 1, 0),
    internalAxisDirection
  );
  root.add(axis_end_cap);

  const central_pivot_backGeom = new THREE.CylinderGeometry(0.088, 0.088, 0.026, 32);
  const central_pivot_back = new THREE.Mesh(central_pivot_backGeom, darkMetalMat);
  central_pivot_back.rotation.x = Math.PI / 2;
  central_pivot_back.position.set(0, 1.13, 0.245);
  root.add(central_pivot_back);

  const central_pivotGeom = new THREE.CylinderGeometry(0.072, 0.072, 0.045, 32);
  const central_pivot = new THREE.Mesh(central_pivotGeom, chromeMat);
  central_pivot.rotation.x = Math.PI / 2;
  central_pivot.position.set(0, 1.13, 0.27);
  root.add(central_pivot);

  const central_pivot_capGeom = new THREE.CylinderGeometry(0.038, 0.038, 0.052, 24);
  const central_pivot_cap = new THREE.Mesh(central_pivot_capGeom, silverMat);
  central_pivot_cap.rotation.x = Math.PI / 2;
  central_pivot_cap.position.set(0, 1.13, 0.294);
  root.add(central_pivot_cap);

  const central_pivot_screwGeom = new THREE.CylinderGeometry(0.014, 0.014, 0.056, 16);
  const central_pivot_screw = new THREE.Mesh(central_pivot_screwGeom, darkMetalMat);
  central_pivot_screw.rotation.x = Math.PI / 2;
  central_pivot_screw.position.set(0, 1.13, 0.302);
  root.add(central_pivot_screw);

  const bottom_connectorGeom = new THREE.CylinderGeometry(0.075, 0.09, 0.10, 32);
  const bottom_connector = new THREE.Mesh(bottom_connectorGeom, chromeMat);
  bottom_connector.position.set(0, 0.39, 0.02);
  root.add(bottom_connector);

  const bottom_connector_ringGeom = new THREE.TorusGeometry(0.078, 0.012, 10, 40);
  const bottom_connector_ring = new THREE.Mesh(bottom_connector_ringGeom, silverMat);
  bottom_connector_ring.rotation.x = Math.PI / 2;
  bottom_connector_ring.position.set(0, 0.44, 0.02);
  root.add(bottom_connector_ring);

  const topNormal = new THREE.Vector3(0.36, 0.93, 0).normalize();
  const topSurface = globeCenter.clone().addScaledVector(topNormal, globeRadius);
  const topAxisQuaternion = new THREE.Quaternion().setFromUnitVectors(
    new THREE.Vector3(0, 1, 0),
    topNormal
  );

  const top_mount_baseGeom = new THREE.CylinderGeometry(0.105, 0.105, 0.035, 32);
  const top_mount_base = new THREE.Mesh(top_mount_baseGeom, chromeMat);
  top_mount_base.position.copy(topSurface).addScaledVector(topNormal, 0.018);
  top_mount_base.quaternion.copy(topAxisQuaternion);
  root.add(top_mount_base);

  const top_mount_collarGeom = new THREE.CylinderGeometry(0.075, 0.09, 0.055, 32);
  const top_mount_collar = new THREE.Mesh(top_mount_collarGeom, silverMat);
  top_mount_collar.position.copy(topSurface).addScaledVector(topNormal, 0.055);
  top_mount_collar.quaternion.copy(topAxisQuaternion);
  root.add(top_mount_collar);

  const top_mount_neckGeom = new THREE.CylinderGeometry(0.045, 0.055, 0.085, 24);
  const top_mount_neck = new THREE.Mesh(top_mount_neckGeom, chromeMat);
  top_mount_neck.position.copy(topSurface).addScaledVector(topNormal, 0.115);
  top_mount_neck.quaternion.copy(topAxisQuaternion);
  root.add(top_mount_neck);

  const top_mount_finialGeom = new THREE.SphereGeometry(0.072, 24, 16);
  const top_mount_finial = new THREE.Mesh(top_mount_finialGeom, chromeMat);
  top_mount_finial.position.copy(topSurface).addScaledVector(topNormal, 0.19);
  root.add(top_mount_finial);

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