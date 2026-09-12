// miner-diag: gpus=? tflops=? stream48=? power=? probe_tps=3831 cpu_quota=?/? net=? batch=2 wall=1559 seed=870128282
export default function generate(THREE) {
  const root = new THREE.Group();

  const bottle_bodyMat = new THREE.MeshPhysicalMaterial({
    color: 0x28aee8,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
    opacity: 0.72,
    side: THREE.DoubleSide,
  });

  const dark_glassMat = new THREE.MeshPhysicalMaterial({
    color: 0x07549c,
    metalness: 0.0,
    roughness: 0.08,
    transmission: 0.55,
    ior: 1.5,
    transparent: true,
    opacity: 0.82,
    side: THREE.DoubleSide,
  });

  const capMat = new THREE.MeshStandardMaterial({
    color: 0x0068b9,
    metalness: 0.6,
    roughness: 0.2,
  });

  const cap_darkMat = new THREE.MeshStandardMaterial({
    color: 0x004a88,
    metalness: 0.6,
    roughness: 0.22,
  });

  const highlightMat = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.24,
    side: THREE.DoubleSide,
  });

  const bottle_bodyProfile = [
    new THREE.Vector2(0.000, 0.000),
    new THREE.Vector2(0.220, 0.000),
    new THREE.Vector2(0.285, 0.018),
    new THREE.Vector2(0.315, 0.060),
    new THREE.Vector2(0.325, 0.140),
    new THREE.Vector2(0.325, 0.760),
    new THREE.Vector2(0.318, 0.900),
    new THREE.Vector2(0.295, 1.040),
    new THREE.Vector2(0.255, 1.180),
    new THREE.Vector2(0.205, 1.320),
    new THREE.Vector2(0.158, 1.455),
    new THREE.Vector2(0.128, 1.575),
    new THREE.Vector2(0.118, 1.680),
    new THREE.Vector2(0.118, 1.860),
    new THREE.Vector2(0.000, 1.860),
  ];
  const bottle_bodyGeom = new THREE.LatheGeometry(bottle_bodyProfile, 64);
  const bottle_body = new THREE.Mesh(bottle_bodyGeom, bottle_bodyMat);
  root.add(bottle_body);

  const bottom_glass_ringGeom = new THREE.TorusGeometry(0.278, 0.026, 12, 64);
  const bottom_glass_ring = new THREE.Mesh(bottom_glass_ringGeom, dark_glassMat);
  bottom_glass_ring.rotation.x = Math.PI / 2;
  bottom_glass_ring.position.y = 0.045;
  root.add(bottom_glass_ring);

  const bottom_puntGeom = new THREE.TorusGeometry(0.145, 0.014, 10, 48);
  const bottom_punt = new THREE.Mesh(bottom_puntGeom, dark_glassMat);
  bottom_punt.rotation.x = Math.PI / 2;
  bottom_punt.position.y = 0.075;
  root.add(bottom_punt);

  const bottom_punt_domeGeom = new THREE.SphereGeometry(0.13, 32, 12);
  const bottom_punt_dome = new THREE.Mesh(bottom_punt_domeGeom, dark_glassMat);
  bottom_punt_dome.scale.set(1, 0.18, 1);
  bottom_punt_dome.position.y = 0.082;
  root.add(bottom_punt_dome);

  const neck_glass_ringGeom = new THREE.TorusGeometry(0.112, 0.008, 10, 48);
  const neck_glass_ring = new THREE.Mesh(neck_glass_ringGeom, dark_glassMat);
  neck_glass_ring.rotation.x = Math.PI / 2;
  neck_glass_ring.position.y = 1.665;
  root.add(neck_glass_ring);

  const capProfile = [
    new THREE.Vector2(0.000, 1.665),
    new THREE.Vector2(0.128, 1.665),
    new THREE.Vector2(0.132, 1.700),
    new THREE.Vector2(0.132, 2.030),
    new THREE.Vector2(0.145, 2.045),
    new THREE.Vector2(0.145, 2.125),
    new THREE.Vector2(0.132, 2.145),
    new THREE.Vector2(0.130, 2.205),
    new THREE.Vector2(0.116, 2.225),
    new THREE.Vector2(0.000, 2.225),
  ];
  const capGeom = new THREE.LatheGeometry(capProfile, 64);
  const cap = new THREE.Mesh(capGeom, capMat);
  root.add(cap);

  const cap_lower_bandGeom = new THREE.TorusGeometry(0.128, 0.008, 10, 48);
  const cap_lower_band = new THREE.Mesh(cap_lower_bandGeom, cap_darkMat);
  cap_lower_band.rotation.x = Math.PI / 2;
  cap_lower_band.position.y = 1.685;
  root.add(cap_lower_band);

  const cap_middle_bandGeom = new THREE.TorusGeometry(0.137, 0.012, 12, 64);
  const cap_middle_band = new THREE.Mesh(cap_middle_bandGeom, cap_darkMat);
  cap_middle_band.rotation.x = Math.PI / 2;
  cap_middle_band.position.y = 2.055;
  root.add(cap_middle_band);

  const cap_top_ringGeom = new THREE.TorusGeometry(0.122, 0.010, 12, 64);
  const cap_top_ring = new THREE.Mesh(cap_top_ringGeom, cap_darkMat);
  cap_top_ring.rotation.x = Math.PI / 2;
  cap_top_ring.position.y = 2.205;
  root.add(cap_top_ring);

  const cap_top_discGeom = new THREE.CylinderGeometry(0.112, 0.118, 0.012, 48);
  const cap_top_disc = new THREE.Mesh(cap_top_discGeom, capMat);
  cap_top_disc.position.y = 2.226;
  root.add(cap_top_disc);

  function bodyRadiusAt(y) {
    if (y < 0.14) return 0.315;
    if (y < 0.78) return 0.325;
    if (y < 0.95) return 0.315;
    if (y < 1.10) return 0.285;
    if (y < 1.25) return 0.235;
    if (y < 1.40) return 0.180;
    if (y < 1.55) return 0.140;
    return 0.120;
  }

  function surfacePoint(angle, y, extra) {
    const r = bodyRadiusAt(y) + extra;
    return new THREE.Vector3(Math.cos(angle) * r, y, Math.sin(angle) * r);
  }

  const left_highlightPoints = [
    surfacePoint(2.35, 0.18, 0.008),
    surfacePoint(2.35, 0.55, 0.008),
    surfacePoint(2.35, 0.90, 0.008),
    surfacePoint(2.35, 1.15, 0.008),
    surfacePoint(2.35, 1.38, 0.008),
    surfacePoint(2.35, 1.58, 0.008),
  ];
  const left_highlightGeom = new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3(left_highlightPoints),
    36,
    0.010,
    8,
    false
  );
  const left_highlight = new THREE.Mesh(left_highlightGeom, highlightMat);
  root.add(left_highlight);

  const right_highlightPoints = [
    surfacePoint(0.78, 0.22, 0.008),
    surfacePoint(0.78, 0.60, 0.008),
    surfacePoint(0.78, 0.92, 0.008),
    surfacePoint(0.78, 1.12, 0.008),
    surfacePoint(0.78, 1.30, 0.008),
  ];
  const right_highlightGeom = new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3(right_highlightPoints),
    28,
    0.008,
    8,
    false
  );
  const right_highlight = new THREE.Mesh(right_highlightGeom, highlightMat);
  root.add(right_highlight);

  const cap_highlightGeom = new THREE.PlaneGeometry(0.026, 0.36);
  const cap_highlight = new THREE.Mesh(cap_highlightGeom, highlightMat);
  cap_highlight.position.set(-0.045, 1.875, 0.133);
  cap_highlight.rotation.y = -0.35;
  root.add(cap_highlight);

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
  const scale = 0.95 / maxDim;
  root.scale.setScalar(scale);
  root.position.set(-center.x * scale, -center.y * scale, -center.z * scale);
}